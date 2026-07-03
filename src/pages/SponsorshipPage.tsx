import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Heart, AlertTriangle, Clock, Wallet } from "lucide-react";
import SeoSchema from "@/components/SeoSchema";
import AuthorByline from "@/components/AuthorByline";
import EligibilityForm from "@/components/EligibilityForm";
import { getSponsorship, SPONSORSHIP_LIST } from "@/data/sponsorshipData";

const SITE = "https://www.gargbrothers.ca";
const YEAR = new Date().getFullYear();

const SponsorshipPage = () => {
  const { type: slug } = useParams<{ type: string }>();
  const p = getSponsorship(slug);
  if (!p) return <Navigate to="/" replace />;

  const canonical = `${SITE}/sponsor/${p.slug}`;
  const headline = `${p.name} — ${YEAR} Guide`;
  const metaTitle = `${p.shortName} ${YEAR} — Eligibility, Cost, Step-by-Step | Garg Brothers`;
  const metaDescription = `${p.oneLiner} Processing time ${p.processingTime}, cost ${p.govFees}, common rejection reasons and FAQs. Garg Brothers Immigration Team.`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.faqs.map((f) => ({
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
  const others = SPONSORSHIP_LIST.filter((x) => x.slug !== p.slug);

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
        { name: "Family Sponsorship", url: "/sponsor/spouse-common-law-partner" },
        { name: p.shortName, url: `/sponsor/${p.slug}` }
      ]} />

      <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Heart className="h-3.5 w-3.5" /> Family Sponsorship
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">{headline}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{p.oneLiner}</p>
            <div className="mt-6"><AuthorByline articleHeadline={headline} articleUrl={`/sponsor/${p.slug}`} /></div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Stat icon={<Clock className="h-4 w-4" />} label="Processing time" value={p.processingTime} />
              <Stat icon={<Wallet className="h-4 w-4" />} label="Government fees" value={p.govFees} />
              <Stat icon={<Heart className="h-4 w-4" />} label="Who qualifies" value={p.whoQualifies.split(".")[0]} />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">Eligibility & key requirements</h2>
          <Card><CardContent className="space-y-3 pt-6">
            <p className="text-sm text-muted-foreground">{p.whoQualifies}</p>
            <ul className="mt-4 space-y-2">
              {p.keyRequirements.map((r) => (
                <li key={r} className="flex gap-2 text-sm text-foreground"><span className="text-primary">•</span>{r}</li>
              ))}
            </ul>
          </CardContent></Card>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">Step-by-step</h2>
          <ol className="space-y-4">
            {p.steps.map((s, i) => (
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
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground md:text-3xl">
            <AlertTriangle className="h-6 w-6 text-destructive" /> Common rejection reasons
          </h2>
          <Card><CardContent className="pt-6">
            <ul className="space-y-2">
              {p.rejectionReasons.map((r) => (
                <li key={r} className="flex gap-2 text-sm text-foreground"><span className="text-destructive">×</span>{r}</li>
              ))}
            </ul>
          </CardContent></Card>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">FAQs</h2>
          <Accordion type="single" collapsible className="rounded-lg border border-border bg-card">
            {p.faqs.map((f, i) => (
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
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Free sponsorship eligibility check</h2>
              <p className="mt-2 text-muted-foreground">Our team will assess sponsor + applicant eligibility, documents and timeline — no cost.</p>
            </div>
            <EligibilityForm sourcePage={`sponsor-${p.slug}`} heading={p.shortName} />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Other sponsorship pathways</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} to={`/sponsor/${o.slug}`} className="group rounded-lg border border-border bg-card p-5 transition hover:border-primary hover:shadow-md">
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

const Stat = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="rounded-lg border border-border bg-card p-4">
    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{icon} {label}</div>
    <div className="mt-2 text-sm font-semibold text-foreground">{value}</div>
  </div>
);

export default SponsorshipPage;
