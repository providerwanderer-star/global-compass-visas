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

// IRCC publishes dates as either ISO ("2026-06-25") or long-form
// ("June 25, 2026"). Normalize to YYYY-MM-DD, return null if neither matches.
const MONTHS: Record<string, string> = {
  january: "01", february: "02", march: "03", april: "04", may: "05", june: "06",
  july: "07", august: "08", september: "09", october: "10", november: "11", december: "12",
};
function normalizeDate(cell: string): string | null {
  const iso = cell.match(/\d{4}-\d{2}-\d{2}/);
  if (iso) return iso[0];
  const long = cell.match(/([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})/);
  if (long) {
    const mm = MONTHS[long[1].toLowerCase()];
    if (mm) return `${long[3]}-${mm}-${long[2].padStart(2, "0")}`;
  }
  return null;
}

function serviceClient() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );
}

async function firecrawlScrape(
  url: string,
  apiKey: string,
): Promise<{ markdown: string | null; html: string | null }> {
  // Retry with exponential backoff on 5xx / network errors. Firecrawl
  // frequently returns transient 500 UNKNOWN_ERROR on the IRCC page.
  const attempts = 3;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(`${FIRECRAWL_V2}/scrape`, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          // Ask for both formats so we can fall back to HTML table parsing
          // if markdown loses the pipe-table structure.
          formats: ["markdown", "html"],
          onlyMainContent: false,
        }),
      });
      if (res.status >= 500 && res.status < 600) {
        console.warn(`Firecrawl ${res.status} (attempt ${i + 1}/${attempts})`);
        await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, i)));
        continue;
      }
      if (!res.ok) {
        console.error("Firecrawl scrape failed", res.status, await res.text().catch(() => ""));
        return { markdown: null, html: null };
      }
      const data = await res.json();
      const payload = data?.data ?? data ?? {};
      return {
        markdown: payload.markdown ?? null,
        html: payload.html ?? payload.rawHtml ?? null,
      };
    } catch (err) {
      console.warn(`Firecrawl fetch threw (attempt ${i + 1}/${attempts}):`, err);
      await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, i)));
    }
  }
  return { markdown: null, html: null };
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

    const drawDate = normalizeDate(cells[1]);
    if (!drawDate) continue;

    const category = cells[2].replace(/\*|_/g, "").trim() || "General";
    const itas = parseInt(cells[3].replace(/[^\d]/g, ""), 10);
    const crs = parseInt(cells[4].replace(/[^\d]/g, ""), 10);
    if (!Number.isFinite(itas) || !Number.isFinite(crs)) continue;

    out.push({
      drawNumber: num,
      drawDate,
      category,
      itas,
      crsMin: crs,
      tieBreak: cells[5] ?? null,
    });
  }
  return out;
}

// Fallback: parse the EE rounds HTML <table>. IRCC's page ships a real
// table so this works even if Firecrawl's markdown conversion drops the
// pipe-table structure.
function parseEERoundsHtml(html: string): Array<{
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

  const stripTags = (s: string) =>
    s.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

  const rowRe = /<tr\b[^>]*>([\s\S]*?)<\/tr>/gi;
  const cellRe = /<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi;
  let rowMatch: RegExpExecArray | null;
  while ((rowMatch = rowRe.exec(html)) !== null) {
    const cells: string[] = [];
    let cellMatch: RegExpExecArray | null;
    cellRe.lastIndex = 0;
    while ((cellMatch = cellRe.exec(rowMatch[1])) !== null) {
      cells.push(stripTags(cellMatch[1]));
    }
    if (cells.length < 5) continue;
    const num = parseInt(cells[0].replace(/[^\d]/g, ""), 10);
    if (!Number.isFinite(num) || num < 1 || num > 100000) continue;
    const drawDate = normalizeDate(cells[1]);
    if (!drawDate) continue;
    const category = cells[2] || "General";
    const itas = parseInt(cells[3].replace(/[^\d]/g, ""), 10);
    const crs = parseInt(cells[4].replace(/[^\d]/g, ""), 10);
    if (!Number.isFinite(itas) || !Number.isFinite(crs)) continue;
    out.push({
      drawNumber: num,
      drawDate,
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
    const { markdown, html } = await firecrawlScrape(EE_ROUNDS_URL, apiKey);
    if (!markdown && !html) throw new Error("scrape returned empty");
    let rounds = markdown ? parseEERounds(markdown) : [];
    if (rounds.length === 0 && html) {
      rounds = parseEERoundsHtml(html);
    }
    if (rounds.length === 0) throw new Error("no rounds parsed from markdown or html");

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