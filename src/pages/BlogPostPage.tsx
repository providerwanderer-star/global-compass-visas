import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Clock, ArrowLeft } from "lucide-react";
import EligibilityForm from "@/components/EligibilityForm";
import { blogPosts } from "@/data/blogData";

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-gold hover:underline">Back to blog</Link>
        </div>
      </div>
    );
  }

  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("## ")) return <h2 key={i} className="font-display text-2xl font-bold text-foreground mt-8 mb-4">{line.replace("## ", "")}</h2>;
      if (line.startsWith("### ")) return <h3 key={i} className="font-display text-xl font-bold text-foreground mt-6 mb-3">{line.replace("### ", "")}</h3>;
      if (line.startsWith("- **")) {
        const match = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/);
        if (match) return <li key={i} className="ml-4 mb-1 text-muted-foreground"><strong className="text-foreground">{match[1]}:</strong> {match[2]}</li>;
      }
      if (line.startsWith("- [ ] ")) return <li key={i} className="ml-4 mb-1 text-muted-foreground flex items-center gap-2">☐ {line.replace("- [ ] ", "")}</li>;
      if (line.startsWith("- ")) return <li key={i} className="ml-4 mb-1 text-muted-foreground">{line.replace("- ", "• ")}</li>;
      if (line.startsWith("| ") && line.includes("---")) return null;
      if (line.startsWith("| ")) {
        const cells = line.split("|").filter(Boolean).map(c => c.trim());
        return (
          <div key={i} className="grid grid-cols-2 gap-4 border-b border-border py-2 text-sm">
            {cells.map((cell, j) => (
              <span key={j} className={j === 0 ? "text-foreground font-medium" : "text-gold"}>{cell}</span>
            ))}
          </div>
        );
      }
      if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-semibold text-foreground mb-2">{line.replace(/\*\*/g, "")}</p>;
      if (line.startsWith("👉 ")) return <p key={i} className="text-gold font-medium mb-1">{line}</p>;
      if (line.trim() === "") return <div key={i} className="h-2" />;
      return <p key={i} className="text-muted-foreground mb-2 leading-relaxed">{line}</p>;
    });
  };

  return (
    <div>
      <Helmet>
        <title>{post.title} | 4 Aces Visa Blog</title>
        <meta name="description" content={post.metaDescription || post.excerpt} />
        <link rel="canonical" href={`https://www.4acesvisa.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://www.4acesvisa.com/blog/${post.slug}`} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="4 Aces Visa" />
        <meta property="article:section" content={post.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.metaDescription || post.excerpt,
            "datePublished": post.date,
            "dateModified": post.date,
            "author": { "@type": "Organization", "name": "4 Aces Visa", "url": "https://www.4acesvisa.com" },
            "publisher": { "@type": "Organization", "name": "4 Aces Visa", "logo": { "@type": "ImageObject", "url": "https://www.4acesvisa.com/favicon.ico" } },
            "mainEntityOfPage": { "@type": "WebPage", "@id": `https://www.4acesvisa.com/blog/${post.slug}` },
            "articleSection": post.category,
            "wordCount": post.content.split(/\s+/).length,
            "inLanguage": "en-US"
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.4acesvisa.com" },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.4acesvisa.com/blog" },
              { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://www.4acesvisa.com/blog/${post.slug}` }
            ]
          })}
        </script>
      </Helmet>
      <section className="bg-primary pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-6">
            <Link to="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/blog" className="hover:text-gold">Blog</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold truncate max-w-[200px]">{post.title}</span>
          </nav>
          <div className="max-w-3xl">
            <span className="text-xs font-medium text-gold uppercase tracking-wider">{post.category}</span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mt-2 mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-primary-foreground/50 text-sm">
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {post.readTime} read</span>
              <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <article className="lg:col-span-2 prose-sm max-w-none">
              {renderContent(post.content)}
              <div className="mt-12 pt-8 border-t border-border">
                <Link to="/blog" className="inline-flex items-center text-gold hover:underline">
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back to all articles
                </Link>
              </div>
            </article>
            <aside className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Free Eligibility Check</h3>
                <EligibilityForm sourcePage={`blog-${post.slug}`} />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;
