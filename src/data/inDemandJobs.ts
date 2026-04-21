/**
 * In-Demand Jobs → PR Pathway Engine
 * Single source of truth for the /in-demand-jobs page, the homepage strip,
 * and structured data (JSON-LD) for AEO/GEO.
 * Keep data normalized — link out to NOC/CRS/draws rather than duplicating prose.
 */

export type Industry =
  | "Information Technology"
  | "Healthcare"
  | "Engineering"
  | "Trades & Construction"
  | "Transportation"
  | "Business & Finance"
  | "Agriculture & Food"
  | "Education";

export type Province =
  | "Ontario"
  | "British Columbia"
  | "Alberta"
  | "Quebec"
  | "Manitoba"
  | "Saskatchewan"
  | "Nova Scotia"
  | "New Brunswick"
  | "Newfoundland & Labrador"
  | "PEI"
  | "Atlantic";

export type PRPathway =
  | "Express Entry — FSWP"
  | "Express Entry — CEC"
  | "Express Entry — FST"
  | "Category-based: Healthcare"
  | "Category-based: STEM"
  | "Category-based: Trades"
  | "Category-based: Transport"
  | "Category-based: Agriculture"
  | "Category-based: French"
  | "Category-based: Education"
  | "PNP — Ontario (OINP)"
  | "PNP — BC PNP"
  | "PNP — Alberta (AAIP)"
  | "PNP — Saskatchewan (SINP)"
  | "PNP — Manitoba (MPNP)"
  | "Atlantic Immigration Program"
  | "Rural Community Immigration Pilot";

export type Demand = "Very High" | "High" | "Moderate";

export interface InDemandJob {
  /** URL slug — used in /in-demand-jobs?job=slug */
  slug: string;
  title: string;
  /** NOC 2021 5-digit code — links to /noc-finder */
  noc: string;
  teer: 0 | 1 | 2 | 3;
  industry: Industry;
  /** Annual CAD salary range, low + high used for JobPosting baseSalary */
  salaryLow: number;
  salaryHigh: number;
  demand: Demand;
  /** Top hiring provinces, ordered by volume */
  provinces: Province[];
  /** Eligible PR pathways — drives the detail panel */
  pathways: PRPathway[];
  /** Average CRS cut-off observed in latest category-based draws (if applicable) */
  recentDrawCRS?: number;
  /** One-line answer-first summary for AEO snippets */
  summary: string;
  /** Recommended Canadian study programs that lead to this NOC via CEC */
  studyPathways: string[];
  /** Search keywords to query the live-jobs feed (Job Bank / LinkedIn) */
  liveJobQuery: string;
}

export const ALL_INDUSTRIES: Industry[] = [
  "Information Technology",
  "Healthcare",
  "Engineering",
  "Trades & Construction",
  "Transportation",
  "Business & Finance",
  "Agriculture & Food",
  "Education",
];

export const ALL_PROVINCES: Province[] = [
  "Ontario",
  "British Columbia",
  "Alberta",
  "Quebec",
  "Manitoba",
  "Saskatchewan",
  "Nova Scotia",
  "New Brunswick",
  "Newfoundland & Labrador",
  "PEI",
  "Atlantic",
];

export const ALL_PATHWAYS: PRPathway[] = [
  "Express Entry — FSWP",
  "Express Entry — CEC",
  "Express Entry — FST",
  "Category-based: Healthcare",
  "Category-based: STEM",
  "Category-based: Trades",
  "Category-based: Transport",
  "Category-based: Agriculture",
  "Category-based: French",
  "Category-based: Education",
  "PNP — Ontario (OINP)",
  "PNP — BC PNP",
  "PNP — Alberta (AAIP)",
  "PNP — Saskatchewan (SINP)",
  "PNP — Manitoba (MPNP)",
  "Atlantic Immigration Program",
  "Rural Community Immigration Pilot",
];

