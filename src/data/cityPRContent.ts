/**
 * PR-intent city content (Phase 6) — upgraded SEO/AEO city pages targeting
 * applicants actively planning Canada PR. Existing legacy city entries in
 * cityData.ts are NOT modified; this file only adds NEW cities, plus the
 * structured PR-focused content used by CityPage.tsx when `prContent` is
 * present on a city.
 */
import type { CityData } from "@/data/cityData";

export interface CityPRContent {
  whyMoving: string; // 2-3 sentence paragraph for "Why [City] Professionals Are Moving to Canada"
  topPathways: string; // Pathway recommendation paragraph
  expressEntryHow: string; // How EE works for this city
  topNocCodes: { code: string; title: string }[]; // 4-6 NOCs popular with this city
  cityProfile: string; // Indian: industries + popular provinces + diaspora. Canadian: temp→PR pathways.
  diasporaNote: string; // Where the city's diaspora is established in Canada
}

/**
 * AEO FAQ template. Returns the 5 PR-intent answer-first questions/answers.
 * Each answer leads with the direct answer in sentence 1, detail in sentence 2.
 */
export function buildAEOFAQs(
  city: string,
  bestPathwayProfession: string,
): { question: string; answer: string }[] {
  return [
    {
      question: `How can I apply for Canada PR from ${city} in 2026?`,
      answer: `You can apply for Canada PR from ${city} through three main pathways: Express Entry (federal skilled worker), Provincial Nominee Programs (PNP), and LMIA-backed work-permit-to-PR routes. Most ${city} applicants target a CRS score in the 430–510 range, with PNP nominations adding 600 points and LMIA job offers adding 50–200 points to qualify for an ITA.`,
    },
    {
      question: `What is the cost of Canada PR from ${city}?`,
      answer: `The total cost of Canada PR from ${city} is approximately ₹3–5 lakhs (CAD 2,500–5,000) per single applicant. This covers IRCC government fees (CAD 1,525), IELTS or CELPIP (₹16,000), WES credential evaluation (₹15,000), medical exam (₹6,000–10,000), police clearance, biometrics, and translation — proof of funds (CAD 14,690 for one applicant) is held in your account, not spent.`,
    },
    {
      question: `Which Canada immigration pathway is best for ${city} professionals?`,
      answer: `For ${city} professionals, ${bestPathwayProfession}. Federal Express Entry is fastest (6–8 months) when CRS hits the cut-off, while PNP streams in Ontario, BC, Saskatchewan, and Alberta give an alternate route when scores are 30–60 points below the federal draw line.`,
    },
    {
      question: `How long does Canada PR take from ${city}?`,
      answer: `Canada PR from ${city} typically takes 6–8 months from receiving an Invitation to Apply (ITA) under Express Entry. PNP-based applications take 12–18 months total (3–6 months for nomination + 6–11 months for the federal PR step), and Atlantic Immigration Program files complete in roughly 6 months after employer designation.`,
    },
    {
      question: `Is there an immigration consultant in ${city} for Canada PR?`,
      answer: `Yes — Garg Brothers serves ${city} residents with a free online assessment available at gargbrothers.ca/contact. Our RCIC-led team works remotely with ${city} clients across Express Entry, PNP, LMIA, and study-to-PR pathways, so no in-person visit is required.`,
    }
  ];
}

/**
 * For Canadian cities — the AEO FAQs are reframed for people already in
 * Canada on a temporary status seeking PR.
 */
export function buildAEOFAQsCanada(
  city: string,
  province: string,
  pnpStream: string,
): { question: string; answer: string }[] {
  return [
    {
      question: `How can I apply for Canada PR from ${city} in 2026?`,
      answer: `If you live in ${city} on a work or study permit, the fastest PR pathway is Express Entry — Canadian Experience Class (CEC), followed by the ${province} ${pnpStream}, and LMIA-supported job offers. Most CEC applicants from ${city} target a CRS in the 430–510 range and benefit from Canadian work experience that boosts CRS by 40–80 points.`,
    },
    {
      question: `What is the cost of Canada PR from ${city}?`,
      answer: `Total Canada PR cost from ${city} is approximately CAD 2,500–5,000 (₹3–5 lakhs equivalent) per applicant. This includes IRCC fees (CAD 1,525), language test (CELPIP/IELTS ~CAD 280), ECA if needed (CAD 250), medical (CAD 450), biometrics (CAD 85), and police clearances — proof of funds is waived for CEC candidates.`,
    },
    {
      question: `Which Canada immigration pathway is best for ${city} professionals?`,
      answer: `For ${city} professionals already in Canada, the Canadian Experience Class is the strongest pathway, especially after 1+ years of full-time skilled work in ${city}. The ${province} ${pnpStream} is the best backup for those just below the federal CRS cut-off, and an LMIA-supported job offer in ${city} adds 50–200 CRS points instantly.`,
    },
    {
      question: `How long does Canada PR take from ${city}?`,
      answer: `Express Entry CEC processing from ${city} takes 6–8 months from ITA to PR confirmation. ${province} PNP routes take 12–18 months total, while Atlantic Immigration Program (where applicable) files often finalize in 6 months once you have a designated-employer job offer.`,
    },
    {
      question: `Is there an immigration consultant in ${city} for Canada PR?`,
      answer: `Yes — Garg Brothers is an RCIC-led consultancy serving ${city} residents with a free online assessment at gargbrothers.ca/contact. We handle CEC, PNP, LMIA, work permit extensions, and study-to-PR transitions for clients across ${province} entirely online.`,
    }
  ];
}

// ----------------------------------------------------------------------------
// NEW INDIAN CITIES (PR-intent content)
// ----------------------------------------------------------------------------

interface NewCity {
  name: string;
  slug: string;
  region: string; // "State, Country"
  state: string;
  country: "india" | "canada";
  tagline: string; // unique 1-line tagline
  prContent: CityPRContent;
  bestProfession: string; // for FAQ template
  pnpStream?: string; // for Canadian cities
}

