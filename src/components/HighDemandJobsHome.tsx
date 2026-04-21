import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, ArrowRight, MapPin, TrendingUp } from "lucide-react";
import { homeFeaturedJobs } from "@/data/inDemandJobs";
import AnimatedSection from "@/components/AnimatedSection";

/**
 * High-Demand Jobs strip — homepage entry point into the
 * /in-demand-jobs PR Pathway Engine.
 */
const HighDemandJobsHome = () => (
  <section className="py-14 md:py-20 px-4 bg-secondary/30 border-y border-border">
    <div className="container-narrow mx-auto">
      <AnimatedSection className="text-center mb-10">
        <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-wider mb-3">
          <Briefcase className="h-4 w-4" /> PR-Eligible Careers
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
          High-Demand Jobs That Lead to PR
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Eight Canadian occupations with the lowest CRS cut-offs and clearest PR pathways in 2026.
          Tap any role to see eligible Express Entry & PNP routes.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {homeFeaturedJobs.map((j, i) => (
          <motion.div
            key={j.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
          >
            <Link
              to={`/in-demand-jobs?job=${j.slug}`}
              className="group block h-full bg-card border border-border rounded-xl p-4 hover:border-gold hover:shadow-elevated transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                  TEER {j.teer}
                </span>
                {j.recentDrawCRS && (
                  <span className="text-[10px] font-bold text-gold inline-flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> CRS {j.recentDrawCRS}
                  </span>
                )}
              </div>
              <h3 className="font-display font-bold text-sm md:text-base text-foreground group-hover:text-primary transition-colors leading-snug">
                {j.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {j.provinces.slice(0, 2).join(", ")}
              </p>
              <p className="text-[11px] text-muted-foreground mt-2">
                ${(j.salaryLow / 1000).toFixed(0)}k – ${(j.salaryHigh / 1000).toFixed(0)}k
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/in-demand-jobs"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-elevated font-semibold px-6 py-3 rounded-lg transition-all"
        >
          Explore all in-demand jobs <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default HighDemandJobsHome;