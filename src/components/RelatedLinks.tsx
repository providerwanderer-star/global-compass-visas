import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export interface RelatedLink {
  href: string;
  label: string;
  sublabel?: string;
  emoji?: string;
}

interface RelatedLinksProps {
  /** Section heading */
  title?: string;
  /** Pre-built link cards */
  links: RelatedLink[];
  /** Visual variant */
  variant?: "grid" | "pills";
  /** Optional eyebrow caption */
  eyebrow?: string;
}

/**
 * Programmatic cross-link block used to wire NOC ↔ Origin ↔ CRS ↔ Settlement
 * pages together for AEO/GEO topical authority.
 */
const RelatedLinks = ({
  title = "Continue your research",
  links,
  variant = "grid",
  eyebrow,
}: RelatedLinksProps) => {
  if (!links?.length) return null;

  if (variant === "pills") {
    return (
      <section className="section-padding">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          {eyebrow && (
            <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
              {eyebrow}
            </p>
          )}
          <h2 className="font-display text-xl font-bold text-foreground mb-4">{title}</h2>
          <div className="flex flex-wrap gap-2">
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="text-sm font-medium px-4 py-2 rounded-full border border-border bg-card hover:border-primary hover:text-primary transition-colors"
              >
                {l.emoji ? `${l.emoji} ` : ""}
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding section-light">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="bg-card rounded-xl border border-border hover:border-primary p-4 card-interactive group flex items-start gap-3"
            >
              {l.emoji && (
                <span className="text-2xl shrink-0" aria-hidden="true">
                  {l.emoji}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {l.label}
                </p>
                {l.sublabel && (
                  <p className="text-xs text-muted-foreground mt-0.5">{l.sublabel}</p>
                )}
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0 mt-1" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedLinks;
