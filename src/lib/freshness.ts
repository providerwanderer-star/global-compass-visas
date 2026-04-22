import { expressEntryDraws } from "@/data/expressEntryDraws";
import { pnpDraws } from "@/data/pnpDraws";
import { blogPosts } from "@/data/blogData";

export type FreshnessTopic =
  | "express-entry"
  | "pnp"
  | "geo-country"
  | "crs-band"
  | "noc"
  | "general";

export interface FreshnessSignal {
  /** ISO timestamp of the most recent underlying data point */
  lastUpdatedISO: string;
  /** Human label e.g. "April 2026" */
  lastUpdatedLabel: string;
  /** Short description of what just changed (for the banner) */
  headline: string;
  /** Optional internal link to view detail */
  href?: string;
  /** Source attribution */
  source: string;
}

function parseDate(d: string): number {
  const t = Date.parse(d);
  return isNaN(t) ? 0 : t;
}

function fmtMonthYear(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function latestDraw() {
  return [...expressEntryDraws].sort(
    (a, b) => parseDate(b.date) - parseDate(a.date),
  )[0];
}

function latestPNP() {
  return [...pnpDraws].sort((a, b) => parseDate(b.date) - parseDate(a.date))[0];
}

function latestBlog() {
  return [...blogPosts].sort(
    (a, b) => parseDate(b.date) - parseDate(a.date),
  )[0];
}

/**
 * Returns a freshness signal derived from the most recent live data feed
 * relevant to the topic. This keeps every GEO/AEO page in sync with the
 * underlying news + draw modules without manual edits.
 */
export function getFreshness(topic: FreshnessTopic): FreshnessSignal {
  const ee = latestDraw();
  const pnp = latestPNP();
  const blog = latestBlog();

  switch (topic) {
    case "express-entry": {
      const iso = new Date(parseDate(ee.date)).toISOString();
      return {
        lastUpdatedISO: iso,
        lastUpdatedLabel: fmtMonthYear(iso),
        headline: `New Express Entry draw #${ee.drawNumber} — ${ee.category} (CRS ${ee.crsMin}, ${ee.itas.toLocaleString()} ITAs)`,
        href: "/express-entry/draws",
        source: "IRCC Express Entry",
      };
    }
    case "pnp": {
      const iso = new Date(parseDate(pnp.date)).toISOString();
      return {
        lastUpdatedISO: iso,
        lastUpdatedLabel: fmtMonthYear(iso),
        headline: `${pnp.province} PNP draw — ${pnp.stream} (${pnp.invitations} invites${pnp.minScore ? `, min ${pnp.minScore}` : ""})`,
        href: "/pnp-tracker",
        source: `${pnp.province} PNP`,
      };
    }
    case "crs-band":
    case "geo-country":
    case "noc": {
      // Use most recent of EE or PNP — both feed pathway recommendations
      const eeT = parseDate(ee.date);
      const pnpT = parseDate(pnp.date);
      if (eeT >= pnpT) {
        const iso = new Date(eeT).toISOString();
        return {
          lastUpdatedISO: iso,
          lastUpdatedLabel: fmtMonthYear(iso),
          headline: `Updated after Express Entry draw #${ee.drawNumber} — ${ee.category} (CRS ${ee.crsMin})`,
          href: "/express-entry/draws",
          source: "IRCC Express Entry",
        };
      }
      const iso = new Date(pnpT).toISOString();
      return {
        lastUpdatedISO: iso,
        lastUpdatedLabel: fmtMonthYear(iso),
        headline: `Updated after ${pnp.province} PNP — ${pnp.stream} (${pnp.invitations} invites)`,
        href: "/pnp-tracker",
        source: `${pnp.province} PNP`,
      };
    }
    case "general":
    default: {
      const candidates = [
        { iso: new Date(parseDate(ee.date)).toISOString(), label: `Express Entry draw #${ee.drawNumber}`, href: "/express-entry/draws", source: "IRCC" },
        { iso: new Date(parseDate(pnp.date)).toISOString(), label: `${pnp.province} PNP draw`, href: "/pnp-tracker", source: pnp.province },
        { iso: new Date(parseDate(blog.date)).toISOString(), label: blog.title, href: `/blog/${blog.slug}`, source: "4 Aces Visa" },
      ].sort((a, b) => Date.parse(b.iso) - Date.parse(a.iso));
      const top = candidates[0];
      return {
        lastUpdatedISO: top.iso,
        lastUpdatedLabel: fmtMonthYear(top.iso),
        headline: `Latest update: ${top.label}`,
        href: top.href,
        source: top.source,
      };
    }
  }
}

/** Short relative label e.g. "2 days ago" */
export function relativeFromNow(iso: string): string {
  const diff = Date.now() - Date.parse(iso);
  const day = 86_400_000;
  const days = Math.floor(diff / day);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.floor(days / 365);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}