import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle, ChevronRight, Briefcase, TrendingUp,
  Clock, Phone, Star, Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import EligibilityForm from "@/components/EligibilityForm";
import AnimatedSection from "@/components/AnimatedSection";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const permitTypes = [
  {
    icon: Shield,
    title: "LMIA Work Permit",
    badge: "Best for PR",
    desc: "Employer gets a Labour Market Impact Assessment proving no Canadian is available. Adds 50-200 CRS points to your Express Entry score — the strongest PR pathway.",
    requirements: ["Valid job offer with LMIA", "Educational credentials assessment", "IELTS CLB 5+", "Relevant work experience"],
  },
  {
    icon: Briefcase,
    title: "CUSMA / USMCA Permit",
    badge: "For Professionals",
    desc: "For professionals in specific occupations under the Canada-US-Mexico Agreement. Engineers, accountants, and IT professionals are commonly eligible.",
    requirements: ["Citizenship of India is NOT eligible (US/Mexico only)", "Applicable for those with US work authorization", "Specific NOC occupation list", "Post-secondary degree"],
  },
  {
    icon: TrendingUp,
    title: "Intra-Company Transfer",
    badge: "Multinational Route",
    desc: "If your current employer has a Canadian office, you may be transferred as a manager, executive, or specialized knowledge worker without an LMIA.",
    requirements: ["1+ year with current employer", "Manager, executive, or specialized role", "Canadian entity must exist", "No LMIA required"],
  },
  {
    icon: Star,
    title: "Global Talent Stream",
    badge: "Tech Fast-Track",
    desc: "Canada's fastest work permit for tech workers — 2-week processing. IT companies can hire Indian tech professionals under this LMIA-exempt program.",
    requirements: ["NOC TEER 0 or 1 occupation", "Designated employer partnership", "Highly specialized tech role", "Degree or equivalent experience"],
  },
];

const inDemandJobs = [
  { noc: "21231", title: "Software Engineer", salary: "CAD $95,000–$140,000", demand: "Critical" },
  { noc: "31301", title: "Registered Nurse", salary: "CAD $75,000–$95,000", demand: "Critical" },
  { noc: "21311", title: "Civil Engineer", salary: "CAD $80,000–$110,000", demand: "High" },
  { noc: "11101", title: "Financial Analyst", salary: "CAD $70,000–$100,000", demand: "High" },
  { noc: "21223", title: "Data Scientist / ML", salary: "CAD $100,000–$150,000", demand: "Very High" },
  { noc: "10019", title: "IT Project Manager", salary: "CAD $90,000–$130,000", demand: "High" },
];

const faqs = [
  {
    q: "Can Indians apply for a Canada work permit without a job offer?",
    a: "Most Canadian work permits require a job offer. However, if you're already in Canada on a valid permit or studying, you may be eligible for an Open Work Permit. Express Entry PR does not require a job offer.",
  },
  {
    q: "How does a Canadian work permit help with PR?",
    a: "Canadian work experience adds points to your CRS score (up to 80 points for 3+ years). A valid LMIA-supported job offer adds an additional 50-200 CRS points, significantly improving your Express Entry chances.",
  },
  {
    q: "What is the processing time for a work permit from India?",
    a: "LMIA-based work permits typically take 4-8 weeks to process. Global Talent Stream permits can be processed in as little as 2 weeks. LMIA applications at ESDC take an additional 2-5 weeks.",
  },
  {
    q: "Can my spouse work on my work permit?",
    a: "If you hold a valid work permit under TEER 0 or 1 categories (most professional roles), your spouse/common-law partner qualifies for an Open Work Permit and can work for any Canadian employer.",
  },
  {
    q: "What IELTS score do I need for a Canada work permit?",
    a: "IELTS is not required for all work permit types. However, if your employer's LMIA requires language testing, CLB 5 (approximately IELTS 5.0 in each band) is the typical minimum. Higher scores boost CRS for eventual PR.",
  },
];

