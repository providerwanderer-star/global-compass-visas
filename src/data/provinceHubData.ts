export interface ProvinceStream {
  name: string;
  desc: string;
  cutoff: string;
}

export interface ProvinceHub {
  slug: string;
  code: string;
  flag: string;
  name: string;
  program: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  quickAnswer: string;
  topNocs: string[];
  topCities: { slug: string; name: string }[];
  streams: ProvinceStream[];
  officialUrl: string;
  faqs: { q: string; a: string }[];
}

export const provinceHubs: ProvinceHub[] = [
  {
    slug: "ontario",
    code: "ON",
    flag: "🍁",
    name: "Ontario",
    program: "Ontario Immigrant Nominee Program (OINP)",
    metaTitle: "Ontario PNP 2026 — OINP Streams, Draws & Eligibility | 4 Aces Visa",
    metaDescription: "Complete Ontario PNP guide: Human Capital Priorities, Employer Job Offer, Master's & PhD streams. Latest OINP draw cutoffs and how to qualify in 2026.",
    intro: "Ontario runs Canada's largest provincial nominee program. With Toronto's tech corridor, healthcare demand across the GTA, and Master's/PhD streams for graduates of Ontario universities — OINP issues thousands of nominations each year.",
    quickAnswer: "Ontario's OINP issues nominations through three main paths: Human Capital Priorities (Express Entry-aligned, recent cutoffs ~462 CRS for tech), Employer Job Offer (in-demand skills, international students, foreign workers), and Master's/PhD (for grads of Ontario universities). A nomination adds 600 CRS points.",
    topNocs: ["Software Engineers (21231)", "Registered Nurses (31301)", "Financial Analysts (11102)", "Civil Engineers (21300)", "Data Scientists (21211)"],
    topCities: [
      { slug: "toronto", name: "Toronto" },
      { slug: "brampton", name: "Brampton" },
      { slug: "mississauga", name: "Mississauga" },
      { slug: "london-on", name: "London" },
      { slug: "windsor", name: "Windsor" },
    ],
    streams: [
      { name: "Human Capital Priorities (HCP)", desc: "Drawn from the Express Entry pool. Tech, healthcare and French-speaking sub-streams. EE profile required.", cutoff: "CRS 462+ (recent tech draw)" },
      { name: "Employer Job Offer — Foreign Worker", desc: "Valid full-time job offer in TEER 0/1/2/3 from an Ontario employer.", cutoff: "Job offer required" },
      { name: "Employer Job Offer — International Student", desc: "Recent grads of an Ontario PSI with a permanent job offer.", cutoff: "Job offer + Ontario credential" },
      { name: "Employer Job Offer — In-Demand Skills", desc: "TEER 4/5 jobs in agriculture, construction and trucking.", cutoff: "Job offer + 9 months experience" },
      { name: "Master's Graduate Stream", desc: "Recent Master's grads from a publicly funded Ontario university — no job offer needed.", cutoff: "Score-based intake" },
      { name: "PhD Graduate Stream", desc: "PhD grads from publicly funded Ontario universities. No job offer required.", cutoff: "Score-based intake" },
    ],
    officialUrl: "https://www.ontario.ca/page/ontario-immigrant-nominee-program-oinp",
    faqs: [
      { q: "What is Ontario's most popular PNP stream in 2026?", a: "Human Capital Priorities (especially the Tech draw) is the most active OINP stream, drawing Express Entry candidates with strong CRS scores (~462+) in NOCs like software engineering, data science, and cybersecurity." },
      { q: "Do I need a job offer for OINP?", a: "Not for HCP, Master's, or PhD streams. Employer Job Offer streams obviously require one. Master's/PhD streams are job-offer-free, making them ideal for international students at U of T, Waterloo, McMaster and other Ontario universities." },
      { q: "How long does OINP take after nomination?", a: "After OINP nomination, Express Entry candidates typically receive an ITA within weeks and complete PR processing in ~6 months. Non-EE base streams take 12–18 months for nomination + PR." },
    ],
  },
  {
    slug: "british-columbia",
    code: "BC",
    flag: "🌲",
    name: "British Columbia",
    program: "BC PNP (BC Provincial Nominee Program)",
    metaTitle: "BC PNP 2026 — Skills Immigration Streams & Tech Pilot | 4 Aces Visa",
    metaDescription: "BC PNP guide for 2026: Skills Immigration, Express Entry BC, Tech, Healthcare and International Graduate streams. Vancouver job market and PR pathways.",
    intro: "British Columbia targets tech, healthcare, childcare and skilled trades through the BC PNP. Vancouver's tech sector and healthcare shortages across the province drive consistent invitations through both Skills Immigration and Express Entry BC.",
    quickAnswer: "BC PNP runs Skills Immigration (Skilled Worker, Healthcare, International Graduate, Entry Level/Semi-Skilled) and Express Entry BC. Targeted draws for tech, healthcare and childcare invite candidates with SIRS scores as low as 60 — well below open-stream cutoffs of 110+.",
    topNocs: ["Software Developers (21232)", "Registered Nurses (31301)", "Early Childhood Educators (42202)", "Civil Engineers (21300)", "Construction Trades"],
    topCities: [
      { slug: "vancouver", name: "Vancouver" },
      { slug: "surrey", name: "Surrey" },
      { slug: "burnaby", name: "Burnaby" },
      { slug: "abbotsford", name: "Abbotsford" },
      { slug: "nanaimo", name: "Nanaimo" },
    ],
    streams: [
      { name: "Skills Immigration — Skilled Worker", desc: "TEER 0/1/2/3 with a BC job offer.", cutoff: "SIRS 110+ (general)" },
      { name: "Skills Immigration — Healthcare", desc: "Targeted invitations for nurses, allied health and physicians.", cutoff: "SIRS 60+" },
      { name: "Skills Immigration — International Graduate", desc: "Recent grads of BC institutions with skilled job offers.", cutoff: "SIRS 100+" },
      { name: "Skills Immigration — Tech", desc: "29 priority tech occupations. Frequent targeted draws.", cutoff: "SIRS 100+" },
      { name: "Skills Immigration — Childcare", desc: "Early childhood educators and ECE assistants.", cutoff: "SIRS 60+" },
      { name: "Express Entry BC", desc: "Aligned with federal EE for faster processing once nominated.", cutoff: "EE profile required" },
    ],
    officialUrl: "https://www.welcomebc.ca/immigrate-to-b-c/about-the-bc-pnp",
    faqs: [
      { q: "What's the easiest BC PNP stream to qualify for?", a: "Healthcare and Childcare targeted draws have the lowest SIRS cutoffs (~60), making them the easiest if you hold an eligible NOC. Tech and International Graduate streams also see frequent invitations." },
      { q: "Do I need a job offer for BC PNP?", a: "Yes, all Skills Immigration streams except some recent-graduate categories require a full-time, permanent job offer from a BC employer in an eligible NOC." },
      { q: "How fast is BC PNP processing?", a: "BC PNP nomination typically takes 2–3 months. Combined with Express Entry BC, total time to PR is usually 8–12 months." },
    ],
  },
  {
    slug: "alberta",
    code: "AB",
    flag: "🛢️",
    name: "Alberta",
    program: "Alberta Advantage Immigration Program (AAIP)",
    metaTitle: "Alberta PNP 2026 — AAIP Streams & Tech Pathway | 4 Aces Visa",
    metaDescription: "AAIP 2026 guide: Alberta Express Entry, Opportunity Stream, Rural Renewal, Tourism & Hospitality, Tech Pathway. Calgary and Edmonton job markets.",
    intro: "Alberta's economy spans energy, tech, agriculture and healthcare. AAIP aggressively targets tech workers (Tech Pathway) and rural employers (Rural Renewal Stream) — often with lower CRS cutoffs than other major provinces.",
    quickAnswer: "Alberta runs the Alberta Advantage Immigration Program (AAIP) with Express Entry-aligned streams plus the Opportunity Stream, Rural Renewal, Tourism & Hospitality, and the Tech Pathway. Recent EE-aligned draws have invited candidates with CRS as low as 300, far below federal cutoffs.",
    topNocs: ["Software Engineers (21231)", "Petroleum Engineers (21330)", "Registered Nurses (31301)", "Truck Drivers (73300)", "Financial Auditors (11100)"],
    topCities: [
      { slug: "calgary", name: "Calgary" },
      { slug: "edmonton", name: "Edmonton" },
    ],
    streams: [
      { name: "Alberta Express Entry Stream", desc: "Drawn from federal EE pool. Targets occupations supporting Alberta's economic development.", cutoff: "CRS 300+ (recent draws)" },
      { name: "Alberta Opportunity Stream", desc: "Temporary foreign workers already in Alberta with eligible work experience.", cutoff: "Job offer + Alberta work" },
      { name: "Rural Renewal Stream", desc: "Employers in 18 designated rural communities can endorse candidates.", cutoff: "Community endorsement" },
      { name: "Tourism & Hospitality Stream", desc: "TEER 4/5 hospitality workers with Alberta job offers.", cutoff: "Hospitality job offer" },
      { name: "Tech Pathway", desc: "Accelerated EE stream for 38 tech occupations.", cutoff: "EE profile + tech NOC" },
      { name: "Rural Entrepreneur / Graduate Entrepreneur", desc: "Business immigration streams for entrepreneurs and post-grads launching ventures in Alberta.", cutoff: "Business plan + investment" },
    ],
    officialUrl: "https://www.alberta.ca/alberta-advantage-immigration-program",
    faqs: [
      { q: "Why are Alberta's CRS cutoffs so low?", a: "Alberta's EE-aligned draws prioritize specific occupations supporting the province's economic strategy. When you match a target occupation, AAIP can invite at CRS scores well below federal cutoffs — sometimes as low as 300." },
      { q: "What is the Tech Pathway?", a: "An accelerated AAIP stream for 38 priority tech NOCs (software, data, cybersecurity, electrical engineering, etc.). EE profile required, but processing is faster than the standard Alberta Express Entry stream." },
      { q: "Can I move to a small Alberta town for PR?", a: "Yes — through the Rural Renewal Stream. Designated rural communities (e.g., Brooks, Drumheller, Camrose) can endorse candidates for AAIP nomination based on local employer needs." },
    ],
  },
];