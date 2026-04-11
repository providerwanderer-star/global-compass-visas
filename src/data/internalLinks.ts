import { blogPosts } from "./blogData";
import { services } from "./serviceData";

// Blog → 3 service pages
export const blogToServices: Record<string, string[]> = {
  "canada-pr-process-from-punjab-2026": ["express-entry", "lmia-assistance", "pnp-application"],
  "lmia-jobs-canada-from-india-2026": ["lmia-assistance", "work-permits", "express-entry"],
  "express-entry-vs-pnp-2026": ["express-entry", "pnp-application", "lmia-assistance"],
  "cost-of-canada-pr-from-india-2026": ["express-entry", "pnp-application", "student-visa"],
  "study-visa-canada-complete-guide-2026": ["student-visa", "express-entry", "work-permits"],
  "top-reasons-visa-rejection-canada-2026": ["express-entry", "student-visa", "visitor-visa"],
  "spouse-open-work-permit-canada-2026": ["work-permits", "family-sponsorship", "express-entry"],
  "best-provinces-for-canada-pr-2026": ["pnp-application", "express-entry", "lmia-assistance"],
  "increase-crs-score-fast-2026": ["express-entry", "pnp-application", "lmia-assistance"],
  "choosing-right-immigration-consultant-2026": ["express-entry", "pnp-application", "family-sponsorship"],
  "canada-vs-australia-vs-germany-immigration-2026": ["express-entry", "job-seeker-visa", "pnp-application"],
  "canada-express-entry-2026-guide": ["express-entry", "pnp-application", "lmia-assistance"],
  "study-in-canada-complete-guide": ["student-visa", "work-permits", "express-entry"],
  "canada-work-permit-types-explained": ["work-permits", "lmia-assistance", "express-entry"],
  "australia-skilled-migration-explained": ["express-entry", "job-seeker-visa", "pnp-application"],
  "germany-job-seeker-visa-guide": ["job-seeker-visa", "express-entry", "work-permits"],
  "canada-pnp-programs-explained": ["pnp-application", "express-entry", "lmia-assistance"],
  "ielts-tips-immigration-success": ["express-entry", "student-visa", "pnp-application"],
  "canada-family-sponsorship-explained": ["family-sponsorship", "visitor-visa", "express-entry"],
  "canada-visitor-visa-guide": ["visitor-visa", "visitor-visa-insurance", "family-sponsorship"],
  // New Punjab/Ontario focused blogs
  "ontario-pnp-guide-2026": ["pnp-application", "express-entry", "work-permits"],
  "punjab-to-canada-work-permit-2026": ["work-permits", "lmia-assistance", "express-entry"],
  "brampton-immigration-guide-2026": ["express-entry", "lmia-assistance", "family-sponsorship"],
  "canada-pr-points-calculator-guide-2026": ["express-entry", "pnp-application", "lmia-assistance"],
  "toronto-immigration-services-2026": ["express-entry", "work-permits", "family-sponsorship"],
  "ielts-score-canada-immigration-punjab-2026": ["express-entry", "student-visa", "pnp-application"],
  "canada-pr-fees-from-india-complete-breakdown-2026": ["express-entry", "pnp-application", "student-visa"],
  "pnp-programs-ontario-vs-bc-vs-alberta-2026": ["pnp-application", "express-entry", "work-permits"],
  "canada-student-visa-from-punjab-2026": ["student-visa", "express-entry", "work-permits"],
  "family-sponsorship-super-visa-parents-2026": ["family-sponsorship", "visitor-visa", "visitor-visa-insurance"],
  "canada-pr-eligibility-requirements-2026": ["express-entry", "pnp-application", "lmia-assistance"],
  "canada-pr-timeline-how-long-does-it-take-2026": ["express-entry", "pnp-application", "work-permits"],
  "express-entry-vs-pnp-which-is-better-2026": ["express-entry", "pnp-application", "lmia-assistance"],
  "lmia-jobs-canada-how-to-get-employer-sponsorship-2026": ["lmia-assistance", "work-permits", "express-entry"],
  "canada-work-permit-to-pr-pathway-2026": ["work-permits", "express-entry", "pnp-application"],
  "open-work-permit-canada-who-qualifies-2026": ["work-permits", "lmia-assistance", "family-sponsorship"],
  "sds-vs-non-sds-canada-study-visa-2026": ["student-visa", "express-entry", "work-permits"],
  "best-colleges-ontario-international-students-2026": ["student-visa", "work-permits", "pnp-application"],
  "cost-of-studying-in-canada-from-india-2026": ["student-visa", "express-entry", "work-permits"],
  "best-immigration-consultant-ludhiana-2026": ["express-entry", "lmia-assistance", "pnp-application"],
  "canada-pr-from-brampton-guide-2026": ["express-entry", "lmia-assistance", "family-sponsorship"],
  "immigration-consultant-punjab-vs-canada-based-2026": ["express-entry", "pnp-application", "lmia-assistance"],
};

