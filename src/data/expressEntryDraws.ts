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
];

export const drawsLastUpdated = "2026-04-15";