const NEW_INDIAN: NewCity[] = [
  {
    name: "Thane", slug: "thane", state: "Maharashtra", region: "Maharashtra, India", country: "india",
    tagline: "MMR-region IT and pharma professionals — fast-track to Ontario PNP and Express Entry.",
    bestProfession: "the IT, pharma, and BFSI sectors map directly to Canada's NOC 21232 (software developers), 31301 (registered nurses), and 11100 (accountants)",
    prContent: {
      whyMoving: "Thane is one of the Mumbai Metropolitan Region's fastest-growing professional hubs, home to large IT parks, pharma companies (Cipla, Glenmark), and BFSI back-offices. With Mumbai-level salaries but lower cost of living, Thane professionals consistently meet IRCC proof-of-funds requirements and score 460+ on CRS thanks to strong English exposure and global corporate experience.",
      topPathways: "The strongest Canada PR pathways for Thane applicants are Express Entry (Federal Skilled Worker and CEC), Ontario INP Human Capital Priorities for IT roles, and BC PNP Tech for software engineers. Many Thane families also pursue LMIA-supported job offers in the GTA where Marathi and Gujarati communities are well established.",
      expressEntryHow: "Express Entry from Thane works in three steps: WES evaluation of your degree, IELTS General (target CLB 9 → 7.5/7/7/7), and Express Entry profile creation. Most Thane software developers and pharma professionals enter the pool with CRS 460–500 and receive ITAs within 2–4 months from category-based draws (STEM, Healthcare).",
      topNocCodes: [
        { code: "21232", title: "Software developers and programmers" },
        { code: "21311", title: "Computer engineers" },
        { code: "21222", title: "Information systems specialists" },
        { code: "11100", title: "Financial auditors and accountants" },
        { code: "21100", title: "Physical science professionals (pharma R&D)" }
      ],
      cityProfile: "Thane's dominant industries are IT services, pharmaceuticals, BFSI, and chemicals. The most popular Canadian destinations for Thane immigrants are Toronto, Mississauga, and Brampton, followed by Calgary and Vancouver. Thane has a strong Marathi-speaking diaspora in the GTA and a long-standing Gujarati community in Toronto's Etobicoke and Markham areas.",
      diasporaNote: "Marathi Mandal of Toronto and the Maharashtra Cultural Association in the GTA offer strong settlement support for Thane families.",
    },
  },
  {
    name: "New Delhi", slug: "new-delhi", state: "Delhi NCR", region: "Delhi NCR, India", country: "india",
    tagline: "Capital city professionals with global corporate exposure — premier Express Entry candidates.",
    bestProfession: "embassies, multinational corporates, consulting (Big 4), and the central government workforce produce candidates with strong English (CLB 10+) and international exposure that map to NOC 11100 (accountants), 41401 (policy analysts), and 21221 (business systems analysts)",
    prContent: {
      whyMoving: "New Delhi professionals enjoy unmatched access to embassies, MNCs, the central government, and Big 4 consulting firms — building global exposure that translates to high CRS scores. The capital's IELTS-test-heavy culture means most applicants achieve CLB 10 (8/7/7/7), unlocking the maximum 136 language CRS points and category-based STEM/healthcare draws.",
      topPathways: "New Delhi's top Canada PR pathway is Express Entry — Federal Skilled Worker, with CRS scores typically in the 470–510 range. Strong secondary pathways include Ontario PNP Tech, Saskatchewan SINP Express Entry sub-category, and the Atlantic Immigration Program for healthcare and education professionals willing to settle in the Maritimes.",
      expressEntryHow: "From New Delhi, the Express Entry workflow is fast: VFS biometrics centres in Shivaji Stadium and Gurugram process applicants within days, WES evaluations finalize in 35 days, and IELTS slots are available weekly. Most Delhi applicants enter the EE pool within 60–75 days of starting and receive ITAs in 1–3 months under category-based draws.",
      topNocCodes: [
        { code: "11100", title: "Financial auditors and accountants" },
        { code: "21221", title: "Business systems specialists" },
        { code: "21232", title: "Software developers" },
        { code: "41401", title: "Economists and economic policy researchers" },
        { code: "31301", title: "Registered nurses" },
        { code: "10010", title: "Financial managers" }
      ],
      cityProfile: "New Delhi's dominant sectors are government, embassies, MNCs (consulting, IT, finance), media, and healthcare. The most popular Canadian destinations for Delhi immigrants are Toronto, Mississauga, Brampton, and Vancouver, with growing interest in Ottawa due to its government and bilingual workforce. The Punjabi-Hindi diaspora is well established across the GTA, Calgary, and Surrey.",
      diasporaNote: "Delhi-NCR families integrate quickly into Toronto's North York and Brampton's Springdale, where Hindi-speaking communities, gurdwaras, and South Asian grocery networks are extensive.",
    },
  },
  {
    name: "Ghaziabad", slug: "ghaziabad", state: "Uttar Pradesh", region: "Uttar Pradesh (NCR), India", country: "india",
    tagline: "NCR's affordable IT and engineering hub — strong PNP and Atlantic Immigration profiles.",
    bestProfession: "engineering, IT services, and manufacturing produce Express Entry-eligible candidates aligned to NOC 21300 (civil engineers), 21232 (software developers), and 22301 (mechanical engineering technologists)",
    prContent: {
      whyMoving: "Ghaziabad sits at the eastern edge of Delhi NCR with a strong base of IT, engineering, and manufacturing professionals at significantly lower cost of living than Delhi or Gurugram. This means Ghaziabad applicants often exceed CAD 14,690 proof-of-funds requirements easily and have stronger savings positions than peers in metro cities.",
      topPathways: "The top Canada PR pathways for Ghaziabad applicants are Express Entry FSW, Saskatchewan SINP (low-CRS-friendly), Manitoba MPNP Skilled Worker Overseas, and the Atlantic Immigration Program — all of which favour smaller-city professionals with strong settlement intent outside the GTA.",
      expressEntryHow: "Ghaziabad applicants typically use Delhi's VFS centres for biometrics and IELTS centres in Indirapuram, Vaishali, and Kaushambi. Express Entry from Ghaziabad takes 60–90 days from initial profile to pool entry; with CRS around 450–490, ITAs commonly arrive via PNP-aligned or category-based draws.",
      topNocCodes: [
        { code: "21300", title: "Civil engineers" },
        { code: "21232", title: "Software developers" },
        { code: "22301", title: "Mechanical engineering technologists" },
        { code: "21321", title: "Industrial engineers" },
        { code: "31301", title: "Registered nurses" }
      ],
      cityProfile: "Ghaziabad's economy is anchored in IT (Indirapuram, Crossings Republik), engineering services, manufacturing, and logistics. Ghaziabad immigrants typically settle in Brampton, Mississauga, Edmonton, and Winnipeg — provinces and cities where engineering and trades qualifications are in highest demand. UP's well-established North Indian community in the GTA provides strong family and job-network support.",
      diasporaNote: "UP-Bihar associations in Mississauga and Brampton run cultural and settlement events that ease the transition for Ghaziabad newcomers.",
    },
  },
  {
    name: "Mysore", slug: "mysore", state: "Karnataka", region: "Karnataka, India", country: "india",
    tagline: "Karnataka's heritage-tech city — Infosys-trained engineers and Express Entry-ready professionals.",
    bestProfession: "Infosys, Wipro, and L&T Mysore campuses produce thousands of trained software and engineering professionals who map directly to NOC 21232 (software developers) and 21311 (computer engineers)",
    prContent: {
      whyMoving: "Mysore is home to the world's largest Infosys training campus and major Wipro, L&T, and TCS engineering centres, producing thousands of Express Entry-ready software developers each year. Mysore's lower cost of living and strong English-medium education mean applicants enter the EE pool with savings well above proof-of-funds and CRS scores in the 460–500 range.",
      topPathways: "Top Canada PR pathways for Mysore are Express Entry (FSW + CEC), BC PNP Tech, Ontario INP Tech draws, and Alberta Advantage Immigration Program. STEM category-based draws have been the fastest route for Mysore software professionals since 2024.",
      expressEntryHow: "Mysore applicants use Bangalore's VFS centres (3-hour drive) for biometrics. The Express Entry workflow takes 75–100 days from start to pool, with ITAs in 1–4 months for software professionals via category-based draws. Many Mysore applicants also pursue the study-to-PR route via Canadian colleges.",
      topNocCodes: [
        { code: "21232", title: "Software developers" },
        { code: "21311", title: "Computer engineers" },
        { code: "21221", title: "Business systems specialists" },
        { code: "21222", title: "Information systems specialists" },
        { code: "20012", title: "Computer and information systems managers" }
      ],
      cityProfile: "Mysore's economy is anchored in IT services, engineering R&D, biotech, and tourism. Mysore immigrants gravitate to Toronto, Mississauga, Vancouver, and Calgary — cities with deep South Indian Kannada-speaking communities. The Karnataka Sangha in Toronto and the Kannada Sangha of Vancouver actively support newcomer settlement.",
      diasporaNote: "South Indian Kannada-speaking families are strongly established in Mississauga, Brampton, and Surrey, with active temples, cultural associations, and Kannada-medium weekend schools.",
    },
  },
  {
    name: "Mangalore", slug: "mangalore", state: "Karnataka", region: "Karnataka, India", country: "india",
    tagline: "Coastal Karnataka's nursing and IT corridor — top healthcare-stream Express Entry profiles.",
    bestProfession: "Mangalore's Manipal-network nursing and medical colleges produce IELTS-ready healthcare professionals who match NOC 31301 (registered nurses), 32101 (LPNs), and 31303 (paramedical occupations) under category-based Healthcare draws",
    prContent: {
      whyMoving: "Mangalore is one of India's leading nursing-export cities, with Manipal-affiliated colleges producing thousands of IELTS-ready RNs every year. Combined with a growing IT corridor and Konkani/Tulu communities' strong English fluency, Mangalore applicants are top targets for Canada's category-based Healthcare draws (CRS often as low as 422).",
      topPathways: "Top Canada PR pathways for Mangalore are Express Entry Healthcare category draws, Atlantic Immigration Program (AIP) for nurses, BC PNP Healthcare, and Saskatchewan SINP Health Workers. Mangalore nurses can land PR in 6–9 months when paired with a designated-employer offer through AIP.",
      expressEntryHow: "Mangalore applicants must complete NNAS (National Nursing Assessment Service) for nursing license recognition before Express Entry. Once NNAS is complete and IELTS Academic CLB 7+ is achieved, Express Entry pool entry typically occurs in 90–120 days, with Healthcare-category ITAs arriving within 1–3 months.",
      topNocCodes: [
        { code: "31301", title: "Registered nurses" },
        { code: "32101", title: "Licensed practical nurses" },
        { code: "31303", title: "Physiotherapists" },
        { code: "32109", title: "Other paramedical occupations" },
        { code: "21232", title: "Software developers" }
      ],
      cityProfile: "Mangalore's dominant industries are healthcare/nursing, IT services (Infosys, Cognizant Mangalore), banking (Karnataka Bank, Corporation Bank HQs), and education. Mangalore immigrants settle heavily in Toronto, Brampton, Mississauga, Halifax, and Saint John — wherever Catholic and Konkani communities are established. Many Mangalorean nurses move to the Atlantic provinces via AIP.",
      diasporaNote: "Mangalorean Konkani Catholic and GSB Hindu communities in Toronto, Mississauga, and Halifax provide strong cultural and settlement networks.",
    },
  },
  {
    name: "Madurai", slug: "madurai", state: "Tamil Nadu", region: "Tamil Nadu, India", country: "india",
    tagline: "Tamil Nadu's temple city — engineering and education professionals on the Canada track.",
    bestProfession: "Madurai's engineering colleges and software services firms produce candidates aligned to NOC 21300 (civil engineers), 21232 (software developers), and 41200 (university professors)",
    prContent: {
      whyMoving: "Madurai is a strong engineering-education hub with Thiagarajar College, KLN, and Madurai Kamaraj University producing thousands of degree-holders every year. Madurai professionals' English fluency, low cost of living, and strong family savings put them in a competitive position for Express Entry with CRS often in the 450–490 range.",
      topPathways: "Top Canada PR pathways for Madurai are Express Entry FSW, Saskatchewan SINP, Atlantic Immigration Program, and Ontario PNP Masters Graduate stream for those who study in Canada. Madurai engineers regularly receive ITAs through STEM category-based draws.",
      expressEntryHow: "Madurai applicants travel to Chennai (8 hours by train) for VFS biometrics and IELTS. The Express Entry process from Madurai takes 90–120 days from start to pool entry, with ITAs in 2–6 months. Many Madurai students transition through Canadian college diplomas → PGWP → PR — a pathway that leverages the city's strong academic culture.",
      topNocCodes: [
        { code: "21300", title: "Civil engineers" },
        { code: "21232", title: "Software developers" },
        { code: "21321", title: "Industrial engineers" },
        { code: "41200", title: "University professors and lecturers" },
        { code: "31301", title: "Registered nurses" }
      ],
      cityProfile: "Madurai's economy is anchored in textiles, automotive (TVS group), software services, education, and tourism. Madurai immigrants prefer Toronto, Mississauga, Scarborough (Tamil-majority neighbourhoods), Brampton, Calgary, and Halifax. The Greater Toronto Area has the largest Tamil diaspora in the world outside Sri Lanka and Tamil Nadu.",
      diasporaNote: "Scarborough and the GTA host the world's largest Tamil community outside South Asia, with hundreds of temples, Tamil schools, and grocery stores supporting Madurai newcomers.",
    },
  },
  {
    name: "Visakhapatnam", slug: "visakhapatnam", state: "Andhra Pradesh", region: "Andhra Pradesh, India", country: "india",
    tagline: "Andhra Pradesh's port city — IT, defence, and oil/gas professionals on Canada's NOC fast-track.",
    bestProfession: "Visakhapatnam's IT SEZ (Rushikonda), HPCL refinery, and shipyard workforce match NOC 21232 (software developers), 21331 (petroleum engineers), and 21300 (civil engineers)",
    prContent: {
      whyMoving: "Visakhapatnam is Andhra Pradesh's industrial powerhouse with major IT SEZs, Hindustan Petroleum's refinery, the Eastern Naval Command, and Visakhapatnam Port — generating diverse professional pools eligible for Express Entry. Vizag professionals' lower cost of living means strong savings positions and competitive CRS scores around 450–490.",
      topPathways: "Top Canada PR pathways for Vizag are Express Entry FSW, Alberta AAIP for oil/gas and engineering professionals, BC PNP for IT roles, and Saskatchewan SINP for trades and engineering. Petroleum engineers from HPCL frequently target Calgary's energy sector through Alberta PNP.",
      expressEntryHow: "Vizag applicants use Hyderabad (12 hours by train or 1-hour flight) for VFS biometrics. The Express Entry workflow takes 90–120 days, with ITAs generally arriving in 1–4 months for STEM and Trades category draws. Many Vizag oil/gas professionals also pursue LMIA-supported moves to Calgary.",
      topNocCodes: [
        { code: "21232", title: "Software developers" },
        { code: "21331", title: "Petroleum engineers" },
        { code: "21300", title: "Civil engineers" },
        { code: "22301", title: "Mechanical engineering technologists" },
        { code: "73400", title: "Heavy equipment operators" }
      ],
      cityProfile: "Visakhapatnam's dominant sectors are IT services, oil & gas (HPCL, ONGC), defence, shipbuilding, and pharma. Vizag immigrants prefer Toronto, Mississauga, Calgary, and Edmonton — with Telugu-speaking communities especially established in Mississauga, Brampton, and Calgary's Saddle Ridge area.",
      diasporaNote: "TANA (Telugu Association of North America) and Telugu Cultural Association of Toronto host major events and provide settlement support across the GTA and Calgary.",
    },
  },
  {
    name: "Vijayawada", slug: "vijayawada", state: "Andhra Pradesh", region: "Andhra Pradesh, India", country: "india",
    tagline: "AP's emerging capital region — engineering, agritech, and IT graduates on Express Entry track.",
    bestProfession: "engineering colleges and IT services firms produce graduates matching NOC 21232 (software developers), 21300 (civil engineers), and 22221 (industrial designers)",
    prContent: {
      whyMoving: "Vijayawada and the Amaravati capital region are emerging engineering and IT hubs in Andhra Pradesh, with strong technical college networks (KL University, VRSEC) feeding the Express Entry pool. Vijayawada's English-medium education tradition and lower cost of living give applicants strong CRS positions (typically 450–490).",
      topPathways: "Top Canada PR pathways for Vijayawada are Express Entry FSW, Saskatchewan SINP Express Entry, Manitoba MPNP, and the Atlantic Immigration Program — all favourable to engineering and IT professionals from tier-2 Indian cities.",
      expressEntryHow: "Vijayawada applicants typically travel to Hyderabad for VFS biometrics. The Express Entry process from Vijayawada takes 90–120 days from start to pool, with most STEM-category ITAs arriving within 1–4 months of pool entry.",
      topNocCodes: [
        { code: "21232", title: "Software developers" },
        { code: "21300", title: "Civil engineers" },
        { code: "21311", title: "Computer engineers" },
        { code: "21321", title: "Industrial engineers" },
        { code: "31301", title: "Registered nurses" }
      ],
      cityProfile: "Vijayawada's economy centres on agriculture trade, education, IT services, and small manufacturing. Vijayawada immigrants typically settle in Toronto, Mississauga, Brampton, Calgary, and Winnipeg, where established Telugu and broader South Indian communities support newcomer settlement.",
      diasporaNote: "TANA and ATA (American Telugu Association) Canada chapters in the GTA, Calgary, and Winnipeg help Vijayawada families integrate culturally and professionally.",
    },
  },
  {
    name: "Kochi", slug: "kochi", state: "Kerala", region: "Kerala, India", country: "india",
    tagline: "Kerala's Infopark city — high-IELTS-scoring IT, healthcare, and maritime professionals.",
    bestProfession: "Kochi's Infopark, SmartCity, and large nursing pool align with NOC 21232 (software developers), 31301 (registered nurses), and 22310 (electrical engineering technologists)",
    prContent: {
      whyMoving: "Kochi (Cochin) leads Kerala's IT and healthcare professional exodus to Canada, with Infopark and SmartCity producing software developers and Kerala's nursing colleges feeding the Healthcare category-based Express Entry draws. Kerala's exceptional English proficiency means CLB 9–10 IELTS scores are common, putting Kochi applicants in the highest CRS bands.",
      topPathways: "Top Canada PR pathways for Kochi are Express Entry Healthcare and STEM draws, Atlantic Immigration Program (especially for nurses), BC PNP Tech, and Ontario PNP Health. Kochi nurses regularly receive AIP-backed PR within 6–9 months.",
      expressEntryHow: "Kochi applicants benefit from a local VFS centre and IELTS Academic centres at British Council branches in Kochi. Express Entry pool entry typically takes 60–90 days from initial profile, with ITAs arriving in 1–3 months under Healthcare or STEM category-based draws.",
      topNocCodes: [
        { code: "31301", title: "Registered nurses" },
        { code: "21232", title: "Software developers" },
        { code: "22310", title: "Electrical engineering technologists" },
        { code: "32101", title: "Licensed practical nurses" },
        { code: "21321", title: "Industrial engineers" },
        { code: "73400", title: "Heavy equipment operators (port/maritime)" }
      ],
      cityProfile: "Kochi's dominant industries are IT services, healthcare/nursing, maritime/port logistics, and tourism. Kochi immigrants are heavily concentrated in Toronto, Mississauga, Scarborough, Brampton, Calgary, Edmonton, and Atlantic Canada (Halifax, Moncton, Saint John, Charlottetown). Kerala's Christian, Hindu, and Muslim communities all have strong networks across these regions.",
      diasporaNote: "Malayalee associations across Toronto, Mississauga, Scarborough, Calgary, and Atlantic Canada run vibrant Onam, Vishu, and Christmas events, with strong professional and parish networks.",
    },
  },
  {
    name: "Thiruvananthapuram", slug: "thiruvananthapuram", state: "Kerala", region: "Kerala, India", country: "india",
    tagline: "Kerala's capital — Technopark engineers and ISRO-network professionals fast-tracking PR.",
    bestProfession: "Technopark IT employers and ISRO/VSSC engineering ecosystems align with NOC 21232 (software developers), 21311 (computer engineers), and 21311 (aerospace engineers)",
    prContent: {
      whyMoving: "Thiruvananthapuram (Trivandrum) is home to Technopark — Asia's first IT park — and the ISRO/VSSC space research complex, producing thousands of Express Entry-eligible engineers and developers annually. Trivandrum's high English proficiency (CLB 9 common) and lower cost of living create strong CRS profiles, typically 460–510.",
      topPathways: "Top Canada PR pathways for Trivandrum are Express Entry STEM category draws, BC PNP Tech, Ontario INP Tech, and the Atlantic Immigration Program. Many Trivandrum nurses and pharmacists also leverage Healthcare category draws and PEI PNP.",
      expressEntryHow: "Trivandrum applicants benefit from a VFS centre in the city and easy IELTS access. Express Entry pool entry typically takes 60–90 days from project start, and ITAs commonly arrive in 1–3 months under category-based draws (STEM, Healthcare).",
      topNocCodes: [
        { code: "21232", title: "Software developers" },
        { code: "21311", title: "Computer engineers" },
        { code: "21300", title: "Civil engineers" },
        { code: "31301", title: "Registered nurses" },
        { code: "21100", title: "Physical science professionals" }
      ],
      cityProfile: "Trivandrum's economy is dominated by IT services (Technopark), space research (ISRO/VSSC), healthcare, and government. Trivandrum immigrants concentrate in Toronto, Mississauga, Calgary, Edmonton, and Atlantic Canada, with strong Malayalee networks across each region.",
      diasporaNote: "Kerala Hindus of Canada, Malayalee Association of Toronto, and Atlantic Malayalee Association support Trivandrum families with cultural events, settlement help, and professional networking.",
    },
  },
  {
    name: "Kozhikode", slug: "kozhikode", state: "Kerala", region: "Kerala, India", country: "india",
    tagline: "Kerala's Malabar coast — nursing, education, and trades professionals on Atlantic PR pathways.",
    bestProfession: "Kozhikode's nursing colleges, NIT Calicut, and trades workforce align with NOC 31301 (registered nurses), 21300 (civil engineers), and 72200 (electricians)",
    prContent: {
      whyMoving: "Kozhikode (Calicut) has one of India's highest nurse-export rates and is anchored by NIT Calicut for engineering, plus a strong trades and Gulf-returnee professional pool. Kozhikode's English fluency, IELTS-test culture, and Atlantic Canada-friendly settlement intent make it ideal for AIP and Healthcare category-based draws.",
      topPathways: "Top Canada PR pathways for Kozhikode are Express Entry Healthcare draws, Atlantic Immigration Program, PEI PNP, and Saskatchewan SINP Health. Many Kozhikode trades professionals also qualify under the Trades category-based draws (NOC TEER 2/3).",
      expressEntryHow: "Kozhikode applicants travel to Kochi (3.5 hours) for VFS biometrics. NNAS for nurses takes 4–6 months, after which Express Entry pool entry typically follows in 90–120 days. Healthcare-category ITAs usually arrive within 1–3 months for nurses with CLB 7+.",
      topNocCodes: [
        { code: "31301", title: "Registered nurses" },
        { code: "32101", title: "Licensed practical nurses" },
        { code: "21300", title: "Civil engineers" },
        { code: "72200", title: "Electricians" },
        { code: "73300", title: "Transport truck drivers" }
      ],
      cityProfile: "Kozhikode's economy is anchored in healthcare, education (NIT Calicut), trade, tourism, and Gulf-remittance services. Kozhikode immigrants concentrate in Atlantic Canada (Halifax, Moncton, Charlottetown, Saint John), the GTA, and Calgary, leveraging Malabar Muslim, Christian, and Hindu networks across each region.",
      diasporaNote: "Malabar associations and the broader Kerala Muslim and Christian communities in Halifax, Moncton, and the GTA give Kozhikode families strong cultural and settlement support.",
    },
  }
];

