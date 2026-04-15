import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Briefcase, GraduationCap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";

const routes = [
  {
    icon: Briefcase,
    title: "Skilled Worker Visa",
    badge: "Most Common",
    description: "For those with a job offer from a UK-licensed sponsor. 70-point threshold. Leads to ILR after 5 years.",
    requirements: [
      "Job offer from UKVI-licensed sponsor",
      "Certificate of Sponsorship (CoS)",
      "Salary: £26,200+ or going rate (whichever higher)",
      "English: B1 level minimum",
      "Score 70 points total",
    ],
    processing: "3–8 weeks",
    iLRPath: "5 years",
    link: "/immigration/uk",
  },
  {
    icon: GraduationCap,
    title: "Graduate Route",
    badge: "Post-Study",
    description: "Work in the UK for 2 years (3 for PhD) after graduating from a UK university — no job offer required.",
    requirements: [
      "Graduated from a UK Higher Education Provider",
      "Held a valid Student Visa at time of application",
      "Apply from within the UK",
      "No job offer required",
      "No minimum salary requirement",
    ],
    processing: "8 weeks",
    iLRPath: "Transition to Skilled Worker → 5 years to ILR",
    link: "/immigration/uk",
  },
  {
    icon: Star,
    title: "Global Talent Visa",
    badge: "For Leaders",
    description: "For recognized leaders and exceptional talent in science, engineering, digital technology, arts, and culture.",
    requirements: [
      "Endorsement from approved body (Tech Nation, Royal Society, etc.)",
      "Recognized leader OR exceptional promise",
      "No job offer required",
      "No minimum salary requirement",
    ],
    processing: "3–8 weeks",
    iLRPath: "3 years (exceptional talent) or 5 years (exceptional promise)",
    link: "/immigration/uk",
  },
];

const pointsBreakdown = [
  { criterion: "Job offer from UKVI-licensed sponsor", points: 20, mandatory: true },
  { criterion: "Job at RQF Level 3+ (A-level equivalent)", points: 20, mandatory: true },
  { criterion: "English language at B1 level", points: 10, mandatory: true },
  { criterion: "Salary ≥ £26,200/year or going rate", points: 20, mandatory: false },
  { criterion: "PhD in job-relevant subject", points: 10, mandatory: false },
  { criterion: "Shortage occupation role", points: 20, mandatory: false },
  { criterion: "New entrant + PhD + shortage occupation", points: 20, mandatory: false },
];

const faqs = [
  {
    q: "What is the minimum salary for a UK Skilled Worker Visa in 2026?",
    a: "The minimum salary threshold for most Skilled Worker Visa roles is £26,200/year or the 'going rate' for your specific occupation (whichever is higher). The going rate is the median salary for that occupation. For shortage occupations or new entrants (under 26 or recent graduates), a reduced threshold of £20,960/year may apply. Salary thresholds were last updated in April 2024.",
  },
  {
    q: "Can I bring my family on a UK Skilled Worker Visa?",
    a: "Yes. Your spouse or partner and dependent children can apply to join you in the UK on a Dependant visa. They can work freely in the UK without any restrictions. However, family members must meet the financial requirements (sponsor must earn enough to support them).",
  },
  {
    q: "How do I find a UKVI-licensed sponsor in the UK?",
    a: "The UK Home Office maintains a public Register of Licensed Sponsors on gov.uk. Search by company name or industry sector. Your employer must appear on this list before they can issue a Certificate of Sponsorship. Most large UK employers (NHS, universities, tech companies, banks) are licensed sponsors.",
  },
  {
    q: "Can an Indian student stay in the UK after graduation?",
    a: "Yes. Indian students who graduate from a UK university can apply for the Graduate Route visa: 2 years for bachelor's/master's graduates, 3 years for PhD graduates. No job offer required. After the Graduate Route, switch to a Skilled Worker Visa to continue toward ILR (total 5 years UK residence).",
  },
  {
    q: "How long does it take to get permanent residence (ILR) in the UK?",
    a: "ILR (Indefinite Leave to Remain) is available after 5 continuous years of legal UK residence on a Skilled Worker Visa. Requirements include: passing the Life in the UK test, demonstrating English proficiency, not having been absent from the UK for more than 180 days in any 12-month period, and having no serious criminal convictions.",
  },
];

