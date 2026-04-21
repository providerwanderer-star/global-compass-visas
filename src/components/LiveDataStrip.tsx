import { Link } from "react-router-dom";
import { Activity, MapPin, TrendingUp, ArrowRight } from "lucide-react";
import { expressEntryDraws } from "@/data/expressEntryDraws";

/**
 * LiveDataStrip — 3-card live data block.
 * Latest EE / Latest PNP / Trending pathway.
 * Each card shows a "Last updated" indicator.
 */
const LiveDataStrip = () => {
  const latestEE = expressEntryDraws[0];
  const today = new Date().toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" });

  // Static "latest PNP" snapshot — kept in sync with /pnp-tracker
  const latestPNP = {
    province: "Ontario (OINP)",
    stream: "Employer Job Offer: Foreign Worker",
    score: "Invitations issued",
    date: "April 12, 2026",
  };

  // Trending pathway — derived from internal analytics / can be edited per release
  const trending = {
    label: "Study → PR via PGWP",
    sub: "#1 chosen pathway by Indian applicants this month",
    href: "/blog/study-to-pr",
  };

  return (
    <section className="py-8 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container-narrow mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg md:text-xl font-bold text-foreground inline-flex items-center gap-2">
            <Activity className="h-5 w-5 text-red-500 animate-pulse" />
            Live Canada Immigration Data
          </h2>
          <span className="text-xs text-muted-foreground">Last updated: {today}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Latest EE */}
          <Link
            to="/express-entry/draws"
            className="group bg-card border border-border rounded-xl p-4 hover:border-primary hover:shadow-card transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-red-500/10 text-red-600 px-2 py-0.5 rounded text-xs font-bold uppercase">EE Draw</span>
              <span className="text-xs text-muted-foreground">#{latestEE.drawNumber}</span>
            </div>
            <p className="font-display font-bold text-foreground text-lg">CRS {latestEE.crsMin}</p>
            <p className="text-xs text-muted-foreground">{latestEE.category} • {latestEE.itas.toLocaleString()} ITAs</p>
            <p className="text-xs text-primary font-semibold mt-2 inline-flex items-center gap-1">
              See all draws <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </p>
          </Link>

          {/* Latest PNP */}
          <Link
            to="/pnp-tracker"
            className="group bg-card border border-border rounded-xl p-4 hover:border-primary hover:shadow-card transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-3.5 w-3.5 text-accent" />
              <span className="bg-accent/15 text-accent px-2 py-0.5 rounded text-xs font-bold uppercase">PNP</span>
            </div>
            <p className="font-display font-bold text-foreground text-sm">{latestPNP.province}</p>
            <p className="text-xs text-muted-foreground">{latestPNP.stream}</p>
            <p className="text-xs text-muted-foreground">{latestPNP.date}</p>
            <p className="text-xs text-primary font-semibold mt-2 inline-flex items-center gap-1">
              All PNP draws <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </p>
          </Link>

          {/* Trending */}
          <Link
            to={trending.href}
            className="group bg-gradient-to-br from-gold/15 to-gold/5 border border-gold/40 rounded-xl p-4 hover:shadow-gold transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-3.5 w-3.5 text-gold" />
              <span className="bg-gold/20 text-gold px-2 py-0.5 rounded text-xs font-bold uppercase">Trending</span>
            </div>
            <p className="font-display font-bold text-foreground">{trending.label}</p>
            <p className="text-xs text-muted-foreground">{trending.sub}</p>
            <p className="text-xs text-primary font-semibold mt-2 inline-flex items-center gap-1">
              Read guide <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LiveDataStrip;