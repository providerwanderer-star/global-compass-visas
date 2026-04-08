import { Phone, Mail, MapPin, CheckCircle } from "lucide-react";
import EligibilityForm from "@/components/EligibilityForm";

const ContactPage = () => {
  return (
    <div>
      <section className="bg-primary pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Get in Touch</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl">
            Ready to start your immigration journey? Book a free consultation with our experts.
          </p>
        </div>
      </section>

      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Contact Information</h2>
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Phone</h3>
                    <a href="tel:+1234567890" className="text-sm text-muted-foreground hover:text-gold">+1 (234) 567-890</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <a href="mailto:info@4acesvisa.com" className="text-sm text-muted-foreground hover:text-gold">info@4acesvisa.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Offices</h3>
                    <p className="text-sm text-muted-foreground">Canada & India</p>
                  </div>
                </div>
              </div>

              <h3 className="font-display text-lg font-bold text-foreground mb-3">Why Choose 4 Aces Visa?</h3>
              <ul className="space-y-2">
                {["Multi-country expertise (Canada, Australia, Germany)", "98% visa approval success rate", "15,000+ successful applications", "Free initial consultation", "Transparent pricing — no hidden fees"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-success shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 md:p-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Free Eligibility Assessment</h2>
              <EligibilityForm sourcePage="contact" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
