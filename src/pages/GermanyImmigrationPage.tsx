import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle, ArrowRight, Globe, Star, Zap } from "lucide-react";
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
  "/germany/chancenkarte": {
    title: "Germany Chancenkarte 2026 — Opportunity Card Guide | 4 Aces Visa",
    h1: "Germany Chancenkarte (Opportunity Card)",
    description:
      "Germany Chancenkarte 2026 — points-based job search visa. No job offer needed, work 20 hrs/week while searching. 6-of-10 points test, EUR 12,000 blocked account, 1-year validity. Full eligibility and application steps.",
    canonical: "https://www.4acesvisa.com/germany/chancenkarte",
    intro:
      "Germany's new points-based job-search visa (replaced the Job Seeker Visa in 2024). Enter Germany without a job offer, work up to 20 hours/week while searching, and convert to an EU Blue Card on hire.",
    breadcrumbName: "Chancenkarte",
  },
  "/germany/eu-blue-card": {
    title: "Germany EU Blue Card 2026 — Salary, Eligibility & PR | 4 Aces Visa",
    h1: "Germany EU Blue Card 2026",
    description:
      "Germany EU Blue Card guide for 2026. EUR 43,759 salary threshold (EUR 39,682 for shortage roles), recognized degree, fast-track to permanent residence in 21 months with B1 German. Family joins immediately.",
    canonical: "https://www.4acesvisa.com/germany/eu-blue-card",
    intro:
      "Germany's premium work permit for highly qualified professionals — fast-track to permanent residence in 21 months (with B1 German), family joins immediately, and free movement across the EU after 18 months.",
    breadcrumbName: "EU Blue Card",
  },
};

const DEFAULT_VARIANT = VARIANTS["/germany/chancenkarte"];

const pathways = [
  {
    icon: Star,
    title: "Chancenkarte (Opportunity Card)",
    badge: "No Job Offer Needed",
    description: "Germany's new points-based visa (replaced Job Seeker Visa in 2024). Enter Germany to search for work for up to 1 year. Work 20 hrs/week during your search.",
    details: [
      "Minimum 6 out of 10 points required",
      "EUR 12,000 in blocked account (Sperrkonto)",
      "Work up to 20 hrs/week while job searching",
      "Trial work: up to 2 weeks with potential employer",
      "Valid 1 year; convert to EU Blue Card after finding work",
    ],
    processing: "2–4 months",
    link: "/services/job-seeker-visa",
  },
  {
    icon: Zap,
    title: "EU Blue Card (Blaue Karte EU)",
    badge: "Fast-Track to PR",
    description: "Germany's premium work permit for highly qualified professionals. Requires a job offer with qualifying salary. Fast-track to permanent residence in 21 months.",
    details: [
      "University degree recognized in Germany (check anabin)",
      "Job offer: EUR 43,759/year (general) or EUR 39,682/year (shortage occupations)",
      "Bring family immediately on Dependent Visa",
      "Permanent residence: 21 months (B1 German) or 33 months (no B1)",
      "Move to another EU country after 18 months",
    ],
    processing: "4–12 weeks",
    link: "/immigration/germany",
  },
  {
    icon: Globe,
    title: "Regular Work Permit (Aufenthaltserlaubnis)",
    badge: "For Skilled Workers",
    description: "Standard work permit for qualified professionals with a job offer. No salary threshold as strict as Blue Card. Suitable for apprenticeship-level qualifications.",
    details: [
      "Recognized qualification (vocational or degree)",
      "Job offer in the qualified occupation",
      "No fixed salary minimum (but must be appropriate for role)",
      "Permanent residence after 4–5 years",
      "State-specific processing at Ausländerbehörde",
    ],
    processing: "2–6 months",
    link: "/immigration/germany",
  },
];

