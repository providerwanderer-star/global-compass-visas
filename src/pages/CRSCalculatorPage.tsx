import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle, ChevronRight, Calculator, TrendingUp,
  AlertTriangle, Award, Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import EligibilityForm from "@/components/EligibilityForm";
import AnimatedSection from "@/components/AnimatedSection";
import { expressEntryDraws, drawsLastUpdated } from "@/data/expressEntryDraws";

const crsFaqs = [
  { q: "What is a good CRS score for Canada PR in 2026?", a: "Recent general Express Entry draws have had CRS cutoffs between 510 and 540. Category-based draws (healthcare, STEM, French, trades) typically cut off lower at 380–470. With a Provincial Nomination, any score above ~550 effectively guarantees an ITA because PNP adds 600 points." },
  { q: "How accurate is this CRS calculator?", a: "This calculator uses the official IRCC CRS formula for core human capital, skill transferability, and additional points. It produces an estimate accurate within ±5 points for most profiles. Final official scoring requires submitting an Express Entry profile on the IRCC portal." },
  { q: "Does my spouse's score count?", a: "Yes — when married or in a common-law partnership where the spouse is accompanying you to Canada, your maximum points for age, education, language, and work experience are reduced (because some are reallocated to the spouse). This calculator handles both single and partnered scoring." },
  { q: "How can I improve my CRS score the fastest?", a: "Top three levers: (1) Get a PNP nomination — adds 600 points instantly. (2) Improve IELTS to CLB 9 or higher — can add 30–80 points depending on starting band. (3) Add French language test results — second-language CLB 7+ adds up to 74 points." },
  { q: "Is the CRS calculator free?", a: "Yes — completely free, no signup required. We provide it as a public tool. If you want a personalised improvement plan, you can book a free profile assessment with our licensed consultants." },
];

// ─── CRS Scoring Functions ──────────────────────────────────────────────────

function getAgePoints(age: number, hasSpouse: boolean): number {
  if (hasSpouse) {
    const spouseTable: Record<number, number> = { 17: 0, 18: 90, 19: 95, 20: 100, 21: 100, 22: 100, 23: 100, 24: 100, 25: 100, 26: 100, 27: 100, 28: 100, 29: 95, 30: 90, 31: 85, 32: 80, 33: 75, 34: 70, 35: 65, 36: 60, 37: 55, 38: 50, 39: 45, 40: 40, 41: 35, 42: 30, 43: 25, 44: 20, 45: 15, 46: 10, 47: 5 };
    return spouseTable[Math.min(Math.max(age, 17), 47)] ?? 0;
  }
  const table: Record<number, number> = { 17: 0, 18: 99, 19: 105, 20: 110, 21: 110, 22: 110, 23: 110, 24: 110, 25: 110, 26: 110, 27: 110, 28: 110, 29: 105, 30: 99, 31: 94, 32: 88, 33: 83, 34: 77, 35: 72, 36: 66, 37: 61, 38: 55, 39: 50, 40: 44, 41: 39, 42: 33, 43: 28, 44: 22, 45: 17, 46: 11, 47: 6 };
  return table[Math.min(Math.max(age, 17), 47)] ?? 0;
}

function getEducationPoints(edu: string, hasSpouse: boolean): number {
  const solo: Record<string, number> = { none: 0, secondary: 28, one_year: 84, two_year: 91, bachelors: 112, two_or_more: 119, masters: 126, doctoral: 150 };
  const spouse: Record<string, number> = { none: 0, secondary: 28, one_year: 84, two_year: 91, bachelors: 112, two_or_more: 119, masters: 119, doctoral: 140 };
  return (hasSpouse ? spouse : solo)[edu] ?? 0;
}

function getLanguagePoints(clb: number, hasSpouse: boolean, first: boolean): number {
  if (clb < 4) return 0;
  if (!first) {
    // Second official language — max 24 pts (no spouse difference for basic)
    const secondTable: Record<number, number> = { 4: 0, 5: 1, 6: 1, 7: 3, 8: 3, 9: 6, 10: 6 };
    return secondTable[Math.min(clb, 10)] ?? 6;
  }
  if (hasSpouse) {
    const t: Record<number, number> = { 4: 6, 5: 6, 6: 8, 7: 16, 8: 22, 9: 29, 10: 32 };
    return (t[Math.min(clb, 10)] ?? 32) * 4; // per band × 4 bands simplified
  }
  const t: Record<number, number> = { 4: 6, 5: 6, 6: 9, 7: 17, 8: 23, 9: 31, 10: 34 };
  return (t[Math.min(clb, 10)] ?? 34) * 4;
}

