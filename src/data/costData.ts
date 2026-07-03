// Wave 8B — Cost calculators / fee breakdowns: /cost/:program
export type CostSlug =
  | "study-permit"
  | "work-permit"
  | "express-entry"
  | "pnp"
  | "spousal-sponsorship"
  | "citizenship";

export interface CostLine { item: string; cad: string; inr: string; note?: string }
export interface CostGuide {
  slug: CostSlug;
  name: string;
  shortName: string;
  oneLiner: string;
  lines: CostLine[];
  totalCad: string;
  totalInr: string;
  notes: string[];
  faqs: { q: string; a: string }[];
}

const mk = (
  slug: CostSlug, name: string, shortName: string, oneLiner: string,
  lines: [string, string, string, string?][],
  totalCad: string, totalInr: string,
  notes: string[],
  faqs: [string, string][],
): CostGuide => ({
  slug, name, shortName, oneLiner,
  lines: lines.map(([item, cad, inr, note]) => ({ item, cad, inr, note })),
  totalCad, totalInr, notes,
  faqs: faqs.map(([q, a]) => ({ q, a })),
});

export const COSTS: Record<CostSlug, CostGuide> = {
  "study-permit": mk(
    "study-permit",
    "Cost of a Canada Study Permit (Total Breakdown)",
    "Study Permit Cost",
    "Every dollar you'll spend from application to landing — government fees, biometrics, medicals, GIC, tuition deposit, and what's optional.",
    [
      ["Study permit application fee", "150", "9,300", "IRCC mandatory"],
      ["Biometrics (per person)", "85", "5,300", "VFS / BVAC"],
      ["Upfront medical exam (panel physician)", "150-250", "9,300-15,500", "Recommended for SDS"],
      ["Language test (IELTS Academic)", "330", "20,500", "Validity 2 years"],
      ["GIC (Guaranteed Investment Certificate)", "20,635", "12,80,000", "SDS pathway requirement"],
      ["First-year tuition deposit", "15,000-35,000", "9,30,000-21,70,000", "Varies by DLI"],
      ["DHL passport return", "20-40", "1,250-2,500", "Optional"],
      ["RCIC consultation (optional)", "1,500-4,000", "93,000-2,48,000", "If using a licensed consultant"]
    ],
    "37,870-60,490", "23,48,000-37,50,000",
    [
      "GIC is refundable to you in monthly installments after you land in Canada — it is not an expense, it's a settlement-fund proof.",
      "Tuition deposit goes to your DLI, not IRCC. It is part of your education cost, not your visa cost.",
      "Conversion at INR 62 per CAD — actual rate varies."
    ],
    [
      ["What's the cheapest legal way to get a study permit?", "Skip RCIC fees and apply yourself if your case is straightforward — minimum spend is ~CAD 1,500 in IRCC + biometrics + medicals + IELTS, plus your tuition deposit and GIC (which you get back)."],
      ["Are RCIC fees worth it?", "If your case has any complexity (gap years, refusal history, weak academic profile, financial sponsor instead of self-funding), yes. Otherwise it's optional."]
    ],
  ),
  "work-permit": mk(
    "work-permit",
    "Cost of a Canada Work Permit",
    "Work Permit Cost",
    "Closed (LMIA) and open work permit cost breakdowns including the LMIA-tied employer fee.",
    [
      ["Work permit application fee", "155", "9,600"],
      ["Open work permit holder fee (if open WP)", "100", "6,200"],
      ["Biometrics", "85", "5,300"],
      ["Medical exam", "150-250", "9,300-15,500"],
      ["LMIA fee (paid by employer)", "1,000", "62,000", "Employer pays, never employee"],
      ["Educational Credential Assessment (if needed)", "200-300", "12,400-18,600"],
      ["IELTS General", "330", "20,500"],
      ["RCIC fees (optional)", "2,000-5,000", "1,24,000-3,10,000"]
    ],
    "920-1,220 (employee out-of-pocket)", "57,000-75,500",
    ["LMIA fee is illegal to charge to the worker. If an employer asks you to pay it, walk away — it's a trafficking red flag.", "Open work permit fee is on top of the standard application fee."],
    [
      ["Why is the LMIA fee so high?", "It's CAD 1,000 per position to compensate ESDC for the labour market test. The employer pays it as part of recruiting from abroad."],
      ["Can I get a work permit without an LMIA?", "Yes — under the IMP (International Mobility Program). Spousal open WP, IEC working holiday, intra-company transfers and PGWP all skip the LMIA."]
    ],
  ),
  "express-entry": mk(
    "express-entry",
    "Cost of a Canada Express Entry PR Application",
    "Express Entry Cost",
    "Total out-of-pocket from creating your profile to landing as a permanent resident — for a single applicant, couple, and family of four.",
    [
      ["Express Entry profile creation", "0", "0", "Free"],
      ["Educational Credential Assessment (WES)", "240", "14,900"],
      ["IELTS General Training", "330", "20,500"],
      ["Police certificate (per country)", "20-100", "1,250-6,200"],
      ["Medical exam", "200-300", "12,400-18,600"],
      ["PR application processing fee (principal)", "950", "58,900"],
      ["Right of PR fee (per adult)", "575", "35,650"],
      ["Spouse processing + RPRF", "1,525", "94,550", "If applicable"],
      ["Dependent child fee (each)", "260", "16,120"],
      ["Biometrics (single)", "85", "5,300"],
      ["Biometrics (family)", "170", "10,540"],
      ["Settlement funds proof (single, FSW)", "14,690", "9,10,800", "Held in account, not spent"],
      ["RCIC fees (optional)", "3,000-8,000", "1,86,000-4,96,000"]
    ],
    "1,365 (single, IRCC only) / 17,000+ with settlement funds proof", "84,600 / 10,55,000+",
    ["Settlement funds is a proof requirement, not a fee — money stays yours.", "CEC applicants with Canadian work experience are exempt from settlement funds proof."],
    [
      ["What is the minimum I must pay IRCC for PR?", "CAD 1,365 for a single applicant (CAD 950 processing + CAD 575 RPRF — paid only if approved)."],
      ["Do I get the RPRF back if I'm refused?", "Yes — Right of Permanent Residence Fee is refunded if your application is refused or withdrawn."]
    ],
  ),
  "pnp": mk(
    "pnp",
    "Cost of a PNP (Provincial Nominee Program) Application",
    "PNP Cost",
    "Province-by-province nomination fees plus the federal IRCC PR application costs.",
    [
      ["BC PNP application fee", "1,475", "91,450"],
      ["Ontario OINP application fee", "1,500-2,000", "93,000-1,24,000"],
      ["Alberta AAIP application fee", "500", "31,000"],
      ["Saskatchewan SINP application fee", "350", "21,700"],
      ["Manitoba MPNP application fee", "500", "31,000"],
      ["Nova Scotia NSNP application fee", "300", "18,600"],
      ["Federal IRCC PR fees (single)", "1,365", "84,600", "Same as Express Entry"],
      ["ECA + IELTS + medicals + biometrics", "750-1,000", "46,500-62,000"]
    ],
    "2,800-5,000+", "1,73,500-3,10,000",
    ["You pay the province AND the federal government. They are separate applications.", "Some provinces offer fee waivers for low-income applicants — check provincial websites."],
    [
      ["Which PNP has the lowest fees?", "Nova Scotia (CAD 300) and Saskatchewan (CAD 350) are the cheapest provincial portions."],
      ["Are PNP fees refundable?", "Most provincial fees are non-refundable once your file is reviewed. Federal RPRF (CAD 575) is refundable if refused."]
    ],
  ),
  "spousal-sponsorship": mk(
    "spousal-sponsorship",
    "Cost of Spousal Sponsorship in Canada",
    "Spousal Sponsorship Cost",
    "Total cost to sponsor your spouse or common-law partner for Canadian PR — under CAD 1,200 if you do it yourself.",
    [
      ["Sponsorship application fee", "85", "5,300"],
      ["Principal applicant processing fee", "545", "33,800"],
      ["Right of PR fee", "575", "35,650", "Refundable if refused"],
      ["Biometrics", "85", "5,300"],
      ["Medical exam", "150-250", "9,300-15,500"],
      ["Police certificates", "20-100", "1,250-6,200"],
      ["Dependent child (each)", "175", "10,850"],
      ["Translation + notarisation", "100-500", "6,200-31,000"],
      ["RCIC / lawyer fees (optional)", "2,000-6,000", "1,24,000-3,72,000"]
    ],
    "1,160-1,640 (DIY)", "71,900-1,01,700",
    ["No income requirement to sponsor a spouse (unlike PGP).", "Quebec resident sponsors pay an additional CAD 318 CSQ fee."],
    [
      ["Is spousal sponsorship cheaper than Express Entry?", "Yes — total IRCC fees are about CAD 1,290 vs CAD 1,365 for EE, and you skip ECA / IELTS for the sponsored person."],
      ["Do I need a lawyer for spousal sponsorship?", "Most straightforward cases don't. If there's a previous refusal, separation, or genuineness concern, hire one."]
    ],
  ),
  "citizenship": mk(
    "citizenship",
    "Cost of a Canadian Citizenship Application",
    "Citizenship Cost",
    "Citizenship grant fees for adults and minors, plus what to budget for the test, ceremony, and certificate.",
    [
      ["Adult citizenship application fee", "530", "32,860"],
      ["Right of citizenship fee (adult)", "100", "6,200"],
      ["Minor (under 18) application fee", "100", "6,200"],
      ["Replacement / proof of citizenship", "75", "4,650"],
      ["Citizenship test prep book / app", "0-30", "0-1,860", "Optional — free at canada.ca"],
      ["Travel to oath ceremony", "0-200", "0-12,400", "Most ceremonies are now virtual"]
    ],
    "630 (adult) / 100 (minor)", "39,060 / 6,200",
    ["Citizenship test is free. Online via secure browser, or in-person at IRCC offices.", "Oath ceremonies have been free and largely virtual since 2020."],
    [
      ["Can I apply for free?", "No — there is a mandatory CAD 630 fee for adults. Fee waivers are very rare and require demonstrated financial hardship."],
      ["Is the cost per person, or per family?", "Per person. A family of four (2 adults + 2 minors) pays CAD 630 + 630 + 100 + 100 = CAD 1,460."]
    ],
  ),
};

export const COSTS_LIST = Object.values(COSTS);
export function getCost(slug: string | undefined): CostGuide | null {
  if (!slug) return null;
  return COSTS[slug as CostSlug] ?? null;
}
