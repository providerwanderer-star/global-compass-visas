import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Calculator, ArrowRight, AlertTriangle, Lightbulb, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";

type ApplicantType = "single" | "couple" | "family";
type PathwayKey = "express-entry" | "study-permit" | "work-permit" | "super-visa" | "spousal-sponsorship";

const INR_RATE = 61;

const fees: Record<PathwayKey, { name: string; items: { label: string; amounts: Record<ApplicantType, number> }[] }> = {
  "express-entry": {
    name: "Express Entry (PR Application)",
    items: [
      { label: "IRCC Processing Fee (Principal applicant)", amounts: { single: 1365, couple: 1365, family: 1365 } },
      { label: "IRCC Processing Fee (Spouse / partner)", amounts: { single: 0, couple: 1365, family: 1365 } },
      { label: "Right of Permanent Residence — Principal", amounts: { single: 515, couple: 515, family: 515 } },
      { label: "Right of Permanent Residence — Spouse", amounts: { single: 0, couple: 515, family: 515 } },
      { label: "Biometrics (max CAD 170 per family)", amounts: { single: 85, couple: 170, family: 170 } },
      { label: "Medical Exam estimate (per adult)", amounts: { single: 400, couple: 800, family: 1000 } },
      { label: "Police Clearance Certificate (approx)", amounts: { single: 15, couple: 30, family: 30 } },
      { label: "WES Credential Evaluation", amounts: { single: 235, couple: 470, family: 470 } },
      { label: "IELTS / Language Test Fee", amounts: { single: 260, couple: 520, family: 520 } },
      { label: "Photos, courier, miscellaneous", amounts: { single: 100, couple: 150, family: 200 } },
    ],
  },
  "study-permit": {
    name: "Study Permit",
    items: [
      { label: "Study Permit Processing Fee", amounts: { single: 150, couple: 150, family: 150 } },
      { label: "Biometrics", amounts: { single: 85, couple: 85, family: 85 } },
      { label: "IELTS / Language Test Fee", amounts: { single: 260, couple: 260, family: 260 } },
      { label: "Medical Exam (if required)", amounts: { single: 400, couple: 400, family: 400 } },
      { label: "Photos, courier, miscellaneous", amounts: { single: 75, couple: 100, family: 100 } },
    ],
  },
  "work-permit": {
    name: "Work Permit (LMIA-based)",
    items: [
      { label: "Work Permit Processing Fee", amounts: { single: 155, couple: 310, family: 310 } },
      { label: "Biometrics", amounts: { single: 85, couple: 170, family: 170 } },
      { label: "Medical Exam (if required)", amounts: { single: 400, couple: 800, family: 1000 } },
      { label: "Photos, courier, miscellaneous", amounts: { single: 75, couple: 100, family: 150 } },
    ],
  },
  "super-visa": {
    name: "Super Visa (Parent / Grandparent)",
    items: [
      { label: "Super Visa Processing Fee", amounts: { single: 100, couple: 200, family: 200 } },
      { label: "Travel Medical Insurance (1 year, min $100K)", amounts: { single: 1200, couple: 2400, family: 2400 } },
      { label: "Biometrics", amounts: { single: 85, couple: 170, family: 170 } },
      { label: "Medical Exam", amounts: { single: 400, couple: 800, family: 800 } },
      { label: "Photos, courier, miscellaneous", amounts: { single: 75, couple: 100, family: 100 } },
    ],
  },
  "spousal-sponsorship": {
    name: "Spousal Sponsorship",
    items: [
      { label: "Sponsorship Application Fee", amounts: { single: 75, couple: 75, family: 75 } },
      { label: "Permanent Resident Application Fee", amounts: { single: 490, couple: 490, family: 490 } },
      { label: "Right of Permanent Residence Fee", amounts: { single: 515, couple: 515, family: 515 } },
      { label: "Biometrics", amounts: { single: 85, couple: 85, family: 85 } },
      { label: "Medical Exam", amounts: { single: 400, couple: 400, family: 400 } },
      { label: "Police certificate, photos, courier, misc", amounts: { single: 150, couple: 150, family: 150 } },
    ],
  },
};

const pathwayOrder: { key: PathwayKey; label: string; emoji: string }[] = [
  { key: "express-entry", label: "Express Entry", emoji: "🍁" },
  { key: "study-permit", label: "Study Permit", emoji: "🎓" },
  { key: "work-permit", label: "Work Permit", emoji: "💼" },
  { key: "super-visa", label: "Super Visa", emoji: "👨‍👩‍👧" },
  { key: "spousal-sponsorship", label: "Spousal Sponsorship", emoji: "❤️" },
];

