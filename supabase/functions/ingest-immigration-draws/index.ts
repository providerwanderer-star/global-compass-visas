// Scheduled ingestion of immigration data.
//
// Runs on pg_cron every 30 minutes (see migration setting up cron.schedule).
// Sources:
//   1. IRCC Express Entry Rounds page (canada.ca) — markdown scrape via Firecrawl
//   2. IRCC / CIC News search (last month)         — search via Firecrawl
//
// Writes to public.express_entry_draws and public.immigration_news.
// Every source records an ingestion_runs row so the health-check function
// can detect staleness.
//
// PNP scraping is intentionally not yet enabled — each province publishes in
// a different format. The `pnp_draws` table continues to be seeded manually
// or via the existing (curated) data file until per-province scrapers land.

import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FIRECRAWL_V2 = "https://api.firecrawl.dev/v2";
const EE_ROUNDS_URL =
  "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html";

function serviceClient() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );
}

async function firecrawlScrape(url: string, apiKey: string): Promise<string | null> {
  const res = await fetch(`${FIRECRAWL_V2}/scrape`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ url, formats: ["markdown"], onlyMainContent: true }),
  });
  if (!res.ok) {
    console.error("Firecrawl scrape failed", res.status, await res.text().catch(() => ""));
    return null;
  }
  const data = await res.json();
  return data?.data?.markdown ?? data?.markdown ?? null;
}

// Parse the EE rounds markdown table. IRCC publishes one row per round with
// columns: Round number, Date (YYYY-MM-DD), Round type, Invitations issued,
// CRS score of lowest-ranked candidate invited, Tie-breaking rule.
function parseEERounds(md: string): Array<{
  drawNumber: number;
  drawDate: string;
  category: string;
  itas: number;
  crsMin: number;
  tieBreak: string | null;
}> {
  const out: Array<{
    drawNumber: number;
    drawDate: string;
    category: string;
    itas: number;
    crsMin: number;
    tieBreak: string | null;
  }> = [];

  const lines = md.split(/\r?\n/);
  for (const raw of lines) {
    const line = raw.trim();
    if (!line.startsWith("|") || !line.endsWith("|")) continue;
    const cells = line.split("|").map((c) => c.trim()).filter(Boolean);
    if (cells.length < 5) continue;
    // Skip header/separator rows
    const first = cells[0];
    const num = parseInt(first.replace(/[^\d]/g, ""), 10);
    if (!Number.isFinite(num) || num < 1 || num > 100000) continue;

    const dateMatch = cells[1].match(/\d{4}-\d{2}-\d{2}/);
    if (!dateMatch) continue;

    const category = cells[2].replace(/\*|_/g, "").trim() || "General";
    const itas = parseInt(cells[3].replace(/[^\d]/g, ""), 10);
    const crs = parseInt(cells[4].replace(/[^\d]/g, ""), 10);
    if (!Number.isFinite(itas) || !Number.isFinite(crs)) continue;

    out.push({
      drawNumber: num,
      drawDate: dateMatch[0],
      category,
      itas,
      crsMin: crs,
      tieBreak: cells[5] ?? null,
    });
  }
  return out;
}

async function firecrawlSearch(query: string, apiKey: string, limit = 12): Promise<Array<{
  url: string; title: string; description: string; publishedDate?: string;
}>> {
  const res = await fetch(`${FIRECRAWL_V2}/search`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query, limit, tbs: "qdr:m" }),
  });
  if (!res.ok) {
    console.error("Firecrawl search failed", res.status, await res.text().catch(() => ""));
    return [];
  }
  const data = await res.json();
  const results: Array<Record<string, unknown>> = data?.data?.web ?? data?.data ?? data?.web ?? [];
  return results
    .map((r) => ({
      url: String(r.url ?? ""),
      title: String(r.title ?? "Immigration Update"),
      description: String(r.description ?? r.snippet ?? ""),
      publishedDate: r.publishedDate as string | undefined ?? r.date as string | undefined,
    }))
    .filter((r) => r.url);
}

async function recordRun(
  supabase: ReturnType<typeof serviceClient>,
  source: string,
  startedAt: string,
  status: "ok" | "error",
  itemsUpserted: number,
  errorMessage: string | null,
) {
  await supabase.from("ingestion_runs").insert({
    source,
    status,
    items_upserted: itemsUpserted,
    error_message: errorMessage,
    started_at: startedAt,
    finished_at: new Date().toISOString(),
  });
}

