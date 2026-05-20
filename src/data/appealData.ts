// Wave 10A — Appeals & Judicial Review: /appeal/:type
export type AppealSlug =
  | "federal-court-judicial-review"
  | "irb-appeal-division"
  | "refused-study-permit-appeal"
  | "refused-work-permit-appeal"
  | "refused-pr-appeal"
  | "sponsorship-appeal"
  | "removal-order-appeal"
  | "h-and-c-application";

export interface AppealGuide {
  slug: AppealSlug;
  name: string;
  shortName: string;
  oneLiner: string;
  who: string;
  deadline: string;
  fee: string;
  forum: string;
  successRate: string;
  steps: string[];
  pitfalls: string[];
  faqs: { q: string; a: string }[];
}

const mk = (
  slug: AppealSlug, name: string, shortName: string, oneLiner: string,
  who: string, deadline: string, fee: string, forum: string, successRate: string,
  steps: string[], pitfalls: string[],
  faqs: [string, string][],
): AppealGuide => ({
  slug, name, shortName, oneLiner, who, deadline, fee, forum, successRate,
  steps, pitfalls,
  faqs: faqs.map(([q, a]) => ({ q, a })),
});

export const APPEALS: Record<AppealSlug, AppealGuide> = {
  "federal-court-judicial-review": mk(
    "federal-court-judicial-review",
    "Federal Court Judicial Review of an IRCC Refusal",
    "Federal Court JR",
    "Judicial review at the Federal Court is the main remedy when IRCC refuses a visa, permit or PR application unreasonably.",
    "Anyone refused by IRCC where there is no internal appeal route (study/work permits, TRVs, most PR streams).",
    "15 days from refusal if inside Canada; 60 days if outside Canada — strict, no extensions in most cases.",
    "CAD 50 filing fee + counsel fees typically CAD 4,000-10,000 for a leave application.",
    "Federal Court of Canada — first leave, then judicial review hearing if leave granted.",
    "Leave is granted in roughly 25-35% of applications. Of those, ~50-60% succeed at JR.",
    [
      "File Application for Leave and for Judicial Review (Form IR-1) within the deadline",
      "Order the GCMS notes and Certified Tribunal Record once leave is perfected",
      "File the Applicant's Record with Memorandum of Argument within 30 days",
      "Federal Court grants or denies leave on paper (no hearing at this stage)",
      "If leave granted, oral hearing scheduled; outcome is usually a redetermination order, not a visa",
    ],
    [
      "Missing the 15/60-day deadline — extensions are rare",
      "Filing without ordering GCMS notes first — you can't argue the record you haven't seen",
      "Expecting the court to issue your visa — it can only send the file back to IRCC",
      "Self-represented applicants often miss the Memorandum-of-Argument requirement",
    ],
    [
      ["Will I get my visa if I win at Federal Court?", "No — the court sends the file back to IRCC for a new decision by a different officer. The redetermination may still be a refusal."],
      ["Can I reapply instead of going to Federal Court?", "Often yes, and it's faster + cheaper. JR makes sense when the refusal was legally unreasonable or you want to preserve the original record."],
    ],
  ),
  "irb-appeal-division": mk(
    "irb-appeal-division",
    "IRB Immigration Appeal Division (IAD) — Sponsorship & Removal Appeals",
    "IAD Appeal",
    "The Immigration Appeal Division hears sponsorship refusals, removal orders against PRs, and residency-obligation appeals.",
    "PRs facing removal, sponsors whose spousal/parent sponsorship was refused, and PRs failing the residency obligation.",
    "30 days from receiving the refusal letter or removal order.",
    "No filing fee at the IAD. Counsel fees typically CAD 5,000-15,000.",
    "Immigration Appeal Division of the Immigration and Refugee Board (IRB).",
    "Sponsorship appeals: ~45-55% allowed. Residency-obligation appeals: ~50-60% allowed with strong H&C.",
    [
      "File Notice of Appeal to IAD within 30 days of refusal/removal order",
      "IRCC files the Appeal Record (refusal reasons + evidence)",
      "Appellant files counter-disclosure: relationship evidence, H&C factors, hardship",
      "Alternative Dispute Resolution conference or full hearing",
      "IAD allows, dismisses, or stays the appeal with conditions",
    ],
    [
      "Missing the 30-day deadline (rare extensions only with serious explanation)",
      "Going to hearing without an ADR attempt — IAD prefers settlement",
      "Weak H&C evidence — best-interest-of-child and establishment letters are critical",
      "Failing to update IAD on address changes — appeal can be declared abandoned",
    ],
    [
      ["What's the difference between IAD and Federal Court?", "IAD is a full re-hearing with new evidence and H&C powers. Federal Court only reviews the original decision for legal errors."],
      ["Can I appeal to IAD if I'm a foreign national, not a PR?", "Generally no — IAD jurisdiction is limited to PRs, sponsors and protected persons. Foreign nationals must use Federal Court JR."],
    ],
  ),
  "refused-study-permit-appeal": mk(
    "refused-study-permit-appeal",
    "Refused Study Permit — Reconsideration vs Federal Court vs Reapply",
    "Study Permit Appeal",
    "Study permit refusals can be challenged via reconsideration request, Federal Court judicial review, or a stronger reapplication.",
    "Students refused for funds, ties to home country, study plan, or genuineness of intent.",
    "Reconsideration: ASAP (no formal deadline but before reapplying). Federal Court: 60 days outside Canada.",
    "Reconsideration: free. Federal Court: CAD 50 filing + counsel ~CAD 4,000-8,000.",
    "Reconsideration with IRCC officer who refused, or Federal Court for legal review.",
    "Reconsideration: <10% reversed. Federal Court: ~50% at JR if leave granted. Reapplication is usually the best ROI.",
    [
      "Order GCMS notes to see the real refusal reasons (often more detail than the letter)",
      "Decide path: reconsideration (if officer overlooked evidence) vs JR (legal error) vs reapply (most common)",
      "For reapplication: address each refusal reason in a new study plan + stronger financials + ties",
      "Submit through your IRCC account; new application = new processing time",
      "Track decision; if refused again, JR becomes more viable",
    ],
    [
      "Reapplying with the exact same documents — IRCC sees prior file",
      "Filing JR without GCMS notes — you're arguing blind",
      "Ignoring the dual intent issue — students refused for 'not leaving Canada' must address it explicitly",
      "Missing the 60-day Federal Court deadline while waiting on reconsideration",
    ],
    [
      ["Should I do reconsideration or just reapply?", "Reconsideration almost never succeeds. Reapply with a stronger file that directly answers each refusal reason — that's the fastest fix."],
      ["Is there an internal IRCC appeal for study permits?", "No — study permits have no IAD appeal route. Only options are reconsideration, JR at Federal Court, or reapplication."],
    ],
  ),
  "refused-work-permit-appeal": mk(
    "refused-work-permit-appeal",
    "Refused Work Permit — Reconsideration, JR & Reapplication Strategy",
    "Work Permit Appeal",
    "Work permit refusals (LMIA-backed, IMP, open) have no internal appeal — your options are reconsideration, Federal Court, or reapply.",
    "Workers refused for genuineness, LMIA validity, dual intent, or insufficient documentation.",
    "Federal Court: 15 days inside Canada / 60 days outside. Reconsideration: before reapplying.",
    "CAD 50 Federal Court filing + counsel CAD 4,000-10,000. Reapplication = new IRCC fee.",
    "Reconsideration at IRCC, Federal Court JR, or new application.",
    "Reconsideration: rare success. JR: ~50-55% when leave granted. Strong reapplication: ~60-70%.",
    [
      "Get the GCMS notes to identify the exact ground (often dual intent or NOC mismatch)",
      "If LMIA is still valid: reapply with a stronger genuineness letter from employer",
      "If genuineness or dual-intent issue: address it head-on in a cover letter",
      "If legal error on the record: file JR within deadline",
      "Keep status if inside Canada — apply for visitor record while planning next step",
    ],
    [
      "Letting status expire while waiting for the next decision — leads to restoration issues",
      "Filing JR while reapplying — court will likely dismiss as moot",
      "Ignoring the dual-intent finding — must include PR pathway intent and ties",
      "Not asking employer for an updated/strengthened offer letter",
    ],
    [
      ["Can I work while my reapplication is being processed?", "Only if you had implied or maintained status. Once your original work permit expires, you generally cannot work until a new permit is issued."],
      ["Does a work permit refusal affect future applications?", "It must be disclosed but isn't a permanent bar. A well-prepared reapplication that addresses the refusal reasons can succeed."],
    ],
  ),
  "refused-pr-appeal": mk(
    "refused-pr-appeal",
    "Refused PR Application — Federal Court & Reapplication Options",
    "PR Refusal Appeal",
    "Economic-class PR refusals (Express Entry, PNP, CEC) have no IAD appeal — your remedies are Federal Court JR or reapplying with a stronger profile.",
    "Applicants refused on misrepresentation, criminality, medical inadmissibility, or insufficient program criteria.",
    "Federal Court: 15 days inside / 60 days outside Canada. Reapplication anytime (unless 5-year misrep bar).",
    "CAD 50 Federal Court filing + CAD 6,000-12,000 counsel. Reapplication = full PR fees again.",
    "Federal Court for legal review; new ITA cycle for reapplication.",
    "JR: ~50% when leave granted. Reapplication success depends on whether the underlying issue is curable.",
    [
      "Order GCMS notes and review the procedural fairness letter (PFL) responses",
      "Identify whether the refusal is curable (proof of funds, language) or hard (criminality, misrep)",
      "For misrepresentation: JR is often the only option — 5-year bar applies otherwise",
      "For curable issues: rebuild EE profile or new PNP nomination and create a fresh ITA",
      "If JR succeeds, file is redetermined by a new officer",
    ],
    [
      "Treating a misrepresentation finding as a simple error — it carries a 5-year bar",
      "Reapplying without addressing the original refusal ground",
      "Not responding to a PFL within the deadline (usually 7-30 days)",
      "Ignoring medical inadmissibility instead of seeking mitigation letters / rehab",
    ],
    [
      ["Is there an appeal for refused Express Entry PR?", "No internal appeal. Only Federal Court JR or a new ITA via a fresh profile or PNP nomination."],
      ["What if I'm found inadmissible for misrepresentation?", "Standard consequence is a 5-year ban from applying. JR is usually the only way to set aside the finding."],
    ],
  ),
  "sponsorship-appeal": mk(
    "sponsorship-appeal",
    "Spousal & Family Sponsorship Appeal at the IAD",
    "Sponsorship Appeal",
    "Refused family-class sponsorships (spouse, parent, child) can be appealed to the IAD where new evidence and credibility are reassessed.",
    "Canadian citizens or PRs whose spousal, common-law, parent or dependent-child sponsorship was refused.",
    "30 days from receiving the refusal letter.",
    "No IAD filing fee. Counsel typically CAD 6,000-15,000.",
    "Immigration Appeal Division — full hearing or ADR conference.",
    "Spousal: ~50-60% allowed when relationship is genuine. Parent/child: depends on excluded family member rules.",
    [
      "File Notice of Appeal at IAD within 30 days",
      "IRCC files Appeal Record with refusal reasons (often genuineness / primary purpose)",
      "Sponsor files counter-disclosure: photos, communication logs, joint finances, travel history",
      "Attend ADR conference — many spousal appeals settle here",
      "If no settlement, full hearing with both spouses testifying",
    ],
    [
      "Thin relationship evidence — IAD wants continuity, not just a wedding album",
      "Excluded family member trap (R117(9)(d)) — undeclared dependants can bar future sponsorship",
      "Inconsistent testimony between sponsor and applicant at hearing",
      "Missing the 30-day deadline — almost no extensions",
    ],
    [
      ["Can my spouse come to Canada while we wait for the appeal?", "Not automatically. Some applicants apply for a TRV in parallel; success depends on showing genuine ties and intent to leave if needed."],
      ["What if my parent sponsorship was refused on income?", "Income refusals can be appealed on H&C grounds — best-interest-of-child, hardship, family reunification all weigh in."],
    ],
  ),
  "removal-order-appeal": mk(
    "removal-order-appeal",
    "Removal Order Appeal — Stay or Set Aside Deportation",
    "Removal Order Appeal",
    "PRs and protected persons facing removal can appeal to the IAD to stay deportation on H&C grounds or quash the underlying finding.",
    "PRs ordered removed for criminality, misrepresentation, or residency-obligation breach. Foreign nationals generally cannot appeal.",
    "30 days from the removal order. Inside-Canada deadlines are strict.",
    "No IAD filing fee. Counsel CAD 8,000-20,000 for complex criminal cases.",
    "Immigration Appeal Division — except serious criminality (sentence 6+ months) which loses appeal rights.",
    "~35-50% allowed with strong establishment + rehabilitation evidence.",
    [
      "File Notice of Appeal at IAD within 30 days of removal order",
      "Apply for a stay of removal while appeal is pending",
      "Gather H&C evidence: establishment, family ties, best interests of children, rehabilitation",
      "Attend hearing or ADR — IAD weighs Ribic factors heavily for criminal cases",
      "Outcome: appeal allowed, dismissed, or stayed with conditions for 3-5 years",
    ],
    [
      "Conviction with sentence of 6+ months strips IAD appeal rights — only Federal Court JR remains",
      "Filing late — strict 30-day deadline",
      "Weak rehabilitation evidence for criminal appeals — need counseling, employment, community support",
      "Failing to disclose ongoing criminal matters during the appeal",
    ],
    [
      ["Can I appeal if my crime had a 7-month sentence?", "No — section 64 of IRPA strips IAD appeal rights for serious criminality (sentence of 6 months or more, or offence punishable by 10+ years). Only Federal Court JR remains."],
      ["What is a stay of removal?", "The IAD pauses removal for 3-5 years with conditions (reporting, no further offences). If you comply, the appeal may eventually be allowed."],
    ],
  ),
  "h-and-c-application": mk(
    "h-and-c-application",
    "Humanitarian & Compassionate (H&C) Application — Last-Resort PR",
    "H&C Application",
    "An H&C application asks IRCC to grant PR despite not meeting normal criteria, based on establishment, hardship and best interests of children.",
    "Out-of-status individuals, refused refugee claimants, and families with strong establishment but no PR pathway.",
    "No filing deadline; can apply once per 12 months while inside Canada.",
    "CAD 635 application fee + RPRF CAD 575 if approved. Counsel typically CAD 3,000-8,000.",
    "IRCC officer decides on the file; no oral hearing.",
    "Approval rates ~30-40%. Strongly tied to establishment + child best interests.",
    [
      "Apply on IMM 5283 with detailed H&C submissions",
      "Document establishment: employment, taxes, community, language, volunteering",
      "Best-interest-of-child analysis for any Canadian or established children",
      "Hardship analysis: country conditions, medical, family separation",
      "Wait 24-36 months; if approved, PR is granted in stages",
    ],
    [
      "Thin establishment evidence — needs 3-5+ years of community ties typically",
      "Generic country-condition documents without personal nexus",
      "Missing the best-interest-of-child analysis for kids in Canada",
      "Filing H&C as a substitute for a refused refugee claim within 12 months (bar applies)",
    ],
    [
      ["Does H&C give me work authorization while waiting?", "Not automatically. You may apply for an open work permit after passing the first stage of H&C, typically 12+ months in."],
      ["Can I be removed while my H&C is pending?", "Yes — H&C does not stay removal. You must file a separate deferral request or stay motion if removal is scheduled."],
    ],
  ),
};

export const APPEALS_LIST = Object.values(APPEALS);
export function getAppeal(slug: string | undefined): AppealGuide | null {
  if (!slug) return null;
  return APPEALS[slug as AppealSlug] ?? null;
}