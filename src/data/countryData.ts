export interface CountryData {
  slug: string;
  name: string;
  flag: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  heroDescription: string;
  /** 40–60 word direct answer shown under H1 for AEO/GEO snippets. Optional for backwards compatibility. */
  quickAnswer?: string;
  pathways: { title: string; description: string; icon: string }[];
  eligibility: { title: string; items: string[] }[];
  steps: { step: number; title: string; description: string }[];
  timeline: { stage: string; duration: string }[];
  faqs: { question: string; answer: string }[];
  jobMarket: { sector: string; demand: string }[];
}

export const countries: CountryData[] = [
  {
    slug: "canada",
    name: "Canada",
    flag: "🇨🇦",
    tagline: "Fastest PR Pathways & Multicultural Living",
    metaTitle: "Canada Immigration 2026 | Express Entry, PNP, Study & Work Visa",
    metaDescription: "Complete guide to Canada immigration. Express Entry PR, Provincial Nominee Programs, study visas, work permits, and family sponsorship. Expert guidance by 4 Aces Visa.",
    heroDescription: "Canada offers the world's most immigrant-friendly policies with multiple pathways to permanent residency. From Express Entry to Provincial Nominee Programs, discover your path to Canadian PR.",
    quickAnswer: "Canada offers six main immigration pathways in 2026: Express Entry (PR in ~6 months), Provincial Nominee Programs (+600 CRS points), study permits with PGWP, LMIA-backed work permits, family sponsorship, and visitor/Super Visas. Most applicants need a CRS score of 430+, IELTS CLB 7, and proof of funds (~CAD 14,690 single).",
    pathways: [
      { title: "Express Entry PR", description: "Points-based system for skilled workers. Process PR in just 6 months through CRS ranking.", icon: "rocket" },
      { title: "Provincial Nominee Program", description: "Get nominated by a province for +600 CRS points. Virtually guarantees PR invitation.", icon: "map" },
      { title: "Study Visa + PGWP", description: "Study at a DLI, earn PGWP after graduation, and transition to permanent residency.", icon: "graduation" },
      { title: "Work Permits & LMIA", description: "LMIA-based, open, and employer-specific work permits with PR pathways.", icon: "briefcase" },
      { title: "Family Sponsorship", description: "Sponsor spouse, parents, and children for Canadian permanent residency.", icon: "heart" },
      { title: "Visitor Visa & Super Visa", description: "Visit family in Canada with single or multiple-entry visitor visa or 10-year Super Visa.", icon: "plane" },
    ],
    eligibility: [
      { title: "Express Entry", items: ["Age: 18-45 (max points at 20-29)", "Education: Minimum bachelor's degree", "Language: IELTS CLB 7+ recommended", "Work experience: 1+ year skilled work", "CRS Score: 430+ for general draws"] },
      { title: "Study Visa", items: ["Acceptance from a DLI", "Proof of funds: CAD 20,635+/year", "Language proficiency (IELTS/TOEFL)", "Valid passport", "Clean background check"] },
    ],
    steps: [
      { step: 1, title: "Document Assessment", description: "We evaluate your profile, documents, and eligibility for the best pathway." },
      { step: 2, title: "Profile Optimization", description: "Maximize your CRS score through strategic improvements in language, education, and experience." },
      { step: 3, title: "Application Filing", description: "Submit your Express Entry profile or visa application with expert guidance." },
      { step: 4, title: "Interview Prep", description: "Prepare for any interviews or additional document requests." },
      { step: 5, title: "Visa Approval", description: "Receive your ITA, submit PR application, and get your visa approved." },
    ],
    timeline: [
      { stage: "Express Entry Profile", duration: "1-2 weeks" },
      { stage: "CRS Pool to ITA", duration: "2 weeks - 8 months" },
      { stage: "PR Application Processing", duration: "6 months" },
      { stage: "Study Permit", duration: "8-16 weeks" },
      { stage: "Work Permit (LMIA)", duration: "3-6 months" },
    ],
    faqs: [
      { question: "What is the minimum CRS score for Canada PR?", answer: "The minimum CRS score varies by draw. Recent general draws have had cutoffs between 430-490. Category-based draws may have different thresholds. A Provincial Nominee Program nomination adds 600 points." },
      { question: "How long does Canada PR take?", answer: "Express Entry PR typically takes 6 months from ITA to approval. The time to receive an ITA depends on your CRS score and can range from 2 weeks to 8 months." },
      { question: "Can I work while my PR is processing?", answer: "If you're already in Canada on a valid work permit, you can continue working. If you're outside Canada, you'll need to wait for PR approval or obtain a separate work permit." },
      { question: "Is IELTS mandatory for Canada PR?", answer: "Yes, a language test (IELTS or CELPIP for English, TEF for French) is mandatory for Express Entry. Higher scores significantly improve your CRS ranking." },
      { question: "How much money do I need to immigrate to Canada in 2026?", answer: "Settlement funds for a single applicant are CAD 14,690, increasing to CAD 18,288 for two people and roughly CAD 3,900 per additional family member. Government fees add about CAD 1,365 per adult plus CAD 230 per child." },
      { question: "Which Canada PR pathway is fastest in 2026?", answer: "Category-based Express Entry draws (healthcare, STEM, French-speaking, trades, agriculture, education) are currently the fastest, often inviting candidates with CRS scores in the 380–470 range. PNP nominations remain the most reliable route for non-category profiles." },
      { question: "Can I move to Canada from the USA on H1B?", answer: "Yes. H1B holders typically qualify for Express Entry (FSWP/CEC) within weeks. Canadian work experience isn't required, and many tech professionals receive ITAs through STEM category draws or Ontario/BC PNP tech streams." },
      { question: "Do I need a job offer to immigrate to Canada?", answer: "No. Federal Skilled Worker, CEC, and most PNP base streams accept candidates without a Canadian job offer. A valid LMIA-backed offer adds 50–200 CRS points but is not mandatory." },
    ],
    jobMarket: [
      { sector: "Technology", demand: "Very High" },
      { sector: "Healthcare", demand: "Very High" },
      { sector: "Engineering", demand: "High" },
      { sector: "Finance", demand: "High" },
      { sector: "Skilled Trades", demand: "Very High" },
    ],
  },
  {
    slug: "australia",
    name: "Australia",
    flag: "🇦🇺",
    tagline: "Points-Based Skilled Migration & High Wages",
    metaTitle: "Australia Immigration 2026 | Skilled Migration, Work Visa & PR",
    metaDescription: "Complete guide to Australia immigration. Skilled migration (189/190/491), work visas, study pathways, and PR options. Expert guidance by 4 Aces Visa.",
    heroDescription: "Australia's points-based skilled migration system rewards qualified professionals with permanent residency. Discover visa subclasses 189, 190, and 491 and find your pathway to Australian PR.",
    quickAnswer: "Australia's 2026 skilled migration system requires 65+ points (competitive: 80–90+), an occupation on the Skilled Occupation List, a positive skills assessment, age under 45, and IELTS 6+. Main routes are subclass 189 (independent PR), 190 (state-nominated PR, +5 points), and 491 (regional, +15 points with PR pathway via 191).",
    pathways: [
      { title: "Skilled Independent (189)", description: "No state nomination required. Permanent residency granted on visa approval.", icon: "star" },
      { title: "Skilled Nominated (190)", description: "State-nominated with +5 points. Must live in nominating state for 2 years.", icon: "map" },
      { title: "Skilled Regional (491)", description: "Regional provisional visa with +15 points. Pathway to PR via subclass 191.", icon: "compass" },
      { title: "Temporary Skill Shortage", description: "Employer-sponsored work visa for occupations on the skills shortage list.", icon: "briefcase" },
    ],
    eligibility: [
      { title: "Skilled Migration", items: ["Minimum 65 points on points test", "Occupation on Skilled Occupation List", "Skills assessment from relevant authority", "Age: Under 45 at time of invitation", "English: Competent (IELTS 6+) minimum"] },
      { title: "Study Pathway", items: ["Enrollment in CRICOS-registered course", "Genuine Temporary Entrant requirement", "Financial capacity proof", "English proficiency", "Health and character requirements"] },
    ],
    steps: [
      { step: 1, title: "Skills Assessment", description: "Get your occupation assessed by the relevant Australian authority." },
      { step: 2, title: "Points Calculation", description: "Calculate your points score and identify improvement areas." },
      { step: 3, title: "Expression of Interest", description: "Submit your EOI through SkillSelect and wait for invitation." },
      { step: 4, title: "Visa Application", description: "Apply for your visa within 60 days of receiving an invitation." },
      { step: 5, title: "Visa Grant", description: "Complete health checks, police clearances, and receive your visa." },
    ],
    timeline: [
      { stage: "Skills Assessment", duration: "4-12 weeks" },
      { stage: "EOI to Invitation", duration: "2-12 months" },
      { stage: "Visa Processing (189)", duration: "6-12 months" },
      { stage: "Visa Processing (190)", duration: "6-9 months" },
      { stage: "Visa Processing (491)", duration: "6-12 months" },
    ],
    faqs: [
      { question: "How many points do I need for Australian PR?", answer: "You need a minimum of 65 points to be eligible, but competitive scores are typically 80-90+ for most occupations. Points are awarded for age, English, education, and work experience." },
      { question: "What is the Skilled Occupation List?", answer: "The SOL lists occupations that Australia needs. Your occupation must be on the relevant list (MLTSSL, STSOL, or ROL) to be eligible for skilled migration." },
      { question: "Can I bring my family to Australia?", answer: "Yes, you can include your spouse/partner and dependent children in your skilled migration application. Your partner's skills can also add points to your application." },
      { question: "How long does Australian PR take?", answer: "From EOI submission to visa grant, the process typically takes 8-18 months depending on the visa subclass and your occupation." },
      { question: "What's the difference between subclass 189, 190 and 491?", answer: "189 is fully independent PR with no nomination. 190 requires state nomination, adds 5 points, and obliges you to live in that state for 2 years. 491 is a 5-year regional provisional visa with 15 bonus points and a PR pathway via subclass 191 after 3 years of regional residence." },
      { question: "Do I need a job offer for Australia skilled migration?", answer: "No job offer is required for subclass 189, 190, or 491 — these are points-tested. A job offer is only required for employer-sponsored visas like the TSS (482) and Employer Nomination Scheme (186)." },
      { question: "How much does Australia PR cost in 2026?", answer: "Government visa application charges start around AUD 4,765 for the primary applicant (189/190), plus AUD 2,385 per adult dependent and AUD 1,195 per child. Skills assessment, IELTS, medicals and police checks add roughly AUD 1,500–3,000." },
      { question: "Is age a barrier for Australian PR?", answer: "You must be under 45 at the time of invitation. Maximum age points (30) are awarded between 25–32; points decline after 33 and reach zero at 45. Older applicants often pursue employer-sponsored or business visas instead." },
    ],
    jobMarket: [
      { sector: "Healthcare & Nursing", demand: "Very High" },
      { sector: "IT & Software", demand: "Very High" },
      { sector: "Engineering", demand: "High" },
      { sector: "Construction & Trades", demand: "Very High" },
      { sector: "Accounting & Finance", demand: "High" },
    ],
  },
  {
    slug: "germany",
    name: "Germany",
    flag: "🇩🇪",
    tagline: "EU Career Mobility & Blue Card Pathway",
    metaTitle: "Germany Immigration 2026 | Job Seeker Visa, Blue Card & Work Permit",
    metaDescription: "Complete guide to Germany immigration. Job Seeker Visa, EU Blue Card, work visa pathways, and PR transition. Expert guidance by 4 Aces Visa.",
    heroDescription: "Germany offers unique access to the European Union job market through its Job Seeker Visa and EU Blue Card programs. Build your career in Europe's largest economy with a clear path to permanent residency.",
    quickAnswer: "Germany's 2026 immigration routes include the 6-month Job Seeker Visa (no job offer needed), the EU Blue Card (job offer with €45,300+ salary, or €39,682 for shortage roles), the standard Work Visa, and the new Opportunity Card (Chancenkarte) points system. PR is available after 21 months with B1 German, or 33 months without.",
    pathways: [
      { title: "Job Seeker Visa", description: "6-month visa to search for employment in Germany. No job offer required to apply.", icon: "search" },
      { title: "EU Blue Card", description: "Premium work visa with fast-track PR. Requires job offer with minimum salary threshold.", icon: "credit-card" },
      { title: "Work Visa", description: "Standard work visa for qualified professionals with a German job offer.", icon: "briefcase" },
      { title: "PR Transition", description: "Path from work visa to permanent settlement permit after 21-33 months.", icon: "home" },
    ],
    eligibility: [
      { title: "Job Seeker Visa", items: ["Recognized university degree", "Financial proof: ~€11,208 in blocked account", "Health insurance coverage", "German language: B1 recommended", "Clear job search plan"] },
      { title: "EU Blue Card", items: ["University degree recognized in Germany", "Job offer with min. €45,300 salary", "Shortage occupation: €39,682 minimum", "Health insurance", "No criminal record"] },
    ],
    steps: [
      { step: 1, title: "Degree Recognition", description: "Verify your degree is recognized in Germany through the anabin database." },
      { step: 2, title: "Document Preparation", description: "Prepare financial proof, insurance, and application documents." },
      { step: 3, title: "Embassy Appointment", description: "Book and attend appointment at the German embassy/consulate." },
      { step: 4, title: "Job Search in Germany", description: "Arrive in Germany and begin your job search (Job Seeker Visa)." },
      { step: 5, title: "Blue Card Application", description: "After securing a job offer, apply for EU Blue Card at Ausländerbehörde." },
    ],
    timeline: [
      { stage: "Job Seeker Visa Processing", duration: "4-12 weeks" },
      { stage: "Job Search Period", duration: "Up to 6 months" },
      { stage: "Blue Card Processing", duration: "4-8 weeks" },
      { stage: "PR (with B1 German)", duration: "21 months" },
      { stage: "PR (without B1)", duration: "33 months" },
    ],
    faqs: [
      { question: "What is the Germany Job Seeker Visa?", answer: "The Job Seeker Visa allows qualified professionals to enter Germany for 6 months to search for employment. You cannot work during this period but can attend interviews and networking events." },
      { question: "What is the EU Blue Card?", answer: "The EU Blue Card is a premium work and residence permit for highly qualified non-EU nationals. It requires a recognized degree and a job offer meeting the minimum salary threshold (€45,300 or €39,682 for shortage occupations)." },
      { question: "How fast can I get German PR?", answer: "With a B1 level German language certificate and an EU Blue Card, you can apply for permanent residency after just 21 months. Without B1, the waiting period is 33 months." },
      { question: "Do I need to speak German?", answer: "While not always mandatory, B1 German significantly improves your job prospects and accelerates your PR timeline. Many tech and international companies work in English." },
      { question: "What is Germany's Opportunity Card (Chancenkarte)?", answer: "Launched in 2024, the Chancenkarte is a points-based job-search residence permit. Applicants score on qualifications, language, age (under 35 best), and German connection. With 6+ points you can enter Germany for 1 year to find work, including part-time during the search." },
      { question: "Is my degree recognized in Germany?", answer: "Use the official anabin database to check. Degrees marked H+ are fully recognized. If H- or unlisted, you may need a Statement of Comparability from ZAB (Zentralstelle für ausländisches Bildungswesen), which costs €200 and takes ~3 months." },
      { question: "How much money do I need for the Job Seeker Visa?", answer: "You must show ~€11,208 in a German blocked account (Sperrkonto) to cover 6 months of living expenses, plus valid German health insurance and accommodation proof for the initial stay." },
      { question: "Can I bring my family on a Blue Card?", answer: "Yes. Spouses receive immediate full work rights with no German language requirement, and children attend free public schools. Family reunification is processed in parallel and is one of the fastest in the EU." },
    ],
    jobMarket: [
      { sector: "Engineering & Manufacturing", demand: "Very High" },
      { sector: "IT & Software Development", demand: "Very High" },
      { sector: "Healthcare", demand: "High" },
      { sector: "Automotive Industry", demand: "High" },
      { sector: "Research & Science", demand: "High" },
    ],
  },
  {
    slug: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    tagline: "Skilled Worker Visa & Global Talent Route",
    metaTitle: "UK Immigration 2026 | Skilled Worker Visa, Study & PR – 4 Aces Visa",
    metaDescription: "Complete guide to UK immigration. Skilled Worker visa, Global Talent visa, student route, and ILR pathway. Expert guidance by 4 Aces Visa.",
    heroDescription: "The United Kingdom offers world-class career opportunities through its points-based immigration system. From the Skilled Worker visa to the prestigious Global Talent route, discover your pathway to settling in the UK.",
    quickAnswer: "UK 2026 immigration runs on a points-based system. The main routes are the Skilled Worker visa (job offer from a licensed sponsor, £38,700 minimum salary or going rate), Global Talent visa (no job offer needed for endorsed leaders), Health & Care Worker visa, and the Student route with a 2-year Graduate post-study work permit. ILR is available after 5 qualifying years.",
    pathways: [
      { title: "Skilled Worker Visa", description: "Points-based work visa with a job offer from a UK-licensed sponsor. Pathway to ILR after 5 years.", icon: "briefcase" },
      { title: "Global Talent Visa", description: "For leaders and emerging talent in science, engineering, arts, and digital technology. No job offer required.", icon: "star" },
      { title: "Student Visa", description: "Study at UK universities with part-time work rights. Graduate Route offers 2-year post-study work.", icon: "graduation" },
      { title: "Indefinite Leave to Remain (ILR)", description: "Permanent residency after 5 years on qualifying visa. Path to British citizenship.", icon: "home" },
    ],
    eligibility: [
      { title: "Skilled Worker Visa", items: ["Job offer from UK-licensed sponsor", "Minimum salary: £26,200 or going rate", "English language: B1 level (IELTS 4.0+)", "Certificate of Sponsorship (CoS)", "Meet points threshold (70 points)"] },
      { title: "Global Talent Visa", items: ["Endorsement from approved body", "Exceptional talent or promise in field", "No job offer or sponsor required", "Evidence of achievements and recognition", "Plan to work in the UK in your field"] },
    ],
    steps: [
      { step: 1, title: "Eligibility Assessment", description: "We evaluate your qualifications, work experience, and English level against UK visa requirements." },
      { step: 2, title: "Sponsor & Job Matching", description: "Identify licensed UK sponsors and qualifying job offers that meet salary thresholds." },
      { step: 3, title: "Application Preparation", description: "Compile documents, language test results, financial evidence, and CoS details." },
      { step: 4, title: "Visa Application", description: "Submit online application, pay fees and Immigration Health Surcharge, attend biometrics appointment." },
      { step: 5, title: "Arrival & Settlement", description: "Receive your visa, travel to the UK, and begin your path toward ILR and citizenship." },
    ],
    timeline: [
      { stage: "Skilled Worker Visa Processing", duration: "3-8 weeks" },
      { stage: "Global Talent Endorsement", duration: "5-8 weeks" },
      { stage: "Student Visa Processing", duration: "3-6 weeks" },
      { stage: "ILR Application", duration: "6 months (after 5 years)" },
      { stage: "British Citizenship", duration: "6 months (after 1 year ILR)" },
    ],
    faqs: [
      { question: "What is the Skilled Worker Visa?", answer: "The Skilled Worker visa replaced the old Tier 2 visa. It allows you to work in the UK with a licensed sponsor. You need a job offer, meet the salary threshold (£26,200 or the going rate), and score 70 points on the points-based system." },
      { question: "How long until I can get UK permanent residency?", answer: "After 5 continuous years on a Skilled Worker visa or most qualifying visas, you can apply for Indefinite Leave to Remain (ILR). You must pass the Life in the UK test and meet English language requirements." },
      { question: "Can I bring my family to the UK?", answer: "Yes, Skilled Worker visa holders can bring their spouse/partner and children under 18 as dependants. They can work and study in the UK without restrictions." },
      { question: "What is the Graduate Route visa?", answer: "The Graduate Route allows international students to stay and work in the UK for 2 years (3 years for PhD graduates) after completing their degree. No job offer or minimum salary is required." },
      { question: "What is the new £38,700 salary threshold?", answer: "From April 2024 the general Skilled Worker minimum salary rose to £38,700 (or the occupation's going rate, whichever is higher). Health & Care workers, new entrants, and PhD-level shortage roles have lower thresholds (£23,200–£30,960)." },
      { question: "Does UK Health & Care Worker visa lead to PR?", answer: "Yes. NHS doctors, nurses, paramedics and adult social care roles qualify. The visa is fee-discounted, exempt from the Immigration Health Surcharge, and counts towards the 5-year ILR clock." },
      { question: "How much does a UK Skilled Worker visa cost in 2026?", answer: "Application fees range from £719 (≤3 years, outside UK) to £1,420 (>3 years, inside UK), plus the Immigration Health Surcharge of £1,035/year per person, and a Certificate of Sponsorship fee of £525. A 5-year visa for a couple typically totals £15,000–£18,000." },
      { question: "Can I switch from Student to Skilled Worker visa?", answer: "Yes, after completing your course you can switch in-country to a Skilled Worker visa with a sponsored job offer, or use the 2-year Graduate Route to find work first. Time on Graduate Route does not count toward ILR, but Skilled Worker time does." },
    ],
    jobMarket: [
      { sector: "Healthcare & NHS", demand: "Very High" },
      { sector: "Technology & Digital", demand: "Very High" },
      { sector: "Engineering", demand: "High" },
      { sector: "Finance & Banking", demand: "High" },
      { sector: "Education & Research", demand: "High" },
    ],
  },
];