// Service → 5 blog posts
export const serviceToBlogs: Record<string, string[]> = {
  "express-entry": [
    "canada-express-entry-2026-guide",
    "increase-crs-score-fast-2026",
    "express-entry-vs-pnp-2026",
    "canada-pr-process-from-punjab-2026",
    "canada-pr-points-calculator-guide-2026",
  ],
  "student-visa": [
    "study-visa-canada-complete-guide-2026",
    "study-in-canada-complete-guide",
    "canada-student-visa-from-punjab-2026",
    "ielts-score-canada-immigration-punjab-2026",
    "top-reasons-visa-rejection-canada-2026",
  ],
  "lmia-assistance": [
    "lmia-jobs-canada-from-india-2026",
    "canada-work-permit-types-explained",
    "punjab-to-canada-work-permit-2026",
    "increase-crs-score-fast-2026",
    "brampton-immigration-guide-2026",
  ],
  "pnp-application": [
    "canada-pnp-programs-explained",
    "ontario-pnp-guide-2026",
    "pnp-programs-ontario-vs-bc-vs-alberta-2026",
    "best-provinces-for-canada-pr-2026",
    "express-entry-vs-pnp-2026",
  ],
  "visa-restoration": [
    "top-reasons-visa-rejection-canada-2026",
    "canada-visitor-visa-guide",
    "canada-work-permit-types-explained",
    "choosing-right-immigration-consultant-2026",
    "study-in-canada-complete-guide",
  ],
  "visitor-visa": [
    "canada-visitor-visa-guide",
    "family-sponsorship-super-visa-parents-2026",
    "canada-family-sponsorship-explained",
    "top-reasons-visa-rejection-canada-2026",
    "choosing-right-immigration-consultant-2026",
  ],
  "visitor-visa-insurance": [
    "canada-visitor-visa-guide",
    "family-sponsorship-super-visa-parents-2026",
    "canada-family-sponsorship-explained",
    "choosing-right-immigration-consultant-2026",
    "cost-of-canada-pr-from-india-2026",
  ],
  "work-permits": [
    "canada-work-permit-types-explained",
    "punjab-to-canada-work-permit-2026",
    "lmia-jobs-canada-from-india-2026",
    "spouse-open-work-permit-canada-2026",
    "brampton-immigration-guide-2026",
  ],
  "job-seeker-visa": [
    "germany-job-seeker-visa-guide",
    "canada-vs-australia-vs-germany-immigration-2026",
    "choosing-right-immigration-consultant-2026",
    "ielts-tips-immigration-success",
    "cost-of-canada-pr-from-india-2026",
  ],
  "family-sponsorship": [
    "canada-family-sponsorship-explained",
    "family-sponsorship-super-visa-parents-2026",
    "spouse-open-work-permit-canada-2026",
    "canada-visitor-visa-guide",
    "choosing-right-immigration-consultant-2026",
  ],
  "citizenship-application": [
    "canada-pr-process-from-punjab-2026",
    "express-entry-vs-pnp-2026",
    "best-provinces-for-canada-pr-2026",
    "choosing-right-immigration-consultant-2026",
    "canada-pr-fees-from-india-complete-breakdown-2026",
  ],
};

