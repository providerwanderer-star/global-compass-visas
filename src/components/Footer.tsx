import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-narrow mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-1 mb-4">
              <span className="font-display text-xl font-extrabold tracking-tight text-white">
                4 Aces
              </span>
              <span className="font-display text-xl font-extrabold tracking-tight text-gold">
                Visa
              </span>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-3">
              By the immigrants, for the immigrants. Your global immigration strategy partner with first-hand experience.
            </p>
            <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
              <MapPin className="h-4 w-4 text-gold" />
              <span>Offices in Canada & India</span>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-gold">Countries</h4>
            <ul className="space-y-2">
              {[
                { label: "🇨🇦 Canada Immigration", href: "/immigration/canada" },
                { label: "🇦🇺 Australia Immigration", href: "/immigration/australia" },
                { label: "🇩🇪 Germany Immigration", href: "/immigration/germany" },
                { label: "🇬🇧 UK Immigration", href: "/immigration/uk" },
              ].map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-sm text-primary-foreground/60 hover:text-gold transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-gold">Services</h4>
            <ul className="space-y-2">
              {[
                { label: "Express Entry PR", href: "/services/express-entry" },
                { label: "Student Visa", href: "/services/student-visa" },
                { label: "LMIA Assistance", href: "/services/lmia-assistance" },
                { label: "PNP Application", href: "/services/pnp-application" },
                { label: "Work Permits", href: "/services/work-permits" },
                { label: "Visitor Visa", href: "/services/visitor-visa" },
                { label: "Family Sponsorship", href: "/services/family-sponsorship" },
                { label: "Citizenship", href: "/services/citizenship-application" },
              ].map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-sm text-primary-foreground/60 hover:text-gold transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-gold">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-primary-foreground/60">
                <Phone className="h-4 w-4 text-gold" />
                <a href="tel:+1234567890" className="hover:text-gold transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/60">
                <Mail className="h-4 w-4 text-gold" />
                <a href="mailto:info@4acesvisa.com" className="hover:text-gold transition-colors">info@4acesvisa.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/40">© 2026 4 Aces Visa. All rights reserved. By the immigrants, for the immigrants.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-primary-foreground/40 hover:text-gold transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-primary-foreground/40 hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
