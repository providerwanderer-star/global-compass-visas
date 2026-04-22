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

const FIRECRAWL_V2 = "https://api.firecrawl.dev/v2";

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
  // The endpoint returns a series of <li>...</li> blocks (no surrounding <ul>).
  // Split on <li> and parse each chunk independently.
  const chunks = html.split(/<li[\s>]/);
  for (const chunk of chunks) {
    if (jobs.length >= limit) break;
    if (!chunk.includes("job-search-card")) continue;

    const linkMatch = chunk.match(/<a[^>]*class="[^"]*base-card__full-link[^"]*"[^>]*href="([^"]+)"/i);
    const titleMatch = chunk.match(/<h3[^>]*class="[^"]*base-search-card__title[^"]*"[^>]*>\s*([\s\S]*?)\s*<\/h3>/i);
    const companyMatch =
      chunk.match(/<h4[^>]*class="[^"]*base-search-card__subtitle[^"]*"[^>]*>[\s\S]*?<a[^>]*>\s*([\s\S]*?)\s*<\/a>/i)
      || chunk.match(/<h4[^>]*class="[^"]*base-search-card__subtitle[^"]*"[^>]*>\s*([\s\S]*?)\s*<\/h4>/i);
    const locationMatch = chunk.match(/<span[^>]*class="[^"]*job-search-card__location[^"]*"[^>]*>\s*([\s\S]*?)\s*<\/span>/i);
    const dateMatch = chunk.match(/<time[^>]*datetime="([^"]+)"/i);

    if (!titleMatch || !linkMatch) continue;

    const cleanUrl = decodeHtml(linkMatch[1]).split("?")[0];
    jobs.push({
      title: decodeHtml(titleMatch[1].replace(/<[^>]+>/g, "")),
      company: decodeHtml((companyMatch?.[1] ?? "—").replace(/<[^>]+>/g, "")) || "—",
      location: decodeHtml((locationMatch?.[1] ?? "Canada").replace(/<[^>]+>/g, "")),
      url: cleanUrl,
      postedAt: dateMatch?.[1],
    });
  }
  return jobs;
}

/**
 * Fallback when LinkedIn rate-limits: use Firecrawl web search to find
 * fresh Canadian job postings across multiple sites. Returns links to real
 * postings on indeed.ca, ca.linkedin.com, jobbank.gc.ca, glassdoor.ca etc.
 */
async function fetchJobsViaFirecrawlSearch(
  query: string,
  limit: number,
  apiKey: string,
): Promise<JobOut[]> {
  const res = await fetch(`${FIRECRAWL_V2}/search`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `"${query}" jobs Canada hiring (site:ca.indeed.com OR site:ca.linkedin.com OR site:jobbank.gc.ca OR site:glassdoor.ca OR site:ziprecruiter.ca)`,
      limit: Math.min(limit + 2, 10),
      country: "ca",
      lang: "en",
      tbs: "qdr:m", // last month
    }),
  });
  if (!res.ok) throw new Error(`Firecrawl search ${res.status}`);
  const data = await res.json();
  const results: any[] =
    data?.data?.web ?? data?.web ?? data?.data ?? [];

  const inferCompany = (url: string, title: string): string => {
    if (url.includes("ca.indeed.com")) return "via Indeed";
    if (url.includes("linkedin.com")) {
      // LinkedIn titles often contain "...at Company"
      const m = title.match(/\bat\s+(.+?)(?:\s+[-|·]\s+|$)/i);
      return m ? m[1].trim() : "via LinkedIn";
    }
    if (url.includes("jobbank.gc.ca")) return "via Job Bank";
    if (url.includes("glassdoor")) return "via Glassdoor";
    if (url.includes("ziprecruiter")) return "via ZipRecruiter";
    try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return "—"; }
  };

  return results
    .filter((r) => r?.url && r?.title)
    .slice(0, limit)
    .map((r): JobOut => ({
      title: String(r.title).replace(/\s*[-|·]\s*(Indeed|LinkedIn|Job Bank|Glassdoor|ZipRecruiter).*$/i, "").trim(),
      company: inferCompany(String(r.url), String(r.title)),
      location: "Canada",
      url: String(r.url),
      postedAt: r.publishedDate || r.date,
    }));
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
      if (jobs.length === 0) throw new Error("No jobs returned by LinkedIn");
    } catch (e) {
      console.warn("LinkedIn fetch failed, falling back to Firecrawl search:", e);
      const apiKey = Deno.env.get("FIRECRAWL_API_KEY");
      if (apiKey) {
        try {
          jobs = await fetchJobsViaFirecrawlSearch(query, limit, apiKey);
          source = "Web search (Indeed, LinkedIn, Job Bank, Glassdoor)";
        } catch (e2) {
          console.error("Firecrawl fallback also failed:", e2);
          jobs = [];
          source = "Live jobs unavailable";
        }
      } else {
        jobs = [];
        source = "Live jobs unavailable";
      }
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