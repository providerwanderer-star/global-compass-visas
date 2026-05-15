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

/* ─── Sprint E expansion: 4 finer-grained CRS bands ─── */

const additionalBands: CRSBand[] = [
  {
    slug: "350-400",
    label: "350 – 400",
    range: "350 – 400",
    realityCheck:
      "CRS 350–400 is below current general Express Entry cutoffs (430–490), but you're a strong PNP candidate, especially in Saskatchewan, Manitoba, and the Atlantic provinces. Category-based draws (Trades, Agriculture, French) can reach this range.",
    bestStrategies: [
      { title: "Pursue PNP nomination", detail: "Saskatchewan SINP Occupation In-Demand and Manitoba MPNP Skilled Worker streams accept candidates in this range. +600 CRS guarantees an ITA." },
      { title: "Improve language to CLB 9", detail: "Going from CLB 7 to CLB 9 adds 70+ CRS points. Combined with PNP, this can take you above 600." },
      { title: "Add a TEER 0/1 work-experience year", detail: "Each additional year of skilled work adds 25–50 CRS points; a Canadian year doubles this." },
    ],
    recommendedPathways: [
      "Saskatchewan SINP Occupation In-Demand stream",
      "Manitoba PNP Skilled Worker stream",
      "Atlantic Immigration Program",
      "Express Entry — Trades / French / Agriculture category-based draws",
    ],
    topProvinces: [
      { name: "Saskatchewan", reason: "SINP nominates non-EE candidates with as little as 60 SINP points" },
      { name: "Manitoba", reason: "MPNP draws regularly invite candidates with low federal CRS" },
      { name: "New Brunswick", reason: "NBPNP and AIP welcome trades, healthcare, and hospitality workers" },
    ],
    whoFor: "Skilled tradespeople, French speakers, and applicants willing to settle in less-populated provinces.",
    whoNotFor: "Applicants targeting only Toronto/Vancouver without PNP or job offer.",
    expectedTimeline: "12–18 months via PNP",
    faqs: [
      { q: "Can I get PR with CRS 350–400?", a: "Yes, primarily through PNP. A provincial nomination adds 600 CRS, virtually guaranteeing an Express Entry ITA. Category-based draws in Trades, Agriculture and French can also reach this range." },
      { q: "Which province should I target?", a: "Saskatchewan, Manitoba, and the Atlantic provinces (NB, NS, PEI, NL) have the lowest thresholds. They actively nominate candidates with strong job-market alignment regardless of CRS." },
      { q: "How long does PR take with PNP at 350–400?", a: "PNP nomination: 3–6 months. Federal Express Entry processing after nomination: 6 months. Total: 12–18 months from PNP application to PR." },
    ],
  },
  {
    slug: "400-450",
    label: "400 – 450",
    range: "400 – 450",
    realityCheck:
      "CRS 400–450 is the borderline zone. Category-based Express Entry draws (Healthcare, STEM, Trades, Transport, French) regularly invite candidates here, but general draws typically require 470+. PNP nomination is the most reliable path.",
    bestStrategies: [
      { title: "Apply to category-based draws", detail: "Healthcare (recent cutoff 422–435), STEM (479+), Trades (355–360), Transport (435), French (379) — much lower than general draws." },
      { title: "Target PNP nomination", detail: "Ontario OINP Tech Draw, BC PNP Tech, Alberta AAIP and Saskatchewan SINP regularly invite in this range." },
      { title: "Boost language one CLB band", detail: "Going from CLB 8 to CLB 9 can add 30–50 CRS points and unlock 50 spousal-language points if applicable." },
    ],
    recommendedPathways: [
      "Express Entry — Category-Based Draws (Healthcare, STEM, Trades, Transport, French)",
      "Ontario OINP Human Capital Priorities / Tech Draw",
      "BC PNP Skills Immigration / Tech",
      "Alberta AAIP Express Entry stream",
    ],
    topProvinces: [
      { name: "Ontario", reason: "OINP Tech Draws regularly invite EE candidates with CRS 430+" },
      { name: "British Columbia", reason: "BC PNP Tech invites tech workers with CRS 400+" },
      { name: "Alberta", reason: "AAIP welcomes EE candidates with provincial connection or job offer" },
    ],
    whoFor: "Skilled professionals in healthcare, STEM, trades or transport occupations, with strong language scores.",
    whoNotFor: "Applicants outside category-eligible NOCs without PNP strategy.",
    expectedTimeline: "6–12 months via category draw or PNP",
    faqs: [
      { q: "What's the realistic timeline for CRS 400–450?", a: "If you're in a category-eligible NOC (healthcare, STEM, trades, transport, French), expect an ITA within 3–6 months. PNP route adds 3–6 months for nomination plus 6 months federal processing." },
      { q: "Should I improve my CRS or pursue PNP?", a: "Both. Improving language from CLB 8 to CLB 9 takes 1–2 months and adds 30–50 points. Apply to PNPs concurrently — this maximizes your odds." },
      { q: "Which category-based draw should I target?", a: "Match your NOC to the category. Healthcare (NOC 31xxx) and Trades (NOC 72xxx, 73xxx) have the lowest cutoffs (350–435). STEM (NOC 21xxx) requires 479+." },
    ],
  },
  {
    slug: "500-plus",
    label: "500+",
    range: "500 and above",
    realityCheck:
      "CRS 500+ is well above current general draw cutoffs. You'll receive an ITA in the next general Express Entry draw with very high probability. Focus on application quality and document readiness.",
    bestStrategies: [
      { title: "Maintain your profile", detail: "Keep IELTS valid (within 2 years), update work-experience entries every 6 months, and ensure ECA is fresh (within 5 years)." },
      { title: "Prepare documents now", detail: "Pre-collect police clearances (valid 3 months), medicals (valid 12 months), proof of funds, and translations to submit within 60 days of ITA." },
      { title: "Skip PNP unless strategic", detail: "At 500+ CRS, PNP nomination adds processing time without changing outcome. Pursue PNP only if you have specific provincial ties." },
    ],
    recommendedPathways: [
      "Express Entry — Federal Skilled Worker Program (FSWP)",
      "Canadian Experience Class (CEC) if you have 1+ year Canadian work",
      "Federal Skilled Trades (FST) for tradespeople",
    ],
    topProvinces: [
      { name: "Ontario", reason: "Largest job market and most PR landings — Toronto, Mississauga, Ottawa" },
      { name: "British Columbia", reason: "Premium tech salaries in Vancouver and Victoria" },
      { name: "Alberta", reason: "No provincial sales tax, strong energy and tech sectors" },
    ],
    whoFor: "Highly skilled professionals: PhD holders, CLB 10+ language, 5+ years of skilled work, ideally with Canadian education or work experience.",
    whoNotFor: "No one — at 500+ CRS you're a top candidate. Focus on a flawless application.",
    expectedTimeline: "6 months from ITA to PR (IRCC service standard)",
    faqs: [
      { q: "Will I get an ITA at CRS 500+?", a: "Almost certainly in the next general Express Entry draw. Recent general cutoffs have been 430–490. CRS 500+ is comfortably above this range." },
      { q: "How fast can I get PR at CRS 500+?", a: "From profile creation to PR: 4–8 months in most cases. IRCC processes complete Express Entry applications within 6 months." },
      { q: "Should I still take French to boost CRS further?", a: "If you're already at 500+, no significant benefit unless you want to relocate to Quebec or qualify for French category-based draws." },
    ],
  },
];

crsBands.push(...additionalBands);

export const findCRSBand = (slug: string) => crsBands.find((b) => b.slug === slug);