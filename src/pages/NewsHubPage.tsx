import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity, ArrowRight, BookOpen, Calendar, FileText,
  MapPin, Newspaper, RefreshCw, Sparkles, TrendingUp, Clock,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { expressEntryDraws } from "@/data/expressEntryDraws";
import { pnpDraws } from "@/data/pnpDraws";
import { blogPosts } from "@/data/blogData";
import { buildNewsSlug } from "@/lib/newsSlug";

type FeedType = "all" | "draw" | "pnp" | "policy" | "blog";

interface NewsItem {
  id: string;
  type: "policy" | "draw" | "pnp" | "blog" | "announcement";
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string; // ISO
  meta?: Record<string, string | number>;
  internal?: boolean;
}

// Convert date strings like "April 15, 2026" to ISO
function toISO(dateStr: string): string {
  const t = Date.parse(dateStr);
  return isNaN(t) ? new Date().toISOString() : new Date(t).toISOString();
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${Math.max(mins, 1)}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

// Build internal feed from existing data (always available, no API calls)
function buildInternalFeed(): NewsItem[] {
  const drawItems: NewsItem[] = expressEntryDraws.slice(0, 8).map((d) => ({
    id: `ee-${d.drawNumber}`,
    type: "draw",
    title: `Express Entry Draw #${d.drawNumber} — ${d.category} (CRS ${d.crsMin})`,
    summary: `${d.itas.toLocaleString()} ITAs issued in the ${d.category} category. Cutoff CRS dropped to ${d.crsMin}.`,
    url: "/express-entry/draws",
    source: "IRCC Express Entry",
    publishedAt: toISO(d.date),
    meta: { crs: d.crsMin, itas: d.itas, category: d.category },
    internal: true,
  }));

  const pnpItems: NewsItem[] = pnpDraws.slice(0, 8).map((p, i) => ({
    id: `pnp-${p.provinceCode}-${i}-${p.date}`,
    type: "pnp",
    title: `${p.province} PNP — ${p.stream} (${p.invitations} invites)`,
    summary: `${p.province} issued ${p.invitations} nominations${p.minScore ? ` with minimum score ${p.minScore}` : ""}.${p.notes ? ` ${p.notes}` : ""}`,
    url: "/pnp-tracker",
    source: `${p.province} PNP`,
    publishedAt: toISO(p.date),
    meta: { invitations: p.invitations, minScore: p.minScore ?? "—" },
    internal: true,
  }));

  const blogItems: NewsItem[] = blogPosts.slice(0, 6).map((b) => ({
    id: `blog-${b.slug}`,
    type: "blog",
    title: b.title,
    summary: b.excerpt,
    url: `/blog/${b.slug}`,
    source: `4 Aces Visa · ${b.category}`,
    publishedAt: toISO(b.date),
    internal: true,
  }));

  return [...drawItems, ...pnpItems, ...blogItems];
}

const TYPE_META: Record<NewsItem["type"], { label: string; icon: typeof Activity; color: string }> = {
  draw: { label: "EE Draw", icon: TrendingUp, color: "bg-primary text-primary-foreground" },
  pnp: { label: "PNP", icon: MapPin, color: "bg-gold text-accent-foreground" },
  policy: { label: "Policy", icon: FileText, color: "bg-emerald-600 text-white" },
  announcement: { label: "Announcement", icon: Newspaper, color: "bg-sky-600 text-white" },
  blog: { label: "Guide", icon: BookOpen, color: "bg-secondary text-foreground" },
};

const FILTERS: { key: FeedType; label: string }[] = [
  { key: "all", label: "All updates" },
  { key: "draw", label: "EE Draws" },
  { key: "pnp", label: "PNP Draws" },
  { key: "policy", label: "Policy & News" },
  { key: "blog", label: "Guides" },
];

const NewsHubPage = () => {
  const [externalNews, setExternalNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FeedType>("all");
  const [visible, setVisible] = useState(15);
  const [lastFetch, setLastFetch] = useState<string>("");

  const internalFeed = useMemo(buildInternalFeed, []);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke("immigration-news");
      if (fnErr) throw fnErr;
      const items: NewsItem[] = data?.items ?? [];
      setExternalNews(items);
      setLastFetch(data?.fetchedAt ?? new Date().toISOString());
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to load latest news";
      console.error("[NewsHub] fetch error", err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const allItems = useMemo(() => {
    const merged = [...externalNews, ...internalFeed];
    return merged.sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  }, [externalNews, internalFeed]);

  const filtered = useMemo(() => {
    if (filter === "all") return allItems;
    return allItems.filter((i) =>
      filter === "policy" ? i.type === "policy" || i.type === "announcement" : i.type === filter,
    );
  }, [allItems, filter]);

  const featured = filtered[0];
  const rest = filtered.slice(1, visible);

  // Group remaining items by friendly date bucket (Today, Yesterday, This week, Earlier)
  const grouped = useMemo(() => {
    const buckets: Record<string, NewsItem[]> = {
      "Today": [],
      "Yesterday": [],
      "This week": [],
      "Earlier this month": [],
      "Older": [],
    };
    const now = new Date();
    const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const today0 = startOfDay(now);
    const yest0 = today0 - 86400000;
    const week0 = today0 - 6 * 86400000;
    const month0 = today0 - 30 * 86400000;
    rest.forEach((item) => {
      const t = new Date(item.publishedAt).getTime();
      if (t >= today0) buckets["Today"].push(item);
      else if (t >= yest0) buckets["Yesterday"].push(item);
      else if (t >= week0) buckets["This week"].push(item);
      else if (t >= month0) buckets["Earlier this month"].push(item);
      else buckets["Older"].push(item);
    });
    return Object.entries(buckets).filter(([, items]) => items.length > 0);
  }, [rest]);

  return (
    <div className="min-h-screen bg-secondary/30">
      <Helmet>
        <title>Canada Immigration News & Updates 2026 · 4 Aces Visa</title>
        <meta
          name="description"
          content="Live Canada immigration news: latest IRCC announcements, Express Entry draws, PNP updates, policy changes and PR pathway insights — updated every 30 minutes."
        />
        <link rel="canonical" href="https://www.4acesvisa.com/news" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Canada Immigration News & Updates 2026 · 4 Aces Visa" />
        <meta property="og:description" content="Live Canada immigration news: latest IRCC announcements, Express Entry draws, PNP updates, policy changes and PR pathway insights — updated every 30 minutes." />
        <meta property="og:url" content="https://www.4acesvisa.com/news" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Canada Immigration News & Updates 2026 · 4 Aces Visa" />
        <meta name="twitter:description" content="Live Canada immigration news: IRCC announcements, Express Entry draws, PNP updates and PR pathway insights." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Canada Immigration News & Updates",
            description: "Live IRCC news, Express Entry draws, PNP updates and policy changes.",
            url: "https://www.4acesvisa.com/news",
          })}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-12 md:py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "22px 22px" }}
        />
        <div className="container-narrow mx-auto relative">
          <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider mb-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <Activity className="h-3.5 w-3.5" /> Live Immigration Feed
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight max-w-3xl">
            Canada Immigration News & PR Updates
          </h1>
          <p className="text-primary-foreground/80 mt-3 max-w-2xl">
            One unified timeline: IRCC announcements, Express Entry draws, PNP nominations, policy changes
            and expert guides — auto-refreshed every 30 minutes.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-5">
            <Button
              onClick={fetchNews}
              disabled={loading}
              className="bg-gold text-accent-foreground hover:bg-gold-dark shadow-gold"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Refreshing…" : "Refresh feed"}
            </Button>
            {lastFetch && (
              <span className="text-xs text-primary-foreground/60">
                Last sync: {new Date(lastFetch).toLocaleString("en-CA")}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-14 md:top-16 z-30 bg-white/95 backdrop-blur border-b border-border">
        <div className="container-narrow mx-auto px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
          {FILTERS.map((f) => {
            const count =
              f.key === "all"
                ? allItems.length
                : f.key === "policy"
                  ? allItems.filter((i) => i.type === "policy" || i.type === "announcement").length
                  : allItems.filter((i) => i.type === f.key).length;
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => { setFilter(f.key); setVisible(15); }}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  active
                    ? "bg-primary text-primary-foreground shadow-card"
                    : "bg-secondary text-foreground hover:bg-secondary/70"
                }`}
              >
                {f.label} <span className="opacity-60 ml-1">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <section className="container-narrow mx-auto px-4 py-8 md:py-12">
        {error && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900">
            Could not load latest external news ({error}). Showing internal feed below.
          </div>
        )}

        {/* Featured story */}
        {featured && (
          <FeaturedCard item={featured} />
        )}

        {/* Grouped news cards */}
        <div className="mt-10 space-y-10">
          <AnimatePresence initial={false}>
            {grouped.map(([bucket, items]) => (
              <motion.div
                key={bucket}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    <Clock className="h-3.5 w-3.5" /> {bucket}
                  </div>
                  <span className="text-xs text-muted-foreground">{items.length} update{items.length === 1 ? "" : "s"}</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((item) => (
                    <NewsCard key={item.id} item={item} />
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && !loading && (
            <p className="text-center text-muted-foreground py-12">No items match this filter yet.</p>
          )}

          {visible < filtered.length && (
            <div className="text-center mt-8">
              <Button variant="outline" onClick={() => setVisible((v) => v + 12)}>
                Load more updates <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>

        {/* Conversion strip */}
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          <ConversionCard
            href="/crs-calculator"
            icon={Sparkles}
            title="Calculate your CRS"
            desc="See if the latest cutoff brings you in range."
          />
          <ConversionCard
            href="/in-demand-jobs"
            icon={TrendingUp}
            title="In-Demand PR Jobs"
            desc="Match to category-based draws & PNP streams."
          />
          <ConversionCard
            href="/contact"
            icon={ArrowRight}
            title="Free Assessment"
            desc="Get a personalized PR strategy in 24 hours."
          />
        </div>
      </section>
    </div>
  );
};

const FeaturedCard = ({ item }: { item: NewsItem }) => {
  const meta = TYPE_META[item.type];
  const Icon = meta.icon;
  const detailHref = `/news/${buildNewsSlug(item.id, item.title)}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-card relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-gold/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="flex items-center gap-2 mb-3">
        <Badge className={`${meta.color} gap-1`}><Icon className="h-3 w-3" /> {meta.label}</Badge>
        <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
          <Calendar className="h-3 w-3" /> {timeAgo(item.publishedAt)}
        </span>
        <span className="text-xs text-muted-foreground">· {item.source}</span>
      </div>
      <h2 className="font-display text-xl md:text-3xl font-bold text-foreground leading-tight">
        {item.title}
      </h2>
      <p className="text-muted-foreground mt-3 max-w-2xl">{item.summary}</p>
      <Link
        to={detailHref}
        className="inline-flex items-center gap-1.5 text-primary font-semibold mt-4 hover:text-gold"
      >
        Read full update <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  );
};

const NewsCard = ({ item }: { item: NewsItem }) => {
  const meta = TYPE_META[item.type];
  const Icon = meta.icon;
  const detailHref = `/news/${buildNewsSlug(item.id, item.title)}`;
  const accentBg = meta.color.split(" ")[0];
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="group h-full"
    >
      <Link
        to={detailHref}
        className="relative h-full flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:border-gold hover:shadow-elevated transition-all"
      >
        {/* accent stripe */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${accentBg}`} aria-hidden />

        <div className="p-5 pl-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge className={`${meta.color} gap-1 text-[10px] py-0.5`}>
              <Icon className="h-3 w-3" /> {meta.label}
            </Badge>
            <span className="text-[11px] text-muted-foreground inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> {timeAgo(item.publishedAt)}
            </span>
          </div>

          <h3 className="font-display font-bold text-base md:text-lg text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {item.title}
          </h3>

          {item.summary && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-3 flex-1">{item.summary}</p>
          )}

          <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground truncate max-w-[55%]" title={item.source}>
              {item.source}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
              Read update <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

const ConversionCard = ({
  href, icon: Icon, title, desc,
}: { href: string; icon: typeof Activity; title: string; desc: string }) => (
  <Link
    to={href}
    className="group bg-card border border-border rounded-xl p-5 hover:border-gold hover:shadow-card transition-all flex items-start gap-3"
  >
    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <h4 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">{title}</h4>
      <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
    </div>
  </Link>
);

export default NewsHubPage;
