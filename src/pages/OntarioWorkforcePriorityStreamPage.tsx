import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight, Briefcase, HardHat, Stethoscope, Calendar, MapPin,
  CheckCircle2, AlertTriangle, ClipboardList, Info, Clock,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://www.gargbrothers.ca/pnp/ontario/workforce-priority-stream";

const PATHWAYS = [
  {
    icon: Briefcase,
    title: "Skilled Workers Pathway",
    teer: "TEER 0, 1, 2 or 3",
    audience: "Managers, professionals, technical and skilled trades roles",
    requirements: [
      "Full-time, permanent job offer from an Ontario employer",
      "Occupation classified in NOC TEER 0–3",
      "Wage that meets or exceeds the Ontario median for the occupation",
      "Two years of full-time work experience in the offered occupation (last 5 years)",
      "CLB 7 in English or French (higher for regulated occupations)",
      "Post-secondary education (equivalent to a Canadian credential — ECA required)",
    ],
  },
  {
    icon: HardHat,
    title: "Essential Workers Pathway",
    teer: "TEER 4 or 5",
    audience: "Frontline workers in labour-critical Ontario industries",
    requirements: [
      "Full-time, permanent job offer from an Ontario employer",
      "Occupation classified in NOC TEER 4 or 5 within a priority sector",
      "Wage that meets or exceeds the Ontario median for the occupation",
      "Nine months of full-time work experience in the offered occupation (last 3 years)",
      "CLB 4 in English or French",
      "Canadian secondary-school credential or an equivalent ECA",
    ],
  },
  {
    icon: Stethoscope,
    title: "Self-Employed Physicians Pathway",
    teer: "Licensed physicians",
    audience: "Family physicians and specialists setting up practice in Ontario",
    requirements: [
      "Licensed to practise medicine in Ontario (CPSO registration)",
      "Intent to establish or continue a self-employed medical practice in Ontario",
      "Business plan demonstrating patient-care commitment",
      "No employer job offer required for this pathway",
    ],
  },
];

const OLD_TO_NEW: Array<{ old: string; mapsTo: string }> = [
  { old: "Foreign Worker Stream", mapsTo: "Skilled Workers Pathway (TEER 0–3, requires job offer)" },
  { old: "In-Demand Skills Stream", mapsTo: "Essential Workers Pathway (TEER 4–5)" },
  { old: "International Student Stream", mapsTo: "Skilled Workers Pathway (job offer now mandatory)" },
  { old: "Master's Graduate Stream", mapsTo: "Skilled Workers Pathway (job offer now mandatory)" },
  { old: "PhD Graduate Stream", mapsTo: "Skilled Workers Pathway or Self-Employed Physicians (if applicable)" },
  { old: "Human Capital Priorities Stream", mapsTo: "Skilled Workers Pathway (Ontario job offer required)" },
  { old: "French-Speaking Skilled Worker Stream", mapsTo: "Skilled Workers Pathway — apply through federal Francophone routes for language advantage" },
  { old: "Skilled Trades Stream", mapsTo: "Skilled Workers Pathway (TEER trades codes, job offer required)" },
];

const FAQS = [
  {
    q: "When did the eight legacy OINP streams close?",
    a: "Ontario permanently closed all eight legacy OINP streams on June 25–26, 2026. No new applications or expressions of interest are being accepted under those streams.",
  },
  {
    q: "When does the Ontario Workforce Priority Stream open for applications?",
    a: "The new Expression of Interest (EOI) system is expected to open later in the summer of 2026. Official ontario.ca guidance will confirm exact intake dates — this page updates automatically when new IRCC/Ontario data is ingested.",
  },
  {
    q: "Do I still need a job offer under the new stream?",
    a: "Yes. The Skilled Workers and Essential Workers pathways both require a full-time, permanent Ontario job offer. Only the Self-Employed Physicians pathway is exempt.",
  },
  {
    q: "What happens to my in-progress application under a closed stream?",
    a: "Ontario has committed to continuing processing of applications already submitted before the closure date. New submissions under the eight closed streams are not being accepted.",
  },
  {
    q: "How does this affect my Express Entry CRS score?",
    a: "A provincial nomination through the new stream still adds 600 CRS points, effectively guaranteeing an ITA in the next Express Entry round for enhanced-stream applicants.",
  },
];

