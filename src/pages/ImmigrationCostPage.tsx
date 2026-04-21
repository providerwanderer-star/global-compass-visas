import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const INR_RATE = 61; // 1 CAD ≈ 61 INR (update periodically)

interface FeeItem {
  label: string;
  amounts: { single: number; couple: number; family: number };
  notes?: string;
}

interface Pathway {
  id: string;
  name: string;
  icon: string;
  description: string;
  fees: FeeItem[];
}

const pathways: Pathway[] = [
  {
    id: "express-entry",
    name: "Express Entry (PR)",
    icon: "🇨🇦",
    description: "Federal Skilled Worker, CEC, or Federal Skilled Trades",
    fees: [
      { label: "Processing fee (principal)", amounts: { single: 1050, couple: 1050, family: 1050 }, notes: "Non-refundable" },
      { label: "Right of Permanent Residence Fee (RPRF)", amounts: { single: 515, couple: 515, family: 515 } },
      { label: "Spouse processing fee", amounts: { single: 0, couple: 1050, family: 1050 } },
      { label: "Biometrics", amounts: { single: 85, couple: 170, family: 255 } },
      { label: "Medical exam (per person)", amounts: { single: 225, couple: 450, family: 675 }, notes: "Estimated; varies by clinic" },
      { label: "Police clearance certificate", amounts: { single: 50, couple: 100, family: 150 }, notes: "Per country, estimate" },
      { label: "Document translation (estimate)", amounts: { single: 200, couple: 350, family: 500 } },
      { label: "RCIC consultant fee (4 Aces)", amounts: { single: 1500, couple: 2000, family: 2500 }, notes: "Varies by complexity" },
    ],
  },
  {
    id: "study-permit",
    name: "Study Permit",
    icon: "🎓",
    description: "Full-time study at a Designated Learning Institution (DLI)",
    fees: [
      { label: "Study permit application fee", amounts: { single: 150, couple: 150, family: 150 } },
      { label: "Biometrics", amounts: { single: 85, couple: 85, family: 85 } },
      { label: "Medical exam (if required)", amounts: { single: 225, couple: 225, family: 225 }, notes: "Not always required" },
      { label: "IRCC Student Direct Stream (SDS) fee", amounts: { single: 0, couple: 0, family: 0 }, notes: "SDS is free; regular stream = $150" },
      { label: "GIC (Guaranteed Investment Certificate)", amounts: { single: 10200, couple: 10200, family: 10200 }, notes: "Refundable; required for SDS — $10,000 deposited + $200 bank fee" },
      { label: "Tuition (first year estimate)", amounts: { single: 22000, couple: 22000, family: 22000 }, notes: "Varies widely by program and institution" },
      { label: "RCIC consultation fee", amounts: { single: 500, couple: 500, family: 500 }, notes: "For student permit guidance" },
    ],
  },
  {
    id: "work-permit",
    name: "Work Permit (LMIA)",
    icon: "💼",
    description: "LMIA-based work permit — employer sponsors",
    fees: [
      { label: "Work permit application fee", amounts: { single: 155, couple: 155, family: 155 } },
      { label: "Open work permit holder fee", amounts: { single: 100, couple: 100, family: 100 }, notes: "If applicable" },
      { label: "Biometrics", amounts: { single: 85, couple: 170, family: 255 } },
      { label: "Medical exam", amounts: { single: 225, couple: 450, family: 675 } },
      { label: "LMIA fee (paid by employer)", amounts: { single: 1000, couple: 1000, family: 1000 }, notes: "Employer typically covers this" },
      { label: "RCIC fee", amounts: { single: 800, couple: 800, family: 800 } },
    ],
  },
  {
    id: "super-visa",
    name: "Super Visa (Parents)",
    icon: "👨‍👩‍👧",
    description: "10-year multi-entry visa for parents and grandparents",
    fees: [
      { label: "Temporary Resident Visa (TRV) fee", amounts: { single: 100, couple: 200, family: 200 } },
      { label: "Biometrics", amounts: { single: 85, couple: 170, family: 170 } },
      { label: "Medical exam", amounts: { single: 225, couple: 450, family: 450 } },
      { label: "Medical insurance (1 year minimum)", amounts: { single: 2000, couple: 4000, family: 4000 }, notes: "Min $100,000 coverage required; varies by age and insurer" },
      { label: "RCIC consultation fee", amounts: { single: 600, couple: 800, family: 800 } },
    ],
  },
  {
    id: "spousal",
    name: "Spousal Sponsorship",
    icon: "❤️",
    description: "Sponsor your spouse or common-law partner for PR",
    fees: [
      { label: "Sponsorship application fee", amounts: { single: 75, couple: 75, family: 75 } },
      { label: "Principal applicant processing fee", amounts: { single: 1050, couple: 1050, family: 1050 } },
      { label: "Right of Permanent Residence Fee (RPRF)", amounts: { single: 515, couple: 515, family: 515 } },
      { label: "Biometrics (applicant)", amounts: { single: 85, couple: 85, family: 85 } },
      { label: "Medical exam", amounts: { single: 225, couple: 225, family: 225 } },
      { label: "Police clearance", amounts: { single: 50, couple: 50, family: 50 } },
      { label: "RCIC fee (optional)", amounts: { single: 1000, couple: 1000, family: 1000 }, notes: "Spousal applications have lower refusal risk with professional help" },
    ],
  },
];

