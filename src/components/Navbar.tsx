import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Countries", href: "#",
    children: [
      { label: "🇨🇦 Canada", href: "/immigration/canada" },
      { label: "🇦🇺 Australia", href: "/immigration/australia" },
      { label: "🇩🇪 Germany", href: "/immigration/germany" },
      { label: "🇬🇧 United Kingdom", href: "/immigration/uk" },
    ],
  },
  {
    label: "Services", href: "#",
    children: [
      { label: "Express Entry PR", href: "/services/express-entry" },
      { label: "Student Visa", href: "/services/student-visa" },
      { label: "LMIA Assistance", href: "/services/lmia-assistance" },
      { label: "PNP Application", href: "/services/pnp-application" },
      { label: "Work Permits", href: "/services/work-permits" },
      { label: "Visitor Visa & Super Visa", href: "/services/visitor-visa" },
      { label: "Visa Restoration", href: "/services/visa-restoration" },
      { label: "Family Sponsorship", href: "/services/family-sponsorship" },
      { label: "Citizenship Application", href: "/services/citizenship-application" },
      { label: "Visitor Visa Insurance", href: "/services/visitor-visa-insurance" },
      { label: "Job Seeker Visa (Germany)", href: "/services/job-seeker-visa" },
      { label: "Study Visas (Global)", href: "/services/study-visas" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-card border-b border-border" : "bg-primary/95 backdrop-blur-md"}`}>
      <div className="container-narrow mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 md:h-20">
        {/* Logo — Text Only */}
        <Link to="/" className="flex items-center gap-1">
          <span className={`font-display text-xl font-extrabold tracking-tight transition-colors ${scrolled ? "text-primary" : "text-white"}`}>
            4 Aces
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight text-gold">
            Visa
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.children && setOpenDropdown(link.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={link.href}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                  location.pathname === link.href
                    ? "text-gold"
                    : scrolled ? "text-foreground/70 hover:text-gold" : "text-white/80 hover:text-gold"
                }`}
                onClick={(e) => link.children && e.preventDefault()}
              >
                {link.label}
              </Link>
              {link.children && openDropdown === link.label && (
                <div className={`absolute top-full left-0 mt-1 bg-card rounded-lg shadow-elevated border border-border p-2 animate-fade-up ${link.label === "Services" ? "w-72 max-h-96 overflow-y-auto" : "w-56"}`}>
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      to={child.href}
                      className="block px-4 py-2.5 text-sm text-foreground hover:bg-secondary rounded-md transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+1234567890" className={`flex items-center gap-1.5 text-sm transition-colors ${scrolled ? "text-foreground/60 hover:text-gold" : "text-white/80 hover:text-gold"}`}>
            <Phone className="h-4 w-4" />
            <span>Call Now</span>
          </a>
          <Link to="/contact">
            <Button className="bg-gold text-accent-foreground hover:bg-gold-dark font-semibold shadow-gold">
              Free Consultation
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className={`lg:hidden ${scrolled ? "text-foreground" : "text-white"}`} onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-t border-border shadow-elevated animate-fade-up max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.children ? (
                  <>
                    <button
                      className="w-full text-left px-4 py-2.5 text-foreground/70 font-medium text-sm"
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                    >
                      {link.label}
                    </button>
                    {openDropdown === link.label && link.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block pl-8 pr-4 py-2 text-foreground/50 text-sm hover:text-gold"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    to={link.href}
                    className="block px-4 py-2.5 text-foreground/70 font-medium text-sm hover:text-gold"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-3">
              <Link to="/contact" onClick={() => setMobileOpen(false)}>
                <Button className="w-full bg-gold text-accent-foreground hover:bg-gold-dark font-semibold">
                  Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
