export interface DrawRecord {
  drawNumber: number;
  date: string;
  category:
    | "General"
    | "CEC"
    | "PNP"
    | "STEM"
    | "Healthcare"
    | "Trades"
    | "Transport"
    | "Agriculture"
    | "French"
    | "Education"
    | "SeniorMgmt"
    | "Physicians";
  crsMin: number;
  itas: number;
  tieBreak?: string; // ISO date string
}

// Source: IRCC official rounds-of-invitations table
// https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html
// Verified April 22, 2026 — sorted newest first
export const expressEntryDraws: DrawRecord[] = [
  { drawNumber: 411, date: "April 15, 2026",    category: "French",      crsMin: 419, itas: 4000 },
  { drawNumber: 410, date: "April 14, 2026",    category: "CEC",         crsMin: 515, itas: 2000 },
  { drawNumber: 409, date: "April 13, 2026",    category: "PNP",         crsMin: 786, itas: 324  },
  { drawNumber: 408, date: "April 2, 2026",     category: "Trades",      crsMin: 477, itas: 3000 },
  { drawNumber: 407, date: "March 31, 2026",    category: "CEC",         crsMin: 509, itas: 2250 },
  { drawNumber: 406, date: "March 30, 2026",    category: "PNP",         crsMin: 802, itas: 356  },
  { drawNumber: 405, date: "March 18, 2026",    category: "French",      crsMin: 393, itas: 4000 },
  { drawNumber: 404, date: "March 17, 2026",    category: "CEC",         crsMin: 507, itas: 4000 },
  { drawNumber: 403, date: "March 16, 2026",    category: "PNP",         crsMin: 742, itas: 362  },
  { drawNumber: 402, date: "March 5, 2026",     category: "SeniorMgmt",  crsMin: 429, itas: 250  },
  { drawNumber: 401, date: "March 4, 2026",     category: "French",      crsMin: 397, itas: 5500 },
  { drawNumber: 400, date: "March 3, 2026",     category: "CEC",         crsMin: 508, itas: 4000 },
  { drawNumber: 399, date: "March 2, 2026",     category: "PNP",         crsMin: 710, itas: 264  },
  { drawNumber: 398, date: "February 20, 2026", category: "Healthcare",  crsMin: 467, itas: 4000 },
  { drawNumber: 397, date: "February 19, 2026", category: "Physicians",  crsMin: 169, itas: 391  },
  { drawNumber: 396, date: "February 17, 2026", category: "CEC",         crsMin: 508, itas: 6000 },
  { drawNumber: 395, date: "February 16, 2026", category: "PNP",         crsMin: 789, itas: 279  },
  { drawNumber: 394, date: "February 6, 2026",  category: "French",      crsMin: 400, itas: 8500 },
  { drawNumber: 393, date: "February 3, 2026",  category: "PNP",         crsMin: 749, itas: 423  },
  { drawNumber: 392, date: "January 21, 2026",  category: "CEC",         crsMin: 509, itas: 6000 },
  { drawNumber: 391, date: "January 20, 2026",  category: "PNP",         crsMin: 746, itas: 681  },
  { drawNumber: 390, date: "January 7, 2026",   category: "CEC",         crsMin: 511, itas: 8000 },
  { drawNumber: 389, date: "January 5, 2026",   category: "PNP",         crsMin: 711, itas: 574  },
  { drawNumber: 388, date: "December 17, 2025", category: "French",      crsMin: 399, itas: 6000 },
  { drawNumber: 387, date: "December 16, 2025", category: "CEC",         crsMin: 515, itas: 5000 },
];

export const drawCategories = [
  "All",
  "General",
  "CEC",
  "PNP",
  "STEM",
  "Healthcare",
  "Trades",
  "Transport",
  "Agriculture",
  "French",
  "Education",
  "SeniorMgmt",
  "Physicians",
] as const;

/** Returns the most recent draw for a given category */
export function latestByCat(cat: DrawRecord["category"]): DrawRecord | undefined {
  return expressEntryDraws.find((d) => d.category === cat);
}

/** Average CRS for a category over all available draws */
export function avgCRS(cat: DrawRecord["category"] | "General"): number {
  const filtered = expressEntryDraws.filter((d) => d.category === cat);
  if (!filtered.length) return 0;
  return Math.round(filtered.reduce((sum, d) => sum + d.crsMin, 0) / filtered.length);
}
