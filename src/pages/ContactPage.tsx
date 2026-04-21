import { Phone, MapPin, CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import EligibilityForm from "@/components/EligibilityForm";
import AnimatedSection from "@/components/AnimatedSection";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ContactPage = () => {
  return (
    <div>
      <Helmet>
        <title>Contact Us | Free Immigration Consultation – 4 Aces Visa</title>
        <meta name="description" content="Get in touch with 4 Aces Visa for a free immigration consultation. Expert guidance for Canada, Australia, Germany, and UK immigration." />
        <link rel="canonical" href="https://www.4acesvisa.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact Us | Free Immigration Consultation" />
        <meta property="og:description" content="Get a free immigration consultation from 4 Aces Visa." />
        <meta property="og:url" content="https://www.4acesvisa.com/contact" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact 4 Aces Visa" />
        <meta name="twitter:description" content="Free immigration consultation for Canada, Australia, Germany & UK." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact 4 Aces Visa",
            "url": "https://www.4acesvisa.com/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "4 Aces Visa",
              "telephone": "+1-647-862-2190",
            }
          })}
        </script>
      </Helmet>
      <section className="bg-primary pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary-foreground/70 text-lg max-w-2xl"
          >
            Ready to start your immigration journey? Book a free consultation with our experts.
          </motion.p>
        </div>
      </section>

      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Contact Information</h2>
              <motion.div
                className="space-y-6 mb-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {[
                  { icon: Phone, title: "Phone", content: <a href="tel:+16478622190" className="text-sm text-muted-foreground hover:text-gold transition-colors">+1 (647) 862-2190</a> },
                  { icon: MapPin, title: "Offices", content: <p className="text-sm text-muted-foreground">Canada & India</p> },
                ].map((item) => (
                  <motion.div key={item.title} variants={staggerItem} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-300">
                      <item.icon className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      {item.content}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <h3 className="font-display text-lg font-bold text-foreground mb-3">Why Choose 4 Aces Visa?</h3>
              <motion.ul
                className="space-y-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {["Multi-country expertise (Canada, Australia, Germany)", "98% visa approval success rate", "15,000+ successful applications", "Free initial consultation", "Transparent pricing — no hidden fees"].map((item) => (
                  <motion.li key={item} variants={staggerItem} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-success shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="bg-card rounded-xl border border-border p-6 md:p-8 card-interactive">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Free Eligibility Assessment</h2>
                <EligibilityForm sourcePage="contact" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
