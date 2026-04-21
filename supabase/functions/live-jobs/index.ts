/**
 * live-jobs edge function
 * Returns live job listings for a given query, sourced from the public
 * Canada Job Bank "jobsearch" public JSON endpoint, with a 1-hour CDN cache.
 * No API key required.
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

async function fetchJobBank(query: string, limit: number): Promise<JobOut[]> {
  // Public Job Bank search RSS — stable, CORS-friendly, no key.
  const url = `https://www.jobbank.gc.ca/jobsearch/jobsearch?searchstring=${encodeURIComponent(
    query,
  )}&locationstring=Canada&sort=D&fsrc=21`;
  const res = await fetch(url, {
    headers: { "User-Agent": "4AcesVisa-LiveJobs/1.0" },
  });
  if (!res.ok) throw new Error(`Job Bank ${res.status}`);
  const html = await res.text();

  // Parse <article class="..."> blocks lightly.
  const jobs: JobOut[] = [];
  const articleRegex = /<article[^>]*resultJobItem[^>]*>([\s\S]*?)<\/article>/g;
  let m: RegExpExecArray | null;
  while ((m = articleRegex.exec(html)) && jobs.length < limit) {
    const block = m[1];
    const titleMatch = block.match(/<h3[^>]*class="title"[^>]*>\s*<span[^>]*>([^<]+)<\/span>/i)
      || block.match(/<h3[^>]*>\s*([^<]+)\s*<\/h3>/i);
    const companyMatch = block.match(/<li class="business">\s*([^<]+?)\s*<\/li>/i);
    const locationMatch = block.match(/<li class="location">\s*<span[^>]*>([^<]+)<\/span>/i)
      || block.match(/<li class="location">\s*([^<]+?)\s*<\/li>/i);
    const hrefMatch = block.match(/href="(\/jobsearch\/jobposting\/[^"]+)"/i);
    const dateMatch = block.match(/<li class="date">\s*<span[^>]*>([^<]+)<\/span>/i);
    if (titleMatch && hrefMatch) {
      jobs.push({
        title: titleMatch[1].trim(),
        company: (companyMatch?.[1] ?? "—").trim(),
        location: (locationMatch?.[1] ?? "Canada").trim(),
        url: `https://www.jobbank.gc.ca${hrefMatch[1]}`,
        postedAt: dateMatch?.[1]?.trim(),
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
    let source = "Job Bank Canada";
    try {
      jobs = await fetchJobBank(query, limit);
    } catch (e) {
      console.error("Job Bank fetch failed", e);
      jobs = [];
      source = "Job Bank Canada (unavailable)";
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