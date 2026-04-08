import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Clock, TrendingUp, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EligibilityForm from "@/components/EligibilityForm";
import { countries } from "@/data/countryData";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
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
      {/* Hero */}
      <section className="bg-primary pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-8">
            <Link to="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-primary-foreground/70">Immigration</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">{country.name}</span>
          </nav>
          <div className="max-w-3xl">
            <span className="text-6xl mb-4 block">{country.flag}</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              {country.name} Immigration 2026
            </h1>
            <p className="text-lg text-primary-foreground/70 mb-6">{country.heroDescription}</p>
            <a href="#eligibility">
              <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-semibold shadow-gold">
                Check Eligibility <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Pathways */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8">
            Immigration Pathways to {country.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {country.pathways.map((p, i) => (
              <motion.div key={p.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <div className="bg-card rounded-xl border border-border p-6 h-full hover:shadow-card transition-shadow">
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8">Eligibility Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {country.eligibility.map((e) => (
              <div key={e.title} className="bg-card rounded-xl border border-border p-6">
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
            ))}
          </div>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="py-12 bg-gold/10">
        <div className="container-narrow mx-auto text-center px-4">
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">Not Sure If You Qualify?</h2>
          <p className="text-muted-foreground mb-6">Get a free assessment — our experts will match you with the right pathway.</p>
          <a href="#eligibility">
            <Button className="bg-gold text-accent-foreground hover:bg-gold-dark font-semibold shadow-gold">
              Free Eligibility Check <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </section>

      {/* Steps */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8">Step-by-Step Process</h2>
          <div className="space-y-4">
            {country.steps.map((s) => (
              <div key={s.step} className="flex gap-4 items-start bg-card rounded-xl border border-border p-6">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <span className="font-display font-bold text-gold">{s.step}</span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8">
            <Clock className="inline h-7 w-7 text-gold mr-2" />
            Processing Timelines
          </h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-display font-semibold text-foreground">Stage</th>
                  <th className="text-left p-4 font-display font-semibold text-foreground">Duration</th>
                </tr>
              </thead>
              <tbody>
                {country.timeline.map((t) => (
                  <tr key={t.stage} className="border-b border-border last:border-0">
                    <td className="p-4 text-sm text-foreground">{t.stage}</td>
                    <td className="p-4 text-sm text-gold font-medium">{t.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Job Market */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8">
            <TrendingUp className="inline h-7 w-7 text-gold mr-2" />
            Job Market Insights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {country.jobMarket.map((j) => (
              <div key={j.sector} className="bg-card rounded-xl border border-border p-4 text-center">
                <div className="font-semibold text-foreground text-sm">{j.sector}</div>
                <div className={`text-xs mt-1 font-medium ${j.demand === "Very High" ? "text-success" : "text-gold"}`}>{j.demand}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
            {country.name} Immigration FAQ
          </h2>
          <div className="space-y-4">
            {country.faqs.map((faq, i) => (
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

      {/* CTA */}
      <section className="section-padding bg-primary" id="eligibility">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
                Start Your {country.name} Immigration Journey
              </h2>
              <p className="text-primary-foreground/70">Get a free eligibility assessment and personalized pathway recommendation from our {country.name} immigration experts.</p>
            </div>
            <div className="bg-card rounded-xl p-6 md:p-8 shadow-elevated">
              <EligibilityForm sourcePage={`country-${country.slug}`} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CountryPage;
