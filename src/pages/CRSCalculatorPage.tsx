import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle, ChevronRight, Calculator, TrendingUp,
  AlertTriangle, Award, Phone, Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import EligibilityForm from "@/components/EligibilityForm";
import AnimatedSection from "@/components/AnimatedSection";
import PathwayWidget from "@/components/PathwayWidget";
import ConnectedFooter from "@/components/ConnectedFooter";
import ReturnLoopCard from "@/components/ReturnLoopCard";
import { useUserProfile } from "@/hooks/useUserProfile";
import { expressEntryDraws, latestCoreDraw } from "@/data/expressEntryDraws";
import { trackEvent } from "@/lib/analytics";

/* ════════════════════════════════════════════════════════════════════════════
   IRCC CRS Scoring — implements the official Comprehensive Ranking System
   formula as published on canada.ca (Express Entry → Check your score).
   Source: https://www.canada.ca/en/immigration-refugees-citizenship/services/
           immigrate-canada/express-entry/eligibility/criteria-comprehensive-
           ranking-system/grid.html
   ══════════════════════════════════════════════════════════════════════════ */

// ─── A. Core / Human Capital ────────────────────────────────────────────────

function agePoints(age: number, withSpouse: boolean): number {
  // IRCC age table — capped 17 to 45+
  const a = Math.max(17, Math.min(age, 45));
  if (withSpouse) {
    const t: Record<number, number> = {
      17: 0, 18: 90, 19: 95,
      20: 100, 21: 100, 22: 100, 23: 100, 24: 100, 25: 100, 26: 100, 27: 100, 28: 100, 29: 100,
      30: 95, 31: 90, 32: 85, 33: 80, 34: 75,
      35: 70, 36: 65, 37: 60, 38: 55, 39: 50,
      40: 45, 41: 35, 42: 25, 43: 15, 44: 5, 45: 0,
    };
    return t[a] ?? 0;
  }
  const t: Record<number, number> = {
    17: 0, 18: 99, 19: 105,
    20: 110, 21: 110, 22: 110, 23: 110, 24: 110, 25: 110, 26: 110, 27: 110, 28: 110, 29: 110,
    30: 105, 31: 99, 32: 94, 33: 88, 34: 83,
    35: 77, 36: 72, 37: 66, 38: 61, 39: 55,
    40: 50, 41: 39, 42: 28, 43: 17, 44: 6, 45: 0,
  };
  return t[a] ?? 0;
}

const EDU_KEYS = [
  "none", "secondary", "one_year", "two_year",
  "bachelors", "two_or_more", "masters", "doctoral",
] as const;
type EduKey = typeof EDU_KEYS[number];

const EDU_LABEL: Record<EduKey, string> = {
  none: "Less than secondary (high school)",
  secondary: "Secondary diploma (high school)",
  one_year: "One-year post-secondary credential",
  two_year: "Two-year post-secondary credential",
  bachelors: "Bachelor's degree (3+ years)",
  two_or_more: "Two or more credentials (one 3+ years)",
  masters: "Master's degree or professional degree",
  doctoral: "PhD / Doctoral degree",
};

function educationPoints(edu: EduKey, withSpouse: boolean): number {
  const solo: Record<EduKey, number> = {
    none: 0, secondary: 30, one_year: 90, two_year: 98,
    bachelors: 120, two_or_more: 128, masters: 135, doctoral: 150,
  };
  const spouse: Record<EduKey, number> = {
    none: 0, secondary: 28, one_year: 84, two_year: 91,
    bachelors: 112, two_or_more: 119, masters: 126, doctoral: 140,
  };
  return (withSpouse ? spouse : solo)[edu];
}

// Per-skill CLB — official "first official language" table (per ability)
function firstLangPointsPerAbility(clb: number, withSpouse: boolean): number {
  if (clb < 4) return 0;
  const c = Math.min(clb, 10);
  if (withSpouse) {
    const t: Record<number, number> = { 4: 6, 5: 6, 6: 8, 7: 16, 8: 22, 9: 29, 10: 32 };
    return t[c] ?? 32;
  }
  const t: Record<number, number> = { 4: 6, 5: 6, 6: 9, 7: 17, 8: 23, 9: 31, 10: 34 };
  return t[c] ?? 34;
}

