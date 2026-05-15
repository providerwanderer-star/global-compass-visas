// Wave 8C — Program-vs-program comparisons: /vs/:comparison
export type VsSlug =
  | "express-entry-vs-pnp"
  | "cec-vs-fsw"
  | "study-permit-vs-work-permit"
  | "lmia-vs-lmia-exempt"
  | "pgp-vs-super-visa"
  | "pr-vs-citizenship";

export interface VsRow { feature: string; a: string; b: string }
export interface VsGuide {
  slug: VsSlug;
  name: string;
  shortName: string;
  oneLiner: string;
  optionA: string;
  optionB: string;
  rows: VsRow[];
  chooseA: string[];
  chooseB: string[];
  faqs: { q: string; a: string }[];
}

const mk = (
  slug: VsSlug, name: string, shortName: string, oneLiner: string,
  optionA: string, optionB: string,
  rows: [string, string, string][],
  chooseA: string[], chooseB: string[],
  faqs: [string, string][],
): VsGuide => ({
  slug, name, shortName, oneLiner, optionA, optionB,
  rows: rows.map(([feature, a, b]) => ({ feature, a, b })),
  chooseA, chooseB,
  faqs: faqs.map(([q, a]) => ({ q, a })),
});

export const VS: Record<VsSlug, VsGuide> = {
  "express-entry-vs-pnp": mk(
    "express-entry-vs-pnp",
    "Express Entry vs PNP — Which Path to Canadian PR?",
    "Express Entry vs PNP",
    "Express Entry is faster and federal; PNP is province-specific and gives a +600 CRS boost. Here's how to choose.",
    "Express Entry", "PNP",
    [
      ["Processing time", "5-8 months", "8-14 months (province + federal)"],
      ["Cost", "CAD 1,365", "CAD 1,800-3,500"],
      ["Job offer required", "No (helpful)", "Yes for most streams"],
      ["Where you can settle", "Anywhere in Canada", "Must intend to live in nominating province"],
      ["CRS boost", "None", "+600 if EE-aligned PNP"],
      ["Eligibility", "67/100 FSW points + 470+ CRS realistic", "Province-specific scoring"],
    ],
    ["Your CRS is 470+ already", "You don't have a Canadian job offer", "You want flexibility on where to live"],
    ["Your CRS is below 470", "You have a job offer in a specific province", "You're targeting a tech-friendly province (BC, ON, AB)"],
    [
      ["Can I do both at the same time?", "Yes. Submit an EE profile and apply to PNPs in parallel. A nomination boosts your EE score by 600."],
      ["Which is more reliable?", "PNP is more reliable if your CRS is low — provinces select based on local needs, not pure CRS competition."],
    ],
  ),
  "cec-vs-fsw": mk(
    "cec-vs-fsw",
    "CEC vs FSW — Express Entry Stream Comparison",
    "CEC vs FSW",
    "Canadian Experience Class is for applicants with Canadian work experience; Federal Skilled Worker is for overseas candidates.",
    "CEC", "FSW",
    [
      ["Where work experience must be", "Inside Canada (1+ year)", "Anywhere (1+ year)"],
      ["Settlement funds proof", "Not required", "Required (CAD 14,690 single)"],
      ["Language minimum", "CLB 7 (NOC TEER 0-1) / CLB 5 (TEER 2-3)", "CLB 7 across all NOCs"],
      ["FSW 67-point grid", "Exempt", "Must score 67/100"],
      ["Processing time", "5-6 months", "6-8 months"],
      ["Typical applicant", "Former student on PGWP", "Skilled worker overseas"],
    ],
    ["You have 1+ year of Canadian work experience", "You're on a PGWP and want to convert to PR", "You don't want to prove settlement funds"],
    ["You're applying from outside Canada", "Your work experience is foreign", "You can prove the required CAD 14,690+ settlement funds"],
    [
      ["Can I have both Canadian and foreign experience?", "Yes — you can apply via CEC if you have 1+ year in Canada, and your foreign experience still adds CRS points."],
      ["Is FSW being phased out?", "No, but Category-Based Selection (French, healthcare, STEM) has dominated FSW draws since 2023."],
    ],
  ),
  "study-permit-vs-work-permit": mk(
    "study-permit-vs-work-permit",
    "Study Permit vs Work Permit — Which to Apply For?",
    "Study vs Work Permit",
    "Study permits give you PGWP eligibility and a path to PR; work permits give faster income but no automatic PR pathway.",
    "Study Permit", "Work Permit",
    [
      ["Cost upfront", "CAD 30,000+ (tuition + GIC)", "CAD 1,000 (employee out-of-pocket)"],
      ["Income while in Canada", "20 hrs/week off-campus", "Full-time at sponsor employer"],
      ["Path to PR", "PGWP → CEC (very strong)", "CEC after 1 year (if NOC TEER 0-3)"],
      ["Family", "Spouse can get OWP if you're in master's/PhD or pilot program", "Spouse OWP only for TEER 0-1 jobs (post-2024)"],
      ["Timeline to PR", "3-5 years total", "2-3 years total (if LMIA-backed)"],
      ["Risk", "Tuition wasted if studies don't lead to PR", "Job loss = permit invalid"],
    ],
    ["You're under 30 and can afford tuition", "You don't have a job offer in Canada yet", "You want to build a Canadian education credential"],
    ["You have a Canadian job offer with LMIA", "You can't afford CAD 30k+ tuition", "You want to start earning quickly"],
    [
      ["Can I switch from work permit to study permit?", "Yes — apply for a study permit while on your work permit. You'll need an LOA from a DLI."],
      ["Which is faster to PR?", "Work permit + CEC is usually faster (2-3 years) than study permit + PGWP + CEC (3-5 years), but study route has higher PR success rates."],
    ],
  ),
  "lmia-vs-lmia-exempt": mk(
    "lmia-vs-lmia-exempt",
    "LMIA vs LMIA-Exempt Work Permit — What's the Difference?",
    "LMIA vs LMIA-Exempt",
    "LMIA-backed permits require a labour market test and bring +50 CRS; LMIA-exempt permits (IMP) are faster but don't add CRS points.",
    "LMIA-Backed", "LMIA-Exempt (IMP)",
    [
      ["Who pays the LMIA fee", "Employer (CAD 1,000)", "N/A — no LMIA"],
      ["Processing time", "4-6 months ESDC + 10-18 weeks IRCC", "10-18 weeks IRCC only"],
      ["CRS boost", "+50 (TEER 1-3) or +200 (TEER 0 senior management)", "0"],
      ["Permit type", "Employer-specific (closed)", "Often open or employer-specific"],
      ["Examples", "Most overseas hires, low-wage roles", "Spousal OWP, IEC, intra-company transfer, PGWP, CUSMA, GTS"],
    ],
    ["You need the +50 CRS boost for Express Entry", "Your employer is willing to fund the LMIA process", "You're outside Canada with no other pathway"],
    ["You qualify for spousal OWP, IEC, or PGWP", "You want to start work fast", "You're an intra-company transferee"],
    [
      ["Does an LMIA guarantee PR?", "No, but +50 CRS often pushes Express Entry candidates above the cutoff."],
      ["Is the Global Talent Stream LMIA or LMIA-exempt?", "GTS uses an expedited LMIA (2-week processing) — it is LMIA-backed, just faster."],
    ],
  ),
  "pgp-vs-super-visa": mk(
    "pgp-vs-super-visa",
    "PGP vs Super Visa — Bringing Parents to Canada",
    "PGP vs Super Visa",
    "PGP gives parents Canadian PR but is lottery-based; Super Visa is a 5-year multiple-entry visit visa with no lottery.",
    "PGP (Permanent Residence)", "Super Visa (Visit Visa)",
    [
      ["Status granted", "Permanent residence", "Visitor (up to 5 years per stay)"],
      ["Selection", "Annual lottery", "Apply anytime"],
      ["Processing time", "20-24 months after lottery win", "8-12 weeks"],
      ["Cost", "~CAD 1,000 application + RPRF", "CAD 100 + medical insurance ~CAD 1,000-3,000/year"],
      ["Sponsor income (LICO)", "Must meet for 3 consecutive years", "Must meet for current year"],
      ["Healthcare access", "Provincial health card after 3 months", "Private medical insurance required"],
      ["Path to citizenship", "Yes (after 3 years residency)", "No"],
    ],
    ["Your parents want permanent status", "You can prove 3 years of LICO+ income", "You're willing to wait years and play the lottery"],
    ["You want to bring parents now", "You can't meet 3 years of LICO", "Your parents want to spend extended time but keep their home country status"],
    [
      ["Can my parents apply for both?", "Yes — apply for Super Visa now to bring them quickly, and submit Interest to Sponsor when the PGP window opens."],
      ["What is LICO?", "Low Income Cut-Off — IRCC's income threshold based on family size. Roughly CAD 50,000 for a family of 4, higher in expensive cities."],
    ],
  ),
  "pr-vs-citizenship": mk(
    "pr-vs-citizenship",
    "Permanent Residence vs Canadian Citizenship",
    "PR vs Citizenship",
    "PR gives you nearly all the rights of a citizen — except voting, a Canadian passport, and protection from deportation.",
    "PR", "Citizenship",
    [
      ["Right to vote", "No", "Yes (federal, provincial, municipal)"],
      ["Canadian passport", "No (keep home-country passport)", "Yes"],
      ["Right to leave and re-enter", "Conditional — must meet 2/5 year residency", "Unconditional"],
      ["Deportation risk", "Possible for serious criminal offences", "None (almost — denaturalisation is rare)"],
      ["Dual citizenship", "N/A", "Yes — Canada permits dual citizenship"],
      ["Time to qualify", "From day 1 of landing", "1,095 days physically present in last 5 years"],
      ["Cost", "Already paid in PR", "CAD 630 (adult)"],
    ],
    ["You want low-cost legal status with most rights", "You plan to keep ties to your home country", "You haven't met 1,095-day physical presence yet"],
    ["You want to vote", "You travel internationally often (Canadian passport is stronger)", "You want zero deportation risk"],
    [
      ["Do I have to renounce my home citizenship?", "Not from Canada's side — Canada allows dual citizenship. Some countries (India, China) restrict it on their side."],
      ["Can I lose PR if I take citizenship of another country?", "No — taking another citizenship doesn't affect Canadian PR or Canadian citizenship."],
    ],
  ),
};

export const VS_LIST = Object.values(VS);
export function getVs(slug: string | undefined): VsGuide | null {
  if (!slug) return null;
  return VS[slug as VsSlug] ?? null;
}
