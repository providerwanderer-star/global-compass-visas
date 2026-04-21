import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Heart, Users, Baby, Plane, CheckCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import EligibilityForm from "@/components/EligibilityForm";
import AnimatedSection from "@/components/AnimatedSection";
import ToolsCallout from "@/components/ToolsCallout";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const programs = [
  {
    icon: Heart,
    title: "Spousal & Common-Law Sponsorship",
    desc: "Sponsor your spouse, common-law or conjugal partner. Inland and outland processing options. Spouse Open Work Permit (SOWP) available while waiting.",
    timeline: "10–14 months",
    href: "/services/family-sponsorship",
  },
  {
    icon: Users,
    title: "Parents & Grandparents (PGP)",
    desc: "Annual lottery-based program to sponsor parents/grandparents for Canadian PR. Strict income (MNI) requirements over the last 3 tax years.",
    timeline: "20–24 months",
    href: "/services/family-sponsorship",
  },
  {
    icon: Plane,
    title: "Super Visa (Parents/Grandparents)",
    desc: "10-year multi-entry visitor visa allowing stays up to 5 years per entry. Faster alternative when PGP intake is closed. Requires medical insurance & MNI.",
    timeline: "8–12 weeks",
    href: "/services/visitor-visa",
  },
  {
    icon: Baby,
    title: "Dependent Children",
    desc: "Sponsor biological or adopted children under 22. Included automatically in spousal applications or filed separately for older qualifying dependents.",
    timeline: "12 months",
    href: "/services/family-sponsorship",
  },
];

const faqs = [
  {
    q: "Who can be a sponsor under Canada's Family Class?",
    a: "You must be a Canadian citizen, PR, or registered Indian (18+), live in Canada (or plan to upon PR landing for spouse cases), and not be on social assistance other than disability. PGP sponsors must also meet the MNI for 3 consecutive tax years.",
  },
  {
    q: "What is the difference between inland and outland spousal sponsorship?",
    a: "Inland: applicant lives in Canada with status; eligible for Spouse Open Work Permit (SOWP) during processing. Outland: applicant is processed via the visa office serving their country of citizenship; allows travel during processing. Both reach ~10–14 month processing.",
  },
  {
    q: "How long does spousal sponsorship take in 2026?",
    a: "IRCC's service standard is 12 months for both inland and outland spousal applications. Most complete applications are finalized in 10–14 months. Always file a complete package — incomplete files are returned and reset the clock.",
  },
  {
    q: "Can I sponsor my parents if PGP intake is closed?",
    a: "Yes — apply for the Super Visa. It allows your parents to stay up to 5 years per entry for a 10-year period and is processed in 8–12 weeks. You'll need to meet LICO income, buy 1+ year medical insurance from a Canadian/approved insurer, and provide a letter of invitation.",
  },
  {
    q: "Do sponsored family members get permanent residence immediately?",
    a: "Once approved, spouses, partners, dependent children, and PGP applicants receive Confirmation of Permanent Residence (CoPR) and become PRs upon landing. Super Visa holders remain temporary residents (visitors), not PRs.",
  },
];

