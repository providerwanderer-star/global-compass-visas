import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Briefcase, MapPin, TrendingUp, Filter, X, ArrowRight,
  Calculator, Search, Compass, ExternalLink, Clock, GraduationCap, RefreshCw,
} from "lucide-react";
import {
  inDemandJobs, ALL_INDUSTRIES, ALL_PROVINCES, ALL_PATHWAYS,
  type InDemandJob, type Industry, type Province, type PRPathway,
  getJobBySlug,
} from "@/data/inDemandJobs";
import { supabase } from "@/integrations/supabase/client";
import AnimatedSection from "@/components/AnimatedSection";
import ConnectedFooter from "@/components/ConnectedFooter";
import { Skeleton } from "@/components/ui/skeleton";

const TEER_LEVELS: (0 | 1 | 2 | 3)[] = [0, 1, 2, 3];
const LAST_UPDATED = "April 2026";

interface LiveJob {
  title: string;
  company: string;
  location: string;
  url: string;
  postedAt?: string;
}

const demandColor: Record<InDemandJob["demand"], string> = {
  "Very High": "bg-destructive/10 text-destructive border-destructive/30",
  High: "bg-gold/15 text-gold border-gold/40",
  Moderate: "bg-primary/10 text-primary border-primary/30",
};

const InDemandJobsPage = () => {
  const [params, setParams] = useSearchParams();
  const [industry, setIndustry] = useState<Industry | "All">("All");
  const [province, setProvince] = useState<Province | "All">("All");
  const [pathway, setPathway] = useState<PRPathway | "All">("All");
  const [teer, setTeer] = useState<number | "All">("All");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeSlug = params.get("job");
  const activeJob = activeSlug ? getJobBySlug(activeSlug) : undefined;

  const filtered = useMemo(() => {
    return inDemandJobs.filter((j) => {
      if (industry !== "All" && j.industry !== industry) return false;
      if (province !== "All" && !j.provinces.includes(province)) return false;
      if (pathway !== "All" && !j.pathways.includes(pathway)) return false;
      if (teer !== "All" && j.teer !== teer) return false;
      return true;
    });
  }, [industry, province, pathway, teer]);

  const clearFilters = () => {
    setIndustry("All"); setProvince("All"); setPathway("All"); setTeer("All");
  };
  const activeFilterCount =
    (industry !== "All" ? 1 : 0) + (province !== "All" ? 1 : 0) +
    (pathway !== "All" ? 1 : 0) + (teer !== "All" ? 1 : 0);

  // JSON-LD: ItemList of OccupationalExperienceRequirements / Occupation
  const itemListLD = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "In-Demand Jobs in Canada for PR — 2026",
    itemListElement: inDemandJobs.map((j, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Occupation",
        name: j.title,
        occupationalCategory: `NOC ${j.noc}`,
        estimatedSalary: {
          "@type": "MonetaryAmountDistribution",
          name: "base",
          currency: "CAD",
          duration: "P1Y",
          minValue: j.salaryLow,
          maxValue: j.salaryHigh,
        },
        url: `https://www.4acesvisa.com/in-demand-jobs?job=${j.slug}`,
      },
    })),
  };

  const faqLD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What jobs are most in demand in Canada for PR in 2026?",
        acceptedAnswer: { "@type": "Answer", text: "Registered Nurses (NOC 31301), Software Developers (21232), Electricians (72200), Long-Haul Truck Drivers (73300), Early Childhood Educators (42202), Welders (72106) and Personal Support Workers (33102) face the lowest CRS cut-offs through Express Entry's category-based draws and dedicated PR pilots." },
      },
      {
        "@type": "Question",
        name: "Which Canadian PR pathway is fastest for an in-demand job?",
        acceptedAnswer: { "@type": "Answer", text: "Category-based Express Entry draws (Healthcare ~431, Trades ~360, Agriculture ~355) deliver PR in 6 months for eligible occupations. Provincial Nominee Programs add 600 CRS points and the Atlantic Immigration Program processes employer-driven PR in 6–12 months." },
      },
      {
        "@type": "Question",
        name: "Do I need a job offer for Canada PR?",
        acceptedAnswer: { "@type": "Answer", text: "No. Federal Skilled Worker Program (FSWP) under Express Entry does not require a job offer. A valid LMIA-backed offer adds 50–200 CRS points; PNP nominations add 600." },
      },
      {
        "@type": "Question",
        name: "How do I find my NOC code?",
        acceptedAnswer: { "@type": "Answer", text: "Use the free NOC Finder at /noc-finder to match your role to the correct NOC 2021 code and TEER level — required for every Express Entry profile." },
      },
    ],
  };

  return (
    <div>
      <Helmet>
        <title>In-Demand Jobs in Canada for PR 2026 | NOC + Pathway Engine | 4 Aces Visa</title>
        <meta name="description" content="Canada's most in-demand jobs for immigration in 2026. Browse NOC codes, TEER levels, and provincial demand for healthcare, trades, tech, and more." />
        <link rel="canonical" href="https://www.4acesvisa.com/in-demand-jobs" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="4 Aces Visa" />
        <meta property="og:title" content="In-Demand Jobs in Canada for PR 2026 | NOC + Pathway Engine | 4 Aces Visa" />
        <meta property="og:description" content="Canada's most in-demand jobs for immigration in 2026. Browse NOC codes, TEER levels, and provincial demand for healthcare, trades, tech, and more." />
        <meta property="og:url" content="https://www.4acesvisa.com/in-demand-jobs" />
        <meta property="og:image" content="https://www.4acesvisa.com/og-default.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@4acesvisa" />
        <meta name="twitter:image" content="https://www.4acesvisa.com/og-default.jpg" />
        <script type="application/ld+json">{JSON.stringify(itemListLD)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLD)}</script>
        <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.4acesvisa.com/"},{"@type":"ListItem","position":2,"name":"In-Demand Jobs","item":"https://www.4acesvisa.com/in-demand-jobs"}]})}</script>
      </Helmet>

      {/* HERO */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground py-16 md:py-24 px-4">
        <div className="container-narrow mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-gold/20 text-gold border border-gold/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Clock className="h-3 w-3" /> Updated {LAST_UPDATED}
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">
            In-Demand Jobs in Canada for PR
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            The fastest Canadian permanent residency in 2026 is occupation-driven.
            Find your NOC, the lowest CRS draw cut-off, and every PR pathway you qualify for —
            in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/crs-calculator" className="inline-flex items-center gap-2 bg-gold text-accent-foreground hover:bg-gold-dark font-semibold px-5 py-3 rounded-lg shadow-gold transition-colors">
              <Calculator className="h-4 w-4" /> Check your CRS score
            </Link>
            <Link to="/noc-finder" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/30 font-semibold px-5 py-3 rounded-lg transition-colors">
              <Search className="h-4 w-4" /> Find your NOC code
            </Link>
            <Link to="/quiz" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/30 font-semibold px-5 py-3 rounded-lg transition-colors">
              <Compass className="h-4 w-4" /> Get your PR pathway
            </Link>
          </div>
        </div>
      </section>

      {/* ANSWER-FIRST AEO */}
      <section className="py-10 px-4 bg-secondary/40 border-b border-border">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3">Quick answer</h2>
            <p className="text-foreground leading-relaxed">
              In 2026, Canada's lowest-CRS PR pathways belong to <strong>healthcare (CRS ~431)</strong>,
              <strong> trades (~360)</strong> and <strong>agriculture (~355)</strong> via Express Entry's
              category-based draws. Pair an in-demand NOC with a provincial nomination
              (+600 CRS) or the Atlantic Immigration Program for the highest approval odds.
            </p>
            <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-sm text-foreground">
              <li>• 16 occupations curated from IRCC category-based draws</li>
              <li>• Direct links to NOC code, CRS calculator and live draws</li>
              <li>• Live Canadian job listings refreshed hourly</li>
              <li>• Province-by-province PNP eligibility per role</li>
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* STICKY FILTERS */}
      <div className="sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur border-b border-border shadow-sm">
        <div className="container-narrow mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setFiltersOpen((o) => !o)}
              className="md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary text-foreground text-sm font-semibold"
            >
              <Filter className="h-4 w-4" /> Filters
              {activeFilterCount > 0 && (
                <span className="bg-gold text-accent-foreground rounded-full px-2 text-[10px]">{activeFilterCount}</span>
              )}
            </button>
            <p className="text-sm text-muted-foreground hidden md:block">
              Showing <strong className="text-foreground">{filtered.length}</strong> of {inDemandJobs.length} occupations
            </p>
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="text-xs text-primary hover:underline inline-flex items-center gap-1">
                <X className="h-3 w-3" /> Clear all
              </button>
            )}
          </div>

          <div className={`${filtersOpen ? "block" : "hidden"} md:grid grid-cols-1 md:grid-cols-4 gap-2 mt-3`}>
            <select value={industry} onChange={(e) => setIndustry(e.target.value as Industry | "All")} className="rounded-lg border border-border bg-card text-sm px-3 py-2">
              <option value="All">All industries</option>
              {ALL_INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
            <select value={province} onChange={(e) => setProvince(e.target.value as Province | "All")} className="rounded-lg border border-border bg-card text-sm px-3 py-2">
              <option value="All">All provinces</option>
              {ALL_PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <select value={pathway} onChange={(e) => setPathway(e.target.value as PRPathway | "All")} className="rounded-lg border border-border bg-card text-sm px-3 py-2">
              <option value="All">All PR pathways</option>
              {ALL_PATHWAYS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <select value={teer.toString()} onChange={(e) => setTeer(e.target.value === "All" ? "All" : Number(e.target.value))} className="rounded-lg border border-border bg-card text-sm px-3 py-2">
              <option value="All">All TEER levels</option>
              {TEER_LEVELS.map((t) => <option key={t} value={t}>TEER {t}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* JOB GRID */}
      <section className="py-10 px-4">
        <div className="container-narrow mx-auto">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No occupations match these filters. <button onClick={clearFilters} className="text-primary underline">Reset filters</button></p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((j) => (
                <article key={j.slug} className="bg-card border border-border rounded-2xl p-5 hover:border-primary hover:shadow-elevated transition-all flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{j.industry}</span>
                      <h3 className="font-display text-lg font-bold text-foreground leading-tight mt-1">{j.title}</h3>
                    </div>
                    <span className={`shrink-0 text-[10px] font-bold uppercase border rounded-full px-2 py-0.5 ${demandColor[j.demand]}`}>{j.demand}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <Link to={`/noc/${j.noc}`} className="bg-secondary/60 hover:bg-secondary rounded-lg px-2 py-1.5 transition-colors">
                      <span className="text-muted-foreground">NOC</span>
                      <p className="font-bold text-primary">{j.noc} <span className="text-foreground font-normal">· TEER {j.teer}</span></p>
                    </Link>
                    <div className="bg-secondary/60 rounded-lg px-2 py-1.5">
                      <span className="text-muted-foreground">Salary</span>
                      <p className="font-bold text-foreground">${(j.salaryLow / 1000).toFixed(0)}k–${(j.salaryHigh / 1000).toFixed(0)}k</p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground inline-flex items-center gap-1 mb-3">
                    <MapPin className="h-3 w-3 shrink-0" /> {j.provinces.slice(0, 3).join(", ")}{j.provinces.length > 3 ? "…" : ""}
                  </p>

                  {j.recentDrawCRS && (
                    <p className="text-xs text-gold font-semibold inline-flex items-center gap-1 mb-3">
                      <TrendingUp className="h-3 w-3" /> Recent draw CRS: {j.recentDrawCRS}
                    </p>
                  )}

                  <div className="mt-auto flex gap-2 pt-3 border-t border-border">
                    <button
                      onClick={() => setParams({ job: j.slug })}
                      className="flex-1 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-3 py-2 transition-colors inline-flex items-center justify-center gap-1"
                    >
                      View PR pathways <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 bg-secondary/40 border-t border-border">
        <div className="container-narrow mx-auto max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqLD.mainEntity.map((q, i) => (
              <details key={i} className="bg-card rounded-xl border border-border overflow-hidden group">
                <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer list-none font-semibold text-foreground text-sm hover:bg-muted/30 transition-colors">
                  <span>{q.name}</span>
                  <span className="text-gold text-xl flex-shrink-0 select-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-4 border-t border-border pt-3 text-sm text-muted-foreground">{q.acceptedAnswer.text}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ConnectedFooter
        tool={{ label: "NOC Code Finder", href: "/noc-finder" }}
        hub={{ label: "Express Entry Draw History", href: "/express-entry/draws" }}
        funnel={{ label: "Get your best PR pathway", href: "/quiz" }}
      />

      {activeJob && (
        <JobDetailDrawer job={activeJob} onClose={() => setParams({})} />
      )}
    </div>
  );
};

/** Slide-over detail panel — opened via ?job=slug */
const JobDetailDrawer = ({ job, onClose }: { job: InDemandJob; onClose: () => void }) => {
  const [live, setLive] = useState<LiveJob[] | null>(null);
  const [liveLoading, setLiveLoading] = useState(true);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLiveLoading(true);
    setLive(null);
    supabase.functions.invoke("live-jobs", {
      body: { query: job.liveJobQuery, limit: 6 },
    }).then(({ data, error }) => {
      if (cancelled) return;
      if (error) { setLive([]); setLiveLoading(false); return; }
      setLive((data?.jobs as LiveJob[]) ?? []);
      setFetchedAt(data?.fetchedAt ?? null);
      setLiveLoading(false);
    });
    return () => { cancelled = true; };
  }, [job.liveJobQuery]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      <button
        aria-label="Close detail"
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl bg-background h-full overflow-y-auto shadow-2xl border-l border-border">
        <header className="sticky top-0 bg-background/95 backdrop-blur border-b border-border px-5 py-4 flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{job.industry}</span>
            <h2 className="font-display text-xl font-bold text-foreground">{job.title}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              <Link to={`/noc/${job.noc}`} className="text-primary hover:underline font-semibold">NOC {job.noc}</Link> · TEER {job.teer} · ${(job.salaryLow / 1000).toFixed(0)}k–${(job.salaryHigh / 1000).toFixed(0)}k
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary" aria-label="Close"><X className="h-5 w-5" /></button>
        </header>

        <div className="p-5 space-y-6">
          {/* Overview */}
          <section>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">Overview</h3>
            <p className="text-sm text-foreground leading-relaxed">{job.summary}</p>
          </section>

          {/* PR pathways */}
          <section>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">PR pathways you qualify for</h3>
            <ul className="space-y-1.5">
              {job.pathways.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-foreground bg-secondary/60 rounded-lg px-3 py-2">
                  <Briefcase className="h-3.5 w-3.5 text-primary shrink-0" /> {p}
                </li>
              ))}
            </ul>
          </section>

          {/* Draw insight */}
          {job.recentDrawCRS && (
            <section className="bg-gold/10 border border-gold/30 rounded-xl p-4">
              <h3 className="font-display text-sm font-bold text-foreground mb-1 inline-flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-gold" /> Latest draw insight
              </h3>
              <p className="text-sm text-foreground">
                Most recent category cut-off: <strong>CRS {job.recentDrawCRS}</strong>.{" "}
                <Link to="/express-entry/draws" className="text-primary hover:underline">View full draw history →</Link>
              </p>
            </section>
          )}

          {/* Study pathways */}
          <section>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2 inline-flex items-center gap-2">
              <GraduationCap className="h-4 w-4" /> Study pathways
            </h3>
            <ul className="text-sm text-foreground list-disc list-inside space-y-1">
              {job.studyPathways.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </section>

          {/* Live jobs */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">Live job listings</h3>
              {fetchedAt && (
                <span className="text-[10px] text-muted-foreground inline-flex items-center gap-1">
                  <RefreshCw className="h-3 w-3" /> {new Date(fetchedAt).toLocaleString()}
                </span>
              )}
            </div>
            {liveLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
              </div>
            ) : live && live.length > 0 ? (
              <ul className="space-y-2">
                {live.map((l, i) => (
                  <li key={i}>
                    <a href={l.url} target="_blank" rel="noopener noreferrer" className="block bg-card border border-border rounded-lg p-3 hover:border-primary transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{l.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{l.company} · {l.location}</p>
                        </div>
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-1" />
                      </div>
                      {l.postedAt && <p className="text-[10px] text-muted-foreground mt-1">{l.postedAt}</p>}
                    </a>
                  </li>
                ))}
                <li className="text-[10px] text-muted-foreground text-center pt-1">Source: Job Bank Canada · refreshed hourly</li>
              </ul>
            ) : (
              <p className="text-xs text-muted-foreground">Live feed unavailable. <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" href={`https://www.jobbank.gc.ca/jobsearch/jobsearch?searchstring=${encodeURIComponent(job.liveJobQuery)}&locationstring=Canada`}>Search Job Bank →</a></p>
            )}
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl p-5">
            <h3 className="font-display text-lg font-bold mb-1">Ready to start your PR application?</h3>
            <p className="text-sm text-primary-foreground/90 mb-4">Get a free assessment from licensed consultants — by immigrants, for immigrants.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Link to="/crs-calculator" className="bg-white/15 hover:bg-white/25 text-center text-sm font-semibold rounded-lg px-3 py-2 transition-colors">CRS score</Link>
              <Link to="/noc-finder" className="bg-white/15 hover:bg-white/25 text-center text-sm font-semibold rounded-lg px-3 py-2 transition-colors">NOC finder</Link>
              <Link to="/quiz" className="bg-gold text-accent-foreground hover:bg-gold-dark text-center text-sm font-semibold rounded-lg px-3 py-2 transition-colors">PR pathway</Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InDemandJobsPage;