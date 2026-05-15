// Wave 5 — Study field × destination-province landing pages
// 5 fields × 4 provinces = 20 indexable URLs at /study/:field/:province
// Reuses PROVINCES from occupationProvinceData.ts as the single source of truth.

export type StudyFieldSlug =
  | "computer-science"
  | "nursing"
  | "business-management"
  | "data-analytics"
  | "mechanical-engineering";

export interface StudyField {
  slug: StudyFieldSlug;
  name: string;
  shortName: string;
  tuitionCadPerYear: string;
  ieltsRequirement: string;
  pgwpYears: string;
  intakeMonths: string;
  /** Province-specific top DLIs — only widely-known public institutions. */
  topDLIsByProvince: Record<
    "ontario" | "british-columbia" | "alberta" | "saskatchewan",
    string[]
  >;
  /** PR pipeline note tying study → PGWP → CEC / PNP graduate stream */
  prPipeline: string;
  relatedNoc: { code: string; title: string };
}

export const STUDY_FIELDS: Record<StudyFieldSlug, StudyField> = {
  "computer-science": {
    slug: "computer-science",
    name: "Computer Science",
    shortName: "CS",
    tuitionCadPerYear: "CAD 22,000–58,000",
    ieltsRequirement: "IELTS 6.5 overall (no band below 6.0); SDS needs 6.0 each band",
    pgwpYears: "Up to 3 years",
    intakeMonths: "September (main), January, May",
    topDLIsByProvince: {
      ontario: ["University of Toronto", "University of Waterloo", "McMaster University", "Conestoga College", "York University"],
      "british-columbia": ["University of British Columbia", "Simon Fraser University", "BCIT", "University of Victoria"],
      alberta: ["University of Alberta", "University of Calgary", "SAIT Polytechnic", "MacEwan University"],
      saskatchewan: ["University of Saskatchewan", "University of Regina", "Saskatchewan Polytechnic"],
    },
    prPipeline: "Graduates typically file PR via Express Entry (CEC) under NOC 21231 / 21233 after 1 year of skilled work, or use a provincial graduate / tech stream.",
    relatedNoc: { code: "21231", title: "Software Engineer" },
  },
  nursing: {
    slug: "nursing",
    name: "Nursing",
    shortName: "Nursing",
    tuitionCadPerYear: "CAD 18,000–45,000",
    ieltsRequirement: "IELTS 6.5–7.0 overall (Academic) — regulator may require higher post-graduation",
    pgwpYears: "Up to 3 years",
    intakeMonths: "September (main), January",
    topDLIsByProvince: {
      ontario: ["University of Toronto", "McMaster University", "Western University", "Centennial College"],
      "british-columbia": ["University of British Columbia", "University of Victoria", "Kwantlen Polytechnic University"],
      alberta: ["University of Alberta", "University of Calgary", "MacEwan University", "Mount Royal University"],
      saskatchewan: ["University of Saskatchewan", "Saskatchewan Polytechnic"],
    },
    prPipeline: "RN graduates qualify under NOC 31301 — strong direct-to-PR via Express Entry healthcare category-based draws and provincial Health Authority streams.",
    relatedNoc: { code: "31301", title: "Registered Nurse" },
  },
  "business-management": {
    slug: "business-management",
    name: "Business & Management",
    shortName: "Business",
    tuitionCadPerYear: "CAD 20,000–55,000",
    ieltsRequirement: "IELTS 6.5 overall (no band below 6.0); MBAs often require 7.0",
    pgwpYears: "Up to 3 years",
    intakeMonths: "September, January, May",
    topDLIsByProvince: {
      ontario: ["University of Toronto (Rotman)", "Western (Ivey)", "Queen's (Smith)", "York (Schulich)", "Conestoga College"],
      "british-columbia": ["UBC (Sauder)", "Simon Fraser (Beedie)", "University of Victoria (Gustavson)"],
      alberta: ["University of Alberta", "University of Calgary (Haskayne)", "Mount Royal University"],
      saskatchewan: ["University of Saskatchewan (Edwards)", "University of Regina (Hill/Levene)"],
    },
    prPipeline: "Graduates map to NOC 11100 / 10010 / 12011 roles — PR via Express Entry CEC and provincial entrepreneur or skilled worker streams.",
    relatedNoc: { code: "11100", title: "Accountant" },
  },
  "data-analytics": {
    slug: "data-analytics",
    name: "Data Analytics & Data Science",
    shortName: "Data Analytics",
    tuitionCadPerYear: "CAD 22,000–52,000",
    ieltsRequirement: "IELTS 6.5 overall (no band below 6.0)",
    pgwpYears: "Up to 3 years",
    intakeMonths: "September, January",
    topDLIsByProvince: {
      ontario: ["University of Toronto", "University of Waterloo", "Toronto Metropolitan University", "Conestoga College"],
      "british-columbia": ["University of British Columbia", "Simon Fraser University", "BCIT"],
      alberta: ["University of Alberta", "University of Calgary", "SAIT Polytechnic"],
      saskatchewan: ["University of Saskatchewan", "Saskatchewan Polytechnic"],
    },
    prPipeline: "Graduates qualify under NOC 21223 / 21221 — strong demand under Express Entry STEM category-based draws and provincial tech streams.",
    relatedNoc: { code: "21223", title: "Database Analyst" },
  },
  "mechanical-engineering": {
    slug: "mechanical-engineering",
    name: "Mechanical Engineering",
    shortName: "Mech Eng",
    tuitionCadPerYear: "CAD 25,000–55,000",
    ieltsRequirement: "IELTS 6.5 overall (no band below 6.0)",
    pgwpYears: "Up to 3 years",
    intakeMonths: "September (main), January",
    topDLIsByProvince: {
      ontario: ["University of Toronto", "University of Waterloo", "McMaster University", "University of Windsor"],
      "british-columbia": ["University of British Columbia", "University of Victoria", "BCIT"],
      alberta: ["University of Alberta", "University of Calgary", "SAIT Polytechnic"],
      saskatchewan: ["University of Saskatchewan", "University of Regina"],
    },
    prPipeline: "Graduates target NOC 21301 — Express Entry CEC and provincial skilled trades / engineering streams. P.Eng licensure increases employability.",
    relatedNoc: { code: "21301", title: "Mechanical Engineer" },
  },
};

export const STUDY_FIELD_LIST = Object.values(STUDY_FIELDS);

export const getStudyField = (slug?: string) =>
  slug ? STUDY_FIELDS[slug as StudyFieldSlug] : undefined;
