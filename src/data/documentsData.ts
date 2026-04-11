export interface DocumentChecklist {
  slug: string;
  title: string;
  shortTitle: string;
  emoji: string;
  description: string;
  documents: {
    category: string;
    items: string[];
  }[];
  tips: string[];
}

export const documentsData: DocumentChecklist[] = [
  {
    slug: "canada-pr",
    title: "Canada Permanent Residency (PR) Document Checklist",
    shortTitle: "Canada PR",
    emoji: "🇨🇦",
    description: "Complete list of documents required for Express Entry, PNP, and other Canada PR pathways.",
    documents: [
      {
        category: "Identity & Travel",
        items: [
          "Valid passport (all pages scanned)",
          "National ID card (Aadhaar / PAN for India)",
          "Birth certificate",
          "2 recent passport-size photographs (35mm × 45mm)",
          "Travel history — previous visas and stamps",
        ],
      },
      {
        category: "Education",
        items: [
          "Educational Credential Assessment (ECA) from WES or equivalent",
          "Degree certificates & transcripts (all post-secondary)",
          "Diploma / marksheets for secondary education",
          "Professional licence or trade certificate (if applicable)",
        ],
      },
      {
        category: "Language Proficiency",
        items: [
          "IELTS General Training score report (valid within 2 years)",
          "CELPIP score report (alternative to IELTS)",
          "TEF Canada / TCF Canada (for French proficiency)",
        ],
      },
      {
        category: "Work Experience",
        items: [
          "Reference letters from current & past employers",
          "Employment contracts / offer letters",
          "Pay stubs or salary slips (last 3–6 months)",
          "Tax returns / T4 slips / Form 16 (last 3 years)",
          "Resume / CV (updated and detailed)",
        ],
      },
      {
        category: "Financial",
        items: [
          "Proof of funds — bank statements (last 6 months)",
          "Fixed deposit certificates",
          "Investment portfolio statements",
          "Proof of settlement funds as per IRCC requirements",
        ],
      },
      {
        category: "Police & Medical",
        items: [
          "Police Clearance Certificate (PCC) from each country lived in 6+ months",
          "Medical examination report from IRCC-designated physician",
          "Upfront medical results (if applicable)",
        ],
      },
      {
        category: "Additional",
        items: [
          "Marriage certificate (if applicable)",
          "Divorce decree / death certificate of former spouse (if applicable)",
          "Birth certificates of dependent children",
          "Adoption papers (if applicable)",
          "Provincial Nomination Certificate (if PNP stream)",
          "LMIA-approved job offer (if applicable)",
        ],
      },
    ],
    tips: [
      "Get your ECA done early — WES processing takes 4–8 weeks",
      "Ensure IELTS scores are above CLB 7 for maximum CRS points",
      "Bank statements must show consistent balance, not just a lump-sum deposit",
      "All non-English documents must be translated by a certified translator",
    ],
  },
  {
    slug: "student-visa",
    title: "Student Visa Document Checklist",
    shortTitle: "Student Visa",
    emoji: "🎓",
    description: "Documents required for study permits to Canada, Australia, UK, and Germany.",
    documents: [
      {
        category: "Identity & Travel",
        items: [
          "Valid passport (minimum 6 months validity beyond travel date)",
          "National ID (Aadhaar / PAN)",
          "4 passport-size photographs",
          "Previous visa refusal letters (if any)",
        ],
      },
      {
        category: "Admission & Education",
        items: [
          "Letter of Acceptance (LOA) from designated learning institution (DLI)",
          "All academic transcripts and marksheets (10th, 12th, graduation)",
          "Degree / diploma certificates",
          "Statement of Purpose (SOP)",
          "Letters of recommendation (academic)",
          "GRE / GMAT / SAT scores (if required by university)",
        ],
      },
      {
        category: "Language Proficiency",
        items: [
          "IELTS Academic score report",
          "TOEFL iBT score report (alternative)",
          "PTE Academic score report (for Australia / UK)",
          "Duolingo English Test (if accepted by institution)",
        ],
      },
      {
        category: "Financial",
        items: [
          "Proof of tuition payment or fee receipt",
          "GIC (Guaranteed Investment Certificate) — for Canada",
          "Bank statements of sponsor (last 12 months)",
          "Fixed deposit receipts",
          "Education loan sanction letter",
          "Scholarship letter (if applicable)",
          "Sponsor's income tax returns (last 3 years)",
          "Sponsor's employment / business proof",
          "Affidavit of financial support",
        ],
      },
      {
        category: "Additional",
        items: [
          "Medical examination report",
          "Police Clearance Certificate",
          "Custodianship declaration (if minor)",
          "Gap explanation letter (if applicable)",
          "Travel insurance",
        ],
      },
    ],
    tips: [
      "Apply for SDS (Student Direct Stream) for faster processing in Canada",
      "GIC amount is currently CAD 20,635 — check IRCC for latest updates",
      "SOP should clearly explain why you chose this program and institution",
      "Start your application at least 4–6 months before intake",
    ],
  },
  {
    slug: "work-permit",
    title: "Work Permit Document Checklist",
    shortTitle: "Work Permit",
    emoji: "💼",
    description: "Essential documents for open work permits, LMIA-based, and employer-specific work permits.",
    documents: [
      {
        category: "Identity & Travel",
        items: [
          "Valid passport",
          "Previous Canadian visas / permits (if any)",
          "2 passport-size photographs",
          "National ID",
        ],
      },
      {
        category: "Employment",
        items: [
          "Job offer letter from Canadian employer",
          "LMIA (Labour Market Impact Assessment) — positive or exempt",
          "Employment contract with salary and terms",
          "Employer's business licence or incorporation documents",
          "LMIA number and employer LMIA confirmation",
        ],
      },
      {
        category: "Education & Skills",
        items: [
          "Educational credentials and transcripts",
          "ECA report (if applicable)",
          "Professional certifications / trade licences",
          "Resume / CV",
        ],
      },
      {
        category: "Financial & Supporting",
        items: [
          "Proof of funds for initial settlement",
          "Bank statements (last 3 months)",
          "Medical examination results",
          "Police Clearance Certificate",
          "Family information form (IMM 5707)",
        ],
      },
    ],
    tips: [
      "LMIA processing can take 2–4 months — plan ahead",
      "Ensure your NOC code matches the job duties described in the offer letter",
      "Spousal open work permit is available if you have a valid work permit",
    ],
  },
  {
    slug: "visitor-visa",
    title: "Visitor Visa & Super Visa Document Checklist",
    shortTitle: "Visitor / Super Visa",
    emoji: "✈️",
    description: "Documents needed for tourist visa, business visit, or Super Visa for parents and grandparents.",
    documents: [
      {
        category: "Identity & Travel",
        items: [
          "Valid passport (all pages)",
          "Old passports (if any)",
          "2 recent photographs (as per country requirements)",
          "Travel itinerary / flight reservation",
        ],
      },
      {
        category: "Purpose of Visit",
        items: [
          "Invitation letter from host in Canada / destination country",
          "Host's proof of status (citizenship, PR card, or valid permit)",
          "Host's income documents (NOA, T4, employment letter)",
          "Relationship proof (for family visits)",
          "Business invitation / conference registration (for business visits)",
        ],
      },
      {
        category: "Financial",
        items: [
          "Personal bank statements (last 6 months)",
          "Property documents / asset proof",
          "Income tax returns (last 3 years)",
          "Employment letter or business registration",
          "Pension statements (for retired applicants)",
        ],
      },
      {
        category: "Super Visa Specific",
        items: [
          "Medical insurance from a Canadian insurance company (min $100,000 coverage, valid 1 year)",
          "Child or grandchild's financial proof (meets LICO requirement)",
          "Upfront medical examination",
          "Letter of intent explaining purpose and duration",
        ],
      },
      {
        category: "Ties to Home Country",
        items: [
          "Property ownership documents",
          "Employment / business proof",
          "Family ties evidence (marriage certificate, children's documents)",
          "Vehicle registration",
        ],
      },
    ],
    tips: [
      "Super Visa requires private medical insurance — buy before applying",
      "Strong ties to home country reduce refusal risk significantly",
      "Include a detailed travel plan with dates and accommodation details",
    ],
  },
  {
    slug: "family-sponsorship",
    title: "Family Sponsorship Document Checklist",
    shortTitle: "Family Sponsorship",
    emoji: "👨‍👩‍👧‍👦",
    description: "Documents for spousal sponsorship, parent/grandparent sponsorship, and dependent children.",
    documents: [
      {
        category: "Sponsor Documents",
        items: [
          "Canadian citizenship certificate or PR card (both sides)",
          "Notice of Assessment (NOA) — last 3 years",
          "T4 / T1 tax returns — last 3 years",
          "Employment letter with salary details",
          "Bank statements (last 6 months)",
          "Signed sponsorship undertaking (IMM 1344)",
        ],
      },
      {
        category: "Applicant (Sponsored Person) Documents",
        items: [
          "Valid passport",
          "Birth certificate",
          "Police Clearance Certificate (from every country lived 6+ months)",
          "Medical examination results (from panel physician)",
          "2 passport-size photographs",
          "National ID",
        ],
      },
      {
        category: "Relationship Proof (Spousal)",
        items: [
          "Marriage certificate (government-issued)",
          "Wedding photos and invitation cards",
          "Communication logs (call history, chat screenshots)",
          "Joint bank accounts or financial co-mingling",
          "Lease or utility bills with both names",
          "Statutory declarations from family and friends",
          "Travel records showing visits together",
        ],
      },
      {
        category: "Parent / Grandparent Specific",
        items: [
          "Proof meeting Minimum Necessary Income (MNI)",
          "CRA documents showing 3 consecutive years of qualifying income",
          "Sponsor's family composition details",
        ],
      },
      {
        category: "Dependent Children",
        items: [
          "Birth certificate listing both parents",
          "Custody documents / court orders (if applicable)",
          "Consent letter from non-accompanying parent (if applicable)",
          "Adoption papers (if applicable)",
          "School enrollment records",
        ],
      },
    ],
    tips: [
      "Spousal sponsorship processing is currently 12–15 months",
      "Include at least 10–15 pieces of relationship evidence",
      "Keep communication evidence chronological and organized",
    ],
  },
  {
    slug: "pnp-application",
    title: "Provincial Nominee Program (PNP) Document Checklist",
    shortTitle: "PNP Application",
    emoji: "🏛️",
    description: "Documents needed for Ontario OINP, BC PNP, Alberta AINP, and other provincial nomination programs.",
    documents: [
      {
        category: "Identity",
        items: [
          "Valid passport",
          "Birth certificate",
          "National ID",
          "Passport-size photographs",
        ],
      },
      {
        category: "Education",
        items: [
          "ECA report from WES or equivalent",
          "All degree certificates and transcripts",
          "Professional certifications",
        ],
      },
      {
        category: "Language",
        items: [
          "IELTS / CELPIP / TEF scores (valid within 2 years)",
        ],
      },
      {
        category: "Work Experience",
        items: [
          "Employer reference letters (detailed — duties, hours, salary)",
          "Employment contracts",
          "Pay stubs and tax documents",
          "Job offer from provincial employer (if employer-driven stream)",
        ],
      },
      {
        category: "Provincial Specific",
        items: [
          "Settlement plan / intent to reside in the province",
          "Connection to province (previous work, study, family)",
          "Business plan (if entrepreneur stream)",
          "Net worth proof (if business stream)",
          "Provincial registration form",
        ],
      },
      {
        category: "Financial & Medical",
        items: [
          "Proof of settlement funds",
          "Bank statements",
          "Medical exam results",
          "Police clearance certificates",
        ],
      },
    ],
    tips: [
      "Each province has different streams — check eligibility for your specific province",
      "Ontario OINP frequently opens draws for tech workers",
      "BC PNP Tech stream has priority processing for 29 tech occupations",
    ],
  },
  {
    slug: "citizenship",
    title: "Canadian Citizenship Application Document Checklist",
    shortTitle: "Citizenship",
    emoji: "🍁",
    description: "Documents required to apply for Canadian citizenship after meeting residency requirements.",
    documents: [
      {
        category: "Identity",
        items: [
          "Current and previous PR cards (both sides)",
          "Valid passport and all previous passports",
          "2 citizenship photos (as per specifications)",
          "Birth certificate",
          "Name change certificate (if applicable)",
        ],
      },
      {
        category: "Residency Proof",
        items: [
          "CRA tax returns / NOA for last 5 years",
          "T4 slips for each year",
          "Employment records covering physical presence in Canada",
          "Travel journal / records of absences from Canada",
          "Utility bills / lease agreements showing Canadian address",
        ],
      },
      {
        category: "Language",
        items: [
          "IELTS / CELPIP / TEF results (if age 18–54)",
          "Canadian high school or post-secondary diploma (as language alternative)",
        ],
      },
      {
        category: "Additional",
        items: [
          "Marriage certificate (if applicable)",
          "Divorce decree (if applicable)",
          "Military service records (if any)",
          "Citizenship application fee payment receipt",
        ],
      },
    ],
    tips: [
      "You need 1,095 days of physical presence in Canada within the last 5 years",
      "Time spent as a temporary resident counts as half days (up to 365 days)",
      "Study for the citizenship test using the official 'Discover Canada' guide",
    ],
  },
  {
    slug: "job-seeker-visa",
    title: "Germany Job Seeker Visa Document Checklist",
    shortTitle: "Germany Job Seeker",
    emoji: "🇩🇪",
    description: "Documents required for the Germany Job Seeker Visa / Opportunity Card.",
    documents: [
      {
        category: "Identity & Travel",
        items: [
          "Valid passport (at least 2 blank pages)",
          "3 biometric passport photographs",
          "Cover letter explaining purpose of visit",
          "Detailed CV / resume (Europass format preferred)",
        ],
      },
      {
        category: "Education & Qualifications",
        items: [
          "Degree certificate with apostille / authentication",
          "Transcript of records",
          "Recognition of foreign qualification from anabin database or ZAB",
          "Professional certifications",
        ],
      },
      {
        category: "Language",
        items: [
          "German language certificate (B1/B2 recommended) — Goethe, TestDaF, or telc",
          "English language certificate (IELTS / TOEFL) if applicable",
        ],
      },
      {
        category: "Financial",
        items: [
          "Blocked account (Sperrkonto) with minimum €11,208",
          "Bank statements (last 6 months)",
          "Travel health insurance (valid in Germany)",
        ],
      },
      {
        category: "Additional",
        items: [
          "Proof of accommodation in Germany",
          "Previous German visas (if any)",
          "Employment references",
          "Motivation letter",
        ],
      },
    ],
    tips: [
      "Blocked account is mandatory — open with Expatrio or Deutsche Bank",
      "Get your degree recognized via anabin before applying",
      "Learning basic German significantly improves your job prospects",
    ],
  },
];