const chancenkartePoints = [
  { criterion: "University degree in STEM, IT, or healthcare field", points: 3 },
  { criterion: "Other recognized university degree", points: 1 },
  { criterion: "German language skills at B2 or higher", points: 3 },
  { criterion: "German language skills at A1 or A2", points: 1 },
  { criterion: "2+ years relevant work experience", points: 1 },
  { criterion: "Under 35 years of age", points: 2 },
  { criterion: "Previous stay in Germany (study/work/training)", points: 1 },
];

const faqs = [
  {
    q: "What is Germany's Chancenkarte (Opportunity Card) and how is it different from the old Job Seeker Visa?",
    a: "The Chancenkarte replaced the Job Seeker Visa in June 2024 as part of Germany's Skilled Immigration Act reform. The key improvement: Chancenkarte holders can work up to 20 hours/week during their job search (the old Job Seeker Visa prohibited any work). Both require no prior job offer. The Chancenkarte also has a clear points system (minimum 6 out of 10 points).",
  },
  {
    q: "How can I get my Indian degree recognized in Germany?",
    a: "Check the anabin database (anabin.kmk.org) maintained by the German Standing Conference. Degrees from IITs, NITs, and established universities are often rated H+ (recognized automatically). If your degree is not listed or rated H-, contact the Central Office for Foreign Education (ZAB) for a Statement of Comparability (Zeugnisbewertung). Start this process early — it can take 3–6 months.",
  },
  {
    q: "What salary is needed for Germany EU Blue Card in 2026?",
    a: "For most occupations, the EU Blue Card minimum salary is EUR 43,759/year (adjusted annually). For shortage occupations — including IT (software developers, data scientists), engineers, doctors, and natural scientists — the reduced threshold is EUR 39,682/year. These thresholds are set by the German government and updated each year.",
  },
  {
    q: "How fast can I get German permanent residence (Niederlassungserlaubnis)?",
    a: "EU Blue Card holders with B1 German language skills can apply for permanent settlement after 21 months. Without B1 German: 33 months. Regular work permit holders need 4–5 years. Regardless of route, you must also show: paid mandatory pension contributions (60 months), secure livelihood, no serious criminal offenses, and basic German language skills.",
  },
  {
    q: "Can I bring my family to Germany on a work visa?",
    a: "Yes. EU Blue Card holders can bring their family immediately — spouses do not need to demonstrate German language skills (unlike regular work permit holders). Your spouse receives a residence permit allowing them to work freely in Germany. Children under 18 can join and access free public schooling.",
  },
];

