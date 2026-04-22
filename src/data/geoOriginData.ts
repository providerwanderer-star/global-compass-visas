/**
 * Programmatic GEO data for "Canada PR from {Country}" pages.
 * Each record drives a unique route: /canada-pr-from/:slug
 */

export interface OriginCountry {
  slug: string;
  country: string;
  flag: string;
  demonym: string;
  topPathways: string[];
  topNocs: { code: string; title: string }[];
  avgTimelineMonths: string;
  estCostCAD: string;
  keyChallenges: string[];
  keyAdvantages: string[];
  whoFor: string;
  whoNotFor: string;
  faqs: { q: string; a: string }[];
}

export const originCountries: OriginCountry[] = [
  {
    slug: "india",
    country: "India",
    flag: "🇮🇳",
    demonym: "Indian",
    topPathways: [
      "Express Entry (FSWP) — most common for Indian IT and engineering professionals",
      "Provincial Nominee Program (PNP) — Ontario OINP, BC PNP, Saskatchewan SINP for moderate CRS",
      "Study Permit → PGWP → CEC for ages 18–28",
      "LMIA Work Permit for trades and healthcare workers",
    ],
    topNocs: [
      { code: "21232", title: "Software Developer" },
      { code: "21211", title: "Data Scientist" },
      { code: "31301", title: "Registered Nurse" },
      { code: "73300", title: "Truck Driver" },
      { code: "21220", title: "Cybersecurity Specialist" },
    ],
    avgTimelineMonths: "8–14 months",
    estCostCAD: "CAD 2,500 – 5,000 (≈ ₹3–5 lakh)",
    keyChallenges: [
      "Highly competitive Express Entry pool (most Indian profiles cluster in CRS 420–480)",
      "WES credential evaluation can take 4–8 weeks",
      "IELTS / CELPIP scores often need a retake to reach CLB 9+",
    ],
    keyAdvantages: [
      "Largest source country for Canadian PR — proven pathway",
      "Strong PNP demand in Ontario, BC and Saskatchewan for tech & healthcare",
      "Established Indian diaspora in Brampton, Surrey, Calgary eases settlement",
    ],
    whoFor:
      "Indian professionals 22–35 with a bachelor's degree, CLB 7+ English and 1+ year skilled work experience in IT, healthcare, engineering or trades.",
    whoNotFor:
      "Applicants over 45 with no Canadian education or job offer, or candidates without at least one year of NOC TEER 0/1/2/3 work experience.",
    faqs: [
      {
        q: "How can I apply for Canada PR from India in 2026?",
        a: "The fastest pathway is Express Entry — get IELTS / CELPIP, complete WES credential evaluation, create an Express Entry profile, and wait for an Invitation to Apply (ITA). PNP and LMIA-based work permits are alternative routes for moderate CRS scores.",
      },
      {
        q: "What is the minimum CRS score needed for an Indian applicant?",
        a: "Recent general Express Entry draws have had cutoffs between 430–490. A PNP nomination adds 600 CRS points, virtually guaranteeing an ITA, and is a common strategy for Indian applicants in the 380–430 range.",
      },
      {
        q: "How much does Canada PR cost from India?",
        a: "Total government fees, IELTS, WES, biometrics, medicals and police clearances cost CAD 2,500–5,000 (₹3–5 lakh). Consultant fees are separate.",
      },
    ],
  },
  {
    slug: "usa",
    country: "United States",
    flag: "🇺🇸",
    demonym: "US-based",
    topPathways: [
      "Express Entry (FSWP / CEC) — H-1B holders typically have CRS 450+",
      "Intra-Company Transfer (ICT) work permit for Canadian branches",
      "Global Talent Stream (GTS) — 2-week processing for high-skilled tech",
      "CUSMA Professional work permits (formerly NAFTA)",
    ],
    topNocs: [
      { code: "21232", title: "Software Developer" },
      { code: "21300", title: "Civil Engineer" },
      { code: "21211", title: "Data Scientist" },
      { code: "11100", title: "Financial Manager" },
      { code: "21220", title: "Cybersecurity Specialist" },
    ],
    avgTimelineMonths: "4–9 months (Global Talent Stream: 2–6 weeks)",
    estCostCAD: "CAD 3,000 – 6,000",
    keyChallenges: [
      "$100K H-1B fee changes are pushing applicants to act fast — capacity is tight",
      "Cross-border tax filing for the year of move",
      "Healthcare gap during the 3-month provincial coverage waiting period",
    ],
    keyAdvantages: [
      "US work experience is highly valued — usually CRS 450+",
      "ICT and CUSMA permits bypass LMIA requirements entirely",
      "Global Talent Stream offers 2-week LMIA processing for tech occupations",
      "No language test issues — IELTS / CELPIP General Training is straightforward",
    ],
    whoFor:
      "H-1B / L-1 / O-1 visa holders, US permanent residents, or US citizens with skilled work experience in tech, engineering, finance or healthcare.",
    whoNotFor:
      "Applicants without skilled work experience or a US-based employer willing to open a Canadian branch.",
    faqs: [
      {
        q: "Why are H-1B holders moving to Canada in 2026?",
        a: "The proposed $100,000 H-1B annual fee, layoffs in tech, and growing visa unpredictability have pushed thousands of US-based professionals toward Canada's faster, points-based PR system. Canadian Express Entry processes PR in 6 months.",
      },
      {
        q: "Can I move to Canada from the US without a job?",
        a: "Yes — Express Entry FSWP does not require a job offer. Most US-based applicants have CRS 450+ due to strong English, US work experience and education credentials.",
      },
      {
        q: "What is the Global Talent Stream?",
        a: "GTS is a fast-tracked LMIA program for high-skilled tech occupations (NOC 21231, 21232, 21233, 21234, 21311, 21223). Work permits are processed in 2 weeks — ideal for H-1B holders seeking Canadian employment quickly.",
      },
    ],
  },
  {
    slug: "uae",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    demonym: "UAE-based",
    topPathways: [
      "Express Entry (FSWP / CEC) — most UAE-based Indians and Pakistanis qualify",
      "Provincial Nominee Program (Saskatchewan, BC for tech)",
      "LMIA Work Permit for healthcare, hospitality and trades",
      "Atlantic Immigration Program for those with Atlantic job offers",
    ],
    topNocs: [
      { code: "21232", title: "Software Developer" },
      { code: "31301", title: "Registered Nurse" },
      { code: "21300", title: "Civil Engineer" },
      { code: "63200", title: "Chef / Cook" },
      { code: "11100", title: "Financial Manager" },
    ],
    avgTimelineMonths: "8–14 months",
    estCostCAD: "CAD 2,500 – 5,000 (≈ AED 7,000–14,000)",
    keyChallenges: [
      "UAE work experience must be documented with reference letters matching NOC duties",
      "End-of-service gratuity timing impacts move date",
      "Family schooling transition mid-year",
    ],
    keyAdvantages: [
      "Tax-free UAE income makes Canadian moving costs easier to fund",
      "Strong English at workplace — IELTS scores are usually CLB 8+",
      "Multiple international airline routes — affordable family travel during transition",
    ],
    whoFor:
      "Skilled professionals on UAE employment visas (Indian, Pakistani, Filipino, Egyptian) with 2+ years of work experience and English proficiency.",
    whoNotFor:
      "Applicants without formal employment letters or those whose roles do not map to a NOC TEER 0/1/2/3 occupation.",
    faqs: [
      {
        q: "Can I apply for Canada PR from Dubai or Abu Dhabi?",
        a: "Yes. UAE residents apply through the Express Entry system using the same FSWP / CEC criteria. Documents are notarized in the UAE and biometrics submitted at VFS Global centres in Dubai or Abu Dhabi.",
      },
      {
        q: "Is UAE work experience valid for Canadian Express Entry?",
        a: "Yes — full-time skilled work experience in NOC TEER 0/1/2/3 occupations counts toward Express Entry, regardless of the country it was gained in. Reference letters must show duties, hours and salary.",
      },
      {
        q: "How long does Canada PR take from the UAE?",
        a: "Express Entry: 6–8 months from ITA to PR. Total timeline including IELTS, WES and profile creation is typically 8–14 months.",
      },
    ],
  },
  {
    slug: "philippines",
    country: "Philippines",
    flag: "🇵🇭",
    demonym: "Filipino",
    topPathways: [
      "Express Entry (FSWP) — strong English usually delivers CRS 430+",
      "Provincial Nominee — Manitoba MPNP, Saskatchewan SINP, Atlantic AIP",
      "Caregiver pilot programs (Home Child Care Provider, Home Support Worker)",
      "LMIA-based work permits for healthcare and hospitality",
    ],
    topNocs: [
      { code: "31301", title: "Registered Nurse" },
      { code: "33102", title: "Nurse Aide / PSW" },
      { code: "63200", title: "Chef / Cook" },
      { code: "73300", title: "Truck Driver" },
      { code: "21232", title: "Software Developer" },
    ],
    avgTimelineMonths: "8–18 months",
    estCostCAD: "CAD 2,500 – 4,500 (≈ ₱100,000–180,000)",
    keyChallenges: [
      "Higher demand in regional provinces (Manitoba, Saskatchewan, Atlantic) than Ontario / BC",
      "Caregiver pathway has limited annual quota — apply early",
      "Police clearance from NBI takes 2–4 weeks",
    ],
    keyAdvantages: [
      "Native-level English — IELTS CLB 9+ is common",
      "Healthcare credentials are well-recognized in Canada",
      "Strong Filipino diaspora in Winnipeg, Calgary, Mississauga",
    ],
    whoFor:
      "Filipino nurses, caregivers, hospitality workers, drivers and IT professionals with 1+ year of full-time experience.",
    whoNotFor:
      "Applicants without NOC-aligned work experience or those needing immediate sponsorship without an employer letter.",
    faqs: [
      {
        q: "How can a Filipino nurse apply for Canada PR?",
        a: "Nurses apply via Express Entry under NOC 31301. Most Filipino nurses score CRS 450+ thanks to strong English. Many provinces (Saskatchewan, Manitoba, Atlantic) actively nominate nurses.",
      },
      {
        q: "What is the Caregiver Pilot Program?",
        a: "The Home Child Care Provider Pilot and Home Support Worker Pilot offer PR after 24 months of qualifying Canadian work experience. Filipino caregivers are the largest applicant group.",
      },
      {
        q: "Which provinces are easiest for Filipinos?",
        a: "Manitoba (MPNP), Saskatchewan (SINP) and the Atlantic provinces (AIP) actively recruit Filipino healthcare and hospitality workers, often with lower CRS thresholds.",
      },
    ],
  },
  {
    slug: "nigeria",
    country: "Nigeria",
    flag: "🇳🇬",
    demonym: "Nigerian",
    topPathways: [
      "Express Entry (FSWP) — strong English usually places candidates at CRS 430–500",
      "Provincial Nominee — Saskatchewan SINP, Manitoba MPNP, Atlantic AIP",
      "Study Permit → PGWP → CEC for ages 22–32",
      "LMIA Work Permit for healthcare and trucking",
    ],
    topNocs: [
      { code: "21232", title: "Software Developer" },
      { code: "31301", title: "Registered Nurse" },
      { code: "21300", title: "Civil Engineer" },
      { code: "11100", title: "Financial Manager" },
      { code: "73300", title: "Truck Driver" },
    ],
    avgTimelineMonths: "10–18 months",
    estCostCAD: "CAD 2,800 – 5,500 (≈ ₦4–8 million)",
    keyChallenges: [
      "Higher document scrutiny — degree verifications can take 6–10 weeks via WES",
      "Proof of funds must be from clean, traceable sources",
      "Visa stamping at the Canadian visa office (Accra) can add 4–6 weeks",
    ],
    keyAdvantages: [
      "English fluency delivers strong language scores (CLB 8–10)",
      "Active Nigerian diaspora in Calgary, Edmonton, Winnipeg and Brampton",
      "Provincial demand in Saskatchewan, Manitoba and Atlantic Canada is high",
    ],
    whoFor:
      "Nigerian professionals 22–35 with a bachelor's degree, full-time skilled work experience and the ability to demonstrate proof of funds (≈CAD 14,000+ for single applicants).",
    whoNotFor:
      "Applicants without verifiable employment history or with unresolved travel-history issues.",
    faqs: [
      {
        q: "How can I apply for Canada PR from Nigeria?",
        a: "Express Entry is the fastest route. You'll need WES credential evaluation, IELTS / CELPIP results, proof of funds, police clearances and a medical exam. PNP through Saskatchewan, Manitoba or the Atlantic provinces is also popular for moderate CRS scores.",
      },
      {
        q: "What proof of funds do Nigerians need for PR?",
        a: "Single applicants need approximately CAD 14,690; a family of four needs around CAD 27,300. Funds must be liquid, in your name, and held for 6+ months with traceable sources.",
      },
      {
        q: "How long does the visa office in Accra take?",
        a: "After PR approval, passport stamping at the Accra visa office (which serves Nigerian applicants) typically takes 4–8 weeks. Total Express Entry timeline from ITA to landing: 8–10 months.",
      },
    ],
  },
];

export const findOriginCountry = (slug: string) =>
  originCountries.find((o) => o.slug === slug);