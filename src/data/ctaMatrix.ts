/**
 * Intent-matched CTA copy by page type.
 * Used by the sticky mobile bar and reusable CTA blocks.
 */
export type CTAIntent = "tool" | "blog" | "service" | "city" | "country" | "hub" | "default";

export interface CTAConfig {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

export const CTA_MATRIX: Record<CTAIntent, CTAConfig> = {
  tool: {
    primaryLabel: "Compare My Profile",
    primaryHref: "/quiz",
    secondaryLabel: "Talk to Expert",
    secondaryHref: "https://wa.me/16478622190?text=Hi%2C%20I%20want%20to%20compare%20my%20profile%20to%20the%20latest%20draw",
  },
  blog: {
    primaryLabel: "Find My Best Pathway",
    primaryHref: "/quiz",
    secondaryLabel: "Free Assessment",
    secondaryHref: "/contact",
  },
  service: {
    primaryLabel: "Free Assessment",
    primaryHref: "/contact",
    secondaryLabel: "WhatsApp Us",
    secondaryHref: "https://wa.me/16478622190?text=Hi%2C%20I%20need%20immigration%20help",
  },
  city: {
    primaryLabel: "Speak to Local Expert",
    primaryHref: "/contact",
    secondaryLabel: "Call Now",
    secondaryHref: "tel:+16478622190",
  },
  country: {
    primaryLabel: "Check Eligibility",
    primaryHref: "/quiz",
    secondaryLabel: "Free Assessment",
    secondaryHref: "/contact",
  },
  hub: {
    primaryLabel: "Find My Pathway",
    primaryHref: "/quiz",
    secondaryLabel: "Talk to Expert",
    secondaryHref: "/contact",
  },
  default: {
    primaryLabel: "Free Assessment",
    primaryHref: "/contact",
    secondaryLabel: "WhatsApp",
    secondaryHref: "https://wa.me/16478622190?text=Hi%2C%20I%20need%20immigration%20guidance",
  },
};

/** Map URL pathname to a CTA intent. */
export function intentFromPath(pathname: string): CTAIntent {
  if (pathname.startsWith("/tools") || pathname === "/crs-calculator") return "tool";
  if (pathname.startsWith("/blog/")) return "blog";
  if (pathname.startsWith("/services/")) return "service";
  if (pathname.startsWith("/city/")) return "city";
  if (pathname.startsWith("/immigration/")) return "country";
  if (
    pathname === "/india" ||
    pathname === "/express-entry" ||
    pathname.startsWith("/india/") ||
    pathname === "/h1b-to-canada-pr" ||
    pathname === "/usa-to-canada-immigration" ||
    pathname === "/canada-pr-for-indians"
  )
    return "hub";
  return "default";
}