import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, CheckCircle, ChevronRight, Phone, Zap, Clock, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EligibilityForm from "@/components/EligibilityForm";
import AnimatedSection from "@/components/AnimatedSection";

const QUICK_ANSWER =
  "H1B visa holders in the USA can move to Canada through Express Entry (FSW or CEC), typically obtaining Canadian PR in 6–12 months. With US work experience, a bachelor's degree, and CLB 9+ English, most H1B professionals score 470–510 CRS — well above 2026 cutoffs. No employer sponsorship is required.";

const FAQS = [
  {
    question: "Can I apply for Canada PR while on an H1B visa in the USA?",
    answer:
      "Yes. You can submit an Express Entry profile from anywhere in the world while continuing to work on your H1B in the USA. There is no requirement to leave the US, quit your job, or have a Canadian employer. Most H1B holders apply, receive their ITA, complete medicals and PCC, and only relocate after their COPR (Confirmation of Permanent Residence) is issued.",
  },
  {
    question: "What CRS score do H1B holders typically get for Express Entry?",
    answer:
      "Most H1B professionals score between 470 and 510 CRS. A 28–32 year-old with a master's degree, IELTS CLB 9, and 3+ years of skilled US work experience typically lands around 480–500. This is comfortably above 2026 general draw cutoffs (440–470) and category-based STEM/tech draws (420–440).",
  },
  {
    question: "Does my US work experience count toward Canadian PR?",
    answer:
      "Absolutely. Foreign skilled work experience (NOC TEER 0, 1, 2, or 3) earns up to 80 CRS points and qualifies you under Federal Skilled Worker (FSW). Three years of US tech/professional experience is the sweet spot for maximum points. You'll need reference letters with job duties, dates, salary, and hours per week.",
  },
  {
    question: "How long does the H1B to Canada PR process take?",
    answer:
      "From decision to landing: 6–12 months. IELTS + ECA take 4–8 weeks. Express Entry profile is created in 1 day. Most ITAs arrive within 2–6 months. After ITA, IRCC processes PR applications in approximately 5–6 months under their service standard. Many H1B holders complete the entire journey in under a year.",
  },
  {
    question: "Do I need a Canadian job offer to qualify?",
    answer:
      "No. Express Entry is points-based and most successful H1B applicants have NO Canadian job offer. A valid LMIA-supported job offer adds 50–200 CRS points but is not required. Provincial Nominee Programs (PNP) like Ontario Tech Draw or BC PNP Tech also nominate H1B holders without a job offer in many cases.",
  },
  {
    question: "What happens to my H1B status after I get Canadian PR?",
    answer:
      "Your H1B is unaffected. You can continue working in the USA on H1B while holding Canadian PR — there's no conflict. Many professionals maintain US employment and travel to Canada to land/activate PR, then choose later whether to relocate, work remotely from Canada, or pursue Canadian opportunities. You must spend 730 days in Canada within any 5-year period to maintain PR.",
  },
  {
    question: "Is the H1B to Canada move worth it for tech workers in 2026?",
    answer:
      "For most H1B tech workers, yes. Canada offers permanent residency in months (vs. 10–20 year EB green card backlogs for Indians), universal healthcare, citizenship eligibility in 3 years, and growing tech hubs in Toronto, Vancouver, and Montreal. Tradeoffs: lower base salaries (20–35% less), higher taxes, and a smaller startup ecosystem than the Bay Area.",
  },
  {
    question: "Can my spouse and children come with me to Canada?",
    answer:
      "Yes. Your spouse and dependent children (under 22) are included in your PR application at no extra immigration fees beyond government processing charges. Your spouse's language scores and education can also boost your CRS by up to 40 points. Once you land, your spouse can apply for an open work permit and children can attend public school free.",
  },
];

const COMPARISON = [
  { feature: "Time to Permanent Status", us: "10–20+ years (EB-2/EB-3 India)", canada: "6–12 months" },
  { feature: "Employer Sponsorship Required", us: "Yes (H1B, then Green Card)", canada: "No" },
  { feature: "Job Mobility", us: "Tied to employer / portability rules", canada: "Full freedom — any job, any province" },
  { feature: "Spouse Work Authorization", us: "H4 EAD (limited & at risk)", canada: "Open work permit, then PR" },
  { feature: "Path to Citizenship", us: "5 years after Green Card", canada: "3 years after PR" },
  { feature: "Healthcare", us: "Employer-tied insurance", canada: "Universal public healthcare" },
  { feature: "Avg. Tech Salary (Senior SWE)", us: "$180K–$250K USD", canada: "$130K–$180K CAD" },
  { feature: "Visa Renewal Risk", us: "Every 3 years + RFEs", canada: "PR card renewal every 5 years" },
];

