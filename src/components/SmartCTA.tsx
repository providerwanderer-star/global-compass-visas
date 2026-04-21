import { Link } from "react-router-dom";
import { ArrowRight, Calculator, Search, GitCompare, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

type Variant = "crs" | "noc" | "compare" | "pathway";
type Position = "intro" | "mid" | "end";

const config: Record<Variant, { icon: typeof Calculator; label: string; href: string; sub: string }> = {
  crs: { icon: Calculator, label: "Check your CRS score", href: "/crs-calculator", sub: "Free 2-minute IRCC calculator" },
  noc: { icon: Search, label: "Find your NOC code", href: "/noc-finder", sub: "Search 500+ Canadian occupations" },
  compare: { icon: GitCompare, label: "Compare your profile", href: "/tools/compare-pathways", sub: "EE vs PNP vs Study to PR" },
  pathway: { icon: Compass, label: "Get your PR pathway", href: "/quiz", sub: "Personalised in 60 seconds" },
};

interface Props {
  variant: Variant;
  position?: Position;
  className?: string;
}

const SmartCTA = ({ variant, position = "mid", className = "" }: Props) => {
  const c = config[variant];
  const Icon = c.icon;
  if (position === "intro") {
    return (
      <Link to={c.href} className={`inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-gold transition-colors ${className}`}>
        <Icon className="h-4 w-4" /> {c.label} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    );
  }
  if (position === "end") {
    return (
      <div className={`bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-2xl p-6 md:p-8 text-center ${className}`}>
        <Icon className="h-8 w-8 text-gold mx-auto mb-3" />
        <h3 className="font-display text-xl md:text-2xl font-bold mb-2">{c.label}</h3>
        <p className="text-primary-foreground/70 text-sm mb-5">{c.sub}</p>
        <Link to={c.href}>
          <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold">
            {c.label} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <Link to={c.href} className={`block ${className}`}>
      <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-gold/50 hover:shadow-card transition-all group">
        <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
          <Icon className="h-5 w-5 text-gold" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground text-sm">{c.label}</p>
          <p className="text-xs text-muted-foreground">{c.sub}</p>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-gold shrink-0" />
      </div>
    </Link>
  );
};

export default SmartCTA;
