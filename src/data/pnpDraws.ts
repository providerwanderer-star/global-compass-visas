// Manually maintained provincial draw snapshots. Update from official provincial sources.
export interface PNPSnapshot {
  province: string;
  code: string;
  flag: string;
  program: string;
  latestDate: string; // ISO
  latestStream: string;
  invitations: number;
  scoreCutoff: string; // string because some streams use non-CRS scores
  officialUrl: string;
}

export const pnpSnapshots: PNPSnapshot[] = [
  {
    province: "Ontario",
    code: "ON",
    flag: "🍁",
    program: "OINP — Ontario Immigrant Nominee Program",
    latestDate: "2026-04-08",
    latestStream: "Human Capital Priorities (Tech)",
    invitations: 1872,
    scoreCutoff: "CRS 462+",
    officialUrl: "https://www.ontario.ca/page/oinp-2026-invitations-issued",
  },
  {
    province: "British Columbia",
    code: "BC",
    flag: "🌲",
    program: "BC PNP — Skills Immigration",
    latestDate: "2026-04-09",
    latestStream: "Healthcare Professional",
    invitations: 89,
    scoreCutoff: "SIRS 110+",
    officialUrl: "https://www.welcomebc.ca/immigrate-to-b-c/about-the-bc-pnp/invitations-to-apply",
  },
  {
    province: "Alberta",
    code: "AB",
    flag: "🏔️",
    program: "AAIP — Alberta Advantage Immigration Program",
    latestDate: "2026-04-02",
    latestStream: "Alberta Express Entry stream",
    invitations: 250,
    scoreCutoff: "CRS 300+",
    officialUrl: "https://www.alberta.ca/aaip-alberta-express-entry-stream-notifications-of-interest",
  },
  {
    province: "Saskatchewan",
    code: "SK",
    flag: "🌾",
    program: "SINP — Saskatchewan Immigrant Nominee Program",
    latestDate: "2026-03-27",
    latestStream: "Express Entry & Occupations In-Demand",
    invitations: 312,
    scoreCutoff: "SINP 68+",
    officialUrl: "https://www.saskatchewan.ca/residents/moving-to-saskatchewan/live-in-saskatchewan/by-immigrating/saskatchewan-immigrant-nominee-program/results-of-expression-of-interest-eoi-draws",
  },
  {
    province: "Manitoba",
    code: "MB",
    flag: "🐃",
    program: "MPNP — Manitoba Provincial Nominee Program",
    latestDate: "2026-04-03",
    latestStream: "Skilled Workers Overseas",
    invitations: 422,
    scoreCutoff: "MPNP 707+",
    officialUrl: "https://www.immigratemanitoba.com/notices/eoi-draw/",
  },
  {
    province: "Nova Scotia",
    code: "NS",
    flag: "🌊",
    program: "NSNP — Nova Scotia Nominee Program",
    latestDate: "2026-03-25",
    latestStream: "Labour Market Priorities (Healthcare)",
    invitations: 124,
    scoreCutoff: "CRS 348+",
    officialUrl: "https://novascotiaimmigration.com/move-here/labour-market-priorities/",
  },
  {
    province: "New Brunswick",
    code: "NB",
    flag: "🦞",
    program: "NBPNP — New Brunswick Provincial Nominee Program",
    latestDate: "2026-03-20",
    latestStream: "Strategic Initiative Stream (French)",
    invitations: 78,
    scoreCutoff: "Profile-based",
    officialUrl: "https://www.welcomenb.ca/content/wel-bien/en/immigrating_and_settling/come/EconomicImmigration.html",
  },
  {
    province: "PEI",
    code: "PE",
    flag: "🏝️",
    program: "PEI PNP",
    latestDate: "2026-04-10",
    latestStream: "Labour & Express Entry",
    invitations: 187,
    scoreCutoff: "EOI score-based",
    officialUrl: "https://www.princeedwardisland.ca/en/information/office-of-immigration/expression-of-interest-draws",
  },
];

export const pnpLastUpdated = "2026-04-15";
