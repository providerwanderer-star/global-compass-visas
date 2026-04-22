/**
 * Programmatic GEO data for "Canada PR with CRS {band}" pages.
 * Each record drives a unique route: /canada-pr/crs/:slug
 */

export interface CRSBand {
  slug: string;
  label: string;
  range: string;
  realityCheck: string;
  bestStrategies: { title: string; detail: string }[];
  recommendedPathways: string[];
  topProvinces: { name: string; reason: string }[];
  whoFor: string;
  whoNotFor: string;
  expectedTimeline: string;
  faqs: { q: string; a: string }[];
}

export const crsBands: CRSBand[] = [
  {
    slug: "below-350",
    label: "Under 350",
    range: "0 – 349",
    realityCheck:
      "A CRS below 350 will not receive a general Express Entry invitation. Your route to PR is via Provincial Nominee Programs, study-permit pathways, or LMIA-based work permits — all of which can be combined to gain the 600-point PNP boost.",
    bestStrategies: [
      { title: "Study in Canada (2-year diploma)", detail: "Earn a PGWP, gain Canadian work experience, then apply via CEC. Adds 50–100 CRS points and unlocks PNP streams." },
      { title: "Improve language to CLB 9+", detail: "Going from CLB 7 to CLB 9 can add 70–124 CRS points — the single highest-impact lever." },
      { title: "Target a PNP nomination", detail: "Saskatchewan SINP, Manitoba MPNP and Atlantic AIP have streams that don't require Express Entry profiles." },
    ],
    recommendedPathways: [
      "Study Permit → PGWP → CEC (long-term, 3–5 years)",
      "Saskatchewan SINP Occupation In-Demand stream",
      "Manitoba Provincial Nominee Program",
      "Atlantic Immigration Program (with job offer)",
    ],
    topProvinces: [
      { name: "Saskatchewan", reason: "SINP nominates non-EE candidates with as little as 60 SINP points" },
      { name: "Manitoba", reason: "MPNP Skilled Worker streams accept candidates without high CRS" },
      { name: "Atlantic Canada", reason: "AIP requires only a job offer and CLB 4–5" },
    ],
    whoFor: "Applicants under 30 willing to study in Canada, or experienced workers with a Canadian job offer in Saskatchewan, Manitoba or Atlantic Canada.",
    whoNotFor: "Applicants over 40 with no Canadian education plans, no job offer, and no intent to improve language scores.",
    expectedTimeline: "2–5 years (study route) or 12–24 months (PNP with job offer)",
    faqs: [
      { q: "Can I get Canada PR with a CRS score under 350?", a: "Not through general Express Entry draws. You'll need a PNP nomination (+600 points), a Canadian study permit leading to PGWP and CEC, or an LMIA-based work permit. Combining a PNP nomination with Express Entry is the most reliable route." },
      { q: "Which province is easiest with a low CRS?", a: "Saskatchewan SINP, Manitoba MPNP and the Atlantic Immigration Program are the most accessible — they don't require Express Entry profiles or high CRS scores." },
      { q: "Should I retake IELTS if my CRS is below 350?", a: "Yes — improving from CLB 7 to CLB 9 can add 70–124 CRS points, often the fastest single boost. Combined with a PNP nomination, this can take you above 600." },
    ],
  },
  {
    slug: "350-400",
    label: "350 – 400",
    range: "350 – 400",
    realityCheck:
      "A score of 350–400 is below the general Express Entry cutoff (typically 430+). Your best move is to add a PNP nomination (+600 points) — virtually guaranteeing an invitation. Several provinces actively nominate candidates in this range.",
    bestStrategies: [
      { title: "Provincial Nominee Program (PNP)", detail: "A nomination adds 600 CRS points — instantly putting you above 950 and into the next draw." },
      { title: "Improve language to CLB 9", detail: "Adds 50–100 CRS points across all factors." },
      { title: "Add Canadian work experience", detail: "1 year of NOC TEER 0/1/2/3 Canadian work experience can add 35–80 points." },
      { title: "Get spouse credentials assessed", detail: "Spouse education and language can add 10–40 points." },
    ],
    recommendedPathways: [
      "Provincial Nominee Program (Express Entry-aligned streams)",
      "Ontario OINP Human Capital Priorities",
      "BC PNP Tech Pilot",
      "Alberta AAIP Express Entry Stream",
    ],
    topProvinces: [
      { name: "Ontario", reason: "OINP HCP issues NOIs to EE candidates with 350–470 CRS in tech and healthcare" },
      { name: "British Columbia", reason: "BC PNP Tech runs weekly invites with tech-NOC-specific cutoffs" },
      { name: "Alberta", reason: "AAIP issues NOIs to candidates with CRS 300+ in priority sectors" },
      { name: "Saskatchewan", reason: "SINP Express Entry sub-category for in-demand occupations" },
    ],
    whoFor: "Skilled workers in tech, healthcare, engineering or trades who can target province-specific PNP streams.",
    whoNotFor: "Applicants whose occupation is not on any provincial in-demand list and who have no Canadian connections.",
    expectedTimeline: "12–18 months (PNP nomination + Express Entry processing)",
    faqs: [
      { q: "Can I get PR with CRS 350–400?", a: "Yes — through a Provincial Nominee Program. A PNP nomination adds 600 CRS points, taking your total above 950 and securing an Invitation to Apply in the next general draw." },
      { q: "Which PNPs target CRS 350–400 candidates?", a: "Ontario OINP, BC PNP, Alberta AAIP and Saskatchewan SINP all run streams that nominate Express Entry candidates in this range, particularly in tech, healthcare and trades." },
      { q: "How long until I get PR with CRS 380?", a: "Typically 12–18 months: 4–8 months for PNP nomination, then 6 months for Express Entry processing after the +600-point ITA." },
    ],
  },
  {
    slug: "400-450",
    label: "400 – 450",
    range: "400 – 450",
    realityCheck:
      "A score of 400–450 is borderline for general Express Entry — recent draws have varied between 430 and 490. You're competitive in category-based draws (healthcare, STEM, trades, transport, agriculture, French) and a strong PNP candidate.",
    bestStrategies: [
      { title: "Apply for category-based draws", detail: "Healthcare, STEM, trades, transport, agriculture and French speakers see cutoffs as low as 379." },
      { title: "Pursue a PNP nomination", detail: "Adds 600 points — guarantees an ITA even if your CRS dips." },
      { title: "Boost language to CLB 10", detail: "Maximum language points add up to 124 CRS — pushes you well above 500." },
      { title: "Get a valid LMIA job offer", detail: "Adds 50–200 CRS points." },
    ],
    recommendedPathways: [
      "Express Entry — Category-Based Draws (STEM, healthcare, trades, transport, agriculture, French)",
      "Provincial Nominee Program",
      "LMIA Work Permit + CRS boost",
    ],
    topProvinces: [
      { name: "Ontario", reason: "OINP HCP and Tech Draws actively nominate EE candidates with 400+ CRS" },
      { name: "British Columbia", reason: "BC PNP Skilled Worker stream runs weekly draws" },
      { name: "Quebec", reason: "Quebec Skilled Worker (PSTQ) — separate from Express Entry, no CRS dependency" },
      { name: "Alberta", reason: "AAIP Alberta Express Entry stream nominates 400+ CRS candidates in priority sectors" },
    ],
    whoFor: "Mid-career professionals in tech, healthcare, engineering, trades or transport who can target both general and category-based draws.",
    whoNotFor: "Applicants who refuse to retake IELTS or pursue PNP — these are your highest-impact moves.",
    expectedTimeline: "6–14 months",
    faqs: [
      { q: "Is CRS 400–450 enough for Canada PR?", a: "It's competitive in category-based draws (healthcare, STEM, trades, transport, agriculture and French speakers) where cutoffs range 379–470. For general draws (typically 430–490), you may need a PNP nomination (+600 points) or a CRS boost." },
      { q: "Should I wait for my CRS to improve?", a: "Apply now to a PNP and to category-based draws — your profile is competitive. Simultaneously, work on language (CLB 10) and additional work experience to push your score into the safe 470+ zone." },
      { q: "Which category-based draws should I target?", a: "Healthcare (NOC 31301, 33102), STEM (21232, 21211, 21300), trades (72106, 72200, 72310), transport (73300), agriculture (82030) and French speakers — all see cutoffs as low as 379." },
    ],
  },
  {
    slug: "450-plus",
    label: "450+",
    range: "450+",
    realityCheck:
      "A CRS above 450 is highly competitive. You're well-positioned for general Express Entry draws (recent cutoffs 430–490) and almost certain to receive an ITA in category-based draws. Focus on filing a strong, error-free application.",
    bestStrategies: [
      { title: "Lock in your top language score", detail: "If you're below CLB 10, one more retake can push you well above 500 — adds future-proofing." },
      { title: "Have all documents ready before ITA", detail: "ITA gives only 60 days — pre-collect WES, IELTS, employment letters, police clearances and proof of funds." },
      { title: "Consider PNP only as backup", detail: "You don't need it for an ITA, but a nomination eliminates any risk if cutoffs spike." },
    ],
    recommendedPathways: [
      "Express Entry — General Draw",
      "Express Entry — Category-Based Draw (if applicable)",
      "Canadian Experience Class (if you have 1+ year Canadian work)",
    ],
    topProvinces: [
      { name: "Ontario", reason: "Largest job market and PR landings — Toronto, Brampton, Mississauga" },
      { name: "British Columbia", reason: "Tech hub Vancouver — strong demand for 21232, 21233, 21234" },
      { name: "Alberta", reason: "No provincial sales tax + strong energy/tech sector salaries" },
    ],
    whoFor: "Skilled workers with strong language (CLB 9+), advanced education, 3+ years of NOC TEER 0/1 work experience and ideally Canadian education or work history.",
    whoNotFor: "No one — at 450+ you're a strong candidate. Just focus on a clean, complete application.",
    expectedTimeline: "6–8 months from ITA to PR",
    faqs: [
      { q: "Will I get an ITA with CRS 450+?", a: "Yes, almost certainly. Recent general Express Entry draws have had cutoffs between 430–490. CRS 450+ candidates regularly receive ITAs, and category-based draws (healthcare, STEM, trades, transport, French) accept much lower scores." },
      { q: "How long does PR take after ITA?", a: "IRCC's Express Entry service standard is 6 months from receipt of complete application. Most applicants receive PR confirmation in 4–8 months after ITA." },
      { q: "Should I still pursue a PNP at CRS 450+?", a: "Optional. A PNP nomination eliminates risk if cutoffs spike, but with a 450+ CRS and category-based draws available, most candidates receive an ITA without PNP." },
    ],
  },
];

export const findCRSBand = (slug: string) => crsBands.find((b) => b.slug === slug);