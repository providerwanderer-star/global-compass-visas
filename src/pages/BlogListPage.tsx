import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogData";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5 } }),
};

const BlogListPage = () => {
  return (
    <div>
      <Helmet>
        <title>Immigration Blog & Guides | 4 Aces Visa</title>
        <meta name="description" content="Expert immigration articles, guides, and updates for Canada, Australia, Germany, and UK immigration. Tips on Express Entry, study visas, work permits, and more." />
        <link rel="canonical" href="https://4acesvisa.com/blog" />
      </Helmet>
      <section className="bg-primary pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Immigration Blog</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl">Expert guides, tips, and insights for your immigration journey to Canada, Australia, and Germany.</p>
        </div>
      </section>
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <motion.div key={post.slug} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Link to={`/blog/${post.slug}`} className="block group h-full">
                  <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-elevated transition-all h-full flex flex-col">
                    <div className="bg-secondary p-4">
                      <BookOpen className="h-8 w-8 text-gold" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <span className="text-xs font-medium text-gold">{post.category}</span>
                      <h2 className="font-display text-lg font-bold text-foreground mt-1 mb-2 group-hover:text-gold transition-colors line-clamp-2">{post.title}</h2>
                      <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{post.excerpt}</p>
                      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{post.readTime} read</span>
                        <span className="flex items-center text-gold font-medium">
                          Read more <ArrowRight className="h-3 w-3 ml-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogListPage;