const STEPS = [
  { step: "01", title: "Free CRS Assessment", desc: "We score your H1B profile and project your CRS — typically 470–510 for tech professionals.", time: "Day 1" },
  { step: "02", title: "IELTS + ECA", desc: "Book IELTS General (target CLB 9+) and order WES credential evaluation. Both can run in parallel.", time: "Week 1–6" },
  { step: "03", title: "Express Entry Profile", desc: "Submit your profile to the federal pool. Eligible for FSW, CEC (if Canadian work), and all PNPs.", time: "Week 7" },
  { step: "04", title: "ITA → PR → Land", desc: "Receive ITA in 2–6 months, submit complete PR application, land in Canada with COPR.", time: "Month 2–12" },
];

const H1BToCanadaPRPage = () => {
  return (
    <div>
      <Helmet>
        <title>H1B to Canada PR 2026: Complete Guide for US Tech Workers | 4 Aces Visa</title>
        <meta
          name="description"
          content="Move from H1B to Canada PR in 6–12 months. Step-by-step Express Entry guide for US tech workers. CRS scoring, timelines, comparison with US Green Card, and FAQs for 2026."
        />
        <link rel="canonical" href="https://www.4acesvisa.com/h1b-to-canada-pr" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="H1B to Canada PR 2026: Complete Guide for US Tech Workers" />
        <meta property="og:description" content="Skip the Green Card backlog. Get Canadian PR from H1B in 6–12 months via Express Entry. CRS scoring, comparison tables, and 2026 timelines." />
        <meta property="og:url" content="https://www.4acesvisa.com/h1b-to-canada-pr" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                headline: "H1B to Canada PR 2026: Complete Guide for US Tech Workers",
                description: QUICK_ANSWER,
                author: { "@type": "Organization", name: "4 Aces Visa" },
                publisher: { "@type": "Organization", name: "4 Aces Visa" },
                datePublished: "2026-01-15",
                dateModified: "2026-04-18",
                mainEntityOfPage: "https://www.4acesvisa.com/h1b-to-canada-pr",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.4acesvisa.com/" },
                  { "@type": "ListItem", position: 2, name: "H1B to Canada PR", item: "https://www.4acesvisa.com/h1b-to-canada-pr" },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: FAQS.map((f) => ({
                  "@type": "Question",
                  name: f.question,
                  acceptedAnswer: { "@type": "Answer", text: f.answer },
                })),
              },
            ],
          })}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="relative bg-primary pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--gold)/0.15),transparent_60%)]" />
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-6">
            <Link to="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">H1B to Canada PR</span>
          </nav>
          <span className="inline-flex items-center gap-2 bg-gold/20 text-gold px-3 py-1.5 rounded-full text-xs font-bold mb-4 border border-gold/30">
            <Zap className="h-3.5 w-3.5" /> 2026 Guide for US Tech Workers
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-5 leading-tight max-w-3xl">
            H1B to Canada PR: Skip the Green Card Backlog
          </h1>
          <p className="text-lg text-primary-foreground/70 mb-6 max-w-2xl">
            Stuck waiting 10–20 years for your EB-2/EB-3 Green Card? Move from H1B to Canadian Permanent Residency in 6–12 months — no employer sponsorship needed.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#assessment">
              <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold shadow-gold">
                Get Free CRS Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a href="tel:+16478622190">
              <Button size="lg" className="bg-transparent border-2 border-white/40 text-white hover:bg-white/10 font-semibold">
                <Phone className="mr-2 h-4 w-4" /> Talk to an Expert
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <div className="bg-card border-l-4 border-gold rounded-xl p-6 md:p-8 shadow-card">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-gold" />
                <h2 className="font-display text-lg font-bold text-foreground">Quick Answer</h2>
              </div>
              <p className="text-base md:text-lg text-foreground leading-relaxed">{QUICK_ANSWER}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why H1B holders move */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Why H1B Holders Are Moving to Canada in 2026
            </h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                For Indian-born professionals on H1B, the EB-2 and EB-3 employment-based Green Card backlog now exceeds <strong>50 years</strong> in some categories per USCIS Visa Bulletin projections. Even chargeable-elsewhere applicants face 2–8 year waits with no guarantee. H1B itself caps at 6 years (extensions possible only if I-140 is approved), and every renewal carries RFE risk.
              </p>
              <p>
                Canada took a different path. Express Entry is a transparent, points-based system with no per-country caps and no employer sponsorship requirement. In 2025, Canada issued over <strong>110,000 ITAs</strong>, with category-based draws specifically targeting STEM, healthcare, and French-speaking candidates. The 2025–2027 Immigration Levels Plan keeps economic immigration at roughly 232,000 admissions per year — a stable, predictable channel.
              </p>
              <p>
                The math is simple: a 30-year-old Indian software engineer on H1B with a US master's degree, IELTS 8.0, and 4 years of experience typically scores <strong>485–500 CRS</strong> — above every general draw cutoff in the past 18 months and well within STEM category thresholds.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
              H1B / US Green Card vs Canadian PR
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              Side-by-side comparison for Indian-born tech workers in the USA
            </p>
          </AnimatedSection>
          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-card">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/80">
                  <TableHead className="font-semibold text-foreground">Factor</TableHead>
                  <TableHead className="font-semibold text-foreground">USA (H1B → Green Card)</TableHead>
                  <TableHead className="font-semibold text-gold">Canada (Express Entry PR)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {COMPARISON.map((row) => (
                  <TableRow key={row.feature}>
                    <TableCell className="font-medium text-foreground">{row.feature}</TableCell>
                    <TableCell className="text-muted-foreground">{row.us}</TableCell>
                    <TableCell className="text-foreground">{row.canada}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* CRS for H1B */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Typical CRS Profile of an H1B Tech Worker
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-6">
              Below is a real-world CRS calculation for a married 30-year-old Indian software engineer on H1B with a US master's degree, IELTS 8.0/8.0/7.5/7.5, and 4 years of skilled work experience. Spouse has a bachelor's degree and IELTS 7.0.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { factor: "Age (30)", points: "100", icon: Users },
              { factor: "Education (Master's)", points: "126", icon: Award },
              { factor: "Language CLB 9", points: "124", icon: Clock },
              { factor: "Foreign Work Exp", points: "72", icon: CheckCircle },
              { factor: "Spouse Factors", points: "32", icon: Users },
              { factor: "Skill Transferability", points: "50", icon: Zap },
            ].map((f) => (
              <div key={f.factor} className="bg-card rounded-xl border border-border p-5 text-center hover:shadow-card hover:border-gold/30 transition-all">
                <f.icon className="h-7 w-7 text-gold mx-auto mb-2" />
                <div className="font-display text-2xl font-bold text-primary mb-1">{f.points}</div>
                <div className="text-sm text-muted-foreground">{f.factor}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-card rounded-xl border-2 border-gold p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Estimated CRS Total</p>
            <div className="font-display text-4xl font-bold text-gold">~504</div>
            <p className="text-sm text-foreground mt-2">Comfortably above 2026 general draw cutoffs of 440–470.</p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Your H1B → Canadian PR Roadmap
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s) => (
              <div key={s.step} className="relative bg-card rounded-xl border border-border p-6 hover:shadow-card transition-shadow">
                <span className="absolute -top-3 -left-2 bg-gold text-accent-foreground text-xs font-bold px-2.5 py-1 rounded-full">
                  {s.time}
                </span>
                <div className="font-display text-3xl font-bold text-primary/10 mb-2">{s.step}</div>
                <h3 className="font-display text-base font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              H1B to Canada PR — FAQs
            </h2>
          </AnimatedSection>
          <Accordion type="single" collapsible className="bg-card rounded-xl border border-border divide-y divide-border">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-0 px-5">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-gold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Assessment */}
      <section id="assessment" className="section-padding bg-primary">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
              Get Your Free H1B → Canada PR Assessment
            </h2>
            <p className="text-primary-foreground/70 max-w-lg mx-auto">
              We'll calculate your exact CRS score, project your draw timeline, and map a personalized PR strategy in under 24 hours.
            </p>
          </div>
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card max-w-2xl mx-auto">
            <EligibilityForm sourcePage="h1b-to-canada-pr" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default H1BToCanadaPRPage;
