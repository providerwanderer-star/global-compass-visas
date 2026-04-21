import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, ArrowRight, MapPin, TrendingUp, Briefcase } from "lucide-react";
import { inDemandJobs } from "@/data/inDemandJobs";
import AnimatedSection from "@/components/AnimatedSection";

/**
 * Live highlights ticker — surfaces real-time PR-eligible job signals
 * (latest CRS cut-offs, demand spikes, top hiring provinces) on the homepage.
 * Sources data from the central inDemandJobs registry (no duplication).
 */

const lastUpdated = new Date().toLocaleDateString("en-CA", {
  year: "numeric", month: "short", day: "numeric",
});

// Pick 10 most signal-rich jobs (those with recent draw CRS data first)
const tickerJobs = [...inDemandJobs]
  .sort((a, b) => {
    if (a.recentDrawCRS && !b.recentDrawCRS) return -1;
    if (!a.recentDrawCRS && b.recentDrawCRS) return 1;
    return (a.recentDrawCRS ?? 999) - (b.recentDrawCRS ?? 999);
  })
  .slice(0, 10);

const LiveJobsHighlightStrip = () => (
  <section className="py-10 md:py-14 px-4 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
    {/* subtle grid */}
    <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
      style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }}
    />
    <div className="container-narrow mx-auto relative">
      <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider mb-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <Activity className="h-3.5 w-3.5" /> Live PR Job Signals
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight">
            What's hot in Canada's PR job market — right now
          </h2>
          <p className="text-primary-foreground/70 text-sm mt-1">
            Updated {lastUpdated} · Sourced from latest IRCC category-based draws & PNP demand
          </p>
        </div>
        <Link
          to="/in-demand-jobs"
          className="shrink-0 inline-flex items-center gap-2 bg-gold text-accent-foreground hover:bg-gold-dark font-semibold px-5 py-2.5 rounded-lg transition-all shadow-gold"
        >
          Explore live engine <ArrowRight className="h-4 w-4" />
        </Link>
      </AnimatedSection>

      {/* Marquee ticker */}
      <div className="relative overflow-hidden mask-fade">
        <motion.div
          className="flex gap-3 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          {[...tickerJobs, ...tickerJobs].map((j, i) => (
            <Link
              key={`${j.slug}-${i}`}
              to={`/in-demand-jobs?job=${j.slug}`}
              className="shrink-0 w-[260px] md:w-[300px] bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/15 hover:border-gold/60 rounded-xl p-4 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-gold text-accent-foreground px-2 py-0.5 rounded">
                  TEER {j.teer}
                </span>
                {j.recentDrawCRS ? (
                  <span className="text-[11px] font-bold text-gold inline-flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> CRS {j.recentDrawCRS}
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-primary-foreground/80 inline-flex items-center gap-1">
                    <Briefcase className="h-3 w-3" /> {j.demand}
                  </span>
                )}
              </div>
              <h3 className="font-display font-bold text-sm md:text-base text-primary-foreground group-hover:text-gold transition-colors leading-snug line-clamp-2">
                {j.title}
              </h3>
              <p className="text-[11px] text-primary-foreground/60 mt-1 inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {j.provinces.slice(0, 2).join(" · ")}
              </p>
              <p className="text-[11px] text-primary-foreground/70 mt-1.5 font-medium">
                NOC {j.noc} · ${(j.salaryLow / 1000).toFixed(0)}k–${(j.salaryHigh / 1000).toFixed(0)}k
              </p>
            </Link>
          ))}
        </motion.div>
      </div>

      <p className="text-center text-[11px] text-primary-foreground/50 mt-4">
        Hover or tap any role for full PR pathway, CRS impact & live Job Bank listings.
      </p>
    </div>
  </section>
);

export default LiveJobsHighlightStrip;
