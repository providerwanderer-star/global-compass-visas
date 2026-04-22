/**
 * live-jobs edge function
 * Returns live job listings for a given query, sourced from LinkedIn's public
 * guest jobs endpoint (no auth required). Filtered to Canada. Cached 1h.
 * Job Bank's site is now JSF/PrimeFaces rendered with no public feed, so
 * LinkedIn's guest API is the most reliable free source for live Canadian jobs.
 *
 * Request:  POST { query: string, location?: string, limit?: number }
 * Response: { source, fetchedAt, jobs: [{ title, company, location, url, postedAt }] }
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface JobOut {
  title: string;
  company: string;
  location: string;
  url: string;
  postedAt?: string;
}

function decodeHtml(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

async function fetchLinkedInJobs(
  query: string,
  limit: number,
): Promise<JobOut[]> {
  const url =
    `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search` +
    `?keywords=${encodeURIComponent(query)}&location=Canada&start=0`;

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; 4AcesVisaJobsBot/1.0; +https://www.4acesvisa.com)",
      Accept: "text/html",
    },
  });
  if (!res.ok) throw new Error(`LinkedIn ${res.status}`);
  const html = await res.text();

  const jobs: JobOut[] = [];
  // Each card is wrapped in <div class="base-card ... job-search-card" ...>
  const cardRe = /<div[^>]*class="[^"]*job-search-card[^"]*"[\s\S]*?<\/div>\s*<\/div>\s*<\/li>/g;
  let m: RegExpExecArray | null;
  while ((m = cardRe.exec(html)) && jobs.length < limit) {
    const card = m[0];
    const titleMatch = card.match(/<h3[^>]*class="[^"]*base-search-card__title[^"]*"[^>]*>\s*([\s\S]*?)\s*<\/h3>/i);
    const companyMatch = card.match(/<h4[^>]*class="[^"]*base-search-card__subtitle[^"]*"[^>]*>[\s\S]*?<a[^>]*>\s*([\s\S]*?)\s*<\/a>/i)
      || card.match(/<h4[^>]*class="[^"]*base-search-card__subtitle[^"]*"[^>]*>\s*([\s\S]*?)\s*<\/h4>/i);
    const locationMatch = card.match(/<span[^>]*class="[^"]*job-search-card__location[^"]*"[^>]*>\s*([\s\S]*?)\s*<\/span>/i);
    const linkMatch = card.match(/<a[^>]*class="base-card__full-link[^"]*"[^>]*href="([^"]+)"/i);
    const dateMatch = card.match(/<time[^>]*datetime="([^"]+)"/i);

    if (titleMatch && linkMatch) {
      const cleanUrl = decodeHtml(linkMatch[1]).split("?")[0];
      jobs.push({
        title: decodeHtml(titleMatch[1].replace(/<[^>]+>/g, "")),
        company: decodeHtml((companyMatch?.[1] ?? "—").replace(/<[^>]+>/g, "")) || "—",
        location: decodeHtml((locationMatch?.[1] ?? "Canada").replace(/<[^>]+>/g, "")),
        url: cleanUrl,
        postedAt: dateMatch?.[1],
      });
    }
  }
  return jobs;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const query: string = (body.query ?? "").toString().slice(0, 80);
    const limit: number = Math.max(1, Math.min(20, Number(body.limit) || 8));
    if (!query) {
      return new Response(JSON.stringify({ error: "query required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let jobs: JobOut[] = [];
    let source = "LinkedIn (Canada)";
    try {
      jobs = await fetchLinkedInJobs(query, limit);
    } catch (e) {
      console.error("LinkedIn fetch failed", e);
      jobs = [];
      source = "LinkedIn (unavailable)";
    }

    return new Response(
      JSON.stringify({
        source,
        fetchedAt: new Date().toISOString(),
        jobs,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      },
    );
  } catch (err) {
    console.error("live-jobs error", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});