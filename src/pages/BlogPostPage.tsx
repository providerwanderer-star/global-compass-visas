import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Clock, ArrowLeft, ArrowRight, List, MessageCircle } from "lucide-react";
import { useState, useMemo } from "react";
import EligibilityForm from "@/components/EligibilityForm";
import InternalLinks from "@/components/InternalLinks";
import { blogPosts } from "@/data/blogData";
import { blogToServices, getRelatedServiceData } from "@/data/internalLinks";
import { blogEnhancements } from "@/data/blogEnhancements";
import FAQCallToAction from "@/components/FAQCallToAction";

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const enhancement = post ? blogEnhancements[post.slug] : undefined;

  // Extract headings for Table of Contents
  const headings = useMemo(() => {
    if (!post) return [];
    return post.content.split("\n").filter((line) => line.startsWith("## ") || line.startsWith("### ")).map((line) => {
      const level = line.startsWith("### ") ? 3 : 2;
      const text = line.replace(/^#{2,3}\s/, "");
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return { level, text, id };
    });
  }, [post]);

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


  let sectionCount = 0;

  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("## ")) {
        sectionCount++;
        const text = line.replace("## ", "");
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        const showCta = sectionCount > 0 && sectionCount % 2 === 0;
        return (
          <div key={i}>
            {showCta && (
              <div className="bg-gold/10 border border-gold/30 rounded-xl p-5 my-6">
                <p className="text-foreground font-semibold text-sm mb-2">📋 Ready to start your immigration journey?</p>
                <p className="text-muted-foreground text-sm mb-3">Get a free eligibility assessment from our experts.</p>
                <a href="#sidebar-form" className="inline-flex items-center text-sm font-semibold text-gold hover:underline">
                  Check Your Eligibility Now <ArrowRight className="ml-1 h-3 w-3" />
                </a>
              </div>
            )}
            <h2 id={id} className="font-display text-2xl font-bold text-foreground mt-8 mb-4 scroll-mt-24">{text}</h2>
          </div>
        );
      }
      if (line.startsWith("### ")) {
        const text = line.replace("### ", "");
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        return <h3 key={i} id={id} className="font-display text-xl font-bold text-foreground mt-6 mb-3 scroll-mt-24">{text}</h3>;
      }
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
        <meta property="og:image" content="https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/adc15f61-3495-4592-a9ee-4f8cecf8b858/id-preview-a6038808--fba6843f-065b-405d-9fa2-e92e64570374.lovable.app-1775668033782.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={post.title} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="4 Aces Visa" />
        <meta property="article:section" content={post.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content="https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/adc15f61-3495-4592-a9ee-4f8cecf8b858/id-preview-a6038808--fba6843f-065b-405d-9fa2-e92e64570374.lovable.app-1775668033782.png" />
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
        {enhancement?.faqs && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": enhancement.faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
              })),
            })}
          </script>
        )}
      </Helmet>

      {/* Hero */}
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
              {/* Quick Answer Box */}
              {enhancement?.quickAnswer && (
                <div className="bg-gold/5 border-l-4 border-gold rounded-r-xl p-5 mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="h-4 w-4 text-gold" />
                    <span className="text-xs font-bold text-gold uppercase tracking-wider">Quick Answer</span>
                  </div>
                  <p className="text-foreground text-sm leading-relaxed font-medium">{enhancement.quickAnswer}</p>
                </div>
              )}

              {/* Table of Contents */}
              {headings.length > 3 && (
                <details className="bg-card border border-border rounded-xl p-5 mb-8 group" open>
                  <summary className="flex items-center gap-2 cursor-pointer font-display font-semibold text-foreground text-sm">
                    <List className="h-4 w-4 text-gold" />
                    Table of Contents
                    <span className="ml-auto text-gold text-xs group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <nav className="mt-3 space-y-1">
                    {headings.map((h) => (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        className={`block text-sm text-muted-foreground hover:text-gold transition-colors ${h.level === 3 ? "pl-4" : ""}`}
                      >
                        {h.text}
                      </a>
                    ))}
                    {enhancement?.faqs && (
                      <a href="#faqs" className="block text-sm text-muted-foreground hover:text-gold transition-colors">
                        Frequently Asked Questions
                      </a>
                    )}
                  </nav>
                </details>
              )}

              {renderContent(post.content)}

              {/* FAQ Section */}
              {enhancement?.faqs && enhancement.faqs.length > 0 && (
                <div id="faqs" className="mt-12 pt-8 border-t border-border scroll-mt-24">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {enhancement.faqs.map((faq, i) => (
                      <details key={i} className="bg-card rounded-xl border border-border group">
                        <summary className="flex items-center justify-between p-5 cursor-pointer font-display font-semibold text-foreground text-sm">
                          {faq.question}
                          <span className="text-gold ml-4 text-lg group-open:rotate-45 transition-transform duration-300">+</span>
                        </summary>
                        <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.answer}</div>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              {/* Final CTA */}
              <div className="bg-primary rounded-xl p-6 mt-10">
                <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Need Expert Immigration Guidance?</h3>
                <p className="text-primary-foreground/70 text-sm mb-4">Book a free consultation with 4 Aces Visa. 98% success rate, 15,000+ visas processed.</p>
                <Link to="/contact" className="inline-flex items-center text-sm font-semibold text-gold hover:underline">
                  Get Free Assessment <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <Link to="/blog" className="inline-flex items-center text-gold hover:underline">
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back to all articles
                </Link>
              </div>
            </article>
            <aside className="space-y-6" id="sidebar-form">
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Free Eligibility Check</h3>
                <EligibilityForm sourcePage={`blog-${post.slug}`} />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <InternalLinks
        services={getRelatedServiceData(blogToServices[post.slug] || []).map((s) => ({ slug: s.slug, title: s.title }))}
        title="Explore Our Services"
      />

      <FAQCallToAction />
    </div>
  );
};

export default BlogPostPage;