// Second official language — per ability, max 6 per ability (24 total)
function secondLangPointsPerAbility(clb: number): number {
  if (clb < 5) return 0;
  const c = Math.min(clb, 10);
  // Official table: CLB 5-6 = 1, CLB 7-8 = 3, CLB 9-10 = 6
  if (c >= 9) return 6;
  if (c >= 7) return 3;
  return 1;
}

// Canadian work experience (years 0-5+)
function canadianExpPoints(years: number, withSpouse: boolean): number {
  const y = Math.max(0, Math.min(years, 5));
  if (withSpouse) {
    const t: Record<number, number> = { 0: 0, 1: 35, 2: 46, 3: 56, 4: 63, 5: 70 };
    return t[y];
  }
  const t: Record<number, number> = { 0: 0, 1: 40, 2: 53, 3: 64, 4: 72, 5: 80 };
  return t[y];
}

// ─── B. Spouse / Common-law partner factors ─────────────────────────────────

function spouseEducationPoints(edu: EduKey): number {
  const t: Record<EduKey, number> = {
    none: 0, secondary: 2, one_year: 6, two_year: 7,
    bachelors: 8, two_or_more: 9, masters: 10, doctoral: 10,
  };
  return t[edu];
}

function spouseFirstLangPerAbility(clb: number): number {
  if (clb < 4) return 0;
  const c = Math.min(clb, 10);
  // max 5 per ability (20 total)
  const t: Record<number, number> = { 4: 1, 5: 1, 6: 1, 7: 3, 8: 3, 9: 5, 10: 5 };
  return t[c] ?? 5;
}

function spouseCanadianExpPoints(years: number): number {
  const y = Math.max(0, Math.min(years, 5));
  const t: Record<number, number> = { 0: 0, 1: 5, 2: 7, 3: 8, 4: 9, 5: 10 };
  return t[y];
}

// ─── C. Skill Transferability (max 100 total) ───────────────────────────────

// 1a) Education + first-language CLB (max 50)
function transferEduLang(edu: EduKey, clb: number): number {
  if (edu === "none" || edu === "secondary") return 0;
  const isStrong = clb >= 9;
  const isModerate = clb >= 7 && clb < 9;
  if (!isModerate && !isStrong) return 0;
  const oneCred = ["one_year", "two_year", "bachelors"].includes(edu);
  const twoCred = ["two_or_more", "masters", "doctoral"].includes(edu);
  if (oneCred) return isStrong ? 25 : 13;
  if (twoCred) return isStrong ? 50 : 25;
  return 0;
}

// 1b) Education + Canadian work experience (max 50)
function transferEduCanExp(edu: EduKey, canYears: number): number {
  if (edu === "none" || edu === "secondary" || canYears < 1) return 0;
  const oneCred = ["one_year", "two_year", "bachelors"].includes(edu);
  const twoCred = ["two_or_more", "masters", "doctoral"].includes(edu);
  if (oneCred) return canYears >= 2 ? 25 : 13;
  if (twoCred) return canYears >= 2 ? 50 : 25;
  return 0;
}

// 2a) Foreign work experience + first-language CLB (max 50)
function transferForeignLang(foreignYears: number, clb: number): number {
  if (foreignYears < 1) return 0;
  const isStrong = clb >= 9;
  const isModerate = clb >= 7 && clb < 9;
  if (!isModerate && !isStrong) return 0;
  if (foreignYears >= 3) return isStrong ? 50 : 25;
  return isStrong ? 25 : 13; // 1-2 years
}

// 2b) Foreign + Canadian experience (max 50)
function transferForeignCan(foreignYears: number, canYears: number): number {
  if (foreignYears < 1 || canYears < 1) return 0;
  if (foreignYears >= 3 && canYears >= 2) return 50;
  if (foreignYears >= 3 && canYears >= 1) return 25;
  if (foreignYears >= 1 && canYears >= 2) return 25;
  return 13;
}

// 3) Certificate of qualification (trades) + first-language CLB (max 50)
function transferTradeLang(hasTrade: boolean, clb: number): number {
  if (!hasTrade) return 0;
  if (clb >= 7) return 50;
  if (clb >= 5) return 25;
  return 0;
}

// ─── Component ──────────────────────────────────────────────────────────────

