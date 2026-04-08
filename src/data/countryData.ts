export interface CountryData {
  slug: string;
  name: string;
  flag: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  heroDescription: string;
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
    pathways: [
      { title: "Express Entry PR", description: "Points-based system for skilled workers. Process PR in just 6 months through CRS ranking.", icon: "rocket" },
      { title: "Provincial Nominee Program", description: "Get nominated by a province for +600 CRS points. Virtually guarantees PR invitation.", icon: "map" },
      { title: "Study Visa + PGWP", description: "Study at a DLI, earn PGWP after graduation, and transition to permanent residency.", icon: "graduation" },
      { title: "Work Permits", description: "LMIA-based, open, and employer-specific work permits with PR pathways.", icon: "briefcase" },
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
    ],
    jobMarket: [
      { sector: "Engineering & Manufacturing", demand: "Very High" },
      { sector: "IT & Software Development", demand: "Very High" },
      { sector: "Healthcare", demand: "High" },
      { sector: "Automotive Industry", demand: "High" },
      { sector: "Research & Science", demand: "High" },
    ],
  },
];
