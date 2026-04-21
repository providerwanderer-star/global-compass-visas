import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Heart, Baby, Home, CheckCircle, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import EligibilityForm from "@/components/EligibilityForm";
import AnimatedSection from "@/components/AnimatedSection";
import ToolsCallout from "@/components/ToolsCallout";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const pilots = [
  {
    icon: Baby,
    title: "Home Child Care Provider Pilot",
    nocs: "NOC 44100",
    desc: "Care for children under 18 in a private home. PR on arrival under the new 2024 caregiver streams once you have a job offer from a Canadian family or licensed provider.",
    requirements: ["High school diploma + 6 months relevant training OR 1 year recent paid experience", "CLB 4 English/French", "Full-time job offer in NOC 44100 outside Quebec"],
  },
  {
    icon: Home,
    title: "Home Support Worker Pilot",
    nocs: "NOC 44101",
    desc: "Provide in-home care for seniors or persons recovering from illness. Same PR-on-arrival structure as the child care pilot, with strong demand across Ontario, BC and Atlantic Canada.",
    requirements: ["High school diploma + 6 months training OR 1 year experience", "CLB 4 English/French", "Full-time job offer in NOC 44101 outside Quebec"],
  },
];

const faqs = [
  {
    q: "Do caregivers still get PR on arrival in 2026?",
    a: "Yes. IRCC's enhanced caregiver pilots (launched March 2024) grant permanent residence on arrival once you have a qualifying full-time job offer in NOC 44100 or 44101 — no more 24 months of work-then-apply.",
  },
  {
    q: "What language score do I need for the caregiver pathway?",
    a: "CLB 4 in English or French (IELTS General: Listening 4.5 / Reading 3.5 / Writing 4.0 / Speaking 4.0). This is one of the lowest CLB requirements in Canadian economic immigration.",
  },
  {
    q: "Can my spouse and children come with me?",
    a: "Yes. Spouses receive an open work permit and dependent children receive study permits. The whole family lands as permanent residents on arrival.",
  },
  {
    q: "How do I find a qualifying job offer?",
    a: "You need a written offer of full-time, permanent employment from a Canadian family (for child care) or eligible employer/provider. The offer must be outside Quebec, in the correct NOC, and at the prevailing wage.",
  },
  {
    q: "How long does the caregiver PR application take?",
    a: "IRCC processing has been targeted at 6–12 months. Once approved, you and your family land as permanent residents — no temporary work permit phase before PR under the 2024 pilots.",
  },
];

