// Wave 13A — Visitor & TRV pages: /visit-canada/:topic
export type VisitSlug =
  | "visitor-visa-trv"
  | "super-visa-parents-grandparents"
  | "eta-electronic-travel-authorization"
  | "visitor-record-extension"
  | "dual-intent-visitor"
  | "visitor-to-worker-inland"
  | "visitor-to-student-inland"
  | "multiple-entry-visa";

export interface VisitGuide {
  slug: VisitSlug;
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
  slug: VisitSlug, name: string, shortName: string, oneLiner: string,
  who: string, processingTime: string, fee: string, keyRule: string, outcome: string,
  steps: string[], pitfalls: string[], faqs: [string, string][],
): VisitGuide => ({ slug, name, shortName, oneLiner, who, processingTime, fee, keyRule, outcome, steps, pitfalls, faqs: faqs.map(([q, a]) => ({ q, a })) });

export const VISITS: Record<VisitSlug, VisitGuide> = {
  "visitor-visa-trv": mk(
    "visitor-visa-trv", "Canada Visitor Visa (TRV) — Apply, Documents & Approval Tips", "Visitor Visa (TRV)",
    "The Temporary Resident Visa lets visa-required nationals enter Canada for tourism, family visits or business up to 6 months per entry.",
    "Citizens of visa-required countries (India, China, Pakistan, Nigeria, etc.).",
    "Decision: 2–10 weeks depending on country.",
    "CAD 100 visa fee + CAD 85 biometrics.",
    "Officer must be convinced you will leave Canada at the end of authorized stay.",
    "Single or multiple-entry sticker placed in passport.",
    ["Create IRCC online account or use VFS","Upload passport, photo, proof of funds, ties-to-home-country","Pay CAD 185 in fees online","Give biometrics at VAC within 30 days","Wait for passport request; courier passport for visa sticker"],
    ["Weak proof of ties — top refusal reason","Insufficient funds — needs CAD 100/day stay + return ticket","No invitation letter when visiting family","Past US/Schengen refusals not disclosed — misrepresentation"],
    [["How long can I stay on a visitor visa?","Up to 6 months per entry by default — officer at port of entry sets the actual date in your passport."],["Can I extend a visitor visa from inside Canada?","Yes — apply for a Visitor Record 30+ days before expiry to maintain implied status."]],
  ),
  "super-visa-parents-grandparents": mk(
    "super-visa-parents-grandparents", "Super Visa for Parents & Grandparents — 10-Year Multi-Entry", "Super Visa",
    "The Super Visa allows parents and grandparents of Canadian citizens/PRs to visit for up to 5 years per entry, multiple entries over 10 years.",
    "Parents and grandparents of Canadian citizens or permanent residents.",
    "Decision: 8–14 weeks. Valid 10 years (or until passport expires).",
    "CAD 100 visa fee + CAD 85 biometrics + mandatory medical insurance (CAD 1,500–2,500/year).",
    "Sponsoring child must meet LICO minimum income; visitor must have CAD 100k+ Canadian medical insurance for 1 year.",
    "10-year multi-entry visa with 5-year stay per entry.",
    ["Sponsor child obtains LICO proof (NOA, T4, employment letter)","Parent buys 1-year Canadian medical insurance, min CAD 100,000 coverage","Sponsor writes invitation letter","Parent applies online with insurance proof, invitation, LICO, IMM forms","Give biometrics, complete medical exam, courier passport on request"],
    ["Buying foreign insurance — must be Canadian-issued policy","Sponsor income just below LICO — refusal","Insurance covering <1 year — refusal","Forgetting to declare insurance is paid upfront (some policies refundable)"],
    [["Can the Super Visa lead to PR?","No — it is strictly a long-stay visitor visa. PR for parents requires the separate PGP sponsorship program."],["What if my Canadian medical insurance is cancelled?","CBSA can refuse entry; insurance must stay valid for the duration of each stay."]],
  ),
  "eta-electronic-travel-authorization": mk(
    "eta-electronic-travel-authorization", "Canadian eTA — Who Needs It & How to Apply", "eTA",
    "The Electronic Travel Authorization (eTA) is required for visa-exempt nationals flying to Canada. CAD 7, approved in minutes for most.",
    "Visa-exempt nationals (UK, EU, Australia, etc.) and lawful US PRs flying to Canada.",
    "Minutes to a few days; some refer for review.",
    "CAD 7.",
    "eTA linked to passport — get a new one if passport changes.",
    "Email confirmation; entry decision at port of entry.",
    ["Go to canada.ca/eTA — only the official site","Enter passport, address, employment, travel history","Pay CAD 7 by credit card","Receive approval email (most within minutes)","Board flight; CBSA officer makes final entry decision"],
    ["Using third-party scam sites charging CAD 50+","Old passport — eTA tied to specific passport","Past Canadian refusals or criminal record — may trigger review or refusal","Driving across the land border — eTA is for flights only"],
    [["Do I need an eTA if I drive in from the US?","No — eTA is for flights into Canada. Land/sea entries do not require it."],["My eTA was refused. Can I reapply?","Reapply only if circumstances change; otherwise apply for a visitor visa (TRV) — more thorough review."]],
  ),
  "visitor-record-extension": mk(
    "visitor-record-extension", "Visitor Record — Extend Your Stay in Canada", "Visitor Record",
    "A Visitor Record extends your authorized stay beyond the date stamped in your passport. Apply online 30+ days before expiry.",
    "Visitors already in Canada needing more time (medical, family, dual intent).",
    "Decision: 100–180 days; implied status protects you while waiting.",
    "CAD 100.",
    "Must apply before current status expires — late = lost status.",
    "Visitor Record document (no passport sticker); confirms new expiry date.",
    ["Log into IRCC account; select 'Extend my visitor status'","Upload reason letter, proof of funds, ties","Pay CAD 100","Submit before stamp expiry to keep implied status","Receive Visitor Record by mail or email"],
    ["Applying after expiry — must apply for restoration within 90 days","No reason given — refusal","Working or studying on Visitor Record — prohibited","Leaving Canada while application pending — abandons it"],
    [["What is implied status?","If you applied before expiry you can stay legally under the same conditions until IRCC decides."],["Can I extend multiple times?","Yes — but each extension needs a fresh justifiable reason; repeated extensions raise suspicion of permanent intent."]],
  ),
  "dual-intent-visitor": mk(
    "dual-intent-visitor", "Dual Intent — Visit Canada While Applying for PR", "Dual Intent",
    "Dual intent means you can hold both temporary (visitor) intent and permanent (PR) intent at the same time without auto-refusal.",
    "Visitors with a PR application in process, or PR applicants wanting to visit family.",
    "Same as visitor visa: 2–10 weeks.",
    "Visitor visa fees: CAD 100 + CAD 85 biometrics.",
    "Officer must believe you will leave if PR is refused or delayed.",
    "Visitor visa or eTA issued; you can still pursue PR.",
    ["Apply for visitor visa or eTA","Disclose pending PR application honestly","Explain temporary stay purpose and that you will leave if PR refused","Show ties to home (job, family, property)","Enter Canada; can apply for status changes from inside (e.g., work permit)"],
    ["Hiding pending PR — misrepresentation","Weak temporary intent (sold house, quit job) — refusal","One-way ticket only — refusal","Saying 'I want to immigrate' at the border — entry refused"],
    [["Does dual intent guarantee approval?","No — officers still assess whether you will leave if PR fails. Strong ties to home country are essential."],["Can I work in Canada on a dual intent visitor visa?","No — work needs a work permit. You can apply for an inland work permit from a visitor status if eligible."]],
  ),
  "visitor-to-worker-inland": mk(
    "visitor-to-worker-inland", "Visitor to Worker Inland — Apply for a Work Permit in Canada", "Visitor → Worker",
    "Visitors with a valid job offer can apply for a work permit from inside Canada under the temporary public policy (extended to 2025+).",
    "Visitors in Canada with a valid LMIA-supported or LMIA-exempt job offer.",
    "Decision: 4–8 months inland.",
    "CAD 155 work permit + CAD 100 open work permit holder fee if applicable.",
    "Must hold valid visitor status at time of application.",
    "Closed work permit tied to the employer; can start work once approved.",
    ["Find Canadian employer with LMIA or LMIA-exempt offer","Apply online for work permit from inside Canada","Upload job offer, LMIA number (if needed), passport, visitor status proof","Pay fees; give biometrics if needed","Receive work permit by mail; start job"],
    ["Visitor status expired before submitting — must restore first","Working before permit issued — illegal","Wrong NOC code chosen — refusal","No LMIA when one was required"],
    [["Can I work while waiting for the work permit?","No — the inland public policy lets you APPLY from visitor status but you cannot work until the permit is issued."],["Will this policy end?","IRCC extended it through 2025; check the policy page before relying on it."]],
  ),
  "visitor-to-student-inland": mk(
    "visitor-to-student-inland", "Visitor to Student Inland — Apply for a Study Permit in Canada", "Visitor → Student",
    "Visitors holding a DLI letter of acceptance can apply for a study permit from inside Canada in many cases.",
    "Visitors in Canada accepted at a Designated Learning Institution.",
    "Decision: 4–6 months inland.",
    "CAD 150 study permit fee + CAD 85 biometrics if needed.",
    "Must hold valid visitor status; some applicants must apply from outside Canada.",
    "Study permit; full-time studies and part-time on-campus work allowed.",
    ["Get DLI letter of acceptance and PAL (Provincial Attestation Letter)","Pay first-year tuition or place tuition in escrow","Apply online for study permit from inside Canada","Upload acceptance, proof of funds, passport, PAL","Pay fees; give biometrics if requested"],
    ["No PAL — application rejected for most DLIs","Studying before permit issued — only short courses allowed","Visitor status expired — must restore first","Insufficient funds — refusal"],
    [["Is inland study permit harder to get?","Approval rates are usually lower than outside-Canada applications; strong study plan and ties to home country help."],["Can I start school before the permit is issued?","No — only short courses (under 6 months) can be studied on visitor status; longer programs need the permit first."]],
  ),
  "multiple-entry-visa": mk(
    "multiple-entry-visa", "Multiple-Entry Visa — Default for Visitor Visa Approvals", "Multiple-Entry Visa",
    "Most approved Canadian visitor visas are multiple-entry by default, valid up to 10 years or until passport expires.",
    "All approved TRV applicants get multiple-entry by default since 2014.",
    "Same as visitor visa.",
    "CAD 100 visa + CAD 85 biometrics.",
    "Each entry allows up to 6 months unless officer stamps a shorter date.",
    "10-year multi-entry visa sticker in passport.",
    ["Apply for standard visitor visa (TRV)","Officer issues multiple-entry by default","Use visa for unlimited entries until expiry","Each visit limited by passport expiry or visa expiry","Renew when passport renewed"],
    ["Assuming single-entry — multiple-entry is the norm","Exceeding 6 months per entry without extension","Working or studying without correct permit","Letting visa lapse with passport renewal — must reapply"],
    [["Does my visa expire when my passport expires?","Yes — the visa is tied to the passport in which it was issued. Renewing the passport requires a new visa."],["Can I get a single-entry instead?","Officers issue single-entry only in specific cases (e.g., one-time event, prior overstay history)."]],
  ),
};

export const VISITS_LIST = Object.values(VISITS);
export function getVisit(slug: string | undefined): VisitGuide | null {
  if (!slug) return null;
  return VISITS[slug as VisitSlug] ?? null;
}