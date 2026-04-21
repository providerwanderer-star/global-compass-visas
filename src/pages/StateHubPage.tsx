import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, ChevronRight, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import EligibilityForm from "@/components/EligibilityForm";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedCounter from "@/components/AnimatedCounter";
import { stateHubs } from "@/data/stateHubData";
import { cities } from "@/data/cityData";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const StateHubPage = () => {
  const { slug } = useParams();
  const hub = stateHubs.find((h) => h.slug === slug);

  if (!hub) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Page Not Found</h1>
          <Link to="/" className="text-gold hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const hubCities = hub.cities.map((s) => cities.find((c) => c.slug === s)).filter(Boolean);

  return (
    <div>
      <Helmet>
        <title>{hub.metaTitle}</title>
        <meta name="description" content={hub.metaDescription} />
        <link rel="canonical" href={`https://www.4acesvisa.com${hub.parentPath}/${hub.slug}`} />
        <meta property="og:title" content={hub.metaTitle} />
        <meta property="og:description" content={hub.metaDescription} />
        <meta property="og:url" content={`https://www.4acesvisa.com${hub.parentPath}/${hub.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "ProfessionalService",
                name: `4 Aces Visa – ${hub.name}`,
                description: hub.metaDescription,
                url: `https://www.4acesvisa.com${hub.parentPath}/${hub.slug}`,
                telephone: "+16478622190",
                areaServed: hub.name,
                aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "500", bestRating: "5" },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.4acesvisa.com/" },
                  { "@type": "ListItem", position: 2, name: hub.parentLabel, item: `https://www.4acesvisa.com${hub.parentPath}` },
                  { "@type": "ListItem", position: 3, name: hub.name, item: `https://www.4acesvisa.com${hub.parentPath}/${hub.slug}` },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: hub.faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: { "@type": "Answer", text: faq.answer },
                })),
              },
            ],
          })}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="bg-primary pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-8">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to={hub.parentPath} className="hover:text-gold transition-colors">{hub.parentLabel}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">{hub.name}</span>
          </motion.nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-4">
            <MapPin className="h-6 w-6 text-gold" />
            <span className="text-gold font-medium">{hub.parentLabel}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
            {hub.h1}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-primary-foreground/70 max-w-2xl mb-6">
            {hub.intro}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-4">
            <a href="#form">
              <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-semibold shadow-gold hover:scale-105 transition-transform">
                Free Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a href="tel:+16478622190">
              <Button size="lg" className="bg-transparent border-2 border-white/40 text-white hover:bg-white/10 font-semibold hover:border-white/70 transition-all">
                <Phone className="mr-2 h-4 w-4" /> Call Now
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {hub.stats.map((stat) => (
              <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-card rounded-xl border border-border p-6 card-interactive">
                <AnimatedCounter value={stat.value === "Free" ? "Free" : stat.value} label={stat.label} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pathways */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
              Immigration Pathways from {hub.name}
            </h2>
          </AnimatedSection>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {hub.pathways.map((p) => (
              <motion.div key={p.title} variants={staggerItem}>
                <Link to={p.link} className="block bg-card rounded-xl border border-border p-6 card-interactive glow-hover h-full">
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{p.desc}</p>
                  <span className="text-gold text-sm font-semibold flex items-center gap-1">Learn More <ArrowRight className="h-3 w-3" /></span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* City Pages */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-center">
              Immigration Help in {hub.name} Cities
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
              Get city-specific immigration guidance, local FAQs, and expert support in your area.
            </p>
          </AnimatedSection>
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {hubCities.map((city) => city && (
              <motion.div key={city.slug} variants={staggerItem}>
                <Link to={`/city/${city.slug}`} className="flex items-center gap-2 bg-card rounded-xl border border-border p-4 card-interactive glow-hover">
                  <MapPin className="h-4 w-4 text-gold shrink-0" />
                  <span className="font-medium text-foreground text-sm">{city.name}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto max-w-3xl">
          <AnimatedSection className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Immigration FAQ — {hub.name}
            </h2>
          </AnimatedSection>
          <div className="space-y-4">
            {hub.faqs.map((faq, i) => (
              <motion.details key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-card rounded-xl border border-border group card-interactive">
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

      {/* Lead Form */}
      <section className="section-padding bg-primary" id="form">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
                Get Expert Immigration Help in {hub.name}
              </h2>
              <p className="text-primary-foreground/70 mb-6">
                Fill out the form for a free eligibility assessment. Our {hub.name} immigration experts will contact you within 24 hours.
              </p>
              <ul className="space-y-3">
                {["Free expert assessment", "Response within 24 hours", "No obligation consultation", "100% confidential"].map((item, i) => (
                  <motion.li key={item} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                    <CheckCircle className="h-4 w-4 text-gold" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="bg-card rounded-xl p-6 md:p-8 shadow-elevated">
                <EligibilityForm sourcePage={`state-${hub.slug}`} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StateHubPage;