export const inDemandJobs: InDemandJob[] = [
  {
    slug: "software-developer",
    title: "Software Developer",
    noc: "21232",
    teer: 1,
    industry: "Information Technology",
    salaryLow: 75000, salaryHigh: 135000,
    demand: "Very High",
    provinces: ["Ontario", "British Columbia", "Quebec", "Alberta"],
    pathways: ["Express Entry — FSWP", "Express Entry — CEC", "Category-based: STEM", "PNP — Ontario (OINP)", "PNP — BC PNP"],
    recentDrawCRS: 482,
    summary: "Builds and maintains software applications. Targeted by STEM category-based Express Entry draws — lower CRS cut-off than general draws.",
    studyPathways: ["Computer Science (BSc)", "Software Engineering Diploma", "Cloud & DevOps PG Certificate"],
    liveJobQuery: "software developer",
  },
  {
    slug: "data-scientist",
    title: "Data Scientist",
    noc: "21211",
    teer: 1,
    industry: "Information Technology",
    salaryLow: 85000, salaryHigh: 145000,
    demand: "Very High",
    provinces: ["Ontario", "British Columbia", "Alberta"],
    pathways: ["Express Entry — FSWP", "Category-based: STEM", "PNP — Ontario (OINP)"],
    recentDrawCRS: 482,
    summary: "Designs ML models and statistical pipelines. Eligible for STEM occupations Express Entry category since 2024.",
    studyPathways: ["MSc Data Science", "Analytics PG Diploma", "AI/ML Bootcamp at DLI"],
    liveJobQuery: "data scientist",
  },
  {
    slug: "cybersecurity-specialist",
    title: "Cybersecurity Specialist",
    noc: "21220",
    teer: 1,
    industry: "Information Technology",
    salaryLow: 80000, salaryHigh: 140000,
    demand: "Very High",
    provinces: ["Ontario", "British Columbia", "Alberta"],
    pathways: ["Express Entry — FSWP", "Category-based: STEM", "PNP — Ontario (OINP)"],
    recentDrawCRS: 482,
    summary: "Protects networks and systems. Strong public-sector and fintech demand — STEM-eligible NOC.",
    studyPathways: ["Cybersecurity PG Diploma", "BSc Information Security", "Cloud Security Certifications"],
    liveJobQuery: "cybersecurity analyst",
  },
  {
    slug: "registered-nurse",
    title: "Registered Nurse",
    noc: "31301",
    teer: 1,
    industry: "Healthcare",
    salaryLow: 72000, salaryHigh: 110000,
    demand: "Very High",
    provinces: ["Ontario", "Alberta", "British Columbia", "Saskatchewan", "Manitoba"],
    pathways: ["Express Entry — FSWP", "Category-based: Healthcare", "PNP — Saskatchewan (SINP)", "PNP — Manitoba (MPNP)", "Atlantic Immigration Program"],
    recentDrawCRS: 431,
    summary: "Healthcare category-based Express Entry — among the lowest CRS cut-offs in 2025–26 (~431).",
    studyPathways: ["BScN (Bachelor of Nursing)", "RN Bridging Program", "PN to RN Pathway"],
    liveJobQuery: "registered nurse",
  },
  {
    slug: "nurse-aide-psw",
    title: "Nurse Aide / Personal Support Worker",
    noc: "33102",
    teer: 3,
    industry: "Healthcare",
    salaryLow: 38000, salaryHigh: 55000,
    demand: "Very High",
    provinces: ["Ontario", "British Columbia", "Manitoba", "Atlantic"],
    pathways: ["Express Entry — CEC", "Home Care Worker Pilots" as PRPathway, "Atlantic Immigration Program", "PNP — Manitoba (MPNP)"],
    summary: "Critical-shortage role with dedicated Home Care Worker PR pilot — direct PR on landing for qualifying applicants.",
    studyPathways: ["PSW Certificate", "Health Care Aide Diploma"],
    liveJobQuery: "personal support worker",
  },
  {
    slug: "physician",
    title: "Family Physician / Specialist",
    noc: "31102",
    teer: 1,
    industry: "Healthcare",
    salaryLow: 220000, salaryHigh: 450000,
    demand: "Very High",
    provinces: ["Ontario", "Alberta", "British Columbia", "Nova Scotia", "New Brunswick"],
    pathways: ["Express Entry — FSWP", "Category-based: Healthcare", "PNP — BC PNP", "Atlantic Immigration Program"],
    recentDrawCRS: 431,
    summary: "IRCC's healthcare category targets physicians with the lowest CRS cut-offs nationally.",
    studyPathways: ["MD + Canadian Residency Match", "MCCQE Exams for IMGs"],
    liveJobQuery: "family physician",
  },
  {
    slug: "civil-engineer",
    title: "Civil Engineer",
    noc: "21300",
    teer: 1,
    industry: "Engineering",
    salaryLow: 78000, salaryHigh: 130000,
    demand: "High",
    provinces: ["Ontario", "Alberta", "British Columbia", "Quebec"],
    pathways: ["Express Entry — FSWP", "Category-based: STEM", "PNP — Ontario (OINP)", "PNP — Alberta (AAIP)"],
    recentDrawCRS: 482,
    summary: "Strong demand from infrastructure and housing pipelines. STEM-eligible category draws.",
    studyPathways: ["MEng Civil", "Construction Project Management Diploma"],
    liveJobQuery: "civil engineer",
  },
  {
    slug: "mechanical-engineer",
    title: "Mechanical Engineer",
    noc: "21301",
    teer: 1,
    industry: "Engineering",
    salaryLow: 75000, salaryHigh: 125000,
    demand: "High",
    provinces: ["Ontario", "Alberta", "Quebec"],
    pathways: ["Express Entry — FSWP", "Category-based: STEM", "PNP — Alberta (AAIP)"],
    recentDrawCRS: 482,
    summary: "Manufacturing, energy and EV supply-chain growth keeps this NOC on the STEM list.",
    studyPathways: ["MEng Mechanical", "Mechatronics PG Diploma"],
    liveJobQuery: "mechanical engineer",
  },
  {
    slug: "electrician",
    title: "Electrician (Industrial & Construction)",
    noc: "72200",
    teer: 2,
    industry: "Trades & Construction",
    salaryLow: 60000, salaryHigh: 105000,
    demand: "Very High",
    provinces: ["Ontario", "Alberta", "British Columbia", "Manitoba"],
    pathways: ["Express Entry — FST", "Category-based: Trades", "PNP — Manitoba (MPNP)", "PNP — Saskatchewan (SINP)"],
    recentDrawCRS: 360,
    summary: "Trades category Express Entry draws cleared as low as CRS 360 — among the most accessible PR routes.",
    studyPathways: ["Electrician Apprenticeship (Red Seal)", "Industrial Electrician Diploma"],
    liveJobQuery: "electrician",
  },
  {
    slug: "welder",
    title: "Welder",
    noc: "72106",
    teer: 2,
    industry: "Trades & Construction",
    salaryLow: 52000, salaryHigh: 95000,
    demand: "High",
    provinces: ["Alberta", "Ontario", "Saskatchewan", "Atlantic"],
    pathways: ["Express Entry — FST", "Category-based: Trades", "Atlantic Immigration Program", "PNP — Saskatchewan (SINP)"],
    recentDrawCRS: 360,
    summary: "FST + Trades category-based draws — strong demand in oil & gas, shipbuilding, and infrastructure.",
    studyPathways: ["Welding Red Seal", "Pipefitter / Steamfitter Apprenticeship"],
    liveJobQuery: "welder",
  },
  {
    slug: "carpenter",
    title: "Carpenter",
    noc: "72310",
    teer: 2,
    industry: "Trades & Construction",
    salaryLow: 50000, salaryHigh: 90000,
    demand: "High",
    provinces: ["Ontario", "British Columbia", "Alberta"],
    pathways: ["Express Entry — FST", "Category-based: Trades", "PNP — BC PNP"],
    recentDrawCRS: 360,
    summary: "Federal housing acceleration plan keeps carpenters in the Trades EE category.",
    studyPathways: ["Carpenter Red Seal Apprenticeship"],
    liveJobQuery: "carpenter",
  },
  {
    slug: "long-haul-truck-driver",
    title: "Long-Haul Truck Driver",
    noc: "73300",
    teer: 3,
    industry: "Transportation",
    salaryLow: 55000, salaryHigh: 90000,
    demand: "Very High",
    provinces: ["Ontario", "Alberta", "Saskatchewan", "Manitoba"],
    pathways: ["Express Entry — CEC", "Category-based: Transport", "PNP — Saskatchewan (SINP)", "PNP — Manitoba (MPNP)"],
    recentDrawCRS: 435,
    summary: "Transport category EE draws + Saskatchewan & Manitoba PNP streams dedicated to truck drivers.",
    studyPathways: ["Class 1 / AZ Licence Training", "MELT certification"],
    liveJobQuery: "long haul truck driver",
  },
  {
    slug: "early-childhood-educator",
    title: "Early Childhood Educator (ECE)",
    noc: "42202",
    teer: 3,
    industry: "Education",
    salaryLow: 40000, salaryHigh: 62000,
    demand: "Very High",
    provinces: ["Ontario", "British Columbia", "Manitoba", "Atlantic"],
    pathways: ["Express Entry — CEC", "Category-based: Education", "PNP — BC PNP", "Atlantic Immigration Program"],
    summary: "New Education category in 2025 + provincial $10/day childcare expansion = high PR throughput.",
    studyPathways: ["ECE Diploma (2-year)", "BA Early Childhood Studies"],
    liveJobQuery: "early childhood educator",
  },
  {
    slug: "secondary-teacher",
    title: "Secondary School Teacher",
    noc: "41220",
    teer: 1,
    industry: "Education",
    salaryLow: 60000, salaryHigh: 100000,
    demand: "High",
    provinces: ["Ontario", "Alberta", "British Columbia"],
    pathways: ["Express Entry — FSWP", "Category-based: Education", "PNP — Alberta (AAIP)"],
    summary: "Education category-based draws launched 2025 to address national teacher shortage.",
    studyPathways: ["BEd (Bachelor of Education)", "MEd + Provincial Teaching Cert"],
    liveJobQuery: "secondary teacher",
  },
  {
    slug: "financial-auditor",
    title: "Financial Auditor / Accountant",
    noc: "11100",
    teer: 1,
    industry: "Business & Finance",
    salaryLow: 65000, salaryHigh: 115000,
    demand: "High",
    provinces: ["Ontario", "Quebec", "British Columbia"],
    pathways: ["Express Entry — FSWP", "Express Entry — CEC", "PNP — Ontario (OINP)"],
    summary: "CPA-track roles remain in steady FSWP demand, especially in Toronto and Montreal.",
    studyPathways: ["MBA / MAcc", "CPA PEP"],
    liveJobQuery: "accountant auditor",
  },
  {
    slug: "agri-supervisor",
    title: "Agricultural Service Contractor & Farm Supervisor",
    noc: "82030",
    teer: 2,
    industry: "Agriculture & Food",
    salaryLow: 42000, salaryHigh: 70000,
    demand: "High",
    provinces: ["Saskatchewan", "Manitoba", "Alberta", "Ontario"],
    pathways: ["Category-based: Agriculture", "Agri-Food Pilot" as PRPathway, "PNP — Saskatchewan (SINP)"],
    recentDrawCRS: 355,
    summary: "Agriculture & agri-food category draws + dedicated Agri-Food PR pilot — lowest published CRS cut-off (~355).",
    studyPathways: ["Agri-Business Diploma", "Food Processing Technician"],
    liveJobQuery: "farm supervisor",
  },
];

export const totalJobs = inDemandJobs.length;

export function getJobBySlug(slug: string): InDemandJob | undefined {
  return inDemandJobs.find((j) => j.slug === slug);
}

/** Featured set for the homepage strip */
export const homeFeaturedJobs: InDemandJob[] = [
  "registered-nurse",
  "software-developer",
  "electrician",
  "long-haul-truck-driver",
  "early-childhood-educator",
  "welder",
  "data-scientist",
  "agri-supervisor",
].map((s) => inDemandJobs.find((j) => j.slug === s)!).filter(Boolean);