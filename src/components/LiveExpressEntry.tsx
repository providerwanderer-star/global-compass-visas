import { Link } from "react-router-dom";
import { Activity, TrendingUp } from "lucide-react";

/**
 * LiveExpressEntry — latest Express Entry draw strip.
 * Data is static for now (edit src/data/expressEntryLatest.ts in Phase 3).
 * Rendered into initial HTML so AI engines index the "latest draw" fact.
 */
export const LiveExpressEntry = () => {
  // Edit these 4 values when a new draw is announced.
  const draw = {
    number: "343",
    date: "April 15, 2026",
    category: "STEM occupations",
    crs: 482,
    itas: 1500,
  };

  return (
    <section className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-y border-border">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-red-500/10 text-red-600 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              <Activity className="h-3 w-3 animate-pulse" /> Live
            </span>
            <span className="font-semibold text-foreground">
              Express Entry Draw #{draw.number} — {draw.date}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-muted-foreground">
            <span>
              Category: <strong className="text-foreground">{draw.category}</strong>
            </span>
            <span>
              CRS cut-off: <strong className="text-foreground">{draw.crs}</strong>
            </span>
            <span>
              ITAs: <strong className="text-foreground">{draw.itas.toLocaleString()}</strong>
            </span>
            <Link
              to="/express-entry"
              className="inline-flex items-center gap-1 text-primary font-semibold hover:underline"
            >
              <TrendingUp className="h-3.5 w-3.5" /> See draw history
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveExpressEntry;
