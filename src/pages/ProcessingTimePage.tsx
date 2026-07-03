import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Clock, Globe, AlertCircle, Calendar } from "lucide-react";
import SeoSchema from "@/components/SeoSchema";
import AuthorByline from "@/components/AuthorByline";
import EligibilityForm from "@/components/EligibilityForm";
import { getProcessing, PROCESSING_LIST } from "@/data/processingTimeData";

const SITE = "https://www.4acesvisa.com";
const YEAR = new Date().getFullYear();

const ProcessingTimePage = () => {
  const { program: slug } = useParams<{ program: string }>();
  const g = getProcessing(slug);
  if (!g) return <Navigate to="/" replace />;

  const canonical = `${SITE}/processing-time/${g.slug}`;
  const headline = `${g.name} (${YEAR})`;
  const metaTitle = `${g.shortName} Processing Time ${YEAR} — Real IRCC Timelines | 4 Aces Visa`;
  const metaDescription = `${g.oneLiner} Updated ${YEAR}. 4 Aces Visa Immigration Team.`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: g.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    datePublished: `${YEAR}-01-15`,
    dateModified: new Date().toISOString().slice(0, 10),
    author: { "@type": "Organization", name: "4 Aces Visa Immigration Team" },
    publisher: { "@type": "Organization", name: "4 Aces Visa", logo: { "@type": "ImageObject", url: `${SITE}/placeholder.svg` } },
    mainEntityOfPage: canonical,
  };
  const others = PROCESSING_LIST.filter((x) => x.slug !== g.slug);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>
      <SeoSchema breadcrumbs={[
        { name: "Processing Times", url: "/processing-times" },
        { name: g.shortName, url: `/processing-time/${g.slug}` },
      ]} />

      <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Clock className="h-3.5 w-3.5" /> Processing Time
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">{headline}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{g.oneLiner}</p>
            <div className="mt-6"><AuthorByline articleHeadline={headline} articleUrl={`/processing-time/${g.slug}`} /></div>
            <div className="mt-6 rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm text-foreground">
              <strong>IRCC standard:</strong> {g.ircc}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground md:text-3xl">
            <Globe className="h-6 w-6 text-primary" /> Real-world processing by country / stream
          </h2>
          <Card><CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border text-left text-muted-foreground">
                  <th className="py-2 pr-4 font-semibold">Origin / stream</th>
                  <th className="py-2 font-semibold">Typical time</th>
                </tr></thead>
                <tbody>
                  {g.ranges.map((r) => (
                    <tr key={r.country} className="border-b border-border/50">
                      <td className="py-3 pr-4 font-medium text-foreground">{r.country}</td>
                      <td className="py-3 text-foreground">{r.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent></Card>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground md:text-3xl">
            <AlertCircle className="h-6 w-6 text-destructive" /> What slows your file down
          </h2>
          <Card><CardContent className="pt-6">
            <ul className="space-y-2">
              {g.slowFactors.map((x) => (
                <li key={x} className="flex gap-2 text-sm text-foreground"><span className="text-destructive">×</span>{x}</li>
              ))}
            </ul>
          </CardContent></Card>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-foreground md:text-3xl">
            <Calendar className="h-6 w-6 text-primary" /> Week-by-week timeline
          </h2>
          <ol className="space-y-4">
            {g.timeline.map((s, i) => (
              <li key={i} className="flex gap-4 rounded-lg border border-border bg-card p-5">
                <span className="flex h-8 shrink-0 items-center justify-center rounded-full bg-primary px-3 text-sm font-bold text-primary-foreground">{s.t}</span>
                <div className="text-sm text-foreground">{s.d}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">FAQs</h2>
          <Accordion type="single" collapsible className="rounded-lg border border-border bg-card">
            {g.faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="px-4">
                <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Get a personalised timeline</h2>
              <p className="mt-2 text-muted-foreground">Our team will review your profile and give you a realistic timeline based on your country, NOC, and visa office.</p>
            </div>
            <EligibilityForm sourcePage={`processing-${g.slug}`} heading={g.shortName} />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Other processing times</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} to={`/processing-time/${o.slug}`} className="group rounded-lg border border-border bg-card p-5 transition hover:border-primary hover:shadow-md">
                <div className="text-base font-semibold text-foreground group-hover:text-primary">{o.shortName}</div>
                <div className="mt-1 text-sm text-muted-foreground line-clamp-2">{o.oneLiner}</div>
                <div className="mt-3 inline-flex items-center gap-1 text-sm text-primary">Open guide <ArrowRight className="h-3.5 w-3.5" /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProcessingTimePage;
