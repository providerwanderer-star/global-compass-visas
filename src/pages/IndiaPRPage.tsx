import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle, ChevronRight, Star, TrendingUp,
  Users, Award, Zap, Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import EligibilityForm from "@/components/EligibilityForm";
import AnimatedSection from "@/components/AnimatedSection";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const prPathways = [
  {
    icon: Zap,
    title: "Express Entry",
    badge: "Fastest — 6 Months",
    desc: "Canada's flagship PR system. Score 430+ CRS points to receive an Invitation to Apply. A PNP nomination adds 600 points — virtually guaranteed ITA.",
    link: "/express-entry",
    pros: ["Fastest processing (6 months)", "No job offer required", "3 streams: FSW, FST, CEC"],
  },
  {
    icon: Star,
    title: "Provincial Nominee Program (PNP)",
    badge: "Best for Lower CRS",
    desc: "Individual provinces like Ontario, BC, and Alberta have their own immigration programs. A provincial nomination adds 600 CRS points to your Express Entry profile.",
    link: "/services/provincial-nominee-program",
    pros: ["+600 CRS points on nomination", "Targets specific occupations", "Multiple province options"],
  },
  {
    icon: Users,
    title: "Family Sponsorship",
    badge: "Already Have Family in Canada",
    desc: "Canadian citizens and PRs can sponsor spouses, children, and parents. Spouse sponsorship processing is approximately 12 months.",
    link: "/services/family-sponsorship",
    pros: ["No CRS score required", "Spouse sponsorship: ~12 months", "Pathway to citizenship"],
  },
  {
    icon: TrendingUp,
    title: "Canadian Experience Class (CEC)",
    badge: "For PGWP Holders",
    desc: "If you're already working in Canada on a PGWP or work permit, CEC rewards your Canadian work experience with a direct Express Entry pathway.",
    link: "/express-entry",
    pros: ["1 year Canadian experience qualifies", "No foreign experience needed", "Strong CRS score with CLB 7+"],
  },
];

const crsBoostTips = [
  { tip: "Achieve CLB 9 in IELTS", impact: "+50 to +124 CRS points", icon: Award },
  { tip: "Get a Canadian job offer (LMIA)", impact: "+50 to +200 CRS points", icon: Zap },
  { tip: "Apply for a PNP nomination", impact: "+600 CRS points", icon: Star },
  { tip: "Complete education in Canada", impact: "+15 to +30 CRS points", icon: TrendingUp },
  { tip: "Earn a Canadian degree/diploma", impact: "+up to 150 CRS points", icon: Award },
  { tip: "Gain 3+ years skilled work experience", impact: "+up to 80 CRS points", icon: Users },
];

const faqs = [
  {
    q: "How many Indians get Canada PR every year?",
    a: "In 2024, approximately 80,000-85,000 Indians received Canadian permanent residency — making India the #1 source country for Canadian immigration.",
  },
  {
    q: "What is the minimum CRS score needed for PR from India?",
    a: "Recent Express Entry draws have had cutoffs between 430-490 for general draws. However, with a PNP nomination (+600 points), virtually any base CRS score qualifies. Our experts can identify PNP programs that match your profile.",
  },
  {
    q: "Can I apply for Canada PR while still living in India?",
    a: "Yes. Federal Skilled Worker (FSW) stream of Express Entry is specifically for candidates outside Canada. You don't need to be in Canada or have Canadian work experience for FSW.",
  },
  {
    q: "How long does the entire Canada PR process take from India?",
    a: "After receiving an Invitation to Apply (ITA), PR processing takes approximately 6 months. Total time from creating your Express Entry profile to landing in Canada is typically 8-18 months depending on ITA wait times.",
  },
  {
    q: "What IELTS score maximizes my CRS for Express Entry?",
    a: "Scoring CLB 10 in all four bands (approximately IELTS 8.5 Listening, 8.0 Reading, 7.5 Writing, 7.5 Speaking) gives you the maximum language points. Even improving from CLB 8 to CLB 9 adds approximately 50+ CRS points.",
  },
  {
    q: "Can I bring my family with me to Canada on PR?",
    a: "Yes. When you apply for PR through Express Entry, you can include your spouse/common-law partner and dependent children (under 22) in the same application. They receive PR simultaneously.",
  },
];

