import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  Briefcase,
  Calculator,
  GraduationCap,
  MapPin,
  Plane,
  Award,
  Heart,
  Search as SearchIcon,
  TrendingUp,
} from "lucide-react";
import GlobalImmigrationSearch from "@/components/GlobalImmigrationSearch";
import SeoSchema from "@/components/SeoSchema";
import { Button } from "@/components/ui/button";
import EligibilityForm from "@/components/EligibilityForm";
import { nocData } from "@/data/nocData";

interface Recommendation {
  id: string;
  title: string;
  blurb: string;
  href: string;
  cta: string;
  icon: typeof Award;
  score: number;
  tag?: string;
}

const SearchResultsPage = () => {
  const [params] = useSearchParams();
  const q = (params.get("q") ?? "").trim();
  const pathway = params.get("pathway") ?? "";
  const crs = params.get("crs") ?? "";
  const province = params.get("province") ?? "";
  const jobOffer = params.get("jobOffer") ?? "";
  const origin = params.get("origin") ?? "";
  const timeline = params.get("timeline") ?? "";

  // ── NOC matches ─────────────────────────────────────────
  const nocMatches = useMemo(() => {
    if (!q) return [];
    const needle = q.toLowerCase();
    return nocData
      .filter(
        (n) =>
          n.title.toLowerCase().includes(needle) ||
          n.code.includes(needle) ||
          n.altTitles.some((t) => t.toLowerCase().includes(needle)) ||
          n.category.toLowerCase().includes(needle),
      )
      .slice(0, 6);
  }, [q]);

  // ── Pathway recommendations (scored) ────────────────────
  const recommendations = useMemo<Recommendation[]>(() => {
    const recs: Recommendation[] = [];

    // Express Entry
    let eeScore = 50;
    if (pathway === "express-entry") eeScore += 40;
    if (crs === "450-500" || crs === "500+") eeScore += 25;
    if (crs === "400-450") eeScore += 15;
    if (crs === "<350") eeScore -= 20;
    if (jobOffer === "yes" || jobOffer === "lmia") eeScore += 10;
    recs.push({
      id: "ee",
      title: "Express Entry — Federal PR",
      blurb:
        "Fastest federal PR pathway (6–8 months). Best fit for skilled workers with CLB 7+ English and competitive CRS scores.",
      href: "/express-entry",
      cta: "Open Express Entry hub",
      icon: Award,
      score: eeScore,
      tag: "6–8 months",
    });

    // PNP
    let pnpScore = 45;
    if (pathway === "pnp") pnpScore += 40;
    if (crs === "350-400" || crs === "400-450") pnpScore += 25; // PNP adds 600
    if (province && province !== "any") pnpScore += 15;
    recs.push({
      id: "pnp",
      title: "Provincial Nominee Program (PNP)",
      blurb:
        "A provincial nomination adds 600 CRS points — a game-changer for moderate scores. Track live PNP draws across all 13 provinces.",
      href: "/pnp-tracker",
      cta: "View PNP draws",
      icon: MapPin,
      score: pnpScore,
      tag: "+600 CRS",
    });

    // Study → PR
    let studyScore = 40;
    if (pathway === "study") studyScore += 45;
    if (timeline === "24+") studyScore += 15;
    if (crs === "<350") studyScore += 10;
    recs.push({
      id: "study",
      title: "Study → PGWP → PR",
      blurb:
        "DLI admission + study permit + 3-year PGWP + Canadian Experience Class. Best for younger applicants planning 2–5 years.",
      href: "/services/student-visa",
      cta: "Explore study pathway",
      icon: GraduationCap,
      score: studyScore,
      tag: "2–5 year plan",
    });

    // Work / LMIA
    let workScore = 40;
    if (pathway === "work") workScore += 45;
    if (jobOffer === "yes" || jobOffer === "lmia") workScore += 25;
    recs.push({
      id: "lmia",
      title: "LMIA Work Permit → PR",
      blurb:
        "Employer-driven route. A valid LMIA adds 50–200 CRS points and can lead directly to PR via CEC after 12 months of Canadian experience.",
      href: "/services/lmia-assistance",
      cta: "LMIA assistance",
      icon: Briefcase,
      score: workScore,
      tag: "+50–200 CRS",
    });

    // Family
    let famScore = 25;
    if (pathway === "family") famScore += 60;
    recs.push({
      id: "family",
      title: "Family Sponsorship",
      blurb:
        "Sponsor a spouse, partner, dependent children, parents or grandparents. PR for sponsored family members.",
      href: "/services/family-sponsorship",
      cta: "Family sponsorship",
      icon: Heart,
      score: famScore,
    });

    // Visitor
    let visScore = 20;
    if (pathway === "visitor") visScore += 60;
    recs.push({
      id: "visitor",
      title: "Visitor / Super Visa",
      blurb:
        "Short-term visit or 10-year multi-entry Super Visa for parents and grandparents (5-year stays per visit).",
      href: "/services/visitor-visa",
      cta: "Visitor visa info",
      icon: Plane,
      score: visScore,
    });

    return recs.sort((a, b) => b.score - a.score);
  }, [pathway, crs, province, jobOffer, timeline]);

  // ── Tools row ───────────────────────────────────────────
  const tools = [
    {
      title: "CRS Calculator",
      desc: "Calculate your Express Entry score in 2 minutes.",
      href: "/crs-calculator",
      icon: Calculator,
    },
    {
      title: "NOC Finder",
      desc: "Find your TEER level and Express Entry eligibility.",
      href: "/noc-finder",
      icon: SearchIcon,
    },
    {
      title: "Live Express Entry Draws",
      desc: "All recent draws, cutoffs and category trends.",
      href: "/express-entry/draws",
      icon: TrendingUp,
    },
    {
      title: "Cost Calculator",
      desc: "Government fees + total move cost estimate.",
      href: "/immigration-cost-calculator",
      icon: Calculator,
    },
  ];

  // ── Active filter chips ─────────────────────────────────
  const activeChips = [
    q && { label: `“${q}”`, key: "q" },
    pathway && { label: pathway.replace("-", " "), key: "pathway" },
    crs && { label: `CRS ${crs}`, key: "crs" },
    province && { label: province, key: "province" },
    jobOffer && { label: `Job offer: ${jobOffer}`, key: "jobOffer" },
    origin && { label: `From ${origin}`, key: "origin" },
    timeline && { label: `Timeline ${timeline}`, key: "timeline" },
  ].filter(Boolean) as { label: string; key: string }[];

  // ── SEO ─────────────────────────────────────────────────
  const seoTitle = q
    ? `Search: ${q} — Immigration Pathways & NOC | 4 Aces Visa`
    : "Immigration Search — Find Your Pathway | 4 Aces Visa";

  const seoDesc = q
    ? `Find immigration pathways, NOC codes, PR options and provinces matching “${q}”. Personalized recommendations for Canada Express Entry, PNP, study and work permits.`
    : "Search Canadian immigration pathways by occupation, CRS score, province and pathway. Personalized PR, study and work permit matches.";

  return (
    <div className="bg-background min-h-screen">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href="https://www.4acesvisa.com/search" />
        <meta name="robots" content="noindex,follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:url" content="https://www.4acesvisa.com/search" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
      </Helmet>
      <SeoSchema
        breadcrumbs={[{ name: "Search", url: "/search" }]}
      />

      {/* Search hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background border-b border-border">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            {q ? `Results for “${q}”` : "Find your immigration pathway"}
          </h1>
          <p className="text-muted-foreground mb-6">
            Personalized matches across pathways, NOC codes and tools — based on your filters.
          </p>
          <GlobalImmigrationSearch />

          {activeChips.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {activeChips.map((c) => (
                <span
                  key={c.key}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {c.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pathway recommendations */}
      <section className="section-padding">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            Recommended pathways
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.slice(0, 4).map((r, i) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.id}
                  className={`bg-card rounded-2xl border-2 p-5 card-interactive transition-all ${
                    i === 0 ? "border-primary shadow-elevated" : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-primary/10 text-primary rounded-lg p-2">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {i === 0 && (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                            Best match
                          </span>
                        )}
                        {r.tag && (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-gold/15 text-gold px-2 py-0.5 rounded-full">
                            {r.tag}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground">
                        {r.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{r.blurb}</p>
                  <Link to={r.href}>
                    <Button size="sm" variant={i === 0 ? "default" : "outline"}>
                      {r.cta} <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NOC matches */}
      {nocMatches.length > 0 && (
        <section className="section-padding section-light">
          <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
              Matching NOC occupations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {nocMatches.map((n) => (
                <Link
                  key={n.code}
                  to={`/noc/${n.code}`}
                  className="block bg-card rounded-xl border border-border hover:border-primary p-4 transition-all card-interactive"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold text-primary">
                      NOC {n.code}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                      TEER {n.teer}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{n.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {n.description}
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-6">
              <Link
                to="/noc-finder"
                className="text-sm font-semibold text-primary hover:underline"
              >
                See all 30+ NOC codes in the NOC Finder →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Tools */}
      <section className="section-padding">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            Free tools to take the next step
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {tools.map((t) => {
              const Icon = t.icon;
              return (
                <Link
                  key={t.href}
                  to={t.href}
                  className="block bg-card rounded-xl border border-border hover:border-primary p-4 transition-all card-interactive"
                >
                  <Icon className="h-6 w-6 text-primary mb-2" />
                  <h3 className="font-semibold text-foreground mb-1">{t.title}</h3>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lead capture */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="text-center mb-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Get a personalized immigration plan
            </h2>
            <p className="text-muted-foreground">
              An RCIC will review your search and email you a tailored 60-second eligibility
              report — free.
            </p>
          </div>
          <EligibilityForm
            sourcePage={`search${pathway ? `-${pathway}` : ""}${crs ? `-crs${crs}` : ""}`}
            heading="Free Eligibility Report"
          />
        </div>
      </section>
    </div>
  );
};

export default SearchResultsPage;