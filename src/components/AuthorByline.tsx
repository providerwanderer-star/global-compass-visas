import { Helmet } from "react-helmet-async";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShieldCheck, CalendarClock } from "lucide-react";
import {
  authors,
  defaultAuthor,
  getAuthorSchema,
  getReviewerSchema,
  reviewer,
  SITE,
} from "@/data/authorsData";

interface AuthorBylineProps {
  authorId?: string;
  /** ISO date string of last update (YYYY-MM-DD). Defaults to today. */
  updatedAt?: string;
  /** ISO date string of original publish. Optional. */
  publishedAt?: string;
  /** Article headline + URL — when provided, an Article JSON-LD is also injected. */
  articleHeadline?: string;
  articleUrl?: string;
  /** Visual variant. */
  variant?: "default" | "compact";
  className?: string;
}

const formatDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
};

/**
 * E-E-A-T byline block.
 * Renders: avatar + "By {Author}" + "Reviewed by Garg Brothers Team" + "Updated {date}".
 * Injects: Person JSON-LD for the author, plus Article JSON-LD when articleHeadline + articleUrl are supplied.
 * No fabricated RCIC license number is emitted in schema (CICC compliance).
 */
const AuthorByline = ({
  authorId = "sahil-garg",
  updatedAt,
  publishedAt,
  articleHeadline,
  articleUrl,
  variant = "default",
  className = "",
}: AuthorBylineProps) => {
  const author = authors[authorId] ?? defaultAuthor;
  const updated = updatedAt ?? new Date().toISOString().slice(0, 10);
  const published = publishedAt ?? updated;

  const personSchema = getAuthorSchema(author.id);

  const articleSchema =
    articleHeadline && articleUrl
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: articleHeadline,
          datePublished: published,
          dateModified: updated,
          author: {
            "@type": "Organization",
            name: author.name,
            url: author.url,
          },
          reviewedBy: getReviewerSchema(),
          publisher: {
            "@type": "Organization",
            name: "Garg Brothers",
            url: SITE,
            logo: {
              "@type": "ImageObject",
              url: `${SITE}/favicon.ico`,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": articleUrl.startsWith("http") ? articleUrl : `${SITE}${articleUrl}`,
          },
        }
      : null;

  const isCompact = variant === "compact";

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
        {articleSchema && (
          <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        )}
      </Helmet>

      <div
        className={`flex flex-wrap items-center gap-3 rounded-lg border border-border bg-muted/30 p-3 text-sm ${className}`}
        itemScope
        itemType="https://schema.org/Organization"
      >
        <Avatar className={isCompact ? "h-8 w-8" : "h-10 w-10"}>
          <AvatarImage src={author.image} alt={author.name} />
          <AvatarFallback>
            {author.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-1 flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-foreground">
            By{" "}
            <a
              href="/about"
              className="font-semibold text-primary hover:underline"
              itemProp="url"
            >
              <span itemProp="name">{author.name}</span>
            </a>
          </span>

          <span className="hidden text-muted-foreground sm:inline">·</span>

          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden />
            Reviewed by{" "}
            <a href="/about" className="hover:underline">
              {reviewer.name}
            </a>
          </span>

          <span className="hidden text-muted-foreground sm:inline">·</span>

          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <CalendarClock className="h-3.5 w-3.5" aria-hidden />
            Updated{" "}
            <time dateTime={updated} itemProp="dateModified">
              {formatDate(updated)}
            </time>
          </span>
        </div>
      </div>
    </>
  );
};

export default AuthorByline;
