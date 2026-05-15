import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle, ArrowRight, Clock, DollarSign, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import SeoSchema from "@/components/SeoSchema";

type Variant = {
  title: string;
  h1: string;
  description: string;
  canonical: string;
  intro: string;
  breadcrumbName: string;
};

const VARIANTS: Record<string, Variant> = {
  "/australia/skilled-migration": {
    title: "Australia Skilled Migration 2026 | Subclass 189, 190, 491 Guide — 4 Aces Visa",
    h1: "Australia Skilled Migration 2026",
    description:
      "Complete guide to Australia skilled migration in 2026. Compare Subclass 189, 190, and 491 visas. Points test, skills assessment, processing times, and PR pathway.",
    canonical: "https://www.4acesvisa.com/australia/skilled-migration",
    intro:
      "A points-based immigration system with three main visa subclasses — 189, 190, and 491. Minimum 65 points required; competitive scores are 80–95+. No job offer needed.",
    breadcrumbName: "Skilled Migration",
  },
  "/australia/subclass-189": {
    title: "Australia Subclass 189 Visa 2026 — Skilled Independent PR Guide | 4 Aces Visa",
    h1: "Australia Subclass 189 — Skilled Independent Visa",
    description:
      "Subclass 189 is Australia's permanent independent skilled visa. No state nomination, no job offer. 90+ points competitive. Processing 12–18 months. Full eligibility, points test, and 2026 invitation rounds.",
    canonical: "https://www.4acesvisa.com/australia/subclass-189",
    intro:
      "The Skilled Independent visa — permanent residence on day 1 with no state nomination and no job offer. The most competitive Australian skilled stream — invitations issue at 90+ points in 2026.",
    breadcrumbName: "Subclass 189",
  },
  "/australia/subclass-190": {
    title: "Australia Subclass 190 Visa 2026 — State Nominated PR | 4 Aces Visa",
    h1: "Australia Subclass 190 — State Nominated Visa",
    description:
      "Subclass 190 is Australia's state-nominated permanent visa. +5 points from state nomination, 2-year commitment to nominating state, 9–15 month processing. Compare NSW, VIC, SA, TAS occupation lists.",
    canonical: "https://www.4acesvisa.com/australia/subclass-190",
    intro:
      "State-nominated permanent visa — gain a +5-point boost from a participating state or territory. Permanent residence from day 1, 2-year commitment to live and work in the nominating state.",
    breadcrumbName: "Subclass 190",
  },
  "/australia/subclass-491": {
    title: "Australia Subclass 491 Visa 2026 — Skilled Regional Pathway | 4 Aces Visa",
    h1: "Australia Subclass 491 — Skilled Work Regional",
    description:
      "Subclass 491 is Australia's regional skilled visa. +15 points from regional nomination — the biggest boost available. 5-year provisional visa, pathway to permanent Subclass 191 after 3 years living regionally.",
    canonical: "https://www.4acesvisa.com/australia/subclass-491",
    intro:
      "Regional skilled visa offering the largest points boost (+15) of any Australian stream. Provisional 5-year visa with a clear pathway to permanent Subclass 191 after 3 years in a designated regional area.",
    breadcrumbName: "Subclass 491",
  },
};

const DEFAULT_VARIANT = VARIANTS["/australia/skilled-migration"];

const subclasses = [
  {
    code: "189",
    name: "Skilled Independent",
    badge: "No Nomination Needed",
    pointBonus: "+0 pts",
    residence: "Permanent from day 1",
    processing: "12–18 months",
    requirement: "90+ points competitive",
    live: "Anywhere in Australia",
    description: "No state nomination required. Compete purely on your points score. The most competitive subclass — ideal for candidates with 90+ points.",
  },
  {
    code: "190",
    name: "State Nominated",
    badge: "State Nomination +5 pts",
    pointBonus: "+5 pts",
    residence: "Permanent from day 1",
    processing: "9–15 months",
    requirement: "75–89 points competitive",
    live: "Nominating state (2 years)",
    description: "State or territory nomination adds 5 points to your score. Must commit to living and working in the nominating state for 2 years.",
  },
  {
    code: "491",
    name: "Skilled Work Regional",
    badge: "Regional Nomination +15 pts",
    pointBonus: "+15 pts",
    residence: "Provisional (5 years) → Subclass 191",
    processing: "6–12 months",
    requirement: "65+ points + regional nomination",
    live: "Designated regional area (3 years)",
    description: "Regional nomination adds 15 points — the biggest boost available. Provisional 5-year visa with pathway to permanent Subclass 191 after 3 years.",
  },
];

