/**
 * sync-draws edge function
 *
 * Pulls the latest Express Entry rounds from IRCC and recent PNP draws,
 * then upserts them into Supabase. Triggered by pg_cron every 6 hours.
 *
 * Sources:
 *   - IRCC Express Entry rounds:
 *     https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html
 *   - PNP results: aggregated via Firecrawl search across CIC News + provincial sites.
 *
 * Uses Firecrawl scrape (markdown) + LLM-light parsing.
 * Returns counts of inserted / updated rows.
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FIRECRAWL_V2 = "https://api.firecrawl.dev/v2";
const IRCC_ROUNDS_URL =
  "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html";

// Map IRCC category labels → our short codes
function normalizeCategory(raw: string): string {
  const s = raw.toLowerCase();
  if (s.includes("french")) return "French";
  if (s.includes("canadian experience")) return "CEC";
  if (s.includes("provincial nominee")) return "PNP";
  if (s.includes("healthcare") || s.includes("social services")) return "Healthcare";
  if (s.includes("trade")) return "Trades";
  if (s.includes("stem")) return "STEM";
  if (s.includes("transport")) return "Transport";
  if (s.includes("agriculture")) return "Agriculture";
  if (s.includes("education")) return "Education";
  if (s.includes("physician")) return "Physicians";
  if (s.includes("senior management") || s.includes("senior managers")) return "SeniorMgmt";
  if (s.includes("general") || s.includes("no program") || s.includes("all program")) return "General";
  return raw.trim().slice(0, 40);
}

function parseDate(raw: string): string | null {
  const t = Date.parse(raw);
  if (!isNaN(t)) return new Date(t).toISOString().slice(0, 10);
  return null;
}

/**
 * Fetches IRCC rounds page as markdown via Firecrawl and extracts the table.
 * The IRCC table has columns: # | Date | Round type | Invitations issued | Lowest CRS
 */
