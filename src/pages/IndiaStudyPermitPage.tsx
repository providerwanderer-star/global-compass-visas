import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle, ChevronRight, BookOpen, GraduationCap,
  Clock, DollarSign, Phone, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import EligibilityForm from "@/components/EligibilityForm";
import AnimatedSection from "@/components/AnimatedSection";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const topUniversities = [
  { name: "University of Toronto", rank: "#21 QS World", programs: "Engineering, MBA, Computer Science" },
  { name: "UBC Vancouver", rank: "#34 QS World", programs: "Medicine, Business, Technology" },
  { name: "McGill University", rank: "#46 QS World", programs: "Law, Medicine, Science" },
  { name: "University of Waterloo", rank: "Top 5 CS Globally", programs: "Computer Science, Engineering" },
  { name: "York University (Toronto)", rank: "Ontario's Largest", programs: "Business, IT, Social Work" },
  { name: "Conestoga College", rank: "Top Ontario College", programs: "IT, Business, Healthcare" },
];

const steps = [
  { step: "01", title: "Choose a DLI", desc: "Select a Designated Learning Institution. Only DLI students get a study permit and PGWP eligibility.", time: "Month 1-2" },
  { step: "02", title: "Apply & Get LOA", desc: "Apply to your chosen institution. Receive your Letter of Acceptance (LOA) — this is needed for your study permit.", time: "Month 2-4" },
  { step: "03", title: "Apply for Study Permit", desc: "Submit your study permit application with your LOA, financial proof, and passport. Biometrics required.", time: "Month 4-6" },
  { step: "04", title: "Study in Canada", desc: "Arrive, study, and work part-time (24 hrs/week on or off campus). Your spouse gets an open work permit.", time: "Year 1-4" },
  { step: "05", title: "Get Your PGWP", desc: "Graduate and apply for a Post-Graduation Work Permit valid for up to 3 years. Build Canadian work experience for PR.", time: "After Graduation" },
  { step: "06", title: "Apply for PR", desc: "Use Canadian work experience + education to apply through Express Entry or PNP. Most PGWP holders qualify.", time: "1-2 Years After PGWP" },
];

const faqs = [
  {
    q: "Can Indian students work while studying in Canada?",
    a: "Yes. Since November 2024, international students can work up to 24 hours per week off-campus during academic sessions and unlimited hours during scheduled breaks.",
  },
  {
    q: "What is the PGWP and how long does it last?",
    a: "The Post-Graduation Work Permit allows graduates to work in Canada for up to 3 years (for programs 2+ years long) or for the duration of their program (for shorter programs). It's a direct pathway to PR.",
  },
  {
    q: "What financial proof do I need for a Canada study permit from India?",
    a: "You need to show approximately CAD $20,635 per year for living expenses, plus your first year's tuition. Bank statements, FDs, or education loans are all accepted.",
  },
  {
    q: "How long does a Canada study permit take from India?",
    a: "Online applications typically take 4-8 weeks. Processing times can vary by season. We recommend applying at least 3-4 months before your program starts.",
  },
  {
    q: "Does my IELTS score affect study permit approval?",
    a: "IELTS is primarily required for university/college admission. Most institutions require a minimum overall band of 6.0-6.5. A higher score opens more program options.",
  },
];

