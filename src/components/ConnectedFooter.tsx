import { Link } from "react-router-dom";
import { Calculator, Globe, Compass, ArrowRight } from "lucide-react";

interface ConnectedFooterProps {
  tool?: { label: string; href: string };
  hub?: { label: string; href: string };
  funnel?: { label: string; href: string };
}

const defaults = {
  tool: { label: "CRS Score Calculator", href: "/crs-calculator" },
  hub: { label: "Canada Immigration Hub", href: "/immigration/canada" },
  funnel: { label: "Find your best pathway", href: "/quiz" },
};

/**
 * ConnectedFooter — eliminates dead-end pages.
 * Always offers 1 tool + 1 hub + 1 funnel link.
 */
const ConnectedFooter = ({ tool = defaults.tool, hub = defaults.hub, funnel = defaults.funnel }: ConnectedFooterProps) => {
  return (
    <section className="py-10 px-4 bg-secondary/40 border-t border-border">
      <div className="container-narrow mx-auto">
        <h2 className="font-display text-xl md:text-2xl font-bold text-foreground text-center mb-6">
          Keep going — your next step
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to={tool.href}
            className="group bg-card border border-border rounded-2xl p-5 hover:border-primary hover:shadow-elevated transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-primary/10 text-primary rounded-lg p-2">
                <Calculator className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tool</span>
            </div>
            <p className="font-display font-bold text-foreground group-hover:text-primary transition-colors">{tool.label}</p>
            <p className="text-sm text-muted-foreground mt-1 inline-flex items-center gap-1">
              Try it <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </p>
          </Link>

          <Link
            to={hub.href}
            className="group bg-card border border-border rounded-2xl p-5 hover:border-primary hover:shadow-elevated transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-accent/15 text-accent rounded-lg p-2">
                <Globe className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Hub</span>
            </div>
            <p className="font-display font-bold text-foreground group-hover:text-primary transition-colors">{hub.label}</p>
            <p className="text-sm text-muted-foreground mt-1 inline-flex items-center gap-1">
              Explore <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </p>
          </Link>

          <Link
            to={funnel.href}
            className="group bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/40 rounded-2xl p-5 hover:shadow-gold transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gold/20 text-gold rounded-lg p-2">
                <Compass className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold">Pathway</span>
            </div>
            <p className="font-display font-bold text-foreground">{funnel.label}</p>
            <p className="text-sm text-muted-foreground mt-1 inline-flex items-center gap-1">
              Get personalized <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ConnectedFooter;