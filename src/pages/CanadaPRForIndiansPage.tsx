import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, CheckCircle, ChevronRight, Phone, Zap, Award, Users, TrendingUp } from "lucide-react";
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
  "Indians can obtain Canadian Permanent Residency in 2026 through Express Entry (PR in 6–12 months), Provincial Nominee Programs (PNPs), Canadian study + PGWP, family sponsorship, or the Start-Up Visa. India remains the #1 source country, with over 100,000 Indian PRs admitted annually. Most applicants need IELTS CLB 7+, an ECA-evaluated degree, and skilled work experience.";

const FAQS = [
  {
    question: "What is the fastest way for an Indian to get Canada PR in 2026?",
    answer:
      "Express Entry under the Federal Skilled Worker (FSW) or Canadian Experience Class (CEC) stream is the fastest, with PR typically issued in 6–12 months from profile creation. If you already studied in Canada and have a PGWP, CEC is even faster. PNPs add 6–9 months but boost CRS by 600 points, making them a strong backup if your CRS is below 470.",
  },
  {
    question: "What CRS score do Indians need for Express Entry in 2026?",
    answer:
      "Recent general draws have cut off between 440 and 488. Category-based draws (healthcare, STEM, trades, French speakers) often go as low as 420–445. Most successful Indian applicants score 470–510 — typically a 27–32 year-old with a master's or bachelor's, IELTS 8.0, and 3+ years of skilled experience. Use a CRS calculator first to assess your gap.",
  },
  {
    question: "Do I need IELTS or can I take CELPIP / TEF instead?",
    answer:
      "For English: IELTS General Training and CELPIP General are both accepted. Most Indians take IELTS due to wider availability across Indian cities. For French: TEF Canada or TCF Canada. Higher language scores massively boost CRS — moving from CLB 7 to CLB 9 in all four abilities can add 50–80 points and qualify you for French-speaker draws (typically the lowest cutoffs).",
  },
  {
    question: "How much does Canada PR cost for an Indian family in 2026?",
    answer:
      "Government fees: approximately CAD 1,365 for principal applicant, CAD 1,365 for spouse, CAD 230 per child, plus CAD 575 RPRF per adult. Add IELTS (~₹17,000), ECA (~₹25,000), medicals (~₹6,000–10,000 per person), PCC, biometrics (CAD 85–170), and translations. Total for a family of 4 typically ranges between CAD 5,500–7,500. You must also show proof of settlement funds — about CAD 27,500 for a family of 4 in 2026.",
  },
  {
    question: "Which Canadian provinces are best for Indian immigrants?",
    answer:
      "Ontario hosts the largest Indian community (Brampton, Mississauga, Toronto). British Columbia has strong Punjabi communities in Surrey and Vancouver. Alberta (Calgary, Edmonton) offers lower cost of living and a fast PNP. Saskatchewan and Manitoba PNPs have historically had lower CRS thresholds and are great for first PR. Atlantic provinces (NB, NS, PEI, NL) offer the AIP program with employer-driven nominations.",
  },
  {
    question: "Can I include my parents in my Canada PR application?",
    answer:
      "No — parents are not dependents under PR. After you become a Canadian PR or citizen, you can sponsor your parents or grandparents through the Parents and Grandparents Program (PGP), or bring them on a 10-year multiple-entry Super Visa. PGP uses a lottery system and has annual caps, so the Super Visa is often the more reliable interim solution.",
  },
  {
    question: "Should I apply through Express Entry or PNP first?",
    answer:
      "Submit your Express Entry profile first — it costs nothing and makes you visible to all 11 PNPs simultaneously. If your CRS is 480+, you'll likely get an ITA in a federal draw. If your CRS is 440–479, target an Enhanced PNP (Ontario OINP, BC PNP, Alberta AAIP, Saskatchewan SINP) for the +600-point nomination boost. Below CRS 440, focus on PNP-only Base streams or improving language scores.",
  },
  {
    question: "What happens after I receive my Canada PR — what should I do first?",
    answer:
      "Within 1 year of COPR issuance, you must land in Canada to activate PR. On landing, get your SIN at Service Canada (free), apply for provincial health card, open a Canadian bank account (RBC/TD/Scotiabank/CIBC have newcomer programs), apply for a credit card, get a driver's license, register kids in school, and file taxes annually. Citizenship is available after 3 years (1,095 days) of physical presence within any 5-year period.",
  },
];

const COMPARISON = [
  { stream: "Express Entry — FSW", best: "Skilled workers outside Canada with degree + IELTS + experience", crs: "Above ~445 in general draws", time: "6–12 months" },
  { stream: "Express Entry — CEC", best: "Already worked in Canada 1+ year on PGWP / work permit", crs: "Above ~440", time: "5–8 months" },
  { stream: "Express Entry — STEM Category", best: "Tech, software, engineering, data professionals", crs: "Often 420–445", time: "6–10 months" },
  { stream: "Express Entry — French", best: "TEF/TCF NCLC 7+ in all 4 abilities", crs: "As low as 379 in 2025", time: "6–10 months" },
  { stream: "Ontario OINP — HCP", best: "Tech workers, master's/PhD grads, HCP stream candidates", crs: "Boost CRS by +600", time: "12–15 months" },
  { stream: "BC PNP — Tech", best: "Tech workers with BC job offer in eligible NOC", crs: "Boost CRS by +600", time: "12–14 months" },
  { stream: "Saskatchewan SINP", best: "Below CRS 440, in-demand occupation", crs: "Often 60–82 SINP score", time: "13–18 months" },
  { stream: "Atlantic Immigration Program", best: "Job offer in NB, NS, PEI, NL from designated employer", crs: "No CRS minimum", time: "10–14 months" },
];

