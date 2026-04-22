import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle, ChevronRight, Clock, AlertTriangle,
  TrendingUp, Users, Award, Phone, Zap, Target, Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/CountdownTimer";
import EligibilityForm from "@/components/EligibilityForm";
import AnswerBlock from "@/components/AnswerBlock";
import FreshnessBanner from "@/components/FreshnessBanner";
import { getFreshness } from "@/lib/freshness";

// Next anticipated Express Entry draw — update this regularly
const NEXT_DRAW_DATE = new Date("2026-04-22T12:00:00-04:00");

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const recentDraws = [
  { date: "Mar 18, 2026", type: "General", itas: "4,000", cutoff: "448" },
  { date: "Mar 4, 2026", type: "General", itas: "3,500", cutoff: "456" },
  { date: "Feb 19, 2026", type: "Healthcare", itas: "2,000", cutoff: "422" },
  { date: "Feb 5, 2026", type: "General", itas: "4,500", cutoff: "440" },
  { date: "Jan 22, 2026", type: "STEM", itas: "3,200", cutoff: "435" },
];

const crsFactors = [
  { factor: "Age (18-35)", points: "Up to 110", icon: Users },
  { factor: "Education (PhD)", points: "Up to 150", icon: Award },
  { factor: "Language (CLB 10+)", points: "Up to 136", icon: Target },
  { factor: "Work Experience (5+ yrs)", points: "Up to 80", icon: TrendingUp },
  { factor: "PNP Nomination", points: "+600 Bonus", icon: Zap },
  { factor: "Job Offer (NOC 00)", points: "+200 Bonus", icon: Shield },
];