interface FormState {
  // Core
  age: number;
  hasSpouse: boolean;
  spouseIsCitizen: boolean; // spouse PR/citizen → score as single
  education: EduKey;
  // First language — per ability (CLB)
  firstLang: { listening: number; reading: number; writing: number; speaking: number };
  hasSecondLang: boolean;
  secondLang: { listening: number; reading: number; writing: number; speaking: number };
  // Experience
  foreignExp: number;
  canadianExp: number;
  // Trade
  hasTradeCert: boolean;
  // Spouse
  spouseEducation: EduKey;
  spouseFirstLang: { listening: number; reading: number; writing: number; speaking: number };
  spouseCanadianExp: number;
  // Additional
  hasPNP: boolean;
  hasJobOffer: boolean;
  jobOfferTeer: "00" | "0_1_2_3" | "none";
  canadianStudy: "none" | "one_two_year" | "degree";
  sibling: boolean;
  frenchBonus: "none" | "nclc7_eng_clb4_or_less" | "nclc7_eng_clb5_plus";
}

const defaults: FormState = {
  age: 30,
  hasSpouse: false,
  spouseIsCitizen: false,
  education: "bachelors",
  firstLang: { listening: 8, reading: 8, writing: 8, speaking: 8 },
  hasSecondLang: false,
  secondLang: { listening: 0, reading: 0, writing: 0, speaking: 0 },
  foreignExp: 2,
  canadianExp: 0,
  hasTradeCert: false,
  spouseEducation: "secondary",
  spouseFirstLang: { listening: 0, reading: 0, writing: 0, speaking: 0 },
  spouseCanadianExp: 0,
  hasPNP: false,
  hasJobOffer: false,
  jobOfferTeer: "none",
  canadianStudy: "none",
  sibling: false,
  frenchBonus: "none",
};

const ABILITIES = ["listening", "reading", "writing", "speaking"] as const;
type Ability = typeof ABILITIES[number];

