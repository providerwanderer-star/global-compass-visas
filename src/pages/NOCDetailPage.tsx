import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle, MapPin, TrendingUp,
  Calculator, Briefcase, GraduationCap, ExternalLink, Compass,
} from "lucide-react";
import { nocData, teerInfo } from "@/data/nocData";
import { inDemandJobs } from "@/data/inDemandJobs";
import AnimatedSection from "@/components/AnimatedSection";
import ConnectedFooter from "@/components/ConnectedFooter";
import NotFound from "@/pages/NotFound";

/**
 * Estimated CRS impact bands for an NOC, derived from observed
 * Express Entry category-based draw cut-offs (2025-26).
 * Returns the realistic CRS range a candidate in this NOC needs to be
 * competitive in the most accessible category.
 */
function crsImpact(noc: { teer: number; eeEligible: boolean; category: string; code: string }): {
  range: string; bestCategory: string; note: string;
} {
  if (!noc.eeEligible) {
    return {
      range: "n/a",
      bestCategory: "Not Express Entry eligible",
      note: "TEER 4–5 occupations do not qualify for Express Entry. Most candidates in this NOC use a Provincial Nominee Program or a sector-specific PR pilot.",
    };
  }
  // Map by category — leverage the same buckets as inDemandJobs
  if (noc.category === "Healthcare") return {
    range: "420 – 470",
    bestCategory: "Healthcare category-based draw",
    note: "Recent healthcare draws cleared as low as CRS ~431 (2025-26).",
  };
  if (noc.category === "Trades & Skilled" || noc.code.startsWith("72") || noc.code.startsWith("73")) return {
    range: "350 – 420",
    bestCategory: "Trades or Transport category-based draw",
    note: "Trades draws have cleared at CRS 360; transport draws around 435.",
  };
  if (noc.category === "Information Technology" || noc.category === "Engineering") return {
    range: "470 – 510",
    bestCategory: "STEM category-based draw",
    note: "STEM draws sit in the high-470s — a PNP nomination or LMIA boost is the fastest accelerator.",
  };
  if (noc.category === "Agriculture & Food") return {
    range: "340 – 410",
    bestCategory: "Agriculture category + Agri-Food Pilot",
    note: "Lowest published cut-offs in 2025-26 (~355).",
  };
  if (noc.category === "Education") return {
    range: "400 – 470",
    bestCategory: "Education category-based draw",
    note: "New 2025 education category targets teachers and ECEs.",
  };
  return {
    range: "490 – 530",
    bestCategory: "General Express Entry draw",
    note: "General draws sit around CRS 505-515. Add a PNP (+600) or French scores to land an ITA faster.",
  };
}