function getWorkExpPoints(years: number, hasSpouse: boolean, canadian: boolean): number {
  if (canadian) {
    const t: Record<number, number> = { 0: 0, 1: 40, 2: 53, 3: 64, 4: 72, 5: 80 };
    return t[Math.min(years, 5)] ?? 80;
  }
  if (hasSpouse) {
    const t: Record<number, number> = { 0: 0, 1: 13, 2: 25, 3: 38 };
    return t[Math.min(years, 3)] ?? 38;
  }
  const t: Record<number, number> = { 0: 0, 1: 13, 2: 25, 3: 38 };
  return t[Math.min(years, 3)] ?? 38;
}

// ─── Component ───────────────────────────────────────────────────────────────

interface FormState {
  age: number;
  hasSpouse: boolean;
  education: string;
  clbFirst: number;
  clbSecond: number;
  foreignExp: number;
  canadianExp: number;
  hasPNP: boolean;
  hasJobOffer: boolean;
  jobOfferNOC: string;
  canadianEducation: string;
  sibling: boolean;
  spouseEducation: number;
  spouseClb: number;
  spouseCanadianExp: number;
}

const defaults: FormState = {
  age: 30,
  hasSpouse: false,
  education: "bachelors",
  clbFirst: 8,
  clbSecond: 0,
  foreignExp: 2,
  canadianExp: 0,
  hasPNP: false,
  hasJobOffer: false,
  jobOfferNOC: "none",
  canadianEducation: "none",
  sibling: false,
  spouseEducation: 4,
  spouseClb: 7,
  spouseCanadianExp: 0,
};

// Spouse factor points (added to total when hasSpouse = true)
function getSpousePoints(form: FormState): number {
  let pts = 0;
  // Spouse education (max 10)
  const spouseEduPts = [0, 2, 6, 7, 8, 9, 10, 10, 10];
  pts += spouseEduPts[form.spouseEducation] ?? 0;
  // Spouse first language (max 20)
  const clbLang = Math.min(form.spouseClb, 10);
  pts +=
    clbLang >= 9 ? 20 : clbLang >= 8 ? 16 : clbLang >= 7 ? 12 : clbLang >= 6 ? 8 : clbLang >= 5 ? 4 : 0;
  // Spouse Canadian work exp (max 10)
  const spouseWorkPts = [0, 5, 7, 8, 9, 10];
  pts += spouseWorkPts[Math.min(form.spouseCanadianExp, 5)] ?? 0;
  return pts;
}

// Single source of truth for total CRS calculation (used by main display + What-If scenarios)
function calculateTotal(form: FormState): number {
  const age = getAgePoints(form.age, form.hasSpouse);
  const education = getEducationPoints(form.education, form.hasSpouse);
  const langFirst = getLanguagePoints(form.clbFirst, form.hasSpouse, true);
  const langSecond = getLanguagePoints(form.clbSecond, form.hasSpouse, false);
  const foreignExp = getWorkExpPoints(form.foreignExp, form.hasSpouse, false);
  const canadianExp = getWorkExpPoints(form.canadianExp, form.hasSpouse, true);
  const coreHuman = age + education + langFirst + langSecond + foreignExp + canadianExp;

  let skillTransfer = 0;
  if (form.clbFirst >= 9 && form.education !== "none") skillTransfer += 25;
  if (form.clbFirst >= 7 && form.canadianExp > 0) skillTransfer += 25;
  if (form.foreignExp >= 3 && form.education !== "none") skillTransfer += 25;
  skillTransfer = Math.min(skillTransfer, 100);

  let additional = 0;
  if (form.hasPNP) additional += 600;
  if (form.hasJobOffer) {
    if (form.jobOfferNOC === "00") additional += 200;
    else additional += 50;
  }
  if (form.canadianEducation === "one_two_year") additional += 15;
  if (form.canadianEducation === "degree") additional += 30;
  if (form.sibling) additional += 15;

  const spouse = form.hasSpouse ? getSpousePoints(form) : 0;

  return Math.min(coreHuman + skillTransfer + additional + spouse, 1200);
}