export default function GermanyImmigrationPage() {
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
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>
      <SeoSchema
        breadcrumbs={[
          { name: "Germany Immigration", url: "/germany/chancenkarte" },
          { name: variant.breadcrumbName, url: location.pathname },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-yellow-900 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedSection>
            <span className="text-5xl mb-4 block">🇩🇪</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {variant.h1}
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
              {variant.intro}
            </p>
            <div className="flex flex-wrap gap-6 justify-center text-center mb-8">
              {[
                { label: "Chancenkarte Points", value: "6 min." },
                { label: "Blue Card Salary", value: "€43,759" },
                { label: "PR Timeline (B1 German)", value: "21 months" },
                { label: "EU Access After", value: "18 months" },
              ].map((stat, i) => (
                <div key={i} className="bg-white/10 rounded-xl px-6 py-3">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900">
                <Link to="/contact">Free Germany Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/compare">Compare All Countries</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Pathways */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Germany Immigration Pathways</h2>
          <p className="text-gray-600 text-center mb-10">Three main routes for skilled non-EU workers to live and work in Germany</p>
          <div className="grid md:grid-cols-3 gap-6">
            {pathways.map((p, i) => (
              <AnimatedSection key={i}>
                <div className="bg-white rounded-2xl border-2 border-gray-200 hover:border-yellow-400 p-6 shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-yellow-100 p-2 rounded-lg">
                      <p.icon className="h-6 w-6 text-yellow-700" />
                    </div>
                    <div>
                      <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-0.5 rounded-full">{p.badge}</span>
                      <h3 className="font-bold text-gray-900 mt-1">{p.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{p.description}</p>
                  <ul className="space-y-2 flex-1">
                    {p.details.map((d, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                    <span>Processing: </span>
                    <span className="font-semibold">{p.processing}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Chancenkarte Points */}
      <section className="py-16 px-4 bg-yellow-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Chancenkarte Points Calculator</h2>
          <p className="text-gray-600 text-center mb-2">Minimum 6 out of 10 points required to qualify</p>
          <p className="text-gray-500 text-sm text-center mb-8">Points are not cumulative across categories — the highest applicable score in each category applies</p>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-gray-900 text-white px-6 py-3 grid grid-cols-4 font-semibold text-sm">
              <span className="col-span-3">Criterion</span>
              <span className="text-right">Points</span>
            </div>
            {chancenkartePoints.map((row, i) => (
              <div key={i} className={`px-6 py-3 grid grid-cols-4 text-sm ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <span className="col-span-3 text-gray-700">{row.criterion}</span>
                <span className="text-right font-bold text-yellow-600">+{row.points}</span>
              </div>
            ))}
            <div className="bg-yellow-50 px-6 py-3 grid grid-cols-4 font-bold text-sm border-t-2 border-yellow-200">
              <span className="col-span-3 text-gray-800">Minimum required</span>
              <span className="text-right text-yellow-700">6</span>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Not sure if you qualify? <Link to="/contact" className="text-blue-600 underline">Get a free assessment</Link> from 4 Aces Visa.
          </p>
        </div>
      </section>

      {/* PR Timeline */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Fast-Track to German PR: The Optimal Route</h2>
          <p className="text-gray-600 text-center mb-10">From no job offer to permanent residence in approximately 3–4 years</p>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-yellow-300"></div>
            {[
              { step: "Months 1–4", title: "Apply for Chancenkarte (or EU Blue Card)", desc: "If you have no job offer: apply for Chancenkarte (6+ points, EUR 12,000 blocked account). If you have a qualifying job offer: apply directly for EU Blue Card.", badge: "Start" },
              { step: "Months 1–12", title: "Job Search in Germany (Chancenkarte route)", desc: "Arrive in Germany. Attend interviews, job fairs, use German job portals (Indeed.de, StepStone, XING, LinkedIn). Work up to 20 hrs/week part-time. Trial work for up to 2 weeks.", badge: "Job Search" },
              { step: "After Finding Work", title: "Convert to EU Blue Card", desc: "Once you have a qualifying job offer (EUR 39,682+ for shortage occupations), visit the Ausländerbehörde (immigration office) and apply for an EU Blue Card. Processing: 4–12 weeks.", badge: "Upgrade" },
              { step: "Month 21 (with B1 German)", title: "Apply for Permanent Settlement (Niederlassungserlaubnis)", desc: "After 21 months on EU Blue Card with B1 German proof: apply for permanent settlement. Requirements: paid pension contributions, secure livelihood, no serious criminal convictions.", badge: "Permanent" },
              { step: "Year 5–8", title: "Apply for German Citizenship (Optional)", desc: "After 5 years of legal residence (3 for exceptional cases): apply for naturalization. Germany allows dual citizenship for most cases since 2024.", badge: "Citizen" },
            ].map((step, i) => (
              <div key={i} className="relative pl-16 pb-8 last:pb-0">
                <div className="absolute left-3 w-6 h-6 bg-yellow-500 rounded-full text-gray-900 text-xs flex items-center justify-center font-bold">{i + 1}</div>
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-yellow-600 uppercase tracking-wide">{step.step}</span>
                    <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-0.5 rounded-full">{step.badge}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mt-1 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Germany Immigration FAQ</h2>
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
      <section className="py-16 px-4 bg-gradient-to-r from-gray-900 to-yellow-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Start Your Germany Immigration Journey</h2>
          <p className="text-gray-300 mb-8">Check your Chancenkarte points, verify degree recognition, and get a personalized Germany immigration plan. Free consultation with 4 Aces Visa experts.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900">
              <Link to="/contact">Free Germany Consultation <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/immigration/germany">Germany Country Guide</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
