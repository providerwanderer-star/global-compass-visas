/**
 * Programmatic settlement / "land-and-settle" data.
 * Each record drives a unique route: /settle-in-canada/:slug
 */

export interface SettlementGuide {
  slug: string;
  topic: string;
  emoji: string;
  shortAnswer: string; // 40-60 words for AEO
  whoFor: string;
  whoNotFor: string;
  steps: { title: string; detail: string }[];
  documentsNeeded: string[];
  cost: string;
  timeline: string;
  proTips: string[];
  faqs: { q: string; a: string }[];
  relatedSlugs: string[];
  metaTitle: string;
  metaDescription: string;
}

export const settlementGuides: SettlementGuide[] = [
  {
    slug: "get-sin-number",
    topic: "Get a SIN (Social Insurance Number)",
    emoji: "🆔",
    shortAnswer:
      "A SIN is mandatory to work, open most bank accounts and access government benefits in Canada. As a new permanent resident or work-permit holder, you can apply free of charge in person at any Service Canada office on landing day, online via My Service Canada Account, or by mail. Most applicants receive their SIN within 15 minutes in person.",
    whoFor: "All new permanent residents, work-permit holders, study-permit holders with on/off-campus work permission, and refugees.",
    whoNotFor: "Visitors and tourists are not eligible for a SIN.",
    steps: [
      { title: "Gather your primary identity document", detail: "PR card, COPR, work permit, study permit (with work authorization) or refugee protection claim document. Originals only — no copies." },
      { title: "Visit a Service Canada office", detail: "Walk-in service is available at most offices. No appointment needed. Offices are listed at servicecanada.gc.ca." },
      { title: "Or apply online", detail: "Use My Service Canada Account if you have a valid Canadian government-issued photo ID. Processing takes 10–20 business days." },
      { title: "Receive your SIN immediately", detail: "Service Canada provides your SIN on a paper confirmation letter. The plastic SIN card was discontinued in 2014." },
      { title: "Memorize and store securely", detail: "Never carry your SIN in your wallet. Memorize the 9-digit number and store the letter in a safe place at home." },
    ],
    documentsNeeded: [
      "Original PR card OR COPR (Confirmation of Permanent Residence)",
      "Original work permit or study permit (if temporary resident)",
      "Secondary ID (driver's licence, passport, or provincial photo ID)",
      "Proof of name change documents (if name differs from primary doc)",
    ],
    cost: "Free (no government fee)",
    timeline: "15 minutes in person · 10–20 business days online or by mail",
    proTips: [
      "Apply on landing day at the airport — many international airports (Toronto YYZ, Vancouver YVR, Calgary YYC) have Service Canada kiosks.",
      "If your SIN starts with '9', it's temporary (work-permit holders) — you must update it once you receive PR.",
      "Never share your SIN over phone, email, or with employers before you start work.",
    ],
    faqs: [
      { q: "Can I apply for a SIN before landing in Canada?", a: "No. You must be physically in Canada with valid status documents to apply for a SIN. Apply on landing day or shortly after." },
      { q: "What if I lose my SIN letter?", a: "Service Canada can issue a confirmation letter for free. You don't get a new SIN — your number stays the same for life." },
      { q: "Do I need a SIN to open a bank account?", a: "Most banks request it for tax-reporting purposes (interest income), but legally you can open a chequing account without one. RRSP and TFSA accounts require a SIN." },
    ],
    relatedSlugs: ["open-bank-account", "apply-health-card", "get-driver-licence"],
    metaTitle: "How to Get a SIN Number in Canada (2026) — New PR Guide | 4 Aces Visa",
    metaDescription: "Get your Social Insurance Number (SIN) on landing day. Free, takes 15 minutes at any Service Canada office. Required to work, open bank accounts and file taxes in Canada.",
  },
  {
    slug: "open-bank-account",
    topic: "Open a Canadian Bank Account",
    emoji: "🏦",
    shortAnswer:
      "Most major Canadian banks (RBC, TD, Scotiabank, BMO, CIBC) offer free newcomer banking packages — no monthly fees for the first 12 months, free international wire transfers, and bonuses up to CAD 500. You can pre-open an account before landing through programs like RBC Newcomer Advantage or Scotiabank StartRight.",
    whoFor: "All new permanent residents, work-permit holders and international students.",
    whoNotFor: "Visitors typically cannot open standard chequing accounts.",
    steps: [
      { title: "Pre-open online before arrival", detail: "RBC, Scotiabank, TD, BMO and CIBC all offer pre-arrival accounts. Set up online and deposit funds before you fly." },
      { title: "Visit a branch within 90 days of landing", detail: "Bring your PR card/COPR, passport, secondary ID, and proof of Canadian address. Activate your debit card." },
      { title: "Apply for a credit card with zero credit history", detail: "Most newcomer packages include a no-credit-check credit card with a CAD 1,000–2,000 limit. Use it monthly and pay in full to build credit fast." },
      { title: "Set up direct deposit and pre-authorized payments", detail: "Provide your void cheque (or pre-filled form from online banking) to your employer and utility providers." },
      { title: "Open a TFSA and RRSP", detail: "Newcomers gain TFSA contribution room ($7,000 for 2024) starting the year they become a Canadian tax resident. RRSP room accrues from earned income reported on your first tax return." },
    ],
    documentsNeeded: [
      "PR card OR COPR (or work/study permit if temporary)",
      "Passport",
      "Secondary photo ID",
      "Proof of Canadian address (utility bill, lease agreement, or letter from landlord)",
      "SIN (recommended but not strictly required for chequing)",
    ],
    cost: "Free for first 12 months (most newcomer packages)",
    timeline: "30–60 minutes at branch · same-day account activation",
    proTips: [
      "Compare newcomer bonuses — Scotiabank StartRight, RBC Newcomer Advantage and CIBC Smart Account often offer CAD 300–500 cash bonus.",
      "Get a no-fee credit card immediately to start building Canadian credit history (essential for renting, mortgages, car loans).",
      "Use Wise (formerly TransferWise) or Remitly for cheaper international transfers vs bank wire fees.",
    ],
    faqs: [
      { q: "Can I open a Canadian bank account before landing?", a: "Yes. RBC, Scotiabank, TD, BMO and CIBC all offer pre-arrival programs. You can deposit funds online before you fly, then activate the account at a branch within 90 days of landing." },
      { q: "Which is the best bank for newcomers?", a: "All Big 5 banks offer comparable newcomer packages. Scotiabank StartRight and RBC Newcomer Advantage are popular for international students; TD and CIBC have larger branch networks." },
      { q: "How long does it take to build Canadian credit?", a: "With a secured or newcomer credit card used responsibly, you can build a basic credit score (650+) in 6–12 months. Excellent credit (750+) typically takes 2–3 years." },
    ],
    relatedSlugs: ["get-sin-number", "rent-apartment", "build-credit-history"],
    metaTitle: "Open a Canadian Bank Account as a Newcomer (2026) — Free Guide | 4 Aces Visa",
    metaDescription: "Step-by-step: open a Canadian bank account before or after arrival. Compare newcomer packages from RBC, TD, Scotiabank, BMO, CIBC — free banking for 12 months + bonuses up to $500.",
  },
  {
    slug: "apply-health-card",
    topic: "Apply for a Provincial Health Card",
    emoji: "🏥",
    shortAnswer:
      "Universal public healthcare in Canada is administered by each province, so you must apply for a provincial health card after landing. Most provinces issue cards in 10–60 days. Ontario, BC, and Quebec impose a 3-month waiting period for new residents — buy private health insurance to cover this gap.",
    whoFor: "All new permanent residents and work-permit holders eligible for provincial coverage (eligibility varies by province).",
    whoNotFor: "Visitors and most international students must rely on private/university health insurance.",
    steps: [
      { title: "Confirm provincial eligibility", detail: "Most provinces cover PRs immediately. Ontario (OHIP), BC (MSP), and Quebec (RAMQ) impose a 3-month waiting period." },
      { title: "Buy private insurance for the waiting period", detail: "Manulife, Sun Life, Allianz and Cedarwood offer 3-month newcomer plans for CAD 100–300/month. Critical for Ontario, BC, Quebec." },
      { title: "Apply at a ServiceOntario / Service BC / RAMQ office", detail: "Bring PR card/COPR, secondary ID, and proof of address. Some provinces (e.g. Alberta, Manitoba) allow online applications." },
      { title: "Receive your health card by mail", detail: "Cards arrive in 10–60 days depending on province. You'll get a temporary confirmation letter immediately for emergency use." },
      { title: "Register with a family doctor", detail: "Use Health Care Connect (Ontario), Pathways BC, or local walk-in clinics. Family-doctor wait lists can be 1–3 years in major cities." },
    ],
    documentsNeeded: [
      "PR card OR COPR",
      "Secondary photo ID (passport or driver's licence)",
      "Proof of provincial residency (lease, utility bill, or bank statement showing Canadian address)",
    ],
    cost: "Free (publicly funded). Private bridge insurance: CAD 100–300/month.",
    timeline: "10–60 days for card delivery · 3 months waiting period in ON, BC, QC",
    proTips: [
      "Buy travel/visitor insurance BEFORE you board your flight to Canada — it covers your first day of emergencies.",
      "Use walk-in clinics or virtual care (Maple, Telus Health) instead of waiting for a family doctor.",
      "Dental, vision, prescriptions and physiotherapy are NOT covered by provincial plans — get supplemental insurance through your employer.",
    ],
    faqs: [
      { q: "Is healthcare free in Canada?", a: "Hospital visits and most doctor visits are free under provincial plans. Prescriptions, dental, vision, mental health and physiotherapy are NOT covered — get supplemental insurance via employer or private plan." },
      { q: "What's the waiting period for OHIP?", a: "Ontario imposes a 3-month wait from your date of arrival. BC's MSP and Quebec's RAMQ have similar waits. Buy private insurance to cover this gap." },
      { q: "Can I see a specialist directly?", a: "No. You need a referral from your family doctor or walk-in clinic to see a specialist. Wait times for specialists can be weeks to months depending on urgency." },
    ],
    relatedSlugs: ["get-sin-number", "find-family-doctor", "get-driver-licence"],
    metaTitle: "How to Apply for a Provincial Health Card in Canada (2026) | 4 Aces Visa",
    metaDescription: "Apply for OHIP, BC MSP, RAMQ and other provincial health cards. Step-by-step process, 3-month waiting period in ON/BC/QC, private insurance options for newcomers.",
  },
  {
    slug: "rent-apartment",
    topic: "Rent an Apartment in Canada",
    emoji: "🏠",
    shortAnswer:
      "Rental markets in Toronto, Vancouver, and Montreal are highly competitive — landlords typically require credit history, employment letters, references, and 1–2 months' rent upfront. Newcomers can overcome zero Canadian credit by paying 6–12 months upfront, providing a Canadian co-signer, or using guarantor services like SingleKey.",
    whoFor: "All newcomers needing housing within their first 30–90 days in Canada.",
    whoNotFor: "Those purchasing property directly should consult our buy-property guide instead.",
    steps: [
      { title: "Book temporary housing for first 2–4 weeks", detail: "Use Airbnb, FurnishedFinder or hotel for landing accommodation. Typical cost: CAD 1,500–3,500/month for a 1-bedroom in major cities." },
      { title: "Search rental listings", detail: "Realtor.ca (most reliable), Rentals.ca, Padmapper, Kijiji, Facebook Marketplace. Avoid 'too good to be true' listings — rental scams are common." },
      { title: "Prepare your rental application package", detail: "Photo ID, employment letter, recent pay stubs, bank statements, references (Canadian preferred), credit report (if available), and a cover letter." },
      { title: "Overcome zero credit history", detail: "Offer 6–12 months rent upfront, provide a Canadian co-signer, or use SingleKey/RentBird guarantor services (paid). Many landlords accept first + last month's rent + 6-month upfront for newcomers." },
      { title: "Sign your lease and inspect on move-in", detail: "Standard lease term: 12 months. Use the Provincial Standard Lease form (Ontario, BC). Document all damage with photos before signing." },
    ],
    documentsNeeded: [
      "Photo ID (PR card, passport, driver's licence)",
      "Employment letter (or proof of remote income / savings if not employed)",
      "3 months of bank statements",
      "References (employer, previous landlord — overseas references are accepted)",
      "Credit report (Equifax/TransUnion) — optional for newcomers",
    ],
    cost: "First + last month's rent upfront (most provinces) · CAD 1,500–4,000/month for 1-bedroom in major cities",
    timeline: "2–6 weeks to find and secure a rental",
    proTips: [
      "Avoid Cash transfers and Bitcoin requests — these are nearly always scams. Pay only via certified cheque, Interac e-Transfer, or pre-authorized debit.",
      "Check the Tribunal Administratif du Logement (Quebec) or Landlord and Tenant Board (Ontario) for landlord history before signing.",
      "Tenant insurance (CAD 20–40/month) is often required by landlords and protects your belongings.",
    ],
    faqs: [
      { q: "How much rent should I budget?", a: "Toronto/Vancouver: CAD 2,200–3,500 for a 1-bedroom. Montreal/Calgary: CAD 1,200–1,800. Smaller cities: CAD 900–1,500. Budget 30% of gross income for housing." },
      { q: "Can I rent without Canadian credit history?", a: "Yes. Offer 6–12 months upfront, provide a Canadian co-signer, or use guarantor services. Many landlords specifically rent to newcomers." },
      { q: "Are utilities included in rent?", a: "Sometimes. Always confirm what's included. In Quebec, heat is often included; in Ontario, hydro/water are usually separate. Budget CAD 100–250/month for utilities if not included." },
    ],
    relatedSlugs: ["open-bank-account", "build-credit-history", "find-family-doctor"],
    metaTitle: "How to Rent an Apartment in Canada as a Newcomer (2026) | 4 Aces Visa",
    metaDescription: "Rent your first apartment in Canada with no credit history. Step-by-step guide to rental applications, security deposits, lease terms, and avoiding scams in Toronto, Vancouver, Montreal.",
  },
  {
    slug: "enroll-children-school",
    topic: "Enroll Your Children in Canadian School",
    emoji: "🎒",
    shortAnswer:
      "Public schools (K–12) are free for permanent residents and most work-permit holders' children. Register at your local school board within 1–2 weeks of arrival — bring proof of address, child's birth certificate, immunization records, and PR documents. School year runs September to June; enroll mid-year if needed.",
    whoFor: "Permanent residents, work-permit holders, and refugees with school-age children (ages 4–18).",
    whoNotFor: "Children of visitors must enrol in private schools (CAD 12,000–35,000/year per child).",
    steps: [
      { title: "Locate your local school board", detail: "Search '[your city] school board' — TDSB (Toronto), VSB (Vancouver), CSSDM (Montreal), CBE (Calgary), etc. School assignment is based on home address." },
      { title: "Gather documentation", detail: "Child's birth certificate, immunization records, previous school transcripts (translated to English/French if needed), PR card/work permit, proof of address." },
      { title: "Visit the welcome/intake centre", detail: "Most boards run dedicated newcomer intake centres. They handle assessments, language placement (ESL), and grade placement." },
      { title: "Complete language assessment", detail: "If your child's first language isn't English/French, they'll be placed in ELL (English Language Learner) or French immersion programs to support transition." },
      { title: "Register and receive school assignment", detail: "Within 1–2 weeks, you'll receive your child's school assignment with start date, bus information, and supply lists." },
    ],
    documentsNeeded: [
      "Child's original birth certificate (with translation if not in English/French)",
      "Immunization records (translated)",
      "Previous school transcripts and report cards",
      "Parent's PR card / work permit / study permit",
      "Proof of Canadian address (lease, utility bill)",
    ],
    cost: "Free for K-12 public schools · CAD 12,000–35,000/year for private schools",
    timeline: "1–2 weeks from intake centre visit to first school day",
    proTips: [
      "Public schools are excellent in most provinces — international rankings (PISA) consistently place Canada in the top 10.",
      "French immersion is free and produces bilingual graduates — highly recommended in Ontario, Alberta and BC.",
      "Childcare for under-5s is heavily subsidized (Quebec: $9.10/day; nationwide $10/day plan in progress) but waitlists are long — apply 6–12 months in advance.",
    ],
    faqs: [
      { q: "Is public school really free in Canada?", a: "Yes — K-12 public education is free for PRs and most work-permit holders' children. You only pay for supplies, field trips, and lunch. International student fees apply to children of visitors only." },
      { q: "What's the difference between English and French immersion?", a: "Standard English programs are taught in English with French as a second language. French immersion teaches all subjects in French until grade 3-6, producing fully bilingual graduates. Both are free." },
      { q: "When does the Canadian school year start?", a: "Early September (after Labour Day) to late June. Some provinces start late August. You can enrol mid-year — schools accommodate newcomers year-round." },
    ],
    relatedSlugs: ["rent-apartment", "apply-health-card", "find-childcare"],
    metaTitle: "Enroll Your Children in Canadian Public School (2026) — Newcomer Guide | 4 Aces Visa",
    metaDescription: "Free K-12 public schooling for PRs and work-permit holders. Step-by-step enrollment, document requirements, ESL programs and French immersion options across Canada.",
  },
  {
    slug: "get-driver-licence",
    topic: "Get a Canadian Driver's Licence",
    emoji: "🚗",
    shortAnswer:
      "Most provinces accept foreign driver's licences for 60–90 days after landing. To get a permanent Canadian licence, exchange your foreign licence (some countries) or take written + road tests. Provinces with reciprocal agreements (UK, Germany, Japan, Australia, USA) allow direct exchange. Others must take all tests.",
    whoFor: "All new residents who plan to drive in Canada.",
    whoNotFor: "Toronto/Montreal/Vancouver downtown residents may not need a car — public transit is excellent.",
    steps: [
      { title: "Drive on your foreign licence for 60–90 days", detail: "Most provinces let you drive on a valid foreign licence (with International Driving Permit if not in English/French) for 60–90 days from arrival." },
      { title: "Check reciprocal agreements", detail: "Ontario, Alberta, and BC have full or partial exchange agreements with the UK, Germany, France, Japan, South Korea, Australia, NZ, USA and Switzerland. Other countries require full testing." },
      { title: "Book your knowledge (written) test", detail: "Pass at a ServiceOntario / Service BC / SAAQ office. Cost CAD 16–25. Study from the official driver's handbook." },
      { title: "Practice and book your road test", detail: "Required if no reciprocal agreement. Wait times for road tests can be 2–6 months in major cities — book immediately." },
      { title: "Get auto insurance", detail: "Mandatory in all provinces. Newcomer rates can be CAD 200–400/month due to no Canadian driving history. Provide letter from foreign insurer to get up to 6 years of credited experience." },
    ],
    documentsNeeded: [
      "Foreign driver's licence (original)",
      "PR card OR work permit",
      "Secondary photo ID (passport)",
      "Proof of Canadian address",
      "Letter from foreign insurer documenting years of safe driving (for insurance discount)",
    ],
    cost: "CAD 80–200 (licence + tests) · CAD 200–400/month auto insurance",
    timeline: "Same-day exchange (reciprocal countries) · 2–6 months for full testing",
    proTips: [
      "Bring a notarized letter from your foreign insurer documenting your driving history — this can save thousands on Canadian insurance.",
      "Use insurance brokers (TD Insurance, Allstate, Belairdirect) — they shop multiple providers and find newcomer-friendly rates.",
      "G2 (Ontario), N (BC), Class 5 GDL (Alberta) — graduated licensing systems impose restrictions for new drivers regardless of foreign experience.",
    ],
    faqs: [
      { q: "Can I exchange my foreign licence for a Canadian one?", a: "If your country has a reciprocal agreement (UK, Germany, France, Japan, South Korea, Australia, NZ, Switzerland, and USA states), yes. Otherwise, you must take written + road tests." },
      { q: "How much is car insurance in Canada?", a: "Newcomers without Canadian driving history typically pay CAD 200–400/month for full coverage. Providing a foreign insurance letter can reduce this to CAD 100–200/month." },
      { q: "Do I need a car in Canada?", a: "Toronto, Montreal and Vancouver have excellent public transit — many residents don't own cars. Suburbs and smaller cities require a car. Calgary, Edmonton and most Atlantic cities are car-dependent." },
    ],
    relatedSlugs: ["get-sin-number", "open-bank-account", "rent-apartment"],
    metaTitle: "Get a Canadian Driver's Licence as a Newcomer (2026) | 4 Aces Visa",
    metaDescription: "Exchange your foreign licence or take Canadian driving tests. Reciprocal agreements with UK, Germany, USA, Japan and more. Insurance tips, road-test prep, and provincial requirements.",
  },
];

export const findSettlementGuide = (slug: string) =>
  settlementGuides.find((g) => g.slug === slug);