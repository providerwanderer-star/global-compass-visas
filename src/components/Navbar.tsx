import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown, ArrowRight } from "lucide-react";
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
      { label: "🔥 Express Entry PR", href: "/express-entry" },
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
  {
    label: "Cities", href: "#",
    children: [
      { label: "📍 Delhi", href: "/city/delhi" },
      { label: "📍 Mumbai", href: "/city/mumbai" },
      { label: "📍 Bangalore", href: "/city/bangalore" },
      { label: "📍 Hyderabad", href: "/city/hyderabad" },
      { label: "📍 Chennai", href: "/city/chennai" },
      { label: "📍 Pune", href: "/city/pune" },
      { label: "📍 Chandigarh", href: "/city/chandigarh" },
      { label: "📍 Toronto", href: "/city/toronto" },
      { label: "📍 Vancouver", href: "/city/vancouver" },
      { label: "📍 Brampton", href: "/city/brampton" },
    ],
  },
  { label: "Pathway Quiz", href: "/quiz" },
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${scrolled ? "shadow-card border-b border-border" : "shadow-sm"}`}>
      <div className="container-narrow mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-14 md:h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 shrink-0">
          <span className="font-display text-lg md:text-xl font-extrabold tracking-tight text-primary">
            4 Aces
          </span>
          <span className="font-display text-lg md:text-xl font-extrabold tracking-tight text-gold">
            Visa
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.children && setOpenDropdown(link.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {link.children ? (
                <button
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded-md inline-flex items-center gap-1 ${
                    "text-foreground/70 hover:text-gold"
                  }`}
                  onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                >
                  {link.label}
                  <ChevronDown className="h-3 w-3" />
                </button>
              ) : (
                <Link
                  to={link.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded-md inline-flex items-center gap-1 ${
                    location.pathname === link.href
                      ? "text-gold"
                      : "text-foreground/70 hover:text-gold"
                  }`}
                >
                  {link.label}
                </Link>
              )}
              {link.children && openDropdown === link.label && (
                <div className={`absolute top-full left-0 mt-1 bg-white rounded-lg shadow-elevated border border-border p-2 animate-fade-up ${link.label === "Services" || link.label === "Cities" ? "w-72 max-h-96 overflow-y-auto" : "w-56"}`}>
                  {link.children.map((child) => (
                     <Link
                      key={child.label}
                      to={child.href}
                      className="block px-4 py-2.5 text-sm text-foreground hover:bg-secondary hover:text-gold rounded-md transition-colors"
                      onClick={() => setOpenDropdown(null)}
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
          <a href="tel:+16478622190" className="flex items-center gap-1.5 text-sm text-foreground/60 hover:text-gold transition-colors">
            <Phone className="h-4 w-4" />
            <span>Call Now</span>
          </a>
          <Link to="/contact">
            <Button className="bg-gold text-accent-foreground hover:bg-gold-dark font-semibold shadow-gold">
              Free Assessment <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Mobile toggle + CTA */}
        <div className="flex lg:hidden items-center gap-2">
          <Link to="/contact">
            <Button size="sm" className="bg-gold text-accent-foreground hover:bg-gold-dark font-semibold text-xs px-3">
              Free Assessment
            </Button>
          </Link>
          <button className="text-foreground p-1" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border shadow-elevated max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-0.5">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.children ? (
                  <>
                    <button
                      className="w-full text-left px-3 py-2.5 text-foreground font-medium text-sm flex items-center justify-between"
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                    >
                      {link.label}
                      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`} />
                    </button>
                    {openDropdown === link.label && (
                      <div className="bg-secondary/50 rounded-lg mb-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="block pl-6 pr-4 py-2 text-foreground/60 text-sm hover:text-gold transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.href}
                    className="block px-3 py-2.5 text-foreground font-medium text-sm hover:text-gold transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <a href="tel:+16478622190" className="flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors">
                <Phone className="h-4 w-4" />
                Call Now
              </a>
              <Link to="/contact" onClick={() => setMobileOpen(false)}>
                <Button className="w-full bg-gold text-accent-foreground hover:bg-gold-dark font-semibold shadow-gold">
                  Get Free Assessment <ArrowRight className="ml-1 h-4 w-4" />
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
