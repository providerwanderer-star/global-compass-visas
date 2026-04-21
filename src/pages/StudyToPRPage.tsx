import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, GraduationCap, Briefcase, Award, CheckCircle, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import EligibilityForm from "@/components/EligibilityForm";
import AnimatedSection from "@/components/AnimatedSection";
import ToolsCallout from "@/components/ToolsCallout";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const stages = [
  { step: "01", icon: GraduationCap, title: "Study at a DLI", time: "1–4 years", desc: "Enroll at a Designated Learning Institution. Bachelor's, master's, or eligible 1+ year diploma. Public colleges and universities qualify for PGWP." },
  { step: "02", icon: Award, title: "Graduate & Apply for PGWP", time: "Within 180 days", desc: "Apply for a Post-Graduation Work Permit valid for up to 3 years (matching program length). Open work permit — no LMIA needed." },
  { step: "03", icon: Briefcase, title: "Build 1 Year of Skilled Work (TEER 0/1/2/3)", time: "12 months", desc: "Work full-time in a skilled NOC. This unlocks the Canadian Experience Class (CEC) Express Entry stream." },
  { step: "04", icon: ArrowRight, title: "Apply via CEC Express Entry", time: "~6 months", desc: "Submit your Express Entry profile. CEC candidates often receive ITAs at lower CRS cutoffs than FSWP applicants." },
];

const faqs = [
  {
    q: "Is Study-to-PR still a viable pathway in 2026?",
    a: "Yes. While IRCC has tightened study permit caps and PGWP eligibility (public colleges only for most programs), the pathway remains one of the highest-success routes. CEC draws regularly invite candidates with 1 year of skilled Canadian work experience.",
  },
  {
    q: "Which colleges are eligible for PGWP after recent changes?",
    a: "Public DLIs and degree-granting programs at private institutions remain eligible. Private career colleges and most curriculum-licensing arrangements no longer qualify. Always verify on the IRCC DLI list before applying.",
  },
  {
    q: "How long is the Post-Graduation Work Permit?",
    a: "PGWP length matches your program: 8 months–<2 years gets a PGWP equal to program length; 2+ year programs get the maximum 3-year PGWP. Master's graduates always get 3 years regardless of program length.",
  },
  {
    q: "What CRS score do CEC Express Entry candidates typically need?",
    a: "CEC-only draws have historically had cutoffs in the 510–550 range, but category-based draws (healthcare, STEM, French, trades) frequently invite CEC candidates with 430–490 CRS. PNP nominations add 600 points.",
  },
  {
    q: "How much does Study-to-PR cost from India?",
    a: "Tuition: CAD 15,000–35,000/year + CAD 14,690 proof of funds. PGWP: CAD 255. Express Entry application: CAD 1,365. Total estimated cost over 4–5 years: CAD 60,000–120,000 depending on program and city.",
  },
];

