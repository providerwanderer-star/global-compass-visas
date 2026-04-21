export interface PNPDraw {
  province: string;
  provinceCode: string;
  stream: string;
  date: string;
  minScore?: number; // Some PNPs don't publish scores
  invitations: number;
  officialUrl: string;
  notes?: string;
}

export const pnpDraws: PNPDraw[] = [
  // ── ONTARIO (OINP) ───────────────────────────────────────────────────────
  {
    province: "Ontario",
    provinceCode: "ON",
    stream: "Human Capital Priorities",
    date: "April 10, 2026",
    minScore: 461,
    invitations: 591,
    officialUrl: "https://www.ontario.ca/page/ontario-immigrant-nominee-program-oinp",
  },
  {
    province: "Ontario",
    provinceCode: "ON",
    stream: "French-Speaking Skilled Worker",
    date: "March 18, 2026",
    minScore: 356,
    invitations: 100,
    officialUrl: "https://www.ontario.ca/page/ontario-immigrant-nominee-program-oinp",
  },
  {
    province: "Ontario",
    provinceCode: "ON",
    stream: "Skilled Trades",
    date: "February 12, 2026",
    minScore: undefined,
    invitations: 200,
    officialUrl: "https://www.ontario.ca/page/ontario-immigrant-nominee-program-oinp",
    notes: "Score not published for Skilled Trades stream",
  },

  // ── BRITISH COLUMBIA (BC PNP) ────────────────────────────────────────────
  {
    province: "British Columbia",
    provinceCode: "BC",
    stream: "Skills Immigration — Technology",
    date: "April 8, 2026",
    minScore: 100,
    invitations: 250,
    officialUrl: "https://www.welcomebc.ca/Immigrate-to-B-C/B-C-Provincial-Nominee-Program",
    notes: "BC PNP uses its own points system (max 200), not CRS",
  },
  {
    province: "British Columbia",
    provinceCode: "BC",
    stream: "Skills Immigration — Health Authority",
    date: "March 25, 2026",
    minScore: 90,
    invitations: 120,
    officialUrl: "https://www.welcomebc.ca/Immigrate-to-B-C/B-C-Provincial-Nominee-Program",
    notes: "BC PNP uses its own points system (max 200), not CRS",
  },

  // ── ALBERTA (AINP) ───────────────────────────────────────────────────────
  {
    province: "Alberta",
    provinceCode: "AB",
    stream: "Express Entry — Accelerated Tech Pathway",
    date: "April 3, 2026",
    minScore: 300,
    invitations: 300,
    officialUrl: "https://www.alberta.ca/alberta-immigrant-nominee-program.aspx",
    notes: "Uses CRS score for Express Entry stream",
  },
  {
    province: "Alberta",
    provinceCode: "AB",
    stream: "Opportunity Stream",
    date: "March 6, 2026",
    minScore: undefined,
    invitations: 500,
    officialUrl: "https://www.alberta.ca/alberta-immigrant-nominee-program.aspx",
    notes: "Job offer required; no score cutoff published",
  },

  // ── SASKATCHEWAN (SINP) ──────────────────────────────────────────────────
  {
    province: "Saskatchewan",
    provinceCode: "SK",
    stream: "Express Entry",
    date: "April 1, 2026",
    minScore: 60,
    invitations: 175,
    officialUrl: "https://www.saskatchewan.ca/residents/moving-to-saskatchewan/live-in-saskatchewan/by-immigrating/saskatchewan-immigrant-nominee-program",
    notes: "SINP uses its own EOI points (max 100), not CRS",
  },
  {
    province: "Saskatchewan",
    provinceCode: "SK",
    stream: "Agriculture",
    date: "February 20, 2026",
    minScore: undefined,
    invitations: 80,
    officialUrl: "https://www.saskatchewan.ca/residents/moving-to-saskatchewan/live-in-saskatchewan/by-immigrating/saskatchewan-immigrant-nominee-program",
  },

  // ── MANITOBA (MPNP) ──────────────────────────────────────────────────────
  {
    province: "Manitoba",
    provinceCode: "MB",
    stream: "Skilled Workers in Manitoba",
    date: "March 28, 2026",
    minScore: 711,
    invitations: 295,
    officialUrl: "https://immigratemanitoba.com/",
    notes: "Manitoba uses LAA score (max 1000)",
  },
  {
    province: "Manitoba",
    provinceCode: "MB",
    stream: "International Education Stream",
    date: "February 7, 2026",
    minScore: undefined,
    invitations: 100,
    officialUrl: "https://immigratemanitoba.com/",
    notes: "Manitoba graduates; no score cutoff",
  },

  // ── NOVA SCOTIA (NSNP) ───────────────────────────────────────────────────
  {
    province: "Nova Scotia",
    provinceCode: "NS",
    stream: "Labour Market Priorities — Healthcare",
    date: "March 15, 2026",
    minScore: 67,
    invitations: 50,
    officialUrl: "https://novascotiaimmigration.com/move-here/nova-scotia-nominee-program/",
    notes: "NSNP score (max 100)",
  },

  // ── PRINCE EDWARD ISLAND (PEI PNP) ──────────────────────────────────────
  {
    province: "Prince Edward Island",
    provinceCode: "PE",
    stream: "Labour Impact Category",
    date: "February 28, 2026",
    minScore: 50,
    invitations: 70,
    officialUrl: "https://www.princeedwardisland.ca/en/topic/pei-pnp",
    notes: "PEI uses its own points system",
  },

  // ── NEW BRUNSWICK (NBPNP) ────────────────────────────────────────────────
  {
    province: "New Brunswick",
    provinceCode: "NB",
    stream: "Express Entry Stream",
    date: "January 30, 2026",
    minScore: 67,
    invitations: 80,
    officialUrl: "https://www.welcomenb.ca/content/wel-bien/en/immigrating_to_new_brunswick/how_to_move_to_newbrunswick/nb-pnp.html",
  },
];

export const pnpProvinces = ["All", ...Array.from(new Set(pnpDraws.map((d) => d.province)))] as const;
