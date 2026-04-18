import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, CheckCircle, ChevronRight, Phone, Zap, Globe, Heart, Briefcase } from "lucide-react";
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
  "Moving from the USA to Canada in 2026 is most commonly done through Express Entry (PR in 6–12 months), a Canadian work permit (LMIA or intra-company transfer), study permit, family sponsorship, or the Start-Up Visa. US citizens, Green Card holders, and visa workers all qualify under the same federal programs — no Canadian sponsor required for most routes.";

const FAQS = [
  {
    question: "Do US citizens need a visa to move to Canada permanently?",
    answer:
      "Yes. US citizens can visit Canada for 6 months without a visa, but to live and work there permanently you need Permanent Residency (PR) or a work/study permit. Most Americans pursue Express Entry, family sponsorship, or a job offer with LMIA. Tourist status alone does not allow you to work, study, or stay long-term.",
  },
  {
    question: "What is the easiest way to move from the USA to Canada?",
    answer:
      "Express Entry is typically the fastest and most flexible route — no employer or family sponsor required. If you have a Canadian spouse or common-law partner, family sponsorship is even more straightforward. For business owners and entrepreneurs, the Start-Up Visa offers PR within 12–16 months. The 'easiest' path depends entirely on your profile.",
  },
  {
    question: "Can I keep my US citizenship if I become a Canadian citizen?",
    answer:
      "Yes. Both the United States and Canada permit dual citizenship. You can naturalize as a Canadian (after 3 years of PR within a 5-year period) without renouncing your US passport. You will, however, continue to file US tax returns annually as long as you hold US citizenship, regardless of where you live.",
  },
  {
    question: "How long does it take to move from the USA to Canada?",
    answer:
      "Timelines vary by program: Express Entry 6–12 months, Spousal Sponsorship 12 months (inland or outland), Start-Up Visa 12–16 months, Study Permit 8–12 weeks, and a closed work permit with LMIA 4–8 months. From the day you make the decision to landing in Canada with status, most professional applicants complete the move in under a year.",
  },
  {
    question: "Can I move to Canada from the USA without a job offer?",
    answer:
      "Yes — most successful applicants do not have a Canadian job offer. Express Entry's Federal Skilled Worker (FSW) and CEC streams are points-based and accept candidates worldwide. Provincial Nominee Programs (PNPs) in Ontario, BC, Alberta, and Saskatchewan also nominate skilled workers without job offers in many streams.",
  },
  {
    question: "What about healthcare, taxes, and cost of living in Canada?",
    answer:
      "Healthcare is publicly funded — no premiums, copays, or deductibles for medically necessary services after a 0–3 month waiting period (varies by province). Taxes are higher than the US (combined federal + provincial top rate ~53%) but include free healthcare. Cost of living in Toronto/Vancouver is comparable to NYC/SF; smaller cities like Calgary, Halifax, or Ottawa are 30–50% cheaper.",
  },
  {
    question: "Can I bring my family with me to Canada?",
    answer:
      "Yes. Spouses or common-law partners and dependent children under 22 are included in your PR application. Once approved, your spouse can apply for an Open Work Permit and work for any Canadian employer immediately upon landing. Children attend public school free, and the entire family qualifies for healthcare after the provincial waiting period.",
  },
  {
    question: "Is moving from the USA to Canada worth it in 2026?",
    answer:
      "It depends on your priorities. Canada offers universal healthcare, faster path to permanent status (6–12 months vs years of US Green Card backlog for many), strong public education, and a fast-track citizenship (3 years). Tradeoffs include 20–35% lower salaries in tech and finance, higher taxes, harsher winters in many provinces, and a smaller startup/VC ecosystem. For families and long-term stability, most of our American clients say it has been worth it.",
  },
];

const PATHWAYS = [
  { name: "Express Entry (FSW/CEC/FST)", time: "6–12 months", best: "Skilled professionals with degree + English/French + work experience", outcome: "Permanent Residency" },
  { name: "Provincial Nominee Program (PNP)", time: "12–18 months", best: "Workers with ties to a specific province (Ontario, BC, Alberta, etc.)", outcome: "PR (with +600 CRS boost)" },
  { name: "Spousal / Family Sponsorship", time: "12 months", best: "Spouses, common-law partners, parents, children of Canadian citizens/PRs", outcome: "Permanent Residency" },
  { name: "Study Permit", time: "8–12 weeks", best: "Students enrolled at a Designated Learning Institution (DLI)", outcome: "Temporary status + path to PR via PGWP" },
  { name: "LMIA Work Permit", time: "4–8 months", best: "Workers with a Canadian job offer + positive LMIA from employer", outcome: "Closed work permit + path to CEC" },
  { name: "Start-Up Visa", time: "12–16 months", best: "Entrepreneurs with a designated VC/angel/incubator endorsement", outcome: "Permanent Residency" },
  { name: "Intra-Company Transfer (LMIA-exempt)", time: "2–4 months", best: "Executives/managers/specialists at multinationals with Canadian branch", outcome: "Open or closed work permit" },
  { name: "Visitor Visa / Super Visa", time: "2–8 weeks", best: "Tourism, exploring Canada before committing, parents of Canadian residents", outcome: "Temporary visit (6 months / 5 years)" },
];

