// Wave 9C — Bringing family / dependents: /bring-family/:relation
export type FamilySlug =
  | "spouse-on-work-permit"
  | "spouse-on-study-permit"
  | "dependent-children"
  | "parents-visit"
  | "parents-pr"
  | "siblings"
  | "common-law-partner"
  | "same-sex-spouse";

export interface FamilyGuide {
  slug: FamilySlug;
  name: string;
  shortName: string;
  oneLiner: string;
  whoQualifies: string;
  permitOrVisa: string;
  processingTime: string;
  cost: string;
  steps: string[];
  pitfalls: string[];
  faqs: { q: string; a: string }[];
}

const mk = (
  slug: FamilySlug, name: string, shortName: string, oneLiner: string,
  whoQualifies: string, permitOrVisa: string, processingTime: string, cost: string,
  steps: string[], pitfalls: string[],
  faqs: [string, string][],
): FamilyGuide => ({
  slug, name, shortName, oneLiner, whoQualifies, permitOrVisa, processingTime, cost,
  steps, pitfalls,
  faqs: faqs.map(([q, a]) => ({ q, a })),
});

export const FAMILY: Record<FamilySlug, FamilyGuide> = {
  "spouse-on-work-permit": mk(
    "spouse-on-work-permit",
    "Spouse Open Work Permit (SOWP) — Worker's Spouse in Canada",
    "Spouse on Work Permit",
    "Spouses of Canadian work permit holders can get an open work permit (SOWP) — but the 2024 rules restricted eligibility to TEER 0-1 occupations.",
    "Spouse / common-law partner of a foreign worker in Canada whose work permit is in NOC TEER 0-1 (post-Jan 2024 rule) and at least 16 months remaining.",
    "Open Work Permit — work for any employer, anywhere in Canada.",
    "8-12 weeks (online), 4-5 months (paper).",
    "CAD 255 (work permit fee + open work permit holder fee).",
    [
      "Confirm the principal worker holds a TEER 0-1 work permit with 16+ months left",
      "Gather marriage certificate or 12-month cohabitation evidence",
      "Submit IMM 1295 + IMM 5710 with relationship proof and copy of principal's work permit",
      "Pay CAD 255 fees + biometrics CAD 85 if not already given",
      "Receive permit and start working — no LMIA, no employer restriction",
    ],
    [
      "Principal worker is in a TEER 2-5 occupation — spouse no longer qualifies",
      "Less than 16 months remaining on principal's permit at SOWP application",
      "Treating common-law as marriage without 12 months of continuous cohabitation",
      "Forgetting to renew SOWP when principal's permit is renewed",
    ],
    [
      ["What changed for SOWPs in 2024?", "From January 22 2024, only spouses of TEER 0-1 workers qualify (plus some healthcare/trades pilots). Spouses of TEER 2-5 workers are no longer eligible."],
      ["Can my spouse work full-time on the SOWP?", "Yes — it's an open work permit. Any employer, any hours, anywhere in Canada (with limited employer exclusions in healthcare-vulnerable settings)."],
    ],
  ),
  "spouse-on-study-permit": mk(
    "spouse-on-study-permit",
    "Spouse Open Work Permit for Student's Spouse",
    "Spouse on Study Permit",
    "Spouses of Canadian students can get an open work permit only if the student is in a master's, doctoral or eligible professional program (post-Mar 2024 rule).",
    "Spouse / common-law partner of an international student enrolled full-time in a master's, doctoral, or eligible professional program (law, medicine, dentistry, veterinary, etc.).",
    "Open Work Permit.",
    "8-12 weeks. Permit valid for the student's program length.",
    "CAD 255.",
    [
      "Confirm student is in an eligible master's / PhD / professional program",
      "Gather LOA + study permit + enrolment letter showing program type",
      "Submit SOWP application with marriage / common-law evidence",
      "Pay fees + biometrics if needed",
      "Spouse starts working — full-time, any employer",
    ],
    [
      "Student is in a bachelor's, college diploma or certificate program — spouse no longer qualifies",
      "Master's program is shorter than 16 months — some IRCC offices still issue, others refuse",
      "Filing the spouse SOWP before the student's permit is approved",
      "Common-law without proper 12-month cohabitation evidence",
    ],
    [
      ["Can the spouse of an undergraduate student get a work permit?", "Generally no, since March 2024. Bachelor's and college program spouses must use visitor status or apply for their own work/study permit."],
      ["What about the SOWP if the student moves to PGWP?", "When the student transitions to PGWP and is in a TEER 0-1 job, you re-apply for a SOWP under the worker rules."],
    ],
  ),
  "dependent-children": mk(
    "dependent-children",
    "Bringing Dependent Children to Canada",
    "Dependent Children",
    "Dependent children of work or study permit holders can join you in Canada — younger than 22 and unmarried, or 22+ if dependent due to a disability.",
    "Biological / adopted children under 22 (and unmarried). Children 22+ qualify only if financially dependent due to a physical/mental condition.",
    "Visitor visa or study permit (children in K-12 don't need a study permit if a parent has a valid work or study permit).",
    "8-12 weeks for visa; minor children can land alongside parent.",
    "CAD 100 visitor visa per child; study permit CAD 150 if applied separately.",
    [
      "Confirm child is under 22 and unmarried (lock-in age preserved by your PR application date)",
      "Apply for accompanying-family visitor visa or study permit alongside your application",
      "Provide birth certificates + custody documents (especially if one parent is not travelling)",
      "Notarized consent letter from non-travelling parent",
      "On arrival: enrol in public school (free K-12 if a parent has a valid permit)",
    ],
    [
      "Child turning 22 mid-process — age is locked at the date IRCC receives a complete application",
      "Missing custody documents in shared-custody divorces — refusal trigger",
      "Trying to add a married child as a dependent (not eligible)",
      "Forgetting biometrics for children 14+ years old",
    ],
    [
      ["Do my kids need a study permit?", "Minor children of valid work/study permit holders can attend K-12 school without a study permit. They need one for college/university."],
      ["Is school free?", "Public K-12 is free for accompanying minor children of work/study permit holders. Tuition for adult dependents (university) is international rates."],
    ],
  ),
  "parents-visit": mk(
    "parents-visit",
    "Parents & Grandparents Super Visa — Long-Term Visit",
    "Parents Visit (Super Visa)",
    "The Super Visa is a 10-year multiple-entry visa letting parents and grandparents stay up to 5 years per entry. No lottery — apply anytime.",
    "Parents and grandparents of Canadian citizens or PRs.",
    "Multiple-entry visit visa, valid 10 years, max 5-year stay per entry.",
    "8-12 weeks.",
    "CAD 100 visa fee + medical insurance ~CAD 1,000-3,000/year (mandatory).",
    [
      "Sponsor (child/grandchild) confirms they meet LICO income for current year",
      "Buy CAD 100,000+ medical insurance from a Canadian insurer, valid 1+ year",
      "Parent gets medical exam from IRCC-panel physician",
      "Submit Super Visa application with sponsor's invitation letter + tax assessments",
      "On approval, parent flies in and is admitted for up to 5 years per stay",
    ],
    [
      "Buying foreign insurance — IRCC accepts only Canadian-issued or specifically approved foreign policies (since 2022)",
      "Sponsor income below LICO for the most recent tax year",
      "Medical exam not done in advance — slows processing",
      "Forgetting to renew insurance — Super Visa requires continuous coverage",
    ],
    [
      ["Super Visa vs visitor visa — what's the difference?", "Super Visa lets you stay 5 years per entry vs 6 months on a regular visitor visa. Super Visa requires CAD 100k medical insurance and sponsor LICO."],
      ["Can my parents work on a Super Visa?", "No — it's a visitor visa. They can volunteer and stay long-term but cannot work for pay."],
    ],
  ),
  "parents-pr": mk(
    "parents-pr",
    "Parents & Grandparents Program (PGP) — PR for Parents",
    "Parents PR (PGP)",
    "PGP gives parents and grandparents Canadian PR — but it's lottery-based with limited spots. Sponsor must meet LICO+30% for 3 consecutive years.",
    "Parents and grandparents of Canadian citizens / PRs whose sponsor meets income requirements.",
    "Permanent residence.",
    "20-24 months after lottery selection.",
    "CAD 1,135 per person + RPRF CAD 575.",
    [
      "Submit Interest to Sponsor form when IRCC opens the window (typically October)",
      "Wait for the lottery — IRCC randomly selects from the pool",
      "If invited, file full sponsorship within 60 days",
      "Sponsor proves LICO+30% for 3 consecutive tax years (Notice of Assessment)",
      "Parents complete medical exam + police clearances; PR confirmation in 20-24 months",
    ],
    [
      "Submitting Interest to Sponsor outside the open window",
      "Sponsor income below LICO+30% for any of the 3 required years",
      "Sponsor receiving social assistance (other than disability) — disqualifies",
      "Treating Super Visa as a fallback only after PGP refusal — apply for both in parallel",
    ],
    [
      ["What's the LICO+30% requirement?", "Low Income Cut-Off plus 30%. For a family of 4 sponsoring 2 parents (family size 6), roughly CAD 92,000 minimum gross income for 2024."],
      ["What if I'm not selected in the PGP lottery?", "Apply for the Super Visa instead — no lottery, faster processing, parents can stay 5 years per visit and re-enter for 10 years."],
    ],
  ),
  "siblings": mk(
    "siblings",
    "Sponsoring Siblings to Canada — When It's Possible",
    "Siblings",
    "You generally cannot sponsor adult siblings unless you have no other close relatives to sponsor and meet the lonely-Canadian rule.",
    "Orphaned brother, sister, niece, nephew or grandchild under 18 + unmarried, OR a sibling in the lonely-Canadian-sponsor scenario.",
    "Permanent residence.",
    "12-24 months.",
    "CAD 1,135 per person + RPRF CAD 575 if 18+.",
    [
      "Confirm eligibility: orphaned + under-18 sibling, OR you have no spouse, no parent, no child you could otherwise sponsor",
      "File sponsorship undertaking + IMM 1344",
      "Provide death certificates of parents (orphaned siblings) or proof of no other relatives (lonely Canadian)",
      "Submit PR application with police clearances + medical",
      "On approval, sibling lands as PR",
    ],
    [
      "Adult siblings outside the lonely-Canadian rule — generally not sponsorable",
      "Missing parent death certificates for orphaned siblings",
      "Sibling already 18+ when application submitted — disqualifies the orphan path",
      "Confusion with the older 'Other Relative' Express Entry +15 CRS bonus (still exists, but doesn't make adult siblings sponsorable as PRs)",
    ],
    [
      ["Can I sponsor my adult brother?", "Only if you have no spouse, common-law partner, parent, grandparent, child, grandchild or other Canadian relative you could otherwise sponsor. Very narrow."],
      ["Does having a sibling in Canada help with Express Entry?", "Yes — +15 CRS points if you have a Canadian citizen / PR sibling who is at least 18 and resides in Canada."],
    ],
  ),
  "common-law-partner": mk(
    "common-law-partner",
    "Sponsoring a Common-Law Partner",
    "Common-Law Partner",
    "Common-law partners qualify for spousal sponsorship after 12 months of continuous cohabitation in a marriage-like relationship.",
    "A partner with whom you have cohabited continuously for at least 12 months in a conjugal relationship.",
    "Permanent residence.",
    "12-18 months (inland) or 12 months (outland).",
    "CAD 1,135 + RPRF CAD 575.",
    [
      "Document 12 months of continuous cohabitation (joint lease, utilities, bank accounts)",
      "Build a relationship file: photos, communication, joint travel, family knowledge",
      "Choose inland (with OWP) or outland (faster, can travel) sponsorship",
      "File IMM 1344 + IMM 5532 + IMM 0008 with full documentation",
      "Receive AOR → biometrics → medical → PR confirmation",
    ],
    [
      "Counting cohabitation that wasn't continuous — IRCC requires unbroken 12-month period",
      "Insufficient relationship evidence (relying only on a Statutory Declaration of Common-Law)",
      "Long periods of separation due to work — must explain and prove relationship continued",
      "Failing to update IRCC if you marry mid-application",
    ],
    [
      ["What counts as continuous cohabitation?", "Living together in the same home for 12 unbroken months. Short trips don't break it. Long forced separations (work, immigration) need detailed explanation."],
      ["Common-law vs conjugal partner — what's the difference?", "Common-law requires 12 months living together. Conjugal partner is for couples who couldn't live together due to immigration or marriage barriers — much harder to prove."],
    ],
  ),
  "same-sex-spouse": mk(
    "same-sex-spouse",
    "Same-Sex Spouse Sponsorship to Canada",
    "Same-Sex Spouse",
    "Canada recognizes same-sex marriages and common-law relationships for immigration. Sponsorship rules are identical to opposite-sex couples.",
    "Same-sex spouse (legally married in Canada or another jurisdiction recognizing the marriage), common-law partner, or conjugal partner.",
    "Permanent residence.",
    "12-18 months.",
    "CAD 1,135 + RPRF CAD 575.",
    [
      "Confirm marriage validity (Canada accepts same-sex marriages from countries where they are legal)",
      "If home country doesn't recognize same-sex marriage, apply via common-law (12 months cohabitation) or conjugal partner stream",
      "Build a strong relationship file — IRCC pays close attention to genuineness",
      "File full sponsorship package + medical + police checks",
      "Receive PR confirmation",
    ],
    [
      "Marriage performed in a country that doesn't legally recognize it — Canada won't accept the marriage certificate",
      "Conjugal partner stream attempted without proving immigration / legal barrier to cohabitation",
      "Light relationship documentation — same-sex couples sometimes face additional scrutiny",
      "Forgetting to disclose previous opposite-sex marriages or partnerships",
    ],
    [
      ["Does Canada recognize my same-sex marriage from another country?", "Yes, if the marriage was legal in the country where it was performed. If your home country doesn't allow same-sex marriage, you typically apply as common-law."],
      ["Conjugal partner pathway — when do I use it?", "Only if you cannot marry and cannot cohabit for 12 months due to a legal barrier (e.g. same-sex relationships criminalized, or immigration prevents living together)."],
    ],
  ),
};

export const FAMILY_LIST = Object.values(FAMILY);
export function getFamily(slug: string | undefined): FamilyGuide | null {
  if (!slug) return null;
  return FAMILY[slug as FamilySlug] ?? null;
}