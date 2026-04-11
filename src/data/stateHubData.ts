export interface StateHub {
  slug: string;
  name: string;
  parentPath: string; // "/india" or "/canada"
  parentLabel: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  stats: { value: string; label: string }[];
  pathways: { title: string; desc: string; link: string }[];
  cities: string[]; // city slugs
  faqs: { question: string; answer: string }[];
}

export const stateHubs: StateHub[] = [
  {
    slug: "gujarat",
    name: "Gujarat",
    parentPath: "/india",
    parentLabel: "India",
    metaTitle: "Best Immigration Consultant in Gujarat | Canada PR, Study & Work Visa – 4 Aces Visa",
    metaDescription: "Top-rated immigration consultant for Gujarat. Expert help for Canada PR, Express Entry, LMIA, study permits & Australia migration from Ahmedabad, Surat, Vadodara, Rajkot & Gandhinagar. Free assessment.",
    h1: "Immigration Consultant in Gujarat",
    intro: "Gujarat's entrepreneurial spirit drives thousands of professionals and business owners to explore immigration every year. Whether you're an IT professional in Ahmedabad, a diamond trader in Surat, or an engineer in Vadodara — 4 Aces Visa provides expert immigration guidance tailored to Gujarat applicants across Canada, Australia, Germany & UK.",
    stats: [
      { value: "25,000+", label: "Gujarat applicants got Canada PR in 2024" },
      { value: "6 Months", label: "Express Entry processing" },
      { value: "98%", label: "Our approval rate" },
      { value: "Free", label: "Initial assessment" },
    ],
    pathways: [
      { title: "Canada Express Entry", desc: "Gujarat IT and engineering professionals consistently score 450+ CRS. Our experts maximize your points.", link: "/services/express-entry" },
      { title: "Start-Up Visa", desc: "Gujarat's entrepreneurial culture aligns perfectly with Canada's Start-Up Visa program for business owners.", link: "/services/express-entry" },
      { title: "Australia Skilled Migration", desc: "Chemical engineers, accountants & IT professionals from Gujarat match Australia's Skilled Occupation List.", link: "/immigration/australia" },
      { title: "Study & PGWP Pathway", desc: "Study at a Canadian DLI and transition to PR through Post-Graduation Work Permit.", link: "/services/student-visa" },
    ],
    cities: ["ahmedabad", "surat", "vadodara", "rajkot", "gandhinagar"],
    faqs: [
      { question: "Who is the best immigration consultant in Gujarat?", answer: "4 Aces Visa is rated among the top immigration consultants serving Gujarat, with a 98% success rate. We serve Ahmedabad, Surat, Vadodara, Rajkot, and Gandhinagar with personalized immigration strategies." },
      { question: "How much does Canada PR cost from Gujarat?", answer: "Canada PR costs from Gujarat include government fees (CAD 1,365), IELTS (~₹16,000), WES (~₹15,000), and consulting fees. Total is typically ₹3-5 lakhs. 4 Aces Visa offers transparent all-inclusive packages." },
      { question: "Can I apply for Canada PR from Ahmedabad or Surat?", answer: "Absolutely! Thousands of Gujarat professionals apply for Canada PR every year. You can apply from any city. Our team handles everything remotely — from CRS optimization to document prep and submission." },
      { question: "Is Canada Start-Up Visa good for Gujarat business owners?", answer: "Yes! Canada's Start-Up Visa is ideal for Gujarat entrepreneurs. You need a letter of support from a designated Canadian organization, proof of funds, and language proficiency. 4 Aces Visa guides you through the entire process." },
    ],
  },
  {
    slug: "haryana",
    name: "Haryana",
    parentPath: "/india",
    parentLabel: "India",
    metaTitle: "Best Immigration Consultant in Haryana | Canada PR, Express Entry & LMIA – 4 Aces Visa",
    metaDescription: "Trusted immigration consultant for Haryana. Canada PR, Express Entry, LMIA work permits & study visa from Gurugram, Faridabad, Ambala, Karnal & Panipat. Free assessment. 98% success rate.",
    h1: "Immigration Consultant in Haryana",
    intro: "Haryana's NCR corridor and industrial cities produce thousands of skilled professionals eligible for international immigration every year. From Gurugram's corporate executives to Faridabad's engineers and Ambala's defence sector professionals — 4 Aces Visa helps Haryana residents navigate the best pathways to Canada, Australia, Germany & UK.",
    stats: [
      { value: "18,000+", label: "Haryana residents got Canada PR in 2024" },
      { value: "6 Months", label: "Express Entry processing" },
      { value: "98%", label: "Our approval rate" },
      { value: "Free", label: "Initial assessment" },
    ],
    pathways: [
      { title: "Canada Express Entry", desc: "Haryana's NCR tech professionals score 460+ CRS. Our experts optimize your profile for maximum points.", link: "/services/express-entry" },
      { title: "LMIA Work Permits", desc: "Strong employer connections in Ontario and BC create LMIA job offer pipelines for Haryana professionals.", link: "/services/lmia-assistance" },
      { title: "Germany EU Blue Card", desc: "Gurugram's corporate professionals qualify for Germany's EU Blue Card with competitive salary thresholds.", link: "/services/job-seeker-visa" },
      { title: "Study Visa to PR", desc: "Study at a Canadian DLI and leverage PGWP for permanent residency — a popular pathway from Haryana.", link: "/services/student-visa" },
    ],
    cities: ["gurugram", "faridabad", "ambala", "karnal", "panipat"],
    faqs: [
      { question: "Who is the best immigration consultant in Haryana?", answer: "4 Aces Visa is a top-rated consultant serving Haryana with 98% success rate. We help professionals from Gurugram, Faridabad, Ambala, Karnal, and Panipat with Canada PR, work permits, and study visas." },
      { question: "Can I get Canada PR from Gurugram?", answer: "Yes! Gurugram professionals in IT, finance, and management consistently qualify for Express Entry. Many score 460+ CRS with proper optimization. Book a free assessment with 4 Aces Visa." },
      { question: "What is the process for Canada PR from Haryana?", answer: "Step 1: IELTS test. Step 2: WES credential evaluation. Step 3: Create Express Entry profile. Step 4: Receive ITA. Step 5: Submit PR application. Our Haryana team handles every step." },
      { question: "How long does Canada PR take from Haryana?", answer: "Express Entry typically takes 6-8 months from ITA to approval. Including preparation (IELTS, WES), total timeline is 8-14 months. PNP-based applications take 12-18 months." },
    ],
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    parentPath: "/india",
    parentLabel: "India",
    metaTitle: "Best Immigration Consultant in Rajasthan | Canada PR, Work Visa & Study Permit – 4 Aces Visa",
    metaDescription: "Top immigration consultant for Rajasthan. Canada PR, Express Entry, study permits & Australia migration from Jaipur, Jodhpur, Udaipur & Kota. Free assessment. 98% success rate.",
    h1: "Immigration Consultant in Rajasthan",
    intro: "Rajasthan's growing IT sector, world-class educational institutions, and hospitality industry produce thousands of immigration-eligible professionals. From Jaipur's tech corridor to Kota's engineering graduates and Udaipur's hospitality managers — 4 Aces Visa helps Rajasthan residents find the fastest pathway to Canada, Australia, Germany & UK.",
    stats: [
      { value: "15,000+", label: "Rajasthan residents applied for Canada PR in 2024" },
      { value: "6 Months", label: "Express Entry processing" },
      { value: "98%", label: "Our approval rate" },
      { value: "Free", label: "Initial assessment" },
    ],
    pathways: [
      { title: "Canada Express Entry", desc: "Jaipur IT professionals and Kota engineering graduates score competitively in CRS. We maximize your points.", link: "/services/express-entry" },
      { title: "Australia Skilled Migration", desc: "Rajasthan's hospitality, engineering, and medical professionals match Australia's Skilled Occupation List.", link: "/immigration/australia" },
      { title: "LMIA Work Permits", desc: "Hospitality and tourism professionals from Rajasthan find strong LMIA opportunities in Canada's service sector.", link: "/services/lmia-assistance" },
      { title: "Study Visa Pathway", desc: "Kota's coaching culture produces students who excel in Canadian universities and transition to PR via PGWP.", link: "/services/student-visa" },
    ],
    cities: ["jaipur", "jodhpur", "udaipur", "kota"],
    faqs: [
      { question: "Who is the best immigration consultant in Rajasthan?", answer: "4 Aces Visa is a top-rated immigration consultant serving Rajasthan with 98% success rate. We help professionals from Jaipur, Jodhpur, Udaipur, and Kota with Canada PR, study visas, and work permits." },
      { question: "Can I apply for Canada PR from Jaipur?", answer: "Yes! Jaipur's growing IT and hospitality sectors produce qualified Express Entry candidates. Many Jaipur professionals score 440+ CRS. Book a free assessment to check your eligibility." },
      { question: "Is Kota good for study visa to Canada?", answer: "Absolutely! Kota students' strong academic backgrounds help them gain admission to top Canadian DLIs. The study-to-PGWP-to-PR pathway is very popular among Kota graduates." },
      { question: "How much does Canada PR cost from Rajasthan?", answer: "Total costs include government fees (CAD 1,365), IELTS (~₹16,000), WES (~₹15,000), and consulting fees. Rajasthan's lower cost of living helps applicants meet proof-of-funds requirements comfortably." },
    ],
  },
  {
    slug: "ontario",
    name: "Ontario",
    parentPath: "/canada",
    parentLabel: "Canada",
    metaTitle: "Immigration Services in Ontario | PR, LMIA, Family Sponsorship & PNP – 4 Aces Visa",
    metaDescription: "Expert immigration services across Ontario. PR applications, LMIA work permits, family sponsorship, OINP, citizenship & more in Toronto, Brampton, Mississauga, Hamilton & Windsor. Free consultation.",
    h1: "Immigration Services in Ontario",
    intro: "Ontario is Canada's most popular destination for newcomers, receiving over 50% of all immigrants to Canada. Whether you're in Toronto's financial district, Brampton's growing community, or Hamilton's healthcare sector — 4 Aces Visa provides comprehensive immigration support for Ontario residents and newcomers settling in the province.",
    stats: [
      { value: "150,000+", label: "Newcomers to Ontario in 2024" },
      { value: "OINP", label: "Ontario PNP draws monthly" },
      { value: "98%", label: "Our approval rate" },
      { value: "Free", label: "Initial consultation" },
    ],
    pathways: [
      { title: "Ontario PNP (OINP)", desc: "Human Capital Priorities, French-Speaking Worker, and Tech streams. OINP adds 600 CRS points.", link: "/services/pnp-application" },
      { title: "Family Sponsorship", desc: "Sponsor your spouse, parents, and children. Ontario has the largest volume of sponsorship applications in Canada.", link: "/services/family-sponsorship" },
      { title: "LMIA & Work Permits", desc: "Ontario's diverse economy creates strong LMIA opportunities in tech, healthcare, logistics, and manufacturing.", link: "/services/lmia-assistance" },
      { title: "Citizenship Application", desc: "Complete your immigration journey. Our Ontario team handles citizenship test prep, applications, and ceremonies.", link: "/services/citizenship-application" },
    ],
    cities: ["toronto", "brampton", "mississauga", "london-on", "windsor", "scarborough", "milton", "waterloo", "kitchener", "hamilton", "ottawa", "thunder-bay"],
    faqs: [
      { question: "What is the Ontario PNP (OINP)?", answer: "The Ontario Immigrant Nominee Program nominates skilled workers for Canadian PR. It adds 600 CRS points, virtually guaranteeing an Express Entry invitation. Key streams include Human Capital Priorities, Tech Draws, and French-Speaking Workers." },
      { question: "How can I sponsor my parents from Ontario?", answer: "As a Canadian PR or citizen in Ontario, you can apply during the annual Parents and Grandparents Program (PGP) intake. Super Visa is an alternative for extended visits. 4 Aces Visa handles both pathways." },
      { question: "Which Ontario cities have the best LMIA opportunities?", answer: "Toronto GTA (including Brampton, Mississauga, Scarborough) has the most LMIA positions, followed by Hamilton, Kitchener-Waterloo, London, and Windsor. Healthcare, logistics, and tech sectors lead demand." },
      { question: "How long does citizenship take in Ontario?", answer: "After meeting residency requirements (1,095 days in 5 years), citizenship processing takes 12-18 months including the test and ceremony. Our Ontario team helps with test prep and application." },
    ],
  },
  {
    slug: "bc",
    name: "British Columbia",
    parentPath: "/canada",
    parentLabel: "Canada",
    metaTitle: "Immigration Services in British Columbia | BC PNP, PR & Work Permits – 4 Aces Visa",
    metaDescription: "Expert immigration services in BC. BC PNP Tech, PR applications, LMIA work permits, family sponsorship & study permits in Vancouver, Surrey, Burnaby, Victoria & Abbotsford. Free consultation.",
    h1: "Immigration Services in British Columbia",
    intro: "British Columbia is Canada's Pacific gateway, attracting immigrants with its world-class tech sector, stunning natural beauty, and multicultural communities. From Vancouver's downtown core to Surrey's diverse neighbourhoods and Victoria's government hub — 4 Aces Visa provides comprehensive immigration support across BC.",
    stats: [
      { value: "70,000+", label: "Newcomers to BC in 2024" },
      { value: "BC PNP Tech", label: "Weekly tech draws" },
      { value: "98%", label: "Our approval rate" },
      { value: "Free", label: "Initial consultation" },
    ],
    pathways: [
      { title: "BC PNP Tech Stream", desc: "Fast-tracked processing for 29+ in-demand tech occupations. Weekly draws with competitive score thresholds.", link: "/services/pnp-application" },
      { title: "BC PNP Skills Immigration", desc: "Skilled workers, healthcare professionals, and international graduates. Adds 600 CRS points.", link: "/services/pnp-application" },
      { title: "LMIA Work Permits", desc: "BC's tech, film, agriculture, and healthcare sectors create strong LMIA opportunities across the province.", link: "/services/lmia-assistance" },
      { title: "Study & PGWP Pathway", desc: "UBC, SFU, BCIT and other DLIs offer pathways to PGWP and PR. Popular route for international students.", link: "/services/student-visa" },
    ],
    cities: ["vancouver", "surrey", "burnaby", "victoria", "kelowna", "richmond", "abbotsford", "nanaimo", "kamloops", "prince-george"],
    faqs: [
      { question: "What is the BC PNP Tech stream?", answer: "BC PNP Tech targets 29+ in-demand tech occupations with weekly draws and priority processing. It's one of Canada's fastest PNP pathways, adding 600 CRS points for Express Entry candidates." },
      { question: "Which BC cities are best for newcomers?", answer: "Vancouver offers the most jobs but highest costs. Surrey and Burnaby offer affordability with Vancouver access. Kelowna and Kamloops offer lifestyle with BC PNP regional streams. Abbotsford has a strong Punjabi community." },
      { question: "How can I get PR through BC PNP?", answer: "Apply to BC PNP with a valid job offer in BC, register in the BC PNP system, receive an invitation, then apply for nomination. The nomination adds 600 CRS points to your Express Entry profile." },
      { question: "Is Abbotsford good for Punjabi immigrants?", answer: "Yes! Abbotsford has one of BC's largest Punjabi communities with gurdwaras, Punjabi businesses, and cultural events. The city's agriculture and transportation sectors provide strong LMIA opportunities." },
    ],
  },
];
