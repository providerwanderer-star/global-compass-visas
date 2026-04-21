import { Link } from "react-router-dom";
import { Compass, ArrowRight } from "lucide-react";

/**
 * PathwayWidget — compact "Find My Pathway" CTA for tool pages.
 */
const PathwayWidget = () => (
  <section className="py-8 px-4">
    <div className="container-narrow mx-auto max-w-3xl">
      <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-gold/10 border border-border rounded-2xl p-5 md:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="bg-gold/20 text-gold rounded-xl p-3 shrink-0">
            <Compass className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-lg md:text-xl font-bold text-foreground">
              Not sure which Canada pathway fits you?
            </h3>
            <p className="text-sm text-muted-foreground">
              Answer 6 quick questions — get your fastest route and an action plan.
            </p>
          </div>
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 bg-gold text-accent-foreground hover:bg-gold-dark font-semibold px-5 py-2.5 rounded-lg shadow-gold transition-colors whitespace-nowrap"
          >
            Find my pathway <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default PathwayWidget;