// Curated list of in-demand NOC 2021 codes for Canada Express Entry.
// Source: ESDC NOC 2021 v1.0 (https://noc.esdc.gc.ca)
export interface NOCEntry {
  code: string;
  title: string;
  teer: 0 | 1 | 2 | 3 | 4 | 5;
  category: "Tech" | "Healthcare" | "Trades" | "Business" | "Transport" | "Agriculture" | "Education" | "Other";
  eeEligible: boolean;
  notes?: string;
}

export const nocList: NOCEntry[] = [
  // Tech
  { code: "21211", title: "Data scientists", teer: 1, category: "Tech", eeEligible: true, notes: "Eligible for STEM category-based draws" },
  { code: "21220", title: "Cybersecurity specialists", teer: 1, category: "Tech", eeEligible: true, notes: "STEM category eligible" },
  { code: "21221", title: "Business systems specialists", teer: 1, category: "Tech", eeEligible: true },
  { code: "21222", title: "Information systems specialists", teer: 1, category: "Tech", eeEligible: true },
  { code: "21223", title: "Database analysts and data administrators", teer: 1, category: "Tech", eeEligible: true, notes: "STEM category eligible" },
  { code: "21230", title: "Computer systems developers and programmers", teer: 1, category: "Tech", eeEligible: true },
  { code: "21231", title: "Software engineers and designers", teer: 1, category: "Tech", eeEligible: true, notes: "STEM category eligible" },
  { code: "21232", title: "Software developers and programmers", teer: 1, category: "Tech", eeEligible: true, notes: "STEM category eligible" },
  { code: "21233", title: "Web designers", teer: 1, category: "Tech", eeEligible: true },
  { code: "21234", title: "Web developers and programmers", teer: 2, category: "Tech", eeEligible: true },
  { code: "21311", title: "Computer engineers", teer: 1, category: "Tech", eeEligible: true, notes: "STEM category eligible" },
  // Healthcare
  { code: "30010", title: "Managers in health care", teer: 0, category: "Healthcare", eeEligible: true },
  { code: "31100", title: "Specialists in clinical and laboratory medicine", teer: 1, category: "Healthcare", eeEligible: true, notes: "Healthcare category eligible" },
  { code: "31102", title: "General practitioners and family physicians", teer: 1, category: "Healthcare", eeEligible: true, notes: "Healthcare category eligible" },
  { code: "31300", title: "Nursing coordinators and supervisors", teer: 1, category: "Healthcare", eeEligible: true, notes: "Healthcare category eligible" },
  { code: "31301", title: "Registered nurses and registered psychiatric nurses", teer: 1, category: "Healthcare", eeEligible: true, notes: "Healthcare category eligible" },
  { code: "31302", title: "Nurse practitioners", teer: 1, category: "Healthcare", eeEligible: true, notes: "Healthcare category eligible" },
  { code: "32101", title: "Licensed practical nurses", teer: 2, category: "Healthcare", eeEligible: true, notes: "Healthcare category eligible" },
  { code: "33102", title: "Nurse aides, orderlies and patient service associates", teer: 3, category: "Healthcare", eeEligible: true },
  { code: "32102", title: "Paramedical occupations", teer: 2, category: "Healthcare", eeEligible: true },
  // Trades
  { code: "72010", title: "Contractors and supervisors, construction trades", teer: 1, category: "Trades", eeEligible: true, notes: "Trades category eligible" },
  { code: "72200", title: "Electricians (except industrial and power system)", teer: 2, category: "Trades", eeEligible: true, notes: "Trades category eligible" },
  { code: "72300", title: "Plumbers", teer: 2, category: "Trades", eeEligible: true, notes: "Trades category eligible" },
  { code: "72310", title: "Carpenters", teer: 2, category: "Trades", eeEligible: true, notes: "Trades category eligible" },
  { code: "72400", title: "Construction millwrights and industrial mechanics", teer: 2, category: "Trades", eeEligible: true, notes: "Trades category eligible" },
  { code: "72500", title: "Crane operators", teer: 2, category: "Trades", eeEligible: true, notes: "Trades category eligible" },
  { code: "73300", title: "Heavy equipment operators", teer: 3, category: "Trades", eeEligible: true, notes: "Trades category eligible" },
  // Transport
  { code: "73300_truck", title: "Transport truck drivers", teer: 3, category: "Transport", eeEligible: true, notes: "Transport category eligible (NOC 73300 subset)" },
  { code: "72602", title: "Aircraft pilots", teer: 2, category: "Transport", eeEligible: true },
  { code: "72604", title: "Air traffic controllers", teer: 2, category: "Transport", eeEligible: true },
  // Agriculture
  { code: "82030", title: "Agricultural service contractors and farm supervisors", teer: 2, category: "Agriculture", eeEligible: true, notes: "Agriculture category eligible" },
  { code: "63201", title: "Butchers — retail and wholesale", teer: 3, category: "Agriculture", eeEligible: true, notes: "Agriculture category eligible" },
  // Business
  { code: "10010", title: "Financial managers", teer: 0, category: "Business", eeEligible: true, notes: "TEER 00 — +200 points with job offer" },
  { code: "11100", title: "Financial auditors and accountants", teer: 1, category: "Business", eeEligible: true },
  { code: "11200", title: "Human resources professionals", teer: 1, category: "Business", eeEligible: true },
  { code: "12200", title: "Accounting technicians and bookkeepers", teer: 2, category: "Business", eeEligible: true },
  // Education
  { code: "41220", title: "Elementary school teachers", teer: 1, category: "Education", eeEligible: true, notes: "Education category eligible (2025+)" },
  { code: "41221", title: "Secondary school teachers", teer: 1, category: "Education", eeEligible: true, notes: "Education category eligible (2025+)" },
  { code: "42202", title: "Early childhood educators and assistants", teer: 4, category: "Education", eeEligible: true, notes: "High PNP demand" },
];

export const nocLastUpdated = "2026-04-15";
