/**
 * live-jobs edge function
 * Returns live job listings for a given query, sourced from Canada's Job Bank
 * (jobbank.gc.ca) via Firecrawl JSON extraction (the page is JSF/PrimeFaces
 * rendered, so a static fetch + regex no longer works). Cached 1h at the edge.
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

async function fetchJobBankViaFirecrawl(
  query: string,
  limit: number,
  apiKey: string,
): Promise<JobOut[]> {
  const target = `https://www.jobbank.gc.ca/jobsearch/jobsearch?searchstring=${encodeURIComponent(
    query,
  )}&locationstring=Canada&sort=D`;

  const res = await fetch(`${FIRECRAWL_V2}/scrape`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: target,
      onlyMainContent: true,
      waitFor: 2500, // give JSF time to hydrate the results list
      formats: [
        {
          type: "json",
          prompt: `Extract the first ${limit} job postings from this Canada Job Bank search results page. For each job return: title (job title), company (employer name, use "—" if not visible), location (city + province), url (the absolute https://www.jobbank.gc.ca/jobsearch/jobposting/... link), postedAt (the posting date as shown). Return as { jobs: [...] }. Only include real job postings, ignore ads, filters, and navigation.`,
        },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Firecrawl ${res.status}: ${text.slice(0, 200)}`);
  }
  const data = await res.json();
  // Firecrawl v2 returns either { data: { json: {...} } } or { json: {...} }
  const extracted =
    data?.data?.json ?? data?.json ?? data?.data ?? {};
  const rawJobs: any[] = Array.isArray(extracted?.jobs)
    ? extracted.jobs
    : Array.isArray(extracted)
      ? extracted
      : [];

  return rawJobs
    .filter((j) => j && j.title && j.url)
    .slice(0, limit)
    .map((j): JobOut => ({
      title: String(j.title).trim(),
      company: String(j.company ?? "—").trim() || "—",
      location: String(j.location ?? "Canada").trim() || "Canada",
      url: String(j.url).startsWith("http")
        ? String(j.url)
        : `https://www.jobbank.gc.ca${String(j.url)}`,
      postedAt: j.postedAt ? String(j.postedAt).trim() : undefined,
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

    const apiKey = Deno.env.get("FIRECRAWL_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          source: "Job Bank Canada (unconfigured)",
          fetchedAt: new Date().toISOString(),
          jobs: [],
          error: "FIRECRAWL_API_KEY not configured",
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    let jobs: JobOut[] = [];
    let source = "Job Bank Canada";
    try {
      jobs = await fetchJobBankViaFirecrawl(query, limit, apiKey);
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