// Wave 9A — LMIA / Job Offer streams: /lmia/:stream
export type LmiaSlug =
  | "high-wage"
  | "low-wage"
  | "global-talent-stream"
  | "agricultural"
  | "caregiver"
  | "owner-operator";

export interface LmiaGuide {
  slug: LmiaSlug;
  name: string;
  shortName: string;
  oneLiner: string;
  who: string;
  processingTime: string;
  fee: string;
  recruitment: string;
  prPath: string;
  steps: string[];
  pitfalls: string[];
  faqs: { q: string; a: string }[];
}

const mk = (
  slug: LmiaSlug, name: string, shortName: string, oneLiner: string,
  who: string, processingTime: string, fee: string, recruitment: string, prPath: string,
  steps: string[], pitfalls: string[],
  faqs: [string, string][],
): LmiaGuide => ({
  slug, name, shortName, oneLiner, who, processingTime, fee, recruitment, prPath,
  steps, pitfalls,
  faqs: faqs.map(([q, a]) => ({ q, a })),
});

export const LMIA: Record<LmiaSlug, LmiaGuide> = {
  "high-wage": mk(
    "high-wage",
    "High-Wage LMIA — Canadian Work Permit for Skilled Hires",
    "High-Wage LMIA",
    "High-wage LMIA covers job offers paying at or above the provincial median wage. Most TEER 0-3 hires use this stream.",
    "Skilled workers offered a job at or above the provincial median hourly wage.",
    "ESDC: 4-8 weeks. Work permit: 10-18 weeks after positive LMIA.",
    "CAD 1,000 LMIA processing fee (paid by employer). Cannot be passed to worker.",
    "Employer must advertise the job for 4 consecutive weeks across 3 platforms (Job Bank + 2 others) before applying.",
    "+50 CRS for Express Entry (TEER 1-3) or +200 CRS (TEER 0 senior management).",
    [
      "Employer obtains a job number and advertises for 4 weeks",
      "Employer submits LMIA application + Transition Plan to ESDC",
      "ESDC interviews employer and issues positive/neutral/negative LMIA",
      "Worker applies for closed work permit at IRCC with LMIA letter + offer",
      "Worker enters Canada and starts work; LMIA validity is 1 year from issue",
    ],
    [
      "Advertising on only 1 platform — needs 3 (including Job Bank)",
      "Wage below provincial median triggers low-wage stream + 10% employer cap",
      "Missing Transition Plan when one is required",
      "Job duties don't match the advertised NOC",
    ],
    [
      ["How long is the LMIA valid?", "12 months from issuance. The work permit must be applied for within that window."],
      ["Can I switch employers on a high-wage LMIA?", "No — it's employer-specific. To switch you need a new LMIA from the new employer or qualify for an open work permit."],
    ],
  ),
  "low-wage": mk(
    "low-wage",
    "Low-Wage LMIA — Below Median Wage Work Permit",
    "Low-Wage LMIA",
    "Low-wage LMIAs apply when the offered wage is below the provincial median. They face stricter caps, shorter durations and 2024 reforms.",
    "Workers offered jobs paying below the provincial median hourly wage.",
    "ESDC: 8-12 weeks. Work permit: 10-18 weeks. Permit duration capped at 1-2 years.",
    "CAD 1,000 LMIA fee + housing arrangement obligations.",
    "Same 4-week, 3-platform advertising. Plus a workplace cap: max 10% of workforce on low-wage TFWs (down from 20% in 2024).",
    "Limited — most low-wage NOCs are TEER 4-5, not Express Entry-eligible. PR pathway is via PNP or AIP.",
    [
      "Employer confirms wage is below provincial median",
      "Confirms workforce cap (10% rule) + housing/transport obligations",
      "Advertises for 4 weeks on 3 platforms",
      "Submits LMIA with proof of compliance + Transition Plan",
      "Worker applies for closed work permit, valid 1-2 years",
    ],
    [
      "Exceeding 10% TFW workforce cap (refusal triggered)",
      "Failing to provide affordable housing where required",
      "2024: low-wage LMIAs refused in census areas with 6%+ unemployment",
      "Trying to extend beyond the 1-2 year cap without strong justification",
    ],
    [
      ["Was the low-wage stream changed in 2024?", "Yes — September 2024 reduced the workforce cap from 20% to 10% and froze new low-wage LMIAs in high-unemployment census areas."],
      ["Can low-wage workers get PR?", "Yes — through the Atlantic Immigration Program, RNIP, or provincial streams like Saskatchewan SINP that accept TEER 4-5 occupations."],
    ],
  ),
  "global-talent-stream": mk(
    "global-talent-stream",
    "Global Talent Stream — 2-Week LMIA for Tech Hires",
    "Global Talent Stream",
    "GTS is an expedited LMIA for tech and unique-skill hires with a 2-week service standard. Used heavily by Toronto, Vancouver and Montreal scale-ups.",
    "Tech employers hiring for Category A (referred unique-skill roles) or Category B (Global Talent Occupations List — software engineers, data scientists, etc.).",
    "ESDC: 2 weeks. Work permit: 2 weeks under GTS service standard. Total ~4 weeks door-to-door.",
    "CAD 1,000 LMIA fee.",
    "No standard advertising required. Employer must commit to a Labour Market Benefits Plan (training, mentorship, capital investment).",
    "+50 CRS in Express Entry. Many GTS hires move to PR via CEC within 2 years.",
    [
      "Employer confirms NOC is on the Global Talent Occupations List (Category B) or gets referral (Category A)",
      "Employer files Labour Market Benefits Plan + LMIA application",
      "ESDC issues LMIA in ~10 business days",
      "Worker applies for work permit — 2-week processing under GTS",
      "Worker lands in Canada and joins; spouse gets open work permit; kids get study permit",
    ],
    [
      "NOC chosen doesn't match the Occupations List exactly",
      "Labour Market Benefits Plan is too vague — needs specific commitments",
      "Missing the Designated Referral Partner letter for Category A",
      "Wage below the prevailing wage published on Job Bank",
    ],
    [
      ["What's on the Global Talent Occupations List?", "Software engineers (NOC 21231), computer engineers (21311), web developers (21234), data scientists (21211) and most senior tech roles. Updated quarterly."],
      ["Does GTS guarantee 2-week processing?", "It's a service standard, not a guarantee. Most files clear in 10-15 business days; complex cases take longer."],
    ],
  ),
  "agricultural": mk(
    "agricultural",
    "Agricultural Stream LMIA — Seasonal & Year-Round Farm Work",
    "Agricultural LMIA",
    "The Agricultural Stream and SAWP (Seasonal Agricultural Worker Program) cover farm work with simplified LMIA rules and exemption from many caps.",
    "Workers in primary agriculture — farms producing on the National Commodity List (vegetables, fruit, dairy, poultry, livestock, etc.).",
    "ESDC: 6-10 weeks for Ag Stream. SAWP: 4-8 weeks (Mexico + 11 Caribbean countries).",
    "CAD 1,000 LMIA fee. Employer must provide housing + return transportation.",
    "Exempt from the 4-week advertising requirement and the workforce cap.",
    "Limited — most farm NOCs are TEER 5. PR via PR pilot for agri-food (NOC 65200, 84120, 85100) or PNP streams.",
    [
      "Employer confirms farm produces on National Commodity List",
      "Choose Ag Stream (any country) or SAWP (Mexico/Caribbean only, max 8 months)",
      "Provide housing inspection report + return airfare commitment",
      "Submit LMIA application — exempt from workforce cap",
      "Worker arrives, employer-specific permit valid up to 2 years",
    ],
    [
      "Trying to use Ag Stream for non-primary agriculture (e.g. food processing — that's TFW Stream)",
      "Housing fails inspection — automatic refusal",
      "SAWP workers staying past 8-month seasonal cap",
      "Misclassifying TEER 4 supervisor roles as TEER 5",
    ],
    [
      ["What's the Agri-Food Pilot?", "A PR pathway for full-time non-seasonal workers in meat processing, mushroom/greenhouse production and livestock raising. Caps reset annually."],
      ["Do farm workers get the +50 CRS boost?", "Most farm NOCs are TEER 4-5 and not Express Entry-eligible, so the LMIA boost doesn't apply. PR is via the Agri-Food Pilot or PNPs."],
    ],
  ),
  "caregiver": mk(
    "caregiver",
    "Caregiver LMIA & Home Care Worker PR Pilots",
    "Caregiver LMIA",
    "Two pathways: a regular LMIA for in-home caregivers, and the new Home Care Worker Pilot programs that grant PR on arrival.",
    "Workers caring for children, seniors or people with medical needs in a private Canadian home.",
    "Home Care Pilot: PR processed before arrival, ~6-12 months. Regular LMIA: 8-12 weeks ESDC.",
    "CAD 1,000 LMIA fee for the regular stream. Home Care Pilot uses a different application channel.",
    "Regular caregiver LMIAs require advertising. Home Care Pilots open in batches with first-come acceptance.",
    "Excellent — Home Care Worker Pilots grant PR up front. Regular caregivers can apply through CEC after 12+ months.",
    [
      "Decide pathway: Home Care Pilot (PR up front) vs regular LMIA work permit",
      "Home Care Pilot: meet CLB 4 + Canadian high-school equivalent + 6 months relevant experience",
      "Submit application when intake opens (March 2024 pilots accepted 2,750 each)",
      "Receive COPR + work permit; land in Canada and start with employer",
      "After 24 months of full-time caregiving, full PR rights confirmed",
    ],
    [
      "Missing the CLB 4 minimum on each language band",
      "Education credential not assessed via WES/ICAS before applying",
      "Pilot intake fills within hours — late submissions rejected",
      "Working in a setting that's not a private home (assisted-living facility = different pilot)",
    ],
    [
      ["Does the old LCP / Caring for Children Class still exist?", "No — closed in 2019. The Home Care Worker Pilots are the current PR-on-arrival pathway."],
      ["Can I bring my family on the Home Care Pilot?", "Yes — your spouse gets an open work permit and dependent children get study permits, all granted at landing."],
    ],
  ),
  "owner-operator": mk(
    "owner-operator",
    "Owner-Operator LMIA — Buy/Start a Canadian Business",
    "Owner-Operator LMIA",
    "Owner-operator LMIAs let you LMIA-back yourself by acquiring or starting a Canadian business. The C11 work permit is a faster LMIA-exempt alternative.",
    "Foreign entrepreneurs purchasing or starting a Canadian business they will actively manage.",
    "ESDC: 8-12 weeks. Work permit: 10-18 weeks. C11 alternative is faster (no LMIA needed).",
    "CAD 1,000 LMIA fee.",
    "Owner-operator LMIAs are exempt from advertising. Must show 50%+ ownership and active day-to-day management.",
    "+200 CRS (TEER 0 senior management). Many owner-operators transition to PR via CEC after 1 year of self-employment in Canada.",
    [
      "Identify a Canadian business to buy (or incorporate a new one)",
      "Acquire 50%+ ownership; prepare business plan + financial projections + share certificate",
      "Apply for owner-operator LMIA with proof of ownership and Canadian benefit (jobs created, etc.)",
      "Get positive LMIA, apply for closed work permit",
      "Operate business for 12+ months → apply CEC for PR (with +200 CRS LMIA boost)",
    ],
    [
      "Passive investment without operational role — fails the active management test",
      "Buying a shell company with no real operations or revenue",
      "Business plan that doesn't show net Canadian benefit (jobs, tax revenue, knowledge transfer)",
      "Not declaring whether the C11 LMIA-exempt path would be more appropriate",
    ],
    [
      ["Owner-operator LMIA vs C11 work permit — which is better?", "C11 is faster (no LMIA, ~3 months total) but doesn't give the +200 CRS. Owner-operator LMIA is slower but unlocks PR via CEC + LMIA boost."],
      ["How much do I need to invest?", "There's no fixed minimum, but most successful files involve CAD 100,000+ in business acquisition or working capital plus a credible plan to create Canadian jobs."],
    ],
  ),
};

export const LMIA_LIST = Object.values(LMIA);
export function getLmia(slug: string | undefined): LmiaGuide | null {
  if (!slug) return null;
  return LMIA[slug as LmiaSlug] ?? null;
}