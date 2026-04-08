import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, ChevronRight, MapPin, Star, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import EligibilityForm from "@/components/EligibilityForm";
import { cities } from "@/data/cityData";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
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
      {/* Hero */}
      <section className="bg-primary pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-8">
            <Link to="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-primary-foreground/70">{city.region}</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">{city.name}</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-6 w-6 text-gold" />
            <span className="text-gold font-medium">{city.region}</span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
            Immigration Consultant in {city.name}
          </h1>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mb-8">{city.intro}</p>
          <div className="flex flex-wrap gap-4">
            <a href="#form">
              <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-semibold shadow-gold">
                Speak to Expert in {city.name} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a href="tel:+1234567890">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold">
                <Phone className="mr-2 h-4 w-4" /> Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8">
            Our Immigration Services in {city.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {city.services.map((service, i) => (
              <motion.div key={service} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <div className="flex items-start gap-3 bg-card rounded-xl border border-border p-5 hover:shadow-card transition-shadow">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                  <span className="text-foreground font-medium">{service}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Why Choose 4 Aces Visa in {city.name}?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {[
              { value: "98%", label: "Success Rate" },
              { value: "15K+", label: "Visas Processed" },
              { value: "10+", label: "Years Experience" },
              { value: "Free", label: "Initial Assessment" },
            ].map((stat) => (
              <div key={stat.label} className="bg-card rounded-xl border border-border p-6">
                <div className="font-display text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto max-w-2xl text-center">
          <div className="bg-card rounded-xl border border-border p-8">
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-gold text-gold" />
              ))}
            </div>
            <p className="text-foreground italic mb-4">"{city.testimonial.text}"</p>
            <div className="font-semibold text-foreground">{city.testimonial.name}</div>
            <div className="text-sm text-gold">{city.testimonial.visa}</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
            Immigration FAQ — {city.name}
          </h2>
          <div className="space-y-4">
            {city.faqs.map((faq, i) => (
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
                Get Expert Immigration Help in {city.name}
              </h2>
              <p className="text-primary-foreground/70 mb-6">
                Fill out the form for a free eligibility assessment. Our {city.name} immigration experts will contact you within 24 hours.
              </p>
              <ul className="space-y-3">
                {["Free expert assessment", "Response within 24 hours", "No obligation consultation", "100% confidential"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                    <CheckCircle className="h-4 w-4 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-xl p-6 md:p-8 shadow-elevated">
              <EligibilityForm sourcePage={`city-${city.slug}`} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CityPage;
