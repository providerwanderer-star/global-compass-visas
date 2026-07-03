import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Crown, Award, Star, Phone, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Tier = {
  name: string;
  tagline: string;
  prices: { label: string; value: string }[];
  includes: string[];
  cta: string;
  badge?: string;
  paymentTerms?: string;
  icon: typeof Crown;
  highlight?: boolean;
  metalClass: string;
};

const tiers: Tier[] = [
  {
    name: "Platinum",
    tagline: "End-to-end support from day one to your COPR",
    prices: [
      { label: "Individual file", value: "$2,000" },
      { label: "Couple / PR file", value: "$2,500" },
    ],
    includes: [
      "Full consulting and file assistance through the entire PR process",
      "Unlimited consulting and assessment calls, booked as needed",
      "A dedicated partner with you from day one to your golden COPR email",
      "Only added cost is the government application fee (payable by you or by us on your behalf)",
    ],
    paymentTerms: "$1,500 advance, balance due once you receive the invitation",
    cta: "Book a Call",
    badge: "Most Comprehensive",
    icon: Crown,
    highlight: true,
    metalClass: "from-[#e5e4e2] to-[#b8b8b8]",
  },
  {
    name: "Gold",
    tagline: "Expert guidance while you file it yourself",
    prices: [
      { label: "Individual file", value: "$700" },
      { label: "Couple file", value: "$1,000" },
    ],
    includes: [
      "All preliminary consulting and discussions through the full PR process",
      "A dedicated partner with you from day one to your COPR",
      "You handle filing and submission; we review your completed documents",
      "Ideal for hands-on clients who want expert oversight",
    ],
    cta: "Get Started",
    icon: Award,
    metalClass: "from-[#f5d76e] to-[#c9a227]",
  },
  {
    name: "Silver",
    tagline: "Test the waters before you commit",
    prices: [
      { label: "Individual", value: "$250" },
      { label: "Couple", value: "$300" },
    ],
    includes: [
      "A preliminary round of expert discussions",
      "Help clarifying your pathway options and feasibility",
      "Guidance to support your decision-making",
      "Fee fully credited toward Platinum or Gold if you move forward",
    ],
    cta: "Get Started",
    icon: Star,
    metalClass: "from-[#d8d8d8] to-[#a0a0a0]",
  },
  {
    name: "Bronze",
    tagline: "One focused call, real answers",
    prices: [{ label: "Per call (45 minutes)", value: "$100" }],
    includes: [
      "One-on-one profile review and options discussion",
      "No commitment required",
      "Fee fully credited toward Platinum or Gold if you move forward",
    ],
    cta: "Book a Call",
    icon: Sparkles,
    metalClass: "from-[#cd7f32] to-[#8b4513]",
  },
];

const faqs = [
  {
    q: "Can I upgrade my package later?",
    a: "Yes — absolutely. Fees paid for Silver (preliminary consulting) or Bronze (single call) are fully credited toward a Platinum or Gold engagement if you decide to move forward with us. You only ever pay the difference.",
  },
  {
    q: "What's included in government fees?",
    a: "Government fees (IRCC processing fees, Right of Permanent Residence fee, biometrics, medical exams, language tests, ECA, police certificates) are paid directly to the issuing authority and are NOT included in our package pricing. We give you a clear, itemized estimate up front so there are no surprises.",
  },
  {
    q: "How are calls scheduled?",
    a: "After you book, you'll receive a calendar link to pick a time that works for you. Calls are held over Zoom, Google Meet, or WhatsApp video — whatever you prefer. Platinum clients get priority scheduling and unlimited follow-up calls throughout their file.",
  },
];

