import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogData";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const categories = [
  { label: "All", value: "all" },
  { label: "Canada PR", value: "Canada PR" },
  { label: "Work Permit", value: "Work Permit" },
  { label: "Study Visa", value: "Study Visa" },
  { label: "Local Intent", value: "Local Intent" },
  { label: "Immigration Guide", value: "Immigration Guide" },
];

const BlogListPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredPosts = useMemo(
    () => activeFilter === "all" ? blogPosts : blogPosts.filter((p) => p.category === activeFilter),
    [activeFilter]
  );

  return (
    <div>
      <Helmet>
        <title>Immigration Blog & Guides | 4 Aces Visa</title>
        <meta name="description" content="Expert immigration articles, guides, and updates for Canada, Australia, Germany, and UK immigration. Tips on Express Entry, study visas, work permits, and more." />
        <link rel="canonical" href="https://www.4acesvisa.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Immigration Blog & Guides | 4 Aces Visa" />
        <meta property="og:description" content="Expert immigration articles, guides, and updates for Canada, Australia, Germany, and UK." />
        <meta property="og:url" content="https://www.4acesvisa.com/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Immigration Blog & Guides | 4 Aces Visa" />
        <meta name="twitter:description" content="Expert immigration articles and guides for Canada, Australia, Germany, and UK." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Immigration Blog & Guides",
            "description": "Expert immigration articles for Canada, Australia, Germany, and UK.",
            "url": "https://www.4acesvisa.com/blog",
            "publisher": { "@type": "Organization", "name": "4 Aces Visa" },
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": blogPosts.map((post, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "url": `https://www.4acesvisa.com/blog/${post.slug}`,
                "name": post.title
              }))
            }
          })}
        </script>
      </Helmet>

      <section className="bg-primary pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4"
          >
            Immigration Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary-foreground/70 text-lg max-w-2xl"
          >
            Expert guides, tips, and insights for your immigration journey to Canada, Australia, and Germany.
          </motion.p>
        </div>
      </section>

      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === cat.value
                    ? "bg-gold text-accent-foreground shadow-gold"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-gold/40"
                }`}
              >
                {cat.label}
                {cat.value !== "all" && (
                  <span className="ml-1.5 text-xs opacity-70">
                    ({blogPosts.filter((p) => p.category === cat.value).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {filteredPosts.map((post) => (
              <motion.div key={post.slug} variants={staggerItem}>
                <Link to={`/blog/${post.slug}`} className="block group h-full">
                  <div className="bg-card rounded-xl border border-border overflow-hidden h-full flex flex-col card-interactive">
                    <div className="bg-secondary p-4 group-hover:bg-gold/10 transition-colors duration-300">
                      <BookOpen className="h-8 w-8 text-gold group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <span className="text-xs font-medium text-gold">{post.category}</span>
                      <h2 className="font-display text-lg font-bold text-foreground mt-1 mb-2 group-hover:text-gold transition-colors line-clamp-2">{post.title}</h2>
                      <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{post.excerpt}</p>
                      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{post.readTime} read</span>
                        <span className="flex items-center text-gold font-medium group-hover:gap-1.5 transition-all">
                          Read more <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No articles found in this category.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogListPage;
