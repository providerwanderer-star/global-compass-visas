import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import SmartCTA from "@/components/SmartCTA";
import EligibilityForm from "@/components/EligibilityForm";

interface Answers {
  age: string;
  education: string;
  english: string;
  experience: string;
  canadianTies: string;
  goal: string;
}

const initial: Answers = { age: "", education: "", english: "", experience: "", canadianTies: "", goal: "" };

const steps = [
  { key: "age" as const, q: "How old are you?", opts: [
    { v: "18-29", label: "18–29 years" },
    { v: "30-35", label: "30–35 years" },
    { v: "36-45", label: "36–45 years" },
    { v: "46+", label: "46 or older" },
  ]},
  { key: "education" as const, q: "Highest education completed?", opts: [
    { v: "phd", label: "Doctorate (PhD)" },
    { v: "masters", label: "Master's degree" },
    { v: "bachelors", label: "Bachelor's degree" },
    { v: "diploma", label: "Diploma / certificate" },
    { v: "secondary", label: "High school" },
  ]},
  { key: "english" as const, q: "English (or French) ability?", opts: [
    { v: "advanced", label: "Advanced (IELTS 7+ / CLB 9+)" },
    { v: "intermediate", label: "Intermediate (IELTS 6 / CLB 7)" },
    { v: "basic", label: "Basic (IELTS 5 / CLB 5)" },
    { v: "none", label: "Not yet tested" },
  ]},
  { key: "experience" as const, q: "Years of skilled work experience?", opts: [
    { v: "5+", label: "5+ years" },
    { v: "3-4", label: "3–4 years" },
    { v: "1-2", label: "1–2 years" },
    { v: "0", label: "Less than 1 year" },
  ]},
  { key: "canadianTies" as const, q: "Any Canadian connection?", opts: [
    { v: "study", label: "Studied in Canada" },
    { v: "work", label: "Worked in Canada" },
    { v: "family", label: "Family in Canada (PR/Citizen)" },
    { v: "joboffer", label: "Have a job offer" },
    { v: "none", label: "None of the above" },
  ]},
  { key: "goal" as const, q: "Primary goal?", opts: [
    { v: "pr", label: "Permanent Residency (PR)" },
    { v: "work", label: "Work permit" },
    { v: "study", label: "Study permit" },
    { v: "family", label: "Reunite with family" },
  ]},
];

function evaluate(a: Answers) {
  let score = 0;
  const matches: string[] = [];
  if (a.age === "18-29") score += 25; else if (a.age === "30-35") score += 18; else if (a.age === "36-45") score += 8;
  if (a.education === "phd") score += 25; else if (a.education === "masters") score += 22; else if (a.education === "bachelors") score += 18; else if (a.education === "diploma") score += 12; else score += 5;
  if (a.english === "advanced") score += 25; else if (a.english === "intermediate") score += 15; else if (a.english === "basic") score += 5;
  if (a.experience === "5+") score += 15; else if (a.experience === "3-4") score += 12; else if (a.experience === "1-2") score += 7;
  if (a.canadianTies === "joboffer") score += 10;
  else if (a.canadianTies === "work" || a.canadianTies === "study") score += 8;
  else if (a.canadianTies === "family") score += 5;

  if (a.goal === "pr") {
    if (a.canadianTies === "study" || a.canadianTies === "work") matches.push("Canadian Experience Class (CEC)");
    matches.push("Express Entry — FSW");
    if (a.education === "phd" || a.education === "masters" || a.english === "advanced") matches.push("Provincial Nominee Program (PNP)");
    if (a.canadianTies === "family") matches.push("Family Sponsorship (spouse/parent)");
  } else if (a.goal === "work") {
    matches.push("LMIA-based Work Permit");
    if (a.canadianTies === "joboffer") matches.push("Global Talent Stream (fast-track)");
  } else if (a.goal === "study") {
    matches.push("Study Permit + PGWP → CEC");
  } else {
    matches.push("Spousal / Parents & Grandparents Sponsorship");
  }

  let band: "high" | "medium" | "low" = "low";
  if (score >= 75) band = "high"; else if (score >= 45) band = "medium";
  return { score, band, matches };
}

