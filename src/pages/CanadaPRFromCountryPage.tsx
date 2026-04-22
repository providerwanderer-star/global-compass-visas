import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Calculator,
  TrendingUp,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AnswerBlock from "@/components/AnswerBlock";
import EligibilityForm from "@/components/EligibilityForm";
import SeoSchema from "@/components/SeoSchema";
import FreshnessBanner from "@/components/FreshnessBanner";
import { getFreshness } from "@/lib/freshness";
import NotFound from "@/pages/NotFound";
import { findOriginCountry, originCountries } from "@/data/geoOriginData";

const CanadaPRFromCountryPage = () => {
  const { country: slug } = useParams<{ country: string }>();
  const data = slug ? findOriginCountry(slug) : null;

  if (!data) return <NotFound />;

  const freshness = getFreshness("geo-country");

  const title = `Canada PR from ${data.country} (2026) — Pathways, Cost & Timeline | 4 Aces Visa`;
  const description = `Complete 2026 guide to Canada PR from ${data.country}. Express Entry, PNP, study & work permits. Top NOC codes, cost (${data.estCostCAD}) and timeline (${data.avgTimelineMonths}).`;
  const canonical = `https://www.4acesvisa.com/canada-pr-from/${data.slug}`;

  const summary = `Skilled ${data.demonym} applicants typically reach Canada PR in ${data.avgTimelineMonths} via Express Entry, PNP or LMIA-based work permits. Total cost: ${data.estCostCAD}. Top occupations include ${data.topNocs
    .slice(0, 3)
    .map((n) => n.title)
    .join(", ")}.`;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="bg-background">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>
      <SeoSchema
        breadcrumbs={[
          { name: "Canada PR from", url: "/canada-pr-from" },
          { name: data.country, url: `/canada-pr-from/${data.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background border-b border-border">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="text-5xl mb-3" aria-hidden="true">
            {data.flag}
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3">
            Canada PR from {data.country} — 2026 Guide
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">
            Step-by-step pathways, costs, timeline and top NOC occupations for{" "}
            {data.demonym} applicants moving to Canada.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/crs-calculator">
              <Button size="lg">
                Check Your CRS Score <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/search">
              <Button size="lg" variant="outline">
                Find Your Pathway
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Answer block (AEO) */}
      <section className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <FreshnessBanner topic="geo-country" className="mb-5" />
        <AnswerBlock
          answer={summary}
          whoFor={data.whoFor}
          whoNotFor={data.whoNotFor}
          lastUpdated={freshness.lastUpdatedLabel}
        />
      </section>

      {/* Quick stats */}
      <section className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Avg timeline
            </p>
            <p className="font-display text-2xl font-bold text-foreground">
              {data.avgTimelineMonths}
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Est. total cost
            </p>
            <p className="font-display text-2xl font-bold text-foreground">
              {data.estCostCAD}
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Top occupations
            </p>
            <p className="font-display text-2xl font-bold text-foreground">
              {data.topNocs.length}+ NOCs
            </p>
          </div>
        </div>
      </section>

      {/* Top pathways */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            Top PR pathways for {data.demonym} applicants
          </h2>
          <ul className="space-y-3">
            {data.topPathways.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 bg-card rounded-xl border border-border p-4"
              >
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-foreground">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Top NOCs */}
      <section className="section-padding">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            High-demand NOC codes for {data.demonym} applicants
          </h2>
          <p className="text-muted-foreground mb-6">
            Click any occupation to see TEER level, salary range, demand provinces and PR
            eligibility.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.topNocs.map((n) => (
              <Link
                key={n.code}
                to={`/noc/${n.code}`}
                className="block bg-card rounded-xl border border-border hover:border-primary p-4 card-interactive transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-primary">
                    NOC {n.code}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">{n.title}</h3>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link
              to="/in-demand-jobs"
              className="text-sm font-semibold text-primary hover:underline"
            >
              See all in-demand jobs in Canada →
            </Link>
          </div>
        </div>
      </section>

      {/* Advantages & challenges */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" /> Key advantages
            </h2>
            <ul className="space-y-2">
              {data.keyAdvantages.map((a) => (
                <li key={a} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">•</span> {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-gold" /> Common challenges
            </h2>
            <ul className="space-y-2">
              {data.keyChallenges.map((c) => (
                <li key={c} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-gold mt-1">•</span> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="section-padding">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            Plan your move with our free tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { href: "/crs-calculator", title: "CRS Calculator", icon: Calculator },
              { href: "/express-entry/draws", title: "Live EE Draws", icon: TrendingUp },
              { href: "/pnp-tracker", title: "PNP Tracker", icon: MapPin },
              { href: "/in-demand-jobs", title: "In-Demand Jobs", icon: Briefcase },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <Link
                  key={t.href}
                  to={t.href}
                  className="bg-card rounded-xl border border-border hover:border-primary p-4 card-interactive"
                >
                  <Icon className="h-6 w-6 text-primary mb-2" />
                  <p className="font-semibold text-foreground">{t.title}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            FAQs — Canada PR from {data.country}
          </h2>
          <div className="space-y-4">
            {data.faqs.map((f) => (
              <details
                key={f.q}
                className="bg-card rounded-xl border border-border p-4 group"
              >
                <summary className="font-semibold text-foreground cursor-pointer">
                  {f.q}
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other origins */}
      <section className="section-padding">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            Canada PR from other countries
          </h2>
          <div className="flex flex-wrap gap-2">
            {originCountries
              .filter((o) => o.slug !== data.slug)
              .map((o) => (
                <Link
                  key={o.slug}
                  to={`/canada-pr-from/${o.slug}`}
                  className="text-sm font-medium px-4 py-2 rounded-full border border-border bg-card hover:border-primary hover:text-primary transition-colors"
                >
                  {o.flag} Canada PR from {o.country}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="text-center mb-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Get a personalized PR plan from {data.country}
            </h2>
            <p className="text-muted-foreground">
              Free 60-second eligibility check by an RCIC.
            </p>
          </div>
          <EligibilityForm
            sourcePage={`canada-pr-from-${data.slug}`}
            heading="Free Eligibility Check"
            defaultValues={{ destination_country: "Canada" }}
          />
        </div>
      </section>
    </div>
  );
};

export default CanadaPRFromCountryPage;