import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, ArrowRight, MapPin, Plane } from "lucide-react";
import SeoSchema from "@/components/SeoSchema";
import AuthorByline from "@/components/AuthorByline";
import EligibilityForm from "@/components/EligibilityForm";
import { getOriginCity, getOriginCountry } from "@/data/originGeoData";

const SITE = "https://www.gargbrothers.ca";

const OriginCityPage = () => {
  const { country, city } = useParams<{ country: string; city: string }>();
  const cityData = country && city ? getOriginCity(country, city) : undefined;
  const countryData = country ? getOriginCountry(country) : undefined;

  if (!cityData || !countryData) return <Navigate to="/" replace />;

  const canonical = `${SITE}/from/${cityData.countrySlug}/${cityData.slug}`;
  const headline = `${cityData.name} to Canada Immigration Guide`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cityData.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const otherCities = countryData.cities.filter((s) => s !== cityData.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{cityData.metaTitle}</title>
        <meta name="description" content={cityData.metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={cityData.metaTitle} />
        <meta property="og:description" content={cityData.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <SeoSchema
        breadcrumbs={[
          { name: `${countryData.name} to Canada`, url: `/${countryData.slug}` },
          { name: `${cityData.name} to Canada`, url: `/from/${countryData.slug}/${cityData.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Plane className="h-3.5 w-3.5" />
              <span aria-hidden>{countryData.flag}</span> {cityData.name}, {countryData.name} → 🇨🇦 Canada
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              {headline}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{cityData.hook}</p>

            <div className="mt-6">
              <AuthorByline
                articleHeadline={headline}
                articleUrl={`/from/${countryData.slug}/${cityData.slug}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why move */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">
            Why people move from {cityData.name} to Canada
          </h2>
          <ul className="space-y-3">
            {cityData.whyMove.map((item, i) => (
              <li key={i} className="flex gap-3 rounded-lg border border-border bg-card p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Top pathways + destinations */}
      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top pathways from {cityData.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {cityData.topPathways.map((p, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                    <span className="text-foreground">{p}</span>
                  </li>
                ))}
              </ol>
              <Link
                to={`/${countryData.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                Full {countryData.name} pathway guide <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Top Canadian destinations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {cityData.destinationCities.map((d, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-foreground">{d}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQs */}
      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
            {cityData.name} to Canada — questions people ask
          </h2>
          <Accordion
            type="single"
            collapsible
            className="rounded-lg border border-border bg-card"
          >
            {cityData.faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="px-4">
                <AccordionTrigger className="text-left text-base font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Lead form */}
      <section className="bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                Plan your move from {cityData.name} to Canada
              </h2>
              <p className="mt-2 text-muted-foreground">
                Free, no-obligation eligibility check. We'll map your {cityData.name} profile to
                the right Canadian pathway.
              </p>
            </div>
            <EligibilityForm
              sourcePage={`from-${cityData.countrySlug}-${cityData.slug}`}
              heading={`Free eligibility check — ${cityData.name} to Canada`}
            />
          </div>
        </div>
      </section>

      {/* Related city corridors */}
      {otherCities.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              Other {countryData.name} cities → Canada
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {otherCities.map((slug) => (
                <Link
                  key={slug}
                  to={`/from/${countryData.slug}/${slug}`}
                  className="group rounded-lg border border-border bg-card p-5 transition hover:border-primary hover:shadow-md"
                >
                  <div className="text-lg font-semibold capitalize text-foreground group-hover:text-primary">
                    {slug.replace(/-/g, " ")} → Canada
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1 text-sm text-primary">
                    Open guide <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default OriginCityPage;
