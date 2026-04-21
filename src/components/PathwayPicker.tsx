import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, MapPin, GraduationCap, Briefcase, ArrowRight } from "lucide-react";

const pathways = [
  {
    icon: Award,
    title: "Express Entry",
    desc: "Federal PR in 6 months. CRS 430–520 typical cutoff.",
    href: "/express-entry",
    badge: "Fastest",
  },
  {
    icon: MapPin,
    title: "Provincial Nominee",
    desc: "Province-driven nomination adds +600 CRS points.",
    href: "/services/pnp-application",
    badge: "+600 CRS",
  },
  {
    icon: GraduationCap,
    title: "Study → PR",
    desc: "Study permit → PGWP → CEC. Best for under 30s.",
    href: "/services/student-visa",
    badge: "Long-term",
  },
  {
    icon: Briefcase,
    title: "Work Permit",
    desc: "LMIA or open work permit leading to PR.",
    href: "/services/work-permits",
    badge: "Employer-driven",
  },
];

const PathwayPicker = () => (
  <section className="section-padding section-light">
    <div className="container-narrow mx-auto">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-wider mb-3">
          🍁 Pick your pathway
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
          Every PR pathway to Canada, in one place
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Compare the four main routes to Canadian PR. Click any to see eligibility, timelines, and cost.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pathways.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Link to={p.href} className="block h-full group">
              <div className="bg-card rounded-2xl border border-border p-6 h-full card-interactive flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <p.icon className="h-6 w-6 text-primary group-hover:text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-gold bg-gold/10 px-2 py-1 rounded-full uppercase tracking-wider">
                    {p.badge}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{p.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-gold transition-colors">
                  Learn more <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PathwayPicker;
