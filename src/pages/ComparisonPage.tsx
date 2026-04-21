import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CheckCircle, XCircle, ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import PathwayWidget from "@/components/PathwayWidget";
import ConnectedFooter from "@/components/ConnectedFooter";
import ReturnLoopCard from "@/components/ReturnLoopCard";

const countries = [
  {
    name: "Canada",
    flag: "🇨🇦",
    slug: "canada",
    tagline: "Fastest PR Pathway",
    prTime: "6–8 months",
    prCost: "CAD 2,500–5,000",
    languageReq: "IELTS CLB 7+ (6.0+)",
    jobOffer: "Not required (Express Entry)",
    salary: "CAD 60,000–100,000",
    postStudyWork: "Up to 3 years (PGWP)",
    citizenshipYears: "3 years after PR",
    bestFor: "Fastest PR, families, IT/healthcare",
    color: "red",
    highlights: [
      "Express Entry PR in 6 months",
      "PNP adds +600 CRS (guaranteed ITA)",
      "Largest Indian diaspora (1.4M+)",
      "Free healthcare after landing",
      "Strong IELTS-to-PR pipeline",
    ],
    cons: [
      "Cold winters in most cities",
      "High cost of living (Toronto/Vancouver)",
      "CRS scores can be competitive (430–490)",
    ],
    link: "/immigration/canada",
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    slug: "australia",
    tagline: "High Salaries & Points System",
    prTime: "12–18 months (Subclass 189)",
    prCost: "AUD 4,640+ (fees alone)",
    languageReq: "IELTS 6.0+ (Competent English)",
    jobOffer: "Not required (Subclass 189/190)",
    salary: "AUD 80,000–130,000",
    postStudyWork: "2–4 years (Graduate Visa)",
    citizenshipYears: "4 years after arrival (1 yr as PR)",
    bestFor: "High earners, engineers, healthcare",
    color: "yellow",
    highlights: [
      "Higher average salaries than Canada",
      "Excellent weather and quality of life",
      "Points system (65+ points to apply)",
      "State nomination adds +5 or +15 points",
      "Strong healthcare and education system",
    ],
    cons: [
      "Slower PR (12–18 months vs Canada's 6)",
      "Skills assessment required before applying",
      "High cost of living in Sydney/Melbourne",
      "Stricter occupation list requirements",
    ],
    link: "/immigration/australia",
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    slug: "germany",
    tagline: "EU Gateway & Career Mobility",
    prTime: "21–33 months (Blue Card → PR)",
    prCost: "EUR 1,000–3,000 (visa + process)",
    languageReq: "English for Blue Card; B1 German for fast-track PR",
    jobOffer: "Required for Blue Card; Chancenkarte = no job offer",
    salary: "EUR 45,000–80,000",
    postStudyWork: "18 months (after German graduation)",
    citizenshipYears: "5 years (3 for exceptional)",
    bestFor: "Tech/engineering, EU ambitions, lower costs",
    color: "black",
    highlights: [
      "EU Blue Card → access to all EU countries after 18 months",
      "Chancenkarte allows job search without job offer",
      "Lower cost of living vs Canada/Australia",
      "Strong tech and engineering job market",
      "Fast-track PR in 21 months with B1 German",
    ],
    cons: [
      "German language needed for integration",
      "PR requires degree recognition (anabin check)",
      "Cultural adjustment may be challenging",
      "No immediate PR (settlement permit after 21–33 months)",
    ],
    link: "/immigration/germany",
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    slug: "uk",
    tagline: "Job Offer Route to ILR",
    prTime: "5 years to ILR",
    prCost: "GBP 479–1,284 + IHS (GBP 1,035/year)",
    languageReq: "English B1 (IELTS 4.0+)",
    jobOffer: "Required (UKVI-licensed sponsor)",
    salary: "GBP 26,200–80,000+",
    postStudyWork: "2–3 years (Graduate Route)",
    citizenshipYears: "6 years total (5 in UK + 1 yr ILR)",
    bestFor: "UK job offer holders, post-study workers",
    color: "blue",
    highlights: [
      "Graduate Route: 2 years no-job-offer post-study",
      "Strong English-speaking environment",
      "NHS (healthcare) for residents",
      "London: global finance/tech hub",
      "ILR after 5 years, citizenship after 6",
    ],
    cons: [
      "Job offer required for Skilled Worker Visa",
      "No equivalent of Canada PNP or Australia state nomination",
      "ILR only after 5 years (longest of 4 countries)",
      "Immigration Health Surcharge adds GBP 1,035/year",
      "No EU freedom of movement (post-Brexit)",
    ],
    link: "/immigration/uk",
  },
];

