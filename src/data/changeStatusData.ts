// Wave 9B — Status change & extensions: /change-status/:transition
export type ChangeSlug =
  | "visitor-to-work"
  | "visitor-to-study"
  | "study-to-work"
  | "work-to-pr"
  | "study-to-pr"
  | "visitor-to-pr"
  | "implied-status"
  | "restoration-of-status";

export interface ChangeGuide {
  slug: ChangeSlug;
  name: string;
  shortName: string;
  oneLiner: string;
  fromStatus: string;
  toStatus: string;
  eligibility: string[];
  timing: string;
  documents: string[];
  pitfalls: string[];
  faqs: { q: string; a: string }[];
}

const mk = (
  slug: ChangeSlug, name: string, shortName: string, oneLiner: string,
  fromStatus: string, toStatus: string,
  eligibility: string[], timing: string,
  documents: string[], pitfalls: string[],
  faqs: [string, string][],
): ChangeGuide => ({
  slug, name, shortName, oneLiner, fromStatus, toStatus,
  eligibility, timing, documents, pitfalls,
  faqs: faqs.map(([q, a]) => ({ q, a })),
});

export const CHANGES: Record<ChangeSlug, ChangeGuide> = {
  "visitor-to-work": mk(
    "visitor-to-work",
    "Visitor to Work Permit — How to Switch Inside Canada",
    "Visitor to Work",
    "The 2020 visitor-to-work-permit policy was extended into 2025 — visitors with a valid LMIA-backed job offer can apply for a work permit without leaving Canada.",
    "Visitor (visa or eTA)",
    "Closed Work Permit",
    [
      "Currently in Canada with valid visitor status",
      "Have a valid Canadian job offer with positive LMIA (or LMIA-exempt offer)",
      "Did not exceed authorized stay",
      "Meet medical and admissibility requirements",
    ],
    "Apply at least 30 days before visitor status expires. IRCC processing: 8-16 weeks.",
    [
      "Valid passport + visitor record / eTA",
      "Positive LMIA letter from employer",
      "Job offer letter (Annex A signed)",
      "Proof of qualifications matching the NOC",
      "Police certificates if requested + medical exam",
    ],
    [
      "Applying after visitor status expired (must restore first)",
      "Assuming the policy is permanent — it's a temporary public policy, currently extended to Feb 2025",
      "Job offer for a NOC the worker isn't qualified for",
      "Forgetting biometrics — required if not given in last 10 years",
    ],
    [
      ["Can I work while waiting for my work permit?", "No — visitor status doesn't authorize work. You start work only after the permit is issued."],
      ["Is the visitor-to-work permit policy permanent?", "No — it's a public policy first introduced in 2020 and extended several times. Always confirm current expiry on the IRCC website."],
    ],
  ),
  "visitor-to-study": mk(
    "visitor-to-study",
    "Visitor to Study Permit — Switching Inside Canada",
    "Visitor to Study",
    "Visitors can apply for a study permit from inside Canada in limited cases — a public policy was reinstated in 2024 with stricter eligibility.",
    "Visitor (visa or eTA)",
    "Study Permit",
    [
      "Have a valid Letter of Acceptance from a DLI",
      "Were a student or work permit holder previously, OR meet the public-policy criteria",
      "Have proof of GIC + tuition payment + settlement funds",
      "Currently in valid visitor status",
    ],
    "Apply 90+ days before classes start. Processing: 6-12 weeks.",
    [
      "Letter of Acceptance from a DLI",
      "Provincial Attestation Letter (PAL) — required since Jan 2024",
      "GIC of CAD 20,635 + first-year tuition receipt",
      "Proof of funds + study plan letter",
      "Valid passport + medical exam if from designated country",
    ],
    [
      "Missing PAL — automatic refusal since 2024 cap rules",
      "Applying outside the eligible cohort (e.g. never held a previous permit and don't meet exceptions)",
      "Studies start before permit is issued — can't begin in person until approved",
      "Funds proof under the new CAD 20,635 GIC threshold",
    ],
    [
      ["Can I switch from visitor to study while still inside Canada?", "Yes, under specific public policies. Most applicants need to leave and re-enter unless they previously held a study or work permit."],
      ["Is the PAL required for visitor-to-study switches?", "Yes for most undergraduate applicants. Master's, PhD and certain exempted programs don't need a PAL."],
    ],
  ),
  "study-to-work": mk(
    "study-to-work",
    "Study to Post-Graduation Work Permit (PGWP)",
    "Study to PGWP",
    "After graduating from an eligible Canadian program you can get an open work permit valid for up to 3 years. The 2024 reforms changed eligibility for PGP-pathway and field-of-study rules.",
    "Study Permit (graduating)",
    "Open Work Permit (PGWP)",
    [
      "Graduated from an eligible PGWP-eligible DLI program of 8+ months",
      "Studied full-time except final semester",
      "Master's grads: PGWP for 3 years regardless of program length",
      "Bachelor's/college: PGWP length matches program length, max 3 years",
      "Public-college graduates from non-degree programs (Nov 2024 rule): must be in field-of-study list",
    ],
    "Apply within 180 days of completion letter. Processing: 8-12 weeks (online), 4-5 months (paper). Can start work once IRCC confirms PGWP application.",
    [
      "Final transcripts + completion letter from DLI",
      "Original study permit",
      "Passport valid for full PGWP length",
      "Proof of full-time enrolment throughout the program",
      "CLB 7 (university) / CLB 5 (college) — required as of Nov 2024",
    ],
    [
      "Switching from full-time to part-time mid-program (only allowed in final semester)",
      "Public-college grads in fields not on the new field-of-study list (Nov 2024)",
      "Missing the 180-day window after graduation",
      "Passport expiring before PGWP would — PGWP gets shortened to passport expiry",
    ],
    [
      ["What's the new language requirement for PGWP?", "Effective November 2024: CLB 7 for university bachelor's/master's grads, CLB 5 for college grads. Test must be valid at time of PGWP application."],
      ["Can I work while my PGWP is being processed?", "Yes — full-time, on the implied-status rule, as long as you applied before your study permit expired."],
    ],
  ),
  "work-to-pr": mk(
    "work-to-pr",
    "Work Permit to Permanent Residence",
    "Work to PR",
    "Most workers move to PR via Canadian Experience Class (CEC) after 12 months of skilled work, or via a PNP nomination from their employer's province.",
    "Closed/Open Work Permit",
    "Permanent Residence",
    [
      "12+ months of full-time skilled work in Canada (TEER 0-3) within last 3 years",
      "Language: CLB 7 for TEER 0-1, CLB 5 for TEER 2-3",
      "Express Entry profile + valid Educational Credential Assessment",
      "Or: PNP nomination via employer-driven stream (BC Tech, OINP Employer, AAIP Express Entry)",
    ],
    "Plan 6-12 months ahead. EE draw → ITA → 5-6 month CEC PR processing.",
    [
      "Reference letters from all Canadian employers (NOC, dates, hours, duties, salary)",
      "Pay stubs + T4s for the work period",
      "Language test (IELTS General / CELPIP / TEF)",
      "ECA report (if foreign credential claimed for points)",
      "Police clearances from every country lived in 6+ months since age 18",
    ],
    [
      "Logging less than 1,560 hours over the qualifying year (full-time = 30 hrs/week)",
      "Reference letter missing duties or hours — IRCC commonly refuses on this",
      "Letting work permit expire before applying for PR or BOWP",
      "Counting unauthorized work — disqualifies the entire experience claim",
    ],
    [
      ["What's a BOWP?", "Bridging Open Work Permit — lets you keep working while your PR application is being processed. Apply once your AOR (Acknowledgement of Receipt) is issued."],
      ["Do I need to leave Canada to land as PR?", "Not anymore for most CEC applicants — you can do a virtual landing or a flagpole. Depends on your IRCC office's instructions."],
    ],
  ),
  "study-to-pr": mk(
    "study-to-pr",
    "International Student to Permanent Resident",
    "Study to PR",
    "The standard route is Study Permit → PGWP → 12 months of skilled work → CEC PR. Total: 3-5 years.",
    "Study Permit / PGWP",
    "Permanent Residence",
    [
      "Graduate from a PGWP-eligible DLI program",
      "Hold valid PGWP and gain 12+ months of skilled work (TEER 0-3)",
      "CLB 7+ language",
      "Or: nomination via student-friendly PNPs (BC PNP International Graduate, OINP Masters, MPNP IS)",
    ],
    "Total timeline: 2 years study + 1 year work + 6-12 months PR = 3.5-4 years average.",
    [
      "PGWP + valid Canadian work experience proof",
      "Final transcripts + Canadian credential",
      "Reference letter from Canadian employer matching NOC",
      "Language test + ECA (if needed for foreign components)",
      "All other CEC documents",
    ],
    [
      "Working under 30 hrs/week — won't count as full-time for CEC",
      "Working off-campus 24+ hrs/week during studies (limit is 24 hrs/week as of Nov 2024)",
      "Public-college diploma in non-eligible field of study (Nov 2024 PGWP rule)",
      "Letting PGWP expire before getting PR or BOWP",
    ],
    [
      ["Can I apply for PR before my PGWP expires?", "Yes — and you should. Apply for PR via CEC + a Bridging Open Work Permit before your PGWP expires."],
      ["What's the fastest student-to-PR pathway?", "Master's grad in BC or Manitoba: 2-year master's + PNP nomination at graduation can deliver PR within 3 years."],
    ],
  ),
  "visitor-to-pr": mk(
    "visitor-to-pr",
    "Visitor to Permanent Resident — Inside Canada Sponsorship",
    "Visitor to PR",
    "Spouses of Canadian citizens or PRs can apply for inland spousal sponsorship while on visitor status, with an open work permit available during processing.",
    "Visitor",
    "Permanent Residence (Inland Spousal)",
    [
      "Married to or in a common-law relationship with a Canadian citizen or PR",
      "Living together in Canada (cohabiting at time of application)",
      "Sponsor meets sponsorship undertaking obligations",
      "Valid visitor status (or maintained status)",
    ],
    "Inland sponsorship: 12-18 months. Open work permit (OWP) available 30-60 days after AOR.",
    [
      "Marriage certificate or 12+ months of cohabitation proof",
      "Joint lease, utilities, bank accounts, photos, communication history",
      "IMM 5532 sponsorship + IMM 0008 PR application",
      "Police clearances + medical exam",
      "Statutory declarations of relationship from family/friends",
    ],
    [
      "Application built only on a marriage certificate — IRCC needs proof of genuine ongoing relationship",
      "Sponsor income / undertaking issues if previously sponsored someone",
      "Letting visitor status lapse during processing — apply for visitor record extension or restoration",
      "Filing both inland and outland and getting confused on which path is active",
    ],
    [
      ["Inland vs outland spousal sponsorship — which is better?", "Inland gives you an open work permit during processing but you must stay in Canada. Outland is faster (~12 months) and lets you travel freely."],
      ["Can my visitor visa be extended while sponsorship is processed?", "Yes — apply for a visitor record. Once spousal OWP is issued (~60 days post-AOR), you can work full-time."],
    ],
  ),
  "implied-status": mk(
    "implied-status",
    "Implied Status — Working/Studying While Permit Is Renewed",
    "Implied Status",
    "If you apply to renew your work or study permit before it expires, you can keep working or studying under the same conditions until IRCC decides.",
    "Expiring Work or Study Permit",
    "Implied Status (same conditions)",
    [
      "Submitted renewal application before current permit expired",
      "Stayed in Canada continuously since",
      "Same employer + same conditions (for work permit)",
      "Same DLI (for study permit)",
    ],
    "Implied status begins the day after the original permit expires and lasts until IRCC decides — typically 4-6 months.",
    [
      "Acknowledgement of Receipt (AOR) from IRCC",
      "Original expiring permit",
      "Proof of continuous physical presence in Canada",
      "Employer / DLI letter confirming same conditions",
    ],
    [
      "Leaving Canada — implied status is lost the moment you exit",
      "Switching employers while on implied status (closed work permit only valid for original employer)",
      "Filing renewal one day after expiry — you lose implied status and need restoration",
      "Assuming travel insurance or provincial healthcare auto-extends",
    ],
    [
      ["Can I travel internationally on implied status?", "You can leave Canada, but you cannot re-enter as a worker/student until your new permit is issued. You'd be admitted only as a visitor."],
      ["What proof do I show my employer?", "Print your AOR email and your expired permit. Employers can verify with the IRCC employer portal."],
    ],
  ),
  "restoration-of-status": mk(
    "restoration-of-status",
    "Restoration of Status — Fix an Expired Permit",
    "Restoration of Status",
    "If your work, study or visitor status expired in the last 90 days you can apply to restore it. Outside that window you must leave Canada.",
    "Expired Status (within 90 days)",
    "Restored Status",
    [
      "Status expired no more than 90 days ago",
      "Currently in Canada",
      "Did not violate the conditions of the original permit (other than expiry)",
      "Pay restoration fee + new permit fee",
    ],
    "Apply within 90 days of expiry. Processing: 6-12 months. Cannot work or study while restoration is pending.",
    [
      "Old expired permit + passport",
      "New job offer / LOA / proof of funds (depending on permit type)",
      "Restoration form + IMM 5710 / 5709 application",
      "Restoration fee CAD 239.75 + applicable permit fees",
      "Explanation letter for why status was lost",
    ],
    [
      "Working or studying during the restoration period — disqualifies the application",
      "Applying after the 90-day window — must leave Canada and re-apply from abroad",
      "Forgetting to include the restoration fee — IRCC returns the file",
      "Multiple status violations beyond expiry (e.g. unauthorized work) — restoration usually refused",
    ],
    [
      ["Can I work during restoration?", "No — you have no status. You must wait for restoration approval before resuming work or study."],
      ["What if more than 90 days have passed?", "You cannot restore. You must leave Canada and apply for a new permit from abroad. Returning may also require explaining the overstay."],
    ],
  ),
};

export const CHANGES_LIST = Object.values(CHANGES);
export function getChange(slug: string | undefined): ChangeGuide | null {
  if (!slug) return null;
  return CHANGES[slug as ChangeSlug] ?? null;
}