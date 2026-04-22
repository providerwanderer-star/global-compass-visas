import { Helmet } from "react-helmet-async";

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
}

const SITE = "https://www.4acesvisa.com";

const absolutize = (url: string) =>
  url.startsWith("http") ? url : `${SITE}${url.startsWith("/") ? "" : "/"}${url}`;

/**
 * Site-wide JSON-LD injector.
 * - Always injects Organization (unless skipOrganization)
 * - Injects BreadcrumbList when `breadcrumbs` provided
 * Page-specific schema (FAQ, HowTo, Article, etc.) should still be added per page.
 */
const SeoSchema = ({
  breadcrumbs,
  includeHome = true,
  skipOrganization = false,
}: SeoSchemaProps) => {
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

  const items =
    breadcrumbs && breadcrumbs.length
      ? includeHome
        ? [{ name: "Home", url: "/" }, ...breadcrumbs]
        : breadcrumbs
      : null;

  const breadcrumbList = items
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
      {breadcrumbList && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbList)}</script>
      )}
    </Helmet>
  );
};

export default SeoSchema;