import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type NavChild = { label: string; href?: string; header?: boolean };
type NavItem = { label: string; href: string; children?: NavChild[] };

const navLinks: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Move to Canada",
    href: "#",
    children: [
      { label: "🍁 Canada Overview", href: "/immigration/canada" },
      { label: "🇮🇳 From India", href: "/canada-pr-for-indians" },
      { label: "🇺🇸 From USA / H1B", href: "/usa-to-canada-immigration" },
      { label: "🛂 H1B → Canada PR", href: "/h1b-to-canada-pr" },
    ],
  },
  {
    label: "Pathways",
    href: "#",
    children: [
      { label: "🔥 Express Entry PR", href: "/express-entry" },
      { label: "🏛️ Provincial Nominee (PNP)", href: "/services/pnp-application" },
      { label: "💼 Work Permits & LMIA", href: "/services/work-permits" },
      { label: "🎓 Study → PR", href: "/services/student-visa" },
      { label: "👨‍👩‍👧 Family Sponsorship", href: "/services/family-sponsorship" },
      { label: "✈️ Visitor & Super Visa", href: "/services/visitor-visa" },
      { label: "🍁 Citizenship", href: "/services/citizenship-application" },
    ],
  },
  {
    label: "Tools & Live Data",
    href: "/tools",
    children: [
      { label: "🧮 CRS Score Calculator", href: "/crs-calculator" },
      { label: "🧭 Pathway Quiz", href: "/quiz" },
      { label: "📊 Express Entry Draws", href: "/tools/express-entry-draws" },
      { label: "🗺️ PNP Draw Tracker", href: "/tools/pnp-draws" },
      { label: "🔎 NOC Finder", href: "/tools/noc-finder" },
      { label: "⏱️ Processing Times", href: "/tools/processing-times" },
    ],
  },
  {
    label: "Resources",
    href: "#",
    children: [
      { label: "📚 Documents Guides", header: true },
      { label: "🇨🇦 Canada PR", href: "/documents/canada-pr" },
      { label: "🎓 Student Visa", href: "/documents/student-visa" },
      { label: "💼 Work Permit", href: "/documents/work-permit" },
      { label: "✈️ Visitor / Super Visa", href: "/documents/visitor-visa" },
      { label: "🏛️ PNP", href: "/documents/pnp-application" },
      { label: "📍 By City", header: true },
      { label: "Toronto", href: "/city/toronto" },
      { label: "Brampton", href: "/city/brampton" },
      { label: "Vancouver", href: "/city/vancouver" },
      { label: "Ludhiana", href: "/city/ludhiana" },
      { label: "Chandigarh", href: "/city/chandigarh" },
      { label: "Delhi", href: "/city/delhi" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
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

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${scrolled ? "shadow-card border-b border-border" : "shadow-sm"}`}>
      <div className="container-narrow mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-14 md:h-16">
        <Link to="/" className="flex items-center gap-1 shrink-0">
          <span className="font-display text-lg md:text-xl font-extrabold tracking-tight text-primary">4 Aces</span>
          <span className="font-display text-lg md:text-xl font-extrabold tracking-tight text-gold">Visa</span>
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
                  className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-gold transition-colors rounded-md inline-flex items-center gap-1"
                  onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                >
                  {link.label}
                  <ChevronDown className="h-3 w-3" />
                </button>
              ) : (
                <Link
                  to={link.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded-md inline-flex items-center gap-1 ${
                    location.pathname === link.href ? "text-gold" : "text-foreground/70 hover:text-gold"
                  }`}
                >
                  {link.label}
                </Link>
              )}
              {link.children && openDropdown === link.label && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="bg-white rounded-lg shadow-elevated border border-border p-2 w-72 max-h-[28rem] overflow-y-auto">
                    {link.children.map((child) =>
                      child.header ? (
                        <div key={child.label} className="px-4 py-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider mt-2 first:mt-0">
                          {child.label}
                        </div>
                      ) : (
                        <Link
                          key={child.label}
                          to={child.href!}
                          className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-gold rounded-md transition-colors"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.label}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+16478622190" className="flex items-center gap-1.5 text-sm text-foreground/60 hover:text-gold transition-colors">
            <Phone className="h-4 w-4" />
            <span>Call</span>
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
          <button className="text-foreground p-1" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

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
                        {link.children.map((child) =>
                          child.header ? (
                            <div key={child.label} className="pl-6 pr-4 py-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider mt-1 first:mt-0">
                              {child.label}
                            </div>
                          ) : (
                            <Link
                              key={child.label}
                              to={child.href!}
                              className="block pl-8 pr-4 py-2 text-foreground/60 text-sm hover:text-gold transition-colors"
                              onClick={() => setMobileOpen(false)}
                            >
                              {child.label}
                            </Link>
                          )
                        )}
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
