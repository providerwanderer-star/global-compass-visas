import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Sparkles } from "lucide-react";
import { settlementGuides } from "@/data/settlementData";
import SeoSchema from "@/components/SeoSchema";
import EligibilityForm from "@/components/EligibilityForm";

const SettlementHubPage = () => {
  const title = "Settle in Canada — Newcomer Step-by-Step Hub (2026) | 4 Aces Visa";
  const description =
    "Everything you need after landing: SIN, banking, healthcare, housing, schools, driver's licence. Free step-by-step guides from licensed RCIC consultants.";
  const canonical = "https://www.4acesvisa.com/settle-in-canada";

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: settlementGuides.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.4acesvisa.com/settle-in-canada/${g.slug}`,
      name: g.topic,
    })),
  };

  return (
    <div className="bg-background">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify(itemListLd)}</script>
      </Helmet>
      <SeoSchema breadcrumbs={[{ name: "Settle in Canada", url: "/settle-in-canada" }]} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background border-b border-border">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <p className="text-sm font-bold uppercase tracking-wider text-primary mb-2 inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4" /> One-Stop Move &amp; Settle Hub
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3">
            Settle in Canada — your first 90 days
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">
            Step-by-step guides for everything you need after landing: SIN, banking, healthcare,
            housing, schools, and driver's licence. Built for newcomers, by RCIC consultants.
          </p>
        </div>
      </section>

      {/* Guide grid */}
      <section className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {settlementGuides.map((g) => (
            <Link
              key={g.slug}
              to={`/settle-in-canada/${g.slug}`}
              className="bg-card rounded-2xl border border-border hover:border-primary p-5 card-interactive transition-all"
            >
              <div className="text-4xl mb-3" aria-hidden="true">{g.emoji}</div>
              <h2 className="font-display text-lg font-bold text-foreground mb-2">
                {g.topic}
              </h2>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {g.shortAnswer}
              </p>
              <span className="text-sm font-semibold text-primary inline-flex items-center gap-1">
                Read guide <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Lead form */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="text-center mb-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Need personalized settlement help?
            </h2>
            <p className="text-muted-foreground">
              Our RCIC team has helped 15,000+ newcomers land softly. Get a free settlement plan.
            </p>
          </div>
          <EligibilityForm
            sourcePage="settle-in-canada-hub"
            heading="Free Settlement Consultation"
            defaultValues={{ destination_country: "Canada" }}
          />
        </div>
      </section>
    </div>
  );
};

export default SettlementHubPage;