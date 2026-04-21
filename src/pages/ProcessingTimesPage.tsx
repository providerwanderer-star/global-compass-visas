import { Helmet } from "react-helmet-async";
import { Clock, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { Link } from "react-router-dom";

interface ProcessingItem {
  name: string;
  time: string;
  trend: "faster" | "stable" | "slower";
  fee: string;
  notes?: string;
}

interface ProcessingCategory {
  category: string;
  items: ProcessingItem[];
}

const processingData: ProcessingCategory[] = [
  {
    category: "Express Entry / Permanent Residence",
    items: [
      { name: "Federal Skilled Worker (FSW)", time: "6 months", trend: "stable", fee: "CAD $1,505/person", notes: "From ITA to PR" },
      { name: "Canadian Experience Class (CEC)", time: "5–6 months", trend: "stable", fee: "CAD $1,505/person" },
      { name: "Federal Skilled Trades (FST)", time: "6 months", trend: "stable", fee: "CAD $1,505/person" },
      { name: "PNP (Enhanced via EE)", time: "6 months", trend: "stable", fee: "CAD $1,505/person + provincial fee" },
    ],
  },
  {
    category: "Provincial Nominee Program (Base)",
    items: [
      { name: "Ontario PNP (OINP)", time: "12–16 months", trend: "slower", fee: "No provincial fee", notes: "Provincial + IRCC stages" },
      { name: "BC PNP", time: "12–15 months", trend: "stable", fee: "CAD $1,150 (provincial)" },
      { name: "Alberta PNP (AINP)", time: "14–18 months", trend: "slower", fee: "No provincial fee" },
      { name: "Saskatchewan (SINP)", time: "10–14 months", trend: "stable", fee: "CAD $350 (provincial)" },
      { name: "Manitoba (MPNP)", time: "10–14 months", trend: "faster", fee: "No provincial fee" },
    ],
  },
  {
    category: "Work Permits",
    items: [
      { name: "LMIA-based Work Permit (Overseas)", time: "2–5 months", trend: "stable", fee: "CAD $155 + LMIA ~$1,000" },
      { name: "LMIA-Exempt Work Permit (CUSMA/IEC)", time: "1–3 months", trend: "faster", fee: "CAD $155 + $230 open work permit" },
      { name: "Post-Graduation Work Permit (PGWP)", time: "5–9 months", trend: "slower", fee: "CAD $255", notes: "Apply before study permit expires" },
      { name: "Spousal Open Work Permit", time: "5–8 months", trend: "stable", fee: "CAD $255" },
      { name: "Intra-Company Transfer (ICT)", time: "2–4 months", trend: "stable", fee: "CAD $155" },
    ],
  },
  {
    category: "Study Permits",
    items: [
      { name: "Study Permit — Online", time: "4–8 weeks", trend: "faster", fee: "CAD $150", notes: "Acceptance letter from DLI required" },
      { name: "Study Permit — At Port of Entry", time: "Same day", trend: "stable", fee: "CAD $150", notes: "Only if visa-exempt and letter of introduction" },
      { name: "Study Permit Extension (Inside Canada)", time: "3–5 months", trend: "stable", fee: "CAD $150" },
    ],
  },
  {
    category: "Family Sponsorship",
    items: [
      { name: "Spousal / Common-Law Sponsorship", time: "12 months", trend: "faster", fee: "CAD $1,080 total", notes: "Inside Canada faster than overseas" },
      { name: "Parent & Grandparent Sponsorship", time: "24–36 months", trend: "slower", fee: "CAD $1,080 total", notes: "Lottery system — not always open" },
      { name: "Child Sponsorship", time: "12 months", trend: "stable", fee: "CAD $155" },
    ],
  },
  {
    category: "Visitor Visas & ETAs",
    items: [
      { name: "Temporary Resident Visa (TRV)", time: "1–4 weeks", trend: "stable", fee: "CAD $100" },
      { name: "Super Visa (Parents)", time: "8 weeks", trend: "faster", fee: "CAD $100", notes: "Medical insurance required" },
      { name: "Electronic Travel Authorization (eTA)", time: "Minutes to 72 hrs", trend: "stable", fee: "CAD $7" },
    ],
  },
];

const TrendIcon = ({ trend }: { trend: "faster" | "stable" | "slower" }) => {
  if (trend === "faster") return <TrendingDown className="h-4 w-4 text-emerald-600" />;
  if (trend === "slower") return <TrendingUp className="h-4 w-4 text-red-500" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
};

const trendLabel = { faster: "Getting faster", stable: "Stable", slower: "Slower than usual" };
const trendColor = { faster: "text-emerald-700", stable: "text-muted-foreground", slower: "text-red-600" };

const ProcessingTimesPage = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Canada Immigration Processing Times 2026",
    url: "https://www.4acesvisa.com/processing-times",
    description: "Current Canada immigration processing times for Express Entry, PNP, work permits, study permits, and family sponsorship. Updated April 2026.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How long does Express Entry take in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "As of April 2026, Express Entry processing takes approximately 6 months from the date you receive an Invitation to Apply (ITA). IRCC's target is 80% of applications processed within 6 months. Time in the pool waiting for an ITA varies based on your CRS score.",
        },
      },
      {
        "@type": "Question",
        name: "How long does a Canadian work permit take to process?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Work permit processing varies: LMIA-based permits take 2–5 months; CUSMA/NAFTA and IEC permits take 1–3 months; Post-Graduation Work Permits (PGWP) currently take 5–9 months due to high volumes. Processing times change regularly — check IRCC's official tool for current estimates.",
        },
      },
      {
        "@type": "Question",
        name: "What causes immigration processing delays in Canada?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Common causes of delays include incomplete applications or missing documents, biometrics not submitted, medical exam issues, additional background checks, high application volumes, and requests for additional information (procedural fairness letters). Submitting a complete application and responding quickly to IRCC requests minimizes delays.",
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Canada Immigration Processing Times 2026 — Work Permit, PR, Study | 4 Aces Visa</title>
        <meta
          name="description"
          content="Current Canada immigration processing times for Express Entry (6 months), work permits (1–5 months), study permits (4–8 weeks), PNP (10–18 months), and family sponsorship. Updated April 2026."
        />
        <link rel="canonical" href="https://www.4acesvisa.com/processing-times" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* ── HERO ── */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-3">
              Updated April 2026
            </p>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
              Canada Immigration Processing Times
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              As of April 2026, Express Entry PR takes <strong className="text-gold">~6 months</strong>, work permits take <strong className="text-gold">1–5 months</strong>, and study permits take <strong className="text-gold">4–8 weeks</strong>. Check current estimates for your application type below.
            </p>
          </div>
        </div>
      </section>

      {/* ── QUICK REFERENCE CARDS ── */}
      <section className="py-8 section-soft border-b border-border">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Express Entry PR", time: "~6 months", icon: "🇨🇦", color: "border-blue-200 bg-blue-50" },
              { label: "Work Permit", time: "1–5 months", icon: "💼", color: "border-orange-200 bg-orange-50" },
              { label: "Study Permit", time: "4–8 weeks", icon: "🎓", color: "border-emerald-200 bg-emerald-50" },
              { label: "Spouse Sponsorship", time: "~12 months", icon: "❤️", color: "border-pink-200 bg-pink-50" },
            ].map(({ label, time, icon, color }) => (
              <div key={label} className={`rounded-xl border p-4 text-center ${color}`}>
                <div className="text-2xl mb-1">{icon}</div>
                <div className="font-bold text-foreground text-lg">{time}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESSING TABLE ── */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {processingData.map(({ category, items }) => (
              <div key={category}>
                <h2 className="font-display font-bold text-xl text-foreground mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  {category}
                </h2>
                <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/60">
                      <tr>
                        <th className="text-left px-4 py-3 font-semibold text-foreground">Application Type</th>
                        <th className="text-left px-4 py-3 font-semibold text-foreground">Processing Time</th>
                        <th className="text-left px-4 py-3 font-semibold text-foreground hidden sm:table-cell">Trend</th>
                        <th className="text-left px-4 py-3 font-semibold text-foreground hidden md:table-cell">Gov't Fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, i) => (
                        <tr key={item.name} className={`border-t border-border ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                          <td className="px-4 py-3">
                            <div className="font-medium text-foreground">{item.name}</div>
                            {item.notes && <div className="text-xs text-muted-foreground mt-0.5">{item.notes}</div>}
                          </td>
                          <td className="px-4 py-3 font-bold text-primary">{item.time}</td>
                          <td className="px-4 py-3 hidden sm:table-cell">
                            <span className={`flex items-center gap-1 text-xs font-semibold ${trendColor[item.trend]}`}>
                              <TrendIcon trend={item.trend} />
                              {trendLabel[item.trend]}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{item.fee}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            Source: IRCC processing time tool and official government announcements. Times are estimates — check{" "}
            <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              IRCC's official tool
            </a>{" "}
            for your specific application.
          </p>
        </div>
      </section>

      {/* ── WHAT SLOWS THINGS DOWN ── */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">What Causes Processing Delays?</h2>
          <p className="text-muted-foreground mb-6">Most delays are avoidable. Here's what triggers them:</p>
          <div className="space-y-3">
            {[
              { cause: "Incomplete application", fix: "Use the official document checklist and double-check every field before submitting." },
              { cause: "Biometrics not submitted", fix: "Book biometrics immediately after receiving your request letter — you have 30 days." },
              { cause: "Medical exam not completed", fix: "Get your medical exam from a designated panel physician as soon as you apply." },
              { cause: "Missing translations", fix: "All non-English/French documents must have certified translations with the translator's credentials." },
              { cause: "Procedural Fairness Letter (PFL)", fix: "Respond within the deadline (usually 30 days) with a detailed written response and supporting documents." },
              { cause: "Background / security checks", fix: "Disclose all international travel, prior visa refusals, and work history accurately." },
            ].map(({ cause, fix }) => (
              <div key={cause} className="bg-card rounded-xl border border-border p-4">
                <div className="font-semibold text-foreground text-sm mb-1">⚠️ {cause}</div>
                <div className="text-sm text-muted-foreground">✅ {fix}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="font-display font-bold text-2xl text-foreground mb-6">Processing Time FAQs</h2>
          <div className="space-y-3">
            {[
              {
                q: "How long does Express Entry take in 2026?",
                a: "As of April 2026, Express Entry processing takes approximately 6 months from receiving an Invitation to Apply (ITA). IRCC's goal is processing 80% of applications within 6 months. Time in the pool waiting for an ITA varies based on your CRS score and draw frequency.",
              },
              {
                q: "How long does a Canadian work permit take?",
                a: "LMIA-based permits: 2–5 months. CUSMA/IEC exempt: 1–3 months. PGWP: 5–9 months (currently slower due to high volumes). Online applications are generally faster than paper.",
              },
              {
                q: "What causes immigration processing delays?",
                a: "Common causes: incomplete documents, biometrics not submitted, failed medical exam, missing certified translations, background checks, and Procedural Fairness Letters (PFLs). Submitting a complete, accurate application minimizes delays significantly.",
              },
              {
                q: "Can I track my immigration application status?",
                a: "Yes. Use IRCC's online portal (My Application) or IRCC Web Form to track your application. You can also check your application status via the IRCC website using your application number. Hiring an authorized representative (RCIC) allows them to track and communicate with IRCC on your behalf.",
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
            Want to Avoid Delays? Work With an RCIC.
          </h2>
          <p className="text-primary-foreground/80 mb-6">
            Our licensed consultants review every document before submission, respond to IRCC requests quickly, and keep your application on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center bg-gold text-accent-foreground hover:bg-gold-dark font-bold px-8 py-4 rounded-lg transition-colors">
              Get Free Assessment
            </Link>
            <Link to="/immigration-cost-calculator" className="inline-flex items-center justify-center border-2 border-primary-foreground/30 hover:border-primary-foreground text-primary-foreground font-semibold px-8 py-4 rounded-lg transition-colors">
              Estimate Your Costs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProcessingTimesPage;
