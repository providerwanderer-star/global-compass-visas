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

/* ─── Sprint E expansion: 7 additional origin countries ─── */

const additionalOrigins: OriginCountry[] = [
  {
    slug: "uk",
    country: "United Kingdom",
    flag: "🇬🇧",
    demonym: "British",
    topPathways: [
      "Express Entry (FSWP) — favourable with English as native language (CLB 10+ easily)",
      "Atlantic Immigration Program — for Nova Scotia, NB, NL, PEI job offers",
      "BC PNP Tech Stream — for software & digital media professionals",
      "Intra-Company Transfer Work Permit (LMIA-exempt) for multinationals",
    ],
    topNocs: [
      { code: "21232", title: "Software Developer" },
      { code: "11102", title: "Financial Investment Analyst" },
      { code: "21311", title: "Civil Engineer" },
      { code: "31301", title: "Registered Nurse" },
      { code: "21210", title: "Mathematician/Statistician" },
    ],
    avgTimelineMonths: "6–10 months",
    estCostCAD: "CAD 2,200 – 4,500 (≈ £1,300–2,700)",
    keyChallenges: [
      "Higher cost of living transition vs salary expectations",
      "ECA (UK ENIC equivalent) required for non-Canadian degrees",
      "Healthcare licensing for NHS-trained professionals takes 6–18 months",
    ],
    keyAdvantages: [
      "Native English speakers easily reach CLB 10 → max language CRS points",
      "UK qualifications widely recognized (WES, IQAS)",
      "Strong professional networks already established in Canada",
    ],
    whoFor: "British professionals 22–40 with a degree and 1+ years of skilled work experience, especially in tech, finance, healthcare or engineering.",
    whoNotFor: "Applicants over 45 without Canadian job offers, or those unwilling to recertify in regulated professions.",
    faqs: [
      { q: "Do British citizens need a visa to immigrate to Canada?", a: "Yes. Visa-free travel is for short visits only. For PR, British citizens apply through Express Entry, PNP, or family sponsorship — same as other foreign nationals." },
      { q: "How long does PR from the UK take?", a: "Express Entry: 6–10 months from profile creation to PR. UK applicants typically score CRS 470–520 thanks to strong language scores." },
      { q: "Can I transfer my UK pension to Canada?", a: "QROPS-listed Canadian schemes can accept UK pension transfers, but tax implications vary. Consult a cross-border financial planner before moving." },
    ],
  },
  {
    slug: "pakistan",
    country: "Pakistan",
    flag: "🇵🇰",
    demonym: "Pakistani",
    topPathways: [
      "Express Entry (FSWP) — for engineers, doctors, IT professionals",
      "Saskatchewan SINP Occupation In-Demand stream",
      "Study Permit → PGWP → CEC for ages 18–28",
      "Atlantic Immigration Program with employer sponsorship",
    ],
    topNocs: [
      { code: "21232", title: "Software Developer" },
      { code: "31102", title: "General Practitioner / Family Physician" },
      { code: "21311", title: "Civil Engineer" },
      { code: "73300", title: "Truck Driver" },
      { code: "63200", title: "Cook" },
    ],
    avgTimelineMonths: "10–18 months",
    estCostCAD: "CAD 2,500 – 4,800 (≈ PKR 5–9 lakh)",
    keyChallenges: [
      "Visa office in Islamabad has longer biometric and security screening times",
      "Proof of funds documentation must be airtight (6+ months bank history)",
      "WES / IQAS evaluation can take 8–12 weeks for Pakistani transcripts",
    ],
    keyAdvantages: [
      "Strong Pakistani diaspora in GTA, Calgary and Edmonton",
      "High demand for Pakistani-trained doctors and IT professionals",
      "English-medium education simplifies CLB 7+ achievement",
    ],
    whoFor: "Pakistani professionals 22–38 with a bachelor's degree, 1+ year of skilled work, and proof of CAD 14,000+ liquid funds.",
    whoNotFor: "Applicants without verifiable employment records or with incomplete educational credentials.",
    faqs: [
      { q: "How can I apply for Canada PR from Pakistan?", a: "Most Pakistani applicants use Express Entry. You'll need WES credential evaluation, IELTS results, police clearance from FIA, medicals from a panel physician, and proof of funds. Saskatchewan SINP is the most accessible PNP route." },
      { q: "Which Canadian province is best for Pakistanis?", a: "Ontario hosts the largest Pakistani community (Mississauga, Brampton, Scarborough). Alberta and Saskatchewan are growing rapidly thanks to lower cost of living and strong PNP demand." },
      { q: "What's the proof of funds requirement?", a: "Single applicants need ≈ CAD 14,690; family of four ≈ CAD 27,300. Funds must be in your name, liquid, and held for at least 6 months with traceable sources." },
    ],
  },
  {
    slug: "bangladesh",
    country: "Bangladesh",
    flag: "🇧🇩",
    demonym: "Bangladeshi",
    topPathways: [
      "Express Entry (FSWP)",
      "Provincial Nominee Program — Saskatchewan, Manitoba, Atlantic provinces",
      "Study Permit → PGWP → CEC for younger applicants",
      "Family sponsorship if you have eligible Canadian relatives",
    ],
    topNocs: [
      { code: "21232", title: "Software Developer" },
      { code: "21311", title: "Civil Engineer" },
      { code: "31301", title: "Registered Nurse" },
      { code: "63200", title: "Cook" },
      { code: "73300", title: "Truck Driver" },
    ],
    avgTimelineMonths: "12–18 months",
    estCostCAD: "CAD 2,400 – 4,500 (≈ BDT 2–4 lakh)",
    keyChallenges: [
      "Dhaka visa office processing can extend timelines for biometrics & security screening",
      "Most applicants cluster in CRS 380–460 — PNP often required",
      "ECA from EAIU University (Bangladesh) requires WES evaluation",
    ],
    keyAdvantages: [
      "Growing Bangladeshi diaspora in Toronto and Montreal",
      "Strong demand in tech, garment-tech and healthcare",
      "English-medium education makes CLB 7+ achievable",
    ],
    whoFor: "Bangladeshi graduates 22–35 with skilled work experience, IELTS 6.0+ across bands and proof of funds.",
    whoNotFor: "Applicants without bachelor-level education or with limited skilled work experience.",
    faqs: [
      { q: "How can I apply for Canada PR from Bangladesh?", a: "Express Entry is the primary route. Get your degree evaluated by WES, take IELTS or CELPIP, gather police clearance from Bangladesh Police, complete medicals, and create your Express Entry profile. PNP nominations from Saskatchewan or Manitoba significantly improve your chances." },
      { q: "How much does Canada PR cost from Bangladesh?", a: "Government fees: ~CAD 1,365 per adult. Add WES (~CAD 230), IELTS (~CAD 290), medicals (~CAD 450), police clearances and translation. Total ≈ CAD 2,400–4,500 excluding settlement funds." },
      { q: "Which province is best for Bangladeshi immigrants?", a: "Ontario (Toronto, Scarborough) has the largest Bangladeshi community. Alberta and Saskatchewan offer lower cost of living and active PNP streams." },
    ],
  },
  {
    slug: "china",
    country: "China",
    flag: "🇨🇳",
    demonym: "Chinese",
    topPathways: [
      "Express Entry (FSWP) — strong for tech, finance, engineering profiles",
      "BC PNP Tech / Skills Immigration",
      "Quebec Skilled Worker Program (PEQ) for Quebec-bound applicants",
      "Start-up Visa Program for entrepreneurs",
    ],
    topNocs: [
      { code: "21232", title: "Software Developer" },
      { code: "21210", title: "Mathematician/Statistician" },
      { code: "11102", title: "Financial Investment Analyst" },
      { code: "21311", title: "Civil Engineer" },
      { code: "21220", title: "Cybersecurity Specialist" },
    ],
    avgTimelineMonths: "8–14 months",
    estCostCAD: "CAD 3,000 – 6,000 (≈ ¥15,000–30,000)",
    keyChallenges: [
      "Mandarin-speakers must reach CLB 7+ in English — often the biggest hurdle",
      "Notarized translations required for all Chinese-language documents",
      "Source-of-funds documentation scrutiny is strict",
    ],
    keyAdvantages: [
      "Large Chinese communities in Toronto, Vancouver, Markham and Richmond",
      "Strong tech and finance demand in BC and Ontario",
      "Established networks of Chinese-speaking schools, banks and services",
    ],
    whoFor: "Chinese professionals 22–40 with bachelor's+ education, IELTS 6.0+, and verifiable work experience in TEER 0/1/2 occupations.",
    whoNotFor: "Applicants below CLB 7 English ability or with unverifiable funds.",
    faqs: [
      { q: "How can I apply for Canada PR from China?", a: "Express Entry is the main federal route. You'll need a notarized degree + WES/IQAS evaluation, IELTS or CELPIP results, Chinese police clearance, medicals from a panel physician, and proof of funds. BC and Ontario PNPs offer additional pathways." },
      { q: "Can I keep my Chinese passport after Canadian PR?", a: "Yes — PR doesn't affect Chinese citizenship. However, China doesn't permit dual citizenship, so naturalizing as Canadian later requires renouncing your Chinese passport." },
      { q: "Where do most Chinese immigrants settle?", a: "Greater Toronto Area (Markham, Richmond Hill, Scarborough), Greater Vancouver (Richmond, Burnaby) and Montreal are the top destinations." },
    ],
  },
  {
    slug: "south-africa",
    country: "South Africa",
    flag: "🇿🇦",
    demonym: "South African",
    topPathways: [
      "Express Entry (FSWP) — strong English scores benefit South African applicants",
      "Atlantic Immigration Program with job offer",
      "BC PNP Skills Immigration",
      "Intra-Company Transfer Work Permit",
    ],
    topNocs: [
      { code: "21232", title: "Software Developer" },
      { code: "11102", title: "Financial Investment Analyst" },
      { code: "31301", title: "Registered Nurse" },
      { code: "21311", title: "Civil Engineer" },
      { code: "63200", title: "Cook" },
    ],
    avgTimelineMonths: "6–12 months",
    estCostCAD: "CAD 2,200 – 4,500 (≈ ZAR 30,000–60,000)",
    keyChallenges: [
      "Currency conversion makes settlement funds challenging (ZAR/CAD volatility)",
      "Police clearances from SAPS can take 6–12 weeks",
      "Healthcare licensing recertification is rigorous",
    ],
    keyAdvantages: [
      "Native/near-native English speakers easily reach CLB 9+",
      "South African qualifications well recognized",
      "Active South African expat communities in Calgary, Vancouver and Toronto",
    ],
    whoFor: "South African professionals 22–40 with degrees, English fluency and experience in skilled occupations.",
    whoNotFor: "Applicants struggling to assemble proof of funds or with criminal records requiring rehabilitation.",
    faqs: [
      { q: "How can South Africans immigrate to Canada?", a: "Express Entry is the most popular route. Strong English language scores typically push South African applicants to CRS 460–520. Police clearances from SAPS, ECA via WES/IQAS, and medical exams are required." },
      { q: "Where do South Africans settle in Canada?", a: "Calgary, Vancouver, Toronto and Halifax host the largest South African communities. Calgary in particular has strong oil/gas industry roots familiar to South African engineers." },
      { q: "Can I bring my pension from South Africa?", a: "South African retirement annuities can be transferred to Canadian financial vehicles, but SARS tax obligations apply on emigration. Consult a cross-border tax advisor before moving funds." },
    ],
  },
  {
    slug: "germany",
    country: "Germany",
    flag: "🇩🇪",
    demonym: "German",
    topPathways: [
      "Express Entry (FSWP) — strong for engineers, technicians, healthcare",
      "BC PNP Tech Pilot",
      "Intra-Company Transfer Work Permit (LMIA-exempt for German multinationals)",
      "Atlantic Immigration Program with job offer",
    ],
    topNocs: [
      { code: "21311", title: "Civil Engineer" },
      { code: "21300", title: "Mechanical Engineer" },
      { code: "21232", title: "Software Developer" },
      { code: "31301", title: "Registered Nurse" },
      { code: "11102", title: "Financial Investment Analyst" },
    ],
    avgTimelineMonths: "6–10 months",
    estCostCAD: "CAD 2,500 – 4,500 (≈ €1,700–3,100)",
    keyChallenges: [
      "German-medium education requires careful WES/IQAS translation",
      "Many German applicants need to improve English from B2 to CLB 9+",
      "Apostille requirement for German civil documents",
    ],
    keyAdvantages: [
      "German engineering credentials highly valued",
      "Strong intra-company transfer route via German manufacturers in Canada",
      "Toronto, Waterloo and Kitchener have growing German tech presence",
    ],
    whoFor: "German professionals 22–40 with university or Fachhochschule degrees and English at B2 level or higher.",
    whoNotFor: "Applicants below CLB 7 English or those reluctant to leave EU social benefits.",
    faqs: [
      { q: "How can Germans immigrate to Canada?", a: "Express Entry is the fastest route. German engineering and technical qualifications are highly recognized. Add IELTS/CELPIP results (target CLB 9+), WES evaluation, police clearance via Bundeszentralregister, and medicals." },
      { q: "Can I work in Canada with a German engineering degree?", a: "Yes, but regulated engineering disciplines (P.Eng) require provincial licensing through Engineers Canada / provincial bodies (e.g. PEO in Ontario). This typically takes 6–18 months." },
      { q: "Will my German qualifications be recognized?", a: "Yes — WES, ICAS and IQAS all evaluate German credentials. Fachhochschule degrees are typically equivalent to a Canadian Bachelor's degree." },
    ],
  },
  {
    slug: "brazil",
    country: "Brazil",
    flag: "🇧🇷",
    demonym: "Brazilian",
    topPathways: [
      "Express Entry (FSWP) — for tech, engineering, healthcare profiles",
      "Quebec Skilled Worker Program (PEQ) — French-speaking advantage",
      "Study Permit → PGWP → CEC for ages 18–30",
      "BC PNP Tech for software developers",
    ],
    topNocs: [
      { code: "21232", title: "Software Developer" },
      { code: "21311", title: "Civil Engineer" },
      { code: "31301", title: "Registered Nurse" },
      { code: "63200", title: "Cook" },
      { code: "11102", title: "Financial Investment Analyst" },
    ],
    avgTimelineMonths: "8–14 months",
    estCostCAD: "CAD 2,500 – 4,800 (≈ R$ 12,000–24,000)",
    keyChallenges: [
      "Portuguese-speakers need significant English investment to reach CLB 9+",
      "Brazilian Federal Police clearance can take 8–12 weeks",
      "Notarized translations of Portuguese documents required throughout",
    ],
    keyAdvantages: [
      "Brazilian Portuguese speakers gain extra CRS via French (CLB 7+ NCLC)",
      "Strong Brazilian communities in Toronto, Mississauga and Calgary",
      "Quebec PEQ offers a faster route for French-comfortable Brazilians",
    ],
    whoFor: "Brazilian professionals 22–38 with university degrees, intermediate+ English, and skilled work in TEER 0/1/2 occupations.",
    whoNotFor: "Applicants below CLB 7 English without willingness to invest in language training.",
    faqs: [
      { q: "How can Brazilians immigrate to Canada?", a: "Express Entry is the main federal pathway. Brazilian applicants benefit when they speak French — Quebec's PEQ program offers a faster route. Otherwise, focus on IELTS/CELPIP CLB 9+ to maximize CRS." },
      { q: "Is French required for Quebec PR?", a: "Yes, the Quebec Selection Certificate (CSQ) and PEQ require French at intermediate level or higher (oral B2). This is the primary differentiator from federal Express Entry." },
      { q: "How much money do I need to settle?", a: "Federal Express Entry requires ≈ CAD 14,690 for single applicants. Quebec has its own settlement fund requirements (around CAD 4,200 for singles after PR — lower than federal because Quebec assumes faster integration)." },
    ],
  },
];

originCountries.push(...additionalOrigins);

export const findOriginCountry = (slug: string) =>
  originCountries.find((o) => o.slug === slug);