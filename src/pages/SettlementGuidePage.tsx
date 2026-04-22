import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, CheckCircle2, Lightbulb, FileText, DollarSign, Clock } from "lucide-react";
import { findSettlementGuide, settlementGuides } from "@/data/settlementData";
import AnswerBlock from "@/components/AnswerBlock";
import EligibilityForm from "@/components/EligibilityForm";
import SeoSchema from "@/components/SeoSchema";
import FreshnessBanner from "@/components/FreshnessBanner";
import { getFreshness } from "@/lib/freshness";
import NotFound from "@/pages/NotFound";
import RelatedLinks from "@/components/RelatedLinks";
import { linksForSettlement } from "@/lib/crossLinks";

const SettlementGuidePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? findSettlementGuide(slug) : null;
  if (!data) return <NotFound />;

  const canonical = `https://www.4acesvisa.com/settle-in-canada/${data.slug}`;
  const freshness = getFreshness("general");

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: data.topic,
    description: data.shortAnswer,
    totalTime: data.timeline,
    estimatedCost: { "@type": "MonetaryAmount", currency: "CAD", value: data.cost },
    step: data.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.detail,
    })),
  };

  return (
    <div className="bg-background">
      <Helmet>
        <title>{data.metaTitle}</title>
        <meta name="description" content={data.metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={data.metaTitle} />
        <meta property="og:description" content={data.metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.metaTitle} />
        <meta name="twitter:description" content={data.metaDescription} />
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        <script type="application/ld+json">{JSON.stringify(howToLd)}</script>
      </Helmet>
      <SeoSchema
        breadcrumbs={[
          { name: "Settle in Canada", url: "/settle-in-canada" },
          { name: data.topic, url: `/settle-in-canada/${data.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background border-b border-border">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="text-5xl mb-3" aria-hidden="true">{data.emoji}</div>
          <p className="text-sm font-bold uppercase tracking-wider text-primary mb-2">
            Move &amp; Settle Guide
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3">
            {data.topic}
          </h1>
        </div>
      </section>

      {/* AEO answer */}
      <section className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <FreshnessBanner topic="general" className="mb-5" />
        <AnswerBlock
          answer={data.shortAnswer}
          whoFor={data.whoFor}
          whoNotFor={data.whoNotFor}
          lastUpdated={freshness.lastUpdatedLabel}
        />
      </section>

      {/* Quick stats */}
      <section className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-card rounded-xl border border-border p-5 flex items-start gap-3">
            <DollarSign className="h-6 w-6 text-primary shrink-0 mt-1" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Cost</p>
              <p className="font-semibold text-foreground">{data.cost}</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-5 flex items-start gap-3">
            <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Timeline</p>
              <p className="font-semibold text-foreground">{data.timeline}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            Step-by-step
          </h2>
          <ol className="space-y-4">
            {data.steps.map((s, i) => (
              <li key={s.title} className="bg-card rounded-2xl border border-border p-5 flex items-start gap-4">
                <span className="bg-primary/10 text-primary font-bold rounded-full h-9 w-9 flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Documents needed */}
      <section className="section-padding">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" /> Documents needed
          </h2>
          <ul className="space-y-2">
            {data.documentsNeeded.map((d) => (
              <li key={d} className="flex items-start gap-3 bg-card rounded-xl border border-border p-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pro tips */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-gold" /> Pro tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.proTips.map((t) => (
              <div key={t} className="bg-card rounded-2xl border border-border p-5">
                <p className="text-sm text-foreground">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">FAQs</h2>
          <div className="space-y-4">
            {data.faqs.map((f) => (
              <details key={f.q} className="bg-card rounded-xl border border-border p-4 group">
                <summary className="font-semibold text-foreground cursor-pointer">{f.q}</summary>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related guides */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            Related newcomer guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {data.relatedSlugs
              .map((s) => settlementGuides.find((g) => g.slug === s))
              .filter((g): g is NonNullable<typeof g> => Boolean(g))
              .map((g) => (
                <Link
                  key={g.slug}
                  to={`/settle-in-canada/${g.slug}`}
                  className="bg-card rounded-xl border border-border hover:border-primary p-4 card-interactive"
                >
                  <div className="text-2xl mb-1" aria-hidden="true">{g.emoji}</div>
                  <p className="font-semibold text-foreground text-sm">{g.topic}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section className="section-padding">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="text-center mb-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Need personalized settlement help?
            </h2>
            <p className="text-muted-foreground">
              Free 60-second eligibility check by an RCIC.
            </p>
          </div>
          <EligibilityForm
            sourcePage={`settle-${data.slug}`}
            heading="Free Settlement Consultation"
            defaultValues={{ destination_country: "Canada" }}
          />
        </div>
      </section>

      <RelatedLinks
        eyebrow="Cross-reference"
        title="Other guides newcomers find useful"
        links={linksForSettlement(data.slug)}
      />
    </div>
  );
};

export default SettlementGuidePage;