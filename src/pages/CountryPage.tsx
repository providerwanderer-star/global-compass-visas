import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Clock, TrendingUp, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EligibilityForm from "@/components/EligibilityForm";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedCounter from "@/components/AnimatedCounter";
import { countries } from "@/data/countryData";
import FAQCallToAction from "@/components/FAQCallToAction";
import CanadaRedirectBanner from "@/components/CanadaRedirectBanner";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const CountryPage = () => {
  const { slug } = useParams();
  const country = countries.find((c) => c.slug === slug);

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Country Not Found</h1>
          <Link to="/" className="text-gold hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>{country.metaTitle}</title>
        <meta name="description" content={country.metaDescription} />
        <link rel="canonical" href={`https://www.4acesvisa.com/immigration/${country.slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={country.metaTitle} />
        <meta property="og:description" content={country.metaDescription} />
        <meta property="og:url" content={`https://www.4acesvisa.com/immigration/${country.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={country.metaTitle} />
        <meta name="twitter:description" content={country.metaDescription} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.4acesvisa.com" },
              { "@type": "ListItem", "position": 2, "name": `${country.name} Immigration`, "item": `https://www.4acesvisa.com/immigration/${country.slug}` }
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": country.faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
            }))
          })}
        </script>
      </Helmet>
      {/* Hero */}
      <section className="bg-primary pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-8"
          >
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-primary-foreground/70">Immigration</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">{country.name}</span>
          </motion.nav>
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-6xl mb-4 block"
            >
              {country.flag}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4"
            >
              {country.name} Immigration 2026
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-primary-foreground/70 mb-6"
            >
              {country.heroDescription}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <a href="#eligibility">
                <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-semibold shadow-gold hover:scale-105 transition-transform">
                  Check Eligibility <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {country.slug !== "canada" && <CanadaRedirectBanner countryName={country.name} />}

      {/* Quick Answer (AEO/GEO direct-answer block) */}
      {country.quickAnswer && (
        <section className="bg-card border-b border-border">
          <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-3xl border-l-4 border-gold pl-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-2">Quick Answer</p>
              <p className="text-base md:text-lg text-foreground leading-relaxed">{country.quickAnswer}</p>
            </div>
          </div>
        </section>
      )}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold text-foreground mb-8">
              Immigration Pathways to {country.name}
            </h2>
          </AnimatedSection>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {country.pathways.map((p) => (
              <motion.div key={p.title} variants={staggerItem}>
                <div className="bg-card rounded-xl border border-border p-6 h-full card-interactive glow-hover">
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold text-foreground mb-8">Eligibility Requirements</h2>
          </AnimatedSection>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {country.eligibility.map((e) => (
              <motion.div key={e.title} variants={staggerItem}>
                <div className="bg-card rounded-xl border border-border p-6 card-interactive">
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">{e.title}</h3>
                  <ul className="space-y-2">
                    {e.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mid CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-12 bg-gold/10"
      >
        <div className="container-narrow mx-auto text-center px-4">
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">Not Sure If You Qualify?</h2>
          <p className="text-muted-foreground mb-6">Get a free assessment — our experts will match you with the right pathway.</p>
          <a href="#eligibility">
            <Button className="bg-gold text-accent-foreground hover:bg-gold-dark font-semibold shadow-gold hover:scale-105 transition-transform">
              Free Eligibility Check <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </motion.section>

      {/* Steps */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold text-foreground mb-8">Step-by-Step Process</h2>
          </AnimatedSection>
          <div className="space-y-4">
            {country.steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex gap-4 items-start bg-card rounded-xl border border-border p-6 card-interactive"
              >
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <span className="font-display font-bold text-gold">{s.step}</span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{s.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold text-foreground mb-8">
              <Clock className="inline h-7 w-7 text-gold mr-2" />
              Processing Timelines
            </h2>
          </AnimatedSection>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl border border-border overflow-hidden"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-display font-semibold text-foreground">Stage</th>
                  <th className="text-left p-4 font-display font-semibold text-foreground">Duration</th>
                </tr>
              </thead>
              <tbody>
                {country.timeline.map((t) => (
                  <tr key={t.stage} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="p-4 text-sm text-foreground">{t.stage}</td>
                    <td className="p-4 text-sm text-gold font-medium">{t.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Job Market */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold text-foreground mb-8">
              <TrendingUp className="inline h-7 w-7 text-gold mr-2" />
              Job Market Insights
            </h2>
          </AnimatedSection>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {country.jobMarket.map((j) => (
              <motion.div key={j.sector} variants={staggerItem}>
                <div className="bg-card rounded-xl border border-border p-4 text-center card-interactive">
                  <div className="font-semibold text-foreground text-sm">{j.sector}</div>
                  <div className={`text-xs mt-1 font-medium ${j.demand === "Very High" ? "text-success" : "text-gold"}`}>{j.demand}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto max-w-3xl">
          <AnimatedSection className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-foreground">
              {country.name} Immigration FAQ
            </h2>
          </AnimatedSection>
          <div className="space-y-4">
            {country.faqs.map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl border border-border group card-interactive"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer font-display font-semibold text-foreground text-sm md:text-base">
                  {faq.question}
                  <span className="text-gold ml-4 text-xl group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">{faq.answer}</div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary" id="eligibility">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
                Start Your {country.name} Immigration Journey
              </h2>
              <p className="text-primary-foreground/70">Get a free eligibility assessment and personalized pathway recommendation from our {country.name} immigration experts.</p>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="bg-card rounded-xl p-6 md:p-8 shadow-elevated">
                <EligibilityForm sourcePage={`country-${country.slug}`} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <FAQCallToAction />
    </div>
  );
};

export default CountryPage;
