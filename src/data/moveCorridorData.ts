/**
 * Wave 3 — Move-corridor pages.
 * URL: /move/:corridor/:program  (e.g. /move/bangalore-to-toronto/express-entry)
 *
 * Curated origin → destination → program triples. Each combo renders templated
 * but corridor-specific content (hero, why, steps, cost, timeline, FAQs) so we
 * avoid thin/duplicate content while keeping the surface programmatic.
 */

export interface MovePathwayProgram {
  slug: "express-entry" | "pnp" | "study-permit" | "work-permit";
  name: string;
  shortName: string;
  oneLiner: string;
  bestFor: string;
}

export const MOVE_PROGRAMS: Record<MovePathwayProgram["slug"], MovePathwayProgram> = {
  "express-entry": {
    slug: "express-entry",
    name: "Express Entry (FSW / CEC)",
    shortName: "Express Entry",
    oneLiner: "Federal economic PR through CRS-ranked draws every 2 weeks.",
    bestFor: "Skilled professionals 25–35 with a degree, IELTS 7+ and 3+ yrs work experience.",
  },
  pnp: {
    slug: "pnp",
    name: "Provincial Nominee Program (PNP)",
    shortName: "PNP",
    oneLiner: "Provincial nomination adds 600 CRS points — near-guaranteed ITA.",
    bestFor: "Profiles tied to a specific province (Ontario, BC, Alberta, Saskatchewan).",
  },
  "study-permit": {
    slug: "study-permit",
    name: "Study Permit + PGWP",
    shortName: "Study Permit",
    oneLiner: "DLI college/university → 1–3 yr open work permit → CEC PR.",
    bestFor: "Under 30, recent grads, or career-switchers with INR 25–35L budget.",
  },
  "work-permit": {
    slug: "work-permit",
    name: "LMIA Work Permit / Global Talent Stream",
    shortName: "Work Permit",
    oneLiner: "Employer-sponsored permit — fastest path to landing in Canada.",
    bestFor: "Tech, healthcare and trades workers with a Canadian job offer.",
  },
};

export interface MoveCorridor {
  slug: string;            // "bangalore-to-toronto"
  origin: { name: string; country: string; countryFlag: string };
  destination: { name: string; province: string };
  flightHours: string;
  diasporaSize: string;
  topIndustries: string[];
  programs: MovePathwayProgram["slug"][];
  costInrLakhs?: string;
  costCadRange?: string;
  timelineMonths: string;
}