const comparisonTable = [
  { factor: "PR/Settlement Speed", canada: "6 months (Express Entry)", australia: "12–18 months", germany: "21–33 months", uk: "5 years (ILR)" },
  { factor: "Job Offer Required?", canada: "No (Express Entry)", australia: "No (189/190)", germany: "No (Chancenkarte) / Yes (Blue Card)", uk: "Yes (Skilled Worker)" },
  { factor: "Min. Language Test", canada: "IELTS CLB 7", australia: "IELTS 6.0+", germany: "None for visa", uk: "IELTS 4.0+ (B1)" },
  { factor: "Post-Study Work", canada: "1–3 years (PGWP)", australia: "2–4 years", germany: "18 months", uk: "2–3 years (Graduate Route)" },
  { factor: "PR with Indian Degree?", canada: "Yes (WES assessment)", australia: "Yes (skills assessment)", germany: "Yes (anabin recognized)", uk: "Yes (no assessment needed)" },
  { factor: "Family Can Join?", canada: "Yes (immediately with PR)", australia: "Yes (immediately with PR)", germany: "Yes (Blue Card holders)", uk: "Yes (spouse visa)" },
  { factor: "Citizenship Pathway", canada: "3 yrs after PR", australia: "4 yrs from arrival", germany: "5 yrs (3 for exceptional)", uk: "6 yrs total" },
  { factor: "EU Work Rights?", canada: "No", australia: "No", germany: "Yes (after 18 months Blue Card)", uk: "No (post-Brexit)" },
];

const faqs = [
  {
    q: "Which country is best for Canada vs Australia immigration in 2026?",
    a: "Canada is better if you want the fastest PR (6 months via Express Entry), are under 35, or have a family. Australia is better if you're a high-earning professional (engineer, doctor) prioritizing higher salaries and warmer climate. Both have excellent immigration systems for Indian applicants.",
  },
  {
    q: "Can I move to Germany without knowing German?",
    a: "Yes. The EU Blue Card does not require German language proficiency. However, B1 German dramatically speeds up your path to permanent residence (21 months vs 33 months) and improves job prospects. The Chancenkarte has no language requirement for the visa itself, but German skills are crucial for the job search.",
  },
  {
    q: "Which country is easiest for immigration for Indian applicants in 2026?",
    a: "Canada has the most accessible and fastest permanent residency for Indian applicants through Express Entry. With a PNP nomination (+600 CRS), virtually any skilled worker can secure PR. Germany's Chancenkarte is the easiest initial visa to obtain (no job offer, just 6 points). Australia requires a skills assessment and higher points (80–95+).",
  },
  {
    q: "Can I switch from a UK Graduate Route to a Skilled Worker Visa?",
    a: "Yes. The UK Graduate Route is specifically designed to allow this transition. After working for 2–3 years on the Graduate Route, you find a sponsor employer, switch to a Skilled Worker Visa, and continue your 5-year path to ILR.",
  },
  {
    q: "Which country has the most Indian immigrants?",
    a: "Canada has the largest and fastest-growing Indian diaspora — approximately 1.4 million people of Indian origin, making India the #1 source country for Canadian immigration. The UK has approximately 1.6 million people of Indian heritage. Australia has 700,000+ and Germany has 150,000+.",
  },
];