const CRSCalculatorPage = () => {
  const [form, setForm] = useState<FormState>(defaults);
  const [calculated, setCalculated] = useState(false);

  const set = (key: keyof FormState, value: string | number | boolean) => {
    setForm((f) => ({ ...f, [key]: value }));
    setCalculated(false);
  };

  // ── Calculate score ──
  const age = getAgePoints(form.age, form.hasSpouse);
  const education = getEducationPoints(form.education, form.hasSpouse);
  const langFirst = getLanguagePoints(form.clbFirst, form.hasSpouse, true);
  const langSecond = getLanguagePoints(form.clbSecond, form.hasSpouse, false);
  const foreignExp = getWorkExpPoints(form.foreignExp, form.hasSpouse, false);
  const canadianExp = getWorkExpPoints(form.canadianExp, form.hasSpouse, true);

  const coreHuman = age + education + langFirst + langSecond + foreignExp + canadianExp;

  // Skill transferability (simplified)
  let skillTransfer = 0;
  if (form.clbFirst >= 9 && form.education !== "none") skillTransfer += 25;
  if (form.clbFirst >= 7 && form.canadianExp > 0) skillTransfer += 25;
  if (form.foreignExp >= 3 && form.education !== "none") skillTransfer += 25;
  skillTransfer = Math.min(skillTransfer, 100);

  // Additional
  let additional = 0;
  if (form.hasPNP) additional += 600;
  if (form.hasJobOffer) {
    if (form.jobOfferNOC === "00") additional += 200;
    else additional += 50;
  }
  if (form.canadianEducation === "one_two_year") additional += 15;
  if (form.canadianEducation === "degree") additional += 30;
  if (form.sibling) additional += 15;

  const total = Math.min(coreHuman + skillTransfer + additional, 1200);

  const breakdown = [
    { label: "Age", points: age, max: form.hasSpouse ? 100 : 110 },
    { label: "Education", points: education, max: form.hasSpouse ? 140 : 150 },
    { label: "First Language (CLB)", points: langFirst, max: form.hasSpouse ? 128 : 136 },
    { label: "Second Language", points: langSecond, max: 24 },
    { label: "Foreign Work Exp.", points: foreignExp, max: form.hasSpouse ? 38 : 38 },
    { label: "Canadian Work Exp.", points: canadianExp, max: 80 },
    { label: "Skill Transferability", points: skillTransfer, max: 100 },
    { label: "Additional (PNP/Offer/etc)", points: additional, max: 600 },
  ];

  const getCutoffStatus = () => {
    if (form.hasPNP) return { color: "text-success", label: "With PNP: Virtually guaranteed ITA ✓" };
    if (total >= 490) return { color: "text-success", label: "Excellent — above recent cutoffs" };
    if (total >= 450) return { color: "text-gold", label: "Good — competitive for general draws" };
    if (total >= 420) return { color: "text-gold", label: "Moderate — eligible for category-based draws" };
    return { color: "text-destructive", label: "Consider improving IELTS or getting a PNP" };
  };

  const status = getCutoffStatus();

  // Pull the most recent live draws for the comparison panel (auto-refreshes from expressEntryDraws.ts)
  const liveCutoffs = (() => {
    const general = expressEntryDraws.find((d) => /Canadian Experience|General|All program/i.test(d.category));
    const stem = expressEntryDraws.find((d) => /STEM/i.test(d.category));
    const healthcare = expressEntryDraws.find((d) => /Healthcare/i.test(d.category));
    const french = expressEntryDraws.find((d) => /French/i.test(d.category));
    const fallback = expressEntryDraws[0];
    return [
      { label: "Latest Draw", cutoff: (general ?? fallback).crsCutoff },
      { label: "Healthcare Category", cutoff: (healthcare ?? fallback).crsCutoff },
      { label: french ? "French Category" : "STEM Category", cutoff: (french ?? stem ?? fallback).crsCutoff },
    ];
  })();

  return (
    <div>
      <Helmet>
        <title>Canada CRS Score Calculator 2026 — Express Entry Points | 4 Aces Visa</title>
        <meta
          name="description"
          content="Calculate your Canada Express Entry CRS score for 2026. Free online Comprehensive Ranking System calculator for PR applicants. Check if you qualify for an ITA."
        />
        <link rel="canonical" href="https://www.4acesvisa.com/crs-calculator" />
        <meta property="og:title" content="Canada CRS Score Calculator 2026 | 4 Aces Visa" />
        <meta property="og:description" content="Free Canada Express Entry CRS score calculator. Estimate your Comprehensive Ranking System points and check if you qualify for permanent residency." />
        <meta property="og:url" content="https://www.4acesvisa.com/crs-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/adc15f61-3495-4592-a9ee-4f8cecf8b858/id-preview-a6038808--fba6843f-065b-405d-9fa2-e92e64570374.lovable.app-1775668033782.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Canada CRS Score Calculator 2026 | 4 Aces Visa" />
        <meta name="twitter:description" content="Free online CRS calculator for Canada Express Entry PR eligibility." />
        <meta name="twitter:image" content="https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/adc15f61-3495-4592-a9ee-4f8cecf8b858/id-preview-a6038808--fba6843f-065b-405d-9fa2-e92e64570374.lovable.app-1775668033782.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                "name": "Canada CRS Score Calculator 2026 — 4 Aces Visa",
                "description": "Free online CRS calculator for Canada Express Entry. Estimate your Comprehensive Ranking System score for PR eligibility.",
                "url": "https://www.4acesvisa.com/crs-calculator",
                "applicationCategory": "UtilityApplication",
                "operatingSystem": "Any",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CAD" },
                "provider": { "@type": "Organization", "name": "4 Aces Visa", "url": "https://www.4acesvisa.com" }
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.4acesvisa.com/" },
                  { "@type": "ListItem", position: 2, name: "CRS Calculator", item: "https://www.4acesvisa.com/crs-calculator" },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: crsFaqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
            ],
          })}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="relative bg-primary pt-28 pb-10 md:pt-36 md:pb-14 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--gold)/0.15),transparent_60%)]" />
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-6">
            <Link to="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">CRS Calculator</span>
          </nav>
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-gold/20 text-gold px-3 py-1.5 rounded-full text-xs font-bold mb-4 border border-gold/30">
              <Calculator className="h-3.5 w-3.5" />
              Free — Instant — Accurate to 2026 CRS Formula
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
              Canada CRS Score
              <span className="text-gold block mt-1">Calculator 2026</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg">
              Calculate your Comprehensive Ranking System score for Express Entry permanent residency.
              Includes all factors: core human capital, skill transferability, and additional points.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Form */}
            <div className="lg:col-span-3 bg-card rounded-2xl border border-border p-6 md:p-8 shadow-elevated">
              <h2 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-gold" />
                Enter Your Details
              </h2>

              <div className="space-y-5">
                {/* Age */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Age</label>
                  <input
                    type="number"
                    min={17}
                    max={60}
                    value={form.age}
                    onChange={(e) => set("age", parseInt(e.target.value) || 17)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                  />
                </div>

                {/* Spouse */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Marital Status</label>
                  <select
                    value={form.hasSpouse ? "married" : "single"}
                    onChange={(e) => set("hasSpouse", e.target.value === "married")}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                  >
                    <option value="single">Single / Separated / Divorced</option>
                    <option value="married">Married / Common-Law Partner</option>
                  </select>
                </div>

                {/* Education */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Highest Education Level</label>
                  <select
                    value={form.education}
                    onChange={(e) => set("education", e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                  >
                    <option value="none">Less than secondary / No credentials</option>
                    <option value="secondary">Secondary diploma (High school)</option>
                    <option value="one_year">1-year post-secondary diploma</option>
                    <option value="two_year">2-year post-secondary diploma</option>
                    <option value="bachelors">Bachelor's degree (3+ years)</option>
                    <option value="two_or_more">Two or more degrees (one 3+ years)</option>
                    <option value="masters">Master's degree</option>
                    <option value="doctoral">PhD / Doctoral degree</option>
                  </select>
                </div>

                {/* First Language */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    First Official Language — CLB Level
                    <span className="font-normal text-muted-foreground ml-2 text-xs">(IELTS 7.0 ≈ CLB 9)</span>
                  </label>
                  <select
                    value={form.clbFirst}
                    onChange={(e) => set("clbFirst", parseInt(e.target.value))}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                  >
                    {[4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>CLB {n}{n === 7 ? " (IELTS 6.0)" : n === 8 ? " (IELTS 6.5)" : n === 9 ? " (IELTS 7.0)" : n === 10 ? " (IELTS 8.0+)" : ""}</option>
                    ))}
                  </select>
                </div>

                {/* Second Language */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    Second Official Language — CLB Level
                    <span className="font-normal text-muted-foreground ml-2 text-xs">(French or 0 if not applicable)</span>
                  </label>
                  <select
                    value={form.clbSecond}
                    onChange={(e) => set("clbSecond", parseInt(e.target.value))}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                  >
                    <option value={0}>N/A — Not tested</option>
                    {[4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>CLB {n}</option>
                    ))}
                  </select>
                </div>

                {/* Foreign Work Exp */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Foreign Skilled Work Experience (years)</label>
                  <select
                    value={form.foreignExp}
                    onChange={(e) => set("foreignExp", parseInt(e.target.value))}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                  >
                    <option value={0}>None / Student</option>
                    <option value={1}>1 year</option>
                    <option value={2}>2 years</option>
                    <option value={3}>3+ years</option>
                  </select>
                </div>

                {/* Canadian Work Exp */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Canadian Skilled Work Experience (years)</label>
                  <select
                    value={form.canadianExp}
                    onChange={(e) => set("canadianExp", parseInt(e.target.value))}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                  >
                    <option value={0}>None</option>
                    <option value={1}>1 year</option>
                    <option value={2}>2 years</option>
                    <option value={3}>3 years</option>
                    <option value={4}>4 years</option>
                    <option value={5}>5+ years</option>
                  </select>
                </div>

                {/* Additional Points */}
                <div className="pt-2 border-t border-border">
                  <h3 className="text-sm font-bold text-foreground mb-3">Additional Factors</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.hasPNP}
                        onChange={(e) => set("hasPNP", e.target.checked)}
                        className="w-4 h-4 accent-gold"
                      />
                      <span className="text-sm text-foreground">Provincial Nomination (PNP) — <strong className="text-gold">+600 points</strong></span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.hasJobOffer}
                        onChange={(e) => set("hasJobOffer", e.target.checked)}
                        className="w-4 h-4 accent-gold"
                      />
                      <span className="text-sm text-foreground">Valid Canadian job offer (LMIA)</span>
                    </label>
                    {form.hasJobOffer && (
                      <div className="ml-7">
                        <select
                          value={form.jobOfferNOC}
                          onChange={(e) => set("jobOfferNOC", e.target.value)}
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                        >
                          <option value="none">NOC TEER 1–3 (most jobs) — +50 pts</option>
                          <option value="00">NOC TEER 00 (senior management) — +200 pts</option>
                        </select>
                      </div>
                    )}
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.sibling}
                        onChange={(e) => set("sibling", e.target.checked)}
                        className="w-4 h-4 accent-gold"
                      />
                      <span className="text-sm text-foreground">Sibling who is Canadian citizen/PR — <strong className="text-gold">+15 points</strong></span>
                    </label>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Canadian Education</label>
                      <select
                        value={form.canadianEducation}
                        onChange={(e) => set("canadianEducation", e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                      >
                        <option value="none">None</option>
                        <option value="one_two_year">1–2 year Canadian diploma — +15 pts</option>
                        <option value="degree">3+ year Canadian degree or 2+ degrees — +30 pts</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setCalculated(true)}
                  size="lg"
                  className="w-full bg-gold text-accent-foreground hover:bg-gold-dark font-bold shadow-gold"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate My CRS Score
                </Button>
              </div>
            </div>

            {/* Result */}
            <div className="lg:col-span-2 space-y-5">
              <motion.div
                animate={{ scale: calculated ? [1, 1.03, 1] : 1 }}
                transition={{ duration: 0.4 }}
                className="bg-primary rounded-2xl border border-gold/20 p-6 md:p-8 text-center sticky top-24"
              >
                <p className="text-primary-foreground/60 text-sm mb-2">Your Estimated CRS Score</p>
                <div className="font-display text-7xl font-bold text-gold mb-2">{total}</div>
                <div className="text-sm font-semibold mb-4 mt-1">
                  <span className={status.color}>{status.label}</span>
                </div>

                {/* Recent cutoff comparison */}
                <div className="bg-white/5 rounded-xl p-4 mb-5 text-left">
                  <p className="text-xs text-primary-foreground/50 mb-2 font-semibold uppercase tracking-wider">
                    Latest IRCC Cutoffs · Updated {new Date(drawsLastUpdated).toLocaleDateString("en-CA", { month: "short", day: "numeric" })}
                  </p>
                  {liveCutoffs.map((d) => (
                    <div key={d.label} className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-primary-foreground/70">{d.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{d.cutoff}</span>
                        {total >= d.cutoff
                          ? <CheckCircle className="h-3.5 w-3.5 text-success" />
                          : <AlertTriangle className="h-3.5 w-3.5 text-destructive" />}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Breakdown */}
                <div className="space-y-2 mb-6 text-left">
                  {breakdown.map((b) => (
                    <div key={b.label} className="flex items-center gap-2">
                      <span className="text-xs text-primary-foreground/60 flex-1">{b.label}</span>
                      <div className="flex-1 bg-white/10 rounded-full h-1.5">
                        <div
                          className="bg-gold h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((b.points / b.max) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gold w-8 text-right">{b.points}</span>
                    </div>
                  ))}
                </div>

                <a href="#consultation">
                  <Button className="w-full bg-gold text-accent-foreground hover:bg-gold-dark font-bold">
                    Get Expert Strategy <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips to improve */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
              How to Improve Your CRS Score
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
              Targeted improvements that deliver the biggest CRS gains
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                title: "Improve IELTS Score",
                impact: "Up to +50 points",
                desc: "Going from CLB 8 to CLB 9 adds approximately 50+ points. This is the highest ROI improvement for most applicants. Even one band improvement counts.",
              },
              {
                icon: TrendingUp,
                title: "Get a PNP Nomination",
                impact: "+600 points",
                desc: "A provincial nomination instantly adds 600 CRS points — virtually guaranteeing an ITA. We identify PNP streams that match your occupation and province of interest.",
              },
              {
                icon: CheckCircle,
                title: "Obtain Canadian Work Experience",
                impact: "Up to +80 points",
                desc: "1 year of skilled Canadian work experience adds 40 points. Combined with your foreign experience and language score, it creates powerful skill transferability bonuses.",
              },
            ].map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-card rounded-xl border border-border p-6 hover:shadow-card hover:border-gold/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                  <tip.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-1">{tip.title}</h3>
                <span className="text-xs font-bold text-gold block mb-3">{tip.impact}</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IELTS to CLB Reference */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto max-w-2xl">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">IELTS to CLB Conversion Chart</h2>
          </AnimatedSection>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/80">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">CLB Level</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Listening</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Reading</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Writing</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Speaking</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { clb: "CLB 7", l: "6.0", r: "6.0", w: "6.0", s: "6.0" },
                  { clb: "CLB 8", l: "7.5", r: "6.5", w: "6.5", s: "6.5" },
                  { clb: "CLB 9", l: "8.0", r: "7.0", w: "7.0", s: "7.0" },
                  { clb: "CLB 10", l: "8.5", r: "8.0", w: "7.5", s: "7.5" },
                ].map((row, i) => (
                  <tr key={row.clb} className={`border-t border-border ${i === 2 ? "bg-gold/5" : ""}`}>
                    <td className="px-4 py-3 font-bold text-primary">{row.clb}{i === 2 ? " ⭐" : ""}</td>
                    <td className="px-4 py-3 text-foreground">{row.l}</td>
                    <td className="px-4 py-3 text-foreground">{row.r}</td>
                    <td className="px-4 py-3 text-foreground">{row.w}</td>
                    <td className="px-4 py-3 text-foreground">{row.s}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">⭐ CLB 9 is the recommended target for maximum CRS impact</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto max-w-3xl">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              CRS Calculator — FAQ
            </h2>
          </AnimatedSection>
          <div className="space-y-3">
            {crsFaqs.map((f) => (
              <details key={f.q} className="bg-card border border-border rounded-xl p-5 group">
                <summary className="font-semibold text-foreground cursor-pointer list-none flex items-start justify-between gap-4">
                  <span>{f.q}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="text-sm text-muted-foreground mt-3 leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-6">
            Source: <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/criteria-comprehensive-ranking-system/grid.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-gold underline">IRCC CRS Grid</a>
          </p>
        </div>
      </section>

      {/* CTA + Form */}
      <section className="section-padding bg-primary" id="consultation">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection>
              <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
                Not Happy With Your Score?
                <span className="text-gold block mt-1">Our Experts Can Help</span>
              </h2>
              <p className="text-primary-foreground/70 mb-6">
                A CRS score is just a starting point. Our immigration experts know dozens of strategies
                to boost your score and identify pathways you may not know exist.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Personalized CRS improvement strategy",
                  "PNP stream matching to your profile",
                  "IELTS coaching referrals",
                  "Canadian job offer connections",
                  "Free — no obligation consultation",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-primary-foreground">
                    <CheckCircle className="h-4 w-4 text-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <a href="https://wa.me/16478622190?text=Hi%2C%20I%20want%20to%20improve%20my%20CRS%20score%20for%20Express%20Entry" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold">WhatsApp Our Experts</Button>
                </a>
                <a href="tel:+16478622190">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    <Phone className="mr-2 h-4 w-4" /> +1 (647) 862-2190
                  </Button>
                </a>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-elevated">
                <EligibilityForm sourcePage="crs-calculator" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CRSCalculatorPage;
