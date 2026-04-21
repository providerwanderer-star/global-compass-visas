import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EligibilityForm from "@/components/EligibilityForm";
import AnimatedSection from "@/components/AnimatedSection";
import InternalLinks from "@/components/InternalLinks";
import { services } from "@/data/serviceData";
import { serviceToBlogs, getRelatedBlogData, getRelatedToolData, DEFAULT_TOOL_SET } from "@/data/internalLinks";
import FAQCallToAction from "@/components/FAQCallToAction";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ServicePage = () => {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Service Not Found</h1>
          <Link to="/" className="text-gold hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>{service.metaTitle}</title>
        <meta name="description" content={service.metaDescription} />
        <link rel="canonical" href={`https://www.4acesvisa.com/services/${service.slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={service.metaTitle} />
        <meta property="og:description" content={service.metaDescription} />
        <meta property="og:url" content={`https://www.4acesvisa.com/services/${service.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={service.metaTitle} />
        <meta name="twitter:description" content={service.metaDescription} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                name: service.title,
                description: service.metaDescription,
                url: `https://www.4acesvisa.com/services/${service.slug}`,
                provider: {
                  "@type": "Organization",
                  name: "4 Aces Visa",
                  telephone: "+16478622190",
                  url: "https://www.4acesvisa.com",
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.4acesvisa.com/" },
                  { "@type": "ListItem", position: 2, name: "Services", item: "https://www.4acesvisa.com/services" },
                  { "@type": "ListItem", position: 3, name: service.title, item: `https://www.4acesvisa.com/services/${service.slug}` },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: service.faqs.map((faq) => ({
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
            <span className="text-primary-foreground/70">Services</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">{service.title}</span>
          </motion.nav>
          <div className="max-w-3xl">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              {service.title}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-primary-foreground/70 mb-8">
              {service.heroDescription}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <a href="#form">
                <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-semibold shadow-gold hover:scale-105 transition-transform">
                  Free Eligibility Check <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Answer (AEO/GEO direct-answer block) */}
      {service.quickAnswer && (
        <section className="bg-card border-b border-border">
          <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-3xl border-l-4 border-gold pl-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-2">Quick Answer</p>
              <p className="text-base md:text-lg text-foreground leading-relaxed">{service.quickAnswer}</p>
            </div>
          </div>
        </section>
      )}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <AnimatedSection className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">{service.overview}</p>

              <h3 className="font-display text-xl font-bold text-foreground mb-4">Key Benefits</h3>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {service.benefits.map((b) => (
                  <motion.div key={b} variants={staggerItem} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground">{b}</span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatedSection>
            <aside className="hidden lg:block">
              <AnimatedSection delay={0.2}>
                <div className="bg-card rounded-xl border border-border p-6 sticky top-24 card-interactive">
                  <h3 className="font-display text-lg font-bold text-foreground mb-4">Quick Assessment</h3>
                  <EligibilityForm sourcePage={`service-${service.slug}`} />
                </div>
              </AnimatedSection>
            </aside>
          </div>
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
            {service.eligibility.map((e) => (
              <motion.div key={e.title} variants={staggerItem}>
                <div className="bg-card rounded-xl border border-border p-6 h-full card-interactive glow-hover">
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

      {/* CTA mid */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="py-12 bg-gold/10">
        <div className="container-narrow mx-auto text-center px-4">
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">Not Sure If You Qualify?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">Get a free personalized assessment from our experts. No obligation, 100% confidential.</p>
          <a href="#form">
            <Button className="bg-gold text-accent-foreground hover:bg-gold-dark font-semibold shadow-gold hover:scale-105 transition-transform">
              Check My Eligibility <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </motion.section>

      {/* Process Steps */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold text-foreground mb-8">Step-by-Step Process</h2>
          </AnimatedSection>
          <div className="space-y-4">
            {service.process.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
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

      {/* FAQ */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto max-w-3xl">
          <AnimatedSection className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          </AnimatedSection>
          <div className="space-y-4">
            {service.faqs.map((faq, i) => (
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

      <InternalLinks
        blogs={getRelatedBlogData(serviceToBlogs[service.slug] || []).map((b) => ({ slug: b.slug, title: b.title, excerpt: b.excerpt }))}
        tools={getRelatedToolData(DEFAULT_TOOL_SET).map((t) => ({ slug: t.slug, title: t.title, href: t.href, excerpt: t.excerpt }))}
        title="Related Articles"
      />

      <FAQCallToAction />

      {/* Lead Form */}
      <section className="section-padding bg-primary" id="form">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
                Start Your {service.title} Application
              </h2>
              <p className="text-primary-foreground/70 mb-6">
                Get a free eligibility assessment from our immigration experts. We'll analyze your profile and recommend the best pathway.
              </p>
              <ul className="space-y-3">
                {["Free expert assessment", "Response within 24 hours", "98% success rate", "Transparent pricing"].map((item, i) => (
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
                <EligibilityForm sourcePage={`service-${service.slug}`} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
