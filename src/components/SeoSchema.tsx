import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface BreadcrumbItem {
  name: string;
  url: string; // absolute or path; will be absolutized to 4acesvisa.com
}

interface SeoSchemaProps {
  /** Breadcrumb trail. Home is auto-prepended unless `includeHome` is false. */
  breadcrumbs?: BreadcrumbItem[];
  includeHome?: boolean;
  /** Skip Organization schema (e.g. on Home where a richer ProfessionalService is already injected). */
  skipOrganization?: boolean;
  /** Skip auto-generated breadcrumbs from URL (use only when caller passes its own breadcrumbs). */
  skipAutoBreadcrumbs?: boolean;
}

const SITE = "https://www.4acesvisa.com";

const absolutize = (url: string) =>
  url.startsWith("http") ? url : `${SITE}${url.startsWith("/") ? "" : "/"}${url}`;

/** Convert "/express-entry/draws" → [{name:"Express Entry", url:"/express-entry"}, {name:"Draws", url:"/express-entry/draws"}] */
function autoBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  if (!pathname || pathname === "/") return [];
  const parts = pathname.split("/").filter(Boolean);
  return parts.map((seg, i) => ({
    name: seg
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .replace(/\bNoc\b/, "NOC")
      .replace(/\bPnp\b/, "PNP")
      .replace(/\bCrs\b/, "CRS")
      .replace(/\bUk\b/, "UK")
      .replace(/\bEe\b/, "EE")
      .replace(/\bIrcc\b/, "IRCC")
      .replace(/\bFaq\b/, "FAQ"),
    url: "/" + parts.slice(0, i + 1).join("/"),
  }));
}

/**
 * Site-wide JSON-LD injector mounted once in App.tsx.
 * Always injects:
 *  - Organization (legacy, kept for back-compat)
 *  - LocalBusiness (Phase 4 — for AI search & local pack)
 *  - BreadcrumbList (auto-derived from URL when no explicit breadcrumbs are passed)
 * Page-specific schema (FAQ, HowTo, Article, etc.) should still be added per page.
 */
const SeoSchema = ({
  breadcrumbs,
  includeHome = true,
  skipOrganization = false,
  skipAutoBreadcrumbs = false,
}: SeoSchemaProps) => {
  const { pathname } = useLocation();

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: "4 Aces Visa",
    url: SITE,
    logo: `${SITE}/favicon.ico`,
    description:
      "RCIC-regulated immigration consultancy for Canada, Australia, Germany & UK. 15,000+ visas processed, 98% approval rate.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-647-862-2190",
      contactType: "customer service",
      email: "sahil280389@gmail.com",
      availableLanguage: ["English", "Hindi", "Punjabi"],
    },
    sameAs: [
      "https://www.facebook.com/4acesvisa",
      "https://www.instagram.com/4acesvisa",
      "https://www.linkedin.com/company/4acesvisa",
    ],
  };

  // LocalBusiness — appears on EVERY page so AI engines and local search
  // surfaces always have a complete business profile to cite.
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE}/#localbusiness`,
    name: "4 Aces Visa",
    description:
      "RCIC-led Canadian immigration consultants. Express Entry, LMIA, PNP, study permits, work visas.",
    url: SITE,
    telephone: "+1-647-862-2190",
    email: "sahil280389@gmail.com",
    image: `${SITE}/og-default.jpg`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "CA",
      addressRegion: "ON",
    },
    areaServed: ["Canada", "India", "Australia", "Germany", "United Kingdom"],
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/4acesvisa",
      "https://www.instagram.com/4acesvisa",
      "https://www.linkedin.com/company/4acesvisa",
    ],
  };

  // Resolve breadcrumb trail: explicit > auto-from-URL > none
  const explicit = breadcrumbs && breadcrumbs.length
    ? (includeHome ? [{ name: "Home", url: "/" }, ...breadcrumbs] : breadcrumbs)
    : null;
  const auto = !explicit && !skipAutoBreadcrumbs
    ? [{ name: "Home", url: "/" }, ...autoBreadcrumbsFromPath(pathname)]
    : null;
  const items = explicit ?? auto;

  const breadcrumbList = items
    && items.length > 1 // don't emit a 1-item breadcrumb on homepage
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          item: absolutize(b.url),
        })),
      }
    : null;

  return (
    <Helmet>
      {!skipOrganization && (
        <script type="application/ld+json">{JSON.stringify(organization)}</script>
      )}
      <script type="application/ld+json">{JSON.stringify(localBusiness)}</script>
      {breadcrumbList && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbList)}</script>
      )}
    </Helmet>
  );
};

export default SeoSchema;