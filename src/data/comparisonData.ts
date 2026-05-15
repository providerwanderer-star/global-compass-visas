/**
 * Programmatic comparison hub data — /compare/:slug
 * Each entry powers a long-form, AI-citation-friendly comparison page.
 * Numbers are conservative, sourced from IRCC / Home Affairs / UK Home Office / BAMF
 * public guidance as of the lastUpdated date. Update the date when refreshing.
 */

export interface ComparisonRow {
  attribute: string;
  optionA: string;
  optionB: string;
  /** Optional short note shown under the row in the table. */
  note?: string;
}

export interface ComparisonFAQ {
  question: string;
  answer: string;
}

export interface Comparison {
  slug: string;
  optionAName: string;
  optionBName: string;
  /** Short tag like "Canada PR", "Work Permit". */
  category: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** 2–3 sentence intro shown above the table. */
  intro: string;
  /** Direct-answer block — single paragraph an AI engine can lift verbatim. */
  verdict: string;
  rows: ComparisonRow[];
  /** "Choose A if …" bullets. */
  chooseA: string[];
  chooseB: string[];
  faqs: ComparisonFAQ[];
  /** ISO date string YYYY-MM-DD. */
  lastUpdated: string;
}

export const comparisons: Comparison[] = [
  {
    slug: "express-entry-vs-pnp",
    optionAName: "Express Entry",
    optionBName: "Provincial Nominee Program (PNP)",
    category: "Canada PR",
    metaTitle: "Express Entry vs PNP (2026): Which Canada PR Pathway Is Faster?",
    metaDescription:
      "Express Entry vs Provincial Nominee Program — processing time, CRS impact, cost, eligibility and which is faster in 2026. Honest comparison by 4 Aces Visa.",
    h1: "Express Entry vs Provincial Nominee Program (PNP)",
    intro:
      "Express Entry and the Provincial Nominee Program are the two main pathways to Canadian permanent residence in 2026. They overlap heavily — most provincial nominations are issued through the 'enhanced' Express Entry stream — but the timeline, cost and CRS strategy are very different.",
    verdict:
      "Choose Express Entry if your CRS score is already 470+ and you want the fastest federal pathway (typically 5–6 months end-to-end). Choose a PNP stream if your CRS is 350–469, you have a job offer or strong ties to a specific province, or you fit a niche occupation list — a provincial nomination adds 600 CRS points and effectively guarantees an Invitation to Apply, but the combined timeline runs 11–18 months.",
    rows: [
      { attribute: "Average processing time", optionA: "5–6 months after ITA", optionB: "11–18 months (nomination + PR)" },
      { attribute: "Federal government fees", optionA: "CAD $1,525 single / $3,050 couple", optionB: "CAD $1,525 + provincial fee ($250–$1,500)" },
      { attribute: "CRS score typically needed", optionA: "470+ in 2025–26 draws", optionB: "Any CRS — nomination adds 600 points" },
      { attribute: "Job offer required?", optionA: "No", optionB: "Often yes (most streams)", note: "A few enhanced streams allow no-job-offer applicants in priority occupations." },
      { attribute: "Ties to a province required?", optionA: "No", optionB: "Yes — work, study or family link" },
      { attribute: "Where you must live after PR", optionA: "Anywhere in Canada", optionB: "Intent to settle in nominating province" },
      { attribute: "Best for", optionA: "High-CRS skilled workers", optionB: "Mid-CRS applicants with provincial connection" },
    ],
    chooseA: [
      "Your CRS is 470 or above without a nomination",
      "You want the fastest possible federal timeline",
      "You have no preference on which Canadian province to settle in",
      "You qualify under category-based draws (healthcare, STEM, trades, French)",
    ],
    chooseB: [
      "Your CRS is between 350 and 469",
      "You already have a Canadian job offer or work permit",
      "You studied in or have family in a specific province",
      "Your occupation is on a provincial in-demand list (e.g. Ontario Tech Draws, BC Healthcare)",
    ],
    faqs: [
      {
        question: "Can I apply for Express Entry and PNP at the same time?",
        answer:
          "Yes. You create one Express Entry profile, then apply separately to provincial nominee streams. If you receive a provincial nomination, the 600-point boost is added automatically and you'll be invited at the next federal draw.",
      },
      {
        question: "Is PNP cheaper than Express Entry?",
        answer:
          "No, PNP is more expensive. You pay the same federal fees (CAD $1,525 single applicant) plus a provincial application fee that ranges from CAD $250 (Saskatchewan) to CAD $1,500 (Ontario OINP).",
      },
      {
        question: "Which province has the easiest PNP in 2026?",
        answer:
          "Saskatchewan (SINP) and Manitoba (MPNP) generally have the lowest CRS thresholds and broadest occupation lists. Atlantic Immigration Program (AIP) is the easiest if you already have a job offer in NB, NS, NL or PEI.",
      },
      {
        question: "Can I move to a different province after getting PR through PNP?",
        answer:
          "Legally, the Charter of Rights guarantees mobility within Canada, so you cannot be forced to stay. In practice, however, you must show genuine intent to settle in the nominating province at the time of application — moving immediately raises misrepresentation concerns.",
      },
    ],
    lastUpdated: "2026-05-13",
  },
  {
    slug: "canada-pr-vs-australia-pr",
    optionAName: "Canada PR",
    optionBName: "Australia PR",
    category: "Permanent Residence",
    metaTitle: "Canada PR vs Australia PR (2026): Which Is Easier and Faster?",
    metaDescription:
      "Canada PR vs Australia PR — eligibility, cost, processing time, jobs market and quality of life compared honestly. Updated for 2026 by 4 Aces Visa.",
    h1: "Canada PR vs Australia PR",
    intro:
      "Canada and Australia are the two most popular skilled-migration destinations in 2026. Canada accepts roughly 485,000 PRs per year; Australia caps permanent migration at 185,000. Eligibility, cost and timelines are meaningfully different.",
    verdict:
      "Canada PR is easier to qualify for and arrives faster — Express Entry delivers PR in 5–6 months and the CRS bar (470+) is lower than the typical Australian SkillSelect threshold of 85+ points for Subclass 189. Australia pays better post-PR (median full-time wage AUD $98,000 vs CAD $68,000), but the points test is tougher and processing runs 8–14 months. Choose Canada for speed and access; Australia for higher long-term earnings.",
    rows: [
      { attribute: "Annual PR intake (2025–26)", optionA: "~485,000", optionB: "~185,000" },
      { attribute: "Main pathway", optionA: "Express Entry (CRS)", optionB: "SkillSelect (Subclass 189/190/491)" },
      { attribute: "Points threshold", optionA: "470+ CRS", optionB: "85+ points (189), 65 minimum" },
      { attribute: "Processing time", optionA: "5–6 months", optionB: "8–14 months" },
      { attribute: "Government fees (single)", optionA: "CAD $1,525 (~AUD $1,675)", optionB: "AUD $4,765 (Subclass 189)" },
      { attribute: "Median full-time wage", optionA: "CAD $68,000", optionB: "AUD $98,000" },
      { attribute: "Path to citizenship", optionA: "3 years out of last 5", optionB: "4 years residence + 1 year as PR" },
    ],
    chooseA: [
      "You want the fastest skilled-migration outcome",
      "Your CRS or equivalent points are mid-range (470–520)",
      "You value lower upfront cost and broader provincial options",
      "You have French-language ability (huge CRS boost in 2026)",
    ],
    chooseB: [
      "You score 90+ on Australia's points test",
      "Your occupation is on the Core Skills Occupation List (CSOL)",
      "You prioritise higher post-migration earnings",
      "You prefer warmer climate and Asia-Pacific business proximity",
    ],
    faqs: [
      {
        question: "Is it easier to get PR in Canada or Australia?",
        answer:
          "Canada is easier on average in 2026. Express Entry CRS thresholds (470+) are met by a wider pool of candidates than Australia's SkillSelect points (85+ for Subclass 189). Canada also accepts ~2.6× more permanent residents per year.",
      },
      {
        question: "Which pays better — Canada or Australia?",
        answer:
          "Australia pays meaningfully more in nominal terms. Median full-time annual earnings are AUD $98,000 (~CAD $89,000) vs Canada's CAD $68,000. Cost of living in Sydney/Melbourne is also higher than Toronto/Vancouver.",
      },
      {
        question: "Can I apply to both Canada PR and Australia PR at the same time?",
        answer:
          "Yes. The two systems are completely independent. Many of our clients run both processes in parallel and choose based on whichever Invitation to Apply (or invitation to lodge) comes first.",
      },
      {
        question: "Which country has a faster path to citizenship?",
        answer:
          "Canada is faster: 3 years of physical presence in the last 5 after becoming PR. Australia requires 4 years lawful residence with at least 1 year as a permanent resident.",
      },
    ],
    lastUpdated: "2026-05-13",
  },
  {
    slug: "lmia-vs-pgwp",
    optionAName: "LMIA Work Permit",
    optionBName: "Post-Graduation Work Permit (PGWP)",
    category: "Canada Work Permit",
    metaTitle: "LMIA vs PGWP (2026): Which Canadian Work Permit Should You Get?",
    metaDescription:
      "LMIA vs PGWP — cost, processing time, eligibility, employer obligations and PR pathway compared. Updated for 2026 IRCC rules.",
    h1: "LMIA Work Permit vs Post-Graduation Work Permit (PGWP)",
    intro:
      "LMIA-backed work permits and PGWPs are the two most common ways for foreign nationals to work legally in Canada. They serve completely different audiences and the 2024–25 rule changes have widened the gap.",
    verdict:
      "Get a PGWP if you have completed (or are about to complete) an eligible Canadian post-secondary program — it is open, employer-flexible and the cheapest legal way to work in Canada (CAD $255). An LMIA work permit is the right path only if you have a confirmed Canadian job offer from an employer willing to spend CAD $1,000+ on the LMIA application and prove no Canadian could fill the role.",
    rows: [
      { attribute: "Who issues it", optionA: "ESDC + IRCC", optionB: "IRCC only (no employer involvement)" },
      { attribute: "Cost", optionA: "CAD $1,000 LMIA + $155 work permit", optionB: "CAD $255 work permit fee" },
      { attribute: "Processing time", optionA: "8–20 weeks LMIA + 4–16 weeks WP", optionB: "80–120 days" },
      { attribute: "Employer-specific?", optionA: "Yes — closed work permit", optionB: "No — open work permit" },
      { attribute: "Validity", optionA: "Up to 3 years (matches LMIA)", optionB: "8 months to 3 years (program length)" },
      { attribute: "CRS boost for PR", optionA: "+50 to +200 points", optionB: "No automatic boost" },
      { attribute: "Spouse work permit", optionA: "Only if TEER 0/1 (post-2024)", optionB: "Yes — open spouse OWP" },
    ],
    chooseA: [
      "You have a confirmed Canadian job offer",
      "Your employer is willing and able to obtain an LMIA",
      "You need the +50/+200 CRS boost for Express Entry",
      "Your role is in a high-wage TEER 0 or TEER 1 occupation",
    ],
    chooseB: [
      "You graduated from an eligible Designated Learning Institution (DLI)",
      "You want the freedom to work for any Canadian employer",
      "You want to test the Canadian job market before committing to one company",
      "You plan to apply for PR via Canadian Experience Class (CEC) after 12 months of work",
    ],
    faqs: [
      {
        question: "Can I switch from a PGWP to an LMIA work permit?",
        answer:
          "Yes. Many candidates use the PGWP to find a Canadian employer, then switch to an LMIA-backed permit (or apply directly for PR) when their PGWP nears expiry. The switch requires a fresh LMIA application from the employer.",
      },
      {
        question: "Does an LMIA guarantee permanent residence?",
        answer:
          "No. An LMIA only authorises temporary work. However, a positive LMIA with a job offer adds 50 CRS points (200 for senior management roles), which is often enough to receive an Express Entry Invitation to Apply.",
      },
      {
        question: "Is the PGWP being shortened in 2026?",
        answer:
          "PGWP eligibility rules tightened in late 2024: certain college programs and partnership-delivered programs are no longer PGWP-eligible. Length still matches program length (max 3 years), but the field of study now matters for many programs.",
      },
      {
        question: "Can my spouse work in Canada on either permit?",
        answer:
          "PGWP holders: spouses still receive an open spousal work permit. LMIA holders: as of 2024, spouses receive an open work permit only if the principal applicant works in TEER 0 or TEER 1 (high-skill) occupations.",
      },
    ],
    lastUpdated: "2026-05-13",
  },
  {
    slug: "uk-skilled-worker-vs-canada-pr",
    optionAName: "UK Skilled Worker Visa",
    optionBName: "Canada PR (Express Entry)",
    category: "International Comparison",
    metaTitle: "UK Skilled Worker Visa vs Canada PR (2026): Honest Comparison",
    metaDescription:
      "UK Skilled Worker Visa vs Canada Express Entry PR — salary thresholds, processing time, family rights and path to citizenship compared for 2026.",
    h1: "UK Skilled Worker Visa vs Canada PR (Express Entry)",
    intro:
      "The UK Skilled Worker route and Canadian Express Entry are the two go-to pathways for English-speaking skilled workers in 2026. The UK gives you a temporary work visa tied to a sponsor; Canada gives you outright permanent residence. The choice has long-term consequences.",
    verdict:
      "Choose Canada PR if you want immediate permanent status, family mobility and a 3-year path to citizenship — Express Entry is faster (5–6 months) and your spouse gets an automatic open work permit. Choose the UK Skilled Worker visa only if you have a confirmed UK sponsor paying at least £41,700, accept the 5-year wait for indefinite leave and the £1,035/year NHS surcharge per person.",
    rows: [
      { attribute: "Status granted", optionA: "Temporary visa (5 years)", optionB: "Permanent residence" },
      { attribute: "Sponsor required?", optionA: "Yes — Home Office-licensed employer", optionB: "No" },
      { attribute: "Minimum salary (2025)", optionA: "£41,700 (general threshold)", optionB: "No salary floor — points-based" },
      { attribute: "Processing time", optionA: "3–8 weeks", optionB: "5–6 months after ITA" },
      { attribute: "Government fees (5y, single)", optionA: "£1,519 visa + £5,175 NHS surcharge", optionB: "CAD $1,525 (~£890)" },
      { attribute: "Spouse work rights", optionA: "Yes — unrestricted", optionB: "Yes — open work permit" },
      { attribute: "Path to permanent status", optionA: "ILR after 5 years", optionB: "PR on day one" },
      { attribute: "Path to citizenship", optionA: "ILR + 1 year (6 total)", optionB: "3 of last 5 years" },
    ],
    chooseA: [
      "You already have a confirmed UK job offer at £41,700+",
      "You want to start working abroad within 2 months",
      "You prefer Europe, NHS healthcare and London's job market",
      "You're comfortable with a 5-year wait for permanent status",
    ],
    chooseB: [
      "You want permanent status from day one",
      "You don't have a confirmed overseas job offer yet",
      "You want the fastest realistic path to a second citizenship",
      "You're bringing a spouse and want guaranteed work rights for them",
    ],
    faqs: [
      {
        question: "Is the UK Skilled Worker visa really cheaper than Canada PR?",
        answer:
          "Only at the application stage. Once you add the £1,035/year Immigration Health Surcharge over 5 years (£5,175 per person, £20,700 for a family of four), the UK becomes 4–6× more expensive than Canada PR.",
      },
      {
        question: "Which is faster — UK Skilled Worker or Canada Express Entry?",
        answer:
          "The UK Skilled Worker visa is faster to issue (3–8 weeks vs 5–6 months for Canadian Express Entry), but Express Entry gives you permanent residence immediately, while the UK requires another 5 years before Indefinite Leave to Remain.",
      },
      {
        question: "Can I bring my family on either pathway?",
        answer:
          "Yes, both allow spouses and dependent children. UK dependents pay separate visa fees + NHS surcharge each. Canadian PR processes the whole family in one application at no per-person surcharge.",
      },
      {
        question: "Does the UK Skilled Worker visa lead to citizenship?",
        answer:
          "Yes, but slowly. You must complete 5 years on the Skilled Worker route to qualify for Indefinite Leave to Remain, then wait another 12 months before applying for British citizenship — 6 years minimum total.",
      },
    ],
    lastUpdated: "2026-05-13",
  },
  {
    slug: "germany-blue-card-vs-chancenkarte",
    optionAName: "Germany EU Blue Card",
    optionBName: "Germany Chancenkarte (Opportunity Card)",
    category: "Germany Work Permit",
    metaTitle: "EU Blue Card vs Chancenkarte (2026): Which German Visa Is Right?",
    metaDescription:
      "EU Blue Card vs Chancenkarte — salary requirements, eligibility, processing time and PR pathway compared for skilled migrants targeting Germany in 2026.",
    h1: "Germany EU Blue Card vs Chancenkarte (Opportunity Card)",
    intro:
      "Germany overhauled its skilled-migration system in 2024 with the Skilled Immigration Act and the new Chancenkarte (Opportunity Card). The EU Blue Card remains the gold-standard work residence permit; the Chancenkarte is a points-based job-search visa.",
    verdict:
      "Apply for the EU Blue Card if you already have a German job offer paying at least €48,300 (or €43,759.80 for shortage occupations like IT, healthcare and STEM). Apply for the Chancenkarte if you do not yet have an offer but score 6+ points on the new system — it lets you live in Germany for up to 12 months while you search.",
    rows: [
      { attribute: "Job offer required?", optionA: "Yes — confirmed contract", optionB: "No — job-search visa" },
      { attribute: "Salary threshold (2025)", optionA: "€48,300 / €43,759.80 (shortage)", optionB: "No salary requirement" },
      { attribute: "Validity", optionA: "Up to 4 years", optionB: "12 months (one-time extension to 24)" },
      { attribute: "Processing time", optionA: "1–3 months", optionB: "4–8 weeks" },
      { attribute: "Family reunification", optionA: "Immediate, spouse can work", optionB: "Allowed if income proven" },
      { attribute: "Path to PR (Niederlassungserlaubnis)", optionA: "21 months (B1 German) or 27 months (A1)", optionB: "After switching to work permit + 4 years" },
      { attribute: "Best for", optionA: "Senior STEM, IT, medical professionals", optionB: "Mid-career skilled workers without an offer" },
    ],
    chooseA: [
      "You have a German job offer ≥ €48,300 (or €43,759.80 in a shortage occupation)",
      "Your degree is recognised by anabin or you hold a German qualification",
      "You want the fastest route to German PR (21 months with B1 German)",
      "You're a senior STEM, IT, medical or engineering professional",
    ],
    chooseB: [
      "You don't yet have a German job offer",
      "You score at least 6 points on the Chancenkarte system",
      "You hold a recognised vocational or university qualification (2+ years)",
      "You want to physically be in Germany while job-searching",
    ],
    faqs: [
      {
        question: "Can I switch from a Chancenkarte to an EU Blue Card?",
        answer:
          "Yes — that's exactly the intended pathway. Once you secure a qualifying job offer in Germany, you switch from the Chancenkarte to either an EU Blue Card or a regular skilled-worker residence permit without leaving the country.",
      },
      {
        question: "What is the points system for the Chancenkarte?",
        answer:
          "You need at least 6 points across criteria including: recognised qualification (4 pts), 2–5 years of professional experience (2–3 pts), German language skills (1–3 pts at A1–C1), English (1 pt at B2), age under 40 (1–2 pts), and prior Germany stay (1 pt).",
      },
      {
        question: "Does the EU Blue Card lead to permanent residency faster?",
        answer:
          "Yes. Blue Card holders qualify for German Niederlassungserlaubnis (PR) in just 21 months with B1 German, or 27 months with A1 German — the fastest PR path in the German system.",
      },
      {
        question: "Can my spouse work in Germany on either visa?",
        answer:
          "Spouses of EU Blue Card holders receive an immediate unrestricted work permit. Chancenkarte holders can bring family only if they prove sufficient income — and family members on the dependant permit have restricted work rights until the principal switches to a work residence permit.",
      },
    ],
    lastUpdated: "2026-05-13",
  },
  {
    slug: "study-permit-vs-work-permit-canada",
    optionAName: "Canada Study Permit",
    optionBName: "Canada Work Permit",
    category: "Canada Temporary",
    metaTitle: "Canada Study Permit vs Work Permit (2026): Which Is the Better Entry?",
    metaDescription:
      "Study permit vs work permit for Canada — cost, eligibility, PR pathway and total time-to-PR compared honestly. Updated for 2024 IRCC reforms and 2026 outlook.",
    h1: "Canada Study Permit vs Work Permit",
    intro:
      "For applicants who don't yet qualify for direct PR, the choice is usually study-then-PGWP-then-PR or work-permit-then-PR. The 2024 IRCC reforms (PAL/TAL letters, PGWP field-of-study restrictions, lower student cap) have changed the math significantly.",
    verdict:
      "Choose a work permit if you can secure an LMIA-backed Canadian job offer — total time to PR is 18–30 months and you start earning Canadian income immediately. Choose a study permit only if you're under 30, can fund 1–2 years of tuition (CAD $20,000–$45,000/year), and select a PGWP-eligible program tied to a long-term-shortage occupation.",
    rows: [
      { attribute: "Upfront cost (Year 1)", optionA: "CAD $20,000–$45,000 tuition + $20,635 GIC", optionB: "CAD $1,000–$1,155 (LMIA + WP)" },
      { attribute: "Income while on permit", optionA: "Part-time 24 hrs/week", optionB: "Full-time" },
      { attribute: "Permit length", optionA: "Program length + 90 days", optionB: "Up to 3 years" },
      { attribute: "Path to PR", optionA: "PGWP → CEC / PNP", optionB: "CEC after 12 months / PNP / EE" },
      { attribute: "Total time to PR", optionA: "3–5 years", optionB: "18–30 months" },
      { attribute: "Spouse rights", optionA: "Open WP only if Master's/PhD", optionB: "Open WP if TEER 0/1" },
      { attribute: "Best age range", optionA: "18–29", optionB: "25–40" },
    ],
    chooseA: [
      "You're under 30 and want a Canadian credential on your CV",
      "You can fund 1–2 years of tuition without a loan",
      "Your target program is PGWP-eligible AND in a long-term shortage occupation",
      "You want to settle in Canada long-term and prefer a 'soft landing'",
    ],
    chooseB: [
      "You already have 3+ years of skilled work experience",
      "You can secure (or your employer can secure) a positive LMIA",
      "You want the fastest realistic route to PR",
      "You'd rather earn CAD $60,000+ than spend CAD $40,000 on tuition",
    ],
    faqs: [
      {
        question: "Is studying in Canada still worth it after the 2024 reforms?",
        answer:
          "Yes, but only for the right programs. PGWP eligibility is now restricted by field of study for college programs, and the student cap reduces total intake by ~35%. Bachelor's, Master's and PhD programs at universities remain unaffected and still offer the strongest PR pathway.",
      },
      {
        question: "Can I switch from a study permit to a work permit?",
        answer:
          "Yes — after completing your program you typically apply for a Post-Graduation Work Permit (PGWP). You can also apply for an LMIA-backed work permit at any time, but you must continue meeting your study permit conditions until you switch.",
      },
      {
        question: "Which has a faster path to PR?",
        answer:
          "Work permit. With a positive LMIA you can apply for PR via Express Entry CEC after just 12 months of skilled Canadian work experience. The study route adds 1–4 years of school before you can start the PGWP-then-CEC clock.",
      },
      {
        question: "Do I need a PAL/TAL for both?",
        answer:
          "No. The Provincial / Territorial Attestation Letter (PAL/TAL) is required only for new study permit applications. Work permit applications do not require a PAL.",
      },
    ],
    lastUpdated: "2026-05-13",
  },
];

export const getComparison = (slug: string): Comparison | undefined =>
  comparisons.find((c) => c.slug === slug);

export const allComparisonSlugs = (): string[] => comparisons.map((c) => c.slug);