const PackagesPage = () => {
  return (
    <>
      <Helmet>
        <title>Our Packages — Garg Brothers Canada PR Consulting</title>
        <meta
          name="description"
          content="Choose the right level of support for your Canada PR journey. Platinum, Gold, Silver and Bronze packages from Garg Brothers — transparent pricing from $100."
        />
        <link rel="canonical" href="https://www.gargbrothers.ca/packages" />
      </Helmet>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0a1f44] via-[#0f2a5c] to-[#0a1f44] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_20%,#d4af37_0,transparent_40%),radial-gradient(circle_at_80%_80%,#d4af37_0,transparent_40%)]" />
        <div className="container-narrow mx-auto px-4 py-16 md:py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-wider mb-6">
              <Crown className="h-3.5 w-3.5" /> Our Packages
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight mb-5">
              Choose the Right Level of Support for Your{" "}
              <span className="text-gold">Canada PR Journey</span>
            </h1>
            <p className="text-base md:text-lg text-white/75 leading-relaxed">
              Every client's situation is different. Whether you want a single focused call
              or end-to-end filing assistance through to your COPR, we have a transparent,
              fixed-price package designed for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container-narrow mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-7 items-stretch">
            {tiers.map((tier, i) => {
              const Icon = tier.icon;
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`group relative flex flex-col rounded-2xl bg-white border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                    tier.highlight
                      ? "border-gold shadow-gold ring-1 ring-gold/40 xl:scale-[1.03]"
                      : "border-border shadow-card"
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold to-gold-dark text-accent-foreground text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-gold whitespace-nowrap">
                      ★ Most Popular
                    </div>
                  )}

                  <div className="p-7 pb-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.metalClass} flex items-center justify-center shadow-md`}
                      >
                        <Icon className="h-6 w-6 text-white drop-shadow" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-extrabold text-primary leading-tight">
                          {tier.name}
                        </h3>
                        {tier.badge && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gold">
                            {tier.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground italic mb-5 min-h-[2.5rem]">
                      {tier.tagline}
                    </p>

                    <div className="space-y-1.5 pb-5 border-b border-border">
                      {tier.prices.map((p) => (
                        <div key={p.label} className="flex items-baseline justify-between gap-2">
                          <span className="text-xs text-muted-foreground">{p.label}</span>
                          <span className="font-display text-2xl font-extrabold text-primary">
                            {p.value}
                            <span className="text-xs font-medium text-muted-foreground ml-1">CAD</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="px-7 pb-6 flex-1">
                    <ul className="space-y-2.5">
                      {tier.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/80">
                          <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                    {tier.paymentTerms && (
                      <div className="mt-5 px-3 py-2.5 rounded-lg bg-gold/10 border border-gold/30 text-xs text-foreground/80">
                        <strong className="text-primary">Payment terms:</strong>{" "}
                        {tier.paymentTerms}
                      </div>
                    )}
                  </div>

                  <div className="p-7 pt-0">
                    <Link to="/contact">
                      <Button
                        className={`w-full font-semibold ${
                          tier.highlight
                            ? "bg-gold text-accent-foreground hover:bg-gold-dark shadow-gold"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        }`}
                      >
                        {tier.cta} <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
            <strong className="text-primary">Good to know:</strong> Silver and Bronze fees are
            fully credited toward your Platinum or Gold engagement if you decide to upgrade
            later — so there's no risk in starting small.
          </p>
        </div>
      </section>

      {/* Discovery CTA banner */}
      <section className="bg-gradient-to-r from-[#0a1f44] to-[#143270] text-white py-12">
        <div className="container-narrow mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold mb-2">
              Not sure which package fits?
            </h2>
            <p className="text-white/75 text-sm md:text-base">
              Book a free 15-minute discovery chat. We'll help you pick the right level of
              support — no obligation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link to="/contact">
              <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-semibold shadow-gold">
                Book Free Discovery Call <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <a href="tel:+16478622190">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 bg-transparent">
                <Phone className="mr-1 h-4 w-4" /> +1 647 862 2190
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-narrow mx-auto px-4 max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-primary text-center mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-8">
            Quick answers about our packages and pricing.
          </p>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`faq-${i}`}
                className="border border-border rounded-lg px-5 bg-secondary/30"
              >
                <AccordionTrigger className="text-left font-semibold text-primary hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/75 leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
};

export default PackagesPage;