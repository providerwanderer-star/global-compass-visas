import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, ChevronRight, MapPin, Star, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import EligibilityForm from "@/components/EligibilityForm";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedCounter from "@/components/AnimatedCounter";
import InternalLinks from "@/components/InternalLinks";
import FAQCallToAction from "@/components/FAQCallToAction";
import { cities } from "@/data/cityData";
import { cityToLinks, getRelatedBlogData, getRelatedServiceData } from "@/data/internalLinks";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const CityPage = () => {
  const { slug } = useParams();
  const city = cities.find((c) => c.slug === slug);

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold mb-4">City Not Found</h1>
          <Link to="/" className="text-gold hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>{city.metaTitle}</title>
        <meta name="description" content={city.metaDescription} />
        <link rel="canonical" href={`https://www.4acesvisa.com/city/${city.slug}`} />
        <meta property="og:title" content={city.metaTitle} />
        <meta property="og:description" content={city.metaDescription} />
        <meta property="og:url" content={`https://www.4acesvisa.com/city/${city.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={city.metaTitle} />
        <meta name="twitter:description" content={city.metaDescription} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "LocalBusiness",
                name: `4 Aces Visa – ${city.name}`,
                description: city.metaDescription,
                url: `https://www.4acesvisa.com/city/${city.slug}`,
                telephone: "+16478622190",
                email: "sahil280389@gmail.com",
                address: { "@type": "PostalAddress", addressLocality: city.name, addressCountry: city.country === "india" ? "IN" : "CA" },
                aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "500", bestRating: "5" },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.4acesvisa.com/" },
                  { "@type": "ListItem", position: 2, name: city.region, item: `https://www.4acesvisa.com/immigration/${city.country === "india" ? "canada" : city.country}` },
                  { "@type": "ListItem", position: 3, name: city.name, item: `https://www.4acesvisa.com/city/${city.slug}` },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: city.faqs.map((faq) => ({
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
            <span className="text-primary-foreground/70">{city.region}</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">{city.name}</span>
          </motion.nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-4">
            <MapPin className="h-6 w-6 text-gold" />
            <span className="text-gold font-medium">{city.region}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
            Immigration Consultant in {city.name}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-primary-foreground/70 max-w-2xl mb-4">
            {city.intro}
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-gold/80 text-sm font-medium mb-6 badge-pulse inline-block">
            ⚡ Limited free consultation slots available — book your assessment today
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="flex flex-wrap gap-4">
            <a href="#form">
              <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-semibold shadow-gold hover:scale-105 transition-transform">
                Speak to Expert in {city.name} <ArrowRight className="ml-2 h-4 w-4" />
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

      {/* Local Insight */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <div className="bg-card rounded-xl border border-gold/20 p-6 md:p-8 mb-12 card-interactive">
              <h2 className="font-display text-xl font-bold text-foreground mb-3">
                Why {city.name} for Immigration?
              </h2>
              <p className="text-muted-foreground leading-relaxed">{city.localInsight}</p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold text-foreground mb-8">
              Our Immigration Services in {city.name}
            </h2>
          </AnimatedSection>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {city.services.map((service) => (
              <motion.div key={service} variants={staggerItem}>
                <div className="flex items-start gap-3 bg-card rounded-xl border border-border p-5 card-interactive glow-hover">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                  <span className="text-foreground font-medium">{service}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Why Choose 4 Aces Visa in {city.name}?
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {[
              { value: "98%", label: "Success Rate" },
              { value: "15,000+", label: "Visas Processed" },
              { value: "10+", label: "Years Experience" },
              { value: "0", label: "Initial Assessment Cost" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl border border-border p-6 card-interactive"
              >
                <AnimatedCounter value={stat.value === "0" ? "Free" : stat.value} label={stat.label} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto max-w-2xl text-center">
          <AnimatedSection>
            <div className="bg-card rounded-xl border border-border p-8 card-interactive">
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                  >
                    <Star className="h-5 w-5 fill-gold text-gold" />
                  </motion.div>
                ))}
              </div>
              <p className="text-foreground italic mb-4">"{city.testimonial.text}"</p>
              <div className="font-semibold text-foreground">{city.testimonial.name}</div>
              <div className="text-sm text-gold">{city.testimonial.visa}</div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto max-w-3xl">
          <AnimatedSection className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Immigration FAQ — {city.name}
            </h2>
          </AnimatedSection>
          <div className="space-y-4">
            {city.faqs.map((faq, i) => (
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

      {/* Related Resources */}
      {(() => {
        const links = cityToLinks[city.slug] || { blogs: ["canada-pr-process-from-punjab-2026", "increase-crs-score-fast-2026"], services: ["express-entry", "pnp-application"] };
        return (
          <InternalLinks
            blogs={getRelatedBlogData(links.blogs).map((b) => ({ slug: b.slug, title: b.title, excerpt: b.excerpt }))}
            services={getRelatedServiceData(links.services).map((s) => ({ slug: s.slug, title: s.title }))}
            title={`Immigration Resources for ${city.name}`}
          />
        );
      })()}

      <FAQCallToAction />

      {/* Lead Form */}
      <section className="section-padding bg-primary" id="form">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
                Get Expert Immigration Help in {city.name}
              </h2>
              <p className="text-primary-foreground/70 mb-6">
                Fill out the form for a free eligibility assessment. Our {city.name} immigration experts will contact you within 24 hours.
              </p>
              <ul className="space-y-3">
                {["Free expert assessment", "Response within 24 hours", "No obligation consultation", "100% confidential"].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2 text-primary-foreground/80 text-sm"
                  >
                    <CheckCircle className="h-4 w-4 text-gold" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="bg-card rounded-xl p-6 md:p-8 shadow-elevated">
                <EligibilityForm sourcePage={`city-${city.slug}`} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CityPage;