const pointsTable = [
  { factor: "Age 25–32", points: 30 },
  { factor: "Age 33–39", points: 25 },
  { factor: "Age 40–44", points: 15 },
  { factor: "IELTS 8+ (Superior English)", points: 20 },
  { factor: "IELTS 7–7.5 (Proficient English)", points: 10 },
  { factor: "PhD Degree", points: 20 },
  { factor: "Bachelor's Degree", points: 15 },
  { factor: "Diploma", points: 10 },
  { factor: "8+ years skilled experience (overseas)", points: 15 },
  { factor: "5–7 years skilled experience", points: 10 },
  { factor: "Australian bachelor's (study in Australia)", points: 5 },
  { factor: "Regional study (2+ years)", points: 5 },
  { factor: "State nomination (Subclass 190)", points: 5 },
  { factor: "Regional nomination (Subclass 491)", points: 15 },
  { factor: "Partner skills (partner under 45, skills assessed)", points: 10 },
];

const assessingBodies = [
  { occupation: "IT & Computing", body: "ACS (Australian Computer Society)", time: "4–8 weeks" },
  { occupation: "Engineering", body: "Engineers Australia (EA)", time: "8–12 weeks" },
  { occupation: "Accounting / Finance", body: "CPA Australia or CAANZ", time: "4–8 weeks" },
  { occupation: "Nursing / Healthcare", body: "AHPRA (Australian Health Practitioner Regulation)", time: "4–12 weeks" },
  { occupation: "Teaching", body: "AITSL (Australian Institute for Teaching)", time: "6–12 weeks" },
  { occupation: "Other occupations", body: "VETASSESS", time: "8–16 weeks" },
];

const faqs = [
  {
    q: "What is the minimum points score for Australian PR in 2026?",
    a: "The minimum to submit an Expression of Interest (EOI) is 65 points. However, for Subclass 189 (independent), competitive scores in 2026 are 90+ points. Subclass 190 state nomination adds 5 points; Subclass 491 regional nomination adds 15 points. Most skilled occupations see invitations at 80–95+ points for Subclass 189.",
  },
  {
    q: "Do I need a skills assessment before applying for Australian PR?",
    a: "Yes. A skills assessment from the relevant assessing body (ACS for IT, Engineers Australia for engineers, AHPRA for healthcare, VETASSESS for others) is mandatory before you can submit your EOI in SkillSelect. Start your skills assessment as early as possible — it takes 2–6 months.",
  },
  {
    q: "Can I apply for Australian PR without a job offer?",
    a: "Yes. Subclass 189 (Skilled Independent) and Subclass 190 (State Nominated) do not require a job offer. You're selected based on your points score and occupation demand. Subclass 491 also doesn't require a job offer — just regional nomination.",
  },
  {
    q: "Which Australian state is easiest to get a nomination from?",
    a: "South Australia (SA), Tasmania (TAS), and Northern Territory (NT) typically have shorter waiting periods and broader occupation lists than NSW or Victoria. They are often more accessible for Indian applicants in IT, engineering, and health occupations.",
  },
  {
    q: "How long does Australian PR take from India in 2026?",
    a: "Full timeline from India: Skills assessment (2–6 months) → EOI submission (immediate) → invitation (weeks to months based on points and occupation) → lodge visa application → processing (6–18 months). Total: 12–24 months for Subclass 189/190. Subclass 491 may be faster (6–12 months).",
  },
];