export default function ComparisonPage() {
  return (
    <>
      <Helmet>
        <title>Canada vs Australia vs Germany vs UK Immigration 2026 | Compare Pathways — 4 Aces Visa</title>
        <meta name="description" content="Side-by-side comparison of Canada, Australia, Germany, and UK immigration in 2026. PR speed, cost, salary, language requirements, and which country is best for Indian applicants." />
        <meta property="og:title" content="Canada vs Australia vs Germany vs UK Immigration Comparison 2026" />
        <meta property="og:description" content="Compare all four major immigration destinations side-by-side: PR timeline, cost, salary, language requirements, and best fit for Indian applicants." />
        <link rel="canonical" href="https://www.4acesvisa.com/compare" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          }))
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedSection>
            <span className="bg-blue-600/20 border border-blue-400/30 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
              Immigration Comparison 2026
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Canada vs Australia vs Germany vs UK<br />
              <span className="text-blue-400">Which Country is Best for You?</span>
            </h1>
            <p className="text-slate-300 text-lg max-w-3xl mx-auto mb-8">
              A complete side-by-side comparison of the world's top immigration destinations in 2026 — PR speed, costs, salary, language requirements, and which suits your profile best.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link to="/quiz">Find My Best Country <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Link to="/contact">Free Assessment</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Country Cards */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Country Profiles</h2>
          <p className="text-gray-600 text-center mb-12">Key facts for each immigration destination at a glance</p>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {countries.map((country) => (
              <AnimatedSection key={country.slug}>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{country.flag}</span>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900">{country.name}</h3>
                      <span className="text-sm text-blue-600 font-medium">{country.tagline}</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm flex-1">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">PR/Settlement</span>
                      <span className="font-semibold text-gray-800 text-right max-w-32">{country.prTime}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Job Offer?</span>
                      <span className="font-semibold text-gray-800 text-right max-w-32">{country.jobOffer}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Language</span>
                      <span className="font-semibold text-gray-800 text-right max-w-32">{country.languageReq}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Salary Range</span>
                      <span className="font-semibold text-gray-800 text-right max-w-32">{country.salary}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Post-Study Work</span>
                      <span className="font-semibold text-gray-800 text-right max-w-32">{country.postStudyWork}</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-gray-500">Citizenship</span>
                      <span className="font-semibold text-gray-800 text-right max-w-32">{country.citizenshipYears}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-semibold text-green-700 mb-2">Pros:</p>
                    <ul className="space-y-1 mb-3">
                      {country.highlights.slice(0, 3).map((h, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-gray-700">
                          <CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs font-semibold text-red-600 mb-2">Cons:</p>
                    <ul className="space-y-1 mb-4">
                      {country.cons.slice(0, 2).map((c, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-gray-700">
                          <XCircle className="h-3.5 w-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                    <Button asChild size="sm" variant="outline" className="w-full text-xs">
                      <Link to={country.link}>Explore {country.name} <ArrowRight className="ml-1 h-3 w-3" /></Link>
                    </Button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Side-by-Side Comparison</h2>
          <p className="text-gray-600 text-center mb-10">Every key immigration factor compared across all four countries</p>
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left p-4 font-semibold w-40">Factor</th>
                  <th className="text-left p-4 font-semibold">🇨🇦 Canada</th>
                  <th className="text-left p-4 font-semibold">🇦🇺 Australia</th>
                  <th className="text-left p-4 font-semibold">🇩🇪 Germany</th>
                  <th className="text-left p-4 font-semibold">🇬🇧 UK</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-4 font-semibold text-gray-700 border-r border-gray-200">{row.factor}</td>
                    <td className="p-4 text-gray-700">{row.canada}</td>
                    <td className="p-4 text-gray-700">{row.australia}</td>
                    <td className="p-4 text-gray-700">{row.germany}</td>
                    <td className="p-4 text-gray-700">{row.uk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Which Country For You */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Which Country is Right for You?</h2>
          <p className="text-gray-600 mb-10">Based on profile, these are our expert recommendations</p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              { icon: "🎯", title: "Choose Canada if…", points: ["You want permanent residency in 6–8 months", "You have IELTS 6.0+ and skilled work experience", "You're under 40 with CLB 7+ and 1+ year skilled work", "You have family in Canada (sponsor or join)", "You want the fastest path to citizenship (3 years after PR)"] },
              { icon: "☀️", title: "Choose Australia if…", points: ["You prioritize high salaries (AUD 80,000–130,000)", "You're in STEM, healthcare, or engineering", "You're aged 25–32 with 90+ points on the Australian points test", "You want a warmer climate and outdoor lifestyle", "You're okay with a 12–18 month PR timeline"] },
              { icon: "🇪🇺", title: "Choose Germany if…", points: ["You want access to all EU countries for your career", "You're in tech, engineering, or healthcare with a job offer EUR 39,682+", "You're willing to learn German (B1 for fast-track PR)", "You want lower cost of living compared to Canada/Australia", "You want EU Blue Card mobility rights after 18 months"] },
              { icon: "🎓", title: "Choose UK if…", points: ["You've studied or plan to study in the UK (Graduate Route)", "You have a UK job offer from a UKVI-licensed employer", "You want access to London's global finance/tech ecosystem", "Your employer is sponsoring your Skilled Worker Visa", "You're comfortable with a 5-year ILR pathway"] },
            ].map((rec, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{rec.icon}</span>
                  <h3 className="font-bold text-xl text-gray-900">{rec.title}</h3>
                </div>
                <ul className="space-y-2">
                  {rec.points.map((p, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <TrendingUp className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-200 pb-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Not Sure Which Country is Right for You?</h2>
          <p className="text-blue-100 mb-8">Take our 3-minute immigration quiz or book a free consultation. Our experts have helped 15,000+ clients choose the best pathway.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
              <Link to="/quiz">Take Immigration Quiz <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/contact">Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
      <PathwayWidget />
      <ReturnLoopCard />
      <ConnectedFooter
        tool={{ label: "CRS Score Calculator", href: "/crs-calculator" }}
        hub={{ label: "Canada Immigration Hub", href: "/immigration/canada" }}
        funnel={{ label: "Find your country", href: "/quiz" }}
      />
    </>
  );
}