const USAToCanadaPage = () => {
  return (
    <div>
      <Helmet>
        <title>Move from USA to Canada 2026: Complete Immigration Guide | 4 Aces Visa</title>
        <meta
          name="description"
          content="Everything Americans need to move to Canada in 2026 — Express Entry, work permits, family sponsorship, Start-Up Visa. Costs, timelines, healthcare, taxes, and step-by-step pathways."
        />
        <link rel="canonical" href="https://www.4acesvisa.com/usa-to-canada-immigration" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Move from USA to Canada 2026: Complete Immigration Guide" />
        <meta property="og:description" content="All Canadian immigration pathways for Americans — Express Entry, family sponsorship, work permits, Start-Up Visa. 2026 timelines, costs, and FAQs." />
        <meta property="og:url" content="https://www.4acesvisa.com/usa-to-canada-immigration" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                headline: "Move from USA to Canada 2026: Complete Immigration Guide",
                description: QUICK_ANSWER,
                author: { "@type": "Organization", name: "4 Aces Visa" },
                publisher: { "@type": "Organization", name: "4 Aces Visa" },
                datePublished: "2026-01-20",
                dateModified: "2026-04-18",
                mainEntityOfPage: "https://www.4acesvisa.com/usa-to-canada-immigration",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.4acesvisa.com/" },
                  { "@type": "ListItem", position: 2, name: "USA to Canada", item: "https://www.4acesvisa.com/usa-to-canada-immigration" },
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
            <span className="text-gold">USA to Canada</span>
          </nav>
          <span className="inline-flex items-center gap-2 bg-gold/20 text-gold px-3 py-1.5 rounded-full text-xs font-bold mb-4 border border-gold/30">
            <Globe className="h-3.5 w-3.5" /> 2026 Immigration Guide
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-5 leading-tight max-w-3xl">
            Moving from the USA to Canada — Every Pathway Explained
          </h1>
          <p className="text-lg text-primary-foreground/70 mb-6 max-w-2xl">
            Whether you're an American citizen, Green Card holder, or visa worker — here's how to relocate to Canada in 2026 with permanent status, healthcare, and a path to citizenship.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#assessment">
              <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold shadow-gold">
                Find My Best Pathway <ArrowRight className="ml-2 h-4 w-4" />
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

      {/* Why Americans move */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Why Americans Are Moving North in 2026
            </h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                Inquiries from US citizens to Canadian immigration consultants have surged year-over-year, driven by political uncertainty, healthcare costs, a desire for slower-paced family life, and clearer permanent-status pathways. IRCC's 2025–2027 Immigration Levels Plan keeps PR admissions near 232,000 per year — predictable, transparent, and points-based.
              </p>
              <p>
                Unlike the US Green Card system, Canadian PR has no per-country caps, no employer-sponsorship requirement for most economic streams, and no decades-long backlogs. A typical American applicant — university degree, professional work experience, native English — usually scores well above 2026 Express Entry cutoffs.
              </p>
              <p>
                The trade-offs are real: lower base salaries in tech and finance (often 20–35% less), higher marginal taxes, and colder winters in much of the country. But for many families, healthcare access, gun-violence safety statistics, and a faster path to citizenship outweigh those costs.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Pathways Table */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
              All 8 Immigration Pathways from the USA to Canada
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              Compare every route — find the one that matches your profile, timeline, and goals
            </p>
          </AnimatedSection>
          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-card">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/80">
                  <TableHead className="font-semibold text-foreground">Pathway</TableHead>
                  <TableHead className="font-semibold text-foreground">Timeline</TableHead>
                  <TableHead className="font-semibold text-foreground">Best For</TableHead>
                  <TableHead className="font-semibold text-gold">Outcome</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PATHWAYS.map((p) => (
                  <TableRow key={p.name}>
                    <TableCell className="font-medium text-foreground">{p.name}</TableCell>
                    <TableCell className="text-muted-foreground">{p.time}</TableCell>
                    <TableCell className="text-muted-foreground">{p.best}</TableCell>
                    <TableCell className="text-foreground font-medium">{p.outcome}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="bg-gold py-6">
        <div className="container-narrow mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
          <span className="text-sm sm:text-base font-bold text-accent-foreground">
            Not sure which pathway fits you? Get a free expert assessment.
          </span>
          <a href="#assessment">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
              Find My Best Pathway <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </a>
        </div>
      </section>

      {/* Healthcare / Taxes / Cost */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Life in Canada vs the USA — What Changes
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Heart,
                title: "Healthcare",
                desc: "Universal public healthcare with no premiums, copays, or deductibles for medically necessary care. Waiting periods 0–3 months by province. Prescription, dental, and vision typically via private/employer top-up.",
              },
              {
                icon: Briefcase,
                title: "Taxes & Salaries",
                desc: "Combined federal + provincial top marginal rate ~53%. Tech salaries 20–35% lower than US peers in CAD terms. RRSP and TFSA replace 401(k)/Roth. US citizens still file IRS returns annually (FEIE/FTC apply).",
              },
              {
                icon: Globe,
                title: "Citizenship Path",
                desc: "Citizenship eligible after 3 years of physical presence as a PR within any 5-year window. Dual US + Canadian citizenship is permitted. Canadian passport ranked among the top 10 most powerful globally.",
              },
            ].map((card) => (
              <div key={card.title} className="bg-card rounded-xl border border-border p-6 hover:shadow-card hover:border-gold/30 transition-all">
                <card.icon className="h-8 w-8 text-gold mb-3" />
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              USA to Canada — FAQs
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
          <div className="mt-6 text-center">
            <Link to="/h1b-to-canada-pr" className="text-gold font-medium hover:underline inline-flex items-center gap-1">
              On H1B specifically? Read our H1B → Canada PR guide <CheckCircle className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Assessment */}
      <section id="assessment" className="section-padding bg-primary">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
              Free USA → Canada Pathway Assessment
            </h2>
            <p className="text-primary-foreground/70 max-w-lg mx-auto">
              Tell us about your background and we'll recommend the fastest, most affordable Canadian immigration pathway for you in under 24 hours.
            </p>
          </div>
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card max-w-2xl mx-auto">
            <EligibilityForm sourcePage="usa-to-canada-immigration" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default USAToCanadaPage;
