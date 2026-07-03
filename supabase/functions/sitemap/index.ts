// Dynamic sitemap.xml — pulls live data from Supabase so <lastmod> reflects
// the latest blog post, NOC code, and Express Entry / PNP draw insert times.
// Static routes use today's date so search engines see fresh signals daily.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SITE = "https://www.gargbrothers.ca";
const today = () => new Date().toISOString().slice(0, 10);
const toDate = (v: string | null | undefined) =>
  v ? new Date(v).toISOString().slice(0, 10) : today();

interface UrlEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

const STATIC_ROUTES: Array<Omit<UrlEntry, "lastmod">> = [
  { loc: "/", changefreq: "daily", priority: 1.0 },
  { loc: "/contact", changefreq: "monthly", priority: 0.8 },
  { loc: "/quiz", changefreq: "monthly", priority: 0.8 },
  { loc: "/crs-calculator", changefreq: "monthly", priority: 0.9 },
  { loc: "/faq", changefreq: "weekly", priority: 0.9 },
  { loc: "/blog", changefreq: "daily", priority: 0.9 },
  { loc: "/news", changefreq: "daily", priority: 0.9 },
  { loc: "/compare", changefreq: "monthly", priority: 0.7 },
  { loc: "/express-entry", changefreq: "weekly", priority: 0.9 },
  { loc: "/express-entry/draws", changefreq: "daily", priority: 0.95 },
  { loc: "/pnp-tracker", changefreq: "daily", priority: 0.9 },
  { loc: "/noc-finder", changefreq: "weekly", priority: 0.9 },
  { loc: "/processing-times", changefreq: "weekly", priority: 0.85 },
  { loc: "/immigration-cost", changefreq: "monthly", priority: 0.8 },
  { loc: "/documents", changefreq: "monthly", priority: 0.7 },
  { loc: "/settle-in-canada", changefreq: "weekly", priority: 0.9 },
  { loc: "/for-ai", changefreq: "weekly", priority: 0.5 },
  { loc: "/india", changefreq: "weekly", priority: 0.9 },
  { loc: "/india/study-permit-india", changefreq: "monthly", priority: 0.8 },
  { loc: "/india/work-permit-india", changefreq: "monthly", priority: 0.8 },
  { loc: "/india/canada-pr-india", changefreq: "monthly", priority: 0.8 },
  { loc: "/immigration/canada", changefreq: "weekly", priority: 0.9 },
  { loc: "/immigration/australia", changefreq: "weekly", priority: 0.9 },
  { loc: "/immigration/germany", changefreq: "weekly", priority: 0.9 },
  { loc: "/immigration/uk", changefreq: "weekly", priority: 0.9 },
];

const SERVICE_SLUGS = [
  "express-entry",
  "student-visa",
  "lmia-assistance",
  "visa-restoration",
  "visitor-visa",
  "visitor-visa-insurance",
  "pnp-application",
];

function xmlEscape(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function urlTag(u: UrlEntry) {
  return `  <url><loc>${xmlEscape(u.loc)}</loc><lastmod>${u.lastmod}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    );

    // Fire all queries in parallel
    const [
      { data: blogPosts },
      { data: nocCodes },
      { data: latestEE },
      { data: latestPnp },
    ] = await Promise.all([
      supabase
        .from("blog_posts")
        .select("slug, updated_at, date")
        .eq("published", true),
      supabase.from("noc_codes").select("code, created_at"),
      supabase
        .from("express_entry_draws")
        .select("draw_date")
        .order("draw_date", { ascending: false })
        .limit(1),
      supabase
        .from("pnp_draws")
        .select("draw_date")
        .order("draw_date", { ascending: false })
        .limit(1),
    ]);

    const eeLastmod = toDate(latestEE?.[0]?.draw_date);
    const pnpLastmod = toDate(latestPnp?.[0]?.draw_date);
    const t = today();

    const urls: UrlEntry[] = [];

    for (const r of STATIC_ROUTES) {
      let lastmod = t;
      if (r.loc === "/express-entry/draws" || r.loc === "/express-entry") {
        lastmod = eeLastmod;
      } else if (r.loc === "/pnp-tracker") {
        lastmod = pnpLastmod;
      } else if (r.loc === "/") {
        // Home reflects most recent of EE / PNP / today
        lastmod = [eeLastmod, pnpLastmod, t].sort().reverse()[0];
      }
      urls.push({
        loc: `${SITE}${r.loc}`,
        lastmod,
        changefreq: r.changefreq,
        priority: r.priority,
      });
    }

    // Service pages
    for (const slug of SERVICE_SLUGS) {
      urls.push({
        loc: `${SITE}/services/${slug}`,
        lastmod: t,
        changefreq: "monthly",
        priority: 0.85,
      });
    }

    // Blog posts — Supabase-driven lastmod
    for (const p of blogPosts ?? []) {
      urls.push({
        loc: `${SITE}/blog/${p.slug}`,
        lastmod: toDate(p.updated_at ?? p.date),
        changefreq: "monthly",
        priority: 0.7,
      });
    }

    // NOC detail pages — high-traffic SEO
    for (const n of nocCodes ?? []) {
      urls.push({
        loc: `${SITE}/noc/${n.code}`,
        lastmod: toDate(n.created_at),
        changefreq: "monthly",
        priority: 0.75,
      });
    }

    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...urls.map(urlTag),
      "</urlset>",
      "",
    ].join("\n");

    return new Response(xml, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=600, s-maxage=600",
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error";
    console.error("[sitemap] error:", msg);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>\n<!-- sitemap generation failed: ${xmlEscape(msg)} -->\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/xml" },
      },
    );
  }
});