const OntarioWorkforcePriorityStreamPage = () => {
  const [lastIngestedAt, setLastIngestedAt] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.functions.invoke("immigration-news");
        const ts = (data as { lastIngestedAt?: string | null } | null)?.lastIngestedAt ?? null;
        setLastIngestedAt(ts);
      } catch {
        setLastIngestedAt(null);
      }
    })();
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Ontario Workforce Priority Stream — RCIC Assistance",
        provider: {
          "@type": "Organization",
          name: "Garg Brothers Immigration",
          url: "https://www.gargbrothers.ca",
        },
        areaServed: { "@type": "AdministrativeArea", name: "Ontario, Canada" },
        serviceType: "Provincial Nominee Program consulting",
        url: CANONICAL,
        description:
          "Guidance on Ontario's new Workforce Priority Stream, which replaced the eight legacy OINP streams closed on June 25, 2026.",
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.gargbrothers.ca" },
          { "@type": "ListItem", position: 2, name: "PNP Tracker", item: "https://www.gargbrothers.ca/pnp-tracker" },
          { "@type": "ListItem", position: 3, name: "Ontario Workforce Priority Stream", item: CANONICAL },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <Helmet>
        <title>Ontario Workforce Priority Stream 2026 — New OINP Guide · Garg Brothers</title>
        <meta
          name="description"
          content="Ontario replaced its eight legacy OINP streams on June 25, 2026 with the new Workforce Priority Stream. Full guide to the three pathways, job-offer requirements, EOI timeline, and CRS impact."
        />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Ontario Workforce Priority Stream 2026 — Complete OINP Guide" />
        <meta property="og:description" content="Complete guide to Ontario's new Workforce Priority Stream that replaced the eight closed OINP streams." />
        <meta property="og:url" content={CANONICAL} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-12 md:py-16 px-4">
        <div className="container-narrow mx-auto">
          <nav aria-label="Breadcrumb" className="text-xs text-primary-foreground/70 mb-3">
            <Link to="/" className="hover:text-gold">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/pnp-tracker" className="hover:text-gold">PNP Tracker</Link>
            <span className="mx-2">/</span>
            <span>Ontario Workforce Priority Stream</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold mb-3">
            <MapPin className="h-3.5 w-3.5" /> Ontario · New in 2026
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight max-w-3xl">
            Ontario Workforce Priority Stream
          </h1>
          <p className="text-primary-foreground/85 mt-3 max-w-2xl text-base md:text-lg">
            Ontario permanently closed all eight legacy OINP streams on June 25, 2026 and replaced them with
            a single Workforce Priority Stream containing three pathways. Here&apos;s exactly what changed,
            who qualifies, and how to prepare while the new Expression of Interest system rolls out.
          </p>
          {lastIngestedAt && (
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-primary-foreground/70">
              <Clock className="h-3 w-3" /> Data current — last live update {new Date(lastIngestedAt).toLocaleString("en-CA")}
            </div>
          )}
        </div>
      </section>

      <section className="container-narrow mx-auto px-4 py-10 md:py-14 space-y-12">
        {/* Closure summary */}
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-5 md:p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-700 mt-0.5 shrink-0" />
            <div>
              <h2 className="font-display text-lg md:text-xl font-bold text-amber-950">
                Eight OINP streams closed permanently
              </h2>
              <p className="text-sm text-amber-900 mt-1.5">
                Foreign Worker · In-Demand Skills · International Student · Master&apos;s Graduate ·
                PhD Graduate · Human Capital Priorities · French-Speaking Skilled Worker · Skilled Trades.
                No further invitations or applications will be accepted under any of the above.
              </p>
            </div>
          </div>
        </div>

        {/* Three pathways */}
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            The three new pathways
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            All three pathways operate through a single Expression of Interest system with a shared
            selection pool. Every skilled and essential pathway requires a valid full-time, permanent
            Ontario job offer.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {PATHWAYS.map((p) => {
              const Icon = p.icon;
              return (
                <article key={p.title} className="bg-card border border-border rounded-xl p-5 hover:border-gold hover:shadow-card transition-all flex flex-col">
                  <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary grid place-items-center mb-3">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground">{p.title}</h3>
                  <div className="text-xs font-semibold uppercase tracking-wide text-primary mt-1">{p.teer}</div>
                  <p className="text-sm text-muted-foreground mt-2">{p.audience}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-foreground/90">
                    {p.requirements.map((r) => (
                      <li key={r} className="flex gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>

        {/* Job offer requirement callout */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 md:p-6">
          <div className="flex items-start gap-3">
            <ClipboardList className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <h2 className="font-display text-lg font-bold text-foreground">
                Job-offer requirement (Skilled + Essential pathways)
              </h2>
              <p className="text-sm text-muted-foreground mt-1.5">
                Under the old streams several routes (International Student, Master&apos;s Graduate, Human Capital
                Priorities) allowed candidates to be nominated without an Ontario employer job offer. The new
                Workforce Priority Stream removes that flexibility: an eligible full-time, permanent Ontario job
                offer is now mandatory for every applicant except self-employed physicians. Wages must meet or
                exceed the Ontario median for the occupation.
              </p>
            </div>
          </div>
        </div>

        {/* Old → new mapping */}
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Old stream → new pathway mapping
          </h2>
          <p className="text-muted-foreground mt-2">
            If you were preparing under a closed stream, this is where its equivalent pathway lives now.
          </p>
          <div className="mt-5 overflow-hidden rounded-xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60">
                <tr>
                  <th className="text-left font-bold p-3">Closed stream (pre-June 2026)</th>
                  <th className="text-left font-bold p-3">Maps to</th>
                </tr>
              </thead>
              <tbody>
                {OLD_TO_NEW.map((row) => (
                  <tr key={row.old} className="border-t border-border">
                    <td className="p-3 font-semibold text-foreground">{row.old}</td>
                    <td className="p-3 text-muted-foreground">{row.mapsTo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" /> Expected EOI timeline
          </h2>
          <ol className="mt-4 relative border-l-2 border-primary/20 pl-6 space-y-4">
            <li>
              <div className="absolute -left-[9px] h-4 w-4 rounded-full bg-primary" />
              <div className="font-bold text-foreground">June 25–26, 2026</div>
              <div className="text-sm text-muted-foreground">All eight legacy streams closed permanently.</div>
            </li>
            <li>
              <div className="absolute -left-[9px] h-4 w-4 rounded-full bg-gold" />
              <div className="font-bold text-foreground">Summer 2026 (expected)</div>
              <div className="text-sm text-muted-foreground">
                New Expression of Interest system opens. Exact date pending — official details on ontario.ca/OINP.
              </div>
            </li>
            <li>
              <div className="absolute -left-[9px] h-4 w-4 rounded-full bg-muted-foreground/40" />
              <div className="font-bold text-foreground">First invitations to apply</div>
              <div className="text-sm text-muted-foreground">
                Following the EOI opening, based on Ontario labour-market priorities.
              </div>
            </li>
          </ol>
        </div>

        {/* CRS implications */}
        <div className="rounded-xl border border-border bg-card p-5 md:p-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
            <Info className="h-6 w-6 text-primary" /> CRS &amp; Express Entry impact
          </h2>
          <p className="text-muted-foreground mt-2">
            A Workforce Priority Stream nomination is expected to remain an <strong>enhanced</strong> nomination — meaning
            candidates in the Express Entry pool receive the standard <strong>+600 CRS bonus</strong> upon acceptance, effectively
            guaranteeing an ITA in the next federal draw. Applicants without an existing Express Entry profile
            can still apply through the base (non-EE) route.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/crs-calculator">
              <Button variant="outline">Calculate my CRS</Button>
            </Link>
            <Link to="/pnp-tracker">
              <Button variant="outline">View live PNP tracker</Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get a free assessment <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Frequently asked questions</h2>
          <dl className="mt-4 space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group bg-card border border-border rounded-lg p-4 open:border-primary/40">
                <summary className="cursor-pointer font-semibold text-foreground list-none flex items-center justify-between gap-3">
                  <span>{f.q}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-sm text-muted-foreground mt-2">{f.a}</p>
              </details>
            ))}
          </dl>
        </div>

        <p className="text-xs text-muted-foreground border-t border-border pt-4">
          Source: Ontario Ministry of Labour, Immigration, Training and Skills Development (ontario.ca/OINP).
          Program details reflect the official announcement of June 25, 2026; specific EOI-opening dates and
          intake caps will be confirmed by Ontario. Content is informational and not legal advice.
        </p>
      </section>
    </div>
  );
};

export default OntarioWorkforcePriorityStreamPage;