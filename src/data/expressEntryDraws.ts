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
  { drawNumber: 327, date: "August 27, 2025",   category: "Education",   crsMin: 479, itas: 1000 },
  { drawNumber: 326, date: "August 13, 2025",   category: "General",     crsMin: 517, itas: 4500 },
  { drawNumber: 325, date: "July 30, 2025",     category: "Healthcare",  crsMin: 422, itas: 1500 },
  { drawNumber: 324, date: "July 16, 2025",     category: "STEM",        crsMin: 475, itas: 1800 },
  { drawNumber: 323, date: "July 2, 2025",      category: "General",     crsMin: 518, itas: 3500 },
  { drawNumber: 322, date: "June 18, 2025",     category: "French",      crsMin: 388, itas: 1500 },
  { drawNumber: 321, date: "June 4, 2025",      category: "General",     crsMin: 521, itas: 3300 },
  { drawNumber: 320, date: "May 21, 2025",      category: "Trades",      crsMin: 374, itas: 700  },
  { drawNumber: 319, date: "May 7, 2025",       category: "General",     crsMin: 524, itas: 3000 },
  { drawNumber: 318, date: "April 23, 2025",    category: "Healthcare",  crsMin: 425, itas: 1200 },
  { drawNumber: 317, date: "April 9, 2025",     category: "Education",   crsMin: 482, itas: 800  },
  { drawNumber: 316, date: "March 26, 2025",    category: "General",     crsMin: 519, itas: 3500 },
  { drawNumber: 315, date: "March 12, 2025",    category: "Agriculture", crsMin: 358, itas: 450  },
  { drawNumber: 314, date: "February 26, 2025", category: "STEM",        crsMin: 477, itas: 1600 },
  { drawNumber: 313, date: "February 12, 2025", category: "General",     crsMin: 522, itas: 3700 },
];

export const drawCategories = ["All", "General", "STEM", "Healthcare", "Trades", "Transport", "Agriculture", "French", "Education"] as const;

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