const FamilySponsorshipHubPage = () => (
  <div>
    <Helmet>
      <title>Canada Family Sponsorship 2026 — Spouse, Parents & Children | 4 Aces Visa</title>
      <meta
        name="description"
        content="Sponsor your spouse, parents, grandparents, or children for Canadian PR. Spousal sponsorship, PGP lottery, Super Visa, and SOWP — eligibility, timelines, and expert support."
      />
      <link rel="canonical" href="https://www.4acesvisa.com/family-sponsorship" />
      <meta property="og:title" content="Canada Family Sponsorship 2026 | 4 Aces Visa" />
      <meta property="og:description" content="Sponsor your spouse, parents, or children for Canada PR. Eligibility, timelines & expert guidance." />
      <meta property="og:url" content="https://www.4acesvisa.com/family-sponsorship" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              name: "Canada Family Sponsorship 2026",
              description: "Hub for spousal, PGP, Super Visa, and dependent children sponsorship.",
              url: "https://www.4acesvisa.com/family-sponsorship",
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.4acesvisa.com/" },
                { "@type": "ListItem", position: 2, name: "Family Sponsorship", item: "https://www.4acesvisa.com/family-sponsorship" },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
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
          <span className="text-gold">Family Sponsorship</span>
        </nav>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
          <span className="inline-flex items-center gap-2 bg-gold/20 text-gold px-3 py-1.5 rounded-full text-xs font-bold mb-4 border border-gold/30">
            <Heart className="h-3.5 w-3.5" /> Reunite Your Family in Canada
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
            Canada Family Sponsorship
            <span className="text-gold block mt-1">Spouse · Parents · Children</span>
          </h1>
          <p className="text-lg text-primary-foreground/70 mb-8 max-w-2xl">
            Sponsor your loved ones for Canadian permanent residence — or bring parents on a 10-year Super Visa.
            We handle every Family Class stream: spousal, PGP, Super Visa, and dependent children.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#assessment">
              <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold shadow-gold">
                Free Sponsorship Assessment <ArrowRight className="ml-2 h-4 w-4" />
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
            Canadian citizens and PRs aged 18+ can sponsor a spouse, common-law/conjugal partner, dependent
            child, or — through the annual PGP lottery — parents and grandparents. Spousal sponsorship takes
            ~12 months and includes a Spouse Open Work Permit. When PGP is closed, the 10-year Super Visa
            (8–12 weeks) is the fastest alternative.
          </p>
        </div>
      </div>
    </section>

    {/* Programs */}
    <section className="section-padding section-light">
      <div className="container-narrow mx-auto">
        <AnimatedSection>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
            Family Class Programs in 2026
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            Pick the right stream based on the family member you want to sponsor.
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((p, i) => (
            <motion.div
              key={p.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="bg-card rounded-xl border border-border p-6 hover:shadow-card hover:border-gold/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <p.icon className="h-6 w-6 text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-bold text-foreground mb-1">{p.title}</h3>
                  <p className="text-xs text-gold font-semibold mb-2">Processing: {p.timeline}</p>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{p.desc}</p>
                  <Link to={p.href}>
                    <Button variant="outline" size="sm" className="border-gold/40 text-gold hover:bg-gold/10 font-semibold">
                      Explore details <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Eligibility */}
    <section className="section-padding section-soft">
      <div className="container-narrow mx-auto max-w-4xl">
        <AnimatedSection>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
            Sponsor Eligibility Checklist
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Canadian citizen, PR, or registered Indian under the Indian Act",
            "At least 18 years of age",
            "Living in Canada (or planning to return for spouse cases at landing)",
            "Not in default on a previous sponsorship undertaking",
            "Not bankrupt or receiving social assistance (except disability)",
            "MNI (LICO + 30%) for last 3 tax years (PGP/Super Visa only)",
            "Sign a sponsorship undertaking — 3 years (spouse) to 20 years (PGP)",
            "No criminal convictions involving family violence",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2 bg-card rounded-lg border border-border p-4">
              <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
              <span className="text-sm text-foreground">{item}</span>
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
            Family Sponsorship FAQ
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
      tools={["crs-calculator", "processing-times", "express-entry-draws"]}
      title="Tools to plan your sponsorship"
      description="Estimate your CRS (if your spouse is also applying via Express Entry), check processing times, and benchmark draws."
      variant="soft"
    />

    {/* Form */}
    <section className="section-padding bg-primary" id="assessment">
      <div className="container-narrow mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
              Free Family Sponsorship Assessment
            </h2>
            <p className="text-primary-foreground/70 mb-6">
              Tell us who you want to sponsor and we'll map out the fastest, most cost-effective path —
              including documents, timelines, and SOWP eligibility.
            </p>
            <ul className="space-y-3">
              {["Stream recommendation (spouse / PGP / Super Visa)", "Eligibility & income (MNI/LICO) check", "Document checklist", "Spouse Open Work Permit guidance"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                  <CheckCircle className="h-4 w-4 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="bg-card rounded-xl p-6 md:p-8 shadow-elevated">
              <EligibilityForm sourcePage="family-sponsorship-hub" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  </div>
);

export default FamilySponsorshipHubPage;