const CaregiverPathwayPage = () => (
  <div>
    <Helmet>
      <title>Canada Caregiver Pathway 2026 — Child Care & Home Support PR | 4 Aces Visa</title>
      <meta name="description" content="Permanent residence on arrival via Canada's Home Child Care Provider & Home Support Worker pilots. Eligibility, NOC 44100 / 44101, language requirements & how to apply." />
      <link rel="canonical" href="https://www.4acesvisa.com/caregiver-pathway" />
      <meta property="og:title" content="Canada Caregiver Pathway 2026" />
      <meta property="og:description" content="PR-on-arrival caregiver streams: NOC 44100 (child care) and NOC 44101 (home support)." />
      <meta property="og:url" content="https://www.4acesvisa.com/caregiver-pathway" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "WebPage", name: "Canada Caregiver Pathway 2026", url: "https://www.4acesvisa.com/caregiver-pathway" },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.4acesvisa.com/" },
                { "@type": "ListItem", position: 2, name: "Caregiver Pathway", item: "https://www.4acesvisa.com/caregiver-pathway" },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        })}
      </script>
    </Helmet>

    {/* Breadcrumb */}
    <div className="bg-secondary/40 border-b border-border">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-gold">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">Caregiver Pathway</span>
        </nav>
      </div>
    </div>

    {/* Hero */}
    <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-white section-padding">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-gold/20 px-3 py-1 rounded-full mb-4">
            <Heart className="h-4 w-4 text-gold" />
            <span className="text-sm font-medium text-gold">PR On Arrival · Updated 2026</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Canada Caregiver Pathway: PR on Arrival
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-2 leading-relaxed">
            Two pilots — Home Child Care Provider (NOC 44100) and Home Support Worker (NOC 44101) — give caregivers permanent residence the moment they land in Canada.
          </p>
          <p className="text-base text-white/70 mb-8">
            CLB 4 language. 6 months training OR 1 year experience. Full-time job offer outside Quebec. No more 24-month wait.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/contact">
              <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-semibold shadow-gold">
                Check Eligibility <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="tel:+16478622190">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="mr-2 h-4 w-4" /> +1 (647) 862-2190
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Quick Answer */}
    <AnimatedSection className="bg-secondary/30 py-8 border-y border-border">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card">
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
            <strong className="text-primary">Quick answer:</strong> Canada's 2024 caregiver pilots (Home Child Care Provider + Home Support Worker) give permanent residence on arrival. Requirements: a full-time job offer in NOC 44100 or 44101 outside Quebec, CLB 4 language, and either 6 months of relevant training or 1 year of recent paid experience.
          </p>
        </div>
      </div>
    </AnimatedSection>

    {/* Pilots */}
    <section className="section-padding bg-white">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-3">Two Caregiver Pilots</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">Pick the stream that matches your experience and the job offer you can secure.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {pilots.map((p, i) => (
            <motion.div
              key={p.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white border border-border rounded-2xl p-6 shadow-card hover:shadow-elevated transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gold/15 p-3 rounded-xl">
                  <p.icon className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">{p.title}</h3>
                  <p className="text-xs text-muted-foreground">{p.nocs}</p>
                </div>
              </div>
              <p className="text-sm text-foreground/70 mb-4 leading-relaxed">{p.desc}</p>
              <ul className="space-y-2">
                {p.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-foreground/75">
                    <CheckCircle className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Process */}
    <section className="section-padding bg-secondary/30">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">How the PR-on-Arrival Process Works</h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            { step: "1", title: "Secure a qualifying job offer", desc: "Full-time, permanent role in NOC 44100 or 44101 from an employer/family outside Quebec.", time: "Varies" },
            { step: "2", title: "Submit PR application", desc: "Apply directly under the caregiver pilot. No pre-arrival work permit needed under the 2024 streams.", time: "1–2 months prep" },
            { step: "3", title: "IRCC processing", desc: "Background, medical and security checks. Spouse open work permit and dependant study permits processed in parallel.", time: "6–12 months" },
            { step: "4", title: "Land as a permanent resident", desc: "You and your family arrive as PRs. Start working, accessing healthcare and the path to citizenship right away.", time: "PR from day 1" },
          ].map((s) => (
            <div key={s.step} className="bg-white rounded-xl p-5 shadow-card flex gap-4">
              <div className="bg-gold text-accent-foreground font-bold rounded-lg h-10 w-10 flex items-center justify-center flex-shrink-0">{s.step}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <h3 className="font-display text-lg font-bold">{s.title}</h3>
                  <span className="text-xs text-muted-foreground inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {s.time}</span>
                </div>
                <p className="text-sm text-foreground/70">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Tools */}
    <ToolsCallout />

    {/* FAQ */}
    <section className="section-padding bg-white">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">Caregiver Pathway FAQs</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group bg-white border border-border rounded-xl p-5 hover:shadow-card transition-shadow">
              <summary className="font-display font-bold text-base cursor-pointer flex items-center justify-between gap-2 list-none">
                <span>{f.q}</span>
                <ChevronRight className="h-4 w-4 text-gold group-open:rotate-90 transition-transform flex-shrink-0" />
              </summary>
              <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-primary section-padding">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-white mb-3">Ready to start your caregiver PR application?</h2>
        <p className="text-center text-white/70 mb-8">Free assessment in 24 hours. We help with job offer matching, document prep and IRCC submission.</p>
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-elevated">
          <EligibilityForm visaType="caregiver" sourcePage="caregiver-pathway" />
        </div>
      </div>
    </section>
  </div>
);

export default CaregiverPathwayPage;