const ImmigrationCostPage = () => {
  const [activePathway, setActivePathway] = useState<string>("express-entry");
  const [familyType, setFamilyType] = useState<"single" | "couple" | "family">("single");
  const [children, setChildren] = useState(0);
  const [currency, setCurrency] = useState<"CAD" | "INR">("CAD");

  const pathway = pathways.find((p) => p.id === activePathway)!;

  const fmt = (n: number) => {
    const val = currency === "INR" ? Math.round(n * INR_RATE) : n;
    return new Intl.NumberFormat("en-CA", { style: "currency", currency: currency === "INR" ? "INR" : "CAD", maximumFractionDigits: 0 }).format(val);
  };

  const childFee = familyType === "family" ? children * 155 : 0; // CAD $155 per dependent child

  const total = pathway.fees.reduce((sum, fee) => sum + fee.amounts[familyType], 0) + childFee;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Canada Immigration Cost Calculator",
    url: "https://www.4acesvisa.com/immigration-cost-calculator",
    applicationCategory: "ImmigrationTool",
    description: "Free calculator to estimate total Canada immigration costs in CAD and INR for Express Entry, Study Permit, Work Permit, Super Visa, and Spousal Sponsorship.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does Express Entry cost in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "As of 2026, the Canadian government fees for a single Express Entry applicant are approximately CAD $1,565 (CAD $1,050 processing + CAD $515 Right of Permanent Residence). Adding biometrics ($85), medical exam (~$225), and consultant fees brings the realistic total to CAD $3,500–$4,500 for a single applicant.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a Canadian study permit cost in Indian rupees?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The government study permit fee is CAD $150 (approximately ₹9,150 at current rates). However, the total cost including the GIC deposit (CAD $10,200 — refundable), first-year tuition (~CAD $22,000), and living expenses makes the realistic first-year cost CAD $35,000–$45,000 (approximately ₹21–27 lakh).",
        },
      },
      {
        "@type": "Question",
        name: "Are Canadian immigration fees refundable?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most government processing fees are non-refundable if your application is rejected. The Right of Permanent Residence Fee (CAD $515) is refunded if your PR application is refused. The GIC deposit for study permits (CAD $10,000) is refundable. Biometric fees are non-refundable.",
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Canada Immigration Cost Calculator 2026 — CAD & INR | 4 Aces Visa</title>
        <meta
          name="description"
          content="Calculate total Canada immigration costs in CAD and INR for Express Entry PR, Study Permit, Work Permit, Super Visa, and Spousal Sponsorship. Updated government fees for 2026."
        />
        <link rel="canonical" href="https://www.4acesvisa.com/immigration-cost-calculator" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* ── HERO ── */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-3">
              Free Tool — Updated 2026 Fees
            </p>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
              Immigration Cost Calculator
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Estimate the total cost of your Canadian immigration application — government fees, medical exams, biometrics, and consultant fees — in CAD or INR.
            </p>
          </div>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Controls */}
            <div className="lg:col-span-1 space-y-6">
              {/* Pathway */}
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Immigration Pathway</label>
                <div className="space-y-2">
                  {pathways.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setActivePathway(p.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-colors ${
                        activePathway === p.id
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border bg-background text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      <span className="mr-2">{p.icon}</span> {p.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Family type */}
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Applicant Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["single", "couple", "family"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setFamilyType(type)}
                      className={`py-2 rounded-lg border-2 text-xs font-semibold capitalize transition-colors ${
                        familyType === type
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Children (family only) */}
              {familyType === "family" && (
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">
                    Dependent Children
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-9 h-9 rounded-lg border-2 border-border font-bold text-lg hover:border-primary transition-colors"
                    >
                      −
                    </button>
                    <span className="text-2xl font-bold text-foreground w-8 text-center">{children}</span>
                    <button
                      onClick={() => setChildren(children + 1)}
                      className="w-9 h-9 rounded-lg border-2 border-border font-bold text-lg hover:border-primary transition-colors"
                    >
                      +
                    </button>
                    <span className="text-xs text-muted-foreground">×CAD $155 each</span>
                  </div>
                </div>
              )}

              {/* Currency toggle */}
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Display Currency</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["CAD", "INR"] as const).map((cur) => (
                    <button
                      key={cur}
                      onClick={() => setCurrency(cur)}
                      className={`py-2 rounded-lg border-2 text-sm font-bold transition-colors ${
                        currency === cur
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      {cur === "CAD" ? "🇨🇦 CAD" : "🇮🇳 INR"}
                    </button>
                  ))}
                </div>
                {currency === "INR" && (
                  <p className="text-xs text-muted-foreground mt-1">Rate: 1 CAD ≈ ₹{INR_RATE} (approximate)</p>
                )}
              </div>
            </div>

            {/* Fee breakdown */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                {/* Header */}
                <div className="bg-primary text-primary-foreground px-6 py-4">
                  <h2 className="font-display font-bold text-lg">
                    {pathway.icon} {pathway.name} — Cost Breakdown
                  </h2>
                  <p className="text-primary-foreground/70 text-sm">{pathway.description}</p>
                </div>

                {/* Fee rows */}
                <div className="divide-y divide-border">
                  {pathway.fees.map((fee) => (
                    <div key={fee.label} className="px-6 py-3 flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-medium text-foreground">{fee.label}</div>
                        {fee.notes && <div className="text-xs text-muted-foreground mt-0.5">{fee.notes}</div>}
                      </div>
                      <div className="shrink-0 text-sm font-bold text-foreground tabular-nums">
                        {fmt(fee.amounts[familyType])}
                      </div>
                    </div>
                  ))}

                  {/* Children row */}
                  {familyType === "family" && children > 0 && (
                    <div className="px-6 py-3 flex items-start justify-between gap-4">
                      <div className="text-sm font-medium text-foreground">
                        Dependent children ({children} × CAD $155)
                      </div>
                      <div className="shrink-0 text-sm font-bold text-foreground tabular-nums">
                        {fmt(childFee)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="bg-primary/5 border-t-2 border-primary px-6 py-4 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-foreground text-base">Estimated Total</div>
                    <div className="text-xs text-muted-foreground">Includes government fees + estimated consultant fee</div>
                  </div>
                  <div className="text-2xl font-bold text-primary tabular-nums">{fmt(total)}</div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-3">
                ⚠️ This is an estimate only. Actual government fees change periodically — verify at{" "}
                <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/apply-permanent-residence/processing-fees.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  IRCC's fee page
                </a>
                . Consultant fees vary by case complexity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="font-display font-bold text-2xl text-foreground mb-6">Immigration Cost FAQs</h2>
          <div className="space-y-3">
            {[
              {
                q: "How much does Express Entry cost in 2026?",
                a: "Government fees: ~CAD $1,650 for a single applicant (processing + RPRF + biometrics). Adding medical exam (~$225) and consultant fees (~$1,500–$2,500), the realistic total is CAD $3,500–$4,500 for a single applicant.",
              },
              {
                q: "How much does a study permit cost in Indian rupees?",
                a: "Government fee: CAD $150 (≈₹9,150). The GIC deposit (CAD $10,200 — refundable) adds ≈₹6.2 lakh. First-year tuition + living expenses bring realistic first-year costs to CAD $35,000–$45,000 (≈₹21–27 lakh). Fees shown in INR are approximate at 1 CAD ≈ ₹61.",
              },
              {
                q: "Are Canadian immigration fees refundable if refused?",
                a: "Most processing fees are non-refundable. The Right of Permanent Residence Fee (CAD $515) is refunded on refusal. The Study Permit GIC deposit (CAD $10,000) is refundable. Biometric fees ($85) are non-refundable.",
              },
              {
                q: "Do I need to pay a consultant fee?",
                a: "You're not legally required to use a consultant. However, RCIC-licensed consultants significantly reduce the risk of document errors, refusals, and delays. The consultant fee is typically recovered many times over in time saved and avoided re-application costs.",
              },
            ].map(({ q, a }) => (
              <details key={q} className="group bg-card border border-border rounded-xl">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-foreground text-sm list-none">
                  {q}
                  <span className="ml-3 shrink-0 text-muted-foreground group-open:rotate-45 transition-transform duration-200 text-xl leading-none">+</span>
                </summary>
                <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-2xl sm:text-3xl mb-3">
            Know Your Budget — Now Start Your Application
          </h2>
          <p className="text-primary-foreground/80 mb-6">
            Our RCIC consultants work within your budget and timeline. Free initial assessment — no commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center bg-gold text-accent-foreground hover:bg-gold-dark font-bold px-8 py-4 rounded-lg transition-colors">
              Get Free Assessment
            </Link>
            <Link to="/crs-calculator" className="inline-flex items-center justify-center border-2 border-primary-foreground/30 hover:border-primary-foreground text-primary-foreground font-semibold px-8 py-4 rounded-lg transition-colors">
              Check Your CRS Score
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ImmigrationCostPage;
