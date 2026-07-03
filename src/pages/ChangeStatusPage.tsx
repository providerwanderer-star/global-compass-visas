import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, RefreshCw, AlertTriangle, CheckCircle2, FileText, Clock } from "lucide-react";
import SeoSchema from "@/components/SeoSchema";
import AuthorByline from "@/components/AuthorByline";
import EligibilityForm from "@/components/EligibilityForm";
import { getChange, CHANGES_LIST } from "@/data/changeStatusData";

const SITE = "https://www.gargbrothers.ca";
const YEAR = new Date().getFullYear();

const ChangeStatusPage = () => {
  const { transition } = useParams<{ transition: string }>();
  const g = getChange(transition);
  if (!g) return <Navigate to="/" replace />;

  const canonical = `${SITE}/change-status/${g.slug}`;
  const headline = `${g.name} (${YEAR})`;
  const metaTitle = `${g.shortName} ${YEAR} — Eligibility, Timing & Documents | Garg Brothers`;
  const metaDescription = `${g.oneLiner}`;

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
    author: { "@type": "Organization", name: "Garg Brothers Immigration Team" },
    publisher: { "@type": "Organization", name: "Garg Brothers", logo: { "@type": "ImageObject", url: `${SITE}/placeholder.svg` } },
    mainEntityOfPage: canonical,
  };
  const others = CHANGES_LIST.filter((x) => x.slug !== g.slug);

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
        { name: "Change Status", url: "/change-status/visitor-to-work" },
        { name: g.shortName, url: `/change-status/${g.slug}` }
      ]} />

      <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <RefreshCw className="h-3.5 w-3.5" /> Status Change
            </div>
            <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="rounded bg-muted px-2 py-1">{g.fromStatus}</span>
              <ArrowRight className="h-4 w-4" />
              <span className="rounded bg-primary/10 px-2 py-1 text-primary font-semibold">{g.toStatus}</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">{headline}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{g.oneLiner}</p>
            <div className="mt-6"><AuthorByline articleHeadline={headline} articleUrl={`/change-status/${g.slug}`} /></div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          <Card><CardContent className="pt-6">
            <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-foreground"><CheckCircle2 className="h-5 w-5 text-primary" /> Eligibility</h3>
            <ul className="space-y-2">
              {g.eligibility.map((e) => <li key={e} className="flex gap-2 text-sm text-foreground"><span className="text-primary">✓</span>{e}</li>)}
            </ul>
          </CardContent></Card>
          <Card><CardContent className="pt-6">
            <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-foreground"><Clock className="h-5 w-5 text-primary" /> Timing</h3>
            <p className="text-sm text-foreground">{g.timing}</p>
            <h3 className="mt-5 mb-3 flex items-center gap-2 text-lg font-bold text-foreground"><FileText className="h-5 w-5 text-primary" /> Document checklist</h3>
            <ul className="space-y-2">
              {g.documents.map((d) => <li key={d} className="flex gap-2 text-sm text-foreground"><span className="text-primary">•</span>{d}</li>)}
            </ul>
          </CardContent></Card>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground md:text-3xl"><AlertTriangle className="h-6 w-6 text-destructive" /> Common pitfalls</h2>
          <Card><CardContent className="pt-6">
            <ul className="space-y-2">
              {g.pitfalls.map((p) => <li key={p} className="flex gap-2 text-sm text-foreground"><span className="text-destructive">×</span>{p}</li>)}
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
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Switching status? Get it right the first time.</h2>
              <p className="mt-2 text-muted-foreground">Free assessment with our team — we'll confirm your timing window and pull together the right document set.</p>
            </div>
            <EligibilityForm sourcePage={`change-status-${g.slug}`} heading={g.shortName} />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Other status transitions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} to={`/change-status/${o.slug}`} className="group rounded-lg border border-border bg-card p-5 transition hover:border-primary hover:shadow-md">
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

export default ChangeStatusPage;