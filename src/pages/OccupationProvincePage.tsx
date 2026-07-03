import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Briefcase, MapPin, DollarSign, TrendingUp, ShieldCheck } from "lucide-react";
import SeoSchema from "@/components/SeoSchema";
import AuthorByline from "@/components/AuthorByline";
import EligibilityForm from "@/components/EligibilityForm";
import {
  getOccupation,
  getProvince,
  OCCUPATION_LIST,
  PROVINCE_LIST,
} from "@/data/occupationProvinceData";

const SITE = "https://www.gargbrothers.ca";
const YEAR = new Date().getFullYear();

const OccupationProvincePage = () => {
  const { occupation: occSlug, province: provSlug } = useParams<{
    occupation: string;
    province: string;
  }>();
  const occ = getOccupation(occSlug);
  const prov = getProvince(provSlug);
  if (!occ || !prov) return <Navigate to="/" replace />;

  const canonical = `${SITE}/jobs/${occ.slug}/${prov.slug}`;
  const headline = `${occ.name} Jobs & PR Pathway in ${prov.name}, Canada (${YEAR})`;
  const metaTitle = `${occ.name} Jobs in ${prov.name} + PR Pathway (${YEAR}) | Garg Brothers`;
  const metaDescription = `${occ.name} (NOC ${occ.noc}, TEER ${occ.teer}) demand, wage, licensing and Express Entry / ${prov.abbr} PNP routes for ${prov.name}. Garg Brothers Immigration Team.`;

  const faqs = [
    {
      q: `Is ${occ.name} in demand in ${prov.name}?`,
      a: `Yes — demand is ${occ.demand.toLowerCase()} across ${prov.name}. Median wage is ${occ.medianWageCAD}. Top employers include ${prov.topEmployers.slice(0, 3).join(", ")}.`,
    },
    {
      q: `Which PR pathway works best for a ${occ.name} targeting ${prov.name}?`,
      a: `Two main routes: federal Express Entry (Canadian Experience Class or FSW) and the ${prov.pnpName}. Most candidates start with Express Entry and add a ${prov.abbr} nomination (+600 CRS) via streams like ${prov.pnpStreams.slice(0, 2).join(" or ")}.`,
    },
    {
      q: `Do I need a provincial licence to work as a ${occ.name} in ${prov.name}?`,
      a: occ.licensing,
    },
    {
      q: `What's the typical cost of living for a single ${occ.name} in ${prov.name}?`,
      a: `Plan for ${prov.costOfLivingMonthly} per month including rent, groceries, transit and basic utilities. ${prov.notes}`,
    },
    {
      q: `How long does PR take from profile to landing?`,
      a: `Express Entry CEC: typically 6–8 months after ITA. ${prov.abbr} PNP base stream: 12–18 months end-to-end including nomination. Add 2–4 months for Enhanced ${prov.abbr} PNP via Express Entry.`,
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

  // Sibling links — same occupation, other provinces
  const otherProvinces = PROVINCE_LIST.filter((p) => p.slug !== prov.slug);
  // Same province, other occupations
  const otherOccupations = OCCUPATION_LIST.filter((o) => o.slug !== occ.slug).slice(0, 5);

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
          { name: "Jobs & PR Pathways", url: "/" },
          { name: occ.name, url: `/jobs/${occ.slug}/${prov.slug}` },
          { name: prov.name, url: `/jobs/${occ.slug}/${prov.slug}` }
        ]}
      />

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Briefcase className="h-3.5 w-3.5" />
              NOC {occ.noc} · TEER {occ.teer} · {prov.abbr}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              {headline}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Demand, wage, licensing and the realistic Express Entry + {prov.pnpName} routes
              a {occ.name.toLowerCase()} can use to land PR in {prov.name}.
            </p>
            <div className="mt-6">
              <AuthorByline
                articleHeadline={headline}
                articleUrl={`/jobs/${occ.slug}/${prov.slug}`}
              />
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Stat icon={<TrendingUp className="h-4 w-4" />} label="Demand" value={occ.demand} />
              <Stat icon={<DollarSign className="h-4 w-4" />} label="Median Wage" value={occ.medianWageCAD} />
              <Stat icon={<MapPin className="h-4 w-4" />} label="Capital" value={prov.capital} />
              <Stat icon={<ShieldCheck className="h-4 w-4" />} label="PNP" value={prov.abbr + " PNP"} />
            </div>
          </div>
        </div>
      </section>

      {/* Snapshot */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
            Snapshot — {occ.name} in {prov.name}
          </h2>
          <Card>
            <CardContent className="space-y-3 pt-6">
              <Row label="NOC code" value={`${occ.noc} (${occ.category})`} />
              <Row label="TEER level" value={`TEER ${occ.teer}`} />
              <Row label="Demand in 2026" value={occ.demand} />
              <Row label="Median wage" value={occ.medianWageCAD} />
              <Row label="Top employers" value={prov.topEmployers.join(" · ")} />
              <Row label="Cost of living (single)" value={prov.costOfLivingMonthly} />
              <Row label="Licensing" value={occ.licensing} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* PR Pathway */}
      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
            PR pathway for a {occ.name} → {prov.name}
          </h2>
          <ol className="space-y-4">
            <Step n={1} t="Get language + credentials assessed" d={`IELTS General (target CLB 9 / IELTS 7.0+ each band) and ECA via WES. ${occ.licensing}`} />
            <Step n={2} t="Create Express Entry profile" d={`Enter under Canadian Experience Class or FSW with NOC ${occ.noc}. CRS scoring covers age, education, language and work experience.`} />
            <Step n={3} t={`Add ${prov.pnpName} nomination`} d={`Submit an Expression of Interest under ${prov.pnpStreams.slice(0, 2).join(" or ")}. A nomination = +600 CRS, almost guaranteeing an ITA.`} />
            <Step n={4} t="Submit complete PR application" d="60 days to upload PCC, medicals, employment proofs, IELTS, ECA and government fees (~CAD 1,365 single / ~CAD 2,710 couple)." />
            <Step n={5} t={`Land in ${prov.capital} or another ${prov.name} city`} d="Activate PR, get SIN + PR card, register with the provincial regulator if applicable, and start work." />
          </ol>
        </div>
      </section>

      {/* CRS hint */}
      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-4xl rounded-lg border border-border bg-muted/30 p-6">
          <h3 className="text-lg font-semibold text-foreground">
            Typical CRS range for {occ.name} candidates
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Most {occ.name.toLowerCase()} profiles in 2026 sit in the 430–490 CRS band before
            provincial nomination. Recent federal cut-offs are 480–540, so a {prov.abbr} PNP
            nomination is the most reliable booster.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/crs-calculator" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              Run the CRS calculator <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link to={`/noc/${occ.noc}`} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              See NOC {occ.noc} detail <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
            FAQs — {occ.name} in {prov.name}
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
                Free eligibility check — {occ.name}, {prov.name}
              </h2>
              <p className="mt-2 text-muted-foreground">
                our team will check your CRS, map you to the right {prov.abbr} PNP stream,
                and lay out timeline and cost.
              </p>
            </div>
            <EligibilityForm
              sourcePage={`jobs-${occ.slug}-${prov.slug}`}
              heading={`${occ.name} → ${prov.name} PR`}
            />
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-2xl font-bold text-foreground">
            Same role, other provinces
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {otherProvinces.map((p) => (
              <Link
                key={p.slug}
                to={`/jobs/${occ.slug}/${p.slug}`}
                className="group rounded-lg border border-border bg-card p-5 transition hover:border-primary hover:shadow-md"
              >
                <div className="text-base font-semibold text-foreground group-hover:text-primary">
                  {occ.name} in {p.name}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{p.pnpName}</div>
                <div className="mt-3 inline-flex items-center gap-1 text-sm text-primary">
                  Open guide <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>

          <h2 className="mb-6 mt-12 text-2xl font-bold text-foreground">
            Other in-demand occupations in {prov.name}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherOccupations.map((o) => (
              <Link
                key={o.slug}
                to={`/jobs/${o.slug}/${prov.slug}`}
                className="group rounded-lg border border-border bg-card p-5 transition hover:border-primary hover:shadow-md"
              >
                <div className="text-base font-semibold text-foreground group-hover:text-primary">
                  {o.name}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  NOC {o.noc} · {o.demand} demand · {o.medianWageCAD}
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

export default OccupationProvincePage;
