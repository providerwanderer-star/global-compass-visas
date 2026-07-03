import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, AlertTriangle, FileWarning, Scale, RefreshCw } from "lucide-react";
import SeoSchema from "@/components/SeoSchema";
import AuthorByline from "@/components/AuthorByline";
import EligibilityForm from "@/components/EligibilityForm";
import { getRefusal, REFUSAL_LIST } from "@/data/refusalData";

const SITE = "https://www.gargbrothers.ca";
const YEAR = new Date().getFullYear();

const RefusalPage = () => {
  const { type: slug } = useParams<{ type: string }>();
  const r = getRefusal(slug);
  if (!r) return <Navigate to="/" replace />;

  const canonical = `${SITE}/refusal/${r.slug}`;
  const headline = `${r.name} (${YEAR})`;
  const metaTitle = `${r.shortName} ${YEAR} — Reasons, Reapply or Appeal | Garg Brothers`;
  const metaDescription = `${r.oneLiner} Refusal reasons, GCMS notes, reconsideration vs re-apply vs Federal Court JR. Garg Brothers Immigration Team.`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: r.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
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
  const others = REFUSAL_LIST.filter((x) => x.slug !== r.slug);

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
        { name: "Refusal Recovery", url: "/refusal/study-permit-refused" },
        { name: r.shortName, url: `/refusal/${r.slug}` }
      ]} />

      <section className="border-b border-border bg-gradient-to-br from-destructive/10 via-background to-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-destructive">
              <AlertTriangle className="h-3.5 w-3.5" /> Refusal Recovery
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">{headline}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{r.oneLiner}</p>
            <div className="mt-6"><AuthorByline articleHeadline={headline} articleUrl={`/refusal/${r.slug}`} /></div>
            <div className="mt-6 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-foreground">
              <strong>Time-sensitive:</strong> Federal Court judicial review has a strict 15-day filing deadline (60 days if outside Canada).
              For complex refusals, consult a licensed RCIC or immigration lawyer before deadlines lapse.
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground md:text-3xl">
            <FileWarning className="h-6 w-6 text-destructive" /> Top reasons {r.shortName.toLowerCase()} happens
          </h2>
          <Card><CardContent className="pt-6">
            <ul className="space-y-2">
              {r.topReasons.map((x) => (
                <li key={x} className="flex gap-2 text-sm text-foreground"><span className="text-destructive">×</span>{x}</li>
              ))}
            </ul>
          </CardContent></Card>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground md:text-3xl">
            <Scale className="h-6 w-6 text-primary" /> Reconsideration vs re-apply vs judicial review
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {r.pathways.map((p) => (
              <Card key={p.name}><CardContent className="space-y-2 pt-6">
                <div className="text-base font-semibold text-foreground">{p.name}</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">When</div>
                <div className="text-sm text-foreground">{p.when}</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cost</div>
                <div className="text-sm text-foreground">{p.cost}</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Timeline</div>
                <div className="text-sm text-foreground">{p.timeline}</div>
              </CardContent></Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-foreground md:text-3xl">
            <RefreshCw className="h-6 w-6 text-primary" /> Step-by-step recovery
          </h2>
          <ol className="space-y-4">
            {r.steps.map((s, i) => (
              <li key={i} className="flex gap-4 rounded-lg border border-border bg-card p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{i + 1}</span>
                <div>
                  <div className="font-semibold text-foreground">{s.t}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.d}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">FAQs</h2>
          <Accordion type="single" collapsible className="rounded-lg border border-border bg-card">
            {r.faqs.map((f, i) => (
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
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Free refusal review</h2>
              <p className="mt-2 text-muted-foreground">Send our team your refusal letter — we'll diagnose the cause and recommend the best path forward at no cost.</p>
            </div>
            <EligibilityForm sourcePage={`refusal-${r.slug}`} heading={r.shortName} />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Other refusal types</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} to={`/refusal/${o.slug}`} className="group rounded-lg border border-border bg-card p-5 transition hover:border-primary hover:shadow-md">
                <div className="text-base font-semibold text-foreground group-hover:text-primary">{o.shortName}</div>
                <div className="mt-1 text-sm text-muted-foreground">{o.oneLiner}</div>
                <div className="mt-3 inline-flex items-center gap-1 text-sm text-primary">Open guide <ArrowRight className="h-3.5 w-3.5" /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefusalPage;
