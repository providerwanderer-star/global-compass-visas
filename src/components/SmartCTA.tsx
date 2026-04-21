import { Link } from "react-router-dom";
import { Calculator, Search, GitCompare, Compass, ArrowRight } from "lucide-react";

export type SmartCTAVariant = "crs" | "noc" | "compare" | "pathway";
export type SmartCTAPosition = "intro" | "mid" | "end";

interface SmartCTAProps {
  variant?: SmartCTAVariant;
  position?: SmartCTAPosition;
  className?: string;
}

const config: Record<SmartCTAVariant, { label: string; sub: string; href: string; Icon: typeof Calculator }> = {
  crs: {
    label: "Check your CRS score",
    sub: "60-second calculator — see if you qualify for Express Entry today.",
    href: "/crs-calculator",
    Icon: Calculator,
  },
  noc: {
    label: "Find your NOC code",
    sub: "Match your job to a Canadian NOC + TEER tier with EE eligibility.",
    href: "/noc-finder",
    Icon: Search,
  },
  compare: {
    label: "Compare your profile",
    sub: "Stack your score against the latest Express Entry cut-offs.",
    href: "/compare",
    Icon: GitCompare,
  },
  pathway: {
    label: "Get your best pathway",
    sub: "Answer 6 questions and we'll map your fastest route to Canada.",
    href: "/quiz",
    Icon: Compass,
  },
};

/**
 * SmartCTA — reusable conversion block.
 * Drop after intro / mid-content / end of any long-form page.
 */
const SmartCTA = ({ variant = "pathway", position = "mid", className = "" }: SmartCTAProps) => {
  const c = config[variant];
  const { Icon } = c;

  if (position === "intro") {
    return (
      <Link
        to={c.href}
        className={`group block bg-secondary/60 hover:bg-secondary border border-border rounded-xl p-4 my-6 transition-colors ${className}`}
      >
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary rounded-lg p-2 shrink-0">
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground text-sm">{c.label}</p>
            <p className="text-xs text-muted-foreground">{c.sub}</p>
          </div>
          <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform shrink-0" />
        </div>
      </Link>
    );
  }

  if (position === "end") {
    return (
      <div className={`bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl p-6 md:p-8 my-8 ${className}`}>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="bg-white/15 rounded-xl p-3 shrink-0">
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-xl md:text-2xl font-bold">{c.label}</h3>
            <p className="text-sm md:text-base text-primary-foreground/90 mt-1">{c.sub}</p>
          </div>
          <Link
            to={c.href}
            className="inline-flex items-center gap-2 bg-gold text-accent-foreground hover:bg-gold-dark font-semibold px-5 py-2.5 rounded-lg shadow-gold transition-colors whitespace-nowrap"
          >
            Start now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  // mid (default)
  return (
    <div className={`bg-card border-l-4 border-gold rounded-r-xl p-5 my-6 shadow-card ${className}`}>
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 text-gold shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-display font-bold text-foreground">{c.label}</p>
          <p className="text-sm text-muted-foreground mt-1">{c.sub}</p>
          <Link
            to={c.href}
            className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-semibold text-sm mt-2"
          >
            Try the tool <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmartCTA;