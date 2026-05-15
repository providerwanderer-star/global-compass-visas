// Wave 8A — Processing time deep-dives: /processing-time/:program
export type ProcessingSlug =
  | "study-permit"
  | "work-permit"
  | "visitor-visa"
  | "express-entry-pr"
  | "pnp-pr"
  | "spousal-sponsorship"
  | "pgp"
  | "citizenship";

export interface ProcessingGuide {
  slug: ProcessingSlug;
  name: string;
  shortName: string;
  oneLiner: string;
  ircc: string;
  ranges: { country: string; time: string }[];
  slowFactors: string[];
  timeline: { t: string; d: string }[];
  faqs: { q: string; a: string }[];
}

const mk = (
  slug: ProcessingSlug,
  name: string,
  shortName: string,
  oneLiner: string,
  ircc: string,
  ranges: [string, string][],
  slowFactors: string[],
  timeline: [string, string][],
  faqs: [string, string][],
): ProcessingGuide => ({
  slug, name, shortName, oneLiner, ircc,
  ranges: ranges.map(([country, time]) => ({ country, time })),
  slowFactors,
  timeline: timeline.map(([t, d]) => ({ t, d })),
  faqs: faqs.map(([q, a]) => ({ q, a })),
});

export const PROCESSING: Record<ProcessingSlug, ProcessingGuide> = {
  "study-permit": mk(
    "study-permit",
    "Canada Study Permit Processing Time",
    "Study Permit",
    "Real-world IRCC processing times for Canadian study permits, broken down by country, with a week-by-week timeline of what happens after you click submit.",
    "IRCC's service standard for study permits varies weekly. The live IRCC tool rebuilds the average every Monday from finalised applications.",
    [["India", "8-12 weeks"], ["Philippines", "10-14 weeks"], ["Nigeria", "12-18 weeks"], ["Pakistan", "14-22 weeks"], ["China", "6-10 weeks"], ["Vietnam", "12-16 weeks"]],
    ["Incomplete documents trigger a procedural fairness letter (adds 4-8 weeks)", "Medicals expiring before decision = re-do request", "Background check on military or government applicants", "Visa office backlog (Delhi, Manila, Lagos run hotter than others)", "Provincial Attestation Letter (PAL) verification delays"],
    [["Week 0", "Submit online — AOR (Acknowledgment of Receipt) within 24-72 hours"],
     ["Week 1-2", "Biometrics letter — book BVAC appointment within 30 days"],
     ["Week 2-4", "Medical exam request (if not upfront medical already done)"],
     ["Week 4-8", "Eligibility review — officer assesses funds, SOP, ties"],
     ["Week 8-12", "Decision letter + Port of Entry letter + passport request"],
     ["Week 12+", "Visa stamping + travel"]],
    [["How do I check IRCC processing times right now?", "Use IRCC's official tool at canada.ca — it updates weekly. Avoid third-party trackers; they lag."],
     ["Is paying extra for premium processing possible?", "No. Canada has no expedited or premium service for study permits. SDS (Student Direct Stream) is faster but eligibility-based, not paid."],
     ["What if I'm past the published time?", "Submit a webform after 30 days past the standard. After 90 days, request GCMS notes via ATIP to see if your file is stuck."]],
  ),
  "work-permit": mk(
    "work-permit",
    "Canada Work Permit Processing Time",
    "Work Permit",
    "Closed (LMIA) and open work permit timelines from inland and overseas, with the realistic ranges by visa office.",
    "IRCC's service standard depends on whether the permit is LMIA-backed (employer-specific), LMIA-exempt (IMP), or open (e.g. spousal, PGWP).",
    [["India (LMIA)", "10-18 weeks"], ["Philippines (LMIA)", "12-20 weeks"], ["UK (IEC)", "4-8 weeks"], ["Inland extension", "60-120 days"], ["PGWP (online)", "80-110 days"]],
    ["LMIA still pending at ESDC (separate 4-6 month process)", "Employer compliance review", "Job NOC requires additional credential checks", "Medical re-do for extensions"],
    [["Week 0", "Submit work permit application + LMIA (if applicable)"],
     ["Week 1-2", "Biometrics + AOR"],
     ["Week 2-6", "Eligibility + admissibility review"],
     ["Week 6-12", "Background and security checks"],
     ["Week 12-18", "Decision + Port of Entry letter"]],
    [["Can I work while my extension is processing?", "Yes — implied status lets you continue with the same employer if you applied before your current permit expired."],
     ["Does paying RCIC fees speed it up?", "No. RCICs ensure your file is complete (which avoids procedural-fairness delays), but cannot accelerate IRCC processing."]],
  ),
  "visitor-visa": mk(
    "visitor-visa",
    "Canada Visitor Visa (TRV) Processing Time",
    "Visitor Visa",
    "Temporary Resident Visa timelines by country, plus the difference between a visit visa, super visa, and eTA.",
    "TRV processing times are highly variable by visa office. Super Visa (parents and grandparents) is often faster than the standard visitor visa.",
    [["India", "30-60 days"], ["Philippines", "45-90 days"], ["Nigeria", "60-120 days"], ["Pakistan", "70-150 days"], ["UAE", "20-45 days"]],
    ["Weak proof of ties to home country", "Previous Schengen / US refusals on file", "Family in Canada with no return strategy explained"],
    [["Day 0", "Submit online + pay CAD 100 fee"],
     ["Day 3-7", "AOR + biometrics letter"],
     ["Day 7-30", "Eligibility review"],
     ["Day 30-60", "Decision + passport request (if approved)"]],
    [["What is faster — visitor visa or super visa?", "Super Visa is often processed faster (within 60 days for most parents) and grants 5-year multiple entry."],
     ["I have a US visa — am I exempt?", "If you hold a valid US visa, you may qualify for an eTA instead of a TRV when flying to Canada — much faster (minutes to hours)."]],
  ),
  "express-entry-pr": mk(
    "express-entry-pr",
    "Express Entry PR Processing Time",
    "Express Entry PR",
    "From ITA to COPR — the realistic 5-8 month timeline for Express Entry permanent residence applications.",
    "IRCC's official service standard for Express Entry e-APR is 6 months from submission to final decision. CEC, FSW and FST are processed in the same stream.",
    [["CEC (Canadian Experience Class)", "5-6 months"], ["FSW (overseas)", "6-8 months"], ["FST", "6-8 months"], ["PNP-Express Entry", "6-8 months"]],
    ["Police certificates from multiple countries pending", "Medical exam takes 4-8 weeks if not upfront", "Background check on government / military applicants (can add 6+ months)", "Inadmissibility flags (criminal, medical, misrepresentation)"],
    [["Day 0", "Receive ITA — 60 days to submit complete e-APR"],
     ["Day 60", "Submit e-APR + pay CAD 1,365 fees"],
     ["Day 60-90", "AOR + biometrics + medicals"],
     ["Day 90-150", "Eligibility R10 review"],
     ["Day 150-180", "Background and security finalised"],
     ["Day 180-210", "PPR (Passport Request) + COPR issued"],
     ["Day 210+", "Land in Canada and complete PR landing"]],
    [["What is the 60-day window?", "After receiving an ITA, you have 60 days to upload all documents and submit. Miss it and your profile is declined."],
     ["Can I work in Canada while waiting?", "Inland CEC applicants get a Bridging Open Work Permit (BOWP) once AOR is issued — keeps you working until COPR."]],
  ),
  "pnp-pr": mk(
    "pnp-pr",
    "PNP Provincial Nomination Processing Time",
    "PNP Nomination",
    "Provincial nomination timelines vary wildly — Ontario OINP, BC PNP, Alberta AAIP, Saskatchewan SINP all have different paths.",
    "PNP is a two-stage process: provincial nomination (province) plus PR application (federal IRCC). Total time is both combined.",
    [["Ontario OINP (Tech Draw)", "30-60 days nomination + 6 months federal"], ["BC PNP (Skills Immigration)", "2-3 months nomination + 6 months federal"], ["Alberta AAIP", "4-6 months nomination + 6 months federal"], ["Saskatchewan SINP", "3-4 months nomination + 6 months federal"], ["Atlantic AIP", "6-12 weeks endorsement + 6 months federal"]],
    ["Province requests additional documents (ADRs)", "Job offer verification with employer", "Settlement funds proof rejected for stale-dated statements", "Federal IRCC backlog after nomination"],
    [["Stage 1", "Apply to province — pay nomination fee (CAD 250-1,500 depending on province)"],
     ["Stage 1+", "Receive nomination certificate (boost EE score by +600 if EE-aligned)"],
     ["Stage 2", "Submit federal PR application within 30-180 days of nomination"],
     ["Stage 2+", "Standard 6-month federal processing → COPR"]],
    [["Which PNP is fastest?", "Ontario's Tech Draw and BC's Tech stream are the fastest — sometimes nomination in 30 days. Atlantic AIP endorsement is also quick."],
     ["Do I need a job offer?", "Most PNP streams require a Canadian job offer. Exceptions: Ontario PhD, BC EE-International Graduate, Saskatchewan Occupations In-Demand."]],
  ),
  "spousal-sponsorship": mk(
    "spousal-sponsorship",
    "Spousal Sponsorship Processing Time",
    "Spousal Sponsorship",
    "Inland and overseas spousal sponsorship timelines — and how to avoid common delays that push files past 18 months.",
    "IRCC processes inland and outside-Canada spousal sponsorship in the same stream. Service standard is 12 months but real-world is 8-14.",
    [["Outside Canada (most countries)", "10-14 months"], ["Inland (in Canada)", "10-12 months"], ["Quebec resident sponsor", "+8 months for CSQ"]],
    ["Relationship genuineness flagged (interview triggered)", "Sponsor's income / debt checks", "Proof of common-law cohabitation insufficient", "Previous sponsorship undertakings still active"],
    [["Month 0", "Submit complete application — sponsor + sponsored person forms together"],
     ["Month 1", "AOR for both sponsor approval and PR application"],
     ["Month 2-4", "Sponsor eligibility approved (income, undertaking)"],
     ["Month 4-10", "PR eligibility + medicals + background"],
     ["Month 10-12", "COPR issued (if approved) or interview scheduled"]],
    [["Inland or outland — which is faster?", "Both are now processed in roughly the same time. Inland gets you an OWP. Outland keeps appeal rights if refused."],
     ["Can my spouse work while waiting?", "Yes — inland applicants get an Open Work Permit usually within 4 months of AOR."]],
  ),
  "pgp": mk(
    "pgp",
    "Parents and Grandparents (PGP) Processing Time",
    "PGP Sponsorship",
    "PGP lottery, Super Visa alternatives, and the 24-36 month realistic timeline for parent and grandparent sponsorship.",
    "PGP is invitation-only via annual lottery. Once invited, processing is 20-24 months on average.",
    [["PGP (after invitation)", "20-24 months"], ["Quebec resident sponsor", "+12 months"], ["Super Visa (alternative)", "8-12 weeks"]],
    ["Income tax NOA verification across 3 years", "Medical exam expiry on elderly applicants", "Sponsor income shortfall in any of the 3 qualifying years"],
    [["Year 0", "Submit Interest to Sponsor form (when window opens, ~2 weeks)"],
     ["Year 0", "Lottery — IRCC randomly invites a fixed number"],
     ["Year 0-1", "Submit complete sponsorship + PR application within 60 days of invite"],
     ["Year 1-2", "Eligibility, medicals, background"],
     ["Year 2+", "COPR issued"]],
    [["What if I don't get picked in the lottery?", "Apply for Super Visa instead — 5-year multiple-entry visit visa, processed in 8-12 weeks, requires medical insurance and proof of income."]],
  ),
  "citizenship": mk(
    "citizenship",
    "Canadian Citizenship Application Processing Time",
    "Citizenship",
    "From submission to oath ceremony — the 12-24 month realistic timeline for Canadian citizenship grants.",
    "IRCC's published service standard for citizenship grants is 12 months. Real-world is 12-24 depending on test scheduling and ceremony backlog.",
    [["Adult grant", "12-18 months"], ["Minor (under 18)", "12 months"], ["Resumption of citizenship", "12-24 months"]],
    ["Physical presence calculator under 1,095 days flagged", "Tax filing gaps in 3 of the last 5 years", "Travel history discrepancies between application and CBSA records"],
    [["Month 0", "Submit citizenship application + CAD 630 fee (adult)"],
     ["Month 1-3", "AOR + acknowledgment of complete application"],
     ["Month 4-9", "Citizenship test invitation (online or in-person)"],
     ["Month 9-12", "Oath ceremony invitation"],
     ["Month 12-18", "Oath taken → certificate issued"]],
    [["Do I have to take the test in person?", "Most tests are online from home now. In-person tests are offered when there are integrity concerns or accommodations needed."],
     ["What is the 1,095-day rule?", "You must have been physically present in Canada for 1,095 days (3 years) out of the 5 years before application. Days as a temporary resident count for half (max 365)."]],
  ),
};

export const PROCESSING_LIST = Object.values(PROCESSING);
export function getProcessing(slug: string | undefined): ProcessingGuide | null {
  if (!slug) return null;
  return PROCESSING[slug as ProcessingSlug] ?? null;
}
