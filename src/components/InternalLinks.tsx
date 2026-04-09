import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Briefcase } from "lucide-react";

interface RelatedLink {
  slug: string;
  title: string;
  excerpt?: string;
}

interface InternalLinksProps {
  blogs?: RelatedLink[];
  services?: RelatedLink[];
  title?: string;
}

const InternalLinks = ({ blogs = [], services = [], title = "Related Resources" }: InternalLinksProps) => {
  if (blogs.length === 0 && services.length === 0) return null;

  return (
    <section className="section-padding section-soft">
      <div className="container-narrow mx-auto">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.length > 0 && (
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-gold" /> Related Services
              </h3>
              <div className="space-y-3">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="block bg-card rounded-xl border border-border p-4 card-interactive glow-hover group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground text-sm group-hover:text-gold transition-colors">
                        {s.title}
                      </span>
                      <ArrowRight className="h-4 w-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {blogs.length > 0 && (
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-gold" /> Related Articles
              </h3>
              <div className="space-y-3">
                {blogs.map((b) => (
                  <Link
                    key={b.slug}
                    to={`/blog/${b.slug}`}
                    className="block bg-card rounded-xl border border-border p-4 card-interactive glow-hover group"
                  >
                    <span className="font-medium text-foreground text-sm group-hover:text-gold transition-colors line-clamp-2">
                      {b.title}
                    </span>
                    {b.excerpt && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{b.excerpt}</p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InternalLinks;