const EligibilityCheckerPage = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initial);
  const [done, setDone] = useState(false);

  const current = steps[step];
  const total = steps.length;
  const progress = Math.round(((step + (done ? 1 : 0)) / total) * 100);

  const select = (v: string) => {
    const next = { ...answers, [current.key]: v };
    setAnswers(next);
    if (step < total - 1) setStep(step + 1); else setDone(true);
  };

  const reset = () => { setAnswers(initial); setStep(0); setDone(false); };
  const result = done ? evaluate(answers) : null;

  return (
    <div>
      <Helmet>
        <title>Canada Immigration Eligibility Checker — Free Assessment | 4 Aces Visa</title>
        <meta name="description" content="Check your eligibility for Canada PR, work permit, or study permit in 60 seconds. Free 6-question assessment based on IRCC criteria. Updated April 2026." />
        <link rel="canonical" href="https://www.4acesvisa.com/eligibility-checker" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Canada Immigration Eligibility Checker",
          applicationCategory: "ImmigrationApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
          url: "https://www.4acesvisa.com/eligibility-checker",
        })}</script>
      </Helmet>

      <section className="bg-primary text-primary-foreground pt-24 pb-10 md:pt-32 md:pb-14">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-5">
            <Link to="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/tools" className="hover:text-gold">Tools</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">Eligibility Checker</span>
          </nav>
          <span className="inline-flex items-center gap-2 bg-gold/20 text-gold px-3 py-1.5 rounded-full text-xs font-bold mb-4 border border-gold/30">
            <Sparkles className="h-3.5 w-3.5" /> 6 questions · 60 seconds · Free
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-3">Canada Immigration Eligibility Checker</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl">
            Find out which Canadian immigration pathways you qualify for — based on official IRCC criteria. No signup required.
          </p>
        </div>
      </section>

      <section className="section-padding section-light">
        <div className="container-narrow mx-auto max-w-2xl">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-card">
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>{done ? "Complete" : `Question ${step + 1} of ${total}`}</span>
                <span className="font-bold text-gold">{progress}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-gold transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {!done ? (
              <>
                <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-5">{current.q}</h2>
                <div className="space-y-2.5">
                  {current.opts.map((o) => (
                    <button key={o.v} onClick={() => select(o.v)}
                      className="w-full text-left p-4 border-2 border-border rounded-xl hover:border-gold hover:bg-gold/5 transition-all flex items-center justify-between group">
                      <span className="font-medium text-foreground">{o.label}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-gold transition-colors" />
                    </button>
                  ))}
                </div>
                {step > 0 && (
                  <button onClick={() => setStep(step - 1)} className="mt-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-3.5 w-3.5" /> Back
                  </button>
                )}
              </>
            ) : result && (
              <>
                <div className={`rounded-xl p-5 mb-5 border-2 ${
                  result.band === "high" ? "bg-emerald-50 border-emerald-200" :
                  result.band === "medium" ? "bg-amber-50 border-amber-200" :
                  "bg-red-50 border-red-200"
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    {result.band === "low" ? <AlertCircle className="h-6 w-6 text-red-600" /> : <CheckCircle2 className="h-6 w-6 text-emerald-600" />}
                    <h2 className="font-display text-xl font-bold text-foreground">
                      {result.band === "high" ? "Strong Eligibility" : result.band === "medium" ? "Moderate Eligibility" : "Limited — Improvements Recommended"}
                    </h2>
                  </div>
                  <p className="text-sm text-foreground/80">
                    Based on IRCC criteria, your profile scores <strong>{result.score}/100</strong> on our quick screening.
                    {result.band === "high" && " You should explore Express Entry and PNP options now."}
                    {result.band === "medium" && " A consultation can identify the best stream and improvement areas."}
                    {result.band === "low" && " Improving language scores or gaining experience will significantly help."}
                  </p>
                </div>

                <h3 className="font-display font-bold text-foreground mb-3">Recommended Pathways</h3>
                <ul className="space-y-2 mb-6">
                  {result.matches.map((m) => (
                    <li key={m} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span className="text-foreground">{m}</span>
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  <SmartCTA variant="crs" />
                  <SmartCTA variant="pathway" />
                </div>

                <button onClick={reset} className="text-sm text-muted-foreground hover:text-foreground underline">
                  Restart assessment
                </button>
              </>
            )}
          </div>

          {done && (
            <div className="mt-8 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-card">
              <h3 className="font-display text-xl font-bold text-foreground mb-1">Want a detailed assessment?</h3>
              <p className="text-sm text-muted-foreground mb-5">Get a free profile review from a licensed RCIC.</p>
              <EligibilityForm sourcePage="eligibility-checker" />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default EligibilityCheckerPage;