const IndiaPRPage = () => {
  return (
    <div>
      <Helmet>
        <title>Canada PR from India 2026 — Express Entry & PNP Guide | 4 Aces Visa</title>
        <meta
          name="description"
          content="Canada permanent residency from India in 2026. Complete guide to Express Entry, PNP, and family sponsorship pathways. 80,000+ Indians got PR in 2024. Free CRS assessment."
        />
        <link rel="canonical" href="https://www.4acesvisa.com/india/canada-pr-india" />
        <link rel="alternate" hreflang="en-IN" href="https://www.4acesvisa.com/india/canada-pr-india" />
        <meta property="og:title" content="Canada PR from India 2026 — Express Entry & PNP | 4 Aces Visa" />
        <meta property="og:description" content="Complete guide to Canada permanent residency from India. Express Entry, PNP, family sponsorship pathways. 80,000+ Indians got PR in 2024." />
        <meta property="og:url" content="https://www.4acesvisa.com/india/canada-pr-india" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                name: "Canada PR from India 2026 — 4 Aces Visa",
                description: "Complete guide to Canadian permanent residency for Indian nationals, covering Express Entry, PNP, and family sponsorship pathways.",
                url: "https://www.4acesvisa.com/india/canada-pr-india",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.4acesvisa.com/" },
                  { "@type": "ListItem", position: 2, name: "Canada from India", item: "https://www.4acesvisa.com/india" },
                  { "@type": "ListItem", position: 3, name: "Canada PR from India", item: "https://www.4acesvisa.com/india/canada-pr-india" },
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
            <span className="text-gold">Canada PR</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-gold/20 text-gold px-3 py-1.5 rounded-full text-xs font-bold mb-4 border border-gold/30">
              <TrendingUp className="h-3.5 w-3.5" />
              80,000+ Indians Got Canada PR in 2024
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
              Canada Permanent Residency
              <span className="text-gold block mt-1">for Indians — 2026 Guide</span>
            </h1>
            <p className="text-lg text-primary-foreground/70 mb-8 max-w-2xl">
              India is Canada's #1 source of immigrants. Whether through Express Entry, PNP, or
              family sponsorship, our experts know exactly how to get you the invitation to apply.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#assessment">
                <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold shadow-gold">
                  Get Free CRS Assessment <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <Link to="/crs-calculator">
                <Button size="lg" className="bg-transparent border-2 border-white/40 text-white hover:bg-white/10 font-semibold">
                  Calculate My CRS Score
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gold py-6">
        <div className="container-narrow mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: "80,000+", label: "Indians got PR in 2024" },
              { value: "6 Months", label: "Express Entry processing" },
              { value: "+600", label: "CRS points with PNP" },
              { value: "3 Years", label: "To Canadian citizenship" },
            ].map((s, i) => (
              <motion.div key={s.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <div className="font-display text-xl md:text-2xl font-bold text-accent-foreground">{s.value}</div>
                <div className="text-xs text-accent-foreground/70 mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PR Pathways */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
              Canada PR Pathways for Indians
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
              Multiple routes to permanent residency — we find the best one for your profile
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prPathways.map((p, i) => (
              <motion.div
                key={p.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-card rounded-xl border border-border p-6 hover:shadow-card hover:border-gold/30 transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                    <p.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground">{p.title}</h3>
                    <span className="text-xs bg-gold/10 text-gold px-2 py-0.5 rounded-full font-semibold">{p.badge}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.desc}</p>
                <div className="space-y-1.5 mb-4">
                  {p.pros.map((pro) => (
                    <div key={pro} className="flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-gold mt-0.5 shrink-0" />
                      <span className="text-xs text-foreground">{pro}</span>
                    </div>
                  ))}
                </div>
                <Link to={p.link}>
                  <Button variant="outline" size="sm" className="border-gold/40 text-gold hover:bg-gold/10 font-semibold">
                    Learn More <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CRS Boost Tips */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
              How Indians Can Boost Their CRS Score
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
              Strategic improvements that significantly increase your Express Entry score
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {crsBoostTips.map((tip, i) => (
              <motion.div
                key={tip.tip}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-card rounded-xl border border-border p-5 hover:shadow-card hover:border-gold/30 transition-all"
              >
                <tip.icon className="h-6 w-6 text-gold mb-3" />
                <h3 className="font-semibold text-foreground text-sm mb-1">{tip.tip}</h3>
                <span className="text-xs font-bold text-gold">{tip.impact}</span>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/crs-calculator">
              <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold shadow-gold">
                Calculate My CRS Score <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Express Entry Timeline */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto max-w-3xl">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
              Express Entry Timeline from India to Canada
            </h2>
          </AnimatedSection>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gold/20" />
            {[
              { time: "Day 1-14", title: "Profile Creation & CRS Assessment", desc: "Create Express Entry profile, get language test (IELTS), get ECA for credentials." },
              { time: "Week 2-8", title: "Enter the Express Entry Pool", desc: "Submit profile, receive CRS score. Begin waiting for an Invitation to Apply." },
              { time: "Week 8 – Month 6", title: "Receive ITA", desc: "Receive your Invitation to Apply. You have 60 days to submit your full PR application." },
              { time: "Month 6-12", title: "Submit PR Application", desc: "Submit all documents, biometrics, medical exam. IRCC processes within 6 months." },
              { time: "Month 12-18", title: "Receive PR & Land in Canada", desc: "Receive Confirmation of PR, COPR document. Book your landing flight to Canada!" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="relative flex gap-6 mb-6"
              >
                <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center shrink-0 z-10 text-xs font-bold text-accent-foreground text-center leading-tight">
                  {i + 1}
                </div>
                <div className="bg-card rounded-xl border border-border p-4 flex-1">
                  <span className="text-xs font-bold text-gold mb-1 block">{item.time}</span>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto max-w-3xl">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">FAQs — Canada PR for Indians</h2>
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
                Free Canada PR Assessment for Indians
              </h2>
              <p className="text-primary-foreground/70 mb-6">
                Our Indian immigration specialists will calculate your CRS score, identify the best
                PR pathway for your profile, and give you a realistic timeline — for free.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "CRS score calculation",
                  "Best PR pathway for your profile",
                  "PNP options analysis",
                  "IELTS improvement strategy",
                  "Complete immigration roadmap",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-primary-foreground">
                    <CheckCircle className="h-4 w-4 text-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <a href="https://wa.me/16478622190?text=Hi%2C%20I%20want%20to%20get%20Canada%20PR%20from%20India" target="_blank" rel="noopener noreferrer">
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
                <EligibilityForm sourcePage="india-canada-pr" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndiaPRPage;
