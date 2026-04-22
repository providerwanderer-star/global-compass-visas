import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Calculator,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AnswerBlock from "@/components/AnswerBlock";
import EligibilityForm from "@/components/EligibilityForm";
import SeoSchema from "@/components/SeoSchema";
import FreshnessBanner from "@/components/FreshnessBanner";
import { getFreshness } from "@/lib/freshness";
import NotFound from "@/pages/NotFound";
import { findCRSBand, crsBands } from "@/data/crsBandData";

const CRSBandPage = () => {
  const { band: slug } = useParams<{ band: string }>();
  const data = slug ? findCRSBand(slug) : null;

  if (!data) return <NotFound />;

  const freshness = getFreshness("crs-band");

  const title = `Canada PR with CRS ${data.label} — Best Pathways 2026 | 4 Aces Visa`;
  const description = `Can you get Canada PR with a CRS score of ${data.range}? Best PNPs, category-based draws, study and work-permit strategies. Updated April 2026.`;
  const canonical = `https://www.4acesvisa.com/canada-pr/crs/${data.slug}`;

  const summary = data.realityCheck;

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
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>
      <SeoSchema
        breadcrumbs={[
          { name: "Canada PR by CRS", url: "/canada-pr/crs" },
          { name: `CRS ${data.label}`, url: `/canada-pr/crs/${data.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background border-b border-border">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <p className="text-sm font-bold uppercase tracking-wider text-primary mb-2">
            CRS Score Strategy
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3">
            Canada PR with CRS {data.label}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">
            Score range: {data.range}. Expected timeline: {data.expectedTimeline}.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/crs-calculator">
              <Button size="lg">
                Recalculate My CRS <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/pnp-tracker">
              <Button size="lg" variant="outline">
                See Live PNP Draws
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* AEO answer */}
      <section className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <FreshnessBanner topic="crs-band" className="mb-5" />
        <AnswerBlock
          answer={summary}
          whoFor={data.whoFor}
          whoNotFor={data.whoNotFor}
          lastUpdated={freshness.lastUpdatedLabel}
        />
      </section>

      {/* Best strategies */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            Best strategies for CRS {data.label}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.bestStrategies.map((s, i) => (
              <div
                key={s.title}
                className="bg-card rounded-2xl border border-border p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary/10 text-primary font-bold rounded-full h-7 w-7 flex items-center justify-center text-sm">
                    {i + 1}
                  </span>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {s.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended pathways */}
      <section className="section-padding">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            Recommended pathways
          </h2>
          <ul className="space-y-3">
            {data.recommendedPathways.map((p) => (
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

      {/* Top provinces */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            Best provinces for this CRS range
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.topProvinces.map((p) => (
              <div
                key={p.name}
                className="bg-card rounded-2xl border border-border p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {p.name}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">{p.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="section-padding">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            Free tools for CRS {data.label} candidates
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/crs-calculator", title: "CRS Calculator", icon: Calculator },
              { href: "/express-entry/draws", title: "Live EE Draws", icon: TrendingUp },
              { href: "/pnp-tracker", title: "PNP Tracker", icon: MapPin },
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

      {/* FAQs */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            FAQs — CRS {data.label}
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

      {/* Other CRS bands */}
      <section className="section-padding">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            PR strategies by other CRS scores
          </h2>
          <div className="flex flex-wrap gap-2">
            {crsBands
              .filter((b) => b.slug !== data.slug)
              .map((b) => (
                <Link
                  key={b.slug}
                  to={`/canada-pr/crs/${b.slug}`}
                  className="text-sm font-medium px-4 py-2 rounded-full border border-border bg-card hover:border-primary hover:text-primary transition-colors"
                >
                  CRS {b.label}
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
              Get a tailored CRS strategy
            </h2>
            <p className="text-muted-foreground">
              Free 60-second eligibility check — we'll email you a personalized improvement plan.
            </p>
          </div>
          <EligibilityForm
            sourcePage={`crs-band-${data.slug}`}
            heading="Free Eligibility Check"
            defaultValues={{ destination_country: "Canada", visa_type: "express-entry" }}
          />
        </div>
      </section>
    </div>
  );
};

export default CRSBandPage;