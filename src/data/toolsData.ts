import { Calculator, Search, TrendingUp, Map, Clock, Compass, Scale, DollarSign, LucideIcon } from "lucide-react";

export interface ToolItem {
  icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
  status: "live" | "soon";
  updated?: string;
}

export const tools: ToolItem[] = [
  {
    icon: Calculator,
    title: "CRS Score Calculator",
    desc: "Calculate your Express Entry CRS score in 2 minutes.",
    href: "/crs-calculator",
    status: "live",
    updated: "2026-04-15",
  },
  {
    icon: Compass,
    title: "Pathway Quiz",
    desc: "Find your best Canada immigration route in 90 seconds.",
    href: "/quiz",
    status: "live",
    updated: "2026-04-10",
  },
  {
    icon: TrendingUp,
    title: "Express Entry Draws",
    desc: "Latest IRCC draw cutoffs, categories & ITA counts.",
    href: "/tools/express-entry-draws",
    status: "live",
    updated: "2026-04-15",
  },
  {
    icon: Map,
    title: "PNP Draw Tracker",
    desc: "Province-by-province nomination updates.",
    href: "/tools/pnp-draws",
    status: "live",
    updated: "2026-04-15",
  },
  {
    icon: Search,
    title: "NOC Finder",
    desc: "Look up your NOC code, TEER & Express Entry eligibility.",
    href: "/tools/noc-finder",
    status: "live",
    updated: "2026-04-15",
  },
  {
    icon: Clock,
    title: "Processing Times",
    desc: "Current IRCC timelines for PR, work, study & visitor visas.",
    href: "/tools/processing-times",
    status: "live",
    updated: "2026-04-15",
  },
  {
    icon: Scale,
    title: "Compare PR Pathways",
    desc: "Side-by-side ranking of EE, PNP, Study-to-PR & Work Permit for your profile.",
    href: "/tools/compare-pathways",
    status: "live",
    updated: "2026-04-21",
  },
  {
    icon: DollarSign,
    title: "IRCC Fees Calculator",
    desc: "Current government fees in CAD + custom estimator for your application.",
    href: "/tools/ircc-fees",
    status: "live",
    updated: "2026-04-21",
  },
];
