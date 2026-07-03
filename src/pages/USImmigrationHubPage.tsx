import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Award } from "lucide-react";
import { US_VISAS } from "@/data/usVisaData";
import USImmigrationDisclaimer from "@/components/USImmigrationDisclaimer";

const CANONICAL = "https://www.gargbrothers.ca/us-immigration";

const USImmigrationHubPage = () => {
  const work = US_VISAS.filter((v) => v.category === "Nonimmigrant Work");
  const green = US_VISAS.filter((v) => v.category === "Immigrant (Green Card)");

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: US_VISAS.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: v.name,
      url: `${CANONICAL}/${v.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>US Visa &amp; Green Card Guide 2026 — H-1B, L-1, O-1, TN, EB-1 to EB-5 | Garg Brothers</title>
        <meta
          name="description"
          content="Informational guide to major US work visas and green cards — H-1B, L-1, O-1, TN, EB-1, EB-2, EB-3 and EB-5. Requirements, timelines and how each pathway compares to Canadian PR."
        />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:title" content="US Visa & Green Card Guide 2026 | Garg Brothers" />
        <meta property="og:description" content="Requirements, timelines and Canada alternatives for the major US work visa and green card categories." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(itemList)}</script>
      </Helmet>

      <section className="border-b bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span>US Immigration</span>
          </nav>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            US Visa &amp; Green Card Guide 2026
          </h1>
          <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-3xl">
            A plain-English overview of the eight most-asked US immigration
            categories — four nonimmigrant work visas and four employment-based
            green cards — with side-by-side notes on how each pathway compares
            to Canadian permanent residence.
          </p>
          <USImmigrationDisclaimer />
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="h-5 w-5 text-blue-700" />
          <h2 className="font-display text-2xl font-bold">Nonimmigrant Work Visas</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {work.map((v) => (
            <Link
              key={v.slug}
              to={`/us-immigration/${v.slug}`}
              className="block rounded-xl border bg-card p-5 hover:border-blue-400 hover:shadow-md transition"
            >
              <div className="text-xs font-mono font-semibold text-blue-700">{v.code}</div>
              <div className="mt-1 font-display text-lg font-bold">{v.name}</div>
              <p className="mt-2 text-sm text-muted-foreground">{v.tagline}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
                Read guide <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-12 mb-4">
          <Award className="h-5 w-5 text-blue-700" />
          <h2 className="font-display text-2xl font-bold">Employment-Based Green Cards</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {green.map((v) => (
            <Link
              key={v.slug}
              to={`/us-immigration/${v.slug}`}
              className="block rounded-xl border bg-card p-5 hover:border-blue-400 hover:shadow-md transition"
            >
              <div className="text-xs font-mono font-semibold text-blue-700">{v.code}</div>
              <div className="mt-1 font-display text-lg font-bold">{v.name}</div>
              <p className="mt-2 text-sm text-muted-foreground">{v.tagline}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
                Read guide <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-xl border bg-muted/40 p-6">
          <h3 className="font-display text-lg font-bold">
            Facing a US green-card backlog? Talk to us about Canadian PR.
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We are Regulated Canadian Immigration Consultants (RCIC). If your
            EB-2, EB-3 or H-1B timeline is not working for your family, we can
            walk you through Express Entry, PNP and Global Talent options.
          </p>
          <Link
            to="/contact"
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Book a free Canada eligibility assessment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default USImmigrationHubPage;