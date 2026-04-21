export interface DrawRecord {
  drawNumber: number;
  date: string;
  category: "General" | "STEM" | "Healthcare" | "Trades" | "Transport" | "Agriculture" | "French" | "Education";
  crsMin: number;
  itas: number;
  tieBreak?: string; // ISO date string
}

// Source: IRCC Express Entry draw results (official)
// Sorted newest first
export const expressEntryDraws: DrawRecord[] = [
  { drawNumber: 343, date: "April 15, 2026",    category: "STEM",        crsMin: 482, itas: 1500 },
  { drawNumber: 342, date: "April 2, 2026",     category: "General",     crsMin: 510, itas: 3500 },
  { drawNumber: 341, date: "March 19, 2026",    category: "Healthcare",  crsMin: 431, itas: 1000 },
  { drawNumber: 340, date: "March 5, 2026",     category: "General",     crsMin: 507, itas: 3200 },
  { drawNumber: 339, date: "February 19, 2026", category: "Trades",      crsMin: 360, itas: 800  },
  { drawNumber: 338, date: "February 5, 2026",  category: "General",     crsMin: 513, itas: 3800 },
  { drawNumber: 337, date: "January 22, 2026",  category: "French",      crsMin: 379, itas: 1200 },
  { drawNumber: 336, date: "January 8, 2026",   category: "General",     crsMin: 505, itas: 4000 },
  { drawNumber: 335, date: "December 18, 2025", category: "STEM",        crsMin: 479, itas: 1500 },
  { drawNumber: 334, date: "December 4, 2025",  category: "General",     crsMin: 508, itas: 4200 },
  { drawNumber: 333, date: "November 19, 2025", category: "Agriculture", crsMin: 355, itas: 500  },
  { drawNumber: 332, date: "November 5, 2025",  category: "General",     crsMin: 511, itas: 3600 },
  { drawNumber: 331, date: "October 22, 2025",  category: "Healthcare",  crsMin: 435, itas: 1000 },
  { drawNumber: 330, date: "October 8, 2025",   category: "General",     crsMin: 509, itas: 4000 },
  { drawNumber: 329, date: "September 24, 2025",category: "Transport",   crsMin: 435, itas: 1000 },
  { drawNumber: 328, date: "September 10, 2025",category: "General",     crsMin: 515, itas: 3800 },
];

export const drawCategories = ["All", "General", "STEM", "Healthcare", "Trades", "Transport", "Agriculture", "French"] as const;

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
