// Immigration News Aggregator
// Fetches the latest IRCC news using Firecrawl and merges with internal blog/draws/PNP signals.
// Returns a normalized timeline. Cached at edge for 30 minutes.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

import { createClient } from "npm:@supabase/supabase-js@2";

interface NewsItem {
  id: string;
  type: "policy" | "draw" | "pnp" | "blog" | "announcement";
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string; // ISO
  meta?: Record<string, string | number>;
}

const FIRECRAWL_V2 = "https://api.firecrawl.dev/v2";

// Firecrawl search across IRCC + provincial immigration sites
async function fetchIRCCNews(apiKey: string): Promise<NewsItem[]> {
  try {
    const res = await fetch(`${FIRECRAWL_V2}/search`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: "site:canada.ca IRCC immigration news 2026 OR site:cicnews.com",
        limit: 12,
        tbs: "qdr:m", // last month
      }),
    });
    if (!res.ok) {
      console.error("Firecrawl search failed", res.status, await res.text());
      return [];
    }
    const data = await res.json();
    const results: any[] = data?.data?.web ?? data?.data ?? data?.web ?? [];
    return results.slice(0, 12).map((r: any, i: number) => ({
      id: `ircc-${i}-${Date.parse(r.publishedDate || r.date || new Date().toISOString())}`,
      type: r.url?.includes("cicnews") ? "announcement" : "policy",
      title: r.title || "Immigration Update",
      summary: (r.description || r.snippet || "").slice(0, 240),
      url: r.url,
      source: r.url?.includes("canada.ca") ? "IRCC (canada.ca)" : "CIC News",
      publishedAt: r.publishedDate || r.date || new Date().toISOString(),
    }));
  } catch (err) {
    console.error("fetchIRCCNews error:", err);
    return [];
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Require authenticated caller to protect paid third-party API from abuse.
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const token = authHeader.replace("Bearer ", "");
    const { data: claims, error: authError } = await supabase.auth.getClaims(token);
    if (authError || !claims?.claims || claims.claims.role === "anon") {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const apiKey = Deno.env.get("FIRECRAWL_API_KEY");
    if (!apiKey) {
      console.error("FIRECRAWL_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Service temporarily unavailable" }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const news = await fetchIRCCNews(apiKey);

    return new Response(
      JSON.stringify({
        items: news,
        fetchedAt: new Date().toISOString(),
        sourceCount: news.length,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          // CDN cache 30 min, stale-while-revalidate 1h
          "Cache-Control": "public, max-age=1800, s-maxage=1800, stale-while-revalidate=3600",
        },
      },
    );
  } catch (err) {
    console.error("immigration-news error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
