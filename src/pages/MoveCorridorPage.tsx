import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Plane, Building2, Users, Clock, Wallet, CheckCircle2 } from "lucide-react";
import SeoSchema from "@/components/SeoSchema";
import AuthorByline from "@/components/AuthorByline";
import EligibilityForm from "@/components/EligibilityForm";
import {
  MOVE_CORRIDORS,
  MOVE_PROGRAMS,
  getMoveCorridor,
  getMoveProgram,
} from "@/data/moveCorridorData";

const SITE = "https://www.gargbrothers.ca";

const MoveCorridorPage = () => {
  const { corridor: corridorSlug, program: programSlug } = useParams<{
    corridor: string;
    program: string;
  }>();

  const corridor = getMoveCorridor(corridorSlug);
  const program = getMoveProgram(programSlug);
  if (!corridor || !program || !corridor.programs.includes(program.slug)) {
    return <Navigate to="/" replace />;
  }

  const canonical = `${SITE}/move/${corridor.slug}/${program.slug}`;
  const headline = `${corridor.origin.name} to ${corridor.destination.name} via ${program.shortName}`;
  const metaTitle = `${corridor.origin.name} → ${corridor.destination.name} on ${program.shortName} (${new Date().getFullYear()}) | Garg Brothers`;
  const metaDescription = `Step-by-step guide for moving from ${corridor.origin.name}, ${corridor.origin.country} to ${corridor.destination.name}, ${corridor.destination.province} on the ${program.name}. Cost, timeline, eligibility, and FAQs.`;

  // Steps templated per program
  const stepsByProgram: Record<typeof program.slug, { t: string; d: string }[]> = {
    "express-entry": [
      { t: "ECA + IELTS / CELPIP", d: `Get a WES degree assessment and book IELTS General — most ${corridor.origin.name} candidates need CLB 9 (IELTS 7.0+ each band) to be competitive.` },
      { t: "Create Express Entry profile", d: `Submit your profile online. Your CRS score is calculated based on age, education, work experience, language and any provincial nomination.` },
      { t: "Wait for ITA in a draw", d: `Recent CEC / FSW draw cut-offs sit between 480 and 540. Profiles below this should target a PNP boost.` },
      { t: "Submit complete PR application", d: `60 days to upload PCC, medicals, employment proofs, IELTS, ECA, fees (CAD ~1,365 single / ~2,710 couple).` },
      { t: "Land in ${corridor.destination.name}", d: `Most ${corridor.origin.name} → ${corridor.destination.name} files complete in ${corridor.timelineMonths}.` }
    ],
    pnp: [
      { t: "Pick the right province", d: `From ${corridor.origin.name}, the strongest PNP routes are Ontario OINP Tech, BC PNP Tech and Alberta AAIP — based on your NOC and job offer status.` },
      { t: "Express Entry profile + EOI", d: `Create an EE profile and an Expression of Interest in the chosen province's portal.` },
      { t: "Provincial nomination", d: `Nomination = +600 CRS points. After this, an ITA in the next federal draw is virtually guaranteed.` },
      { t: "Federal PR application", d: `Submit complete PR file with PCC, medicals, proofs and fees.` },
      { t: "Move to ${corridor.destination.province}", d: `Most PNP-backed PR files land in ${corridor.timelineMonths}.` }
    ],
    "study-permit": [
      { t: "Shortlist DLI colleges in ${corridor.destination.province}", d: `Target public colleges and universities — required for PGWP eligibility under the latest IRCC rules.` },
      { t: "Get LOA + GIC + IELTS", d: `Pay first-year tuition, lock CAD 20,635 GIC, score IELTS 6.0+ overall (no band below 6.0 for SDS).` },
      { t: "Apply via SDS", d: `Study Direct Stream gives ${corridor.origin.country} students a faster, more predictable decision.` },
      { t: "Land, study, and work part-time", d: `Up to 24 hrs/week off-campus during studies as of late 2024 rules.` },
      { t: "PGWP → CEC PR", d: `Graduates get a 1–3 year open work permit and qualify for Canadian Experience Class PR after 1 year of skilled NOC TEER 0/1/2/3 work.` }
    ],
    "work-permit": [
      { t: "Find a Canadian employer", d: `Target ${corridor.destination.name} employers in ${corridor.topIndustries.slice(0, 2).join(" and ")} — Global Talent Stream covers most NOC 21231/21234/21311 roles.` },
      { t: "LMIA or LMIA-exempt offer", d: `GTS LMIAs are issued in ~10 business days. ICT, CUSMA and Free-Trade exemptions skip LMIA entirely.` },
      { t: "Apply for the work permit", d: `${corridor.origin.country} nationals: standard processing 8–12 weeks; GTS 2 weeks via the 2-Week Service Standard.` },
      { t: "Land and start working", d: `Spouse gets an open work permit; kids get free K-12 schooling.` },
      { t: "Convert to PR via CEC / PNP", d: `After 12 months of skilled work, file CEC Express Entry or use the employer-driven PNP stream.` }
    ],
  };

  const steps = stepsByProgram[program.slug];

  const faqs = [
    {
      q: `How long does the move from ${corridor.origin.name} to ${corridor.destination.name} take on ${program.shortName}?`,
      a: `Realistically ${corridor.timelineMonths} from start to landing — assuming clean police checks, no medical inadmissibility and that documents are submitted in one shot.`,
    },
    {
      q: `What's the typical cost?`,
      a: `${corridor.costInrLakhs ? `From ${corridor.origin.country}: roughly ${corridor.costInrLakhs}. ` : ""}${corridor.costCadRange ? `Government fees: ${corridor.costCadRange}. ` : ""}Plan for IELTS, ECA, medicals, PCC, translations, biometrics and proof of funds (~CAD 14,690 single applicant for Express Entry).`,
    },
    {
      q: `Is ${program.shortName} the best route for someone in ${corridor.origin.name}?`,
      a: `${program.bestFor} If your profile doesn't match this, look at the other pathways listed below — most ${corridor.origin.name} clients qualify for at least two of them.`,
    },
    {
      q: `Why ${corridor.destination.name} specifically?`,
      a: `${corridor.diasporaSize}. Strongest local industries: ${corridor.topIndustries.join(", ")}. Direct/short flights from ${corridor.origin.name} (${corridor.flightHours}) make travel and family visits easy.`,
    },
    {
      q: `What if my CRS / English score is low?`,
      a: `We map you to a PNP, study-permit-to-PR or LMIA-backed work permit instead. There's almost always a legal pathway — it just may not be the one you started with.`,
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

  // Sibling programs for this corridor
  const otherPrograms = corridor.programs.filter((p) => p !== program.slug);

  // A few related corridors (same destination)
  const relatedCorridors = MOVE_CORRIDORS.filter(
    (c) => c.slug !== corridor.slug && c.destination.name === corridor.destination.name,
  ).slice(0, 3);

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
      </Helmet>

      <SeoSchema
        breadcrumbs={[
          { name: "Move to Canada", url: "/" },
          {
            name: `${corridor.origin.name} → ${corridor.destination.name}`,
            url: `/move/${corridor.slug}/${corridor.programs[0]}`,
          },
          { name: program.shortName, url: `/move/${corridor.slug}/${program.slug}` }
        ]}
      />

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Plane className="h-3.5 w-3.5" />
              <span aria-hidden>{corridor.origin.countryFlag}</span> {corridor.origin.name} → 🇨🇦 {corridor.destination.name}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              {headline}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {program.oneLiner} Here's the realistic step-by-step from {corridor.origin.name} to{" "}
              {corridor.destination.name}, {corridor.destination.province} — including cost, timeline,
              and the gotchas most blogs skip.
            </p>

            <div className="mt-6">
              <AuthorByline
                articleHeadline={headline}
                articleUrl={`/move/${corridor.slug}/${program.slug}`}
              />
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={<Clock className="h-4 w-4" />} label="Timeline" value={corridor.timelineMonths} />
              <StatCard icon={<Wallet className="h-4 w-4" />} label="Cost" value={corridor.costCadRange ?? corridor.costInrLakhs ?? "Varies"} />
              <StatCard icon={<Plane className="h-4 w-4" />} label="Flight" value={corridor.flightHours} />
              <StatCard icon={<Users className="h-4 w-4" />} label="Diaspora" value={corridor.diasporaSize} />
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-step */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">
            Step-by-step: {corridor.origin.name} to {corridor.destination.name} on {program.shortName}
          </h2>
          <ol className="space-y-4">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-4 rounded-lg border border-border bg-card p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <div>
                  <div className="font-semibold text-foreground">{s.t.replace(/\$\{corridor\.destination\.name\}/g, corridor.destination.name).replace(/\$\{corridor\.destination\.province\}/g, corridor.destination.province)}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.d.replace(/\$\{corridor\.destination\.name\}/g, corridor.destination.name).replace(/\$\{corridor\.destination\.province\}/g, corridor.destination.province).replace(/\$\{corridor\.origin\.name\}/g, corridor.origin.name).replace(/\$\{corridor\.origin\.country\}/g, corridor.origin.country).replace(/\$\{corridor\.timelineMonths\}/g, corridor.timelineMonths)}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why this destination */}
      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
            Why {corridor.destination.name} works for {corridor.origin.name} movers
          </h2>
          <Card>
            <CardContent className="space-y-3 pt-6">
              <Row icon={<Users className="h-4 w-4 text-primary" />} label="Community" value={corridor.diasporaSize} />
              <Row icon={<Building2 className="h-4 w-4 text-primary" />} label="Top industries" value={corridor.topIndustries.join(" · ")} />
              <Row icon={<Plane className="h-4 w-4 text-primary" />} label="Flight time" value={corridor.flightHours} />
              <Row icon={<Clock className="h-4 w-4 text-primary" />} label="Realistic timeline" value={corridor.timelineMonths} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Other pathways for same corridor */}
      {otherPrograms.length > 0 && (
        <section className="container mx-auto px-4 pb-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Other ways to get from {corridor.origin.name} to {corridor.destination.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {otherPrograms.map((p) => {
                const prog = MOVE_PROGRAMS[p];
                return (
                  <Link
                    key={p}
                    to={`/move/${corridor.slug}/${p}`}
                    className="group rounded-lg border border-border bg-card p-5 transition hover:border-primary hover:shadow-md"
                  >
                    <div className="text-base font-semibold text-foreground group-hover:text-primary">
                      {prog.name}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">{prog.oneLiner}</div>
                    <div className="mt-3 inline-flex items-center gap-1 text-sm text-primary">
                      Open guide <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
            FAQs — {corridor.origin.name} to {corridor.destination.name}
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
                Free eligibility check — {corridor.origin.name} → {corridor.destination.name}
              </h2>
              <p className="mt-2 text-muted-foreground">
                our team will map your profile to {program.shortName} and confirm whether
                another pathway gives you a faster or cheaper route.
              </p>
            </div>
            <EligibilityForm
              sourcePage={`move-${corridor.slug}-${program.slug}`}
              heading={`Move from ${corridor.origin.name} to ${corridor.destination.name}`}
            />
          </div>
        </div>
      </section>

      {/* Related corridors */}
      {relatedCorridors.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              Other corridors landing in {corridor.destination.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {relatedCorridors.map((c) => (
                <Link
                  key={c.slug}
                  to={`/move/${c.slug}/${c.programs[0]}`}
                  className="group rounded-lg border border-border bg-card p-5 transition hover:border-primary hover:shadow-md"
                >
                  <div className="text-base font-semibold text-foreground group-hover:text-primary">
                    {c.origin.name} → {c.destination.name}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {MOVE_PROGRAMS[c.programs[0]].shortName} · {c.timelineMonths}
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1 text-sm text-primary">
                    Open guide <ArrowRight className="h-3.5 w-3.5" />
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

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="rounded-lg border border-border bg-card p-4">
    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {icon} {label}
    </div>
    <div className="mt-2 text-sm font-semibold text-foreground">{value}</div>
  </div>
);

const Row = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-start gap-3 border-b border-border pb-3 last:border-b-0 last:pb-0">
    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
      {icon}
    </div>
    <div className="flex-1">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-sm text-foreground">{value}</div>
    </div>
  </div>
);

export default MoveCorridorPage;
