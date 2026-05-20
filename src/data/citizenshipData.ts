// Wave 10C — Canadian Citizenship: /citizenship/:topic
export type CitizenshipSlug =
  | "eligibility-requirements"
  | "physical-presence-1095-days"
  | "tax-filing-requirement"
  | "citizenship-test"
  | "citizenship-ceremony"
  | "dual-citizenship"
  | "citizenship-for-children"
  | "proof-of-citizenship";

export interface CitizenshipGuide {
  slug: CitizenshipSlug;
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
  slug: CitizenshipSlug, name: string, shortName: string, oneLiner: string,
  who: string, processingTime: string, fee: string, keyRule: string, outcome: string,
  steps: string[], pitfalls: string[],
  faqs: [string, string][],
): CitizenshipGuide => ({
  slug, name, shortName, oneLiner, who, processingTime, fee, keyRule, outcome,
  steps, pitfalls,
  faqs: faqs.map(([q, a]) => ({ q, a })),
});

export const CITIZENSHIP: Record<CitizenshipSlug, CitizenshipGuide> = {
  "eligibility-requirements": mk(
    "eligibility-requirements",
    "Canadian Citizenship Eligibility — Full Requirements Checklist",
    "Citizenship Eligibility",
    "To apply for Canadian citizenship you need PR status, 1,095 physical days in 5 years, taxes filed, language proof and a clean record.",
    "Permanent residents aged 18+ who meet residency, tax, language and security requirements.",
    "Application processing: 24-36 months (test + ceremony included).",
    "CAD 630 adult (CAD 530 processing + 100 right of citizenship). CAD 100 minors.",
    "1,095 days physical presence in 5 years immediately before application date.",
    "Successful applicants become Canadian citizens with full voting and passport rights.",
    [
      "Confirm 1,095 days physical presence in past 5 years (use physical presence calculator)",
      "File income taxes for 3 of last 5 years (CRA requirement)",
      "Prove language ability — CLB 4 in English or French via approved test or transcript",
      "Submit application (CIT 0002) with fees, photos, ID and travel history",
      "Pass citizenship test, then attend ceremony to take Oath of Citizenship",
    ],
    [
      "Counting time as a visitor/student before PR (only counts as half-days, max 365)",
      "Missing tax filings — automatic refusal",
      "Long trips abroad in the 5-year window that drop you below 1,095",
      "Not declaring a criminal record or pending charges (security check catches it)",
    ],
    [
      ["How long after PR can I apply for citizenship?", "Earliest is 3 years (1,095 days) of physical presence as PR. Most people apply at the 3-4 year mark."],
      ["Do I need to give up my old citizenship?", "No — Canada allows dual citizenship. Whether your origin country allows it is a separate question."],
    ],
  ),
  "physical-presence-1095-days": mk(
    "physical-presence-1095-days",
    "1,095-Day Physical Presence Rule for Canadian Citizenship",
    "1,095-Day Rule",
    "You must be physically in Canada for 1,095 days in the 5 years before applying. Pre-PR days count as half (max 365).",
    "Anyone applying for Canadian citizenship.",
    "Days counted at application submission date.",
    "No separate fee — built into citizenship application.",
    "Pre-PR days count 0.5 (max 365). PR days count 1.0. Day of departure and return both count.",
    "Calculator outputs ≥1,095 = eligible. <1,095 = wait longer or apply when threshold met.",
    [
      "List every entry and exit from Canada in the past 5 years",
      "Count pre-PR days (study/work permit) at half value, capped at 365",
      "Count PR days at full value, including day of departure and day of return",
      "Add total — must reach 1,095 to apply",
      "Use IRCC's online physical presence calculator to confirm",
    ],
    [
      "Forgetting trips abroad — IRCC checks against CBSA travel history",
      "Counting pre-PR days at full value (only half-credit, max 365)",
      "Counting Crown service (military, federal employment abroad) incorrectly",
      "Applying before threshold met — application returned",
    ],
    [
      ["Do weekend trips to the US count against me?", "Yes — every day outside Canada counts as absence. The day of departure and return are counted as days in Canada."],
      ["What if I worked abroad for a Canadian employer?", "Crown service can count, but only for federal Crown corporations or armed forces. Private employers do not count."],
    ],
  ),
  "tax-filing-requirement": mk(
    "tax-filing-requirement",
    "Tax Filing Requirement for Canadian Citizenship",
    "Citizenship Tax Filing",
    "You must have filed Canadian income taxes (or had no requirement to file) for 3 of the 5 years before applying for citizenship.",
    "All citizenship applicants who had a tax-filing obligation in any of the past 5 years.",
    "Verified by CRA at application processing.",
    "No separate fee.",
    "3 of 5 years filed or exempt (no income, non-resident in that year).",
    "Compliance confirmed = application proceeds. Non-compliance = refusal.",
    [
      "List income for each of the past 5 tax years",
      "Confirm filing status with CRA via Notice of Assessment",
      "File any missing returns BEFORE submitting citizenship application",
      "Declare any years you had no obligation (e.g. no Canadian income, non-resident)",
      "Keep proof of filing for the citizenship interview/test stage",
    ],
    [
      "Assuming you don't need to file because you had low income — CRA still expects a return",
      "Filing late returns after applying — fixed but delays processing",
      "Not declaring world income for years you were a tax resident",
      "Misclassifying non-resident years (residency for tax differs from immigration)",
    ],
    [
      ["What if I had no income in some years?", "You're still expected to confirm no filing was required. Most applicants file a NIL return to keep the record clean."],
      ["Can I file all my back taxes now?", "Yes — you can voluntarily disclose and file back returns. Get them filed before applying for citizenship."],
    ],
  ),
  "citizenship-test": mk(
    "citizenship-test",
    "Canadian Citizenship Test — Format, Topics & Pass Mark",
    "Citizenship Test",
    "The citizenship test is 20 multiple-choice questions in 30 minutes, based on the Discover Canada study guide. Pass mark is 15/20 (75%).",
    "Applicants aged 18-54 (under 18 and 55+ are exempt from the test).",
    "Test invitation sent ~6-12 months after application; same-day result.",
    "No test fee — included in citizenship application.",
    "Questions on history, geography, government, rights, responsibilities, symbols.",
    "Pass: ceremony scheduled. Fail: one retest offered; second fail = oral hearing.",
    [
      "Receive test invitation email with date and online or in-person details",
      "Study Discover Canada (free PDF and audio on IRCC site)",
      "Take the test online (with ID check) or in-person at IRCC office",
      "Result given same day — 15/20 needed to pass",
      "If passed, await ceremony invitation (1-3 months)",
    ],
    [
      "Skipping the Discover Canada guide — questions are taken directly from it",
      "Confusing federal vs provincial responsibilities (common question area)",
      "Failing to bring all required ID on test day",
      "Missing the test date without rescheduling — counts as a fail",
    ],
    [
      ["What's the pass mark?", "75% — 15 correct out of 20 questions in 30 minutes."],
      ["Can I retake the test if I fail?", "Yes — one retest is offered automatically. If you fail twice, you're scheduled for an oral hearing with a citizenship officer."],
    ],
  ),
  "citizenship-ceremony": mk(
    "citizenship-ceremony",
    "Canadian Citizenship Ceremony — Oath, Timing & What to Expect",
    "Citizenship Ceremony",
    "The ceremony is the final step — you take the Oath of Citizenship, receive your certificate, and officially become Canadian.",
    "Applicants who passed the test and cleared background checks.",
    "Scheduled 1-3 months after passing the test. Held online (video) or in person.",
    "No ceremony fee.",
    "Oath must be taken in person or on camera; you must be visible the whole time on video ceremonies.",
    "Citizenship Certificate issued immediately. Passport application can be made the next day.",
    [
      "Receive ceremony invitation with date, time and format (online/in-person)",
      "Prepare ID, PR card, and a printed copy of the invitation",
      "Attend ceremony — Oath of Citizenship recited in English or French",
      "Receive Citizenship Certificate (paper or digital)",
      "Apply for Canadian passport the next day with new certificate",
    ],
    [
      "Missing the ceremony without rescheduling — significant delay",
      "On video ceremonies, leaving camera view during oath = oath not valid",
      "Forgetting to surrender PR card at the ceremony",
      "Not updating address — certificate may be sent to old address",
    ],
    [
      ["When can I apply for a passport after ceremony?", "Immediately — bring your new Citizenship Certificate to Service Canada the next day."],
      ["Can I bring family to my ceremony?", "Yes for in-person ceremonies (subject to capacity). Online ceremonies are individual."],
    ],
  ),
  "dual-citizenship": mk(
    "dual-citizenship",
    "Dual Citizenship in Canada — Rules & Country-by-Country Acceptance",
    "Dual Citizenship",
    "Canada allows dual and multiple citizenships without restriction. Whether your origin country allows it is the deciding factor.",
    "New Canadians keeping their original citizenship.",
    "Same as standard citizenship — 24-36 months.",
    "Standard citizenship fees only.",
    "Canada imposes no limit. Some countries (India, China) auto-revoke citizenship when you naturalize.",
    "You hold both passports unless your origin country prohibits dual nationality.",
    [
      "Confirm your origin country's dual-citizenship rules",
      "Apply for Canadian citizenship through the normal route",
      "On approval, keep both passports — use Canadian passport for entry to Canada",
      "If origin country revokes citizenship (e.g. India): apply for OCI card to retain travel/work rights",
      "Declare all citizenships on tax and immigration filings",
    ],
    [
      "Assuming all countries allow dual citizenship — India and China do not",
      "Travelling to Canada on your old passport — must use Canadian passport once a citizen",
      "Not obtaining OCI after losing Indian citizenship — locks you out of property/work rights in India",
      "Forgetting tax implications of dual residency",
    ],
    [
      ["Does India allow dual citizenship?", "No — India does not allow dual citizenship. Indian citizens who become Canadian lose Indian citizenship automatically and should apply for an OCI card."],
      ["Can I travel to Canada on my old passport?", "No — Canadian citizens must enter Canada on a Canadian passport. Airlines deny boarding if you try to use a foreign passport."],
    ],
  ),
  "citizenship-for-children": mk(
    "citizenship-for-children",
    "Canadian Citizenship for Children — Born Abroad or Newly Landed",
    "Citizenship for Children",
    "Children born in Canada are automatic citizens. Children born abroad to a Canadian parent qualify via the first-generation rule.",
    "Children under 18 — born in Canada, born abroad to a Canadian, or PR minors applying with a parent.",
    "Proof of Citizenship (born abroad): 5-12 months. Grant for PR minors: 24-36 months.",
    "CAD 100 minor grant application. CAD 75 proof of citizenship.",
    "First-generation limit: child born abroad to a Canadian who was also born abroad does not auto-qualify.",
    "Citizenship Certificate issued; child can travel on Canadian passport.",
    [
      "Born in Canada: child is automatically a citizen at birth (no application needed)",
      "Born abroad to a Canadian parent (first generation): apply for Proof of Citizenship online",
      "PR minor with PR parent: apply for grant under section 5(2) — physical presence not required",
      "PR minor without PR parent: must meet adult criteria (1,095 days)",
      "Receive Citizenship Certificate; apply for child passport at Service Canada",
    ],
    [
      "Second-generation born abroad — does not auto-qualify (recent court ruling pending)",
      "Filing grant for a PR minor without a PR parent — must meet full adult criteria",
      "Confusing Proof of Citizenship (declaratory) with Grant (acquisition)",
      "Forgetting to apply for child's first passport with the new certificate",
    ],
    [
      ["My child was born outside Canada — are they a citizen?", "Yes if you (the parent) are a Canadian citizen born in Canada or naturalized. Beyond the first generation, the child does not auto-qualify."],
      ["Do my PR kids need to wait 3 years like I do?", "No — if at least one parent is a Canadian citizen, the child can be granted citizenship under section 5(2) without the physical-presence requirement."],
    ],
  ),
  "proof-of-citizenship": mk(
    "proof-of-citizenship",
    "Proof of Canadian Citizenship — Certificate vs Birth Certificate",
    "Proof of Citizenship",
    "A Citizenship Certificate is the official proof of Canadian citizenship for people born abroad or naturalized. Born-in-Canada citizens use a provincial birth certificate.",
    "Anyone needing proof of Canadian citizenship for a passport, job or government service.",
    "5-12 months for Proof of Citizenship; urgent service in 5 business days.",
    "CAD 75 standard. CAD 75 urgent.",
    "Birth certificate (born in Canada) or Citizenship Certificate (born abroad/naturalized) both count as proof.",
    "Certificate or replacement issued; passport application becomes possible.",
    [
      "Determine document needed: birth certificate (born in Canada) or Citizenship Certificate",
      "Apply online with photo ID, two photos, and supporting documents",
      "Pay CAD 75 (or request urgent processing with travel evidence)",
      "Receive Citizenship Certificate by mail",
      "Use for passport application or government services",
    ],
    [
      "Using an expired Citizenship Card (replaced by Certificate in 2012) for new passport — apply for Certificate first",
      "Submitting photocopies instead of certified originals where required",
      "Missing urgent-processing evidence (flight booked within 4 weeks)",
      "Forgetting to declare a name change — must include marriage/legal docs",
    ],
    [
      ["Do I need a Citizenship Certificate if I was born in Canada?", "No — your provincial birth certificate is sufficient proof of citizenship. You can apply for a passport with just the birth certificate."],
      ["What replaced the old Citizenship Card?", "The Citizenship Certificate replaced the wallet-sized Citizenship Card in 2012. Old cards remain valid as proof but cannot be reissued."],
    ],
  ),
};

export const CITIZENSHIP_LIST = Object.values(CITIZENSHIP);
export function getCitizenship(slug: string | undefined): CitizenshipGuide | null {
  if (!slug) return null;
  return CITIZENSHIP[slug as CitizenshipSlug] ?? null;
}