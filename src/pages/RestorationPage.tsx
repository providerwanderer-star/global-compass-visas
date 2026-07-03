import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, RefreshCcw, AlertTriangle, CheckCircle2, Clock, DollarSign } from "lucide-react";
import SeoSchema from "@/components/SeoSchema";
import AuthorByline from "@/components/AuthorByline";
import EligibilityForm from "@/components/EligibilityForm";
import { getRestoration, RESTORATION_LIST } from "@/data/restorationData";

const SITE = "https://www.gargbrothers.ca";
const YEAR = new Date().getFullYear();

const RestorationPage = () => {
  const { scenario } = useParams<{ scenario: string }>();
  const g = getRestoration(scenario);
  if (!g) return <Navigate to="/" replace />;

  const canonical = `${SITE}/restoration/${g.slug}`;
  const headline = `${g.name} (${YEAR})`;
  const metaTitle = `${g.shortName} ${YEAR} — Rules, Fees & Recovery Steps | Garg Brothers`;
  const metaDescription = `${g.oneLiner} Updated ${YEAR}.`;

  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: g.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const articleSchema = {
    "@context": "https://schema.org", "@type": "Article", headline,
    datePublished: `${YEAR}-01-15`, dateModified: new Date().toISOString().slice(0, 10),
    author: { "@type": "Organization", name: "Garg Brothers Immigration Team" },
    publisher: { "@type": "Organization", name: "Garg Brothers", logo: { "@type": "ImageObject", url: `${SITE}/placeholder.svg` } },
    mainEntityOfPage: canonical,
  };
  const others = RESTORATION_LIST.filter((x) => x.slug !== g.slug);

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
        { name: "Restoration", url: "/restoration/restore-status-90-days" },
        { name: g.shortName, url: `/restoration/${g.slug}` }
      ]} />

      <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <RefreshCcw className="h-3.5 w-3.5" /> Status Restoration
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">{headline}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{g.oneLiner}</p>
            <div className="mt-6"><AuthorByline articleHeadline={headline} articleUrl={`/restoration/${g.slug}`} /></div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          <Card><CardContent className="pt-6 space-y-3 text-sm">
            <div><span className="font-semibold text-foreground">Who it covers: </span><span className="text-muted-foreground">{g.who}</span></div>
            <div className="flex gap-2"><Clock className="h-4 w-4 text-primary mt-0.5" /><div><span className="font-semibold text-foreground">Deadline: </span><span className="text-muted-foreground">{g.deadline}</span></div></div>
            <div className="flex gap-2"><DollarSign className="h-4 w-4 text-primary mt-0.5" /><div><span className="font-semibold text-foreground">Fees: </span><span className="text-muted-foreground">{g.fee}</span></div></div>
          </CardContent></Card>
          <Card><CardContent className="pt-6 space-y-3 text-sm">
            <div><span className="font-semibold text-foreground">While waiting: </span><span className="text-muted-foreground">{g.whileWaiting}</span></div>
            <div><span className="font-semibold text-foreground">Outcome: </span><span className="text-muted-foreground">{g.outcome}</span></div>
          </CardContent></Card>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">Step-by-step recovery</h2>
          <Card><CardContent className="pt-6">
            <ol className="space-y-3">
              {g.steps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</span>
                  <span className="text-sm text-foreground">{s}</span>
                </li>
              ))}
            </ol>
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
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Out of status? Act before day 90.</h2>
              <p className="mt-2 text-muted-foreground">Our team files restorations, H&amp;C and TRPs every week. Book a same-day call.</p>
            </div>
            <EligibilityForm sourcePage={`restoration-${g.slug}`} heading={g.shortName} defaultValues={{ visa_type: "restoration" }} />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-foreground"><CheckCircle2 className="h-5 w-5 text-primary" /> Related restoration scenarios</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} to={`/restoration/${o.slug}`} className="group rounded-lg border border-border bg-card p-5 transition hover:border-primary hover:shadow-md">
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

export default RestorationPage;