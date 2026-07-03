import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, Clock, Users, Globe2, FileText } from "lucide-react";
import { getUSVisa, US_VISAS } from "@/data/usVisaData";
import USImmigrationDisclaimer from "@/components/USImmigrationDisclaimer";
import NotFound from "@/pages/NotFound";

const BASE = "https://www.gargbrothers.ca/us-immigration";

const USVisaPage = () => {
  const { slug } = useParams();
  const visa = getUSVisa(slug);
  if (!visa) return <NotFound />;

  const canonical = `${BASE}/${visa.slug}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.gargbrothers.ca/" },
      { "@type": "ListItem", position: 2, name: "US Immigration", item: BASE },
      { "@type": "ListItem", position: 3, name: visa.name, item: canonical },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: visa.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const related = US_VISAS.filter((v) => v.slug !== visa.slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{`${visa.code} — ${visa.name} (2026 Guide) | Garg Brothers`}</title>
        <meta
          name="description"
          content={`Informational 2026 guide to the ${visa.code} (${visa.name}) — requirements, duration, processing, cap, path to green card and Canada alternatives. Not legal advice.`}
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={`${visa.code} — ${visa.name} (2026 Guide)`} />
        <meta property="og:description" content={visa.tagline} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className="border-b bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-10 md:py-14 max-w-4xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/us-immigration" className="hover:underline">US Immigration</Link>
            <span className="mx-2">/</span>
            <span>{visa.code}</span>
          </nav>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
            {visa.category}
          </div>
          <h1 className="mt-3 font-display text-3xl md:text-4xl font-bold text-foreground">
            {visa.code} — {visa.name}
          </h1>
          <p className="mt-3 text-base md:text-lg text-muted-foreground">{visa.tagline}</p>
          <USImmigrationDisclaimer />
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 max-w-4xl space-y-10">
        <div>
          <h2 className="font-display text-2xl font-bold mb-3">Overview</h2>
          <p className="text-muted-foreground leading-relaxed">{visa.summary}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border p-5">
            <div className="flex items-center gap-2 text-blue-700 mb-1">
              <Clock className="h-4 w-4" />
              <div className="text-xs font-semibold uppercase tracking-wide">Duration</div>
            </div>
            <p className="text-sm">{visa.duration}</p>
          </div>
          <div className="rounded-xl border p-5">
            <div className="flex items-center gap-2 text-blue-700 mb-1">
              <FileText className="h-4 w-4" />
              <div className="text-xs font-semibold uppercase tracking-wide">Processing</div>
            </div>
            <p className="text-sm">{visa.processing}</p>
          </div>
          <div className="rounded-xl border p-5">
            <div className="flex items-center gap-2 text-blue-700 mb-1">
              <Users className="h-4 w-4" />
              <div className="text-xs font-semibold uppercase tracking-wide">Annual cap</div>
            </div>
            <p className="text-sm">{visa.cap}</p>
          </div>
          <div className="rounded-xl border p-5">
            <div className="flex items-center gap-2 text-blue-700 mb-1">
              <Globe2 className="h-4 w-4" />
              <div className="text-xs font-semibold uppercase tracking-wide">Path to green card</div>
            </div>
            <p className="text-sm">{visa.path_to_green_card}</p>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold mb-3">Best for</h2>
          <ul className="space-y-2">
            {visa.bestFor.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-blue-700 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold mb-3">Core requirements</h2>
          <ul className="space-y-2">
            {visa.requirements.map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-blue-700 shrink-0" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border bg-blue-50/50 p-6">
          <h2 className="font-display text-xl font-bold mb-2">How this compares to Canadian PR</h2>
          <p className="text-sm text-blue-950/90">{visa.canadaAngle}</p>
          <Link
            to="/contact"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-800 hover:underline"
          >
            Talk to an RCIC about Canadian PR options <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {visa.faqs.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold mb-4">Frequently asked questions</h2>
            <div className="space-y-4">
              {visa.faqs.map((f) => (
                <div key={f.q} className="rounded-lg border p-4">
                  <div className="font-semibold text-sm">{f.q}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="font-display text-2xl font-bold mb-4">Other US visa guides</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {related.map((v) => (
              <Link
                key={v.slug}
                to={`/us-immigration/${v.slug}`}
                className="block rounded-lg border p-4 hover:border-blue-400 hover:shadow-sm transition"
              >
                <div className="text-xs font-mono font-semibold text-blue-700">{v.code}</div>
                <div className="mt-1 text-sm font-semibold">{v.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default USVisaPage;