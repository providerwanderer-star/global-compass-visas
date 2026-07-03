// Wave 7A — Refusal recovery cluster: /refusal/:type
export type RefusalSlug =
  | "study-permit-refused"
  | "work-permit-refused"
  | "visitor-visa-refused"
  | "pr-application-refused"
  | "spousal-sponsorship-refused"
  | "pgwp-refused";

export interface RefusalGuide {
  slug: RefusalSlug;
  name: string;
  shortName: string;
  oneLiner: string;
  topReasons: string[];
  pathways: { name: string; when: string; cost: string; timeline: string }[];
  steps: { t: string; d: string }[];
  faqs: { q: string; a: string }[];
}

export const REFUSALS: Record<RefusalSlug, RefusalGuide> = {
  "study-permit-refused": {
    slug: "study-permit-refused",
    name: "Study Permit Refused — What to Do Next",
    shortName: "Study Permit Refusal",
    oneLiner: "Most study permit refusals fall into 4 fixable buckets. Here's how to read your refusal letter, order GCMS notes, and choose between reconsideration, re-application and judicial review.",
    topReasons: [
      "Purpose of visit not satisfied — weak Statement of Purpose or unclear study plan",
      "Insufficient proof of funds — bank statements look inflated or recently deposited",
      "Travel history / ties to home country deemed weak (officer doubts intent to leave)",
      "Choice of program not aligned with academic / work background",
      "Letter of Acceptance from a non-PGWP-eligible DLI (post-2024 IRCC restrictions)",
      "Provincial Attestation Letter (PAL) missing where required",
    ],
    pathways: [
      { name: "Re-apply (most common)", when: "Refusal reason can be cured (better SOP, better funds proof, better DLI choice).", cost: "CAD 150 study permit + biometrics", timeline: "8–12 weeks" },
      { name: "Reconsideration request", when: "Officer made a clear error of fact or missed evidence already in your file.", cost: "Free", timeline: "8–16 weeks; success rate <20%" },
      { name: "Federal Court judicial review", when: "Decision is unreasonable in law. 15-day filing deadline (60 if outside Canada).", cost: "CAD ~50 filing + counsel CAD 4,000–10,000+", timeline: "6–18 months" },
    ],
    steps: [
      { t: "Read the refusal letter carefully", d: "IRCC checks boxes — note the exact bullet points marked. These are your refusal grounds." },
      { t: "Order GCMS / ATIP notes", d: "CAD 5 ATIP request reveals the officer's actual reasoning (not just the boilerplate letter). Takes ~30 days." },
      { t: "Diagnose: curable vs unreasonable", d: "If the officer missed something you submitted → reconsideration or JR. If the file was genuinely weak → re-apply with stronger evidence." },
      { t: "Prepare a stronger re-application", d: "Address every refusal ground head-on with a 'Letter of Explanation' and clearly labelled new evidence." },
      { t: "Submit with our team's review", d: "Free pre-submission review; we flag the 3–4 issues most likely to trigger another refusal." },
    ],
    faqs: [
      { q: "How many times can I re-apply?", a: "No legal limit, but each refusal goes on your IRCC record. After 2–3 refusals, judicial review or a different visa type becomes more strategic than a 4th re-application." },
      { q: "Should I disclose my refusal in future applications?", a: "Yes — always. Every IRCC form asks 'have you ever been refused?'. Non-disclosure is misrepresentation, which triggers a 5-year ban." },
      { q: "Will a refusal hurt future PR applications?", a: "Only if the refusal involved misrepresentation. A clean refusal for 'insufficient funds' doesn't bar future PR." },
      { q: "Is reconsideration worth trying?", a: "Only if you have new evidence or proof the officer ignored what you submitted. Pure 'please reconsider' letters succeed less than 10% of the time." },
      { q: "Can I appeal a study permit refusal?", a: "There is no formal appeal — only Federal Court judicial review (15-day deadline)." },
    ],
  },
  "work-permit-refused": {
    slug: "work-permit-refused",
    name: "Work Permit Refused — Reapply or Appeal",
    shortName: "Work Permit Refusal",
    oneLiner: "Work permit refusals usually trace to LMIA validity, job genuineness or NOC mismatch. The right next step depends on whether the underlying job offer is still open.",
    topReasons: [
      "LMIA expired or no longer valid by application date",
      "Job offer deemed not genuine by officer",
      "NOC TEER classification mismatch (e.g. claiming TEER 2 for a TEER 4 role)",
      "Insufficient credentials / experience for the offered role",
      "Inadmissibility — criminal, medical or misrepresentation",
      "Dual-intent concerns — officer doubts you'll leave at end of permit",
    ],
    pathways: [
      { name: "Re-apply with stronger employer documentation", when: "Job offer still valid; refusal was about evidence not eligibility.", cost: "CAD 155 + biometrics", timeline: "8–12 weeks" },
      { name: "Switch to LMIA-exempt route (if eligible)", when: "ICT, CUSMA, Francophone Mobility (C16), Global Talent Stream may apply.", cost: "CAD 155 + employer compliance fee CAD 230", timeline: "2–8 weeks" },
      { name: "Federal Court judicial review", when: "Decision contains clear legal error and you want to preserve the job offer.", cost: "CAD ~50 + counsel CAD 4,000–10,000+", timeline: "6–18 months" },
    ],
    steps: [
      { t: "Confirm job offer is still open", d: "If the employer has hired someone else, re-application is moot — pivot to a new offer or another visa type." },
      { t: "Order GCMS notes (CAD 5 ATIP)", d: "Reveals actual officer reasoning beyond the boilerplate refusal letter." },
      { t: "Re-validate the LMIA if expired", d: "Most positive LMIAs are valid 12 months. Employer may need to re-apply for LMIA." },
      { t: "Tighten the documentation gap", d: "Add proof of credentials, job description matching NOC, employer financials, organisational chart." },
      { t: "Submit with employer + counsel review", d: "Our team coordinates with the employer to fix the documentation issues IRCC flagged." },
    ],
    faqs: [
      { q: "Can my employer be penalised for my refusal?", a: "Not directly — but LMIA-related employer compliance issues can flag the employer for future LMIAs." },
      { q: "Should I switch employer after a refusal?", a: "Not automatically. If the refusal was about your eligibility (not the job), a new employer won't help." },
      { q: "Does refusal affect future Express Entry?", a: "No — work permit refusals don't directly affect PR eligibility unless misrepresentation was found." },
      { q: "What if my LMIA expired during the refusal process?", a: "Employer must re-apply for the LMIA (or use an exemption if eligible). LMIAs cannot be extended." },
      { q: "Can I work in Canada while re-applying?", a: "Only if you have other valid status. A refused application with no other status means you must stop working immediately." },
    ],
  },
  "visitor-visa-refused": {
    slug: "visitor-visa-refused",
    name: "Visitor Visa (TRV) Refused — Re-application Strategy",
    shortName: "Visitor Visa Refusal",
    oneLiner: "TRV refusals are almost always about ties to home country and travel history. Re-applying without addressing these is the #1 mistake.",
    topReasons: [
      "Insufficient ties to home country (employment, assets, family)",
      "Weak travel history — no prior travel to UK/USA/Schengen",
      "Officer not satisfied applicant will leave at end of visit",
      "Purpose of visit not credible (vague invitation, missing host info)",
      "Insufficient funds for trip duration",
      "Inadequate proof of accommodation",
    ],
    pathways: [
      { name: "Re-apply with stronger evidence", when: "Most cases — fix the ties + funds + purpose gaps the officer flagged.", cost: "CAD 100 + biometrics", timeline: "2–8 weeks" },
      { name: "Apply through a different visa office", when: "Some applicants benefit from country-of-residence vs nationality-based processing.", cost: "CAD 100 + biometrics", timeline: "2–8 weeks" },
      { name: "Switch to Super Visa (parents/grandparents)", when: "If applicant is parent/grandparent of citizen/PR — Super Visa has different criteria.", cost: "CAD 100 + biometrics + insurance", timeline: "8–14 weeks" },
    ],
    steps: [
      { t: "Order GCMS notes", d: "Especially important for TRV — reveals which 'ties' the officer doubted." },
      { t: "Build a stronger ties-to-home file", d: "Employer letter, leave approval, property ownership, family responsibilities, ongoing financial commitments." },
      { t: "Strengthen the invitation + itinerary", d: "Detailed invitation letter from host, day-by-day itinerary, return flight booking (refundable), accommodation proof." },
      { t: "Add a Letter of Explanation", d: "Address the previous refusal head-on — don't pretend it didn't happen." },
      { t: "Re-apply", d: "Wait at least 30 days; submit with all new evidence clearly labelled." },
    ],
    faqs: [
      { q: "How long should I wait before re-applying?", a: "Minimum 30 days. Re-applying within days with no new evidence triggers an automatic refusal." },
      { q: "Does prior US/UK visa help?", a: "Significantly — strong travel history is one of the easiest ways to overcome 'ties' refusals." },
      { q: "Can I apply for an eTA after a TRV refusal?", a: "Most TRV applicants don't qualify for eTA (visa-required nationality). Visa-exempt nationals with refusals must apply for a TRV instead of an eTA." },
      { q: "Should I get a lawyer for a TRV?", a: "Usually overkill — but a licensed consultant can dramatically improve a refused file at modest cost." },
      { q: "Will a TRV refusal hurt my Express Entry chances?", a: "No — TRV refusals don't affect PR eligibility unless misrepresentation was found." },
    ],
  },
  "pr-application-refused": {
    slug: "pr-application-refused",
    name: "PR Application Refused — Re-apply, Appeal or JR",
    shortName: "PR Refusal",
    oneLiner: "PR refusals after ITA are rare but high-stakes. Most stem from documentation gaps, work-experience verification or admissibility.",
    topReasons: [
      "Work experience not matching declared NOC duties",
      "Educational Credential Assessment (ECA) discrepancies",
      "Police certificate gaps for countries lived 6+ months",
      "Medical inadmissibility (excessive demand or danger to public health)",
      "Misrepresentation — even unintentional omissions",
      "Funds proof insufficient for FSW/CEC settlement requirements",
    ],
    pathways: [
      { name: "Re-apply (after curing the issue)", when: "Refusal is not for misrepresentation; profile still scores enough CRS.", cost: "CAD 1,365 single / CAD 2,710 couple", timeline: "6–12 months" },
      { name: "Reconsideration request", when: "Clear officer error of fact.", cost: "Free", timeline: "Variable; success rate low" },
      { name: "Federal Court judicial review", when: "Legal error in the decision; 15-day deadline (in-Canada) / 60-day (overseas).", cost: "CAD ~50 + counsel CAD 5,000–15,000+", timeline: "6–18 months" },
      { name: "Humanitarian & Compassionate (H&C) application", when: "Hardship grounds; rare and discretionary.", cost: "CAD 1,365+", timeline: "24–36 months" },
    ],
    steps: [
      { t: "Order GCMS / ATIP notes", d: "Critical — refusal letter never tells the full story. CAD 5 + 30 days." },
      { t: "Identify root cause", d: "Documentation gap? NOC mismatch? Medical? Each route has a different fix." },
      { t: "Diagnose: curable vs JR-worthy", d: "If officer missed evidence or applied wrong test → JR. If file was genuinely weak → re-apply with cure." },
      { t: "Cure the documentation gap", d: "Re-do ECA with correct institution, refresh PCCs, get employment letters that match NOC duties verbatim." },
      { t: "Re-submit complete file", d: "Don't give IRCC any reason to find new gaps. Our team reviews the entire file before submission." },
    ],
    faqs: [
      { q: "Can I keep working in Canada after a PR refusal?", a: "Only if you have other valid status (work permit, study permit, BOWP). PR refusal alone doesn't strip existing temporary status." },
      { q: "Will my CRS score change for a re-application?", a: "Yes — age, language scores expiry, work experience all affect re-calculation. Many candidates score lower on re-application." },
      { q: "Is misrepresentation always a permanent ban?", a: "5-year ban from any application. Avoid at all costs — even technical omissions can trigger it." },
      { q: "Can I switch from FSW to CEC after refusal?", a: "Yes — if you've gained Canadian work experience, switching streams may be cleaner than re-applying under the same one." },
      { q: "Do I need a lawyer for JR?", a: "Strongly recommended. Self-represented JRs succeed less than 5% of the time." },
    ],
  },
  "spousal-sponsorship-refused": {
    slug: "spousal-sponsorship-refused",
    name: "Spousal Sponsorship Refused — Appeal at IAD",
    shortName: "Spousal Refusal",
    oneLiner: "Outland spousal refusals can be appealed to the Immigration Appeal Division — the only family-class refusal type with a true appeal right.",
    topReasons: [
      "Relationship not deemed genuine (most common)",
      "Marriage of convenience suspected — entered primarily for immigration",
      "Inconsistent statements between sponsor and applicant interviews",
      "Insufficient proof of cohabitation (common-law cases)",
      "Sponsor in default on previous undertakings",
      "Misrepresentation in sponsorship history",
    ],
    pathways: [
      { name: "Appeal to IAD (outland refusals)", when: "Outland refusals get a full de novo appeal at the Immigration Appeal Division.", cost: "Free filing; counsel CAD 5,000–15,000+", timeline: "12–24 months" },
      { name: "Re-apply (inland or outland)", when: "Most inland refusals — IAD has no jurisdiction over inland spousal refusals.", cost: "CAD 1,205", timeline: "12 months" },
      { name: "Federal Court JR (inland refusals only)", when: "Inland refusals; 15-day deadline.", cost: "CAD ~50 + counsel CAD 5,000–15,000+", timeline: "6–18 months" },
    ],
    steps: [
      { t: "Identify whether refusal was inland or outland", d: "Outland → IAD appeal (preferred). Inland → re-apply or JR." },
      { t: "Order GCMS notes", d: "Reveals exactly which 'genuineness' factors the officer doubted." },
      { t: "Build a 100-page relationship evidence file", d: "Photos across years, joint accounts, lease, utilities, communication logs, family statements, travel records." },
      { t: "File IAD appeal within 30 days (outland)", d: "30-day deadline from refusal letter. Strict — don't miss it." },
      { t: "Attend IAD hearing", d: "De novo hearing — officer's decision starts from scratch. Most well-prepared appeals succeed." },
    ],
    faqs: [
      { q: "What's the IAD success rate for spousal appeals?", a: "Roughly 50–60% of outland spousal appeals succeed at IAD, especially when the relationship is genuinely strong." },
      { q: "Can I work in Canada while the appeal is pending?", a: "If you applied inland and got an open work permit, it remains valid until the final negative decision." },
      { q: "Should I just re-apply instead of appealing?", a: "Re-application is faster (~12 months vs 18–24 months at IAD), but a successful appeal preserves the original application date and avoids duplicate fees." },
      { q: "What evidence carries the most weight?", a: "Long-term cohabitation, joint financial entanglement, shared family events, consistent communication patterns over years." },
      { q: "Will my spouse have to attend the IAD hearing?", a: "If they're outside Canada, they can testify by video conference. Sponsor must attend in person." },
    ],
  },
  "pgwp-refused": {
    slug: "pgwp-refused",
    name: "PGWP Refused — Restore Status & Re-apply",
    shortName: "PGWP Refusal",
    oneLiner: "PGWP refusals are time-critical — you have 90 days to restore status. Most refusals stem from program length, DLI eligibility or 180-day deadline.",
    topReasons: [
      "Application submitted more than 180 days after final marks issued",
      "Program completed at non-PGWP-eligible DLI (post-2024 public-private partnership restrictions)",
      "Program length less than 8 months",
      "Field of study not on eligible list (post-2024 changes)",
      "Active study status was not maintained throughout the program",
      "Previously held a PGWP (only one PGWP per lifetime)",
    ],
    pathways: [
      { name: "Restore status + re-apply (within 90 days of refusal)", when: "Refusal was for documentation; you can cure within 90 days.", cost: "CAD 200 restoration + CAD 255 PGWP fees", timeline: "4–8 weeks" },
      { name: "Switch to bridging permit (if PR application is in)", when: "Already submitted Express Entry / PNP PR application.", cost: "CAD 155 BOWP", timeline: "4–8 weeks" },
      { name: "Federal Court judicial review", when: "Decision has clear legal error.", cost: "CAD ~50 + counsel CAD 4,000–10,000+", timeline: "6–18 months" },
      { name: "Leave Canada and apply for new work permit from outside", when: "No restoration option; pursue LMIA or LMIA-exempt route.", cost: "Varies", timeline: "8–16 weeks" },
    ],
    steps: [
      { t: "Confirm the 90-day restoration window", d: "Lost status the day of refusal. 90 days to restore — strict deadline." },
      { t: "Identify the refusal reason", d: "DLI eligibility? 180-day rule? Program length? Each has a different cure." },
      { t: "Apply for restoration + new PGWP", d: "Combined application with CAD 200 restoration + CAD 255 PGWP fees." },
      { t: "Stop working immediately", d: "Implied status doesn't extend to work — working without status = misrepresentation risk on future applications." },
      { t: "Plan PR pivot", d: "If PGWP isn't curable, work with our team on alternate routes (LMIA work permit, study extension, leave-and-return)." },
    ],
    faqs: [
      { q: "What is the 180-day rule?", a: "You must apply for the PGWP within 180 days of receiving final transcripts/letter confirming program completion." },
      { q: "Can I work while my PGWP is being reconsidered?", a: "No — once refused, you lose work authorisation immediately. Implied status applies only to maintained status, not refused applications." },
      { q: "What if my DLI lost PGWP eligibility after I started?", a: "If you were enrolled before the change, you may be grandfathered. Order GCMS notes to confirm." },
      { q: "Can I apply for a second PGWP?", a: "Generally no — IRCC permits only one PGWP per lifetime, regardless of how short the first one was." },
      { q: "Should I just leave Canada?", a: "Sometimes yes — restoration applications carry risk. A clean exit + new work permit from abroad can be cleaner long-term." },
    ],
  },
};

export const REFUSAL_LIST = Object.values(REFUSALS);
export const getRefusal = (slug?: string) =>
  slug ? REFUSALS[slug as RefusalSlug] : undefined;
