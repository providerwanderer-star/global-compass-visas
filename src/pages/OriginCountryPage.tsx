import { useParams, Navigate, Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, ArrowRight, MapPin, Globe } from "lucide-react";
import SeoSchema from "@/components/SeoSchema";
import AuthorByline from "@/components/AuthorByline";
import EligibilityForm from "@/components/EligibilityForm";
import { getOriginCountry } from "@/data/originGeoData";

const SITE = "https://www.gargbrothers.ca";

interface OriginCountryPageProps {
  countrySlug?: string;
}

const OriginCountryPage = ({ countrySlug }: OriginCountryPageProps = {}) => {
  const params = useParams<{ country: string }>();
  const { pathname } = useLocation();
  // Resolve slug from prop > route param > first path segment (for /usa, /uk, /australia static routes)
  const slug =
    countrySlug ?? params.country ?? pathname.replace(/^\//, "").split("/")[0];
  const data = slug ? getOriginCountry(slug) : undefined;

  if (!data) return <Navigate to="/" replace />;

  const canonical = `${SITE}/${data.slug}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{data.metaTitle}</title>
        <meta name="description" content={data.metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={data.metaTitle} />
        <meta property="og:description" content={data.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <SeoSchema
        breadcrumbs={[{ name: `${data.name} to Canada`, url: `/${data.slug}` }]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Globe className="h-3.5 w-3.5" />
              <span aria-hidden>{data.flag}</span> {data.name} → Canada
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              {data.h1}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{data.intro}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Built for:</span> {data.audience}
            </p>

            <div className="mt-6">
              <AuthorByline
                updatedAt={data.lastUpdated}
                articleHeadline={data.h1}
                articleUrl={`/${data.slug}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Canada */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">
            Why {data.demonym}s are choosing Canada
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {data.whyCanada.map((item, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="flex items-start gap-2 text-lg">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">{item.body}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pathways */}
      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">
            Canadian PR pathways for {data.demonym} applicants
          </h2>
          <div className="space-y-4">
            {data.pathways.map((p, i) => (
              <Card key={i} className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="text-lg">{p.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="text-foreground">{p.summary}</p>
                  <div className="grid gap-2 pt-2 text-muted-foreground sm:grid-cols-2">
                    <div>
                      <span className="font-semibold text-foreground">Best for:</span> {p.bestFor}
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">Timeline:</span> {p.timeline}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* City corridors */}
      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">
            Move from your city to Canada
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {data.cities.map((citySlug) => (
              <Link
                key={citySlug}
                to={`/from/${data.slug}/${citySlug}`}
                className="group rounded-lg border border-border bg-card p-5 transition hover:border-primary hover:shadow-md"
              >
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                  <MapPin className="h-3.5 w-3.5" />
                  {data.name}
                </div>
                <div className="text-lg font-semibold capitalize text-foreground group-hover:text-primary">
                  {citySlug.replace(/-/g, " ")} → Canada
                </div>
                <div className="mt-3 inline-flex items-center gap-1 text-sm text-primary">
                  See pathway <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
            Frequently asked questions
          </h2>
          <Accordion
            type="single"
            collapsible
            className="rounded-lg border border-border bg-card"
          >
            {data.faqs.map((f, i) => (
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
                Start your move from {data.name} to Canada
              </h2>
              <p className="mt-2 text-muted-foreground">
                Get a free, no-obligation eligibility check. We'll tell you exactly which Canadian
                pathway fits your profile, timeline, and budget.
              </p>
            </div>
            <EligibilityForm
              sourcePage={`origin-${data.slug}`}
              heading={`Free eligibility assessment — ${data.name} to Canada`}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default OriginCountryPage;