const CRSCalculatorPage = () => {
  const [form, setForm] = useState<FormState>(defaults);
  const [calculated, setCalculated] = useState(false);
  const { profile, update } = useUserProfile();

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setCalculated(false);
  };

  const setLangAbility = (
    field: "firstLang" | "secondLang" | "spouseFirstLang",
    ability: Ability,
    clb: number,
  ) => {
    setForm((f) => ({ ...f, [field]: { ...f[field], [ability]: clb } }));
    setCalculated(false);
  };

  // Score as "with spouse" only when married AND spouse is NOT already a Canadian PR/citizen
  const withSpouse = form.hasSpouse && !form.spouseIsCitizen;

  // Minimum CLB across the four abilities — IRCC requires CLB 7 minimum for FSW
  const firstClb = Math.min(...ABILITIES.map((a) => form.firstLang[a]));

  const score = useMemo(() => {
    // A. Core / human capital (max 460 / 500)
    const ageP = agePoints(form.age, withSpouse);
    const eduP = educationPoints(form.education, withSpouse);

    const lang1 = ABILITIES.reduce(
      (sum, a) => sum + firstLangPointsPerAbility(form.firstLang[a], withSpouse),
      0,
    );
    const lang2 = form.hasSecondLang
      ? Math.min(
          ABILITIES.reduce((sum, a) => sum + secondLangPointsPerAbility(form.secondLang[a]), 0),
          withSpouse ? 22 : 24,
        )
      : 0;
    const canExpP = canadianExpPoints(form.canadianExp, withSpouse);

    // B. Spouse factors (max 40)
    const spouseEduP = withSpouse ? spouseEducationPoints(form.spouseEducation) : 0;
    const spouseLangP = withSpouse
      ? Math.min(
          ABILITIES.reduce((sum, a) => sum + spouseFirstLangPerAbility(form.spouseFirstLang[a]), 0),
          20,
        )
      : 0;
    const spouseExpP = withSpouse ? spouseCanadianExpPoints(form.spouseCanadianExp) : 0;

    // C. Skill transferability (capped at 100)
    const eduLang = transferEduLang(form.education, firstClb);
    const eduCan = transferEduCanExp(form.education, form.canadianExp);
    const eduGroup = Math.min(eduLang + eduCan, 50);

    const forLang = transferForeignLang(form.foreignExp, firstClb);
    const forCan = transferForeignCan(form.foreignExp, form.canadianExp);
    const forGroup = Math.min(forLang + forCan, 50);

    const tradeGroup = Math.min(transferTradeLang(form.hasTradeCert, firstClb), 50);

    const transferP = Math.min(eduGroup + forGroup + tradeGroup, 100);

    // D. Additional (max 600)
    let addP = 0;
    if (form.hasPNP) addP += 600;
    if (form.hasJobOffer) addP += form.jobOfferTeer === "00" ? 200 : form.jobOfferTeer === "0_1_2_3" ? 50 : 0;
    if (form.canadianStudy === "one_two_year") addP += 15;
    if (form.canadianStudy === "degree") addP += 30;
    if (form.sibling) addP += 15;
    if (form.frenchBonus === "nclc7_eng_clb4_or_less") addP += 25;
    if (form.frenchBonus === "nclc7_eng_clb5_plus") addP += 50;

    const coreHuman = ageP + eduP + lang1 + lang2 + canExpP;
    const spouseTotal = spouseEduP + spouseLangP + spouseExpP;
    const total = Math.min(coreHuman + spouseTotal + transferP + addP, 1200);

    return {
      ageP, eduP, lang1, lang2, canExpP,
      spouseEduP, spouseLangP, spouseExpP, spouseTotal,
      eduGroup, forGroup, tradeGroup, transferP,
      addP, coreHuman, total,
    };
  }, [form, withSpouse, firstClb]);

  // Persist
  useEffect(() => {
    if (score.total > 0 && score.total !== profile.crsScore) {
      update({ crsScore: score.total, intent: "PR" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score.total]);

  // Cutoff comparison — use latest CEC as modern "core" proxy (no pure General draws since 2024)
  const latestCore = latestCoreDraw();
  const latestSTEM = expressEntryDraws.find((d) => d.category === "STEM");
  const latestHealth = expressEntryDraws.find((d) => d.category === "Healthcare");
  const latestFrench = expressEntryDraws.find((d) => d.category === "French");
  const latestTrades = expressEntryDraws.find((d) => d.category === "Trades");
  const cutoffComparisons = [
    { name: latestCore.category === "CEC" ? "CEC (core)" : "General", draw: latestCore },
    { name: "STEM", draw: latestSTEM },
    { name: "Healthcare", draw: latestHealth },
    { name: "French", draw: latestFrench },
    { name: "Trades", draw: latestTrades },
  ].filter((c) => c.draw);

  const breakdown = [
    { label: "Age", points: score.ageP, max: withSpouse ? 100 : 110 },
    { label: "Education", points: score.eduP, max: withSpouse ? 140 : 150 },
    { label: "First language", points: score.lang1, max: withSpouse ? 128 : 136 },
    { label: "Second language", points: score.lang2, max: withSpouse ? 22 : 24 },
    { label: "Canadian work exp.", points: score.canExpP, max: withSpouse ? 70 : 80 },
    ...(withSpouse
      ? [{ label: "Spouse factors", points: score.spouseTotal, max: 40 }]
      : []),
    { label: "Skill transferability", points: score.transferP, max: 100 },
    { label: "Additional (PNP/Offer/Sibling/French)", points: score.addP, max: 600 },
  ];

  const getCutoffStatus = () => {
    if (form.hasPNP) return { color: "text-success", label: "With PNP: Virtually guaranteed ITA ✓" };
    if (firstClb < 7) return { color: "text-destructive", label: "CLB 7 minimum required for FSW eligibility" };
    if (score.total >= 490) return { color: "text-success", label: "Excellent — above recent cutoffs" };
    if (score.total >= 450) return { color: "text-gold", label: "Good — competitive for general draws" };
    if (score.total >= 420) return { color: "text-gold", label: "Moderate — eligible for category-based draws" };
    return { color: "text-destructive", label: "Below recent cutoffs — consider IELTS retake or PNP" };
  };

  const status = getCutoffStatus();

  // Reusable CLB select
  const ClbSelect = ({
    value, onChange, includeNone = false,
  }: { value: number; onChange: (n: number) => void; includeNone?: boolean }) => (
    <select
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-gold/40"
    >
      {includeNone && <option value={0}>—</option>}
      {[4, 5, 6, 7, 8, 9, 10].map((n) => (
        <option key={n} value={n}>CLB {n}</option>
      ))}
    </select>
  );

  return (
    <div>
      <Helmet>
        <title>Canada CRS Score Calculator 2026 — Express Entry Points | 4 Aces Visa</title>
        <meta
          name="description"
          content="Free official-spec CRS calculator for Canada Express Entry 2026. Per-skill CLB, spouse factors, skill transferability, French bonus, PNP — full IRCC formula."
        />
        <link rel="canonical" href="https://www.4acesvisa.com/crs-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="4 Aces Visa" />
        <meta property="og:title" content="Canada CRS Score Calculator 2026 — Express Entry Points | 4 Aces Visa" />
        <meta property="og:description" content="Free CRS score calculator matching the official IRCC formula. Per-skill CLB, spouse, transferability, French bonus, PNP." />
        <meta property="og:url" content="https://www.4acesvisa.com/crs-calculator" />
        <meta property="og:image" content="https://www.4acesvisa.com/og-default.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@4acesvisa" />
        <meta name="twitter:image" content="https://www.4acesvisa.com/og-default.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                "name": "Canada CRS Score Calculator 2026 — 4 Aces Visa",
                "description": "Free CRS calculator implementing the official IRCC formula: core, spouse, transferability, additional points.",
                "url": "https://www.4acesvisa.com/crs-calculator",
                "applicationCategory": "UtilityApplication",
                "operatingSystem": "Any",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CAD" },
                "provider": { "@type": "Organization", "name": "4 Aces Visa", "url": "https://www.4acesvisa.com" },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.4acesvisa.com/" },
                  { "@type": "ListItem", position: 2, name: "CRS Calculator", item: "https://www.4acesvisa.com/crs-calculator" },
                ],
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
              Free — Official IRCC Formula — All Factors
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
              Canada CRS Score
              <span className="text-gold block mt-1">Calculator 2026</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg">
              Mirrors the official IRCC Comprehensive Ranking System. Includes per-skill CLB,
              spouse factors, skill transferability, French bonus, PNP and job-offer points.
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

              <div className="space-y-6">
                {/* ── Section: Personal ── */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">1. Personal</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Marital Status</label>
                      <select
                        value={form.hasSpouse ? "married" : "single"}
                        onChange={(e) => set("hasSpouse", e.target.value === "married")}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                      >
                        <option value="single">Single / Separated / Divorced</option>
                        <option value="married">Married / Common-law partner</option>
                      </select>
                    </div>
                  </div>

                  {form.hasSpouse && (
                    <label className="flex items-start gap-3 cursor-pointer p-3 bg-muted/40 rounded-lg">
                      <input
                        type="checkbox"
                        checked={form.spouseIsCitizen}
                        onChange={(e) => set("spouseIsCitizen", e.target.checked)}
                        className="w-4 h-4 mt-0.5 accent-gold"
                      />
                      <span className="text-xs text-foreground">
                        My spouse is already a Canadian citizen or PR
                        <span className="block text-muted-foreground">
                          (If yes, you are scored as if single — IRCC rule)
                        </span>
                      </span>
                    </label>
                  )}
                </div>

                {/* ── Section: Education ── */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">2. Education</h3>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">Your highest level of education</label>
                    <select
                      value={form.education}
                      onChange={(e) => set("education", e.target.value as EduKey)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                    >
                      {EDU_KEYS.map((k) => <option key={k} value={k}>{EDU_LABEL[k]}</option>)}
                    </select>
                    <p className="text-[11px] text-muted-foreground mt-1">Foreign credentials must be assessed by WES, ICAS, IQAS, etc.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">Canadian study credential</label>
                    <select
                      value={form.canadianStudy}
                      onChange={(e) => set("canadianStudy", e.target.value as FormState["canadianStudy"])}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                    >
                      <option value="none">None</option>
                      <option value="one_two_year">1-2 year diploma/certificate (+15)</option>
                      <option value="degree">3+ year degree, master's, doctoral (+30)</option>
                    </select>
                  </div>
                </div>

                {/* ── Section: First Language (per ability) ── */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">3. First official language (per ability)</h3>
                  <p className="text-[11px] text-muted-foreground -mt-1">IELTS / CELPIP (English) or TEF / TCF (French). See IELTS→CLB chart below.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {ABILITIES.map((a) => (
                      <div key={a}>
                        <label className="block text-xs font-semibold text-foreground mb-1 capitalize">{a}</label>
                        <ClbSelect
                          value={form.firstLang[a]}
                          onChange={(n) => setLangAbility("firstLang", a, n)}
                        />
                      </div>
                    ))}
                  </div>
                  {firstClb < 7 && (
                    <div className="flex items-start gap-2 text-[11px] text-destructive bg-destructive/10 p-2 rounded">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                      <span>Lowest ability is CLB {firstClb}. FSW requires <strong>minimum CLB 7 in all four abilities</strong>.</span>
                    </div>
                  )}
                </div>

                {/* ── Section: Second Language ── */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">4. Second official language</h3>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.hasSecondLang}
                      onChange={(e) => set("hasSecondLang", e.target.checked)}
                      className="w-4 h-4 accent-gold"
                    />
                    <span className="text-sm text-foreground">I have a second official language test</span>
                  </label>
                  {form.hasSecondLang && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {ABILITIES.map((a) => (
                        <div key={a}>
                          <label className="block text-xs font-semibold text-foreground mb-1 capitalize">{a}</label>
                          <ClbSelect
                            value={form.secondLang[a]}
                            onChange={(n) => setLangAbility("secondLang", a, n)}
                            includeNone
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ── Section: Work Experience ── */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">5. Work experience</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Foreign skilled work (years)</label>
                      <select
                        value={form.foreignExp}
                        onChange={(e) => set("foreignExp", parseInt(e.target.value))}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                      >
                        <option value={0}>None</option>
                        <option value={1}>1 year</option>
                        <option value={2}>2 years</option>
                        <option value={3}>3+ years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Canadian skilled work (years)</label>
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
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.hasTradeCert}
                      onChange={(e) => set("hasTradeCert", e.target.checked)}
                      className="w-4 h-4 accent-gold"
                    />
                    <span className="text-sm text-foreground">
                      I hold a Canadian Certificate of Qualification (skilled trade)
                    </span>
                  </label>
                </div>

                {/* ── Section: Spouse (only if applicable) ── */}
                {withSpouse && (
                  <div className="space-y-4 pt-4 border-t border-border">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">6. Spouse / partner factors</h3>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Spouse's highest education</label>
                      <select
                        value={form.spouseEducation}
                        onChange={(e) => set("spouseEducation", e.target.value as EduKey)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                      >
                        {EDU_KEYS.map((k) => <option key={k} value={k}>{EDU_LABEL[k]}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Spouse's first official language (CLB per ability)</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {ABILITIES.map((a) => (
                          <div key={a}>
                            <label className="block text-xs font-semibold text-foreground mb-1 capitalize">{a}</label>
                            <ClbSelect
                              value={form.spouseFirstLang[a]}
                              onChange={(n) => setLangAbility("spouseFirstLang", a, n)}
                              includeNone
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Spouse's Canadian work experience (years)</label>
                      <select
                        value={form.spouseCanadianExp}
                        onChange={(e) => set("spouseCanadianExp", parseInt(e.target.value))}
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
                  </div>
                )}

                {/* ── Section: Additional ── */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {withSpouse ? "7" : "6"}. Additional points
                  </h3>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.hasPNP}
                      onChange={(e) => set("hasPNP", e.target.checked)}
                      className="w-4 h-4 accent-gold"
                    />
                    <span className="text-sm text-foreground">
                      Provincial Nomination (PNP) — <strong className="text-gold">+600 points</strong>
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.hasJobOffer}
                      onChange={(e) => set("hasJobOffer", e.target.checked)}
                      className="w-4 h-4 accent-gold"
                    />
                    <span className="text-sm text-foreground">Valid arranged employment in Canada</span>
                  </label>
                  {form.hasJobOffer && (
                    <div className="ml-7">
                      <select
                        value={form.jobOfferTeer}
                        onChange={(e) => set("jobOfferTeer", e.target.value as FormState["jobOfferTeer"])}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                      >
                        <option value="none">— Select TEER —</option>
                        <option value="0_1_2_3">NOC TEER 1, 2, 3 — +50 pts</option>
                        <option value="00">NOC TEER 0 (senior management) — +200 pts</option>
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
                    <span className="text-sm text-foreground">
                      Sibling (18+) who is Canadian citizen / PR — <strong className="text-gold">+15 points</strong>
                    </span>
                  </label>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5 flex items-center gap-1">
                      French language bonus
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </label>
                    <select
                      value={form.frenchBonus}
                      onChange={(e) => set("frenchBonus", e.target.value as FormState["frenchBonus"])}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                    >
                      <option value="none">No / Not applicable</option>
                      <option value="nclc7_eng_clb4_or_less">French NCLC 7+, English CLB 4 or less (+25)</option>
                      <option value="nclc7_eng_clb5_plus">French NCLC 7+, English CLB 5+ (+50)</option>
                    </select>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    setCalculated(true);
                    trackEvent("tool_used", {
                      event_category: "Tool",
                      event_label: "CRS Calculator",
                    });
                  }}
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
                <div className="font-display text-7xl font-bold text-gold mb-2">{score.total}</div>
                <div className="text-sm font-semibold mb-4 mt-1">
                  <span className={status.color}>{status.label}</span>
                </div>

                <div className="bg-white/5 rounded-xl p-4 mb-5 text-left">
                  <p className="text-xs text-primary-foreground/50 mb-2 font-semibold uppercase tracking-wider">
                    Your score vs latest draws
                  </p>
                  {cutoffComparisons.map((c) => {
                    const cutoff = c.draw!.crsMin;
                    const delta = score.total - cutoff;
                    const passes = delta >= 0;
                    return (
                      <div key={c.name} className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-primary-foreground/70">
                          {c.name} <span className="text-primary-foreground/40">#{c.draw!.drawNumber}</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{cutoff}</span>
                          <span className={`text-[10px] font-semibold ${passes ? "text-success" : "text-destructive"}`}>
                            {passes ? `+${delta}` : delta}
                          </span>
                          {passes
                            ? <CheckCircle className="h-3.5 w-3.5 text-success" />
                            : <AlertTriangle className="h-3.5 w-3.5 text-destructive" />}
                        </div>
                      </div>
                    );
                  })}
                  {latestCore && (
                    <p className="text-[11px] text-primary-foreground/50 mt-2 pt-2 border-t border-white/10">
                      {score.total >= latestCore.crsMin
                        ? `You'd have been invited in draw #${latestCore.drawNumber} on ${latestCore.date}.`
                        : `You needed ${latestCore.crsMin - score.total} more points for draw #${latestCore.drawNumber}. PNP adds 600.`}
                    </p>
                  )}
                </div>

                <div className="space-y-2 mb-6 text-left">
                  {breakdown.map((b) => (
                    <div key={b.label} className="flex items-center gap-2">
                      <span className="text-xs text-primary-foreground/60 flex-1">{b.label}</span>
                      <div className="flex-1 bg-white/10 rounded-full h-1.5">
                        <div
                          className="bg-gold h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((b.points / Math.max(b.max, 1)) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gold w-10 text-right">{b.points}</span>
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

      {/* Tips */}
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
                title: "Improve IELTS / CELPIP",
                impact: "Up to +50 points",
                desc: "Going from CLB 8 to CLB 9 across all four abilities adds ~50 points directly, plus unlocks higher transferability bonuses.",
              },
              {
                icon: TrendingUp,
                title: "Get a PNP Nomination",
                impact: "+600 points",
                desc: "A provincial nomination instantly adds 600 CRS points — virtually guaranteeing an ITA. We identify PNP streams that match your occupation.",
              },
              {
                icon: CheckCircle,
                title: "Add French (NCLC 7)",
                impact: "+25 to +50 points",
                desc: "Strong French (NCLC 7+) adds up to 50 bonus points, plus second-language points, plus eligibility for category-based French draws.",
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
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">CLB</th>
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
          <p className="text-xs text-muted-foreground text-center mt-3">⭐ CLB 9 unlocks maximum transferability bonuses</p>
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
      <PathwayWidget />
      <ReturnLoopCard />
      <ConnectedFooter
        tool={{ label: "Find your NOC code", href: "/noc-finder" }}
        hub={{ label: "Express Entry Hub", href: "/express-entry" }}
        funnel={{ label: "Get your best pathway", href: "/quiz" }}
      />
    </div>
  );
};

export default CRSCalculatorPage;