export const MOVE_CORRIDORS: MoveCorridor[] = [
  // --- India → Canada ---
  {
    slug: "bangalore-to-toronto",
    origin: { name: "Bangalore", country: "India", countryFlag: "🇮🇳" },
    destination: { name: "Toronto", province: "Ontario" },
    flightHours: "16–18 hrs (1 stop via DXB / DOH)",
    diasporaSize: "~700,000 South Asians in the GTA",
    topIndustries: ["Software / SaaS", "Fintech", "AI / ML", "Cloud infra"],
    programs: ["express-entry", "pnp", "study-permit"],
    costInrLakhs: "8–12L (PR) · 25–35L (study)",
    costCadRange: "CAD 3,200–4,800 PR fees",
    timelineMonths: "6–14 months",
  },
  {
    slug: "mumbai-to-toronto",
    origin: { name: "Mumbai", country: "India", countryFlag: "🇮🇳" },
    destination: { name: "Toronto", province: "Ontario" },
    flightHours: "15–17 hrs (1 stop)",
    diasporaSize: "~700,000 South Asians in the GTA",
    topIndustries: ["Banking / BFSI", "Consulting", "Media", "Pharma"],
    programs: ["express-entry", "pnp", "work-permit"],
    costInrLakhs: "8–12L (PR)",
    costCadRange: "CAD 3,200–4,800 PR fees",
    timelineMonths: "6–14 months",
  },
  {
    slug: "delhi-to-toronto",
    origin: { name: "Delhi", country: "India", countryFlag: "🇮🇳" },
    destination: { name: "Toronto", province: "Ontario" },
    flightHours: "14–16 hrs (direct on AC / AI)",
    diasporaSize: "~700,000 South Asians in the GTA",
    topIndustries: ["Government / policy", "Consulting", "IT services", "Healthcare"],
    programs: ["express-entry", "pnp", "study-permit"],
    costInrLakhs: "8–12L (PR)",
    costCadRange: "CAD 3,200–4,800 PR fees",
    timelineMonths: "6–14 months",
  },
  {
    slug: "hyderabad-to-toronto",
    origin: { name: "Hyderabad", country: "India", countryFlag: "🇮🇳" },
    destination: { name: "Toronto", province: "Ontario" },
    flightHours: "16–18 hrs (1 stop)",
    diasporaSize: "~700,000 South Asians in the GTA",
    topIndustries: ["Microsoft / Google / Amazon hub", "Pharma / biotech", "GCC tech"],
    programs: ["express-entry", "pnp", "work-permit"],
    timelineMonths: "6–14 months",
  },
  {
    slug: "bangalore-to-vancouver",
    origin: { name: "Bangalore", country: "India", countryFlag: "🇮🇳" },
    destination: { name: "Vancouver", province: "British Columbia" },
    flightHours: "18–22 hrs (1 stop via NRT / ICN / SFO)",
    diasporaSize: "~310,000 South Asians in Metro Vancouver",
    topIndustries: ["Tech (BC PNP Tech)", "Gaming", "Film / VFX", "Clean tech"],
    programs: ["express-entry", "pnp", "work-permit"],
    timelineMonths: "5–12 months (BC PNP Tech is fast)",
  },
  {
    slug: "hyderabad-to-vancouver",
    origin: { name: "Hyderabad", country: "India", countryFlag: "🇮🇳" },
    destination: { name: "Vancouver", province: "British Columbia" },
    flightHours: "18–22 hrs (1 stop)",
    diasporaSize: "~310,000 South Asians in Metro Vancouver",
    topIndustries: ["Tech / SaaS", "Pharma R&D", "Cloud"],
    programs: ["express-entry", "pnp"],
    timelineMonths: "5–12 months",
  },
  {
    slug: "delhi-to-calgary",
    origin: { name: "Delhi", country: "India", countryFlag: "🇮🇳" },
    destination: { name: "Calgary", province: "Alberta" },
    flightHours: "16–18 hrs (1 stop via LHR / FRA)",
    diasporaSize: "~90,000 South Asians in Calgary",
    topIndustries: ["Energy / oil & gas", "Engineering", "Logistics"],
    programs: ["express-entry", "pnp", "work-permit"],
    timelineMonths: "6–12 months (Alberta AAIP is steady)",
  },
  {
    slug: "chennai-to-toronto",
    origin: { name: "Chennai", country: "India", countryFlag: "🇮🇳" },
    destination: { name: "Toronto", province: "Ontario" },
    flightHours: "17–19 hrs (1 stop)",
    diasporaSize: "~700,000 South Asians in the GTA",
    topIndustries: ["IT services", "Auto / manufacturing", "Healthcare"],
    programs: ["express-entry", "pnp", "study-permit"],
    timelineMonths: "6–14 months",
  },
  {
    slug: "pune-to-toronto",
    origin: { name: "Pune", country: "India", countryFlag: "🇮🇳" },
    destination: { name: "Toronto", province: "Ontario" },
    flightHours: "17–19 hrs (1 stop)",
    diasporaSize: "~700,000 South Asians in the GTA",
    topIndustries: ["IT / SaaS", "Auto engineering", "Education"],
    programs: ["express-entry", "pnp", "study-permit"],
    timelineMonths: "6–14 months",
  },
  // --- USA → Canada (H-1B / green-card backlog escapees) ---
  {
    slug: "san-francisco-to-toronto",
    origin: { name: "San Francisco", country: "USA", countryFlag: "🇺🇸" },
    destination: { name: "Toronto", province: "Ontario" },
    flightHours: "5.5 hrs direct",
    diasporaSize: "Large H-1B / Indian-origin tech community",
    topIndustries: ["Big Tech", "AI startups", "Fintech"],
    programs: ["express-entry", "pnp", "work-permit"],
    timelineMonths: "3–9 months (GTS is 2 weeks)",
  },
  {
    slug: "seattle-to-vancouver",
    origin: { name: "Seattle", country: "USA", countryFlag: "🇺🇸" },
    destination: { name: "Vancouver", province: "British Columbia" },
    flightHours: "1 hr direct (or 2.5 hr drive)",
    diasporaSize: "Heavy MSFT / AMZN cross-border presence",
    topIndustries: ["Cloud", "Gaming", "AI", "E-commerce"],
    programs: ["express-entry", "pnp", "work-permit"],
    timelineMonths: "2–8 months (BC PNP Tech)",
  },
  {
    slug: "new-york-to-toronto",
    origin: { name: "New York", country: "USA", countryFlag: "🇺🇸" },
    destination: { name: "Toronto", province: "Ontario" },
    flightHours: "1.5 hrs direct",
    diasporaSize: "Large Indian / global diaspora overlap",
    topIndustries: ["Finance", "Media", "Consulting", "Tech"],
    programs: ["express-entry", "pnp", "work-permit"],
    timelineMonths: "3–10 months",
  },
  // --- UK → Canada ---
  {
    slug: "london-to-toronto",
    origin: { name: "London", country: "UK", countryFlag: "🇬🇧" },
    destination: { name: "Toronto", province: "Ontario" },
    flightHours: "7.5 hrs direct",
    diasporaSize: "Strong British / Commonwealth ties",
    topIndustries: ["Finance / banking", "Consulting", "Media", "Tech"],
    programs: ["express-entry", "pnp"],
    timelineMonths: "6–12 months",
  },
  // --- Australia → Canada ---
  {
    slug: "sydney-to-vancouver",
    origin: { name: "Sydney", country: "Australia", countryFlag: "🇦🇺" },
    destination: { name: "Vancouver", province: "British Columbia" },
    flightHours: "15 hrs direct",
    diasporaSize: "Growing Aus → Canada professional movement",
    topIndustries: ["Mining / resources", "Tech", "Finance", "Healthcare"],
    programs: ["express-entry", "pnp"],
    timelineMonths: "6–12 months",
  }
];

export function getMoveCorridor(slug?: string) {
  if (!slug) return undefined;
  return MOVE_CORRIDORS.find((c) => c.slug === slug);
}

export function getMoveProgram(slug?: string) {
  if (!slug) return undefined;
  return MOVE_PROGRAMS[slug as MovePathwayProgram["slug"]];
}

export function listMoveCorridorProgramPairs() {
  const out: { corridor: string; program: string }[] = [];
  for (const c of MOVE_CORRIDORS) {
    for (const p of c.programs) out.push({ corridor: c.slug, program: p });
  }
  return out;
}