const NOCDetailPage = () => {
  const { code } = useParams<{ code: string }>();
  const noc = useMemo(() => nocData.find((n) => n.code === code), [code]);

  if (!noc) return <NotFound />;

  const teer = teerInfo[noc.teer];
  const impact = crsImpact(noc);
  const linkedJob = inDemandJobs.find((j) => j.noc === noc.code);
  const url = `https://www.4acesvisa.com/noc/${noc.code}`;

  const occupationLD = {
    "@context": "https://schema.org",
    "@type": "Occupation",
    name: noc.title,
    occupationalCategory: `NOC ${noc.code}`,
    description: noc.description,
    url,
    estimatedSalary: {
      "@type": "MonetaryAmountDistribution",
      name: "base",
      currency: "CAD",
      duration: "P1Y",
      // salaryRange like "$70,000 – $110,000"
      minValue: Number(noc.salaryRange.split("–")[0].replace(/[^\d]/g, "")) || undefined,
      maxValue: Number(noc.salaryRange.split("–")[1]?.replace(/[^\d]/g, "")) || undefined,
    },
    occupationLocation: noc.topProvinces.map((p) => ({ "@type": "AdministrativeArea", name: p })),
    qualifications: teer.description,
    skills: noc.altTitles.join(", "),
  };

  const breadcrumbLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.4acesvisa.com/" },
      { "@type": "ListItem", position: 2, name: "NOC Finder", item: "https://www.4acesvisa.com/noc-finder" },
      { "@type": "ListItem", position: 3, name: `NOC ${noc.code} — ${noc.title}`, item: url },
    ],
  };

  const faqLD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Is NOC ${noc.code} (${noc.title}) eligible for Canada Express Entry?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: noc.eeEligible
            ? `Yes — ${noc.title} (NOC ${noc.code}) is TEER ${noc.teer}, which qualifies for Express Entry under FSWP, CEC and FSTP where applicable.`
            : `No — NOC ${noc.code} is TEER ${noc.teer}, which is not eligible for Express Entry. Provincial Nominee Programs may still apply.`,
        },
      },
      {
        "@type": "Question",
        name: `What CRS score do I need for NOC ${noc.code}?`,
        acceptedAnswer: { "@type": "Answer", text: `Aim for CRS ${impact.range} via the ${impact.bestCategory}. ${impact.note}` },
      },
      {
        "@type": "Question",
        name: `Which provinces hire ${noc.title}?`,
        acceptedAnswer: { "@type": "Answer", text: `Top hiring provinces: ${noc.topProvinces.join(", ")}.` },
      },
    ],
  };

  return (
    <div>
      <Helmet>
        <title>NOC {noc.code} — {noc.title} | TEER {noc.teer}, CRS Impact & PR Pathways | 4 Aces Visa</title>
        <meta name="description" content={`NOC ${noc.code} ${noc.title}: TEER ${noc.teer}, salary ${noc.salaryRange}, ${noc.eeEligible ? "Express Entry eligible" : "Not EE eligible"}. CRS impact ${impact.range}. PR pathways and live jobs.`} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={`NOC ${noc.code} — ${noc.title}`} />
        <meta property="og:description" content={`TEER ${noc.teer} · CRS ${impact.range} · ${noc.salaryRange}. PR pathways for ${noc.title} in Canada.`} />
        <meta property="og:url" content={url} />
        <script type="application/ld+json">{JSON.stringify(occupationLD)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLD)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLD)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <div className="border-b border-border bg-secondary/30">
        <div className="container-narrow mx-auto px-4 py-3 text-xs text-muted-foreground flex items-center gap-2">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/noc-finder" className="hover:text-primary">NOC Finder</Link>
          <span>/</span>
          <span className="text-foreground font-semibold">NOC {noc.code}</span>
        </div>
      </div>

      {/* HERO */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground py-12 md:py-16 px-4">
        <div className="container-narrow mx-auto">
          <Link to="/noc-finder" className="inline-flex items-center gap-1 text-primary-foreground/80 hover:text-primary-foreground text-sm mb-4">
            <ArrowLeft className="h-3 w-3" /> Back to NOC Finder
          </Link>
          <p className="text-gold font-semibold text-xs uppercase tracking-wider mb-2">{noc.category}</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-3">
            {noc.title}
          </h1>
          <p className="text-primary-foreground/85 text-base md:text-lg mb-4 max-w-2xl">
            NOC <span className="font-mono font-bold text-gold">{noc.code}</span> · {noc.description}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 bg-white/15 border border-white/30 text-xs font-bold px-3 py-1 rounded-full">
              {teer.label}
            </span>
            {noc.eeEligible ? (
              <span className="inline-flex items-center gap-1 bg-emerald-500/20 border border-emerald-300/40 text-emerald-50 text-xs font-bold px-3 py-1 rounded-full">
                <CheckCircle2 className="h-3 w-3" /> Express Entry Eligible
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 bg-destructive/30 border border-destructive/40 text-xs font-bold px-3 py-1 rounded-full">
                <XCircle className="h-3 w-3" /> Not EE Eligible
              </span>
            )}
            <span className="inline-flex items-center gap-1 bg-gold/25 border border-gold/40 text-gold text-xs font-bold px-3 py-1 rounded-full">
              <TrendingUp className="h-3 w-3" /> CRS {impact.range}
            </span>
          </div>
        </div>
      </section>

      {/* ANSWER-FIRST SUMMARY */}
      <section className="py-10 px-4 bg-secondary/30 border-b border-border">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <div className="grid md:grid-cols-4 gap-3">
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Salary (CAD/yr)</p>
                <p className="font-display font-bold text-foreground text-lg mt-1">{noc.salaryRange}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">TEER level</p>
                <p className="font-display font-bold text-foreground text-lg mt-1">TEER {noc.teer}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{teer.description}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">CRS impact</p>
                <p className="font-display font-bold text-foreground text-lg mt-1">{impact.range}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{impact.bestCategory}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Top provinces</p>
                <p className="font-display font-bold text-foreground text-sm mt-1 inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-primary" /> {noc.topProvinces.slice(0, 2).join(", ")}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">+{Math.max(0, noc.topProvinces.length - 2)} more</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12 px-4">
        <div className="container-narrow mx-auto grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Eligibility */}
            <article>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                Express Entry eligibility
              </h2>
              <p className="text-foreground leading-relaxed mb-3">
                {noc.eeEligible
                  ? `${noc.title} (NOC ${noc.code}) is classified as ${teer.label} and is eligible for Canada's Express Entry system. Your work in this NOC counts toward the Federal Skilled Worker Program (FSWP) and the Canadian Experience Class (CEC). ${noc.code.startsWith("72") || noc.code.startsWith("73") ? "It also qualifies for the Federal Skilled Trades Program (FSTP)." : ""}`
                  : `${noc.title} (NOC ${noc.code}) is classified as ${teer.label} and is NOT eligible for Express Entry. You may still pursue PR through Provincial Nominee Programs, the Atlantic Immigration Program, or sector-specific pilots.`}
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span><strong>TEER mapping:</strong> {teer.label} — {teer.description}</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span><strong>Best draw category:</strong> {impact.bestCategory}</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span><strong>CRS impact:</strong> Aim for {impact.range}. {impact.note}</span>
                </li>
              </ul>
            </article>

            {/* Pathways */}
            <article>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">PR pathways for NOC {noc.code}</h2>
              {linkedJob ? (
                <ul className="space-y-2">
                  {linkedJob.pathways.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm bg-secondary/60 rounded-lg px-3 py-2">
                      <Briefcase className="h-3.5 w-3.5 text-primary shrink-0" /> {p}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Standard pathways: Express Entry (FSWP / CEC{noc.code.startsWith("72") || noc.code.startsWith("73") ? " / FSTP" : ""})
                  {", "}Provincial Nominee Programs in {noc.topProvinces.slice(0, 2).join(" & ")}, and (where employer-driven) the Atlantic Immigration Program.
                </p>
              )}
              <div className="mt-4 p-4 bg-gold/10 border border-gold/30 rounded-xl">
                <p className="text-sm text-foreground">
                  Need a personalised plan? Use our{" "}
                  <Link to="/in-demand-jobs" className="text-primary hover:underline font-semibold">PR Pathway Engine</Link>{" "}
                  to compare every route by CRS, time, and cost.
                </p>
              </div>
            </article>

            {/* Study + alt titles */}
            {linkedJob?.studyPathways?.length ? (
              <article>
                <h2 className="font-display text-2xl font-bold text-foreground mb-3 inline-flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" /> Study pathways to this NOC
                </h2>
                <ul className="text-sm text-foreground list-disc list-inside space-y-1">
                  {linkedJob.studyPathways.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </article>
            ) : null}

            {noc.altTitles.length > 0 && (
              <article>
                <h2 className="font-display text-2xl font-bold text-foreground mb-3">Alternate job titles</h2>
                <div className="flex flex-wrap gap-2">
                  {noc.altTitles.map((t) => (
                    <span key={t} className="text-xs bg-secondary border border-border rounded-full px-3 py-1 text-foreground">{t}</span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  IRCC matches your <strong>primary duties</strong> — not your job title — to the NOC. If your duties match, alternate titles are accepted.
                </p>
              </article>
            )}

            {/* FAQ */}
            <article>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">FAQ — NOC {noc.code}</h2>
              <div className="space-y-2">
                {faqLD.mainEntity.map((q, i) => (
                  <details key={i} className="bg-card border border-border rounded-xl group">
                    <summary className="px-4 py-3 cursor-pointer list-none font-semibold text-sm text-foreground flex items-center justify-between gap-3">
                      <span>{q.name}</span>
                      <span className="text-gold text-xl select-none group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="px-4 pb-3 text-sm text-muted-foreground border-t border-border pt-2">{q.acceptedAnswer.text}</p>
                  </details>
                ))}
              </div>
            </article>
          </div>

          {/* Sidebar — sticky CTA */}
          <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
            <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl p-5">
              <h3 className="font-display text-lg font-bold mb-2">Your next step</h3>
              <p className="text-sm text-primary-foreground/90 mb-4">Move from "I have a NOC" to "I have a plan" — in under 5 minutes.</p>
              <div className="space-y-2">
                <Link to="/crs-calculator" className="flex items-center justify-between bg-white/15 hover:bg-white/25 rounded-lg px-3 py-2 text-sm font-semibold transition-colors">
                  <span className="inline-flex items-center gap-2"><Calculator className="h-4 w-4" /> Calculate my CRS</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
                {linkedJob && (
                  <Link to={`/in-demand-jobs?job=${linkedJob.slug}`} className="flex items-center justify-between bg-white/15 hover:bg-white/25 rounded-lg px-3 py-2 text-sm font-semibold transition-colors">
                    <span className="inline-flex items-center gap-2"><Briefcase className="h-4 w-4" /> Open in PR Pathway Engine</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
                <Link to="/express-entry/draws" className="flex items-center justify-between bg-white/15 hover:bg-white/25 rounded-lg px-3 py-2 text-sm font-semibold transition-colors">
                  <span className="inline-flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Latest draw history</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
                <Link to="/quiz" className="flex items-center justify-between bg-gold text-accent-foreground hover:bg-gold-dark rounded-lg px-3 py-2 text-sm font-semibold transition-colors">
                  <span className="inline-flex items-center gap-2"><Compass className="h-4 w-4" /> Get my best PR pathway</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            <a
              href={`https://www.jobbank.gc.ca/jobsearch/jobsearch?searchstring=${encodeURIComponent(noc.title)}&locationstring=Canada`}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-card border border-border rounded-xl p-4 hover:border-primary transition-colors"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">External</p>
              <p className="font-semibold text-sm text-foreground mt-1 inline-flex items-center gap-1">
                Live Job Bank Canada listings <ExternalLink className="h-3 w-3" />
              </p>
            </a>
          </aside>
        </div>
      </section>

      <ConnectedFooter
        tool={{ label: "PR Pathway Engine", href: "/in-demand-jobs" }}
        hub={{ label: "NOC Finder", href: "/noc-finder" }}
        funnel={{ label: "Get your best PR pathway", href: "/quiz" }}
      />
    </div>
  );
};

export default NOCDetailPage;