// Immigration News (public read-only endpoint)
// Reads pre-ingested news from `immigration_news` and recent draws from the
// database. Does NOT call any paid external API at request time — the
// ingestion pipeline (`ingest-immigration-draws`) is the only writer.
// Public + heavily cached; safe to expose to anonymous browsers.

import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

interface NewsItem {
  id: string;
  type: "policy" | "draw" | "pnp" | "blog" | "announcement";
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string;
  meta?: Record<string, string | number>;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    const [newsRes, drawsRes, pnpRes, runRes] = await Promise.all([
      supabase.from("immigration_news")
        .select("id, title, summary, source_url, source_name, category, published_at")
        .order("published_at", { ascending: false })
        .limit(20),
      supabase.from("express_entry_draws")
        .select("id, draw_number, draw_date, category, crs_min, itas, source_url")
        .order("draw_date", { ascending: false })
        .limit(10),
      supabase.from("pnp_draws")
        .select("id, province, province_code, stream, draw_date, invitations, min_score, notes, source_url")
        .order("draw_date", { ascending: false })
        .limit(10),
      supabase.from("ingestion_runs")
        .select("finished_at, status, source")
        .eq("status", "ok")
        .order("finished_at", { ascending: false })
        .limit(1),
    ]);

    const items: NewsItem[] = [];

    for (const n of newsRes.data ?? []) {
      items.push({
        id: `news-${n.id}`,
        type: (n.category === "announcement" ? "announcement" : "policy") as NewsItem["type"],
        title: n.title,
        summary: n.summary ?? "",
        url: n.source_url,
        source: n.source_name,
        publishedAt: n.published_at,
      });
    }

    for (const d of drawsRes.data ?? []) {
      items.push({
        id: `ee-${d.draw_number}`,
        type: "draw",
        title: `Express Entry Draw #${d.draw_number} — ${d.category} (CRS ${d.crs_min})`,
        summary: `${d.itas.toLocaleString()} ITAs issued in the ${d.category} category. Cutoff CRS ${d.crs_min}.`,
        url: d.source_url || "/express-entry/draws",
        source: "IRCC Express Entry",
        publishedAt: d.draw_date,
        meta: { crs: d.crs_min, itas: d.itas, category: d.category },
      });
    }

    for (const p of pnpRes.data ?? []) {
      items.push({
        id: `pnp-${p.id}`,
        type: "pnp",
        title: `${p.province} PNP — ${p.stream} (${p.invitations} invites)`,
        summary: `${p.province} issued ${p.invitations} nominations${p.min_score ? ` with minimum score ${p.min_score}` : ""}.${p.notes ? ` ${p.notes}` : ""}`,
        url: p.source_url || "/pnp-tracker",
        source: `${p.province} PNP`,
        publishedAt: p.draw_date,
        meta: { invitations: p.invitations, minScore: p.min_score ?? "—" },
      });
    }

    items.sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));

    const lastIngestedAt = runRes.data?.[0]?.finished_at ?? null;

    return new Response(
      JSON.stringify({
        items,
        fetchedAt: new Date().toISOString(),
        lastIngestedAt,
        sourceCount: items.length,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=900, s-maxage=900, stale-while-revalidate=3600",
        },
      },
    );
  } catch (err) {
    console.error("immigration-news error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error", items: [], lastIngestedAt: null }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