const faqs = [
  { q: "How much does it cost to immigrate to Canada in 2026?", a: "As of April 2026, a single Express Entry applicant pays approximately CAD 2,975 in government and required third-party fees: IRCC processing (CAD 1,365), Right of PR (CAD 515), biometrics (CAD 85), medical exam (~CAD 400), WES credential evaluation (CAD 235), IELTS (CAD 260), plus ~CAD 115 in police checks and miscellaneous costs. A couple typically pays CAD 5,500–6,500 and a family of three pays CAD 7,000–8,000. These are government and mandatory third-party fees only — they do not include consultant fees, settlement funds, or pre-arrival expenses." },
  { q: "What is the IRCC fee for Canada PR in 2026?", a: "As of April 2026, the IRCC fee for Express Entry permanent residence is CAD 1,365 per adult applicant (processing fee CAD 850 + Right of Permanent Residence CAD 515). Each dependent child adds CAD 230 (no Right of PR for children). Spousal sponsorship costs CAD 1,080 total per sponsored spouse, and dependent children under sponsorship cost CAD 155 each." },
  { q: "How much settlement funds do I need on top of fees?", a: "Express Entry requires proof of settlement funds separate from application fees. As of 2026, IRCC requires CAD 14,690 for a single applicant, CAD 18,288 for two people, and roughly CAD 4,000 more per additional family member. These funds must be unencumbered and available — they are not paid to IRCC, but you must show bank statements proving you have them. Canadian Experience Class (CEC) applicants and those with a valid Canadian job offer are exempt." },
  { q: "Can I pay Canada immigration fees in INR from India?", a: "No. All IRCC fees must be paid in Canadian dollars (CAD) using a credit card or debit card on the IRCC online portal. From India, this typically means using a credit card that supports international transactions in CAD. The conversion to INR happens at your card issuer's foreign exchange rate, plus typically a 2–3.5% markup. Our calculator shows an indicative INR value at CAD 1 = ₹61, but your actual conversion depends on the date of payment and your card." },
  { q: "Are there hidden costs in Canada immigration most people miss?", a: "Yes. Common missed costs include: IELTS retakes (CAD 260 each — most applicants take 2 attempts), spouse's WES credential evaluation (CAD 235 extra if claiming spousal points), PGWP application after graduation (CAD 255), PR card renewal every 5 years (CAD 50), notarisation and translation of documents (CAD 100–400), express courier from India to Canada visa offices (CAD 50–100 per shipment), and post-landing settlement costs (rent deposit, SIN registration travel, initial groceries — typically CAD 3,000–5,000 in the first month)." },
];

