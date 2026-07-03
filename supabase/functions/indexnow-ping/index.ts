// IndexNow ping — notifies Bing, Yandex, Naver, Seznam (and partners) when
// fresh content is published. Fired by a DB trigger whenever new draw data
// is inserted, and callable manually via HTTP for one-off pings.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const HOST = "www.gargbrothers.ca";
const KEY = "87f145e9b8d0733bd7518e33eaa050df";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// Default URLs to ping when no explicit list is provided (e.g. DB trigger fires
// without payload). These cover the pages that re-render when draws update.
const DEFAULT_URLS = [
  `https://${HOST}/`,
  `https://${HOST}/express-entry/draws`,
  `https://${HOST}/pnp-tracker`,
  `https://${HOST}/news`,
  `https://${HOST}/for-ai`,
  `https://${HOST}/citations.json`,
  `https://${HOST}/llms.txt`,
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    let urls: string[] = DEFAULT_URLS;
    if (req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      if (Array.isArray(body?.urls) && body.urls.length > 0) {
        // Only allow URLs on our own host — IndexNow rejects mixed-host submissions.
        urls = body.urls.filter(
          (u: unknown) =>
            typeof u === "string" && u.startsWith(`https://${HOST}/`),
        );
      }
    }

    if (urls.length === 0) {
      return new Response(
        JSON.stringify({ ok: false, error: "no valid URLs to submit" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const payload = {
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    };

    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    console.log(
      `[indexnow] submitted ${urls.length} URL(s) → status ${res.status} ${text.slice(0, 200)}`,
    );

    return new Response(
      JSON.stringify({
        ok: res.ok,
        status: res.status,
        submitted: urls.length,
        urls,
        response: text.slice(0, 500),
      }),
      {
        status: res.ok ? 200 : 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error";
    console.error("[indexnow] error:", msg);
    return new Response(
      JSON.stringify({ ok: false, error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});