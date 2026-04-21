import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Newspaper, ArrowRight, TrendingUp, MapPin, BookOpen, Calendar } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { expressEntryDraws } from "@/data/expressEntryDraws";
import { pnpDraws } from "@/data/pnpDraws";
import { blogPosts } from "@/data/blogData";

/**
 * Homepage News strip — surfaces the 6 most recent updates across
 * EE draws, PNP draws and guides. Links into /news for the full timeline.
 */

interface Highlight {
  type: "draw" | "pnp" | "blog";
  title: string;
  meta: string;
  date: string;
  href: string;
  iso: number;
}

const buildHighlights = (): Highlight[] => {
  const items: Highlight[] = [];

  expressEntryDraws.slice(0, 3).forEach((d) => items.push({
    type: "draw",
    title: `EE Draw #${d.drawNumber} — ${d.category}`,
    meta: `CRS ${d.crsMin} · ${d.itas.toLocaleString()} ITAs`,
    date: d.date,
    href: "/news",
    iso: Date.parse(d.date),
  }));

  pnpDraws.slice(0, 3).forEach((p, i) => items.push({
    type: "pnp",
    title: `${p.province} — ${p.stream}`,
    meta: `${p.invitations} invites${p.minScore ? ` · Min ${p.minScore}` : ""}`,
    date: p.date,
    href: "/news",
    iso: Date.parse(p.date) + i, // tiebreak
  }));

  blogPosts.slice(0, 2).forEach((b) => items.push({
    type: "blog",
    title: b.title,
    meta: `${b.category} · ${b.readTime}`,
    date: b.date,
    href: `/blog/${b.slug}`,
    iso: Date.parse(b.date),
  }));

  return items.sort((a, b) => b.iso - a.iso).slice(0, 6);
};

const TYPE_STYLES = {
  draw: { label: "EE Draw", icon: TrendingUp, badge: "bg-primary text-primary-foreground" },
  pnp: { label: "PNP", icon: MapPin, badge: "bg-gold text-accent-foreground" },
  blog: { label: "Guide", icon: BookOpen, badge: "bg-secondary text-foreground" },
} as const;

const NewsStripHome = () => {
  const highlights = buildHighlights();

  return (
    <section className="py-14 md:py-20 px-4 bg-background">
      <div className="container-narrow mx-auto">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-wider mb-2">
              <Newspaper className="h-4 w-4" /> Immigration News
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Latest updates from IRCC, draws & PNPs
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              The full live timeline lives on the News hub — refreshed every 30 minutes.
            </p>
          </div>
          <Link
            to="/news"
            className="shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-5 py-2.5 rounded-lg transition-all shadow-card"
          >
            Open News hub <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {highlights.map((h, i) => {
            const s = TYPE_STYLES[h.type];
            const Icon = s.icon;
            return (
              <motion.div
                key={`${h.type}-${i}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                <Link
                  to={h.href}
                  className="group block h-full bg-card border border-border rounded-xl p-5 hover:border-gold hover:shadow-elevated transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${s.badge}`}>
                      <Icon className="h-3 w-3" /> {s.label}
                    </span>
                    <span className="text-[11px] text-muted-foreground inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {h.date}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                    {h.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1.5">{h.meta}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-3">
                    Read update <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewsStripHome;
