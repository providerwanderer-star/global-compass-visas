import { useEffect, useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Calendar, Check, Copy, ExternalLink,
  Facebook, Linkedin, Link2, Mail, MessageCircle, Sparkles, Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  buildInternalFeed, fetchExternalNews, timeAgo, type NewsItem,
} from "@/lib/newsFeed";
import { buildNewsSlug, parseNewsSlug } from "@/lib/newsSlug";

const TYPE_LABEL: Record<NewsItem["type"], string> = {
  draw: "Express Entry Draw",
  pnp: "PNP Draw",
  policy: "Policy Update",
  announcement: "Announcement",
  blog: "Guide",
};

const TYPE_BADGE: Record<NewsItem["type"], string> = {
  draw: "bg-primary text-primary-foreground",
  pnp: "bg-gold text-accent-foreground",
  policy: "bg-emerald-600 text-white",
  announcement: "bg-sky-600 text-white",
  blog: "bg-secondary text-foreground",
};

const NewsDetailPage = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const { id } = parseNewsSlug(slug);

  const internalFeed = useMemo(buildInternalFeed, []);
  const [externalNews, setExternalNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchExternalNews()
      .then(({ items }) => { if (!cancelled) setExternalNews(items); })
      .catch((e) => console.error("[NewsDetail] external fetch error", e))
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const allItems = useMemo(
    () => [...externalNews, ...internalFeed],
    [externalNews, internalFeed],
  );

  const item = useMemo(
    () => allItems.find((i) => i.id === id),
    [allItems, id],
  );

  // Pick 3 related items of any other type/topic
  const related = useMemo(() => {
    if (!item) return [];
    return allItems
      .filter((i) => i.id !== item.id)
      .slice(0, 4);
  }, [allItems, item]);

  // While external feed is loading and item not yet found, show skeleton
  if (!item && loading) {
    return (
      <div className="container-narrow mx-auto px-4 py-16">
        <div className="h-6 w-32 bg-secondary rounded mb-6 animate-pulse" />
        <div className="h-10 w-3/4 bg-secondary rounded mb-4 animate-pulse" />
        <div className="h-4 w-full bg-secondary rounded mb-2 animate-pulse" />
        <div className="h-4 w-5/6 bg-secondary rounded animate-pulse" />
      </div>
    );
  }

  if (!item) {
    return <Navigate to="/news" replace />;
  }

  const canonical = `https://www.4acesvisa.com/news/${buildNewsSlug(item.id, item.title)}`;
  const isExternal = item.url.startsWith("http");

  const shareText = `${item.title} — ${item.summary}`.slice(0, 240);
  const encodedUrl = encodeURIComponent(canonical);
  const encodedText = encodeURIComponent(shareText);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    email: `mailto:?subject=${encodeURIComponent(item.title)}&body=${encodedText}%20${encodedUrl}`,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(canonical);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("copy failed", e);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <Helmet>
        <title>{`${item.title} · 4 Aces Visa News`}</title>
        <meta name="description" content={item.summary.slice(0, 158)} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={item.title} />
        <meta property="og:description" content={item.summary.slice(0, 200)} />
        <meta property="og:url" content={canonical} />
        <meta property="article:published_time" content={item.publishedAt} />
        <meta property="article:section" content={TYPE_LABEL[item.type]} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={item.title} />
        <meta name="twitter:description" content={item.summary.slice(0, 200)} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: item.title,
            description: item.summary,
            datePublished: item.publishedAt,
            dateModified: item.publishedAt,
            url: canonical,
            articleSection: TYPE_LABEL[item.type],
            publisher: {
              "@type": "Organization",
              name: "4 Aces Visa",
              url: "https://www.4acesvisa.com",
            },
            author: {
              "@type": "Organization",
              name: item.source,
            },
          })}
        </script>
      </Helmet>

      <article className="container-narrow mx-auto px-4 py-8 md:py-12">
        <Link
          to="/news"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to News Hub
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-6 md:p-10 shadow-card"
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge className={TYPE_BADGE[item.type]}>{TYPE_LABEL[item.type]}</Badge>
            <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {timeAgo(item.publishedAt)}
            </span>
            <span className="text-xs text-muted-foreground">· {item.source}</span>
          </div>

          <h1 className="font-display text-2xl md:text-4xl font-extrabold text-foreground leading-tight">
            {item.title}
          </h1>

          <p className="text-base md:text-lg text-muted-foreground mt-4 leading-relaxed">
            {item.summary}
          </p>

          {/* Long-form body for internal items */}
          {item.body && (
            <div className="mt-6 prose prose-sm md:prose-base max-w-none text-foreground/90">
              <p>{item.body}</p>
            </div>
          )}

          {/* Meta key facts */}
          {item.meta && Object.keys(item.meta).length > 0 && (
            <dl className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(item.meta).map(([k, v]) => (
                <div key={k} className="bg-secondary/50 rounded-lg px-3 py-2">
                  <dt className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                    {k}
                  </dt>
                  <dd className="text-sm font-bold text-foreground">{String(v)}</dd>
                </div>
              ))}
            </dl>
          )}

          {/* Primary CTA */}
          <div className="mt-8 flex flex-wrap gap-3">
            {isExternal ? (
              <Button asChild className="bg-primary hover:bg-primary/90">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  Read full article on {item.source}
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </Button>
            ) : (
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to={item.url}>
                  Open in tracker <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            )}
            <Button asChild variant="outline">
              <Link to="/crs-calculator">
                <Sparkles className="h-4 w-4 mr-1" /> Check your CRS
              </Link>
            </Button>
          </div>
        </motion.header>

        {/* Share bar */}
        <section className="mt-6 bg-card border border-border rounded-xl p-4 md:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-foreground mr-2">Share this update:</span>
            <ShareLink href={shareLinks.twitter} label="Twitter" icon={Twitter} />
            <ShareLink href={shareLinks.facebook} label="Facebook" icon={Facebook} />
            <ShareLink href={shareLinks.linkedin} label="LinkedIn" icon={Linkedin} />
            <ShareLink href={shareLinks.whatsapp} label="WhatsApp" icon={MessageCircle} />
            <ShareLink href={shareLinks.email} label="Email" icon={Mail} external={false} />
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-secondary hover:bg-secondary/70 text-foreground transition-colors"
              aria-label="Copy link"
            >
              {copied ? (
                <><Check className="h-3.5 w-3.5 text-emerald-600" /> Copied</>
              ) : (
                <><Link2 className="h-3.5 w-3.5" /> Copy link</>
              )}
            </button>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-4">
              More immigration updates
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/news/${buildNewsSlug(r.id, r.title)}`}
                  className="block bg-card border border-border rounded-xl p-4 hover:border-gold/60 hover:shadow-card transition-all"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Badge className={`${TYPE_BADGE[r.type]} text-[10px]`}>{TYPE_LABEL[r.type]}</Badge>
                    <span className="text-[11px] text-muted-foreground">{timeAgo(r.publishedAt)}</span>
                  </div>
                  <h3 className="font-display font-bold text-sm md:text-base text-foreground leading-snug line-clamp-2">
                    {r.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/news"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all immigration news
          </Link>
        </div>
      </article>
    </div>
  );
};

const ShareLink = ({
  href, label, icon: Icon, external = true,
}: { href: string; label: string; icon: typeof Twitter; external?: boolean }) => (
  <a
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground transition-colors"
    aria-label={`Share on ${label}`}
  >
    <Icon className="h-3.5 w-3.5" /> {label}
  </a>
);

export default NewsDetailPage;
