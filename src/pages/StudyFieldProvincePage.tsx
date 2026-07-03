import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, GraduationCap, MapPin, DollarSign, Calendar, BookOpen } from "lucide-react";
import SeoSchema from "@/components/SeoSchema";
import AuthorByline from "@/components/AuthorByline";
import EligibilityForm from "@/components/EligibilityForm";
import { getStudyField, STUDY_FIELD_LIST } from "@/data/studyFieldData";
import { getProvince, PROVINCE_LIST } from "@/data/occupationProvinceData";

const SITE = "https://www.gargbrothers.ca";
const YEAR = new Date().getFullYear();

const StudyFieldProvincePage = () => {
  const { field: fieldSlug, province: provSlug } = useParams<{
    field: string;
    province: string;
  }>();
  const field = getStudyField(fieldSlug);
  const prov = getProvince(provSlug);
  if (!field || !prov) return <Navigate to="/" replace />;

  const provKey = prov.slug as keyof typeof field.topDLIsByProvince;
  const dlis = field.topDLIsByProvince[provKey] ?? [];

  const canonical = `${SITE}/study/${field.slug}/${prov.slug}`;
  const headline = `Study ${field.name} in ${prov.name}, Canada — Cost, Top Colleges & PR Pathway (${YEAR})`;
  const metaTitle = `Study ${field.shortName} in ${prov.name} ${YEAR} — Cost, Colleges, PR | Garg Brothers`;
  const metaDescription = `${field.name} in ${prov.name}: tuition ${field.tuitionCadPerYear}, IELTS ${field.ieltsRequirement.split(";")[0]}, top DLIs and the study-permit → PGWP → PR pathway. Garg Brothers Immigration Team.`;

  const faqs = [
    {
      q: `How much does it cost to study ${field.shortName} in ${prov.name}?`,
      a: `Tuition for international students typically runs ${field.tuitionCadPerYear} per year. Add ${prov.costOfLivingMonthly} per month for living costs and the CAD 20,635 GIC required for the SDS study-permit route.`,
    },
    {
      q: `What are the IELTS / English requirements?`,
      a: `${field.ieltsRequirement}. The Study Direct Stream (SDS) gives faster decisions for eligible countries when you also lock the GIC and pay first-year tuition upfront.`,
    },
    {
      q: `When are the intakes for ${field.name} in ${prov.name}?`,
      a: `${field.intakeMonths}. September is the largest intake — apply 6–9 months in advance to secure both a Letter of Acceptance and a study-permit decision in time.`,
    },
    {
      q: `Can I work while studying?`,
      a: `Yes — full-time international students can work up to 24 hours per week off-campus during academic sessions and full-time during scheduled breaks under current IRCC rules.`,
    },
    {
      q: `What's the PR pathway after graduating?`,
      a: `${field.prPipeline} Most graduates land PR within 1–3 years of completing studies if they secure skilled work and complete the ${prov.pnpName} graduate stream or federal Express Entry profile early.`,
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
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
    publisher: {
      "@type": "Organization",
      name: "Garg Brothers",
      logo: { "@type": "ImageObject", url: `${SITE}/placeholder.svg` },
    },
    mainEntityOfPage: canonical,
  };

  const otherProvinces = PROVINCE_LIST.filter((p) => p.slug !== prov.slug);
  const otherFields = STUDY_FIELD_LIST.filter((f) => f.slug !== field.slug);

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

      <SeoSchema
        breadcrumbs={[
          { name: "Study in Canada", url: "/" },
          { name: field.name, url: `/study/${field.slug}/${prov.slug}` },
          { name: prov.name, url: `/study/${field.slug}/${prov.slug}` }
        ]}
      />

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <GraduationCap className="h-3.5 w-3.5" />
              Study Permit · PGWP · {prov.abbr}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              {headline}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Tuition, top DLIs, IELTS / SDS requirements and the realistic study-permit → PGWP → PR
              pipeline for international students choosing {field.name} in {prov.name}.
            </p>
            <div className="mt-6">
              <AuthorByline
                articleHeadline={headline}
                articleUrl={`/study/${field.slug}/${prov.slug}`}
              />
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Stat icon={<DollarSign className="h-4 w-4" />} label="Tuition / Year" value={field.tuitionCadPerYear} />
              <Stat icon={<Calendar className="h-4 w-4" />} label="Intakes" value={field.intakeMonths} />
              <Stat icon={<BookOpen className="h-4 w-4" />} label="PGWP" value={field.pgwpYears} />
              <Stat icon={<MapPin className="h-4 w-4" />} label="Capital" value={prov.capital} />
            </div>
          </div>
        </div>
      </section>

      {/* Snapshot */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
            Snapshot — {field.name} in {prov.name}
          </h2>
          <Card>
            <CardContent className="space-y-3 pt-6">
              <Row label="Tuition (intl)" value={field.tuitionCadPerYear} />
              <Row label="Living cost (single)" value={prov.costOfLivingMonthly} />
              <Row label="GIC required" value="CAD 20,635 (SDS)" />
              <Row label="IELTS" value={field.ieltsRequirement} />
              <Row label="Intakes" value={field.intakeMonths} />
              <Row label="PGWP length" value={field.pgwpYears} />
              <Row label="Related PR NOC" value={`${field.relatedNoc.code} — ${field.relatedNoc.title}`} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Top DLIs */}
      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
            Top DLIs for {field.shortName} in {prov.name}
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Widely recognised public institutions offering {field.name} programs eligible for the
            Post-Graduation Work Permit. Confirm program-level PGWP eligibility before applying — IRCC
            now restricts certain public-private partnerships.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {dlis.map((d) => (
              <div key={d} className="rounded-lg border border-border bg-card p-4 text-sm font-medium text-foreground">
                {d}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-step */}
      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">
            Step-by-step: Study {field.shortName} in {prov.name}
          </h2>
          <ol className="space-y-4">
            <Step n={1} t="Shortlist DLIs and program" d={`Pick a public DLI in ${prov.name} offering ${field.name}. Confirm PGWP eligibility and credential length (typically 2 years for max PGWP).`} />
            <Step n={2} t="Get LOA + GIC + IELTS" d={`Pay first-year tuition deposit, lock the CAD 20,635 GIC, score ${field.ieltsRequirement.split(";")[0]} for SDS.`} />
            <Step n={3} t="Apply for the study permit (SDS)" d="SDS gives the most predictable, faster decisions for eligible countries. Add provincial attestation letter (PAL) as required from 2024 onwards." />
            <Step n={4} t="Land, study, and work part-time" d="Up to 24 hrs/week off-campus during sessions; full-time during scheduled breaks. Maintain full-time enrolment to preserve PGWP eligibility." />
            <Step n={5} t={`Graduate → PGWP → PR via CEC / ${prov.abbr} PNP`} d={field.prPipeline} />
          </ol>
        </div>
      </section>

      {/* PR pipeline highlight */}
      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-4xl rounded-lg border border-border bg-muted/30 p-6">
          <h3 className="text-lg font-semibold text-foreground">
            From study permit to PR — the realistic timeline
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            2-year program → 3-year PGWP → 1 year of skilled NOC TEER 0/1/2/3 work →
            Express Entry CEC profile → ITA → 6–8 months to PR. Add the {prov.pnpName} graduate
            stream as a +600 CRS booster if the federal cut-off is too high in the year you apply.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to={`/jobs/${field.relatedNoc.code === "21231" ? "software-engineer" : field.relatedNoc.code === "31301" ? "registered-nurse" : field.relatedNoc.code === "11100" ? "accountant" : field.relatedNoc.code === "21223" ? "software-engineer" : "software-engineer"}/${prov.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              See PR pathway for {field.relatedNoc.title}s in {prov.abbr} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link to="/crs-calculator" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              Run the CRS calculator <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
            FAQs — Studying {field.shortName} in {prov.name}
          </h2>
          <Accordion type="single" collapsible className="rounded-lg border border-border bg-card">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="px-4">
                <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Lead form */}
      <section className="border-y border-border bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                Free study-permit + PR roadmap
              </h2>
              <p className="mt-2 text-muted-foreground">
                our team will shortlist DLIs in {prov.name} for {field.name},
                map your IELTS/funds plan and lay out the study → PGWP → PR pipeline.
              </p>
            </div>
            <EligibilityForm
              sourcePage={`study-${field.slug}-${prov.slug}`}
              heading={`Study ${field.shortName} in ${prov.name}`}
            />
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-2xl font-bold text-foreground">
            Same field, other provinces
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {otherProvinces.map((p) => (
              <Link
                key={p.slug}
                to={`/study/${field.slug}/${p.slug}`}
                className="group rounded-lg border border-border bg-card p-5 transition hover:border-primary hover:shadow-md"
              >
                <div className="text-base font-semibold text-foreground group-hover:text-primary">
                  {field.shortName} in {p.name}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{p.pnpName}</div>
                <div className="mt-3 inline-flex items-center gap-1 text-sm text-primary">
                  Open guide <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>

          <h2 className="mb-6 mt-12 text-2xl font-bold text-foreground">
            Other study fields in {prov.name}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherFields.map((f) => (
              <Link
                key={f.slug}
                to={`/study/${f.slug}/${prov.slug}`}
                className="group rounded-lg border border-border bg-card p-5 transition hover:border-primary hover:shadow-md"
              >
                <div className="text-base font-semibold text-foreground group-hover:text-primary">
                  {f.name}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {f.tuitionCadPerYear} · PGWP {f.pgwpYears.toLowerCase()}
                </div>
                <div className="mt-3 inline-flex items-center gap-1 text-sm text-primary">
                  Open guide <ArrowRight className="h-3.5 w-3.5" />
                </div>
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
    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {icon} {label}
    </div>
    <div className="mt-2 text-sm font-semibold text-foreground">{value}</div>
  </div>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-1 border-b border-border pb-3 last:border-b-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-4">
    <div className="w-44 shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
    <div className="text-sm text-foreground">{value}</div>
  </div>
);

const Step = ({ n, t, d }: { n: number; t: string; d: string }) => (
  <li className="flex gap-4 rounded-lg border border-border bg-card p-5">
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
      {n}
    </span>
    <div>
      <div className="font-semibold text-foreground">{t}</div>
      <div className="mt-1 text-sm text-muted-foreground">{d}</div>
    </div>
  </li>
);

export default StudyFieldProvincePage;
