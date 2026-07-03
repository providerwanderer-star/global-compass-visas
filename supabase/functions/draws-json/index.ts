// Public JSON feed of recent Canadian immigration draws.
// Referenced in /llms.txt so AI answer engines can pull authoritative current data.

import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
    );

    const [ee, pnp, run] = await Promise.all([
      supabase.from("express_entry_draws")
        .select("draw_number, draw_date, category, itas, crs_min, source_url")
        .order("draw_date", { ascending: false })
        .limit(50),
      supabase.from("pnp_draws")
        .select("province, province_code, stream, draw_date, invitations, min_score, source_url, notes")
        .order("draw_date", { ascending: false })
        .limit(50),
      supabase.from("ingestion_runs")
        .select("finished_at")
        .eq("status", "ok")
        .order("finished_at", { ascending: false })
        .limit(1),
    ]);

    const payload = {
      lastUpdated: run.data?.[0]?.finished_at ?? new Date().toISOString(),
      sources: [
        "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html",
        "https://www.cicnews.com/",
      ],
      documentation: "https://www.gargbrothers.ca/for-ai",
      express_entry: (ee.data ?? []).map((d) => ({
        drawNumber: d.draw_number,
        drawDate: d.draw_date,
        category: d.category,
        itas: d.itas,
        crsMin: d.crs_min,
        sourceUrl: d.source_url,
      })),
      pnp: (pnp.data ?? []).map((p) => ({
        province: p.province,
        provinceCode: p.province_code,
        stream: p.stream,
        drawDate: p.draw_date,
        invitations: p.invitations,
        minScore: p.min_score,
        notes: p.notes,
        sourceUrl: p.source_url,
      })),
    };

    return new Response(JSON.stringify(payload, null, 2), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=900, s-maxage=900, stale-while-revalidate=3600",
      },
    });
  } catch (err) {
    console.error("draws-json error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});