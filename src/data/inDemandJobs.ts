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
  teer: 0 | 1 | 2 | 3 | 4 | 5;
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
    noc: "31111",
    teer: 0,
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
    noc: "21301",
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
    noc: "21321",
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
    noc: "72021",
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
    noc: "82031",
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
  {
    slug: "licensed-practical-nurse",
    title: "Licensed Practical Nurse (LPN)",
    noc: "32101",
    teer: 2,
    industry: "Healthcare",
    salaryLow: 55000, salaryHigh: 80000,
    demand: "Very High",
    provinces: ["Ontario", "Alberta", "British Columbia", "Manitoba"],
    pathways: ["Express Entry — CEC", "Category-based: Healthcare", "PNP — Manitoba (MPNP)", "Atlantic Immigration Program"],
    recentDrawCRS: 431,
    summary: "Healthcare category Express Entry — among the lowest CRS cut-offs nationally for nursing roles.",
    studyPathways: ["Practical Nursing Diploma", "RPN Bridging Program"],
    liveJobQuery: "licensed practical nurse",
  },
  {
    slug: "physiotherapist",
    title: "Physiotherapist",
    noc: "31202",
    teer: 1,
    industry: "Healthcare",
    salaryLow: 72000, salaryHigh: 110000,
    demand: "Very High",
    provinces: ["Ontario", "British Columbia", "Alberta"],
    pathways: ["Express Entry — FSWP", "Category-based: Healthcare", "PNP — Ontario (OINP)"],
    recentDrawCRS: 431,
    summary: "Healthcare category EE — strong public + private clinic demand across all provinces.",
    studyPathways: ["MScPT", "Bridging program for IEPTs"],
    liveJobQuery: "physiotherapist",
  },
  {
    slug: "occupational-therapist",
    title: "Occupational Therapist",
    noc: "31203",
    teer: 1,
    industry: "Healthcare",
    salaryLow: 70000, salaryHigh: 105000,
    demand: "High",
    provinces: ["Ontario", "British Columbia", "Alberta"],
    pathways: ["Express Entry — FSWP", "Category-based: Healthcare"],
    recentDrawCRS: 431,
    summary: "Healthcare category eligible — pediatric and senior care demand both rising.",
    studyPathways: ["MScOT", "OT Bridging Program"],
    liveJobQuery: "occupational therapist",
  },
  {
    slug: "paramedic",
    title: "Paramedic / Advanced Care Paramedic",
    noc: "32102",
    teer: 2,
    industry: "Healthcare",
    salaryLow: 55000, salaryHigh: 90000,
    demand: "Very High",
    provinces: ["Ontario", "Alberta", "British Columbia"],
    pathways: ["Express Entry — CEC", "Category-based: Healthcare", "PNP — Ontario (OINP)"],
    recentDrawCRS: 431,
    summary: "Healthcare category EE — chronic shortage of paramedics in every province.",
    studyPathways: ["Primary Care Paramedic Diploma", "Advanced Care Paramedic Program"],
    liveJobQuery: "paramedic",
  },
  {
    slug: "social-worker",
    title: "Social Worker",
    noc: "41301",
    teer: 1,
    industry: "Healthcare",
    salaryLow: 58000, salaryHigh: 90000,
    demand: "High",
    provinces: ["Ontario", "British Columbia", "Alberta", "Manitoba"],
    pathways: ["Express Entry — FSWP", "Category-based: Healthcare", "PNP — Manitoba (MPNP)"],
    recentDrawCRS: 431,
    summary: "Mental-health and child-welfare expansion = sustained federal + provincial demand.",
    studyPathways: ["MSW", "BSW + provincial registration"],
    liveJobQuery: "social worker",
  },
  {
    slug: "home-care-worker",
    title: "Home Care Worker / Caregiver",
    noc: "44101",
    teer: 4,
    industry: "Healthcare",
    salaryLow: 35000, salaryHigh: 52000,
    demand: "Very High",
    provinces: ["Ontario", "British Columbia", "Alberta"],
    pathways: ["Home Care Worker Pilots" as PRPathway, "PNP — BC PNP"],
    summary: "Direct PR on landing under the Home Care Worker pilots — no Express Entry score required.",
    studyPathways: ["Personal Support Worker Certificate", "Health Care Aide Diploma"],
    liveJobQuery: "home support worker",
  },
  {
    slug: "heavy-duty-mechanic",
    title: "Heavy-Duty Equipment Mechanic",
    noc: "72400",
    teer: 2,
    industry: "Trades & Construction",
    salaryLow: 65000, salaryHigh: 105000,
    demand: "Very High",
    provinces: ["Alberta", "British Columbia", "Saskatchewan"],
    pathways: ["Express Entry — FST", "Category-based: Trades", "PNP — Alberta (AAIP)", "PNP — Saskatchewan (SINP)"],
    recentDrawCRS: 360,
    summary: "Trades category EE + AAIP rural renewal — among the most accessible PR routes.",
    studyPathways: ["Heavy Duty Mechanic Red Seal", "Diesel Mechanic Apprenticeship"],
    liveJobQuery: "heavy duty mechanic",
  },
  {
    slug: "automotive-technician",
    title: "Automotive Service Technician",
    noc: "72410",
    teer: 2,
    industry: "Trades & Construction",
    salaryLow: 45000, salaryHigh: 80000,
    demand: "High",
    provinces: ["Ontario", "Alberta", "British Columbia"],
    pathways: ["Express Entry — FST", "Category-based: Trades", "PNP — Ontario (OINP)"],
    recentDrawCRS: 360,
    summary: "Trades category EE eligible — EV transition fuels demand for licensed techs.",
    studyPathways: ["Automotive Service Tech Red Seal"],
    liveJobQuery: "automotive technician",
  },
  {
    slug: "chef",
    title: "Chef / Cook",
    noc: "62020",
    teer: 2,
    industry: "Trades & Construction",
    salaryLow: 40000, salaryHigh: 75000,
    demand: "High",
    provinces: ["Ontario", "British Columbia", "Quebec", "Alberta"],
    pathways: ["Express Entry — FST", "Express Entry — CEC", "PNP — BC PNP", "Atlantic Immigration Program"],
    summary: "Hospitality recovery + LMIA-supported roles make this a steady PR path.",
    studyPathways: ["Culinary Arts Diploma", "Red Seal Cook"],
    liveJobQuery: "chef cook",
  },
  {
    slug: "bus-driver",
    title: "Transit / Coach Bus Driver",
    noc: "73301",
    teer: 3,
    industry: "Transportation",
    salaryLow: 45000, salaryHigh: 75000,
    demand: "High",
    provinces: ["Ontario", "British Columbia", "Alberta"],
    pathways: ["Express Entry — CEC", "Category-based: Transport", "PNP — Manitoba (MPNP)"],
    recentDrawCRS: 435,
    summary: "Transport category EE eligible — public transit expansion drives hiring.",
    studyPathways: ["Class 2 / B Licence", "Transit Operator Training"],
    liveJobQuery: "bus driver",
  },
  {
    slug: "aircraft-mechanic",
    title: "Aircraft Mechanic / AME",
    noc: "72601",
    teer: 2,
    industry: "Transportation",
    salaryLow: 60000, salaryHigh: 100000,
    demand: "High",
    provinces: ["Quebec", "Ontario", "British Columbia", "Manitoba"],
    pathways: ["Express Entry — FST", "Category-based: Trades", "Category-based: Transport", "PNP — Manitoba (MPNP)"],
    recentDrawCRS: 360,
    summary: "Trades + Transport category eligible — Bombardier, Air Canada, WestJet hiring strong.",
    studyPathways: ["AME-M Licence", "Aviation Maintenance Diploma"],
    liveJobQuery: "aircraft maintenance engineer",
  },
  {
    slug: "marketing-professional",
    title: "Marketing & Digital Professional",
    noc: "11202",
    teer: 1,
    industry: "Business & Finance",
    salaryLow: 60000, salaryHigh: 115000,
    demand: "High",
    provinces: ["Ontario", "British Columbia", "Quebec"],
    pathways: ["Express Entry — FSWP", "Express Entry — CEC", "PNP — Ontario (OINP)"],
    summary: "FSWP + CEC eligible — high demand in tech, fintech, and SaaS hubs.",
    studyPathways: ["MBA Marketing", "Digital Marketing PG Diploma"],
    liveJobQuery: "digital marketing manager",
  },
  {
    slug: "pharmacist",
    title: "Pharmacist",
    noc: "31204",
    teer: 1,
    industry: "Healthcare",
    salaryLow: 95000, salaryHigh: 140000,
    demand: "Very High",
    provinces: ["Ontario", "Alberta", "British Columbia"],
    pathways: ["Express Entry — FSWP", "Category-based: Healthcare", "PNP — Ontario (OINP)"],
    recentDrawCRS: 431,
    summary: "Healthcare category EE eligible — community + hospital pharmacy shortages nationwide.",
    studyPathways: ["PharmD", "PEBC Bridging Exam for IPGs"],
    liveJobQuery: "pharmacist",
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