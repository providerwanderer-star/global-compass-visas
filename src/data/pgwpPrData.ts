// Wave 11C — PGWP → PR bridges: /pgwp-to-pr/:path
export type PgwpPrSlug =
  | "express-entry-cec"
  | "bowp-bridging-work-permit"
  | "pnp-international-graduate-streams"
  | "category-based-draws-for-grads"
  | "pgwp-extension-options"
  | "expired-pgwp-recovery"
  | "canadian-experience-class-eligibility";

export interface PgwpPrGuide {
  slug: PgwpPrSlug;
  name: string;
  shortName: string;
  oneLiner: string;
  who: string;
  processingTime: string;
  fee: string;
  keyRule: string;
  outcome: string;
  steps: string[];
  pitfalls: string[];
  faqs: { q: string; a: string }[];
}

const mk = (
  slug: PgwpPrSlug, name: string, shortName: string, oneLiner: string,
  who: string, processingTime: string, fee: string, keyRule: string, outcome: string,
  steps: string[], pitfalls: string[],
  faqs: [string, string][],
): PgwpPrGuide => ({
  slug, name, shortName, oneLiner, who, processingTime, fee, keyRule, outcome,
  steps, pitfalls, faqs: faqs.map(([q, a]) => ({ q, a })),
});

export const PGWPPR: Record<PgwpPrSlug, PgwpPrGuide> = {
  "express-entry-cec": mk(
    "express-entry-cec",
    "PGWP to PR via Canadian Experience Class (CEC) — Step-by-Step",
    "PGWP → CEC PR",
    "The Canadian Experience Class is the most common path from PGWP to PR — 12 months of TEER 0/1/2/3 Canadian work experience is enough to qualify.",
    "PGWP holders with at least 1 year of full-time skilled work in Canada.",
    "Express Entry: 6 months from ITA.",
    "Express Entry CAD 1,525 per adult + CAD 260 for dependent children.",
    "Skilled work means NOC TEER 0, 1, 2 or 3 — gigs and survival jobs (TEER 4/5) do not count.",
    "PR + path to citizenship in 3 more years.",
    [
      "Work 12 months full-time (or equivalent part-time) in TEER 0/1/2/3 on your PGWP",
      "Take IELTS/CELPIP or TEF/TCF — minimum CLB 7 (TEER 0/1) or CLB 5 (TEER 2/3)",
      "Create Express Entry profile — CEC pool",
      "Receive ITA in a CEC-specific or general draw (recent cut-offs 521-547)",
      "Submit complete PR application within 60 days"
    ],
    [
      "Counting self-employment — CEC does not allow self-employed experience",
      "Working in TEER 4/5 jobs — no CEC credit",
      "Letting PGWP expire before ITA — apply for BOWP after submitting PR",
      "Missing language minimums — CLB 7 for TEER 0/1 is non-negotiable"
    ],
    [
      ["How many months of work do I need?", "12 months full-time (30+ hours/week) in TEER 0/1/2/3, or the equivalent in part-time hours. The 12 months must be inside the last 3 years."],
      ["Can I apply before completing 12 months?", "You can create an Express Entry profile but you can't be issued an ITA until the 12 months are complete."]
    ],
  ),
  "bowp-bridging-work-permit": mk(
    "bowp-bridging-work-permit",
    "Bridging Open Work Permit (BOWP) — Keep Working After PGWP Expires",
    "BOWP",
    "The Bridging Open Work Permit lets PR applicants keep working in Canada while IRCC processes their PR — open work permit, any employer.",
    "PR applicants in Express Entry, PNP, AIP, RNIP, or QSWP whose work permit is about to expire.",
    "BOWP issued in 2-8 weeks after PR application is in process.",
    "BOWP fee CAD 255 + open work permit holder fee CAD 100.",
    "PR application must be submitted (AOR received) and current work permit must have 4 months or less left.",
    "Open work permit valid 24 months — bridges the gap until PR is finalised.",
    [
      "Submit PR application (eAPR) and receive AOR (Acknowledgment of Receipt)",
      "Confirm current work permit has 4 months or less remaining",
      "Apply for BOWP online from inside Canada",
      "Continue working for any employer while BOWP is processed (implied status applies)",
      "Receive BOWP — keep working until PR is finalised"
    ],
    [
      "Applying for BOWP before AOR — application refused",
      "Letting work permit expire without filing for restoration — falls out of status",
      "Provincial nomination not yet received — PNP applicants need the nomination first",
      "Applying for BOWP from outside Canada — not allowed"
    ],
    [
      ["Can I switch jobs on a BOWP?", "Yes — BOWP is an open work permit. You can work for any Canadian employer in any role."],
      ["What if my PGWP expires before AOR?", "File for restoration within 90 days of expiry, then apply for BOWP once AOR arrives. You can be on visitor status during the gap if needed."]
    ],
  ),
  "pnp-international-graduate-streams": mk(
    "pnp-international-graduate-streams",
    "PNP International Graduate Streams — Province-by-Province PR Routes",
    "PNP Grad Streams",
    "Almost every province has a dedicated International Graduate stream — fastest PR option for PGWP holders who studied in that province.",
    "PGWP holders who graduated from a recognised DLI in the nominating province.",
    "Provincial nomination: 3-9 months. PR after nomination: 6-11 months.",
    "Provincial fee CAD 0-2,000 + Express Entry CAD 1,525.",
    "Most graduate streams require you to live, study, and intend to work in the province.",
    "Provincial nomination adds 600 CRS points — effectively guarantees PR.",
    [
      "Identify the right stream: OINP Master's/PhD Graduate, BC PNP Tech, AAIP Express Entry, MPNP IES, etc.",
      "Confirm you meet the stream's specific work, language, and study requirements",
      "Submit Expression of Interest (or direct apply where allowed)",
      "Receive nomination — claim 600 CRS points in Express Entry",
      "Submit PR application after receiving ITA"
    ],
    [
      "Applying to a stream in a province you don't actually intend to live in — risks misrepresentation",
      "Missing the post-graduation application window (some streams require apply within 2 years)",
      "Choosing a non-graduate stream when graduate stream is faster",
      "Overlooking Manitoba and Saskatchewan — far less competitive than ON/BC"
    ],
    [
      ["Which province has the easiest grad stream?", "Manitoba (MPNP IES) and Saskatchewan (SINP Graduate Stream) have the lowest thresholds. Ontario's Master's and PhD streams are highly competitive."],
      ["Do I need a job offer for a graduate stream?", "Some streams require it (BC PNP), others don't (Ontario PhD, MPNP IES). Check the specific stream criteria."]
    ],
  ),
  "category-based-draws-for-grads": mk(
    "category-based-draws-for-grads",
    "Category-Based Express Entry Draws for International Graduates",
    "Category Draws for Grads",
    "IRCC's category-based draws (healthcare, STEM, trades, transport, French) target specific occupations — international grads in those NOCs face much lower CRS cut-offs.",
    "PGWP holders working in the targeted NOCs.",
    "Category draws held monthly; PR processing 6 months from ITA.",
    "Express Entry CAD 1,525 per adult.",
    "You must have 6 months of recent experience in the targeted NOC plus meet CEC or FSW criteria.",
    "ITA at a much lower CRS than general draws (typically 425-465 vs 520+).",
    [
      "Confirm your job duties match one of the targeted NOCs",
      "Get 6 months of full-time experience in that NOC (last 3 years)",
      "Create Express Entry profile — indicate category eligibility",
      "Wait for the next category-specific draw",
      "Submit PR application within 60 days of ITA"
    ],
    [
      "Claiming a category when actual duties don't match the NOC lead statement",
      "Missing the 6-month recency requirement",
      "Forgetting French — French-language proficiency draws are easiest for bilinguals",
      "Assuming category eligibility lasts forever — categories can change each year"
    ],
    [
      ["Which category has the lowest CRS cut-offs?", "French-language proficiency draws historically have the lowest cut-offs (often 379-481). STEM and healthcare are next."],
      ["Can I qualify for multiple categories?", "Yes — IRCC scores your profile against each category. You're considered for any draw you qualify for."]
    ],
  ),
  "pgwp-extension-options": mk(
    "pgwp-extension-options",
    "PGWP Extension Options — 18-Month Extension & Alternatives",
    "PGWP Extension",
    "IRCC has offered repeated 18-month PGWP extensions for expiring permits — plus BOWP, employer-specific LMIA, and visitor record as fallback options.",
    "PGWP holders with expired or expiring permits in 2024-2026.",
    "Extension processing: 4-8 weeks online.",
    "PGWP extension fee CAD 255 + open work permit holder fee CAD 100.",
    "PGWP is normally non-renewable, but IRCC has issued temporary public policies allowing one-time extensions.",
    "Additional 18 months of open work authorization to continue accumulating CEC experience.",
    [
      "Check current IRCC public policy for PGWP extension eligibility",
      "Apply online before current PGWP expires (or within 90-day restoration window)",
      "Pay PGWP extension + OWP holder fees",
      "Continue working under implied status while application is processed",
      "If denied: fall back on BOWP (if PR submitted), LMIA, or visitor record"
    ],
    [
      "Assuming PGWP extension is automatic — it requires a specific public policy in force",
      "Letting permit expire before applying — adds restoration cost and risk",
      "Switching to closed work permit when BOWP is the better path",
      "Stopping work the moment PGWP expires — implied status often allows continuation"
    ],
    [
      ["Is the PGWP extension still available?", "Eligibility depends on the most recent IRCC public policy. Always check the IRCC website or speak to an RCIC before assuming the extension applies to your case."],
      ["What if I'm not eligible for the extension?", "Apply for an employer-specific LMIA work permit, a Bridging Open Work Permit (if PR is submitted), or transition to visitor status while you regroup."]
    ],
  ),
  "expired-pgwp-recovery": mk(
    "expired-pgwp-recovery",
    "Expired PGWP — How to Restore Status & Stay in Canada",
    "Expired PGWP",
    "If your PGWP has expired you have a 90-day restoration window. After that you must leave Canada — but several restoration and BOWP paths still exist.",
    "Workers whose PGWP has expired or will expire within 90 days.",
    "Restoration processing: 60-180 days.",
    "Restoration CAD 200 + new permit fee CAD 155-255.",
    "Restoration must be filed within 90 days of permit expiry — no extensions to that window.",
    "Status restored + new work permit issued, allowing you to keep working toward PR.",
    [
      "Stop working the day your PGWP expires (working without status is a violation)",
      "Within 90 days, submit restoration of status + new permit application",
      "If PR was already submitted: apply for BOWP and use implied status",
      "If no PR yet: pursue LMIA-based work permit or visitor record",
      "Submit PR application as soon as eligible to lock in CEC pathway"
    ],
    [
      "Continuing to work after PGWP expiry — destroys future PR chances",
      "Missing the 90-day window — must leave Canada and re-enter on new permit",
      "Trying to extend PGWP itself without an active IRCC public policy",
      "Failing to declare expired-status work on PR forms — misrepresentation"
    ],
    [
      ["What happens if I miss the 90-day restoration window?", "You must leave Canada and apply for a new work permit from abroad. Time already worked in Canada still counts toward CEC."],
      ["Can I work while restoration is processed?", "No — you have no work authorization until restoration is approved. You can remain in Canada while waiting."]
    ],
  ),
  "canadian-experience-class-eligibility": mk(
    "canadian-experience-class-eligibility",
    "Canadian Experience Class (CEC) Eligibility — Full Checklist for Grads",
    "CEC Eligibility",
    "CEC requires 1 year of skilled Canadian work experience, language scores at CLB 7 (TEER 0/1) or CLB 5 (TEER 2/3), and intent to live outside Quebec.",
    "PGWP holders and other temporary workers with 12 months of Canadian skilled experience.",
    "Express Entry: 6 months from ITA.",
    "Express Entry CAD 1,525 per adult.",
    "Work must be lawful, full-time, in TEER 0/1/2/3, accumulated in the last 3 years.",
    "Eligibility to enter the Express Entry CEC pool and receive ITAs in CEC-specific draws.",
    [
      "Confirm 12 months full-time (or part-time equivalent) work in TEER 0/1/2/3 in Canada",
      "Confirm the work was authorised — no work-without-status periods count",
      "Confirm language minimums: CLB 7 (TEER 0/1) or CLB 5 (TEER 2/3) in all four skills",
      "Get an ECA if you want to claim foreign education points (optional for CEC)",
      "Create Express Entry profile under CEC"
    ],
    [
      "Counting work done on a co-op/internship work permit — does not qualify",
      "Counting hours done as a full-time student off-campus — not eligible",
      "Working in Quebec — Quebec experience does not qualify for CEC (use PEQ instead)",
      "Misclassifying NOC — IRCC matches duties to NOC lead statement"
    ],
    [
      ["Does part-time work count for CEC?", "Yes — IRCC totals hours. 12 months full-time (1,560 hours at 30 hrs/week) or equivalent part-time hours qualifies."],
      ["Can I include experience gained on a co-op or internship permit?", "No — work performed under a co-op or post-graduate research permit does not count for CEC. Only work under PGWP or other open/closed work permits qualifies."]
    ],
  ),
};

export const PGWPPR_LIST = Object.values(PGWPPR);
export function getPgwpPr(slug: string | undefined): PgwpPrGuide | null {
  if (!slug) return null;
  return PGWPPR[slug as PgwpPrSlug] ?? null;
}