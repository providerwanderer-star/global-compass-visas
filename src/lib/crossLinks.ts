/**
 * Programmatic cross-link helpers — Sprint G.
 * Generates contextually-relevant links between NOC, Origin (GEO),
 * CRS-band and Settlement pages so each leaf page boosts its neighbours.
 *
 * All helpers return `RelatedLink[]` ready to drop into <RelatedLinks />.
 */

import type { RelatedLink } from "@/components/RelatedLinks";
import { originCountries } from "@/data/geoOriginData";
import { crsBands } from "@/data/crsBandData";
import { settlementGuides } from "@/data/settlementData";
import { inDemandJobs } from "@/data/inDemandJobs";

const SETTLEMENT_DEFAULT_SLUGS = [
  "get-sin-number",
  "open-bank-account",
  "apply-health-card",
];

/** Map a NOC's industry → category-based draw label used on CRS pages. */
function nocToCRSBand(teer: number): string {
  // Simple heuristic — TEER 0/1 candidates compete in higher draws,
  // TEER 2/3 in mid bands, TEER 4/5 are rare in EE.
  if (teer <= 1) return "450-plus";
  if (teer === 2) return "400-450";
  return "350-400";
}

/** Links shown on a NOC detail page. */
export function linksForNoc(nocCode: string, teer = 1): RelatedLink[] {
  const band = nocToCRSBand(teer);
  const crsLink = crsBands.find((b) => b.slug === band) ?? crsBands[0];

  return [
    {
      href: `/canada-pr/crs/${crsLink.slug}`,
      label: `Canada PR with CRS ${crsLink.label}`,
      sublabel: "See best pathways for your score range",
      emoji: "📊",
    },
    {
      href: "/canada-pr-from/india",
      label: "Canada PR from India",
      sublabel: "Top destination for this occupation",
      emoji: "🇮🇳",
    },
    {
      href: "/canada-pr-from/philippines",
      label: "Canada PR from Philippines",
      sublabel: "Healthcare & care-giver pathway",
      emoji: "🇵🇭",
    },
    {
      href: `/settle-in-canada/${SETTLEMENT_DEFAULT_SLUGS[0]}`,
      label: "Get your SIN on landing day",
      sublabel: "Step 1 after your PR is approved",
      emoji: "🆔",
    },
    {
      href: "/settle-in-canada",
      label: "All settlement guides",
      sublabel: "Banking, healthcare, housing & schools",
      emoji: "🏠",
    },
    {
      href: "/express-entry/draws",
      label: "Latest Express Entry draws",
      sublabel: "Fresh CRS cut-offs each round",
      emoji: "📈",
    },
  ];
}

/** Links shown on a Canada-PR-from-{country} page. */
export function linksForOrigin(originSlug: string): RelatedLink[] {
  const origin = originCountries.find((o) => o.slug === originSlug);
  const topNoc = origin?.topNocs?.[0];

  // Pair each origin to a sensible CRS band based on first listed pathway.
  const defaultBand =
    crsBands.find((b) => b.slug === "450-plus") ?? crsBands[0];

  const out: RelatedLink[] = [
    {
      href: `/canada-pr/crs/${defaultBand.slug}`,
      label: `Canada PR with CRS ${defaultBand.label}`,
      sublabel: "Most common range for skilled applicants",
      emoji: "📊",
    },
  ];

  if (topNoc) {
    const linkedJob = inDemandJobs.find((j) => j.noc === topNoc.code);
    if (linkedJob) {
      out.push({
        href: `/in-demand-jobs?job=${linkedJob.slug}`,
        label: `${topNoc.title} — PR pathway`,
        sublabel: `NOC ${topNoc.code} — top occupation for ${origin?.demonym}s`,
        emoji: "💼",
      });
    }
  }

  out.push(
    {
      href: `/settle-in-canada/${SETTLEMENT_DEFAULT_SLUGS[0]}`,
      label: "Get your SIN on landing day",
      sublabel: "Free, 15 minutes at any Service Canada office",
      emoji: "🆔",
    },
    {
      href: `/settle-in-canada/${SETTLEMENT_DEFAULT_SLUGS[1]}`,
      label: "Open a Canadian bank account",
      sublabel: "Newcomer programs — fee-free for the first year",
      emoji: "🏦",
    },
    {
      href: `/settle-in-canada/${SETTLEMENT_DEFAULT_SLUGS[2]}`,
      label: "Apply for your provincial health card",
      sublabel: "OHIP, MSP, AHCIP — coverage starts free",
      emoji: "🏥",
    },
    {
      href: "/in-demand-jobs",
      label: "Explore all in-demand Canadian jobs",
      sublabel: "Live LMIA & Job Bank postings",
      emoji: "📈",
    }
  );

  return out;
}

/** Links shown on a CRS-band page. */
export function linksForCrsBand(bandSlug: string): RelatedLink[] {
  // Suggest 2 NOCs that historically clear similar CRS, plus 2 origins
  // and 2 settlement guides.
  const sampleNocs = inDemandJobs.slice(0, 3);
  const featuredOrigins = ["india", "philippines", "nigeria"];

  const out: RelatedLink[] = sampleNocs.map((j) => ({
    href: `/in-demand-jobs?job=${j.slug}`,
    label: `${j.title} (NOC ${j.noc})`,
    sublabel: j.summary,
    emoji: "💼",
  }));

  featuredOrigins.forEach((slug) => {
    const o = originCountries.find((c) => c.slug === slug);
    if (o) {
      out.push({
        href: `/canada-pr-from/${o.slug}`,
        label: `Canada PR from ${o.country}`,
        sublabel: `${o.avgTimelineMonths} • ${o.estCostCAD}`,
        emoji: o.flag,
      });
    }
  });

  out.push({
    href: "/settle-in-canada",
    label: "Land-and-settle checklist",
    sublabel: "Everything to do in your first 30 days",
    emoji: "🏠",
  });

  return out;
}

/** Links shown on a Settlement guide page (in addition to its own related). */
export function linksForSettlement(currentSlug: string): RelatedLink[] {
  const others = settlementGuides
    .filter((g) => g.slug !== currentSlug)
    .slice(0, 3)
    .map<RelatedLink>((g) => ({
      href: `/settle-in-canada/${g.slug}`,
      label: g.topic,
      sublabel: g.shortAnswer.slice(0, 90) + "…",
      emoji: g.emoji,
    }));

  return [
    ...others,
    {
      href: "/canada-pr-from/india",
      label: "Canada PR from India",
      sublabel: "Most popular origin for newcomers",
      emoji: "🇮🇳",
    },
    {
      href: "/in-demand-jobs",
      label: "In-demand jobs after landing",
      sublabel: "Get hired in your first 60 days",
      emoji: "💼",
    },
    {
      href: "/crs-calculator",
      label: "Re-check your CRS",
      sublabel: "Boost your score with Canadian experience",
      emoji: "📊",
    },
  ];
}
