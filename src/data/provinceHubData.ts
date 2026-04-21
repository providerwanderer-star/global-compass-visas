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
  {
    slug: "saskatchewan",
    code: "SK",
    flag: "🌾",
    name: "Saskatchewan",
    program: "Saskatchewan Immigrant Nominee Program (SINP)",
    metaTitle: "Saskatchewan PNP 2026 — SINP Streams & Occupation List | 4 Aces Visa",
    metaDescription: "SINP 2026 guide: International Skilled Worker (EE & Occupations In-Demand), Saskatchewan Experience, Entrepreneur. Latest cutoffs and how to qualify.",
    intro: "Saskatchewan's SINP is one of Canada's most accessible PNPs — no job offer needed for the Express Entry and Occupations In-Demand sub-categories if your NOC is on the in-demand list.",
    quickAnswer: "SINP runs International Skilled Worker (Express Entry & Occupations In-Demand sub-categories — both job-offer-free), Saskatchewan Experience (for those already working in SK), and Entrepreneur. Recent EILMI cutoffs have ranged from 67 to 82 SINP points.",
    topNocs: ["Software Developers (21232)", "Registered Nurses (31301)", "Welders (72106)", "Truck Drivers (73300)", "Accountants (11100)"],
    topCities: [
      { slug: "saskatoon", name: "Saskatoon" },
      { slug: "regina", name: "Regina" },
    ],
    streams: [
      { name: "International Skilled Worker — Express Entry", desc: "Active EE profile + NOC on SK in-demand list. No job offer required.", cutoff: "SINP 67+" },
      { name: "International Skilled Worker — Occupations In-Demand", desc: "No EE profile needed. NOC must be on SK in-demand list.", cutoff: "SINP 67+" },
      { name: "International Skilled Worker — Employment Offer", desc: "Job offer from a Saskatchewan employer.", cutoff: "Job offer required" },
      { name: "Saskatchewan Experience", desc: "For those already working in SK on a valid work permit (6+ months).", cutoff: "SK work experience" },
      { name: "Entrepreneur & Farm Owner/Operator", desc: "Business immigration streams with investment requirements.", cutoff: "Business plan + investment" },
    ],
    officialUrl: "https://www.saskatchewan.ca/residents/moving-to-saskatchewan/live-in-saskatchewan/by-immigrating/saskatchewan-immigrant-nominee-program",
    faqs: [
      { q: "Can I get SINP without a job offer?", a: "Yes — both International Skilled Worker — Express Entry and Occupations In-Demand sub-categories are job-offer-free. Your NOC must be on Saskatchewan's in-demand occupation list and you need 60+ SINP points." },
      { q: "How are SINP points calculated?", a: "Out of 100, based on age, education, language (IELTS/CELPIP), work experience and adaptability. Most candidates need 67+ to receive an invitation, though cutoffs have risen recently." },
    ],
  },
  {
    slug: "manitoba",
    code: "MB",
    flag: "🌻",
    name: "Manitoba",
    program: "Manitoba Provincial Nominee Program (MPNP)",
    metaTitle: "Manitoba PNP 2026 — MPNP Skilled Worker & Business Streams | 4 Aces Visa",
    metaDescription: "MPNP 2026: Skilled Worker in Manitoba, Skilled Worker Overseas, International Education, Business Investor. Manitoba's connection-based PNP.",
    intro: "Manitoba's MPNP heavily weights candidates with a 'Manitoba connection' — family, prior work or study in MB, or an Invitation to Apply through the Strategic Recruitment Initiative.",
    quickAnswer: "MPNP has Skilled Worker in Manitoba, Skilled Worker Overseas (requires MB connection or strategic invitation), International Education Stream, and Business Investor Stream. Recent EE-aligned draws have invited candidates with MPNP scores of 600+.",
    topNocs: ["Truck Drivers (73300)", "Registered Nurses (31301)", "Software Developers (21232)", "Cooks (63200)", "Welders (72106)"],
    topCities: [
      { slug: "winnipeg", name: "Winnipeg" },
    ],
    streams: [
      { name: "Skilled Worker in Manitoba", desc: "For temporary foreign workers and international graduates already in MB with a permanent job offer.", cutoff: "MB work + job offer" },
      { name: "Skilled Worker Overseas", desc: "Requires established MB connection (family, prior study/work) OR Strategic Recruitment invitation.", cutoff: "MPNP 60+ / strategic invite" },
      { name: "International Education Stream", desc: "MB grads in in-demand careers, internship pathway, or graduate entrepreneur.", cutoff: "MB graduation + criteria" },
      { name: "Business Investor Stream", desc: "Entrepreneur and Farm Investor pathways for business owners.", cutoff: "Investment + net worth" },
    ],
    officialUrl: "https://immigratemanitoba.com/",
    faqs: [
      { q: "What counts as a Manitoba connection?", a: "Close family in MB, previous work or study in Manitoba (6+ months), or being invited under the Strategic Recruitment Initiative based on your in-demand skills." },
      { q: "Is MPNP good without family in Manitoba?", a: "Yes, but harder. Without family, you typically need a job offer (Skilled Worker in MB), MB graduation (IES), prior MB work/study, or a Strategic Recruitment Initiative invitation." },
    ],
  },
  {
    slug: "quebec",
    code: "QC",
    flag: "⚜️",
    name: "Quebec",
    program: "Quebec Skilled Worker Program (QSWP / Arrima)",
    metaTitle: "Quebec Immigration 2026 — QSWP, PEQ & Arrima Pathways | 4 Aces Visa",
    metaDescription: "Quebec PR pathways: Quebec Skilled Worker (Arrima Expression of Interest), PEQ for graduates and workers, Quebec Experience. French language is critical.",
    intro: "Quebec runs its own immigration system separate from federal Express Entry. The Quebec Skilled Worker Program uses the Arrima Expression of Interest portal, and French is the dominant selection factor.",
    quickAnswer: "Quebec selects skilled immigrants through the Quebec Skilled Worker Program (Arrima EOI) and the Quebec Experience Program (PEQ — for grads of Quebec institutions and temporary workers). After Quebec issues a CSQ, federal PR processing follows. Strong French proficiency (B2+) is essentially required.",
    topNocs: ["Software Engineers (21231)", "Registered Nurses (31301)", "Civil Engineers (21300)", "Early Childhood Educators (42202)", "Welders (72106)"],
    topCities: [
      { slug: "montreal", name: "Montreal" },
      { slug: "quebec-city", name: "Quebec City" },
    ],
    streams: [
      { name: "Quebec Skilled Worker Program (PRTQ via Arrima)", desc: "EOI-based selection. Points for French (heavily weighted), education, work experience, age and Quebec validated job offer.", cutoff: "Arrima invitation rounds" },
      { name: "PEQ — Graduates", desc: "Grads of Quebec post-secondary diplomas with French B2+ (oral) can apply for CSQ.", cutoff: "Quebec diploma + French B2" },
      { name: "PEQ — Temporary Workers", desc: "Foreign workers with 24+ months of skilled Quebec work experience and French B2+.", cutoff: "24mo QC work + French B2" },
      { name: "Quebec Investor / Entrepreneur / Self-Employed", desc: "Business immigration streams (currently with periodic intake caps).", cutoff: "Net worth + investment" },
    ],
    officialUrl: "https://www.quebec.ca/en/immigration",
    faqs: [
      { q: "Can I immigrate to Quebec without French?", a: "Practically, no. Quebec's selection grid heavily weights French oral proficiency (B2 / NCLC 7+). Without French, your Arrima score is rarely competitive and PEQ is closed to you." },
      { q: "How is Quebec different from Express Entry?", a: "Quebec runs its own selection (Arrima/PEQ) and issues a CSQ (Quebec Selection Certificate). After CSQ, you apply for federal PR separately. Federal Express Entry does not apply to Quebec destinations." },
    ],
  },
  {
    slug: "nova-scotia",
    code: "NS",
    flag: "🦞",
    name: "Nova Scotia",
    program: "Nova Scotia Nominee Program (NSNP) + AIP",
    metaTitle: "Nova Scotia PNP 2026 — NSNP & Atlantic Immigration | 4 Aces Visa",
    metaDescription: "Nova Scotia PR pathways: Labour Market Priorities, Physician, Skilled Worker, Atlantic Immigration Program. Halifax job market and rural opportunities.",
    intro: "Nova Scotia uses the NSNP plus the Atlantic Immigration Program (AIP) to attract healthcare workers, skilled tradespeople and tech talent — particularly to Halifax and growing rural communities.",
    quickAnswer: "Nova Scotia runs Labour Market Priorities (EE-aligned, periodic invitations), Physician Stream, Skilled Worker (with NS job offer), International Graduates in Demand, and the federal-provincial Atlantic Immigration Program. Many AIP streams require only a designated employer job offer — no LMIA.",
    topNocs: ["Registered Nurses (31301)", "Physicians (31102)", "Software Developers (21232)", "Continuing Care Assistants (33102)", "Truck Drivers (73300)"],
    topCities: [
      { slug: "halifax", name: "Halifax" },
    ],
    streams: [
      { name: "Labour Market Priorities", desc: "Targeted EE-aligned invitations for in-demand occupations (healthcare, French speakers, early childhood educators).", cutoff: "EE profile + targeted draw" },
      { name: "Physician Stream", desc: "Family physicians and specialists with a job offer from NSHA / IWK.", cutoff: "Physician job offer" },
      { name: "Skilled Worker", desc: "Job offer from a NS employer (TEER 0–5 with conditions).", cutoff: "NS job offer" },
      { name: "International Graduates in Demand", desc: "Recent grads of NS institutions in early childhood education or nursing.", cutoff: "NS grad + eligible NOC" },
      { name: "Atlantic Immigration Program (AIP)", desc: "Federal-provincial stream. Requires job offer from a designated employer — no LMIA needed.", cutoff: "Designated employer offer" },
    ],
    officialUrl: "https://liveinnovascotia.com/",
    faqs: [
      { q: "Is the Atlantic Immigration Program easier than PNP?", a: "Often yes — AIP has no minimum CRS, doesn't require LMIA, and processing is generally fast (~6 months). The catch: you need a job offer from a designated Atlantic employer." },
      { q: "What's most in-demand in Nova Scotia?", a: "Healthcare (nurses, CCAs, physicians), early childhood educators, skilled trades, and tech roles in Halifax. Labour Market Priorities draws frequently target these NOCs." },
    ],
  },
  {
    slug: "new-brunswick",
    code: "NB",
    flag: "🌊",
    name: "New Brunswick",
    program: "New Brunswick Provincial Nominee Program (NBPNP) + AIP",
    metaTitle: "New Brunswick PNP 2026 — NBPNP & AIP Streams | 4 Aces Visa",
    metaDescription: "NBPNP 2026: Skilled Worker with Employer Support, Express Entry Labour Market Stream, Strategic Initiative (French), Atlantic Immigration Program.",
    intro: "New Brunswick is bilingual (English/French) and offers some of Atlantic Canada's most accessible PR pathways — especially for French speakers and candidates with NB job offers.",
    quickAnswer: "NBPNP includes Skilled Worker with Employer Support, Express Entry Labour Market Stream, NB Strategic Initiative (for French speakers), and Atlantic Immigration Program. French speakers with NB connection have particularly strong odds.",
    topNocs: ["Registered Nurses (31301)", "Truck Drivers (73300)", "Cooks (63200)", "Software Developers (21232)", "Personal Support Workers (33102)"],
    topCities: [
      { slug: "moncton", name: "Moncton" },
      { slug: "fredericton", name: "Fredericton" },
    ],
    streams: [
      { name: "Skilled Worker with Employer Support", desc: "Permanent full-time job offer from a NB employer.", cutoff: "NB job offer" },
      { name: "Express Entry Labour Market Stream", desc: "EE candidates with NB job offer (TEER 0/1/2/3).", cutoff: "EE profile + NB offer" },
      { name: "NB Strategic Initiative — Francophone", desc: "Targets French-speaking candidates with NB labour market connection.", cutoff: "French CLB 7+ + NB ties" },
      { name: "Atlantic Immigration Program", desc: "Designated NB employer job offer — no LMIA required.", cutoff: "Designated employer offer" },
      { name: "Business Immigration", desc: "Entrepreneurial Stream for those starting/buying a business in NB.", cutoff: "Investment + net worth" },
    ],
    officialUrl: "https://www.welcomenb.ca/",
    faqs: [
      { q: "Why is New Brunswick good for French speakers?", a: "NB is Canada's only officially bilingual province. The Strategic Initiative — Francophone stream invites French-speaking candidates with NB labour-market ties, often without requiring a high CRS or job offer." },
      { q: "Which NB cities have the most jobs?", a: "Moncton (services, transport, healthcare), Fredericton (tech, government, university) and Saint John (industrial, port, healthcare) lead NB hiring." },
    ],
  },
  {
    slug: "prince-edward-island",
    code: "PE",
    flag: "🥔",
    name: "Prince Edward Island",
    program: "PEI PNP + AIP",
    metaTitle: "PEI PNP 2026 — Express Entry, Labour Impact & AIP | 4 Aces Visa",
    metaDescription: "Prince Edward Island PNP guide: Express Entry, Labour Impact (Skilled Worker, Critical Worker, International Graduate), Business Impact and AIP.",
    intro: "Canada's smallest province has one of the most active per-capita PNPs. PEI runs monthly EOI draws across Express Entry and Labour Impact streams, with strong demand in healthcare, agriculture and tourism.",
    quickAnswer: "PEI PNP has Express Entry, Labour Impact (Skilled Worker, Critical Worker, International Graduate) and Business Impact (Work Permit Stream). PEI runs monthly draws and prioritizes candidates already working or studying in PEI.",
    topNocs: ["Registered Nurses (31301)", "Cooks (63200)", "Truck Drivers (73300)", "Continuing Care Assistants (33102)", "Software Developers (21232)"],
    topCities: [
      { slug: "charlottetown", name: "Charlottetown" },
    ],
    streams: [
      { name: "PEI Express Entry", desc: "EE profile + connection to PEI (job offer, work, study or family).", cutoff: "EE + PEI connection" },
      { name: "Labour Impact — Skilled Worker", desc: "TEER 0/1/2/3 job offer in PEI.", cutoff: "PEI job offer" },
      { name: "Labour Impact — Critical Worker", desc: "TEER 4/5 jobs (truck drivers, food service, customer service, housekeeping).", cutoff: "PEI offer + 6mo work" },
      { name: "Labour Impact — International Graduate", desc: "Recent grads of PEI institutions with PEI job offer.", cutoff: "PEI grad + offer" },
      { name: "Business Impact — Work Permit Stream", desc: "Entrepreneurs investing in a PEI business under work permit then PR.", cutoff: "Investment + net worth" },
      { name: "Atlantic Immigration Program", desc: "Designated PEI employer job offer — no LMIA required.", cutoff: "Designated employer offer" },
    ],
    officialUrl: "https://www.princeedwardisland.ca/en/topic/office-of-immigration",
    faqs: [
      { q: "Can I apply to PEI PNP from outside Canada?", a: "Yes, but PEI heavily prioritizes candidates already working or studying in the province. Without PEI experience or a PEI job offer, your odds in the EOI pool are limited." },
      { q: "How often does PEI draw?", a: "Roughly monthly. PEI publishes invitation rounds across EE and Labour Impact, typically issuing 50–200 invitations per draw." },
    ],
  },
  {
    slug: "newfoundland-and-labrador",
    code: "NL",
    flag: "🐟",
    name: "Newfoundland and Labrador",
    program: "NL PNP + AIP",
    metaTitle: "Newfoundland PNP 2026 — NLPNP & AIP Streams | 4 Aces Visa",
    metaDescription: "Newfoundland & Labrador PR pathways: Express Entry Skilled Worker, Skilled Worker, International Graduate, Priority Skills NL, AIP.",
    intro: "Newfoundland and Labrador focuses on healthcare, ocean tech, aquaculture and tourism. The Priority Skills NL stream targets specific in-demand professions, and AIP offers a fast LMIA-free pathway.",
    quickAnswer: "NLPNP has Express Entry Skilled Worker, Skilled Worker, International Graduate, International Entrepreneur, and Priority Skills NL (targeted at high-demand occupations). The Atlantic Immigration Program is also active in NL.",
    topNocs: ["Registered Nurses (31301)", "Physicians (31102)", "Aquaculture Technicians", "Truck Drivers (73300)", "Software Developers (21232)"],
    topCities: [
      { slug: "st-johns", name: "St. John's" },
    ],
    streams: [
      { name: "Express Entry Skilled Worker", desc: "EE candidate with a NL job offer (TEER 0/1/2/3).", cutoff: "EE + NL offer" },
      { name: "Skilled Worker", desc: "Permanent NL job offer for non-EE candidates.", cutoff: "NL job offer" },
      { name: "International Graduate", desc: "Recent NL grads with NL job offer in their field.", cutoff: "NL grad + offer" },
      { name: "Priority Skills NL", desc: "Targets aquaculture, healthcare, ocean tech and other in-demand sectors. No NL job offer needed.", cutoff: "In-demand profile" },
      { name: "International Entrepreneur / Graduate Entrepreneur", desc: "Business immigration streams for entrepreneurs and post-grads.", cutoff: "Business plan" },
      { name: "Atlantic Immigration Program", desc: "Designated NL employer job offer — no LMIA required.", cutoff: "Designated employer offer" },
    ],
    officialUrl: "https://www.gov.nl.ca/immigration/",
    faqs: [
      { q: "What is Priority Skills NL?", a: "A non-job-offer NLPNP stream that targets a curated list of high-demand professions — including healthcare, aquaculture, software development and ocean technology. Eligible candidates can be nominated without a NL job offer." },
      { q: "Is St. John's a good city for immigrants?", a: "Yes — it has the largest job market in NL (healthcare, ocean industries, tech, university), low cost of living vs. mainland cities, and a growing newcomer community." },
    ],
  },
];