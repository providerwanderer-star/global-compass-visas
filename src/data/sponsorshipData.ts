// Wave 6B — Family / dependent sponsorship pages: /sponsor/:type
export type SponsorshipSlug =
  | "spouse-common-law-partner"
  | "parents-grandparents"
  | "dependent-children"
  | "super-visa"
  | "adopted-children"
  | "orphaned-relatives";

export interface SponsorshipPathway {
  slug: SponsorshipSlug;
  name: string;
  shortName: string;
  oneLiner: string;
  whoQualifies: string;
  processingTime: string;
  govFees: string;
  keyRequirements: string[];
  steps: { t: string; d: string }[];
  rejectionReasons: string[];
  faqs: { q: string; a: string }[];
}

export const SPONSORSHIPS: Record<SponsorshipSlug, SponsorshipPathway> = {
  "spouse-common-law-partner": {
    slug: "spouse-common-law-partner",
    name: "Spouse, Common-Law Partner & Conjugal Partner Sponsorship",
    shortName: "Spousal Sponsorship",
    oneLiner: "Sponsor your spouse, common-law or conjugal partner for Canadian PR — inland or outland streams available.",
    whoQualifies: "Canadian citizens and PRs aged 18+ who are not in receipt of social assistance (except disability) and not currently sponsoring another partner.",
    processingTime: "Approximately 12 months for both inland and outland (as of 2026 IRCC service standards)",
    govFees: "CAD 1,205 total per principal applicant (sponsorship + processing + RPRF + biometrics)",
    keyRequirements: [
      "Genuine relationship (married, common-law for 12+ months, or conjugal where cohabitation is impossible)",
      "Sponsor not in default on previous undertakings or court-ordered support",
      "Sponsor and applicant complete IMM 5532 Relationship Information form",
      "Proof of relationship: photos, joint accounts, communication history, statutory declarations"
    ],
    steps: [
      { t: "Confirm eligibility", d: "Sponsor must be 18+, citizen/PR, and meet sponsor undertakings (3-year financial responsibility for spouse)." },
      { t: "Choose inland or outland", d: "Inland = applicant in Canada (eligible for open work permit). Outland = processed via the visa office." },
      { t: "Compile relationship evidence", d: "Photos across years, joint lease/mortgage, joint bank accounts, travel records, communication logs." },
      { t: "Submit complete application", d: "Sponsorship + PR application together. Pay CAD 1,205. Add police certificates and medicals upfront." },
      { t: "Respond to officer requests", d: "Some files trigger an interview. Always respond within deadlines; misrepresentation is the #1 refusal trigger." }
    ],
    rejectionReasons: [
      "Insufficient proof of genuine relationship (most common)",
      "Inconsistent statements between sponsor and applicant",
      "Sponsor in default on previous sponsorship undertaking",
      "Misrepresentation — even unintentional omissions trigger 5-year bans"
    ],
    faqs: [
      { q: "How long does spousal sponsorship really take in 2026?", a: "IRCC's standard is ~12 months for both streams. Complex files (prior refusals, common-law without strong cohabitation evidence) take longer." },
      { q: "Can my spouse work while waiting?", a: "Yes — inland applicants are eligible for an open work permit (SP-1) issued in 3–4 months." },
      { q: "Do common-law and married couples have equal rights?", a: "Yes — IRCC treats them identically once 12 months of cohabitation is proven." },
      { q: "Can I sponsor a same-sex partner?", a: "Yes — Canada recognises same-sex marriage and common-law partnerships fully." },
      { q: "What if my application is refused?", a: "Outland refusals can be appealed at the Immigration Appeal Division (IAD). Inland refusals usually require a fresh application." }
    ],
  },
  "parents-grandparents": {
    slug: "parents-grandparents",
    name: "Parents & Grandparents Program (PGP)",
    shortName: "PGP Sponsorship",
    oneLiner: "Sponsor your parents or grandparents for Canadian PR — lottery-based intake announced annually.",
    whoQualifies: "Canadian citizens and PRs 18+ who meet income (MNI) thresholds for 3 consecutive tax years and are selected from the Interest to Sponsor pool.",
    processingTime: "20–24 months from invitation to PR landing",
    govFees: "CAD 1,205 per parent/grandparent (sponsorship + processing + RPRF + biometrics)",
    keyRequirements: [
      "Submitted Interest to Sponsor form during the open window (varies year to year)",
      "Meet Minimum Necessary Income (MNI) for 3 consecutive tax years — proven via Notice of Assessment",
      "20-year financial undertaking (40 years in Quebec)",
      "Sponsor Canadian resident at time of application"
    ],
    steps: [
      { t: "Submit Interest to Sponsor", d: "When IRCC opens the annual window, file the Interest to Sponsor form. This is the lottery entry — no income proof yet." },
      { t: "Wait for invitation", d: "IRCC randomly selects from the pool. 2024 selected ~24,200 from a multi-year pool. No guaranteed selection." },
      { t: "Meet MNI for 3 tax years", d: "Use the year's MNI table (varies by family size). Provide CRA Notices of Assessment as proof." },
      { t: "Submit complete sponsorship + PR application", d: "Within 60 days of invitation. Include all forms, medicals, PCCs, financial proof." },
      { t: "Wait 20–24 months for landing", d: "Most files complete within 24 months from invitation." }
    ],
    rejectionReasons: [
      "Income below MNI in one of the three required tax years",
      "Failure to file CRA returns for the qualifying years",
      "Sponsor not residing in Canada at time of application",
      "Incomplete medical (parents 65+ frequently flagged for excessive demand on health system)"
    ],
    faqs: [
      { q: "Is there a guaranteed way to sponsor parents?", a: "No — PGP is lottery-based. The Super Visa is the more reliable alternative for long-stay visits without PR." },
      { q: "What is the MNI for 2026?", a: "MNI varies by family size and year — IRCC publishes the table. For 2 people in 2024 it was ~CAD 47,549 minimum across each of the 3 years." },
      { q: "Can both spouses combine income?", a: "Yes — a co-signing spouse's income counts toward MNI." },
      { q: "What if I miss the Interest to Sponsor window?", a: "You must wait for the next annual opening. Use the Super Visa as an interim option." },
      { q: "How long is the financial undertaking?", a: "20 years from the date of landing (40 years in Quebec). You're financially liable for any social assistance received." }
    ],
  },
  "dependent-children": {
    slug: "dependent-children",
    name: "Dependent Children Sponsorship",
    shortName: "Dependent Children",
    oneLiner: "Sponsor your biological or adopted children for Canadian PR — no income requirement for sponsors.",
    whoQualifies: "Citizens and PRs sponsoring biological or adopted children under 22 (or older if dependent due to physical/mental condition).",
    processingTime: "12 months on average",
    govFees: "CAD ~175 per dependent child (no RPRF for children)",
    keyRequirements: [
      "Child under 22 and not a spouse/common-law partner",
      "OR over 22 and dependent due to mental/physical condition since before age 22",
      "Birth certificate / legal adoption documents",
      "DNA test if biological relationship contested by visa officer"
    ],
    steps: [
      { t: "Confirm child meets dependent definition", d: "Under 22 and unmarried, or 22+ with a continuous condition preventing self-support." },
      { t: "Gather civil documents", d: "Birth certificates, adoption decrees, custody orders. Translate non-English/French documents." },
      { t: "Submit sponsorship + PR application", d: "Pay CAD ~175 per child. No RPRF for dependent children. Include medical exam." },
      { t: "Respond to DNA / verification requests", d: "Some files trigger DNA testing — IRCC will instruct an accredited lab." },
      { t: "Land with PR", d: "Processing typically 12 months." }
    ],
    rejectionReasons: [
      "Child turned 22 between filing and decision (lock-in age applies but timing matters)",
      "Sole custody not properly documented in shared-custody cases",
      "Adoption not recognised under Canadian law",
      "Inconsistent civil documents"
    ],
    faqs: [
      { q: "Does my income matter when sponsoring my child?", a: "No — there is no MNI requirement for sponsoring dependent children (unlike PGP)." },
      { q: "Can I sponsor a step-child?", a: "Yes — if you legally adopted them, or if they qualify as a dependent of your sponsored spouse." },
      { q: "What's the lock-in age?", a: "Age is locked at the date IRCC receives the complete application, not the decision date." },
      { q: "Do shared-custody cases need the other parent's consent?", a: "Yes — written consent from the non-sponsoring parent or a court order is required." },
      { q: "Can children over 22 be sponsored?", a: "Only if they have been continuously dependent due to a physical/mental condition since before age 22." }
    ],
  },
  "super-visa": {
    slug: "super-visa",
    name: "Parent & Grandparent Super Visa",
    shortName: "Super Visa",
    oneLiner: "Multi-entry visa allowing parents/grandparents to visit Canada for up to 5 years per stay — no PR lottery required.",
    whoQualifies: "Parents and grandparents of Canadian citizens or PRs who meet income thresholds and have valid Canadian medical insurance.",
    processingTime: "8–14 weeks (varies by visa office)",
    govFees: "CAD 100 application + CAD 85 biometrics",
    keyRequirements: [
      "Host child / grandchild meets Low Income Cut-Off (LICO) for family size",
      "Canadian medical insurance valid 1+ year, minimum CAD 100,000 coverage",
      "Letter of invitation from the host",
      "Medical exam by IRCC-approved panel physician"
    ],
    steps: [
      { t: "Host meets LICO", d: "Host must show income at or above the LICO for combined household + visiting parents/grandparents." },
      { t: "Buy Canadian medical insurance", d: "1-year minimum, CAD 100,000+ coverage from a Canadian insurer (recently expanded to allow some non-Canadian insurers)." },
      { t: "Get medical exam", d: "Required from IRCC-approved panel physician — book early as slots fill in some countries." },
      { t: "Submit application + biometrics", d: "Online application + CAD 100 + biometrics. Include invitation letter, NOA, insurance policy, medical results." },
      { t: "Receive 10-year multi-entry visa", d: "Each visit can last up to 5 years; visa valid up to passport expiry, max 10 years." }
    ],
    rejectionReasons: [
      "Host income below LICO for the relevant year",
      "Insurance policy under CAD 100,000 or under 1 year",
      "Officer doubts intent to leave Canada at end of stay",
      "Weak ties to home country (assets, employment, dependents)"
    ],
    faqs: [
      { q: "How long can my parents stay in Canada per visit?", a: "Up to 5 years per entry under the Super Visa — extendable from inside Canada." },
      { q: "Do parents need to leave and re-enter every 5 years?", a: "Yes — but they can apply for an extension before the 5 years end without leaving." },
      { q: "Is the Super Visa easier than PGP?", a: "Yes — no lottery, no 20-year undertaking, processed in months not years. But it's a visit not PR." },
      { q: "Can my parents work or study on a Super Visa?", a: "No — visits only. For work or study they'd need separate permits." },
      { q: "What if my income is just below LICO?", a: "You can add a co-signer (spouse). Otherwise the application will be refused." }
    ],
  },
  "adopted-children": {
    slug: "adopted-children",
    name: "Sponsoring Adopted Children",
    shortName: "Adopted Children",
    oneLiner: "Bring an internationally adopted child to Canada as a citizen or PR — two parallel processes (citizenship grant or PR sponsorship).",
    whoQualifies: "Canadian citizens (citizenship grant route) or PRs (sponsorship route) adopting a child internationally.",
    processingTime: "12–24 months depending on country of adoption",
    govFees: "CAD ~175 (PR route) or CAD 100 (citizenship grant)",
    keyRequirements: [
      "Adoption complete or in progress under Canadian and home-country law",
      "Provincial / territorial adoption authority approval (Letter of No Objection)",
      "Hague Convention compliance if applicable",
      "Best interests of the child confirmed"
    ],
    steps: [
      { t: "Get provincial adoption approval", d: "Apply through the provincial Central Authority for adoption — they coordinate with the child's country." },
      { t: "Choose route — citizenship grant vs PR", d: "Citizens can apply for direct grant of citizenship; PRs must use the PR sponsorship route." },
      { t: "Complete adoption process", d: "Coordinate with foreign Central Authority (Hague) or country-specific authority." },
      { t: "Submit IRCC application", d: "Submit citizenship grant or PR sponsorship file with adoption order, home study, child's documents." },
      { t: "Bring child to Canada", d: "Receive Confirmation of Citizenship or Confirmation of Permanent Residence." }
    ],
    rejectionReasons: [
      "Adoption not compliant with Hague Convention (where applicable)",
      "Adoption deemed adoption of convenience for immigration purposes",
      "Provincial Letter of No Objection not obtained",
      "Best interests of child not adequately documented"
    ],
    faqs: [
      { q: "Is the citizenship grant route faster?", a: "Often yes — but only available to citizens, and the child does not get PR (they become a citizen directly)." },
      { q: "Can I adopt from any country?", a: "No — Canada has restrictions on certain countries; check with your provincial Central Authority." },
      { q: "Do I need a home study?", a: "Yes — required by the province before any international adoption." },
      { q: "Can I sponsor a relative's child without legal adoption?", a: "Generally no — informal guardianship is not enough; you need a formal adoption recognised in Canada." },
      { q: "What about adopting an adult relative?", a: "Adult adoption is possible but rarely succeeds for immigration; IRCC scrutinises closely for adoption of convenience." }
    ],
  },
  "orphaned-relatives": {
    slug: "orphaned-relatives",
    name: "Sponsoring Orphaned Brothers, Sisters, Nieces, Nephews & Grandchildren",
    shortName: "Orphaned Relatives",
    oneLiner: "Sponsor an orphaned relative under 18 for Canadian PR — strict eligibility, narrow qualifying conditions.",
    whoQualifies: "Citizens / PRs sponsoring an orphaned brother, sister, nephew, niece or grandchild who is under 18, unmarried and has both parents deceased.",
    processingTime: "12–24 months",
    govFees: "CAD ~175 per applicant",
    keyRequirements: [
      "Relative is under 18 and unmarried",
      "Both biological parents are deceased — death certificates required",
      "Sponsor has no other 'closer' relative who could be sponsored instead (no living spouse, dependent child, parents, etc.)",
      "Sponsor not in default on previous undertakings"
    ],
    steps: [
      { t: "Confirm strict eligibility", d: "Both parents must be deceased; relative must be under 18 and unmarried; sponsor must have no closer family abroad eligible to sponsor." },
      { t: "Compile death certificates and proof of relationship", d: "Translated, certified copies of both parents' death certificates plus birth/family registry records." },
      { t: "Submit sponsorship + PR application", d: "Pay CAD ~175. Include guardianship documents from country of origin." },
      { t: "Provide custody arrangement", d: "Demonstrate that sponsor has or will have legal custody in Canada." },
      { t: "Land with PR", d: "Processing typically 12–24 months." }
    ],
    rejectionReasons: [
      "One parent still living — full orphan requirement is strict",
      "Sponsor has another eligible 'closer' relative abroad (e.g. parent) — that relative must be sponsored first",
      "Relative is 18+ at lock-in date",
      "Insufficient documentation of guardianship in Canada"
    ],
    faqs: [
      { q: "What if only one parent is deceased?", a: "The relative does not qualify — both biological parents must be deceased to use this stream." },
      { q: "Can I sponsor an orphaned cousin?", a: "No — only brothers, sisters, nephews, nieces and grandchildren qualify under this category." },
      { q: "What is the 'closer relative' rule?", a: "If you have any other family member abroad who could be sponsored under family class (parent, spouse, child), you must sponsor them instead — the orphan stream is a last resort." },
      { q: "What if the relative turns 18 during processing?", a: "Age is locked at the date IRCC receives the complete application." },
      { q: "Do I need a home study?", a: "Not formally, but officers expect detailed evidence of custody arrangements and care plan in Canada." }
    ],
  },
};

export const SPONSORSHIP_LIST = Object.values(SPONSORSHIPS);
export const getSponsorship = (slug?: string) =>
  slug ? SPONSORSHIPS[slug as SponsorshipSlug] : undefined;