const CanadaPRForIndiansPage = () => {
  return (
    <div>
      <Helmet>
        <title>Canada PR for Indians 2026: All Pathways, CRS Scores & Costs | 4 Aces Visa</title>
        <meta
          name="description"
          content="Complete 2026 guide to Canada PR for Indian applicants. Express Entry, PNPs, costs, CRS scores, IELTS requirements, settlement funds, and step-by-step process. Free assessment."
        />
        <link rel="canonical" href="https://www.4acesvisa.com/canada-pr-for-indians" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Canada PR for Indians 2026: All Pathways, CRS Scores & Costs" />
        <meta property="og:description" content="Express Entry, PNPs, study + PGWP, costs, IELTS, and settlement funds for Indian PR applicants in 2026. Free expert assessment." />
        <meta property="og:url" content="https://www.4acesvisa.com/canada-pr-for-indians" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                headline: "Canada PR for Indians 2026: All Pathways, CRS Scores & Costs",
                description: QUICK_ANSWER,
                author: { "@type": "Organization", name: "4 Aces Visa" },
                publisher: { "@type": "Organization", name: "4 Aces Visa" },
                datePublished: "2026-01-25",
                dateModified: "2026-04-18",
                mainEntityOfPage: "https://www.4acesvisa.com/canada-pr-for-indians",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.4acesvisa.com/" },
                  { "@type": "ListItem", position: 2, name: "Canada PR for Indians", item: "https://www.4acesvisa.com/canada-pr-for-indians" },
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
            <span className="text-gold">Canada PR for Indians</span>
          </nav>
          <span className="inline-flex items-center gap-2 bg-gold/20 text-gold px-3 py-1.5 rounded-full text-xs font-bold mb-4 border border-gold/30">
            <Award className="h-3.5 w-3.5" /> India is Canada's #1 Source Country
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-5 leading-tight max-w-3xl">
            Canada PR for Indians — 2026 Complete Guide
          </h1>
          <p className="text-lg text-primary-foreground/70 mb-6 max-w-2xl">
            Over 100,000 Indians get Canadian PR every year. Here's exactly which pathway fits you, what it costs, and how to maximize your CRS for the next Express Entry draw.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#assessment">
              <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold shadow-gold">
                Find My Best PR Pathway <ArrowRight className="ml-2 h-4 w-4" />
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

      {/* Why India is #1 */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Why Indians Lead Canadian Immigration in 2026
            </h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                India has been Canada's largest source country for permanent residents every year since 2017. In recent IRCC data, Indians accounted for over <strong>27% of all new PRs</strong> — more than the next four countries combined. The reasons: strong English proficiency, high education levels, established diaspora networks in Brampton, Surrey, Calgary, and Mississauga, and a deep cultural compatibility with Canada's multicultural society.
              </p>
              <p>
                Canada's 2025–2027 Immigration Levels Plan targets approximately 232,000 economic-class admissions per year, with significant share allocated to Express Entry, PNPs, and Canadian Experience Class. Category-based draws for STEM, healthcare, and French speakers continue, and Indians dominate the tech/STEM intake by a wide margin.
              </p>
              <p>
                The catch: 2024–2025 saw rising CRS cutoffs in general draws (often 480+) as the federal pool grew. The winning strategy in 2026 is to (1) maximize language scores, (2) target a category-based or PNP draw, and (3) avoid common documentation errors that cause refusals.
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
              Best PR Pathways for Indians in 2026
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              Compare federal Express Entry streams, PNPs, and regional programs side-by-side
            </p>
          </AnimatedSection>
          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-card">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/80">
                  <TableHead className="font-semibold text-foreground">Stream</TableHead>
                  <TableHead className="font-semibold text-foreground">Best For</TableHead>
                  <TableHead className="font-semibold text-foreground">CRS / Threshold</TableHead>
                  <TableHead className="font-semibold text-gold">Timeline</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {COMPARISON.map((row) => (
                  <TableRow key={row.stream}>
                    <TableCell className="font-medium text-foreground">{row.stream}</TableCell>
                    <TableCell className="text-muted-foreground">{row.best}</TableCell>
                    <TableCell className="text-muted-foreground">{row.crs}</TableCell>
                    <TableCell className="text-foreground font-medium">{row.time}</TableCell>
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
            Confused which stream fits your profile? Get a free expert review.
          </span>
          <a href="#assessment">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
              Find My Best Pathway <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </a>
        </div>
      </section>

      {/* CRS Boost Tips */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Top Ways Indian Applicants Boost CRS in 2026
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: TrendingUp, title: "Hit CLB 9 in IELTS", desc: "Moving from CLB 7 to CLB 9 in all four bands can add 50–80 CRS points and unlocks 'skill transferability' bonuses with your education and experience." },
              { icon: Users, title: "Add Spouse Factors", desc: "Spouse's IELTS, ECA, and Canadian work experience can add up to 40 CRS points. Worth having spouse take IELTS even if not the principal applicant." },
              { icon: Award, title: "Get a PNP Nomination", desc: "An Ontario, BC, Alberta, or Saskatchewan PNP nomination instantly adds 600 CRS points — guaranteeing an ITA in the next round of invitations." },
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
              Canada PR for Indians — FAQs
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
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <Link to="/express-entry" className="bg-card border border-border rounded-lg p-3 hover:border-gold transition-colors flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-gold" /> Full Express Entry guide
            </Link>
            <Link to="/crs-calculator" className="bg-card border border-border rounded-lg p-3 hover:border-gold transition-colors flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-gold" /> Try the free CRS calculator
            </Link>
          </div>
        </div>
      </section>

      {/* Assessment */}
      <section id="assessment" className="section-padding bg-primary">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
              Free Canada PR Assessment for Indians
            </h2>
            <p className="text-primary-foreground/70 max-w-lg mx-auto">
              Share your profile — we'll score your CRS, recommend the best stream (Express Entry, PNP, study, or Start-Up Visa), and outline next steps within 24 hours.
            </p>
          </div>
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card max-w-2xl mx-auto">
            <EligibilityForm sourcePage="canada-pr-for-indians" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CanadaPRForIndiansPage;
