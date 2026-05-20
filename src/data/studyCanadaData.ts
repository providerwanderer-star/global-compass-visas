// Wave 11B — International student lifecycle: /study-canada/:topic
export type StudyCanadaSlug =
  | "designated-learning-institutions"
  | "pgwp-eligible-programs"
  | "study-permit-cap-2025"
  | "provincial-attestation-letter"
  | "gic-50000-requirement"
  | "spouse-open-work-permit"
  | "off-campus-work-rules";

export interface StudyCanadaGuide {
  slug: StudyCanadaSlug;
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
  slug: StudyCanadaSlug, name: string, shortName: string, oneLiner: string,
  who: string, processingTime: string, fee: string, keyRule: string, outcome: string,
  steps: string[], pitfalls: string[],
  faqs: [string, string][],
): StudyCanadaGuide => ({
  slug, name, shortName, oneLiner, who, processingTime, fee, keyRule, outcome,
  steps, pitfalls, faqs: faqs.map(([q, a]) => ({ q, a })),
});

export const STUDYCANADA: Record<StudyCanadaSlug, StudyCanadaGuide> = {
  "designated-learning-institutions": mk(
    "designated-learning-institutions",
    "Designated Learning Institutions (DLI) — Full Canada List Explained",
    "DLI Explained",
    "A study permit is only issued for a Designated Learning Institution. Only PGWP-eligible DLIs lead to a post-graduation work permit.",
    "Prospective international students choosing a Canadian school.",
    "DLI list updated continuously by IRCC.",
    "No separate fee — verified during study permit application.",
    "DLI ≠ PGWP-eligible. Always check both the DLI number and the PGWP-eligibility flag on the IRCC list.",
    "A study permit at a DLI that is also PGWP-eligible — the gateway to working and applying for PR after graduation.",
    [
      "Open IRCC's DLI list and confirm the school has a DLI number",
      "Confirm the specific program is PGWP-eligible (not all programs at a DLI qualify)",
      "For Quebec: confirm the school is also on the MIFI list and obtain a CAQ",
      "Get the Letter of Acceptance using the school's DLI number",
      "Apply for the study permit citing the DLI number on the application form",
    ],
    [
      "Assuming all DLIs are PGWP-eligible — many private colleges are not",
      "Public-private partnership programs lost PGWP eligibility in 2024",
      "Switching to a non-DLI mid-study — voids study permit",
      "Quebec students missing MIFI/CAQ step — automatic study permit refusal",
    ],
    [
      ["What if my DLI is not PGWP-eligible?", "You can still get a study permit, but you won't qualify for a PGWP. Most students choose only PGWP-eligible institutions to keep PR options open."],
      ["Can I transfer between DLIs?", "Yes — but you must update IRCC in your account within 150 days of starting the new program."],
    ],
  ),
  "pgwp-eligible-programs": mk(
    "pgwp-eligible-programs",
    "PGWP-Eligible Programs in Canada (2025 Field-of-Study Rules)",
    "PGWP-Eligible Programs",
    "PGWP eligibility now depends on the DLI, program length, level of study, and from Nov 2024, the field of study for college graduates.",
    "International students choosing a college or university program.",
    "PGWP issued within 180 days of program completion.",
    "PGWP application fee CAD 255.",
    "University graduates: any program. College graduates: only programs aligned with long-term shortage occupations.",
    "Open work permit valid 1-3 years matching program length.",
    [
      "Confirm the DLI is PGWP-eligible on IRCC's list",
      "Check program length (minimum 8 months to qualify)",
      "If college program: verify it's on the PGWP field-of-study eligible list",
      "Maintain full-time student status throughout the program",
      "Apply for PGWP within 180 days of receiving final transcript",
    ],
    [
      "Choosing a college program not on the 2024 PGWP field list — no PGWP",
      "Dropping below full-time — invalidates PGWP eligibility",
      "Public-private partnership programs — excluded since Sept 2024",
      "Distance/online learning that exceeds 50% of program — risks PGWP refusal",
    ],
    [
      ["Are university programs still PGWP-eligible across the board?", "Yes — university degrees, including most master's and PhD programs, remain PGWP-eligible regardless of field. The Nov 2024 field restrictions apply only to college non-degree programs."],
      ["Can I get a 3-year PGWP for a 2-year program?", "Only if the program is bachelor's level or higher. Master's grads now receive a 3-year PGWP regardless of program length."],
    ],
  ),
  "study-permit-cap-2025": mk(
    "study-permit-cap-2025",
    "Canada Study Permit Cap 2025 — How the National Limit Works",
    "Study Permit Cap",
    "IRCC capped study permits at 437,000 for 2025 — a 10% cut from 2024 — split across provinces and managed via Provincial Attestation Letters.",
    "Every international student except PhD/master's applicants and minors at K-12 schools.",
    "Cap allocations renewed annually each January.",
    "No fee linked to the cap itself.",
    "Each province receives a quota; PALs/TALs are issued first-come, first-served within that quota.",
    "Once a province exhausts its quota, no new study permits issued until next cycle.",
    [
      "Apply early in the year — quotas fill quickly in Ontario and BC",
      "Confirm your DLI has access to your province's PAL/TAL allocation",
      "Get the PAL/TAL from the province before submitting the study permit application",
      "Submit the study permit application with the PAL/TAL attached",
      "Wait for IRCC decision — applications without PAL are returned",
    ],
    [
      "Applying without a PAL — application returned",
      "Assuming PhD/master's needs PAL — currently exempt",
      "Waiting until late in the year — provincial quotas often filled by Q3",
      "Confusing federal cap (437K national) with provincial allocation (varies)",
    ],
    [
      ["Does the cap apply to master's and PhD students?", "No — graduate-level students at universities are exempt for 2025, as are K-12 students and visiting/exchange students."],
      ["Will the cap continue into 2026?", "IRCC has signalled continued caps for 2026 with allocations roughly at 2025 levels. Plan applications early."],
    ],
  ),
  "provincial-attestation-letter": mk(
    "provincial-attestation-letter",
    "Provincial Attestation Letter (PAL/TAL) — How to Get One",
    "PAL / TAL",
    "A Provincial (or Territorial) Attestation Letter is now mandatory for almost every study permit. The province confirms you fit within its allocated cap.",
    "Almost all study permit applicants except master's/PhD and minor children.",
    "Issued in 2-6 weeks after DLI nominates the applicant.",
    "Most provinces do not charge a separate fee.",
    "PAL must be issued before the study permit is submitted; PAL is one-time-use and tied to a specific DLI.",
    "Letter of attestation that unlocks study permit submission.",
    [
      "Get a Letter of Acceptance from a Canadian DLI",
      "DLI submits attestation request to its province on your behalf",
      "Receive PAL (or TAL for territories) by email — usually 2-6 weeks",
      "Attach PAL to your study permit application within 12 months of issue",
      "Submit study permit application to IRCC",
    ],
    [
      "Applying for a study permit before receiving the PAL — application returned",
      "Trying to use a PAL at a different DLI than the one on the letter",
      "Letting the PAL expire (most are valid 12 months from issue)",
      "Quebec uses CAQ instead of PAL — different process entirely",
    ],
    [
      ["Who is exempt from the PAL requirement?", "Master's and PhD applicants at recognised universities, K-12 students, in-Canada extensions for ongoing students, and dependants of certain work/study permit holders."],
      ["How do I get a PAL?", "You can't apply directly — your DLI requests it from the province after they accept you. Follow up with the DLI's international office if delayed."],
    ],
  ),
  "gic-50000-requirement": mk(
    "gic-50000-requirement",
    "GIC Requirement for SDS — CAD 20,635 Proof of Funds",
    "GIC Requirement",
    "Student Direct Stream (SDS) applicants from India and 13 other countries must show a Guaranteed Investment Certificate (GIC) of CAD 20,635 with a participating Canadian bank.",
    "Indian and partner-country students applying via SDS for faster study permits.",
    "GIC purchased before applying; SDS processing 20-45 days.",
    "GIC investment CAD 20,635 (refundable after landing).",
    "GIC amount rose from CAD 10,000 to CAD 20,635 (1× LICO) in Jan 2024.",
    "Faster study permit processing under SDS — typically 20-45 days vs 8-15 weeks for regular stream.",
    [
      "Choose an SDS-approved Canadian bank (Scotiabank, ICICI Canada, CIBC, etc.)",
      "Open the GIC account online or via partner branch in India",
      "Wire CAD 20,635 to purchase the GIC",
      "Receive Investment Certificate / Investment Directions Confirmation (IDC)",
      "Attach IDC + tuition payment + IELTS + PAL to your SDS application",
    ],
    [
      "Buying GIC at a non-SDS bank — application kicked to regular stream",
      "Paying only first-semester tuition — SDS needs full first-year tuition",
      "Forgetting that GIC amount is now 1× LICO (CAD 20,635 in 2024) — old CAD 10,000 figure is outdated",
      "Not declaring the funds as ready-cash — must be liquid and in your name",
    ],
    [
      ["When do I get my GIC money back?", "After landing in Canada you receive CAD 2,000 immediately, then 10-12 monthly disbursements of about CAD 1,700 each for living expenses."],
      ["Can I apply for SDS without a GIC?", "No — the GIC is mandatory for SDS. Without it you must apply via the regular study permit stream and show alternative proof of funds."],
    ],
  ),
  "spouse-open-work-permit": mk(
    "spouse-open-work-permit",
    "Spousal Open Work Permit for International Students (2025 Rules)",
    "Student Spouse OWP",
    "From March 2025 the spousal open work permit is restricted to spouses of master's (16+ months), PhD, or specific shortage-occupation professional program students.",
    "Spouses and common-law partners of qualifying international students.",
    "Spousal OWP: 6-12 weeks processing.",
    "OWP fee CAD 255 + open work permit holder fee CAD 100.",
    "Spouses of college and short master's students are no longer eligible.",
    "Open work permit valid up to the length of the student's study permit — work for any employer.",
    [
      "Confirm the principal applicant is in an eligible program (master's 16+ months, PhD, or designated professional program)",
      "Submit spousal OWP application alongside or after the study permit",
      "Include marriage certificate or proof of common-law relationship (12+ months cohabitation)",
      "Include principal applicant's Letter of Acceptance and study permit/approval",
      "Spouse uses OWP to work in Canada with no employer restrictions",
    ],
    [
      "Applying when principal is in a college diploma — no longer eligible",
      "Common-law claim without 12 months continuous cohabitation evidence",
      "Master's program under 16 months — does not qualify under new rules",
      "Forgetting biometrics for spouse — leads to delays",
    ],
    [
      ["Can spouses of college students still get an OWP?", "No — since March 2025, college program spouses are excluded. Only master's (16+ months), PhD, and listed professional program students qualify."],
      ["Can my spouse work full-time while I study?", "Yes — the spousal OWP is an open work permit with no employer or hour restrictions."],
    ],
  ),
  "off-campus-work-rules": mk(
    "off-campus-work-rules",
    "International Student Off-Campus Work Rules — 24 Hours/Week",
    "Off-Campus Work",
    "Eligible international students can work up to 24 hours per week off-campus during academic sessions and unlimited hours during scheduled breaks — codified November 2024.",
    "Full-time students with a valid study permit at a DLI.",
    "No separate processing — work rights derive from study permit conditions.",
    "No additional fee.",
    "24 hours/week cap during sessions; unlimited during scheduled breaks (winter, summer, reading week).",
    "Lawful off-campus work + SIN + tax-filing eligibility.",
    [
      "Confirm your study permit lists 'may work 24 hours per week off campus' (or 20 hours pre-Nov 2024)",
      "Apply for a Social Insurance Number (SIN) at Service Canada",
      "Find part-time employment respecting the 24-hour cap during semesters",
      "Track scheduled breaks — unlimited hours allowed only during official breaks",
      "File annual taxes — credits and refunds often available",
    ],
    [
      "Exceeding 24 hours in any given week — risks losing student status",
      "Working off-campus without a SIN — illegal and risks future PR",
      "Counting reading week as a break without checking the school's official calendar",
      "Dropping to part-time studies — loses off-campus work eligibility entirely",
    ],
    [
      ["When did the limit change from 20 to 24 hours?", "The 24-hour weekly cap came into force on November 8, 2024, replacing the temporary unlimited-hours allowance and the long-standing 20-hour rule."],
      ["Do co-op and internship hours count toward the 24?", "No — authorised co-op/internship hours under a co-op work permit are separate from off-campus work limits."],
    ],
  ),
};

export const STUDYCANADA_LIST = Object.values(STUDYCANADA);
export function getStudyCanada(slug: string | undefined): StudyCanadaGuide | null {
  if (!slug) return null;
  return STUDYCANADA[slug as StudyCanadaSlug] ?? null;
}