const ExpressEntryLandingPage = () => {
  const freshness = getFreshness("express-entry");
  return (
    <div>
      <Helmet>
        <title>Canada Express Entry 2026 — Get PR in 6 Months | 4 Aces Visa</title>
        <meta
          name="description"
          content="Apply for Canada PR through Express Entry in 2026. Next draw countdown, CRS score calculator, and free eligibility assessment. 98% success rate — 15,000+ visas processed."
        />
        <link rel="canonical" href="https://www.4acesvisa.com/express-entry" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Canada Express Entry 2026 — Get PR in 6 Months | 4 Aces Visa" />
        <meta property="og:description" content="Apply for Canada PR through Express Entry in 2026. Next draw countdown, CRS calculator, and free eligibility assessment. 98% success rate." />
        <meta property="og:url" content="https://www.4acesvisa.com/express-entry" />
        <meta property="og:image" content="https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/adc15f61-3495-4592-a9ee-4f8cecf8b858/id-preview-a6038808--fba6843f-065b-405d-9fa2-e92e64570374.lovable.app-1775668033782.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Canada Express Entry 2026 — Get PR in 6 Months | 4 Aces Visa" />
        <meta name="twitter:description" content="Apply for Canada PR through Express Entry in 2026. Next draw countdown, CRS calculator, and free eligibility assessment." />
        <meta name="twitter:image" content="https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/adc15f61-3495-4592-a9ee-4f8cecf8b858/id-preview-a6038808--fba6843f-065b-405d-9fa2-e92e64570374.lovable.app-1775668033782.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                name: "Canada Express Entry 2026 – 4 Aces Visa",
                description: "Dedicated Express Entry landing page with draw countdown, CRS breakdown, and free PR assessment.",
                url: "https://www.4acesvisa.com/express-entry",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.4acesvisa.com/" },
                  { "@type": "ListItem", position: 2, name: "Express Entry", item: "https://www.4acesvisa.com/express-entry" },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "What CRS score do I need for Express Entry in 2026?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Recent general draws have had cutoffs between 430-490. Category-based draws for healthcare and STEM may have lower cutoffs around 420-440.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How long does Express Entry take?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "From profile creation to PR landing, the entire process can take as little as 6 months if you receive an ITA quickly.",
                    },
                  },
                ],
              },
            ],
          })}
        </script>
      </Helmet>

      {/* Hero with Countdown */}
      <section className="relative bg-primary pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--gold)/0.15),transparent_60%)]" />
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-6">
            <Link to="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">Express Entry</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-2 bg-destructive/20 text-destructive-foreground px-3 py-1.5 rounded-full text-xs font-bold mb-4 border border-destructive/30">
                  <AlertTriangle className="h-3.5 w-3.5 text-gold" />
                  Limited Slots — Draws Every 2 Weeks
                </span>
                <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
                  Canada Express Entry
                  <span className="text-gold block mt-1">Get PR in 6 Months</span>
                </h1>
                <p className="text-lg text-primary-foreground/70 mb-6 max-w-lg">
                  Don't wait — CRS cutoffs are rising. Our experts have helped 15,000+ applicants
                  secure their Canadian PR. Get your free CRS assessment before the next draw.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  <a href="#assessment">
                    <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold shadow-gold">
                      Get Free CRS Assessment <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                  <a href="tel:+16478622190">
                    <Button size="lg" className="bg-transparent border-2 border-white/40 text-white hover:bg-white/10 font-semibold">
                      <Phone className="mr-2 h-4 w-4" /> Speak to Expert
                    </Button>
                  </a>
                </div>
                <div className="flex items-center gap-6 text-sm text-primary-foreground/60">
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-gold" /> 98% Success Rate</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-gold" /> 15K+ Visas</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-gold" /> Free Assessment</span>
                </div>
              </motion.div>
            </div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8"
            >
              <CountdownTimer targetDate={NEXT_DRAW_DATE} />
              <div className="mt-6 text-center">
                <p className="text-primary-foreground/60 text-sm mb-1">
                  Estimated next draw: <strong className="text-white">April 22, 2026</strong>
                </p>
                <p className="text-gold text-xs font-medium">
                  ⚡ Submit your profile NOW to be included in this draw
                </p>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                {[
                  { value: "~4,000", label: "ITAs Expected" },
                  { value: "440-460", label: "CRS Cutoff Range" },
                  { value: "6 mo", label: "PR Processing" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/5 rounded-lg p-3">
                    <div className="font-display text-lg font-bold text-gold">{s.value}</div>
                    <div className="text-[10px] text-white/50 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Urgency Banner */}
      <section className="bg-gold py-3">
        <div className="container-narrow mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-center">
          <span className="flex items-center gap-2 text-sm font-bold text-accent-foreground">
            <Clock className="h-4 w-4" />
            CRS cutoffs are RISING — the longer you wait, the harder it gets
          </span>
          <a href="#assessment">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs">
              Check My Score Now <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </a>
        </div>
      </section>

      {/* AEO answer block */}
      <section className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <FreshnessBanner topic="express-entry" className="mb-5" />
        <AnswerBlock
          answer="Canada Express Entry is a points-based federal PR system that processes applications in 6 months. Eligible candidates create an online profile, receive a CRS score, and wait for an Invitation to Apply (ITA) in bi-weekly draws. Recent general draw cutoffs: 430–490."
          whoFor="Skilled workers aged 18–45 with at least one year of NOC TEER 0/1/2/3 work experience, CLB 7+ English, and a post-secondary education credential."
          whoNotFor="Applicants without skilled work experience, with language scores below CLB 7, or with no intent to settle outside Quebec."
          lastUpdated={freshness.lastUpdatedLabel}
        />
      </section>

      {/* Recent Draws Table */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
              Recent Express Entry Draws
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
              Track the latest draw results to understand where your CRS score stands
            </p>
          </motion.div>
          <div className="overflow-x-auto">
            <table className="w-full bg-card rounded-xl border border-border overflow-hidden">
              <thead>
                <tr className="bg-secondary/80">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">ITAs Issued</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">CRS Cutoff</th>
                </tr>
              </thead>
              <tbody>
                {recentDraws.map((draw, i) => (
                  <motion.tr
                    key={draw.date}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i}
                    className="border-t border-border hover:bg-secondary/30 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-foreground font-medium">{draw.date}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                        draw.type === "General" ? "bg-primary/10 text-primary" :
                        draw.type === "Healthcare" ? "bg-success/10 text-success" :
                        "bg-gold/10 text-gold-dark"
                      }`}>
                        {draw.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">{draw.itas}</td>
                    <td className="px-4 py-3 text-sm font-bold text-gold">{draw.cutoff}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CRS Breakdown */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
              CRS Score Breakdown
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
              Understand how your Comprehensive Ranking System score is calculated
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {crsFactors.map((f, i) => (
              <motion.div
                key={f.factor}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-card rounded-xl border border-border p-5 text-center hover:shadow-card hover:border-gold/30 transition-all"
              >
                <f.icon className="h-8 w-8 text-gold mx-auto mb-3" />
                <div className="font-display text-xl font-bold text-primary mb-1">{f.points}</div>
                <div className="text-sm text-muted-foreground">{f.factor}</div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="#assessment">
              <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold shadow-gold">
                Calculate My CRS Score — Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Your Express Entry Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Free CRS Assessment", desc: "We calculate your score, identify gaps, and build a strategy to maximize your CRS points.", time: "Day 1" },
              { step: "02", title: "Profile & Optimization", desc: "Create your Express Entry profile with optimized documentation. Explore PNP nominations for +600 points.", time: "Week 1-4" },
              { step: "03", title: "ITA & PR Application", desc: "Receive your Invitation to Apply and submit your complete PR application. Land in Canada!", time: "Month 2-6" },
            ].map((s, i) => (
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

      {/* Urgency CTA */}
      <section className="section-padding bg-primary">
        <div className="container-narrow mx-auto text-center">
          <AlertTriangle className="h-10 w-10 text-gold mx-auto mb-4" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
            Don't Miss the Next Draw
          </h2>
          <p className="text-primary-foreground/70 max-w-lg mx-auto mb-6">
            Express Entry draws happen every 2 weeks. Every draw you miss is another 14 days
            without your Canadian PR. Our experts can get your profile ready in as little as 7 days.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#assessment">
              <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold shadow-gold">
                Start My Application Today <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a href="https://wa.me/16478622190?text=Hi%2C%20I%20want%20to%20know%20about%20Express%20Entry" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-transparent border-2 border-white/40 text-white hover:bg-white/10 font-semibold">
                WhatsApp Us Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="section-padding section-soft" id="assessment">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Free Express Entry Assessment
              </h2>
              <p className="text-muted-foreground mb-6">
                Get a personalized CRS score calculation and strategy from our immigration experts.
                We'll tell you exactly where you stand and how to improve your score.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Personalized CRS score calculation",
                  "Gap analysis & optimization strategy",
                  "PNP nomination eligibility check",
                  "Response within 24 hours",
                  "100% free — no obligation",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 text-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="bg-card rounded-xl border border-gold/20 p-4">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">⚡ Urgency note:</strong> We only accept 50 new Express Entry
                  clients per month to maintain our 98% success rate. Slots fill fast during peak draw seasons.
                </p>
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 md:p-8 shadow-elevated border border-border">
              <EligibilityForm sourcePage="express-entry-landing" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExpressEntryLandingPage;