const IndiaStudyPermitPage = () => {
  return (
    <div>
      <Helmet>
        <title>Canada Study Permit for Indians 2026 — PGWP & PR Pathway | 4 Aces Visa</title>
        <meta
          name="description"
          content="Study in Canada from India in 2026. Complete guide to study permit application, top universities, financial requirements, and PGWP to PR pathway. Free assessment."
        />
        <link rel="canonical" href="https://www.4acesvisa.com/india/study-permit-india" />
        <link rel="alternate" hrefLang="en-IN" href="https://www.4acesvisa.com/india/study-permit-india" />
        <meta property="og:title" content="Canada Study Permit for Indians 2026 | 4 Aces Visa" />
        <meta property="og:description" content="Study in Canada from India. Complete guide to study permit, PGWP and PR pathway. Free assessment by expert consultants." />
        <meta property="og:url" content="https://www.4acesvisa.com/india/study-permit-india" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                name: "Canada Study Permit for Indians 2026 — 4 Aces Visa",
                description: "Complete guide to studying in Canada from India, including study permit application, top institutions, and PGWP to PR pathway.",
                url: "https://www.4acesvisa.com/india/study-permit-india",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.4acesvisa.com/" },
                  { "@type": "ListItem", position: 2, name: "Canada from India", item: "https://www.4acesvisa.com/india" },
                  { "@type": "ListItem", position: 3, name: "Study Permit for Indians", item: "https://www.4acesvisa.com/india/study-permit-india" },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.q,
                  acceptedAnswer: { "@type": "Answer", text: faq.a },
                })),
              },
            ],
          })}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="relative bg-primary pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--gold)/0.15),transparent_60%)]" />
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-6 flex-wrap">
            <Link to="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/india" className="hover:text-gold">Canada from India</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">Study Permit</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-gold/20 text-gold px-3 py-1.5 rounded-full text-xs font-bold mb-4 border border-gold/30">
              <GraduationCap className="h-3.5 w-3.5" />
              Study → PGWP → PR — The Fastest Route from India
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
              Canada Study Permit
              <span className="text-gold block mt-1">for Indian Students</span>
            </h1>
            <p className="text-lg text-primary-foreground/70 mb-8 max-w-2xl">
              Study at a world-class Canadian institution, work part-time, get a 3-year PGWP, and
              then apply for permanent residency — all while building your career in Canada.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#assessment">
                <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold shadow-gold">
                  Free Study Assessment <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="https://wa.me/16478622190?text=Hi%2C%20I%20want%20to%20know%20about%20Canada%20Study%20Permit%20from%20India" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-transparent border-2 border-white/40 text-white hover:bg-white/10 font-semibold">
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="bg-gold py-6">
        <div className="container-narrow mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: "4-8 Weeks", label: "Study permit processing" },
              { value: "3 Years", label: "PGWP after 2yr program" },
              { value: "24 hrs/week", label: "Work while studying" },
              { value: "6 Months", label: "PR after PGWP (Express Entry)" },
            ].map((s, i) => (
              <motion.div key={s.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <div className="font-display text-xl md:text-2xl font-bold text-accent-foreground">{s.value}</div>
                <div className="text-xs text-accent-foreground/70 mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-Step */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
              Study in Canada: Step-by-Step from India
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
              From choosing your institution to landing in Canada as a permanent resident
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="relative bg-card rounded-xl border border-border p-6 hover:shadow-card transition-shadow"
              >
                <span className="absolute -top-3 -left-2 bg-gold text-accent-foreground text-xs font-bold px-2.5 py-1 rounded-full">
                  {s.time}
                </span>
                <div className="font-display text-4xl font-bold text-primary/10 mb-2">{s.step}</div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Universities */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
              Top Canadian Institutions for Indian Students
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
              All PGWP-eligible institutions with strong Indian student communities
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topUniversities.map((uni, i) => (
              <motion.div
                key={uni.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-card rounded-xl border border-border p-5 hover:border-gold/30 hover:shadow-card transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <BookOpen className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{uni.name}</h3>
                    <span className="text-xs text-gold font-medium">{uni.rank}</span>
                    <p className="text-xs text-muted-foreground mt-1">{uni.programs}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Requirements */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto max-w-3xl">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              Financial Requirements for Indian Students
            </h2>
          </AnimatedSection>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary/80">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Expense</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Annual Cost (CAD)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { item: "Tuition (University)", cost: "$15,000 – $35,000" },
                  { item: "Tuition (College)", cost: "$8,000 – $18,000" },
                  { item: "Living expenses (IRCC minimum)", cost: "$20,635" },
                  { item: "Health insurance", cost: "$600 – $1,200" },
                  { item: "Study permit fee", cost: "$150 (one-time)" },
                  { item: "Biometrics", cost: "$85 (one-time)" },
                ].map((row, i) => (
                  <tr key={row.item} className={`border-t border-border ${i % 2 === 0 ? "" : "bg-secondary/20"}`}>
                    <td className="px-4 py-3 text-sm text-foreground">{row.item}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gold">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 bg-gold/10 border border-gold/20 rounded-xl p-4">
            <p className="text-sm text-foreground flex items-start gap-2">
              <DollarSign className="h-4 w-4 text-gold mt-0.5 shrink-0" />
              <span><strong>Education loans accepted:</strong> Indian education loans from nationalized banks (SBI, PNB, etc.) and NBFCs are accepted as proof of funds for study permit applications.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto max-w-2xl">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
              Study Permit Document Checklist for Indians
            </h2>
          </AnimatedSection>
          <div className="bg-card rounded-xl border border-border p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Valid Indian passport (6+ months validity)",
                "Letter of Acceptance from a Canadian DLI",
                "Proof of financial support (CAD $20,635+)",
                "IELTS/TOEFL score report",
                "Educational transcripts & certificates",
                "Statement of Purpose",
                "Passport-size photographs",
                "Biometrics enrollment",
                "Medical examination (if required)",
                "Police Clearance Certificate (PCC)",
                "Proof of ties to India (employment, property)",
                "Bank statements (last 6 months)",
              ].map((doc) => (
                <div key={doc} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto max-w-3xl">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">FAQs — Study Permit for Indians</h2>
          </AnimatedSection>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={faq.q} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-semibold text-foreground mb-2 flex items-start gap-2">
                  <Star className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed pl-6">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary" id="assessment">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection>
              <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
                Free Canada Study Permit Assessment
              </h2>
              <p className="text-primary-foreground/70 mb-6">
                Our study visa specialists will review your profile, recommend the best institutions
                for your budget and career goals, and guide you through the entire application.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "University & college shortlisting",
                  "Scholarship identification",
                  "Study permit document review",
                  "PGWP & PR strategy planning",
                  "Response within 24 hours",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-primary-foreground">
                    <CheckCircle className="h-4 w-4 text-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <a href="https://wa.me/16478622190?text=Hi%2C%20I%20want%20to%20know%20about%20Canada%20Study%20Permit%20from%20India" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold">WhatsApp Us</Button>
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
                <EligibilityForm sourcePage="india-study-permit" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndiaStudyPermitPage;
