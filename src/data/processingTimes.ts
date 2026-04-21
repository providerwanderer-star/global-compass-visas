// Manually mirrored from IRCC processing time tool. Update weekly.
// Source: https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html
export interface ProcessingTimeRow {
  category: string;
  program: string;
  time: string;
  note?: string;
}

export interface ProcessingGroup {
  group: string;
  icon: string;
  rows: ProcessingTimeRow[];
}

export const processingGroups: ProcessingGroup[] = [
  {
    group: "Permanent Residence",
    icon: "🏠",
    rows: [
      { category: "Express Entry — CEC", program: "Canadian Experience Class", time: "5 months" },
      { category: "Express Entry — FSW", program: "Federal Skilled Worker", time: "6 months" },
      { category: "Express Entry — FST", program: "Federal Skilled Trades", time: "6 months" },
      { category: "PNP via Express Entry", program: "Provincial Nominee", time: "11 months" },
      { category: "PNP base (paper)", program: "Provincial Nominee", time: "21 months" },
      { category: "Atlantic Immigration Program", program: "AIP", time: "11 months" },
      { category: "Quebec Skilled Worker", program: "QSW", time: "27 months" },
    ],
  },
  {
    group: "Family Sponsorship",
    icon: "👨‍👩‍👧",
    rows: [
      { category: "Spouse (in-Canada)", program: "Inland sponsorship", time: "10 months" },
      { category: "Spouse (outside Canada)", program: "Outland sponsorship", time: "13 months" },
      { category: "Dependent child", program: "Child sponsorship", time: "11 months" },
      { category: "Parents & Grandparents (PGP)", program: "PGP 2026", time: "24 months", note: "Subject to invitation lottery" },
    ],
  },
  {
    group: "Work Permits",
    icon: "💼",
    rows: [
      { category: "LMIA-based (outside Canada)", program: "Employer-specific WP", time: "9 weeks" },
      { category: "LMIA-exempt (outside Canada)", program: "IMP work permit", time: "10 weeks" },
      { category: "Open work permit (spouse)", program: "Spousal OWP", time: "8 weeks" },
      { category: "PGWP (post-graduation)", program: "Open WP for grads", time: "85 days" },
      { category: "Work permit extension (in-Canada)", program: "Renewal", time: "150 days" },
    ],
  },
  {
    group: "Study Permits",
    icon: "🎓",
    rows: [
      { category: "Study permit — outside Canada", program: "Initial study permit", time: "9 weeks", note: "PAL/TAL required since 2024" },
      { category: "Study permit — inside Canada", program: "Extension / change", time: "5 weeks" },
      { category: "Student Direct Stream (SDS)", program: "SDS — India / select countries", time: "Discontinued Nov 2024", note: "Apply via standard stream" },
    ],
  },
  {
    group: "Visitor & Super Visa",
    icon: "✈️",
    rows: [
      { category: "Visitor visa (TRV) — India", program: "Visitor visa", time: "39 days" },
      { category: "Super Visa", program: "Multi-entry parent/grandparent", time: "94 days" },
      { category: "Visitor record (extension)", program: "TR extension", time: "169 days" },
      { category: "eTA", program: "Visa-exempt travellers", time: "Minutes – 72 hours" },
    ],
  },
  {
    group: "Citizenship",
    icon: "🍁",
    rows: [
      { category: "Citizenship grant", program: "Adult & minor", time: "10 months" },
      { category: "Proof of citizenship", program: "Citizenship certificate", time: "4 months" },
      { category: "Resumption of citizenship", program: "Resumption", time: "15 months" },
    ],
  },
];

export const processingLastUpdated = "2026-04-15";
