/**
 * US visa reference data used by USImmigrationHubPage and USVisaPage.
 * Content is informational only — see the disclaimer rendered on every page.
 * 4 Aces Visa / Garg Brothers is an RCIC firm regulated for Canadian
 * immigration only and does not provide US legal advice.
 */
export interface USVisa {
  slug: string;
  code: string;
  name: string;
  category: "Nonimmigrant Work" | "Immigrant (Green Card)";
  tagline: string;
  summary: string;
  bestFor: string[];
  requirements: string[];
  duration: string;
  processing: string;
  cap: string;
  path_to_green_card: string;
  canadaAngle: string;
  faqs: Array<{ q: string; a: string }>;
}

export const US_VISAS: USVisa[] = [
  {
    slug: "h1b-visa",
    code: "H-1B",
    name: "H-1B Specialty Occupation Visa",
    category: "Nonimmigrant Work",
    tagline: "The main US work visa for skilled professionals in specialty occupations.",
    summary:
      "The H-1B is a US nonimmigrant visa for foreign workers in specialty occupations that generally require a bachelor's degree or equivalent. It is subject to an annual numerical cap and is allocated via a registration lottery run by USCIS each spring.",
    bestFor: [
      "Software engineers, data scientists, and IT professionals",
      "Physicians, researchers, and engineering roles",
      "Finance, consulting, and other degreed specialty roles",
    ],
    requirements: [
      "US employer willing to sponsor and file a Labor Condition Application (LCA)",
      "Bachelor's degree or higher (or equivalent) in a field related to the role",
      "Job that qualifies as a 'specialty occupation' under USCIS rules",
      "Selection in the annual H-1B registration lottery (unless cap-exempt)",
    ],
    duration: "Initial 3 years, extendable to 6 years (longer if a green card is in process).",
    processing: "USCIS regular processing is typically several months; premium processing is 15 business days.",
    cap: "85,000 per fiscal year (65,000 regular + 20,000 US master's).",
    path_to_green_card:
      "H-1B is dual-intent — employers commonly sponsor EB-2 or EB-3 green cards while the worker is on H-1B.",
    canadaAngle:
      "Many H-1B holders facing multi-decade EB-2/EB-3 backlogs move to Canada via Express Entry — Canadian PR can be obtained in 6–14 months versus 10–80+ years for an Indian- or Chinese-born H-1B waiting on a US green card.",
    faqs: [
      { q: "Is the H-1B cap-exempt for universities?", a: "Yes. H-1Bs sponsored by qualifying US universities, affiliated non-profit research organizations, and government research organizations are not subject to the annual cap." },
      { q: "Can I switch H-1B employers?", a: "Yes, via an H-1B transfer petition. You can typically begin working with the new employer once USCIS receives the petition." },
    ],
  },
  {
    slug: "l1-visa",
    code: "L-1",
    name: "L-1 Intracompany Transferee Visa",
    category: "Nonimmigrant Work",
    tagline: "Transfer executives, managers, or specialized-knowledge staff from a foreign office to a US office.",
    summary:
      "The L-1 visa lets multinational companies transfer certain employees from a foreign office to a US office of the same employer. L-1A covers executives and managers; L-1B covers specialized-knowledge employees.",
    bestFor: [
      "Executives and senior managers moving to a US branch (L-1A)",
      "Specialized-knowledge staff moving to a US office (L-1B)",
      "Companies setting up a new US office",
    ],
    requirements: [
      "Qualifying corporate relationship between the foreign and US entities",
      "At least one continuous year of employment abroad in the last three years",
      "Role abroad and in the US both qualifying as executive/managerial (L-1A) or specialized knowledge (L-1B)",
    ],
    duration: "L-1A up to 7 years total; L-1B up to 5 years total.",
    processing: "Typically several months with USCIS; premium processing is 15 business days.",
    cap: "No annual cap.",
    path_to_green_card:
      "L-1A holders often transition to EB-1C (Multinational Manager or Executive) green cards, which do not require PERM labor certification.",
    canadaAngle:
      "Canada offers a parallel Intra-Company Transferee work permit under the International Mobility Program. Many multinationals move staff to Canadian offices where PR pathways are faster and less capped.",
    faqs: [
      { q: "Can L-1 spouses work in the US?", a: "Yes — L-2 spouses are authorized to work incident to their status and can obtain a Social Security Number." },
    ],
  },
  {
    slug: "o1-visa",
    code: "O-1",
    name: "O-1 Extraordinary Ability Visa",
    category: "Nonimmigrant Work",
    tagline: "For individuals with extraordinary ability in the sciences, arts, education, business, or athletics.",
    summary:
      "The O-1 is a US nonimmigrant visa for people who can demonstrate sustained national or international acclaim. O-1A covers sciences, education, business, and athletics; O-1B covers the arts and the motion picture / television industry.",
    bestFor: [
      "AI researchers, founders, and senior technologists",
      "Published academics and top scientists",
      "Award-winning artists, athletes, and entertainers",
    ],
    requirements: [
      "US employer or agent petitioner",
      "Evidence meeting at least 3 of the USCIS regulatory criteria (or a major internationally recognized award)",
      "Advisory opinion from a relevant peer group or labor organization (where applicable)",
    ],
    duration: "Initial up to 3 years, extendable in 1-year increments.",
    processing: "Regular USCIS processing plus premium processing option (15 business days).",
    cap: "No annual cap.",
    path_to_green_card:
      "O-1 holders frequently transition to EB-1A (Extraordinary Ability) or EB-2 National Interest Waiver green cards, which allow self-petitioning.",
    canadaAngle:
      "Canada's Global Talent Stream and Start-up Visa are common alternatives for O-1-caliber founders and senior tech talent.",
    faqs: [
      { q: "Do I need a US employer for the O-1?", a: "You need a US petitioner — either an employer or a US agent. There is no true self-petition on the O-1 itself." },
    ],
  },
  {
    slug: "tn-visa",
    code: "TN",
    name: "TN Visa (USMCA Professionals)",
    category: "Nonimmigrant Work",
    tagline: "Streamlined work status for Canadian and Mexican professionals in listed USMCA occupations.",
    summary:
      "The TN category, created under NAFTA and continued under the USMCA, lets Canadian and Mexican citizens work in the US in specific listed professional occupations. Canadians can typically apply at the port of entry.",
    bestFor: [
      "Canadian and Mexican citizens in listed USMCA professions",
      "Engineers, scientists, accountants, and management consultants",
      "Registered nurses, physiotherapists, and other licensed health professionals",
    ],
    requirements: [
      "Canadian or Mexican citizenship",
      "Occupation on the USMCA professional list",
      "Qualifying degree or credentials for that occupation",
      "Pre-arranged full-time or part-time job with a US employer (self-employment is not permitted)",
    ],
    duration: "Up to 3 years, renewable indefinitely in 3-year increments so long as intent remains temporary.",
    processing: "Canadians can apply at a US port of entry or preclearance; Mexicans apply at a US consulate.",
    cap: "No annual cap.",
    path_to_green_card:
      "TN is a nonimmigrant status without dual intent. Pursuing a green card while on TN can complicate renewals; many workers switch to H-1B or O-1 before starting the PERM/I-140 process.",
    canadaAngle:
      "Canadians on TN status often maintain Canadian PR obligations in parallel. If the TN ends, Express Entry can be a fast landing pathway back to Canada.",
    faqs: [
      { q: "Can I get a TN as a software developer?", a: "Software engineers commonly apply under the 'Computer Systems Analyst' occupation on the USMCA list, but the specific job duties and degree must match that category." },
    ],
  },
  {
    slug: "eb1-green-card",
    code: "EB-1",
    name: "EB-1 Employment-Based First Preference",
    category: "Immigrant (Green Card)",
    tagline: "US green card for extraordinary-ability workers, outstanding researchers, and multinational executives.",
    summary:
      "EB-1 is the highest employment-based green card preference and includes three subcategories: EB-1A (extraordinary ability, self-petition), EB-1B (outstanding professors and researchers), and EB-1C (multinational managers and executives).",
    bestFor: [
      "Individuals with sustained national or international acclaim (EB-1A)",
      "Tenure-track researchers and professors with an international reputation (EB-1B)",
      "Managers and executives transferred by multinational employers (EB-1C)",
    ],
    requirements: [
      "Documentary evidence meeting USCIS criteria (publications, awards, media, judging, high pay, etc.)",
      "US employer petition (EB-1B and EB-1C) or self-petition (EB-1A)",
      "PERM labor certification is not required for EB-1",
    ],
    duration: "Permanent (US Lawful Permanent Resident status).",
    processing:
      "I-140 adjudication varies by service center; final green card timing depends on the Visa Bulletin priority date for your country of chargeability.",
    cap: "About 28.6% of the worldwide annual employment-based quota.",
    path_to_green_card:
      "EB-1 is itself a green card category — after I-140 approval, applicants file adjustment of status (I-485) inside the US or consular process abroad.",
    canadaAngle:
      "EB-1A applicants often also qualify for Canada's Express Entry federal skilled programs or Global Talent Stream, giving them a Canadian PR backup while the US petition is pending.",
    faqs: [
      { q: "Does EB-1A require a job offer?", a: "No. EB-1A allows self-petition without a US employer, though you must demonstrate you will continue to work in your field of extraordinary ability in the US." },
    ],
  },
  {
    slug: "eb2-green-card",
    code: "EB-2",
    name: "EB-2 Advanced Degree / Exceptional Ability (incl. NIW)",
    category: "Immigrant (Green Card)",
    tagline: "Green card category for advanced-degree professionals and exceptional-ability workers, including the National Interest Waiver.",
    summary:
      "EB-2 covers workers holding US advanced degrees (or a bachelor's plus 5+ years of progressive experience) and those of exceptional ability. The National Interest Waiver (NIW) is a self-petition route that waives the job-offer and PERM requirements when the endeavor is of national importance.",
    bestFor: [
      "Professionals with a master's, PhD, or equivalent",
      "Researchers, physicians, and engineers with a strong US-benefit case (NIW)",
      "Employer-sponsored PERM-based EB-2 applicants",
    ],
    requirements: [
      "Advanced degree or documented exceptional ability",
      "For standard EB-2: US employer, PERM labor certification, approved I-140",
      "For NIW: self-petition with evidence the endeavor has substantial merit and national importance",
    ],
    duration: "Permanent (US Lawful Permanent Resident status).",
    processing:
      "PERM + I-140 typically takes 12–24 months; final green card timing depends heavily on country of chargeability and Visa Bulletin backlogs.",
    cap: "About 28.6% of the worldwide annual employment-based quota; per-country caps create significant backlogs for India and China.",
    path_to_green_card:
      "EB-2 is a direct green card path. Adjustment of status is available once a visa number is current.",
    canadaAngle:
      "EB-2 India and EB-2 China applicants often face wait times measured in decades. Canadian Express Entry PR — typically 6–14 months end-to-end — is one of the most common backup or exit strategies.",
    faqs: [
      { q: "What is the EB-2 NIW?", a: "The National Interest Waiver lets qualified EB-2 applicants self-petition without a job offer or PERM, if they can show the proposed endeavor has substantial merit, national importance, and that waiving the job-offer requirement benefits the United States." },
    ],
  },
  {
    slug: "eb3-green-card",
    code: "EB-3",
    name: "EB-3 Skilled Workers, Professionals & Other Workers",
    category: "Immigrant (Green Card)",
    tagline: "Employer-sponsored US green card for skilled workers, degreed professionals, and certain other workers.",
    summary:
      "EB-3 is an employer-sponsored green card preference that requires PERM labor certification. It has three sub-groups: skilled workers (2+ years training/experience), professionals (US bachelor's or foreign equivalent), and 'other workers' (unskilled, capped and heavily backlogged).",
    bestFor: [
      "Nurses, tradespeople, and other skilled positions",
      "Bachelor's-degree professionals with a permanent US job offer",
      "Employers filling roles they cannot fill with US workers",
    ],
    requirements: [
      "Permanent, full-time US job offer",
      "Approved PERM labor certification from the US Department of Labor",
      "Approved I-140 petition from USCIS",
    ],
    duration: "Permanent (US Lawful Permanent Resident status).",
    processing:
      "PERM 8–18 months + I-140 + Visa Bulletin wait. India and China EB-3 backlogs can span many years.",
    cap: "About 28.6% of the worldwide annual employment-based quota; the 'Other Workers' sub-category is limited to 10,000 per year.",
    path_to_green_card:
      "EB-3 leads directly to a green card once the priority date is current.",
    canadaAngle:
      "Many EB-3 hopefuls in healthcare and skilled trades qualify for Canadian PNPs or Express Entry category-based draws, with landing timelines an order of magnitude shorter than EB-3 India waits.",
    faqs: [
      { q: "Can I switch from EB-3 to EB-2?", a: "Yes, if you qualify — many workers 'port' priority dates from an existing EB-3 to a new EB-2 filing to keep their place in line." },
    ],
  },
  {
    slug: "eb5-investor-visa",
    code: "EB-5",
    name: "EB-5 Immigrant Investor Program",
    category: "Immigrant (Green Card)",
    tagline: "US green card through qualifying investment in a new commercial enterprise that creates jobs.",
    summary:
      "The EB-5 program grants conditional US permanent residency to investors who make a qualifying investment in a new commercial enterprise that creates at least 10 full-time jobs for US workers.",
    bestFor: [
      "High-net-worth individuals seeking a US green card",
      "Families relocating to the US for education or lifestyle reasons",
      "Investors comfortable with a multi-year adjudication timeline",
    ],
    requirements: [
      "USD 1,050,000 investment, or USD 800,000 if invested in a Targeted Employment Area (TEA)",
      "Investment in a new commercial enterprise (direct or through an approved Regional Center)",
      "Creation or preservation of at least 10 full-time US jobs within the required timeframe",
      "Lawful source and path of funds documentation",
    ],
    duration: "Conditional green card for 2 years, then application to remove conditions (I-829) for permanent status.",
    processing:
      "I-526E adjudication varies significantly; Regional Center reserved visas from the 2022 RIA can reduce wait times for certain investors.",
    cap: "About 7.1% of the worldwide annual employment-based quota, with set-asides for rural, high-unemployment, and infrastructure projects.",
    path_to_green_card:
      "EB-5 is itself the green card path — conditional PR at I-526E approval, unconditional PR at I-829 approval.",
    canadaAngle:
      "Canada's Start-up Visa is a common alternative for founders, and provincial entrepreneur streams (e.g. BC, Ontario, Manitoba) offer employer-backed business PR paths without the EB-5 investment threshold.",
    faqs: [
      { q: "Can EB-5 funds come from a gift or loan?", a: "Yes, but the source and path of the funds — including any gift or loan — must be lawfully documented back to the original earner." },
    ],
  },
];

export const getUSVisa = (slug?: string) => US_VISAS.find((v) => v.slug === slug);