const IndiaWorkPermitPage = () => {
  return (
    <div>
      <Helmet>
        <title>Canada Work Permit for Indians 2026 — LMIA & PR Pathway | 4 Aces Visa</title>
        <meta
          name="description"
          content="Canada work permit for Indian professionals in 2026. LMIA work permits, Global Talent Stream, and employer-specific permits. Build Canadian experience for PR. Free assessment."
        />
        <link rel="canonical" href="https://www.4acesvisa.com/india/work-permit-india" />
        <link rel="alternate" hrefLang="en-IN" href="https://www.4acesvisa.com/india/work-permit-india" />
        <meta property="og:title" content="Canada Work Permit for Indians 2026 | 4 Aces Visa" />
        <meta property="og:description" content="Canada work permit for Indian professionals. LMIA permits, Global Talent Stream, and PR pathway guidance. Free expert assessment." />
        <meta property="og:url" content="https://www.4acesvisa.com/india/work-permit-india" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                name: "Canada Work Permit for Indians 2026 — 4 Aces Visa",
                description: "Complete guide to Canadian work permits for Indian professionals, covering LMIA, Global Talent Stream, and PR pathway.",
                url: "https://www.4acesvisa.com/india/work-permit-india",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.4acesvisa.com/" },
                  { "@type": "ListItem", position: 2, name: "Canada from India", item: "https://www.4acesvisa.com/india" },
                  { "@type": "ListItem", position: 3, name: "Work Permit for Indians", item: "https://www.4acesvisa.com/india/work-permit-india" },
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
            <span className="text-gold">Work Permit</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-gold/20 text-gold px-3 py-1.5 rounded-full text-xs font-bold mb-4 border border-gold/30">
              <Briefcase className="h-3.5 w-3.5" />
              Work in Canada → Build Experience → Get PR
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
              Canada Work Permit
              <span className="text-gold block mt-1">for Indian Professionals</span>
            </h1>
            <p className="text-lg text-primary-foreground/70 mb-8 max-w-2xl">
              A Canadian work permit is not just a job — it's the fastest way to build the Canadian
              work experience that propels your Express Entry score toward permanent residency.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#assessment">
                <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold shadow-gold">
                  Check My Eligibility <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="tel:+16478622190">
                <Button size="lg" className="bg-transparent border-2 border-white/40 text-white hover:bg-white/10 font-semibold">
                  <Phone className="mr-2 h-4 w-4" /> Speak to an Expert
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
              { value: "4-8 Weeks", label: "Work permit processing" },
              { value: "+200 CRS", label: "With valid LMIA job offer" },
              { value: "2 Weeks", label: "Global Talent Stream" },
              { value: "3 Years", label: "Canadian experience for PR" },
            ].map((s, i) => (
              <motion.div key={s.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <div className="font-display text-xl md:text-2xl font-bold text-accent-foreground">{s.value}</div>
                <div className="text-xs text-accent-foreground/70 mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Permit Types */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
              Work Permit Types for Indian Professionals
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
              Choose the right permit based on your occupation, employer, and immigration goals
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {permitTypes.map((p, i) => (
              <motion.div
                key={p.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-card rounded-xl border border-border p-6 hover:shadow-card hover:border-gold/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                    <p.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground">{p.title}</h3>
                    <span className="text-xs bg-gold/10 text-gold px-2 py-0.5 rounded-full font-semibold">{p.badge}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.desc}</p>
                <div className="space-y-1.5">
                  {p.requirements.map((req) => (
                    <div key={req} className="flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-gold mt-0.5 shrink-0" />
                      <span className="text-xs text-foreground">{req}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* In-demand Jobs */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
              High-Demand Occupations for Indians in Canada
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
              These occupations consistently appear in LMIA approvals and Express Entry draws
            </p>
          </AnimatedSection>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary/80">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">NOC Code</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Occupation</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Avg Salary</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Demand</th>
                </tr>
              </thead>
              <tbody>
                {inDemandJobs.map((job, i) => (
                  <motion.tr
                    key={job.noc}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i}
                    className="border-t border-border hover:bg-secondary/30 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-muted-foreground font-mono">{job.noc}</td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{job.title}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{job.salary}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        job.demand === "Critical" ? "bg-destructive/10 text-destructive" :
                        job.demand === "Very High" ? "bg-gold/10 text-gold-dark" :
                        "bg-success/10 text-success"
                      }`}>{job.demand}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Document Checklist */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto max-w-2xl">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
              Work Permit Document Checklist for Indians
            </h2>
          </AnimatedSection>
          <div className="bg-card rounded-xl border border-border p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Valid Indian passport (6+ months validity)",
                "Job offer letter from Canadian employer",
                "LMIA approval number (if applicable)",
                "Educational certificates (WES assessed)",
                "Work experience reference letters",
                "IELTS/language test results",
                "Passport-size photographs",
                "Biometrics enrollment",
                "Medical examination (if required)",
                "Police Clearance Certificate (PCC from India)",
                "Proof of ties to home country",
                "Digital photo meeting IRCC specifications",
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
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto max-w-3xl">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">FAQs — Work Permit for Indians</h2>
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
                Free Work Permit Assessment for Indians
              </h2>
              <p className="text-primary-foreground/70 mb-6">
                Our work permit specialists will identify the best pathway for your occupation and help
                you build the Canadian experience that leads to permanent residency.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Work permit type recommendation",
                  "LMIA employer connection support",
                  "NOC code verification",
                  "CRS score impact analysis",
                  "PR strategy from work permit",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-primary-foreground">
                    <CheckCircle className="h-4 w-4 text-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <a href="https://wa.me/16478622190?text=Hi%2C%20I%20want%20to%20know%20about%20Canada%20Work%20Permit%20from%20India" target="_blank" rel="noopener noreferrer">
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
                <EligibilityForm sourcePage="india-work-permit" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndiaWorkPermitPage;