const NEW_CANADIAN: NewCity[] = [
  {
    name: "Red Deer", slug: "red-deer", state: "Alberta", region: "Alberta, Canada", country: "canada",
    tagline: "Central Alberta's affordable city — CEC and AAIP fast-tracks for trades, healthcare, and oil/gas.",
    bestProfession: "trades, healthcare, and energy services dominate Red Deer's labour market and align with NOC 72200 (electricians), 31301 (registered nurses), and 73300 (transport truck drivers)",
    pnpStream: "AAIP Alberta Opportunity Stream",
    prContent: {
      whyMoving: "Red Deer is central Alberta's labour-shortage market with critical demand in healthcare, trades, transport, and oil/gas services — making it one of the easiest Alberta cities to secure a PR-supporting LMIA or AAIP nomination. Lower CRS thresholds via AAIP Alberta Opportunity Stream and steady employer demand mean Red Deer-based work permit holders frequently transition to PR within 12–18 months.",
      topPathways: "Top Canada PR pathways from Red Deer are Express Entry CEC, AAIP Alberta Opportunity Stream (for current Alberta workers), AAIP Express Entry Stream, and LMIA-supported job offers in trades and healthcare.",
      expressEntryHow: "From Red Deer, Express Entry CEC is the fastest route after 1 year of full-time skilled work. The Alberta Opportunity Stream is uniquely valuable: applicants with a qualifying Alberta job and as low as CRS 300 can secure a nomination, then complete Federal PR processing in 6–11 months.",
      topNocCodes: [
        { code: "72200", title: "Electricians" },
        { code: "31301", title: "Registered nurses" },
        { code: "73300", title: "Transport truck drivers" },
        { code: "72106", title: "Welders" },
        { code: "32101", title: "Licensed practical nurses" },
        { code: "63200", title: "Cooks" }
      ],
      cityProfile: "Red Deer's economy is anchored in oil and gas services, agri-food processing, healthcare, retail, and trades. Many Red Deer PR applicants are workers and international students currently on permits, transitioning via CEC or AAIP. The city has growing Punjabi, Filipino, and South Asian communities.",
      diasporaNote: "Red Deer's Punjabi and Filipino communities have established cultural centres, gurdwaras, and Catholic parishes that support newcomer settlement and family sponsorship.",
    },
  },
  {
    name: "Lethbridge", slug: "lethbridge", state: "Alberta", region: "Alberta, Canada", country: "canada",
    tagline: "Southern Alberta's university city — fast study-to-PR and AAIP options for graduates and trades workers.",
    bestProfession: "agri-food, healthcare, and trades dominate Lethbridge's economy and align with NOC 31301 (registered nurses), 72106 (welders), and 95107 (food processing labourers under specific TEER rules)",
    pnpStream: "AAIP Alberta Opportunity Stream",
    prContent: {
      whyMoving: "Lethbridge combines a strong post-secondary base (University of Lethbridge, Lethbridge Polytechnic) with critical labour demand in agri-food, healthcare, and trades. International students completing PGWPs in Lethbridge enjoy one of Canada's smoothest study-to-PR pipelines via AAIP and CEC.",
      topPathways: "Top Canada PR pathways from Lethbridge are Express Entry CEC, AAIP Alberta Opportunity Stream, AAIP International Graduate Stream (for U of L and Polytechnic graduates), and LMIA-supported employer offers.",
      expressEntryHow: "Lethbridge international graduates can apply directly to AAIP's International Graduate Stream after 6 months of qualifying Alberta work. CEC requires 1 year of skilled work, then Express Entry typically delivers PR within 6–8 months of ITA.",
      topNocCodes: [
        { code: "31301", title: "Registered nurses" },
        { code: "72106", title: "Welders" },
        { code: "73300", title: "Transport truck drivers" },
        { code: "63200", title: "Cooks" },
        { code: "85100", title: "Agricultural service contractors and farm supervisors" },
        { code: "32101", title: "Licensed practical nurses" }
      ],
      cityProfile: "Lethbridge's economy is built on agri-food processing, education, healthcare, and retail/services. Many Lethbridge PR applicants are international students from India, Nigeria, and the Philippines on PGWPs, transitioning to CEC or AAIP. The city has growing Punjabi, Filipino, and Latin American communities.",
      diasporaNote: "Lethbridge's Sikh Society gurdwara and Filipino-Canadian Association support Punjabi and Filipino newcomers with cultural events and settlement help.",
    },
  },
  {
    name: "Montreal", slug: "montreal", state: "Quebec", region: "Quebec, Canada", country: "canada",
    tagline: "Quebec's largest city — French-skill PR pathways via PEQ, PRTQ, and Express Entry French draws.",
    bestProfession: "Montreal's tech, AI, aerospace, and life sciences sectors align with NOC 21232 (software developers), 21311 (computer engineers), and 21321 (industrial engineers)",
    pnpStream: "PEQ (Programme de l'expérience québécoise)",
    prContent: {
      whyMoving: "Montreal is Canada's bilingual tech and AI capital with major employers in software, gaming, aerospace (Bombardier, CAE), and life sciences. PR pathways from Montreal differ from the rest of Canada — Quebec runs its own selection through PEQ and PRTQ — and federal Express Entry French-speaking category draws (CRS often 379+) reward NCLC 7 French skills with up to 50 bonus CRS points.",
      topPathways: "Top Canada PR pathways from Montreal are Quebec's PEQ (for Quebec graduates and Quebec workers), Programme régulier des travailleurs qualifiés (PRTQ) via Arrima, federal Express Entry French-speaking category draws, and Quebec employer-sponsored job offers.",
      expressEntryHow: "Federal Express Entry from Montreal works best for French-speaking applicants — French CLB 7+ unlocks the dedicated French-speaking category draws (cut-offs as low as CRS 379 in 2025–26). For Quebec-specific PR, candidates apply through Arrima for a Certificat de sélection du Québec (CSQ), then complete the federal PR step.",
      topNocCodes: [
        { code: "21232", title: "Software developers" },
        { code: "21311", title: "Computer engineers" },
        { code: "21321", title: "Industrial engineers" },
        { code: "21100", title: "Physical science professionals" },
        { code: "41200", title: "University professors and lecturers" },
        { code: "31301", title: "Registered nurses" }
      ],
      cityProfile: "Montreal's tech, AI, gaming (Ubisoft), aerospace, and life-sciences ecosystems make it Canada's most diverse metropolitan PR market. Many Montreal PR applicants are international students from McGill, Concordia, UdeM, and Polytechnique transitioning via PEQ. The city's South Asian, Maghrebi, and Latin American communities are extensive.",
      diasporaNote: "Montreal's Quebec South Asian Community Centre and the broader Indo-Canadian, Maghrebi, and Filipino networks in Côte-des-Neiges, NDG, and Brossard support newcomer settlement.",
    },
  },
  {
    name: "Markham", slug: "markham", state: "Ontario", region: "Ontario, Canada", country: "canada",
    tagline: "GTA's tech corridor — Ontario PNP Tech and CEC fast-tracks for software and finance professionals.",
    bestProfession: "tech, finance, and healthcare dominate Markham's professional base and align with NOC 21232 (software developers), 11100 (financial auditors and accountants), and 31301 (registered nurses)",
    pnpStream: "Ontario INP Human Capital Priorities Tech Draw",
    prContent: {
      whyMoving: "Markham is Ontario's tech corridor headquarters, home to IBM Canada, Oracle, AMD, Honeywell, and Huawei R&D — making it a top destination for international IT workers and graduates. Markham's strong job market in tech and finance, combined with Ontario INP Tech draws and CEC, gives PR applicants one of the GTA's smoothest temp-to-PR pipelines.",
      topPathways: "Top Canada PR pathways from Markham are Express Entry CEC, Ontario INP Human Capital Priorities Tech draws, Ontario INP Employer Job Offer streams, and LMIA-supported senior tech roles.",
      expressEntryHow: "Markham international workers and graduates typically file CEC after 1 year of Canadian skilled work. The Ontario INP Tech draws (targeting NOC 21232, 21311, 21222, etc.) frequently invite Express Entry candidates with CRS as low as 451, leading to PR within 6–11 months from nomination.",
      topNocCodes: [
        { code: "21232", title: "Software developers" },
        { code: "21311", title: "Computer engineers" },
        { code: "21222", title: "Information systems specialists" },
        { code: "11100", title: "Financial auditors and accountants" },
        { code: "31301", title: "Registered nurses" },
        { code: "10010", title: "Financial managers" }
      ],
      cityProfile: "Markham's economy is dominated by technology (IBM, AMD, Oracle), finance (Allstate, Aviva), and biotech. Markham PR applicants are typically international workers and graduates from York University and Seneca College. The city has Canada's largest Chinese-Canadian community and a growing South Asian (Tamil, Punjabi, Hindu) population.",
      diasporaNote: "Markham's Chinese-Canadian community is the largest in North America by share of population, with Cantonese and Mandarin services widely available; South Asian temples and gurdwaras also support newcomer settlement.",
    },
  },
  {
    name: "Vaughan", slug: "vaughan", state: "Ontario", region: "Ontario, Canada", country: "canada",
    tagline: "GTA's logistics and construction hub — Ontario PNP and CEC pathways for trades and engineers.",
    bestProfession: "construction, logistics, and IT dominate Vaughan's professional base and align with NOC 22301 (mechanical engineering technologists), 73300 (transport truck drivers), and 21300 (civil engineers)",
    pnpStream: "Ontario INP Skilled Trades Stream",
    prContent: {
      whyMoving: "Vaughan is the GTA's logistics, construction, and manufacturing engine — home to Canada's Wonderland, major Italian-Canadian construction firms, and a fast-growing tech and biotech base. Vaughan's strong demand for skilled trades, engineers, and logistics professionals makes Ontario INP Skilled Trades Stream and CEC the top PR pathways for current Vaughan workers.",
      topPathways: "Top Canada PR pathways from Vaughan are Express Entry CEC, Ontario INP Skilled Trades Stream, Ontario INP Employer Job Offer In-Demand Skills, and LMIA-supported job offers in construction and logistics.",
      expressEntryHow: "Vaughan trades workers and engineers typically file Express Entry CEC after 1 year of skilled Canadian work. The Ontario INP Skilled Trades stream uniquely accepts Express Entry candidates with strong trades experience (NOC TEER 2 trades) and a Vaughan job offer.",
      topNocCodes: [
        { code: "22301", title: "Mechanical engineering technologists" },
        { code: "73300", title: "Transport truck drivers" },
        { code: "21300", title: "Civil engineers" },
        { code: "72200", title: "Electricians" },
        { code: "72106", title: "Welders" },
        { code: "21232", title: "Software developers" }
      ],
      cityProfile: "Vaughan's economy is anchored by construction, logistics, manufacturing, retail (Vaughan Mills), and entertainment. PR applicants in Vaughan are typically temporary workers and international graduates working in trades, engineering, and IT. The city has Canada's largest Italian-Canadian community and growing Russian, Persian, and South Asian populations.",
      diasporaNote: "Vaughan's Italian-Canadian community is North America's largest, with extensive cultural infrastructure; the city's Persian, Russian, and South Asian temples and centres also support newcomers.",
    },
  },
  {
    name: "Richmond Hill", slug: "richmond-hill", state: "Ontario", region: "Ontario, Canada", country: "canada",
    tagline: "GTA's professional family suburb — Ontario INP Tech and CEC for professionals seeking PR.",
    bestProfession: "technology, finance, and healthcare professionals dominate Richmond Hill and align with NOC 21232 (software developers), 11100 (accountants), and 31301 (registered nurses)",
    pnpStream: "Ontario INP Human Capital Priorities Tech Draw",
    prContent: {
      whyMoving: "Richmond Hill is one of the GTA's top professional-family suburbs with strong technology, finance, and healthcare workforces. Its proximity to Markham's tech corridor and Toronto's CBD makes it a popular base for international workers transitioning to PR via CEC and Ontario INP Tech draws.",
      topPathways: "Top Canada PR pathways from Richmond Hill are Express Entry CEC, Ontario INP Human Capital Priorities Tech draws, Ontario INP Employer Job Offer International Student Stream, and LMIA-supported professional roles.",
      expressEntryHow: "Richmond Hill professionals typically file Express Entry CEC after 1 year of Canadian skilled work, often with bonus CRS from Canadian Master's degrees from York University or U of T. Ontario INP Tech draws regularly invite Express Entry candidates with CRS 451+, leading to PR in 6–11 months from nomination.",
      topNocCodes: [
        { code: "21232", title: "Software developers" },
        { code: "21311", title: "Computer engineers" },
        { code: "11100", title: "Financial auditors and accountants" },
        { code: "31301", title: "Registered nurses" },
        { code: "21221", title: "Business systems specialists" },
        { code: "10010", title: "Financial managers" }
      ],
      cityProfile: "Richmond Hill's economy spans technology, finance, healthcare, and professional services. PR applicants in Richmond Hill are typically international workers and graduates working at Markham/Vaughan tech firms or downtown Toronto financial institutions. The city has large Chinese-Canadian, Persian-Canadian, and Korean-Canadian communities.",
      diasporaNote: "Richmond Hill has one of Canada's highest concentrations of Chinese-Canadian and Persian-Canadian families, with Mandarin, Cantonese, and Farsi services widely available throughout the city.",
    },
  },
  {
    name: "Oakville", slug: "oakville", state: "Ontario", region: "Ontario, Canada", country: "canada",
    tagline: "GTA's lakeside professional hub — corporate, tech, and finance professionals fast-tracking PR.",
    bestProfession: "corporate finance, IT, and healthcare professionals dominate Oakville and align with NOC 11100 (financial auditors and accountants), 21232 (software developers), and 10010 (financial managers)",
    pnpStream: "Ontario INP Human Capital Priorities Stream",
    prContent: {
      whyMoving: "Oakville is the GTA's premier corporate suburb, home to Ford Motor Canada HQ, Siemens, and dozens of Fortune 500 Canadian offices — generating high-paying jobs in finance, tech, automotive engineering, and management. PR applicants in Oakville benefit from strong CRS positions through CEC + master's degree bonuses + high-skilled job offers.",
      topPathways: "Top Canada PR pathways from Oakville are Express Entry CEC, Ontario INP Human Capital Priorities, Ontario INP Employer Job Offer streams, and LMIA-supported senior corporate roles.",
      expressEntryHow: "Oakville professionals typically file Express Entry CEC after 1 year of Canadian work. CRS scores in the 470–520 range are common thanks to Canadian work experience, master's degrees, and high language scores — leading to ITAs from general or Tech-category Express Entry draws.",
      topNocCodes: [
        { code: "11100", title: "Financial auditors and accountants" },
        { code: "21232", title: "Software developers" },
        { code: "10010", title: "Financial managers" },
        { code: "21321", title: "Industrial engineers" },
        { code: "21300", title: "Civil engineers" },
        { code: "31301", title: "Registered nurses" }
      ],
      cityProfile: "Oakville's economy is anchored by corporate HQs (Ford, Siemens), automotive engineering, finance, healthcare, and biotech. PR applicants in Oakville are typically senior international workers on closed work permits or graduates from Sheridan College and McMaster University. The city has growing South Asian, Chinese, and Eastern European communities.",
      diasporaNote: "Oakville's South Asian community is well established with gurdwaras, Hindu temples, and Indian grocery stores; the city's professional networks also support newcomers from China, Iran, and Eastern Europe.",
    },
  },
  {
    name: "Barrie", slug: "barrie", state: "Ontario", region: "Ontario, Canada", country: "canada",
    tagline: "Simcoe County's growing city — Ontario PNP and CEC for trades, healthcare, and tourism workers.",
    bestProfession: "trades, healthcare, manufacturing, and tourism dominate Barrie and align with NOC 72200 (electricians), 31301 (registered nurses), and 63200 (cooks)",
    pnpStream: "Ontario INP Skilled Trades Stream",
    prContent: {
      whyMoving: "Barrie is Simcoe County's main city with critical labour demand in trades, healthcare, manufacturing, and tourism — and its smaller-city status often qualifies applicants for additional CRS points under rural-focused PNP streams. Combined with Ontario INP Skilled Trades and CEC, Barrie offers strong PR pathways for current workers and Georgian College graduates.",
      topPathways: "Top Canada PR pathways from Barrie are Express Entry CEC, Ontario INP Skilled Trades Stream, Ontario INP Employer Job Offer In-Demand Skills, and LMIA-supported trades roles.",
      expressEntryHow: "Barrie trades workers can pursue the Ontario INP Skilled Trades stream with a Barrie job offer and 9 months+ of qualifying Ontario work. CEC applicants from Barrie file after 1 year of full-time skilled work and typically reach PR within 6–11 months.",
      topNocCodes: [
        { code: "72200", title: "Electricians" },
        { code: "31301", title: "Registered nurses" },
        { code: "63200", title: "Cooks" },
        { code: "73300", title: "Transport truck drivers" },
        { code: "72106", title: "Welders" },
        { code: "32101", title: "Licensed practical nurses" }
      ],
      cityProfile: "Barrie's economy is anchored by manufacturing, healthcare, tourism (Lake Simcoe, Horseshoe Resort), trades, and retail. PR applicants in Barrie are typically international workers and Georgian College graduates on PGWPs. The city has growing South Asian, Filipino, and Caribbean communities.",
      diasporaNote: "Barrie's South Asian and Filipino communities are growing rapidly, with new gurdwaras, churches, and grocery stores supporting newcomer families.",
    },
  },
  {
    name: "Guelph", slug: "guelph", state: "Ontario", region: "Ontario, Canada", country: "canada",
    tagline: "Waterloo Region's neighbour — University of Guelph graduates and tech workers on Ontario PNP.",
    bestProfession: "agri-food, IT, and biotech dominate Guelph and align with NOC 21232 (software developers), 21100 (physical science professionals — agri-food research), and 21300 (civil engineers)",
    pnpStream: "Ontario INP Masters Graduate Stream",
    prContent: {
      whyMoving: "Guelph is the heart of Canada's agri-food research with the University of Guelph driving biotech, food science, and agricultural innovation — alongside a growing tech corridor connected to Waterloo. Guelph master's and PhD graduates qualify for Ontario INP's Masters/PhD streams without a job offer, providing one of Ontario's smoothest study-to-PR pipelines.",
      topPathways: "Top Canada PR pathways from Guelph are Express Entry CEC, Ontario INP Masters Graduate Stream and PhD Graduate Stream, Ontario INP Human Capital Priorities, and LMIA-supported research/tech offers.",
      expressEntryHow: "Guelph master's graduates can apply directly to Ontario INP's Masters Graduate Stream within 2 years of graduation without needing a job offer. PR processing typically takes 12–18 months total. CEC requires 1 year of Canadian skilled work, then 6–11 months for federal PR.",
      topNocCodes: [
        { code: "21232", title: "Software developers" },
        { code: "21100", title: "Physical science professionals" },
        { code: "41200", title: "University professors and lecturers" },
        { code: "21300", title: "Civil engineers" },
        { code: "31301", title: "Registered nurses" },
        { code: "21311", title: "Computer engineers" }
      ],
      cityProfile: "Guelph's economy is anchored by agri-food research, biotech, IT, manufacturing (Linamar), and education. PR applicants in Guelph are heavily international students and graduates from the University of Guelph, transitioning via Ontario INP Masters Graduate stream or CEC. The city has growing South Asian, Chinese, and African communities.",
      diasporaNote: "Guelph's growing South Asian and African student/graduate communities are supported by university student associations and local cultural centres.",
    },
  },
  {
    name: "Oshawa", slug: "oshawa", state: "Ontario", region: "Ontario, Canada", country: "canada",
    tagline: "Durham Region's automotive and university city — CEC and Ontario PNP for trades and grads.",
    bestProfession: "automotive manufacturing, healthcare, trades, and education dominate Oshawa and align with NOC 22301 (mechanical engineering technologists), 72106 (welders), and 31301 (registered nurses)",
    pnpStream: "Ontario INP Skilled Trades Stream",
    prContent: {
      whyMoving: "Oshawa is Durham Region's main city — historically the home of GM Canada and now a growing healthcare, education (Ontario Tech, Trent Durham), and trades hub. Strong demand for skilled trades workers and healthcare professionals, combined with Ontario INP Skilled Trades and CEC, makes Oshawa a strong PR base for current workers and graduates.",
      topPathways: "Top Canada PR pathways from Oshawa are Express Entry CEC, Ontario INP Skilled Trades Stream, Ontario INP Masters Graduate Stream (for Ontario Tech grads), and LMIA-supported trades and healthcare offers.",
      expressEntryHow: "Oshawa trades workers file Ontario INP Skilled Trades with a job offer and 9+ months of qualifying work. Express Entry CEC requires 1 year of Canadian skilled work, with PR completion typically in 6–8 months from ITA.",
      topNocCodes: [
        { code: "22301", title: "Mechanical engineering technologists" },
        { code: "72106", title: "Welders" },
        { code: "31301", title: "Registered nurses" },
        { code: "72200", title: "Electricians" },
        { code: "73300", title: "Transport truck drivers" },
        { code: "32101", title: "Licensed practical nurses" }
      ],
      cityProfile: "Oshawa's economy is built on automotive (GM legacy + Stellantis), healthcare (Lakeridge Health), education, and trades. PR applicants in Oshawa are typically temporary workers in trades and Ontario Tech / Trent Durham graduates on PGWPs. The city has growing Caribbean, South Asian, and Filipino communities.",
      diasporaNote: "Oshawa's South Asian, Caribbean, and Filipino communities are anchored by gurdwaras, churches, and cultural associations supporting newcomer settlement.",
    },
  },
  {
    name: "Ajax", slug: "ajax", state: "Ontario", region: "Ontario, Canada", country: "canada",
    tagline: "Durham Region's growing town — affordable GTA suburb with CEC and Ontario PNP fast-tracks.",
    bestProfession: "logistics, healthcare, and IT dominate Ajax and align with NOC 73300 (transport truck drivers), 31301 (registered nurses), and 21232 (software developers)",
    pnpStream: "Ontario INP Human Capital Priorities Stream",
    prContent: {
      whyMoving: "Ajax is one of the GTA's fastest-growing towns with strong logistics (proximity to Highway 401 corridor), healthcare, and IT employment. Lower housing costs than Toronto and Markham, combined with strong Ontario INP and CEC PR pathways, make Ajax an attractive base for newcomers transitioning from temporary status to PR.",
      topPathways: "Top Canada PR pathways from Ajax are Express Entry CEC, Ontario INP Human Capital Priorities, Ontario INP Skilled Trades Stream, and LMIA-supported logistics and healthcare offers.",
      expressEntryHow: "Ajax workers typically file CEC after 1 year of qualifying Canadian skilled work. Ontario INP Human Capital Priorities targets Express Entry candidates with CRS 451+, often issued through Tech draws — leading to PR within 6–11 months of nomination.",
      topNocCodes: [
        { code: "73300", title: "Transport truck drivers" },
        { code: "31301", title: "Registered nurses" },
        { code: "21232", title: "Software developers" },
        { code: "11100", title: "Financial auditors and accountants" },
        { code: "72200", title: "Electricians" },
        { code: "32101", title: "Licensed practical nurses" }
      ],
      cityProfile: "Ajax's economy spans logistics (Amazon, distribution centres), healthcare (Ajax-Pickering Hospital), IT, and retail. PR applicants in Ajax are typically temporary workers and international graduates from Centennial College and University of Toronto Scarborough campus. The city has large Caribbean, South Asian, Filipino, and African communities.",
      diasporaNote: "Ajax's Caribbean (especially Guyanese and Trinidadian) and South Asian communities are large and well-organized, with churches, mandirs, mosques, and gurdwaras supporting newcomers.",
    },
  },
  {
    name: "Fredericton", slug: "fredericton", state: "New Brunswick", region: "New Brunswick, Canada", country: "canada",
    tagline: "New Brunswick's bilingual capital — fast Atlantic Immigration Program and NB PNP pathways.",
    bestProfession: "IT, government, healthcare, and education dominate Fredericton and align with NOC 21232 (software developers), 31301 (registered nurses), and 41200 (university professors)",
    pnpStream: "New Brunswick PNP Express Entry / AIP",
    prContent: {
      whyMoving: "Fredericton is New Brunswick's bilingual capital with a growing IT cluster (UNB, NBCC, Cyber Centre of Excellence) and strong demand in healthcare and government. Combined with the Atlantic Immigration Program and NB PNP, Fredericton offers one of Canada's fastest PR pathways for skilled workers and international graduates with a designated employer offer (PR in roughly 6 months).",
      topPathways: "Top Canada PR pathways from Fredericton are Atlantic Immigration Program (AIP), NB PNP Express Entry stream, NB PNP Skilled Worker stream, and Express Entry CEC. AIP requires a job offer from a designated New Brunswick employer.",
      expressEntryHow: "AIP from Fredericton: get a job offer from a designated NB employer, complete an endorsement application with the province (4–6 months), then submit federal PR (about 6 months). NB PNP Express Entry takes roughly 12–18 months total for Express Entry candidates with NB ties.",
      topNocCodes: [
        { code: "21232", title: "Software developers" },
        { code: "31301", title: "Registered nurses" },
        { code: "41200", title: "University professors and lecturers" },
        { code: "11100", title: "Financial auditors and accountants" },
        { code: "32101", title: "Licensed practical nurses" },
        { code: "21222", title: "Information systems specialists" }
      ],
      cityProfile: "Fredericton's economy spans IT (Cyber Centre, IBM, McKesson), government (provincial capital), education (University of New Brunswick, St. Thomas), and healthcare. PR applicants in Fredericton are typically international workers, AIP-recruited professionals, and UNB/NBCC graduates. The city has growing South Asian, Filipino, and Latin American communities.",
      diasporaNote: "Fredericton's Indo-Canadian, Filipino, and Latin American communities are anchored by cultural associations, gurdwara, and Catholic parishes that support newcomer integration.",
    },
  }
];

