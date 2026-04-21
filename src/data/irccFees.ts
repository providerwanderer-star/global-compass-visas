/**
 * Current IRCC government fees in CAD.
 * Source: IRCC official fee list. Update quarterly.
 */
export interface IrccFee {
  category: "PR" | "Work" | "Study" | "Visit" | "Citizenship" | "Biometrics" | "Other";
  name: string;
  fee: number; // CAD
  notes?: string;
}

export const irccFeesUpdated = "2026-04-21";

export const irccFees: IrccFee[] = [
  // PR
  { category: "PR", name: "Express Entry / PNP — principal applicant (processing + RPRF)", fee: 1525, notes: "Processing $625 + Right of PR Fee $575 + biometrics ($85)*" },
  { category: "PR", name: "Express Entry / PNP — spouse / partner (processing + RPRF)", fee: 1525, notes: "Add separately when included" },
  { category: "PR", name: "Express Entry / PNP — dependent child", fee: 260 },
  { category: "PR", name: "Spousal sponsorship (sponsor + sponsored adult, incl. RPRF)", fee: 1205, notes: "Sponsorship $85 + Principal $570 + RPRF $575 (-$85 if biometrics already paid)" },
  { category: "PR", name: "Parent / Grandparent sponsorship", fee: 1205, notes: "Per parent application (incl. RPRF)" },
  { category: "PR", name: "Atlantic Immigration / Caregiver / Rural pilots — principal", fee: 1525, notes: "Same fee structure as EE/PNP" },

  // Work
  { category: "Work", name: "Work permit — single applicant", fee: 155 },
  { category: "Work", name: "Open work permit holder fee (in addition to WP)", fee: 100 },
  { category: "Work", name: "Work permit extension", fee: 155 },
  { category: "Work", name: "Post-Graduation Work Permit (PGWP)", fee: 255, notes: "$155 work permit + $100 open work permit holder fee" },
  { category: "Work", name: "LMIA — high-wage / low-wage stream", fee: 1000, notes: "Paid by employer per position" },

  // Study
  { category: "Study", name: "Study permit (initial or extension)", fee: 150 },
  { category: "Study", name: "Restoration of student status", fee: 379, notes: "$200 restoration + $150 study permit + $29.20 visitor record" },

  // Visit
  { category: "Visit", name: "Visitor visa (TRV) — single or multiple entry", fee: 100 },
  { category: "Visit", name: "Super Visa (parent / grandparent multi-entry)", fee: 100 },
  { category: "Visit", name: "eTA — Electronic Travel Authorization", fee: 7 },
  { category: "Visit", name: "Visitor record / extension (in Canada)", fee: 100 },

  // Biometrics
  { category: "Biometrics", name: "Biometrics — per person", fee: 85 },
  { category: "Biometrics", name: "Biometrics — family (2+ together)", fee: 170 },
  { category: "Biometrics", name: "Biometrics — group of 3+ performers", fee: 255 },

  // Citizenship
  { category: "Citizenship", name: "Citizenship — adult (processing + Right of Citizenship)", fee: 630 },
  { category: "Citizenship", name: "Citizenship — minor", fee: 100 },
  { category: "Citizenship", name: "Citizenship certificate (proof of citizenship)", fee: 75 },

  // Other
  { category: "Other", name: "Permanent Resident Card — first / replacement", fee: 50 },
  { category: "Other", name: "PR Travel Document (PRTD)", fee: 50 },
  { category: "Other", name: "Authorization to Return to Canada (ARC)", fee: 400 },
];

export const categoryLabels: Record<IrccFee["category"], string> = {
  PR: "Permanent Residence",
  Work: "Work Permits",
  Study: "Study Permits",
  Visit: "Visitor / TRV / eTA",
  Citizenship: "Citizenship",
  Biometrics: "Biometrics",
  Other: "PR Card & Other",
};