export default function UKImmigrationPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  return (
    <>
      <Helmet>
        <title>UK Immigration 2026 | Skilled Worker Visa, Graduate Route & ILR — 4 Aces Visa</title>
        <meta name="description" content="Complete guide to UK immigration in 2026. Skilled Worker Visa (70 points, £26,200 salary), Graduate Route, Global Talent Visa, and ILR after 5 years. Expert guidance from 4 Aces Visa." />
        <link rel="canonical" href="https://www.4acesvisa.com/uk/skilled-worker" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedSection>
            <span className="text-5xl mb-4 block">🇬🇧</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              UK Immigration 2026
            </h1>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto mb-8">
              The UK points-based immigration system. Skilled Worker Visa, Graduate Route, and Global Talent — multiple pathways to Indefinite Leave to Remain (ILR).
            </p>
            <div className="flex flex-wrap gap-6 justify-center text-center mb-8">
              {[
                { label: "Points Threshold", value: "70 pts" },
                { label: "Min. Salary", value: "£26,200" },
                { label: "ILR After", value: "5 years" },
                { label: "Post-Study Work", value: "2–3 years" },
              ].map((stat, i) => (
                <div key={i} className="bg-white/20 rounded-xl px-6 py-3">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-blue-100 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                <Link to="/contact">Free UK Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/compare">Compare All Countries</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Routes */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">UK Immigration Routes</h2>
          <p className="text-gray-600 text-center mb-10">Choose the pathway that matches your situation</p>
          <div className="grid md:grid-cols-3 gap-6">
            {routes.map((route, i) => (
              <AnimatedSection key={i}>
                <div className="bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-400 p-6 shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <route.icon className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">{route.badge}</span>
                      <h3 className="font-bold text-gray-900 mt-1">{route.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{route.description}</p>
                  <ul className="space-y-2 flex-1">
                    {route.requirements.map((req, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                    <div className="flex justify-between mb-1">
                      <span>Processing</span>
                      <span className="font-semibold">{route.processing}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ILR Pathway</span>
                      <span className="font-semibold text-right max-w-40">{route.iLRPath}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 70-Point Table */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">The 70-Point Threshold Explained</h2>
          <p className="text-gray-600 text-center mb-8">50 mandatory points + 20 tradeable points = 70 total required</p>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-blue-900 text-white px-6 py-3 grid grid-cols-3 font-semibold text-sm">
              <span className="col-span-2">Criterion</span>
              <span className="text-center">Points</span>
            </div>
            {pointsBreakdown.map((row, i) => (
              <div key={i} className={`px-6 py-3 grid grid-cols-3 text-sm ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <span className={`col-span-2 ${row.mandatory ? "font-semibold text-gray-900" : "text-gray-700"}`}>
                  {row.criterion}
                  {row.mandatory && <span className="ml-2 text-xs text-blue-600 font-normal">(mandatory)</span>}
                </span>
                <span className="text-center font-bold text-blue-700">+{row.points}</span>
              </div>
            ))}
            <div className="bg-blue-50 px-6 py-3 grid grid-cols-3 font-bold text-sm border-t-2 border-blue-200">
              <span className="col-span-2 text-gray-800">Threshold to qualify</span>
              <span className="text-center text-blue-700">70</span>
            </div>
          </div>
        </div>
      </section>

      {/* ILR & Citizenship Timeline */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Path to UK Permanent Residence & Citizenship</h2>
          <p className="text-gray-600 text-center mb-10">The most common journey for Indian skilled workers in the UK</p>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-200"></div>
            {[
              { year: "Year 0", title: "Arrive on Skilled Worker Visa", desc: "Job offer secured, CoS issued, visa approved. Salary: £26,200+. Bring family on Dependant visa." },
              { year: "Years 1–4", title: "Build UK Work Experience", desc: "Progress in your career. Spouse works freely. Children access free state education. NHS healthcare available." },
              { year: "Year 5", title: "Apply for ILR (Indefinite Leave to Remain)", desc: "Pass Life in the UK test, confirm English, prove continuous residence (max 180 days/year absent). Fee: £2,885." },
              { year: "Year 6", title: "Apply for British Citizenship", desc: "1 year after ILR (6 years total in UK). Pass citizenship test. Dual citizenship allowed — no need to renounce Indian passport if India allows dual citizenship." },
            ].map((step, i) => (
              <div key={i} className="relative pl-16 pb-8 last:pb-0">
                <div className="absolute left-3 w-6 h-6 bg-blue-600 rounded-full text-white text-xs flex items-center justify-center font-bold">{i + 1}</div>
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{step.year}</span>
                  <h3 className="font-bold text-gray-900 mt-1 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">UK Immigration FAQ</h2>
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
      <section className="py-16 px-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Need Help with UK Immigration?</h2>
          <p className="text-blue-100 mb-8">4 Aces Visa provides expert guidance on Skilled Worker Visa applications, Graduate Route, and ILR. Free assessment with our UK immigration specialists.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-800 hover:bg-blue-50">
              <Link to="/contact">Free UK Consultation <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/immigration/uk">UK Country Guide</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
