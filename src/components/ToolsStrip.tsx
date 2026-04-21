import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { tools } from "@/data/toolsData";

const ToolsStrip = () => (
  <section className="section-padding section-soft">
    <div className="container-narrow mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-wider mb-2">
            🛠️ Tools & Live Data
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Free tools to plan your move
          </h2>
        </div>
        <Link
          to="/tools"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-gold transition-colors"
        >
          View all tools <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {tools.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Link to={t.href} className="block h-full group">
              <div className="bg-card rounded-xl border border-border p-4 h-full card-interactive relative">
                {t.status === "soon" && (
                  <span className="absolute top-2 right-2 text-[9px] font-bold bg-muted text-muted-foreground px-1.5 py-0.5 rounded uppercase tracking-wider">
                    Soon
                  </span>
                )}
                <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center mb-2.5 group-hover:bg-gold/20 transition-colors">
                  <t.icon className="h-4.5 w-4.5 text-gold" />
                </div>
                <h3 className="font-display text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {t.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-snug">{t.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ToolsStrip;