// City → 2 blogs + 2 services
export const cityToLinks: Record<string, { blogs: string[]; services: string[] }> = {
  // Punjab cities
  ludhiana: { blogs: ["canada-pr-process-from-punjab-2026", "lmia-jobs-canada-from-india-2026"], services: ["express-entry", "lmia-assistance"] },
  amritsar: { blogs: ["canada-pr-process-from-punjab-2026", "increase-crs-score-fast-2026"], services: ["express-entry", "pnp-application"] },
  jalandhar: { blogs: ["canada-pr-process-from-punjab-2026", "express-entry-vs-pnp-2026"], services: ["express-entry", "student-visa"] },
  chandigarh: { blogs: ["canada-pr-process-from-punjab-2026", "best-provinces-for-canada-pr-2026"], services: ["express-entry", "pnp-application"] },
  mohali: { blogs: ["canada-pr-process-from-punjab-2026", "cost-of-canada-pr-from-india-2026"], services: ["express-entry", "lmia-assistance"] },
  // Ontario cities
  toronto: { blogs: ["best-provinces-for-canada-pr-2026", "choosing-right-immigration-consultant-2026"], services: ["express-entry", "family-sponsorship"] },
  brampton: { blogs: ["canada-pr-process-from-punjab-2026", "lmia-jobs-canada-from-india-2026"], services: ["lmia-assistance", "family-sponsorship"] },
  mississauga: { blogs: ["best-provinces-for-canada-pr-2026", "spouse-open-work-permit-canada-2026"], services: ["express-entry", "work-permits"] },
  "london-on": { blogs: ["best-provinces-for-canada-pr-2026", "express-entry-vs-pnp-2026"], services: ["pnp-application", "work-permits"] },
  windsor: { blogs: ["lmia-jobs-canada-from-india-2026", "best-provinces-for-canada-pr-2026"], services: ["lmia-assistance", "work-permits"] },
  // Other Indian cities (defaults)
  delhi: { blogs: ["canada-pr-process-from-punjab-2026", "study-visa-canada-complete-guide-2026"], services: ["express-entry", "student-visa"] },
  mumbai: { blogs: ["canada-vs-australia-vs-germany-immigration-2026", "increase-crs-score-fast-2026"], services: ["express-entry", "job-seeker-visa"] },
  bangalore: { blogs: ["canada-vs-australia-vs-germany-immigration-2026", "lmia-jobs-canada-from-india-2026"], services: ["express-entry", "work-permits"] },
  hyderabad: { blogs: ["increase-crs-score-fast-2026", "cost-of-canada-pr-from-india-2026"], services: ["express-entry", "pnp-application"] },
  pune: { blogs: ["study-visa-canada-complete-guide-2026", "express-entry-vs-pnp-2026"], services: ["student-visa", "express-entry"] },
  // Other Canadian cities (defaults)
  vancouver: { blogs: ["best-provinces-for-canada-pr-2026", "increase-crs-score-fast-2026"], services: ["pnp-application", "express-entry"] },
  calgary: { blogs: ["best-provinces-for-canada-pr-2026", "lmia-jobs-canada-from-india-2026"], services: ["pnp-application", "lmia-assistance"] },
  edmonton: { blogs: ["best-provinces-for-canada-pr-2026", "express-entry-vs-pnp-2026"], services: ["pnp-application", "work-permits"] },
  surrey: { blogs: ["best-provinces-for-canada-pr-2026", "canada-pr-process-from-punjab-2026"], services: ["express-entry", "family-sponsorship"] },
  // New Punjab cities
  bathinda: { blogs: ["canada-pr-process-from-punjab-2026", "cost-of-canada-pr-from-india-2026"], services: ["express-entry", "lmia-assistance"] },
  patiala: { blogs: ["canada-pr-process-from-punjab-2026", "study-visa-canada-complete-guide-2026"], services: ["express-entry", "student-visa"] },
  hoshiarpur: { blogs: ["canada-pr-process-from-punjab-2026", "lmia-jobs-canada-from-india-2026"], services: ["express-entry", "family-sponsorship"] },
  moga: { blogs: ["canada-pr-process-from-punjab-2026", "express-entry-vs-pnp-2026"], services: ["express-entry", "pnp-application"] },
  pathankot: { blogs: ["canada-pr-process-from-punjab-2026", "increase-crs-score-fast-2026"], services: ["express-entry", "lmia-assistance"] },
  // New Ontario cities
  scarborough: { blogs: ["best-provinces-for-canada-pr-2026", "lmia-jobs-canada-from-india-2026"], services: ["lmia-assistance", "family-sponsorship"] },
  milton: { blogs: ["best-provinces-for-canada-pr-2026", "choosing-right-immigration-consultant-2026"], services: ["express-entry", "lmia-assistance"] },
  waterloo: { blogs: ["best-provinces-for-canada-pr-2026", "express-entry-vs-pnp-2026"], services: ["pnp-application", "work-permits"] },
  // Gujarat cities
  surat: { blogs: ["canada-vs-australia-vs-germany-immigration-2026", "cost-of-canada-pr-from-india-2026"], services: ["express-entry", "job-seeker-visa"] },
  gandhinagar: { blogs: ["canada-vs-australia-vs-germany-immigration-2026", "increase-crs-score-fast-2026"], services: ["express-entry", "pnp-application"] },
  ahmedabad: { blogs: ["canada-vs-australia-vs-germany-immigration-2026", "cost-of-canada-pr-from-india-2026"], services: ["express-entry", "job-seeker-visa"] },
  vadodara: { blogs: ["increase-crs-score-fast-2026", "lmia-jobs-canada-from-india-2026"], services: ["express-entry", "lmia-assistance"] },
  rajkot: { blogs: ["canada-vs-australia-vs-germany-immigration-2026", "increase-crs-score-fast-2026"], services: ["express-entry", "pnp-application"] },
  // Haryana cities
  faridabad: { blogs: ["increase-crs-score-fast-2026", "lmia-jobs-canada-from-india-2026"], services: ["express-entry", "lmia-assistance"] },
  ambala: { blogs: ["canada-pr-process-from-punjab-2026", "increase-crs-score-fast-2026"], services: ["express-entry", "lmia-assistance"] },
  karnal: { blogs: ["increase-crs-score-fast-2026", "best-provinces-for-canada-pr-2026"], services: ["express-entry", "pnp-application"] },
  panipat: { blogs: ["lmia-jobs-canada-from-india-2026", "increase-crs-score-fast-2026"], services: ["lmia-assistance", "express-entry"] },
  // Rajasthan cities
  jodhpur: { blogs: ["canada-vs-australia-vs-germany-immigration-2026", "increase-crs-score-fast-2026"], services: ["express-entry", "student-visa"] },
  udaipur: { blogs: ["lmia-jobs-canada-from-india-2026", "study-visa-canada-complete-guide-2026"], services: ["lmia-assistance", "student-visa"] },
  kota: { blogs: ["study-visa-canada-complete-guide-2026", "increase-crs-score-fast-2026"], services: ["student-visa", "express-entry"] },
  // BC cities
  abbotsford: { blogs: ["best-provinces-for-canada-pr-2026", "canada-pr-process-from-punjab-2026"], services: ["pnp-application", "family-sponsorship"] },
  burnaby: { blogs: ["best-provinces-for-canada-pr-2026", "lmia-jobs-canada-from-india-2026"], services: ["pnp-application", "work-permits"] },
  nanaimo: { blogs: ["best-provinces-for-canada-pr-2026", "study-in-canada-complete-guide"], services: ["pnp-application", "student-visa"] },
  kamloops: { blogs: ["best-provinces-for-canada-pr-2026", "study-in-canada-complete-guide"], services: ["pnp-application", "student-visa"] },
};

// Helper to get blog data by slug
export function getRelatedBlogData(slugs: string[]) {
  return slugs
    .map((slug) => blogPosts.find((p) => p.slug === slug))
    .filter(Boolean) as typeof blogPosts;
}

// Helper to get service data by slug
export function getRelatedServiceData(slugs: string[]) {
  return slugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean) as typeof services;
}
