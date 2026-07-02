import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, GitCompare, CheckCircle2 } from "lucide-react";
import SeoSchema from "@/components/SeoSchema";
import AuthorByline from "@/components/AuthorByline";
import EligibilityForm from "@/components/EligibilityForm";
import { getVs, VS_LIST } from "@/data/comparisonVsData";

const SITE = "https://www.4acesvisa.com";
const YEAR = new Date().getFullYear();

const VsComparisonPage = () => {
  const { comparison: slug } = useParams<{ comparison: string }>();
  const g = getVs(slug);
  if (!g) return <Navigate to="/" replace />;

  const canonical = `${SITE}/vs/${g.slug}`;
  const headline = `${g.name} (${YEAR})`;
  const metaTitle = `${g.shortName} ${YEAR} — Side-by-Side Comparison | 4 Aces Visa`;
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
  const others = VS_LIST.filter((x) => x.slug !== g.slug);

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
        { name: "Compare", url: "/compare" },
        { name: g.shortName, url: `/vs/${g.slug}` },
      ]} />

      <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <GitCompare className="h-3.5 w-3.5" /> Side-by-Side
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">{headline}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{g.oneLiner}</p>
            <div className="mt-6"><AuthorByline articleHeadline={headline} articleUrl={`/vs/${g.slug}`} /></div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">{g.optionA} vs {g.optionB}</h2>
          <Card><CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border text-left text-muted-foreground">
                  <th className="py-2 pr-4 font-semibold">Feature</th>
                  <th className="py-2 pr-4 font-semibold text-foreground">{g.optionA}</th>
                  <th className="py-2 font-semibold text-foreground">{g.optionB}</th>
                </tr></thead>
                <tbody>
                  {g.rows.map((r) => (
                    <tr key={r.feature} className="border-b border-border/50 align-top">
                      <td className="py-3 pr-4 font-medium text-foreground">{r.feature}</td>
                      <td className="py-3 pr-4 text-foreground">{r.a}</td>
                      <td className="py-3 text-foreground">{r.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent></Card>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 md:grid-cols-2">
            <Card><CardContent className="pt-6">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-foreground"><CheckCircle2 className="h-5 w-5 text-primary" /> Choose {g.optionA} if…</h3>
              <ul className="space-y-2">
                {g.chooseA.map((x) => <li key={x} className="flex gap-2 text-sm text-foreground"><span className="text-primary">✓</span>{x}</li>)}
              </ul>
            </CardContent></Card>
            <Card><CardContent className="pt-6">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-foreground"><CheckCircle2 className="h-5 w-5 text-primary" /> Choose {g.optionB} if…</h3>
              <ul className="space-y-2">
                {g.chooseB.map((x) => <li key={x} className="flex gap-2 text-sm text-foreground"><span className="text-primary">✓</span>{x}</li>)}
              </ul>
            </CardContent></Card>
          </div>
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
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Not sure which to pick?</h2>
              <p className="mt-2 text-muted-foreground">our team will recommend the right path based on your profile — free.</p>
            </div>
            <EligibilityForm sourcePage={`vs-${g.slug}`} heading={g.shortName} />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-2xl font-bold text-foreground">More comparisons</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} to={`/vs/${o.slug}`} className="group rounded-lg border border-border bg-card p-5 transition hover:border-primary hover:shadow-md">
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

export default VsComparisonPage;
