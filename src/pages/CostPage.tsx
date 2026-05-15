import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, DollarSign, Receipt, Info } from "lucide-react";
import SeoSchema from "@/components/SeoSchema";
import AuthorByline from "@/components/AuthorByline";
import EligibilityForm from "@/components/EligibilityForm";
import { getCost, COSTS_LIST } from "@/data/costData";

const SITE = "https://www.4acesvisa.com";
const YEAR = new Date().getFullYear();

const CostPage = () => {
  const { program: slug } = useParams<{ program: string }>();
  const g = getCost(slug);
  if (!g) return <Navigate to="/" replace />;

  const canonical = `${SITE}/cost/${g.slug}`;
  const headline = `${g.name} (${YEAR})`;
  const metaTitle = `${g.shortName} ${YEAR} — Total Fees in CAD & INR | 4 Aces Visa`;
  const metaDescription = `${g.oneLiner} Updated ${YEAR}. Sahil Garg, 4 Aces Visa.`;

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
    author: { "@type": "Person", name: "Sahil Garg" },
    publisher: { "@type": "Organization", name: "4 Aces Visa", logo: { "@type": "ImageObject", url: `${SITE}/placeholder.svg` } },
    mainEntityOfPage: canonical,
  };
  const others = COSTS_LIST.filter((x) => x.slug !== g.slug);

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
        { name: "Cost Calculator", url: "/immigration-cost-calculator" },
        { name: g.shortName, url: `/cost/${g.slug}` },
      ]} />

      <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <DollarSign className="h-3.5 w-3.5" /> Cost Breakdown
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">{headline}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{g.oneLiner}</p>
            <div className="mt-6"><AuthorByline articleHeadline={headline} articleUrl={`/cost/${g.slug}`} /></div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total CAD</div>
                <div className="mt-1 text-xl font-bold text-foreground">CAD {g.totalCad}</div>
              </div>
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total INR</div>
                <div className="mt-1 text-xl font-bold text-foreground">₹ {g.totalInr}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground md:text-3xl">
            <Receipt className="h-6 w-6 text-primary" /> Line-by-line breakdown
          </h2>
          <Card><CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border text-left text-muted-foreground">
                  <th className="py-2 pr-4 font-semibold">Item</th>
                  <th className="py-2 pr-4 font-semibold">CAD</th>
                  <th className="py-2 font-semibold">INR</th>
                </tr></thead>
                <tbody>
                  {g.lines.map((l) => (
                    <tr key={l.item} className="border-b border-border/50 align-top">
                      <td className="py-3 pr-4">
                        <div className="font-medium text-foreground">{l.item}</div>
                        {l.note && <div className="mt-1 text-xs text-muted-foreground">{l.note}</div>}
                      </td>
                      <td className="py-3 pr-4 text-foreground">{l.cad}</td>
                      <td className="py-3 text-foreground">{l.inr}</td>
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
            <Info className="h-6 w-6 text-primary" /> Important notes
          </h2>
          <Card><CardContent className="pt-6">
            <ul className="space-y-2">
              {g.notes.map((n) => (
                <li key={n} className="flex gap-2 text-sm text-foreground"><span className="text-primary">•</span>{n}</li>
              ))}
            </ul>
          </CardContent></Card>
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
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Get a personalised quote</h2>
              <p className="mt-2 text-muted-foreground">Sahil Garg's team will price out your specific case — no obligation.</p>
            </div>
            <EligibilityForm sourcePage={`cost-${g.slug}`} heading={g.shortName} />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Other cost breakdowns</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} to={`/cost/${o.slug}`} className="group rounded-lg border border-border bg-card p-5 transition hover:border-primary hover:shadow-md">
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

export default CostPage;
