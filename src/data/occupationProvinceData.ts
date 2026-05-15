// Wave 4 — Occupation × Destination-Province landing pages
// 6 occupations × 4 provinces = 24 indexable URLs at /jobs/:occupation/:province

export type OccupationSlug =
  | "software-engineer"
  | "registered-nurse"
  | "truck-driver"
  | "accountant"
  | "electrician"
  | "chef";

export type ProvinceSlug =
  | "ontario"
  | "british-columbia"
  | "alberta"
  | "saskatchewan";

export interface Occupation {
  slug: OccupationSlug;
  name: string;
  noc: string;
  teer: 0 | 1 | 2 | 3 | 4 | 5;
  category: string;
  medianWageCAD: string; // hourly
  demand: "Very High" | "High" | "Moderate";
  licensing: string; // generic licensing note
}

export interface Province {
  slug: ProvinceSlug;
  name: string;
  abbr: string;
  pnpName: string;
  pnpStreams: string[];
  capital: string;
  topEmployers: string[];
  costOfLivingMonthly: string; // single, CAD
  notes: string;
}

export const OCCUPATIONS: Record<OccupationSlug, Occupation> = {
  "software-engineer": {
    slug: "software-engineer",
    name: "Software Engineer",
    noc: "21231",
    teer: 1,
    category: "Tech & Information Systems",
    medianWageCAD: "$45–$70/hr",
    demand: "Very High",
    licensing: "No mandatory provincial licence — credentials assessed via WES if needed.",
  },
  "registered-nurse": {
    slug: "registered-nurse",
    name: "Registered Nurse",
    noc: "31301",
    teer: 1,
    category: "Health Care",
    medianWageCAD: "$38–$52/hr",
    demand: "Very High",
    licensing: "Must register with the provincial regulator (e.g. CNO, BCCNM, CRNA, CRNS) and complete NNAS + NCLEX-RN.",
  },
  "truck-driver": {
    slug: "truck-driver",
    name: "Truck Driver (Long-Haul)",
    noc: "73300",
    teer: 3,
    category: "Trades, Transport & Equipment",
    medianWageCAD: "$24–$35/hr",
    demand: "High",
    licensing: "Class 1 / Class A commercial licence required — provincial test after landing.",
  },
  accountant: {
    slug: "accountant",
    name: "Accountant",
    noc: "11100",
    teer: 1,
    category: "Finance & Business",
    medianWageCAD: "$30–$48/hr",
    demand: "High",
    licensing: "CPA designation recommended; foreign credentials assessed via CPA Canada.",
  },
  electrician: {
    slug: "electrician",
    name: "Electrician (Construction)",
    noc: "72200",
    teer: 2,
    category: "Skilled Trades",
    medianWageCAD: "$32–$48/hr",
    demand: "Very High",
    licensing: "Red Seal endorsement via provincial trade authority — challenge exam available for experienced workers.",
  },
  chef: {
    slug: "chef",
    name: "Chef",
    noc: "62200",
    teer: 2,
    category: "Hospitality & Food Service",
    medianWageCAD: "$22–$36/hr",
    demand: "High",
    licensing: "No mandatory provincial licence; Red Seal Cook endorsement preferred by employers.",
  },
};

export const PROVINCES: Record<ProvinceSlug, Province> = {
  ontario: {
    slug: "ontario",
    name: "Ontario",
    abbr: "ON",
    pnpName: "Ontario Immigrant Nominee Program (OINP)",
    pnpStreams: ["Employer Job Offer", "Human Capital Priorities", "Skilled Trades", "Master's Graduate"],
    capital: "Toronto",
    topEmployers: ["RBC", "TD", "Shopify", "OpenText", "University Health Network"],
    costOfLivingMonthly: "CAD 3,200–4,500 (Toronto), CAD 2,400–3,200 (Ottawa, London)",
    notes: "Largest job market in Canada; strongest tech and finance corridors.",
  },
  "british-columbia": {
    slug: "british-columbia",
    name: "British Columbia",
    abbr: "BC",
    pnpName: "BC Provincial Nominee Program (BC PNP)",
    pnpStreams: ["Skills Immigration – Skilled Worker", "International Post-Graduate", "Health Authority", "Tech"],
    capital: "Victoria (largest city: Vancouver)",
    topEmployers: ["Lululemon", "Telus", "EA", "Microsoft Vancouver", "Vancouver Coastal Health"],
    costOfLivingMonthly: "CAD 3,400–4,800 (Vancouver), CAD 2,500–3,300 (Victoria, Kelowna)",
    notes: "Pacific gateway with large South-Asian and East-Asian communities.",
  },
  alberta: {
    slug: "alberta",
    name: "Alberta",
    abbr: "AB",
    pnpName: "Alberta Advantage Immigration Program (AAIP)",
    pnpStreams: ["Alberta Opportunity Stream", "Alberta Express Entry", "Rural Renewal", "Tourism & Hospitality"],
    capital: "Edmonton (largest city: Calgary)",
    topEmployers: ["Suncor", "Cenovus", "WestJet", "Alberta Health Services", "ATB Financial"],
    costOfLivingMonthly: "CAD 2,400–3,400 (Calgary, Edmonton)",
    notes: "No provincial sales tax; strong demand in energy, healthcare, trades and logistics.",
  },
  saskatchewan: {
    slug: "saskatchewan",
    name: "Saskatchewan",
    abbr: "SK",
    pnpName: "Saskatchewan Immigrant Nominee Program (SINP)",
    pnpStreams: ["Occupations In-Demand", "Express Entry", "Employment Offer", "Hard-to-Fill Skills Pilot"],
    capital: "Regina (largest city: Saskatoon)",
    topEmployers: ["Saskatchewan Health Authority", "Federated Co-operatives", "Nutrien", "SaskTel"],
    costOfLivingMonthly: "CAD 2,000–2,800 (Saskatoon, Regina)",
    notes: "Lowest cost of living among the four; SINP is one of the most accessible PNPs.",
  },
};

export const OCCUPATION_LIST = Object.values(OCCUPATIONS);
export const PROVINCE_LIST = Object.values(PROVINCES);

export const getOccupation = (slug?: string) =>
  slug ? OCCUPATIONS[slug as OccupationSlug] : undefined;
export const getProvince = (slug?: string) =>
  slug ? PROVINCES[slug as ProvinceSlug] : undefined;
