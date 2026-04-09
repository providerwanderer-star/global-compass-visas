import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle, ChevronRight, Users, Award, Globe, Phone,
  BookOpen, Briefcase, Star, TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import EligibilityForm from "@/components/EligibilityForm";
import AnimatedSection from "@/components/AnimatedSection";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const pathways = [
  {
    icon: Briefcase,
    title: "Work Permit to Canada",
    desc: "LMIA-based and employer-specific work permits for Indian professionals. Build Canadian work experience for Express Entry.",
    link: "/india/work-permit-india",
    cta: "Explore Work Permits",
  },
  {
    icon: BookOpen,
    title: "Study Permit for Indians",
    desc: "Study at a Canadian DLI and gain a Post-Graduation Work Permit (PGWP). The fastest pathway to Canadian PR from India.",
    link: "/india/study-permit-india",
    cta: "Explore Study Permits",
  },
  {
    icon: Star,
    title: "Canada PR from India",
    desc: "Express Entry, PNP, and family sponsorship pathways to permanent residency. Thousands of Indians get PR every year.",
    link: "/india/canada-pr-india",
    cta: "Explore PR Pathways",
  },
  {
    icon: TrendingUp,
    title: "Express Entry",
    desc: "Canada's fastest PR pathway. Average CRS cutoff of 440-480. Our experts maximize your score for the best chances.",
    link: "/express-entry",
    cta: "Check My CRS Score",
  },
];

const stats = [
  { value: "80,000+", label: "Indians got Canada PR in 2024" },
  { value: "6 Months", label: "Express Entry processing time" },
  { value: "98%", label: "Our visa success rate" },
  { value: "15,000+", label: "Successful applications" },
];

const faqs = [
  {
    q: "Can Indians apply for Canada PR directly from India?",
    a: "Yes. Indians can apply for Canada PR through Express Entry, Provincial Nominee Programs (PNP), or the Atlantic Immigration Program — all without needing to be in Canada first.",
  },
  {
    q: "What is the minimum CRS score needed for an ITA?",
    a: "Recent Express Entry draws have had cutoffs between 430 and 490 for general draws. A PNP nomination adds +600 points, virtually guaranteeing an ITA regardless of your base score.",
  },
  {
    q: "How long does the Canada immigration process take from India?",
    a: "Express Entry PR takes approximately 6 months after receiving an ITA. Work and study permit applications typically take 4–12 weeks.",
  },
  {
    q: "Do I need a job offer to immigrate to Canada from India?",
    a: "Not necessarily. Express Entry does not require a job offer, although a valid LMIA-supported offer adds 50–200 CRS points. Most Indians successfully immigrate without a pre-arranged job.",
  },
  {
    q: "What IELTS score do I need for Canada immigration from India?",
    a: "The minimum for Express Entry is CLB 7 (approximately IELTS 6.0 in each band). However, scoring CLB 9 (IELTS 7.0+) significantly boosts your CRS score by up to 124 points.",
  },
];