export const NEW_CITIES_PR: NewCity[] = [...NEW_INDIAN, ...NEW_CANADIAN];

/**
 * Build full CityData entries with PR-intent content for the new cities.
 * The resulting CityData also carries `prContent` which CityPage uses to
 * render the upgraded SEO/AEO sections.
 */
export function buildPRCityEntries(): (CityData & { prContent: CityPRContent; tagline: string })[] {
  return NEW_CITIES_PR.map((c) => {
    const isIndia = c.country === "india";
    const faqs = isIndia
      ? buildAEOFAQs(c.name, c.bestProfession)
      : buildAEOFAQsCanada(c.name, c.state, c.pnpStream || `${c.state} PNP`);

    const metaTitle = `Canada PR from ${c.name} 2026 — Immigration Consultant | Garg Brothers`;
    const metaDescription = isIndia
      ? `Planning to move to Canada from ${c.name}? Get expert Express Entry, PNP & LMIA help from Garg Brothers. 98% success rate. Free assessment.`
      : `Living in ${c.name} on a work or study permit? Get expert CEC, PNP & LMIA help from Garg Brothers. 98% success rate. Free PR assessment.`;

    const intro = isIndia
      ? `Planning your Canada PR move from ${c.name}? Garg Brothers is an RCIC-led consultancy helping ${c.name} professionals secure Canadian Permanent Residency through Express Entry, Provincial Nominee Programs, LMIA work permits, and study-to-PR pathways. Our team has guided hundreds of ${c.state} families to PR with a 98% success rate.`
      : `Already in ${c.name} on a work or study permit and ready for PR? Garg Brothers is an RCIC-led consultancy helping ${c.name} residents transition from temporary status to Canadian Permanent Residency through Express Entry CEC, ${c.state} PNP streams, and LMIA-supported job offers — 98% success rate.`;

    return {
      slug: c.slug,
      name: c.name,
      country: c.country,
      region: c.region,
      metaTitle,
      metaDescription,
      intro,
      localInsight: c.prContent.whyMoving,
      services: isIndia
        ? [
            `Canada Express Entry PR from ${c.name}`,
            `Provincial Nominee Programs (Ontario, BC, Alberta, Saskatchewan)`,
            `LMIA-supported work permits & job offers`,
            `Study Permits with PGWP-to-PR pathways`,
            `WES & ECA credential evaluations`,
            `IELTS & CELPIP preparation guidance`,
            `Family sponsorship after PR landing`
          ]
        : [
            `Express Entry CEC for current ${c.name} workers`,
            `${c.state} PNP nomination via ${c.pnpStream || c.state + " PNP"}`,
            `Work permit extensions & LMIA processing`,
            `Study permit to PR transition (PGWP)`,
            `Family sponsorship (spouse, parents, children)`,
            `Citizenship application after PR`,
            `Bridging Open Work Permit (BOWP) support`
          ],
      testimonial: {
        name: isIndia ? `${c.name} PR client` : `${c.name} CEC client`,
        text: isIndia
          ? `Garg Brothers walked us through every step of Canada PR from ${c.name} — Express Entry profile, WES, IELTS strategy, and ITA response. We landed in Toronto within 14 months and the experience was seamless.`
          : `Living in ${c.name} on a work permit, I was overwhelmed by PR options. Garg Brothers mapped out CEC and ${c.state} PNP, picked the fastest path, and I got my COPR within 9 months.`,
        visa: "Canada PR",
      },
      faqs,
      prContent: c.prContent,
      tagline: c.tagline,
    } as CityData & { prContent: CityPRContent; tagline: string };
  });
}