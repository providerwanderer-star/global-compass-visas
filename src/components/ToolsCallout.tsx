import { Link } from "react-router-dom";
import { Calculator, Search, TrendingUp, MapPin, Clock, ArrowRight } from "lucide-react";

const ALL_TOOLS = [
  { slug: "crs-calculator", title: "CRS Calculator", desc: "Score your profile in 60 seconds", href: "/crs-calculator", icon: Calculator },
  { slug: "express-entry-draws", title: "EE Draw Tracker", desc: "Latest cutoffs & ITA counts", href: "/tools/express-entry-draws", icon: TrendingUp },
  { slug: "pnp-draws", title: "PNP Draw Tracker", desc: "Province-by-province updates", href: "/tools/pnp-draws", icon: MapPin },
  { slug: "noc-finder", title: "NOC Finder", desc: "Find your job code & TEER", href: "/tools/noc-finder", icon: Search },
  { slug: "processing-times", title: "Processing Times", desc: "PR, work, study, sponsorship", href: "/tools/processing-times", icon: Clock },
];

interface ToolsCalloutProps {
  /** Tool slugs to show. Defaults to a balanced 3-tool set. */
  tools?: string[];
  title?: string;
  description?: string;
  variant?: "light" | "soft";
}

const ToolsCallout = ({
  tools = ["crs-calculator", "express-entry-draws", "noc-finder"],
  title = "Free Canada Immigration Tools",
  description = "Use our live data tools to plan your move with confidence.",
  variant = "soft",
}: ToolsCalloutProps) => {
  const visible = ALL_TOOLS.filter((t) => tools.includes(t.slug));
  return (
    <section className={`section-padding ${variant === "soft" ? "section-soft" : "section-light"}`}>
      <div className="container-narrow mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">{title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visible.map((t) => (
            <Link
              key={t.slug}
              to={t.href}
              className="group bg-card rounded-xl border border-border p-5 hover:border-gold/40 hover:shadow-card transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                  <t.icon className="h-5 w-5 text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-foreground text-base mb-1">{t.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{t.desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-gold">
                    Open tool <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsCallout;