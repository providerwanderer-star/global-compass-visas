export interface ServiceData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroDescription: string;
  overview: string;
  benefits: string[];
  eligibility: { title: string; items: string[] }[];
  process: { step: number; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  relatedCountries: string[];
}

export const services: ServiceData[] = [
  {
    slug: "express-entry",
    title: "Canada Express Entry PR",
    metaTitle: "Canada Express Entry 2026 | PR in 6 Months – 4 Aces Visa",
    metaDescription: "Apply for Canada Permanent Residency through Express Entry. CRS score optimization, profile creation, and ITA guidance. 98% success rate with 4 Aces Visa.",
    heroDescription: "Express Entry is Canada's flagship immigration system for skilled workers. Get your Permanent Residency in as little as 6 months with our expert CRS optimization strategy.",
    overview: "Canada's Express Entry system manages three federal economic immigration programs: Federal Skilled Worker Program (FSWP), Federal Skilled Trades Program (FSTP), and Canadian Experience Class (CEC). Candidates are ranked using the Comprehensive Ranking System (CRS) and top-ranked candidates receive Invitations to Apply (ITA) for permanent residency through regular draws.",
    benefits: [
      "PR in as little as 6 months from ITA",
      "Access to free healthcare and education",
      "Work and live anywhere in Canada",
      "Bring your spouse and children",
      "Path to Canadian citizenship in 3 years",
      "No job offer required for FSWP",
    ],
    eligibility: [
      { title: "Federal Skilled Worker", items: ["1+ year continuous skilled work experience", "Language: CLB 7 in all abilities (IELTS 6.0+)", "Education: Minimum secondary school (ECA required)", "Minimum 67 points on FSW grid", "Proof of settlement funds"] },
      { title: "Canadian Experience Class", items: ["1+ year skilled work experience in Canada (within last 3 years)", "Language: CLB 7 for NOC 0/A, CLB 5 for NOC B", "No education requirement", "Must not be self-employed work", "Legal status during work period"] },
    ],
    process: [
      { step: 1, title: "Profile Assessment", description: "We evaluate your education, work experience, language scores, and age to calculate your CRS score and identify the best Express Entry stream." },
      { step: 2, title: "CRS Optimization", description: "Strategic improvements — retake IELTS for higher scores, obtain ECA, explore PNP nominations for +600 points, and leverage job offers." },
      { step: 3, title: "Express Entry Profile", description: "Create and submit your Express Entry profile to the CRS pool with optimized documentation." },
      { step: 4, title: "Receive ITA", description: "When your CRS score meets the draw cutoff, you receive an Invitation to Apply for PR." },
      { step: 5, title: "PR Application", description: "Submit complete PR application with police clearances, medical exams, and supporting documents within 60 days." },
      { step: 6, title: "COPR & Landing", description: "Receive Confirmation of Permanent Residence and complete your landing in Canada." },
    ],
    faqs: [
      { question: "What is a good CRS score for Express Entry?", answer: "Recent general draws have had cutoffs between 430-490. Category-based draws (healthcare, STEM, French) may have lower cutoffs. A PNP nomination adds 600 points, virtually guaranteeing an ITA." },
      { question: "How long does Express Entry take?", answer: "From profile submission to PR approval, the process typically takes 6-8 months if you receive an ITA quickly. The PR application itself is processed in about 6 months." },
      { question: "Can I apply without a job offer?", answer: "Yes! The Federal Skilled Worker Program does not require a Canadian job offer. However, a valid job offer adds 50-200 CRS points." },
      { question: "What if my CRS score is low?", answer: "Our team specializes in CRS optimization: improving IELTS scores, PNP nominations (+600 points), additional education credentials, and spousal factors can significantly boost your score." },
    ],
    relatedCountries: ["canada"],
  },
  {
    slug: "work-permits",
    title: "Work Permits (All Countries)",
    metaTitle: "Work Permit Visa 2026 | Canada, Australia & Germany – 4 Aces Visa",
    metaDescription: "Get expert help with work permits for Canada (LMIA), Australia (TSS), and Germany. Employer-sponsored and open work permits. Free consultation.",
    heroDescription: "Secure your international career with the right work permit. We handle LMIA-based Canadian work permits, Australian Temporary Skill Shortage visas, and German work visas with precision.",
    overview: "Work permits are your gateway to international careers and often serve as stepping stones to permanent residency. Each country has distinct work permit categories — Canada uses LMIA-based and open work permits, Australia offers the Temporary Skill Shortage (TSS/482) visa, and Germany provides work visas leading to EU Blue Card. Our team matches you with the optimal work permit pathway.",
    benefits: [
      "Legal right to work in your chosen country",
      "Pathway to permanent residency in most cases",
      "Access to local job markets and salaries",
      "Bring dependent family members",
      "Build international work experience",
      "Tax benefits and social security access",
    ],
    eligibility: [
      { title: "Canada Work Permit (LMIA)", items: ["Valid job offer from Canadian employer", "Positive LMIA from employer", "Relevant work experience and qualifications", "Language proficiency", "Clean criminal record and medical clearance"] },
      { title: "Australia TSS Visa (482)", items: ["Occupation on skilled occupation list", "2+ years relevant work experience", "Employer nomination/sponsorship", "Skills assessment (if required)", "English: IELTS 5.0+ (overall)"] },
      { title: "Germany Work Visa", items: ["Recognized university degree or qualification", "Job offer from German employer", "Salary meeting minimum threshold", "Health insurance coverage", "No criminal record"] },
    ],
    process: [
      { step: 1, title: "Job Offer Review", description: "We verify your job offer meets immigration requirements for your target country." },
      { step: 2, title: "Employer Coordination", description: "Assist your employer with LMIA (Canada), nomination (Australia), or contract compliance (Germany)." },
      { step: 3, title: "Documentation", description: "Prepare all required documents including qualifications, experience letters, and language test results." },
      { step: 4, title: "Application Submission", description: "Submit your work permit application with complete, accurate documentation." },
      { step: 5, title: "Approval & Arrival", description: "Receive your work permit and prepare for relocation with our settlement guidance." },
    ],
    faqs: [
      { question: "What is LMIA in Canada?", answer: "Labour Market Impact Assessment (LMIA) is a document that a Canadian employer may need before hiring a foreign worker. A positive LMIA shows that no Canadian worker is available for the job." },
      { question: "Can a work permit lead to PR?", answer: "Yes! In Canada, Canadian work experience boosts your CRS score. In Australia, the TSS visa can transition to PR through the ENS (186) visa. In Germany, work visa holders can apply for PR after 21-33 months." },
      { question: "Can my family accompany me?", answer: "Yes, most work permits allow you to bring your spouse/partner and dependent children. Spouses often receive open work permits as well." },
      { question: "How long does a work permit take?", answer: "Canada LMIA-based: 3-6 months. Australia TSS: 1-4 months. Germany work visa: 4-12 weeks. Timelines vary based on individual circumstances." },
    ],
    relatedCountries: ["canada", "australia", "germany"],
  },
  {
    slug: "study-visas",
    title: "Study Visas (Global)",
    metaTitle: "Study Visa 2026 | Canada, Australia & Germany Study Abroad – 4 Aces Visa",
    metaDescription: "Study abroad in Canada, Australia, or Germany. DLI admission, study permits, PGWP, and PR pathways. Complete guidance from 4 Aces Visa.",
    heroDescription: "Transform your education into a global career. We guide you from university admission to study permit approval, and help you transition to post-graduation work permits and permanent residency.",
    overview: "Studying abroad is one of the most reliable pathways to permanent residency. Canada's Post-Graduation Work Permit (PGWP) program, Australia's post-study work visa, and Germany's tuition-free universities make education a strategic immigration move. We help you choose the right institution, program, and country to maximize both your education and immigration outcomes.",
    benefits: [
      "World-class education from top universities",
      "Work part-time during studies (20 hrs/week)",
      "Post-graduation work permits (1-3 years)",
      "Direct pathway to permanent residency",
      "Build local professional network",
      "Access to scholarships and financial aid",
    ],
    eligibility: [
      { title: "Canada Study Permit", items: ["Acceptance letter from a DLI (Designated Learning Institution)", "Proof of funds: CAD 20,635+ per year", "Language proficiency (IELTS/TOEFL)", "Valid passport", "No criminal record", "Medical exam (if required)"] },
      { title: "Australia Student Visa (500)", items: ["Enrollment in CRICOS-registered course", "Genuine Temporary Entrant (GTE) requirement", "Financial capacity: AUD 24,505+/year", "English: IELTS 5.5+ (or equivalent)", "Overseas Student Health Cover (OSHC)"] },
    ],
    process: [
      { step: 1, title: "Course & University Selection", description: "We help you choose the right program and institution based on your career goals and PR pathway." },
      { step: 2, title: "Admission Application", description: "Apply to universities with optimized applications and required documents." },
      { step: 3, title: "Financial Preparation", description: "Arrange proof of funds, GIC (Canada), or blocked account (Germany)." },
      { step: 4, title: "Visa Application", description: "Submit study permit/visa application with complete documentation." },
      { step: 5, title: "Pre-Departure", description: "Receive your visa, arrange accommodation, and prepare for your journey." },
    ],
    faqs: [
      { question: "Can I work while studying abroad?", answer: "Yes! Canada allows 20 hrs/week during semester and full-time during breaks. Australia allows 48 hrs/fortnight. Germany allows 120 full days or 240 half days per year." },
      { question: "What is PGWP in Canada?", answer: "Post-Graduation Work Permit allows you to work in Canada for 1-3 years after graduating from a DLI. It's a key stepping stone to Express Entry PR." },
      { question: "Is studying in Germany really free?", answer: "Most public universities in Germany charge no tuition fees (only a semester contribution of €150-350). You still need living expenses (~€11,208/year in a blocked account)." },
      { question: "Which country is best for studying abroad?", answer: "Canada is best for PR pathways via PGWP. Australia offers high earning potential. Germany offers tuition-free education with EU career access. The best choice depends on your field and goals." },
    ],
    relatedCountries: ["canada", "australia", "germany"],
  },
  {
    slug: "job-seeker-visa",
    title: "Germany Job Seeker Visa",
    metaTitle: "Germany Job Seeker Visa 2026 | Find Jobs in Germany – 4 Aces Visa",
    metaDescription: "Apply for Germany Job Seeker Visa. 6-month visa to search for employment. Transition to EU Blue Card and PR. Expert guidance from 4 Aces Visa.",
    heroDescription: "Germany's Job Seeker Visa lets you enter Germany for 6 months to find employment — no job offer required. Once you land a job, transition to the EU Blue Card with a fast-track to permanent residency.",
    overview: "The Germany Job Seeker Visa is unique in global immigration — it allows qualified professionals to enter Germany specifically to search for employment. Unlike most work visas that require a pre-arranged job offer, this visa gives you 6 months of on-the-ground job hunting. Once employed, you can transition to an EU Blue Card, which offers one of the fastest PR timelines in Europe (21 months with B1 German).",
    benefits: [
      "No job offer required to apply",
      "6 months to search for employment in Germany",
      "Access to Europe's largest job market",
      "Transition to EU Blue Card after finding work",
      "Fast-track PR: 21 months with B1 German",
      "Free movement within Schengen zone during job search",
    ],
    eligibility: [
      { title: "Job Seeker Visa Requirements", items: ["Recognized university degree (check anabin database)", "Proof of financial means: ~€11,208 in blocked account", "Health insurance valid in Germany", "German language: B1 recommended (not mandatory)", "Accommodation proof for initial period", "Clear job search plan/strategy"] },
      { title: "EU Blue Card (After Job Offer)", items: ["Job offer with minimum salary of €45,300/year", "Shortage occupations: lower threshold of €39,682", "University degree recognized in Germany", "Health insurance", "No criminal record"] },
    ],
    process: [
      { step: 1, title: "Degree Verification", description: "Check your degree recognition via the anabin database and obtain credential evaluation if needed." },
      { step: 2, title: "Financial Preparation", description: "Open a blocked account with ~€11,208 and arrange health insurance coverage." },
      { step: 3, title: "Embassy Application", description: "Book appointment at German embassy/consulate and submit your visa application." },
      { step: 4, title: "Job Search in Germany", description: "Arrive in Germany, attend interviews, network at career fairs, and leverage job portals." },
      { step: 5, title: "Blue Card Transition", description: "After securing a qualifying job offer, apply for EU Blue Card at your local Ausländerbehörde." },
    ],
    faqs: [
      { question: "Can I work on a Job Seeker Visa?", answer: "No, the Job Seeker Visa does not permit employment. You can attend interviews, networking events, and career fairs, but cannot start working until you obtain a work visa or Blue Card." },
      { question: "What happens if I don't find a job in 6 months?", answer: "If you don't find employment within 6 months, you must return to your home country. Proper preparation, job search strategy, and German language skills significantly improve your chances." },
      { question: "How fast can I get German PR?", answer: "With an EU Blue Card and B1 German, you can apply for a permanent settlement permit after just 21 months. Without B1 German, the timeline extends to 33 months." },
      { question: "Is German language mandatory?", answer: "While not legally mandatory for the Job Seeker Visa, B1 German dramatically improves job prospects and accelerates your PR timeline. Many tech companies work in English, but German is essential for most industries." },
    ],
    relatedCountries: ["germany"],
  },
  {
    slug: "family-sponsorship",
    title: "Family Sponsorship (Canada)",
    metaTitle: "Canada Family Sponsorship 2026 | Sponsor Spouse, Parents & Children – 4 Aces Visa",
    metaDescription: "Sponsor your spouse, parents, grandparents, or children for Canada PR. Complete family sponsorship guide and expert processing by 4 Aces Visa.",
    heroDescription: "Reunite with your loved ones in Canada. Our family sponsorship experts handle spousal, parent, and dependent child sponsorship with meticulous attention to every document and deadline.",
    overview: "Canada's Family Sponsorship program allows Canadian citizens and permanent residents to sponsor their close family members for immigration. This includes spousal/common-law partner sponsorship, parent and grandparent sponsorship (PGP), and dependent children. The program reflects Canada's commitment to family reunification and is one of the most popular immigration pathways.",
    benefits: [
      "Reunite with spouse, parents, and children in Canada",
      "Sponsored family members receive PR status",
      "Access to healthcare, education, and social services",
      "Spouse can work immediately with open work permit",
      "Children get free public education",
      "Path to Canadian citizenship",
    ],
    eligibility: [
      { title: "Spousal Sponsorship", items: ["Must be Canadian citizen or PR", "Spouse must be legally married or common-law (1+ year cohabitation)", "Genuine relationship evidence required", "Sponsor must meet income requirements (if applicable)", "No previous sponsorship default"] },
      { title: "Parent & Grandparent Sponsorship", items: ["Must be Canadian citizen or PR (18+)", "Meet Minimum Necessary Income (MNI) for 3 consecutive years", "Sign undertaking to provide financial support (20 years)", "Parents/grandparents must pass medical and security checks", "Submit during annual intake period"] },
    ],
    process: [
      { step: 1, title: "Eligibility Review", description: "We verify your eligibility as a sponsor and assess your family member's admissibility." },
      { step: 2, title: "Relationship Documentation", description: "Compile comprehensive evidence of genuine relationship — photos, communications, financial ties." },
      { step: 3, title: "Application Package", description: "Prepare and submit complete sponsorship application with all supporting documents." },
      { step: 4, title: "Processing & Updates", description: "Monitor application status, respond to additional document requests, and prepare for interviews." },
      { step: 5, title: "PR Approval & Landing", description: "Receive PR approval for your family member and complete landing procedures." },
    ],
    faqs: [
      { question: "How long does spousal sponsorship take?", answer: "Inland spousal sponsorship takes about 12 months. Outland processing may take 12-18 months depending on the visa office. Your spouse can apply for an open work permit while waiting." },
      { question: "What income do I need to sponsor parents?", answer: "You must meet the Minimum Necessary Income (MNI) for 3 consecutive tax years. For 2026, this is approximately CAD 43,000+ for a family of 3. The amount increases with family size." },
      { question: "Can I sponsor my common-law partner?", answer: "Yes! Canada recognizes common-law partnerships (1+ year cohabitation) and conjugal partnerships for sponsorship. You need to provide substantial evidence of the relationship." },
      { question: "What if my sponsorship is refused?", answer: "If refused, we analyze the reasons and advise on appeal options or reapplication strategy. Common reasons include insufficient relationship evidence or income shortfall." },
    ],
    relatedCountries: ["canada"],
  },
];