async function fireAlert(kind: string, detail: string) {
  const webhook = Deno.env.get("ALERT_WEBHOOK_URL");
  if (!webhook) return;
  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `⚠️ Garg Brothers ingestion — ${kind}: ${detail}`,
      }),
    });
  } catch (err) {
    console.error("alert webhook failed", err);
  }
}

async function notifyIndexNow(urls: string[]) {
  if (urls.length === 0) return;
  try {
    await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/indexnow-ping`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      },
      body: JSON.stringify({ urls }),
    });
  } catch (err) {
    console.error("indexnow ping failed", err);
  }
}

async function ingestExpressEntry(supabase: ReturnType<typeof serviceClient>, apiKey: string) {
  const startedAt = new Date().toISOString();
  try {
    const md = await firecrawlScrape(EE_ROUNDS_URL, apiKey);
    if (!md) throw new Error("scrape returned empty");
    const rounds = parseEERounds(md);
    if (rounds.length === 0) throw new Error("no rounds parsed from markdown");

    // Only upsert rounds newer than the max already stored, to keep this cheap
    const { data: latest } = await supabase
      .from("express_entry_draws")
      .select("draw_number")
      .order("draw_number", { ascending: false })
      .limit(1);
    const maxKnown = latest?.[0]?.draw_number ?? 0;

    const fresh = rounds.filter((r) => r.drawNumber > maxKnown);
    let upserted = 0;
    const changedUrls: string[] = [];
    for (const r of fresh) {
      const { error } = await supabase.from("express_entry_draws").upsert({
        draw_number: r.drawNumber,
        draw_date: r.drawDate,
        category: r.category,
        crs_min: r.crsMin,
        itas: r.itas,
        tie_break: r.tieBreak,
        source_url: EE_ROUNDS_URL,
        fetched_at: new Date().toISOString(),
      }, { onConflict: "draw_number" });
      if (!error) upserted++;
    }
    if (upserted > 0) {
      changedUrls.push(
        "https://www.gargbrothers.ca/news",
        "https://www.gargbrothers.ca/express-entry/draws",
      );
      await notifyIndexNow(changedUrls);
    }
    await recordRun(supabase, "express_entry", startedAt, "ok", upserted, null);
    return upserted;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("EE ingest failed:", msg);
    await recordRun(supabase, "express_entry", startedAt, "error", 0, msg);
    await fireAlert("EE ingestion failed", msg);
    return 0;
  }
}

async function ingestNews(supabase: ReturnType<typeof serviceClient>, apiKey: string) {
  const startedAt = new Date().toISOString();
  try {
    const results = await firecrawlSearch(
      "site:canada.ca IRCC OR site:cicnews.com Canada immigration 2026",
      apiKey,
      15,
    );
    let upserted = 0;
    for (const r of results) {
      const isCanadaCa = r.url.includes("canada.ca");
      const isCic = r.url.includes("cicnews.com");
      if (!isCanadaCa && !isCic) continue;
      const external_id = r.url;
      const { error } = await supabase.from("immigration_news").upsert({
        external_id,
        title: r.title.slice(0, 300),
        summary: r.description.slice(0, 500),
        source_url: r.url,
        source_name: isCanadaCa ? "IRCC (canada.ca)" : "CIC News",
        category: isCanadaCa ? "policy" : "announcement",
        published_at: r.publishedDate ?? new Date().toISOString(),
      }, { onConflict: "external_id" });
      if (!error) upserted++;
    }
    await recordRun(supabase, "news_search", startedAt, "ok", upserted, null);
    return upserted;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("News ingest failed:", msg);
    await recordRun(supabase, "news_search", startedAt, "error", 0, msg);
    await fireAlert("News ingestion failed", msg);
    return 0;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const apiKey = Deno.env.get("FIRECRAWL_API_KEY");
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "FIRECRAWL_API_KEY not configured" }),
      { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  const supabase = serviceClient();
  const [ee, news] = await Promise.all([
    ingestExpressEntry(supabase, apiKey),
    ingestNews(supabase, apiKey),
  ]);

  return new Response(
    JSON.stringify({
      ok: true,
      express_entry_upserted: ee,
      news_upserted: news,
      ranAt: new Date().toISOString(),
    }),
    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});