import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, ArrowRight, GitCompare } from "lucide-react";
import SeoSchema from "@/components/SeoSchema";
import AuthorByline from "@/components/AuthorByline";
import EligibilityForm from "@/components/EligibilityForm";
import { getComparison, comparisons } from "@/data/comparisonData";

const SITE = "https://www.4acesvisa.com";

const ComparePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const comp = slug ? getComparison(slug) : undefined;

  if (!comp) return <Navigate to="/compare" replace />;

  const canonical = `${SITE}/compare/${comp.slug}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: comp.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  const related = comparisons.filter((c) => c.slug !== comp.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{comp.metaTitle}</title>
        <meta name="description" content={comp.metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={comp.metaTitle} />
        <meta property="og:description" content={comp.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <SeoSchema
        breadcrumbs={[
          { name: "Compare", url: "/compare" },
          { name: `${comp.optionAName} vs ${comp.optionBName}`, url: `/compare/${comp.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <GitCompare className="h-3.5 w-3.5" />
              {comp.category} · Comparison
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              {comp.h1}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{comp.intro}</p>

            <div className="mt-6">
              <AuthorByline
                updatedAt={comp.lastUpdated}
                articleHeadline={comp.h1}
                articleUrl={`/compare/${comp.slug}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Direct-answer / verdict */}
      <section className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="text-xl">Quick verdict</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed text-foreground">{comp.verdict}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Comparison table */}
      <section className="container mx-auto px-4 pb-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
            {comp.optionAName} vs {comp.optionBName} — side by side
          </h2>
          <div className="overflow-hidden rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[28%] font-semibold">Attribute</TableHead>
                  <TableHead className="font-semibold text-primary">{comp.optionAName}</TableHead>
                  <TableHead className="font-semibold text-primary">{comp.optionBName}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comp.rows.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="align-top font-medium">
                      {row.attribute}
                      {row.note && (
                        <div className="mt-1 text-xs font-normal text-muted-foreground">
                          {row.note}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="align-top">{row.optionA}</TableCell>
                    <TableCell className="align-top">{row.optionB}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* Choose A / Choose B */}
      <section className="container mx-auto px-4 pb-10">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Choose {comp.optionAName} if…</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {comp.chooseA.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Choose {comp.optionBName} if…</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {comp.chooseB.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQs */}
      <section className="container mx-auto px-4 pb-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="rounded-lg border border-border bg-card">
            {comp.faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="px-4">
                <AccordionTrigger className="text-left text-base font-semibold">
                  {f.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.answer}</AccordionContent>
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
                Not sure which path fits you?
              </h2>
              <p className="mt-2 text-muted-foreground">
                Get a free, no-obligation eligibility assessment from our team. We'll tell you
                honestly which of the two options actually works for your profile.
              </p>
            </div>
            <EligibilityForm
              sourcePage={`compare-${comp.slug}`}
              heading={`Free eligibility check — ${comp.optionAName} vs ${comp.optionBName}`}
            />
          </div>
        </div>
      </section>

      {/* Related comparisons */}
      {related.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-2xl font-bold text-foreground">Related comparisons</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/compare/${r.slug}`}
                  className="group rounded-lg border border-border bg-card p-5 transition hover:border-primary hover:shadow-md"
                >
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                    {r.category}
                  </div>
                  <div className="font-semibold text-foreground group-hover:text-primary">
                    {r.optionAName} vs {r.optionBName}
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1 text-sm text-primary">
                    Compare <ArrowRight className="h-3.5 w-3.5" />
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

export default ComparePage;