export default function AustraliaSubPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };
  const location = useLocation();
  const variant = VARIANTS[location.pathname] ?? DEFAULT_VARIANT;

  return (
    <>
      <Helmet>
        <title>{variant.title}</title>
        <meta name="description" content={variant.description} />
        <link rel="canonical" href={variant.canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={variant.title} />
        <meta property="og:description" content={variant.description} />
        <meta property="og:url" content={variant.canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={variant.title} />
        <meta name="twitter:description" content={variant.description} />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>
      <SeoSchema
        breadcrumbs={[
          { name: "Australia Immigration", url: "/australia/skilled-migration" },
          { name: variant.breadcrumbName, url: location.pathname },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-yellow-500 via-yellow-600 to-amber-700 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedSection>
            <span className="text-5xl mb-4 block">🇦🇺</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {variant.h1}
            </h1>
            <p className="text-yellow-100 text-lg max-w-3xl mx-auto mb-8">
              {variant.intro}
            </p>
            <div className="flex flex-wrap gap-6 justify-center text-center mb-8">
              {[
                { label: "Min. Points", value: "65" },
                { label: "Competitive Points", value: "80–95+" },
                { label: "PR Processing", value: "9–18 months" },
                { label: "Job Offer Required?", value: "No" },
              ].map((stat, i) => (
                <div key={i} className="bg-white/20 rounded-xl px-6 py-3">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-yellow-100 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-yellow-700 hover:bg-yellow-50">
                <Link to="/contact">Free Australia Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/compare">Compare All Countries</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Subclass Cards */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Choose Your Visa Subclass</h2>
          <p className="text-gray-600 text-center mb-10">Three pathways to Australian permanent residence — each suits a different profile</p>
          <div className="grid md:grid-cols-3 gap-6">
            {subclasses.map((sub) => (
              <AnimatedSection key={sub.code}>
                <div className="bg-white rounded-2xl border-2 border-gray-200 hover:border-yellow-400 p-6 shadow-sm hover:shadow-md transition-all h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-3xl font-bold text-yellow-600">Subclass {sub.code}</span>
                      <p className="font-semibold text-gray-800 text-lg">{sub.name}</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded-full">{sub.pointBonus}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{sub.description}</p>
                  <div className="space-y-2 text-sm">
                    {[
                      { label: "Residence Type", value: sub.residence },
                      { label: "Processing", value: sub.processing },
                      { label: "Competitive Score", value: sub.requirement },
                      { label: "Must Live", value: sub.live },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700"><strong>{item.label}:</strong> {item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Points Table */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Points Test Calculator</h2>
          <p className="text-gray-600 text-center mb-8">Understanding how points are calculated under Australia's General Skilled Migration program</p>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-yellow-500 text-white px-6 py-3 grid grid-cols-2 font-semibold">
              <span>Factor</span>
              <span className="text-right">Points</span>
            </div>
            {pointsTable.map((row, i) => (
              <div key={i} className={`px-6 py-3 grid grid-cols-2 text-sm ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <span className="text-gray-700">{row.factor}</span>
                <span className="text-right font-bold text-yellow-600">+{row.points}</span>
              </div>
            ))}
            <div className="bg-yellow-50 px-6 py-3 grid grid-cols-2 font-bold text-sm border-t border-yellow-200">
              <span className="text-gray-800">Minimum to apply (EOI)</span>
              <span className="text-right text-yellow-700">65+</span>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Use our <Link to="/crs-calculator" className="text-blue-600 underline">free calculator</Link> or book a <Link to="/contact" className="text-blue-600 underline">free assessment</Link> to calculate your exact score.
          </p>
        </div>
      </section>

      {/* Skills Assessment */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Skills Assessment Bodies</h2>
          <p className="text-gray-600 text-center mb-8">Start your skills assessment early — it's mandatory and takes 2–6 months</p>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-slate-900 text-white px-6 py-3 grid grid-cols-3 font-semibold text-sm">
              <span>Occupation</span>
              <span>Assessing Body</span>
              <span className="text-right">Processing Time</span>
            </div>
            {assessingBodies.map((row, i) => (
              <div key={i} className={`px-6 py-3 grid grid-cols-3 text-sm ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <span className="font-medium text-gray-800">{row.occupation}</span>
                <span className="text-gray-700">{row.body}</span>
                <span className="text-right text-gray-600">{row.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-yellow-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Australia PR — Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Get Your Free Australia Points Assessment</h2>
          <p className="text-yellow-100 mb-8">Our immigration experts will calculate your points score, identify the right subclass, and create your Australia PR roadmap — free consultation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-yellow-700 hover:bg-yellow-50">
              <Link to="/contact">Free Australia Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/immigration/australia">Australia Country Guide</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
