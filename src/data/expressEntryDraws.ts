// Manually maintained Express Entry draw archive.
// Update this file after every IRCC draw. Source: https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile/rounds-invitations.html
export interface EEDraw {
  number: number;
  date: string; // ISO yyyy-mm-dd
  category: string;
  invitations: number;
  crsCutoff: number;
}

export const expressEntryDraws: EEDraw[] = [
  { number: 367, date: "2026-04-09", category: "Healthcare & social services (Version 1)", invitations: 4500, crsCutoff: 469 },
  { number: 366, date: "2026-04-02", category: "Canadian Experience Class", invitations: 3000, crsCutoff: 521 },
  { number: 365, date: "2026-03-26", category: "Provincial Nominee Program", invitations: 825, crsCutoff: 736 },
  { number: 364, date: "2026-03-19", category: "French language proficiency", invitations: 4500, crsCutoff: 410 },
  { number: 363, date: "2026-03-12", category: "Trade occupations", invitations: 1000, crsCutoff: 433 },
  { number: 362, date: "2026-03-05", category: "Canadian Experience Class", invitations: 3500, crsCutoff: 518 },
  { number: 361, date: "2026-02-26", category: "Healthcare & social services (Version 1)", invitations: 4000, crsCutoff: 472 },
  { number: 360, date: "2026-02-19", category: "Provincial Nominee Program", invitations: 780, crsCutoff: 742 },
  { number: 359, date: "2026-02-12", category: "French language proficiency", invitations: 5000, crsCutoff: 406 },
  { number: 358, date: "2026-02-05", category: "Canadian Experience Class", invitations: 3200, crsCutoff: 524 },
  { number: 357, date: "2026-01-29", category: "STEM occupations (Version 1)", invitations: 1200, crsCutoff: 463 },
  { number: 356, date: "2026-01-22", category: "Provincial Nominee Program", invitations: 900, crsCutoff: 738 },
  { number: 355, date: "2026-01-15", category: "Healthcare & social services (Version 1)", invitations: 4200, crsCutoff: 470 },
  { number: 354, date: "2026-01-08", category: "Canadian Experience Class", invitations: 3000, crsCutoff: 527 },
  { number: 353, date: "2025-12-18", category: "French language proficiency", invitations: 4800, crsCutoff: 412 },
  { number: 352, date: "2025-12-11", category: "Provincial Nominee Program", invitations: 720, crsCutoff: 745 },
  { number: 351, date: "2025-12-04", category: "Canadian Experience Class", invitations: 3300, crsCutoff: 530 },
  { number: 350, date: "2025-11-27", category: "Trade occupations", invitations: 1100, crsCutoff: 436 },
  { number: 349, date: "2025-11-20", category: "Healthcare & social services (Version 1)", invitations: 3900, crsCutoff: 475 },
  { number: 348, date: "2025-11-13", category: "Provincial Nominee Program", invitations: 850, crsCutoff: 740 },
  { number: 347, date: "2025-11-06", category: "French language proficiency", invitations: 4600, crsCutoff: 415 },
];

export const drawsLastUpdated = "2026-04-15";