const StudyToPRPage = () => (
  <div>
    <Helmet>
      <title>Canada Study-to-PR Pathway 2026 — DLI → PGWP → CEC | 4 Aces Visa</title>
      <meta name="description" content="Complete Study-to-PR pathway in Canada: pick a DLI, get a PGWP, build Canadian work experience, and apply via CEC Express Entry. Timelines, costs & expert guidance." />
      <link rel="canonical" href="https://www.4acesvisa.com/study-to-pr" />
      <meta property="og:title" content="Canada Study-to-PR Pathway 2026" />
      <meta property="og:description" content="DLI → PGWP → CEC Express Entry. The fastest study-based PR route." />
      <meta property="og:url" content="https://www.4acesvisa.com/study-to-pr" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "WebPage", name: "Canada Study-to-PR Pathway", url: "https://www.4acesvisa.com/study-to-pr" },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.4acesvisa.com/" },
                { "@type": "ListItem", position: 2, name: "Study to PR", item: "https://www.4acesvisa.com/study-to-pr" },
              ],
            },
            { "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
          ],
        })}
      </script>
    </Helmet>

    <section className="relative bg-primary pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--gold)/0.15),transparent_60%)]" />
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <nav className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-6">
          <Link to="/" className="hover:text-gold">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gold">Study to PR</span>
        </nav>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
          <span className="inline-flex items-center gap-2 bg-gold/20 text-gold px-3 py-1.5 rounded-full text-xs font-bold mb-4 border border-gold/30">
            <GraduationCap className="h-3.5 w-3.5" /> The 4-Step PR Route
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
            Canada Study-to-PR
            <span className="text-gold block mt-1">DLI → PGWP → CEC</span>
          </h1>
          <p className="text-lg text-primary-foreground/70 mb-8 max-w-2xl">
            One of Canada's highest-success PR pathways. Study at a DLI, get a 3-year open work permit,
            build Canadian work experience, and qualify for Express Entry under CEC.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#assessment">
              <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold shadow-gold">
                Free Study-to-PR Plan <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a href="tel:+16478622190">
              <Button size="lg" className="bg-transparent border-2 border-white/40 text-white hover:bg-white/10 font-semibold">
                <Phone className="mr-2 h-4 w-4" /> Speak to Expert
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Quick answer */}
    <section className="bg-card border-b border-border">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl border-l-4 border-gold pl-6">
          <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Quick answer</p>
          <p className="text-foreground leading-relaxed">
            Study-to-PR takes ~4–6 years end-to-end: 1–4 years at a Designated Learning Institution, up to
            3 years on a Post-Graduation Work Permit, and 1 year of skilled Canadian work experience to
            qualify for the Canadian Experience Class under Express Entry. Typical total cost: CAD 60K–120K.
          </p>
        </div>
      </div>
    </section>

    {/* Stages */}
    <section className="section-padding section-light">
      <div className="container-narrow mx-auto">
        <AnimatedSection>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            The 4 Stages of Study-to-PR
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map((s, i) => (
            <motion.div
              key={s.step}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="relative bg-card rounded-xl border border-border p-5 hover:shadow-card hover:border-gold/30 transition-all"
            >
              <span className="absolute -top-2 -right-2 bg-gold text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Clock className="h-3 w-3" /> {s.time}
              </span>
              <s.icon className="h-7 w-7 text-gold mb-3" />
              <div className="font-display text-3xl font-bold text-primary/10 mb-1">{s.step}</div>
              <h3 className="font-display text-base font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CRS impact */}
    <section className="section-padding section-soft">
      <div className="container-narrow mx-auto max-w-4xl">
        <AnimatedSection>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
            How Study-to-PR Boosts Your CRS Score
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Canadian credentials and work experience add significant points under Express Entry.
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { factor: "Canadian study credential", points: "+15 to +30 CRS" },
            { factor: "1 year Canadian work experience", points: "+35 to +80 CRS" },
            { factor: "Provincial Nomination (PNP)", points: "+600 CRS" },
            { factor: "French language (NCLC 7+)", points: "+50 CRS" },
          ].map((b) => (
            <div key={b.factor} className="bg-card rounded-xl border border-border p-5 flex items-center justify-between">
              <span className="text-sm text-foreground font-medium">{b.factor}</span>
              <span className="font-display text-lg font-bold text-gold">{b.points}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="section-padding section-light">
      <div className="container-narrow mx-auto max-w-3xl">
        <AnimatedSection>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Study-to-PR FAQ
          </h2>
        </AnimatedSection>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.details
              key={faq.q}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl border border-border group"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer font-display font-semibold text-foreground text-sm md:text-base">
                {faq.q}
                <span className="text-gold ml-4 text-xl group-open:rotate-45 transition-transform duration-300">+</span>
              </summary>
              <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">{faq.a}</div>
            </motion.details>
          ))}
        </div>
      </div>
    </section>

    <ToolsCallout
      tools={["crs-calculator", "noc-finder", "processing-times"]}
      title="Plan your Study-to-PR"
      description="Score your CRS, find your future NOC, and check current PGWP & study permit timelines."
      variant="soft"
    />

    <section className="section-padding bg-primary" id="assessment">
      <div className="container-narrow mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
              Free Study-to-PR Roadmap
            </h2>
            <p className="text-primary-foreground/70 mb-6">
              We map out program selection, PGWP eligibility, and CEC qualification timing — so your study
              choice doesn't sabotage your PR plans later.
            </p>
            <ul className="space-y-3">
              {["DLI & program eligibility check", "PGWP-eligible college shortlist", "PR timeline projection", "Cost & scholarship guidance"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                  <CheckCircle className="h-4 w-4 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="bg-card rounded-xl p-6 md:p-8 shadow-elevated">
              <EligibilityForm sourcePage="study-to-pr-hub" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  </div>
);

export default StudyToPRPage;