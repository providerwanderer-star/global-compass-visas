// Hourly cron: alerts (via ALERT_WEBHOOK_URL) when no successful ingestion
// has landed in the past 90 minutes.

import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const STALE_MINUTES = 90;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );

  const { data, error } = await supabase
    .from("ingestion_runs")
    .select("finished_at, source")
    .eq("status", "ok")
    .order("finished_at", { ascending: false })
    .limit(1);

  if (error) {
    return new Response(JSON.stringify({ ok: false, error: "query failed" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const last = data?.[0]?.finished_at ? new Date(data[0].finished_at) : null;
  const ageMin = last ? (Date.now() - last.getTime()) / 60000 : Infinity;
  const stale = ageMin > STALE_MINUTES;

  if (stale) {
    const detail = last
      ? `No successful ingestion in ${Math.round(ageMin)} min (last: ${last.toISOString()})`
      : `No successful ingestion runs recorded yet`;

    const webhook = Deno.env.get("ALERT_WEBHOOK_URL");
    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `🚨 Garg Brothers ingestion stale — ${detail}. Check the ingest-immigration-draws function logs.`,
          }),
        });
      } catch (err) {
        console.error("alert webhook failed", err);
      }
    }

    return new Response(JSON.stringify({ ok: false, stale: true, ageMin, detail }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true, stale: false, ageMin, lastSuccess: last?.toISOString() ?? null }), {
    status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});