const IndiaHubPage = () => {
  return (
    <div>
      <Helmet>
        <title>Canada Immigration from India 2026 — Work, Study & PR | 4 Aces Visa</title>
        <meta
          name="description"
          content="Canada immigration consultants for Indian nationals. Expert help for work permits, study permits, Express Entry PR & PNP from India. Free assessment. 98% success rate."
        />
        <link rel="canonical" href="https://www.4acesvisa.com/india" />
        <link rel="alternate" hreflang="en-IN" href="https://www.4acesvisa.com/india" />
        <meta property="og:title" content="Canada Immigration from India 2026 | 4 Aces Visa" />
        <meta property="og:description" content="Canada immigration consultants for Indian nationals. Expert help for work permits, study permits, Express Entry PR & PNP from India." />
        <meta property="og:url" content="https://www.4acesvisa.com/india" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                name: "Canada Immigration from India 2026 — 4 Aces Visa",
                description: "Comprehensive Canada immigration guide for Indian nationals covering work permits, study permits, Express Entry, and PR pathways.",
                url: "https://www.4acesvisa.com/india",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.4acesvisa.com/" },
                  { "@type": "ListItem", position: 2, name: "Canada from India", item: "https://www.4acesvisa.com/india" },
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
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-6">
            <Link to="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">Canada from India</span>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 bg-gold/20 text-gold px-3 py-1.5 rounded-full text-xs font-bold mb-4 border border-gold/30">
              <Globe className="h-3.5 w-3.5" />
              80,000+ Indians Got Canada PR in 2024
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
              Canada Immigration
              <span className="text-gold block mt-1">for Indian Nationals</span>
            </h1>
            <p className="text-lg text-primary-foreground/70 mb-8 max-w-2xl">
              Whether you want to work, study, or settle permanently in Canada — we've helped thousands of
              Indians make the move. Get expert guidance tailored to Indian applicants.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#assessment">
                <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold shadow-gold">
                  Free Eligibility Assessment <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="tel:+16478622190">
                <Button size="lg" className="bg-transparent border-2 border-white/40 text-white hover:bg-white/10 font-semibold">
                  <Phone className="mr-2 h-4 w-4" /> Call Our Canada-India Team
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gold py-8">
        <div className="container-narrow mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="text-center"
              >
                <div className="font-display text-2xl md:text-3xl font-bold text-accent-foreground">{s.value}</div>
                <div className="text-xs text-accent-foreground/70 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pathways */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
              Immigration Pathways for Indians
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
              Choose the right pathway based on your profile, goals, and timeline
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pathways.map((p, i) => (
              <motion.div
                key={p.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-card rounded-xl border border-border p-6 hover:shadow-card hover:border-gold/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <p.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.desc}</p>
                <Link to={p.link}>
                  <Button variant="outline" size="sm" className="border-gold/40 text-gold hover:bg-gold/10 font-semibold">
                    {p.cta} <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Canada */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Why Indians Choose Canada
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Canada is the #1 destination for Indian immigrants — and for good reason. With one of the
                largest Indian communities outside India, strong IT and healthcare job markets, and clear
                pathways to permanent residency, Canada offers a quality of life and career growth that's
                hard to match anywhere else.
              </p>
              <ul className="space-y-3">
                {[
                  "1.8 million+ strong Indian-Canadian community",
                  "High demand for IT, engineering & healthcare professionals",
                  "Express Entry: PR in as little as 6 months",
                  "Post-study work permit (PGWP) up to 3 years",
                  "Universal healthcare and world-class education",
                  "Path to citizenship in 3 years of PR",
                  "Family sponsorship — bring parents & spouse",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="bg-primary rounded-2xl p-8 text-center">
                <Users className="h-12 w-12 text-gold mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-primary-foreground mb-3">
                  Top Occupations for Indians in Canada
                </h3>
                <div className="space-y-2">
                  {[
                    { job: "Software Engineer", demand: "Very High" },
                    { job: "Registered Nurse", demand: "Critical" },
                    { job: "Civil Engineer", demand: "High" },
                    { job: "Financial Analyst", demand: "High" },
                    { job: "Data Scientist", demand: "Very High" },
                    { job: "Project Manager (IT)", demand: "High" },
                  ].map((item) => (
                    <div key={item.job} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-2">
                      <span className="text-sm text-primary-foreground">{item.job}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        item.demand === "Critical" ? "bg-destructive/20 text-red-300" :
                        item.demand === "Very High" ? "bg-gold/20 text-gold" :
                        "bg-success/20 text-green-300"
                      }`}>{item.demand}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              How We Help Indians Immigrate to Canada
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Free Assessment", desc: "We evaluate your profile — education, experience, IELTS — and identify the best pathway." },
              { step: "02", title: "Strategy Session", desc: "Our experts create a personalized immigration plan with timelines and success benchmarks." },
              { step: "03", title: "Application Support", desc: "We prepare, review, and submit every document to ensure a complete, error-free application." },
              { step: "04", title: "Visa & Landing", desc: "From approval to landing in Canada — we guide you every step of the way." },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-card rounded-xl border border-border p-5 text-center hover:shadow-card transition-shadow"
              >
                <div className="font-display text-4xl font-bold text-primary/10 mb-2">{s.step}</div>
                <h3 className="font-display text-base font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto max-w-3xl">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions
            </h2>
          </AnimatedSection>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-card rounded-xl border border-border p-6"
              >
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Form */}
      <section className="section-padding section-light" id="assessment">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Free Canada Immigration Assessment for Indians
              </h2>
              <p className="text-muted-foreground mb-6">
                Our Canada-India immigration specialists will review your profile and tell you exactly
                which pathways are available to you — for free, with no obligation.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Personalized pathway recommendation",
                  "CRS score estimate for Express Entry",
                  "Work & study permit eligibility check",
                  "PNP nomination strategy",
                  "Response within 24 hours",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 text-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://wa.me/16478622190?text=Hi%2C%20I%20am%20from%20India%20and%20want%20to%20immigrate%20to%20Canada" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold">
                    WhatsApp Us Now
                  </Button>
                </a>
                <a href="tel:+16478622190">
                  <Button variant="outline" className="border-border">
                    <Phone className="mr-2 h-4 w-4" /> +1 (647) 862-2190
                  </Button>
                </a>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-elevated">
                <h3 className="font-display text-xl font-bold text-foreground mb-4">Get Your Free Assessment</h3>
                <EligibilityForm sourcePage="india-hub" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndiaHubPage;