async function fetchExpressEntryRounds(apiKey: string): Promise<Array<{
  draw_number: number;
  draw_date: string;
  category: string;
  crs_min: number;
  itas: number;
}>> {
  const res = await fetch(`${FIRECRAWL_V2}/scrape`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      url: IRCC_ROUNDS_URL,
      formats: ["markdown"],
      onlyMainContent: true,
    }),
  });
  if (!res.ok) throw new Error(`Firecrawl scrape IRCC ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const md: string = data?.data?.markdown ?? data?.markdown ?? "";
  if (!md) throw new Error("Empty markdown from IRCC scrape");

  const rows: Array<{ draw_number: number; draw_date: string; category: string; crs_min: number; itas: number }> = [];

  // Match markdown table rows: | 411 | April 15, 2026 | French | 4,000 | 419 |
  // Be flexible with column count (sometimes tie-break date is included).
  const rowRegex = /^\|\s*(\d{2,4})\s*\|\s*([A-Za-z]+\s+\d{1,2},\s*\d{4})\s*\|\s*([^|]+?)\s*\|\s*([\d,]+)\s*\|\s*(\d{2,3})\s*(?:\|[^\n]*)?$/gm;

  let m: RegExpExecArray | null;
  while ((m = rowRegex.exec(md)) !== null) {
    const [, num, dateStr, cat, itasStr, crsStr] = m;
    const date = parseDate(dateStr);
    if (!date) continue;
    rows.push({
      draw_number: parseInt(num, 10),
      draw_date: date,
      category: normalizeCategory(cat),
      itas: parseInt(itasStr.replace(/,/g, ""), 10),
      crs_min: parseInt(crsStr, 10),
    });
  }

  // Dedupe by draw_number, keep the first occurrence
  const seen = new Set<number>();
  return rows.filter((r) => {
    if (seen.has(r.draw_number)) return false;
    seen.add(r.draw_number);
    return true;
  });
}

/**
 * Fetch recent PNP draws via Firecrawl search across CIC News + provincial pages.
 * Returns lightly-parsed draws — best-effort, stream/score may be incomplete.
 */
async function fetchPnpDraws(apiKey: string): Promise<Array<{
  province: string;
  province_code: string;
  stream: string;
  draw_date: string;
  invitations: number;
  min_score: number | null;
  notes: string | null;
  source_url: string;
}>> {
  const res = await fetch(`${FIRECRAWL_V2}/search`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      query:
        '("PNP draw" OR "provincial nominee" invitations) (Ontario OR BC OR Alberta OR Manitoba OR Saskatchewan OR "Nova Scotia" OR "New Brunswick" OR "Prince Edward Island") site:cicnews.com',
      limit: 20,
      tbs: "qdr:m",
    }),
  });
  if (!res.ok) throw new Error(`Firecrawl PNP search ${res.status}`);
  const data = await res.json();
  const results: any[] = data?.data?.web ?? data?.web ?? data?.data ?? [];

  const provMap: Array<[RegExp, string, string]> = [
    [/ontario|oinp/i, "Ontario", "ON"],
    [/british columbia|\bbc\b|bcpnp/i, "British Columbia", "BC"],
    [/alberta|aaip/i, "Alberta", "AB"],
    [/manitoba|mpnp/i, "Manitoba", "MB"],
    [/saskatchewan|sinp/i, "Saskatchewan", "SK"],
    [/nova scotia|nsnp/i, "Nova Scotia", "NS"],
    [/new brunswick|nbpnp/i, "New Brunswick", "NB"],
    [/prince edward island|peipnp|\bpei\b/i, "Prince Edward Island", "PE"],
    [/newfoundland|nlpnp/i, "Newfoundland and Labrador", "NL"],
  ];

  const draws: Array<any> = [];
  for (const r of results) {
    const text = `${r.title ?? ""} ${r.description ?? r.snippet ?? ""}`;
    const url = r.url;
    if (!url) continue;

    // Province
    const provHit = provMap.find(([re]) => re.test(text));
    if (!provHit) continue;
    const [, province, province_code] = provHit;

    // Date — look for "Month DD, YYYY" or ISO
    const dateMatch = text.match(/([A-Z][a-z]+\s+\d{1,2},\s*20\d{2})/) || (r.publishedDate ? [r.publishedDate, r.publishedDate] : null);
    const draw_date = dateMatch ? parseDate(dateMatch[1]) : null;
    if (!draw_date) continue;

    // Invitations
    const invMatch = text.match(/(\d{1,4}(?:,\d{3})?)\s*(?:invitations|nominations|candidates|ITAs)/i);
    if (!invMatch) continue;
    const invitations = parseInt(invMatch[1].replace(/,/g, ""), 10);

    // Min score
    const scoreMatch = text.match(/(?:minimum|cut[- ]?off|score)[^\d]{0,15}(\d{2,3})/i);
    const min_score = scoreMatch ? parseInt(scoreMatch[1], 10) : null;

    // Stream — try to pull a phrase between province name and " stream/category"
    const streamMatch = text.match(/((?:Skilled Worker|Express Entry|Tech|Healthcare|Trades|International Graduate|Entrepreneur|Employer|Foreign Worker|French-Speaking|Human Capital)[A-Za-z\- ]{0,40})/i);
    const stream = (streamMatch?.[1] ?? "General Draw").trim().slice(0, 80);

    draws.push({
      province,
      province_code,
      stream,
      draw_date,
      invitations,
      min_score,
      notes: null,
      source_url: url,
    });
  }
  return draws;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get("FIRECRAWL_API_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!apiKey) throw new Error("FIRECRAWL_API_KEY not configured");
    if (!supabaseUrl || !serviceKey) throw new Error("Supabase env vars missing");

    const supabase = createClient(supabaseUrl, serviceKey);

    // 1. Express Entry
    let eeUpserted = 0;
    let eeError: string | null = null;
    try {
      const eeRows = await fetchExpressEntryRounds(apiKey);
      if (eeRows.length > 0) {
        const { error, count } = await supabase
          .from("express_entry_draws")
          .upsert(
            eeRows.map((r) => ({ ...r, source_url: IRCC_ROUNDS_URL, fetched_at: new Date().toISOString() })),
            { onConflict: "draw_number", count: "exact" },
          );
        if (error) throw error;
        eeUpserted = count ?? eeRows.length;
      }
    } catch (e) {
      eeError = String(e);
      console.error("EE sync failed:", e);
    }

    // 2. PNP
    let pnpUpserted = 0;
    let pnpError: string | null = null;
    try {
      const pnpRows = await fetchPnpDraws(apiKey);
      if (pnpRows.length > 0) {
        const { error, count } = await supabase
          .from("pnp_draws")
          .upsert(
            pnpRows.map((r) => ({ ...r, fetched_at: new Date().toISOString() })),
            { onConflict: "province_code,stream,draw_date", count: "exact" },
          );
        if (error) throw error;
        pnpUpserted = count ?? pnpRows.length;
      }
    } catch (e) {
      pnpError = String(e);
      console.error("PNP sync failed:", e);
    }

    return new Response(
      JSON.stringify({
        ok: true,
        ranAt: new Date().toISOString(),
        expressEntry: { upserted: eeUpserted, error: eeError },
        pnp: { upserted: pnpUpserted, error: pnpError },
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("sync-draws fatal:", err);
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});