const ImmigrationCostCalculatorPage = () => {
  const [pathway, setPathway] = useState<PathwayKey>("express-entry");
  const [applicantType, setApplicantType] = useState<ApplicantType>("single");
  const [children, setChildren] = useState(0);
  const [showINR, setShowINR] = useState(false);

  const visibleItems = useMemo(
    () => fees[pathway].items.filter((it) => it.amounts[applicantType] > 0),
    [pathway, applicantType]
  );

  const baseTotal = useMemo(
    () => visibleItems.reduce((sum, it) => sum + it.amounts[applicantType], 0),
    [visibleItems, applicantType]
  );

  const childrenFee = applicantType === "family" ? children * 155 : 0;
  const totalCAD = baseTotal + childrenFee;
  const totalINR = totalCAD * INR_RATE;

  const fmtCAD = (n: number) => `CAD ${n.toLocaleString("en-CA")}`;
  const fmtINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <div>
      <Helmet>
        <title>Canada Immigration Cost Calculator 2026 — Total PR & Visa Fees | 4 Aces Visa</title>
        <meta name="description" content="Calculate total Canada immigration costs 2026. Express Entry, study permit, work permit fees in CAD and INR. Government fee breakdown for single, couple, and family." />
        <link rel="canonical" href="https://www.4acesvisa.com/immigration-cost-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Canada Immigration Cost Calculator 2026 | 4 Aces Visa" />
        <meta property="og:description" content="Total Canada immigration costs 2026 in CAD & INR. Express Entry, study, work, super visa, spousal sponsorship — single, couple or family." />
        <meta property="og:url" content="https://www.4acesvisa.com/immigration-cost-calculator" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                name: "Canada Immigration Cost Calculator",
                url: "https://www.4acesvisa.com/immigration-cost-calculator",
                applicationCategory: "FinanceApplication",
                operatingSystem: "Any",
                offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
                provider: { "@type": "Organization", name: "4 Aces Visa", url: "https://www.4acesvisa.com" },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.4acesvisa.com/" },
                  { "@type": "ListItem", position: 2, name: "Immigration Cost Calculator", item: "https://www.4acesvisa.com/immigration-cost-calculator" },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
              },
            ],
          })}
        </script>
      </Helmet>

      {/* HERO */}
      <section className="bg-primary text-primary-foreground pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-5">
            <Link to="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">Cost Calculator</span>
          </nav>
          <span className="inline-flex items-center gap-2 bg-gold/20 text-gold px-3 py-1.5 rounded-full text-xs font-bold mb-4 border border-gold/30">
            <Calculator className="h-3.5 w-3.5" /> Government fees as of April 2026
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Canada Immigration Cost Calculator 2026
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl text-lg">
            As of April 2026, calculate exact IRCC government fees plus required third-party costs for Express Entry, study permits, work permits, super visas and spousal sponsorship — instantly in CAD or INR.
          </p>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-card rounded-2xl border border-border shadow-elevated p-6 md:p-8">

              {/* A — Pathway */}
              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">1. Choose Pathway</h2>
                <div className="flex flex-wrap gap-2">
                  {pathwayOrder.map((p) => (
                    <button
                      key={p.key}
                      onClick={() => setPathway(p.key)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                        pathway === p.key
                          ? "bg-gold border-gold text-accent-foreground shadow-gold"
                          : "bg-white border-border text-foreground hover:border-gold/50"
                      }`}
                    >
                      <span className="mr-1.5">{p.emoji}</span>{p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* B — Applicant type */}
              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">2. Applicant Type</h2>
                <div className="flex flex-wrap gap-2 items-center">
                  {(["single","couple","family"] as ApplicantType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => { setApplicantType(t); if (t !== "family") setChildren(0); }}
                      className={`px-5 py-2.5 rounded-xl text-sm font-semibold border-2 capitalize transition-all ${
                        applicantType === t
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-white border-border text-foreground hover:border-primary/40"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                  {applicantType === "family" && (
                    <div className="flex items-center gap-2 ml-2 bg-secondary/60 rounded-xl px-3 py-2 border border-border">
                      <span className="text-sm font-medium text-foreground">Children:</span>
                      <button
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="h-7 w-7 rounded-lg border border-border bg-white flex items-center justify-center hover:border-gold"
                        aria-label="Decrease children"
                      ><Minus className="h-3.5 w-3.5" /></button>
                      <span className="font-bold text-foreground w-5 text-center">{children}</span>
                      <button
                        onClick={() => setChildren(Math.min(4, children + 1))}
                        className="h-7 w-7 rounded-lg border border-border bg-white flex items-center justify-center hover:border-gold"
                        aria-label="Increase children"
                      ><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                  )}
                </div>
              </div>

              {/* C — Currency */}
              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">3. Currency</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowINR(false)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${!showINR ? "bg-primary border-primary text-primary-foreground" : "bg-white border-border text-foreground hover:border-primary/40"}`}
                  >🇨🇦 CAD</button>
                  <button
                    onClick={() => setShowINR(true)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${showINR ? "bg-primary border-primary text-primary-foreground" : "bg-white border-border text-foreground hover:border-primary/40"}`}
                  >🇮🇳 CAD + INR</button>
                </div>
              </div>

              {/* D — Breakdown */}
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  4. {fees[pathway].name} — Fee Breakdown
                </h2>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-primary/5 text-foreground">
                      <tr>
                        <th className="text-left px-4 py-3 font-bold">Fee Item</th>
                        <th className="text-right px-4 py-3 font-bold whitespace-nowrap">Amount (CAD)</th>
                        {showINR && <th className="text-right px-4 py-3 font-bold whitespace-nowrap">Amount (INR)</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {visibleItems.map((it, i) => {
                        const cad = it.amounts[applicantType];
                        return (
                          <tr key={i} className="border-t border-border">
                            <td className="px-4 py-3 text-foreground">{it.label}</td>
                            <td className="px-4 py-3 text-right font-medium text-foreground whitespace-nowrap">{fmtCAD(cad)}</td>
                            {showINR && <td className="px-4 py-3 text-right font-medium text-muted-foreground whitespace-nowrap">{fmtINR(cad * INR_RATE)}</td>}
                          </tr>
                        );
                      })}
                      {childrenFee > 0 && (
                        <tr className="border-t border-border bg-secondary/40">
                          <td className="px-4 py-3 text-foreground">Dependent children fee (×{children} @ CAD 155)</td>
                          <td className="px-4 py-3 text-right font-medium text-foreground whitespace-nowrap">{fmtCAD(childrenFee)}</td>
                          {showINR && <td className="px-4 py-3 text-right font-medium text-muted-foreground whitespace-nowrap">{fmtINR(childrenFee * INR_RATE)}</td>}
                        </tr>
                      )}
                      <tr className="border-t-2 border-gold bg-gold/10">
                        <td className="px-4 py-4 font-bold text-foreground">Estimated Total</td>
                        <td className="px-4 py-4 text-right font-bold text-foreground text-lg whitespace-nowrap">{fmtCAD(totalCAD)}</td>
                        {showINR && <td className="px-4 py-4 text-right font-bold text-foreground text-lg whitespace-nowrap">{fmtINR(totalINR)}</td>}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TOTAL DISPLAY */}
              <div className="mt-6 rounded-2xl border-2 border-gold bg-gradient-to-br from-gold/10 to-gold/5 p-6 text-center">
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Estimated Total</div>
                <div className="font-display text-4xl md:text-5xl font-bold text-gold-dark">{fmtCAD(totalCAD)}</div>
                {showINR && <div className="text-lg text-muted-foreground mt-1">≈ {fmtINR(totalINR)}</div>}
                <p className="text-xs text-muted-foreground mt-3 max-w-xl mx-auto">
                  Government and mandatory third-party fees only. Consultant fees, settlement funds (separate IRCC requirement), pre-arrival travel and post-landing costs are not included. INR uses an indicative rate of CAD 1 = ₹{INR_RATE}.
                </p>
                <Link to="/contact">
                  <Button className="mt-4 bg-gold text-accent-foreground hover:bg-gold-dark font-bold">
                    Get an Exact Quote — Free <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* HIDDEN COSTS */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Hidden Costs Most People Miss</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { t: "IELTS retakes", d: "Most applicants take 2 attempts. Budget CAD 260 each (~CAD 520 total)." },
              { t: "Spouse WES", d: "If claiming spousal credential points, add CAD 235 for a second WES report." },
              { t: "PGWP application", d: "After graduation, the Post-Graduation Work Permit costs an additional CAD 255." },
              { t: "PR card renewal", d: "Every 5 years, PR card renewal costs CAD 50 — easy to forget." },
            ].map((c, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border p-5 shadow-sm">
                <AlertTriangle className="h-6 w-6 text-gold mb-3" />
                <h3 className="font-bold text-foreground mb-1">{c.t}</h3>
                <p className="text-sm text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAVE TIPS */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">How to Save on Immigration Costs</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { t: "Take CELPIP instead of IELTS", d: "CELPIP is recognised for the same CLB levels and is often cheaper than IELTS in Canada." },
              { t: "Apply through SDS for study permits", d: "The Student Direct Stream is faster (often under 3 weeks) and avoids costly resubmissions." },
              { t: "Use WES Basic ECA", d: "WES Basic ECA is around CAD 200 less than the Document-by-Document evaluation, with the same IRCC acceptance." },
            ].map((c, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border p-5 shadow-sm">
                <Lightbulb className="h-6 w-6 text-gold mb-3" />
                <h3 className="font-bold text-foreground mb-1">{c.t}</h3>
                <p className="text-sm text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <AnimatedSection className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          </AnimatedSection>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="group bg-card rounded-2xl border border-border p-5">
                <summary className="cursor-pointer font-bold text-foreground flex items-center justify-between">
                  {f.q}
                  <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                </summary>
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">Want a Transparent, Itemised Quote?</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
            Our RCIC-authorised consultants give you a written breakdown — government fees, our service fee, no surprises.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact"><Button className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold">Get Free Assessment <ArrowRight className="ml-1.5 h-4 w-4" /></Button></Link>
            <Link to="/crs-calculator"><Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10">Calculate Your CRS Score</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImmigrationCostCalculatorPage;
