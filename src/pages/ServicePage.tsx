import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EligibilityForm from "@/components/EligibilityForm";
import { services } from "@/data/serviceData";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
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
        <link rel="canonical" href={`https://4acesvisa.com/services/${service.slug}`} />
        <meta property="og:title" content={service.metaTitle} />
        <meta property="og:description" content={service.metaDescription} />
        <meta property="og:url" content={`https://4acesvisa.com/services/${service.slug}`} />
      </Helmet>
      {/* Hero */}
      <section className="bg-primary pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-8">
            <Link to="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-primary-foreground/70">Services</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">{service.title}</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              {service.title}
            </h1>
            <p className="text-lg text-primary-foreground/70 mb-8">{service.heroDescription}</p>
            <a href="#form">
              <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-semibold shadow-gold">
                Free Eligibility Check <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">{service.overview}</p>
              
              <h3 className="font-display text-xl font-bold text-foreground mb-4">Key Benefits</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {service.benefits.map((b) => (
                  <div key={b} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <aside className="hidden lg:block">
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Quick Assessment</h3>
                <EligibilityForm sourcePage={`service-${service.slug}`} />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8">Eligibility Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.eligibility.map((e) => (
              <motion.div key={e.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
                <div className="bg-card rounded-xl border border-border p-6 h-full">
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
          </div>
        </div>
      </section>

      {/* CTA mid-section */}
      <section className="py-12 bg-gold/10">
        <div className="container-narrow mx-auto text-center px-4">
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">
            Not Sure If You Qualify?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Get a free personalized assessment from our experts. No obligation, 100% confidential.
          </p>
          <a href="#form">
            <Button className="bg-gold text-accent-foreground hover:bg-gold-dark font-semibold shadow-gold">
              Check My Eligibility <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8">Step-by-Step Process</h2>
          <div className="space-y-4">
            {service.process.map((s, i) => (
              <motion.div key={s.step} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <div className="flex gap-4 items-start bg-card rounded-xl border border-border p-6">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <span className="font-display font-bold text-gold">{s.step}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{s.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq, i) => (
              <details key={i} className="bg-card rounded-xl border border-border group">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-display font-semibold text-foreground text-sm md:text-base">
                  {faq.question}
                  <span className="text-gold ml-4 text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="section-padding bg-primary" id="form">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
                Start Your {service.title} Application
              </h2>
              <p className="text-primary-foreground/70 mb-6">
                Get a free eligibility assessment from our immigration experts. We'll analyze your profile and recommend the best pathway.
              </p>
              <ul className="space-y-3">
                {["Free expert assessment", "Response within 24 hours", "98% success rate", "Transparent pricing"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                    <CheckCircle className="h-4 w-4 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-xl p-6 md:p-8 shadow-elevated">
              <EligibilityForm sourcePage={`service-${service.slug}`} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
