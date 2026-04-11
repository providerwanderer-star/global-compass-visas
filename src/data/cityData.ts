export interface CityData {
  slug: string;
  name: string;
  country: "india" | "canada";
  region: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  localInsight: string;
  services: string[];
  testimonial: { name: string; text: string; visa: string };
  faqs: { question: string; answer: string }[];
}

const indianCityInsights: Record<string, string> = {
  "Delhi": "As India's capital and a major hub for embassies and visa application centres, Delhi residents benefit from proximity to VFS Global offices and quick document processing. The city's massive IT and corporate sector produces thousands of Express Entry-eligible professionals every year.",
  "Mumbai": "India's financial capital has the highest concentration of skilled professionals in banking, finance, and tech — all in-demand occupations for Canada's NOC system. Mumbai's cosmopolitan culture means many applicants already have international work exposure.",
  "Bangalore": "Known as India's Silicon Valley, Bangalore produces more tech-skilled immigrants than any other Indian city. Software engineers, data scientists, and IT managers from Bangalore consistently score 470+ CRS points.",
  "Hyderabad": "Hyderabad's booming pharma and IT corridor (HITEC City) generates a strong pipeline of Canada-bound professionals. The city's lower cost of living means applicants can more easily meet proof-of-funds requirements.",
  "Chennai": "Chennai's automotive and manufacturing industries align well with Australia's skilled occupation list. The city also has a strong tradition of educational migration, with many students transitioning to PR via PGWP pathways.",
  "Pune": "Pune's mix of IT parks and educational institutions creates dual demand — both study visa and Express Entry applicants. The city's young professional demographic is ideal for Provincial Nominee Programs targeting under-35 applicants.",
  "Ahmedabad": "Gujarat's commercial capital has a strong entrepreneurial community interested in Canada's Start-Up Visa program. Many Ahmedabad applicants also explore Germany's self-employment visa pathway.",
  "Kolkata": "Eastern India's cultural capital has seen a 40% increase in immigration inquiries since 2024. Kolkata professionals in education, healthcare, and engineering find strong matches with Atlantic Immigration Program pathways.",
  "Lucknow": "As UP's capital, Lucknow serves as a hub for immigration applicants across northern India. The city's growing medical and education sectors produce qualified candidates for healthcare worker pathways in Canada and Australia.",
  "Jaipur": "Rajasthan's capital has a rapidly growing IT sector and a strong hospitality industry — both producing candidates eligible for Canada's LMIA-based work permits and Australia's employer-sponsored visas.",
  "Chandigarh": "The tri-city area (Chandigarh-Mohali-Panchkula) is one of India's top immigration source regions, with high IELTS scores and strong CRS profiles thanks to Punjab's deep Canadian diaspora connections.",
  "Noida": "Part of the NCR tech corridor, Noida's IT professionals from companies in Sectors 62-63 frequently qualify for Express Entry with 450+ CRS scores. Close proximity to Delhi's VFS centres speeds up biometrics processing.",
  "Gurugram": "Home to 300+ Fortune 500 offices, Gurugram professionals have international corporate exposure that strengthens work permit and Express Entry applications. The city's expat community also drives family sponsorship demand.",
  "Indore": "Central India's cleanest city has emerged as a growing IT hub, with Indore professionals increasingly exploring Canada PR and Germany's Job Seeker Visa as career acceleration moves.",
  "Patna": "Bihar's capital has seen rising immigration interest, particularly among medical graduates and engineers. Many Patna applicants benefit from PNP streams in Saskatchewan and Manitoba that value smaller-city settlement intent.",
  "Bhubaneswar": "Odisha's smart city is producing a new generation of tech professionals interested in Canadian immigration. The state's lower cost profile means applicants often exceed proof-of-funds requirements comfortably.",
  "Coimbatore": "Tamil Nadu's industrial city has strong manufacturing and textile sector professionals who match well with Australia's Regional Skilled Migration (491) visa targeting non-metro settlement.",
  "Vadodara": "Gujarat's cultural capital has a growing pool of chemical engineering and petrochemical professionals — occupations consistently on Canada's in-demand NOC list and Australia's MLTSSL.",
  "Nagpur": "Central India's orange city is strategically positioned, drawing immigration aspirants from across Maharashtra and MP. Nagpur's IT and logistics sectors produce Canada-ready professionals.",
  "Rajkot": "Saurashtra's commercial hub has a strong engineering and manufacturing base. Many Rajkot applicants explore both Canada Express Entry and Australia's skilled migration with strong points profiles.",
  "Varanasi": "UP's spiritual capital has a growing education and tourism workforce. Young professionals from BHU and IIT-BHU frequently pursue study-to-PR pathways in Canada and Australia.",
  "Kanpur": "IIT Kanpur and the city's industrial base produce engineering graduates highly sought after through Express Entry and Germany's EU Blue Card program for technical professionals.",
  "Nashik": "Maharashtra's wine capital has a growing IT and agriculture-tech sector. Nashik professionals increasingly leverage PNP programs targeting semi-urban candidates with specific skill sets.",
  "Agra": "Beyond the Taj Mahal, Agra has a growing service and tourism workforce. Many Agra residents pursue family sponsorship through established Canadian diaspora connections in the GTA.",
  "Cochin": "Kerala's commercial capital has a strong maritime, IT, and healthcare workforce. Cochin professionals often score high in IELTS (thanks to Kerala's English proficiency) boosting CRS scores significantly.",
  "Ludhiana": "Punjab's industrial capital is one of India's top immigration source cities for Canada. Ludhiana's strong manufacturing, textile, and small business sectors produce thousands of LMIA and Express Entry applicants annually. The city's deep Canadian diaspora connections in Brampton and Surrey make family sponsorship a major pathway, while young professionals increasingly qualify for Express Entry with 450+ CRS scores.",
  "Amritsar": "As the spiritual and cultural heart of Punjab, Amritsar has one of India's highest per-capita rates of Canada PR applications. The city's proximity to the Wagah border and strong IELTS coaching infrastructure means Amritsar applicants consistently score CLB 8+. The established Punjabi diaspora across Ontario and BC creates strong family sponsorship and LMIA job offer pipelines.",
  "Jalandhar": "Jalandhar is a major immigration hub in the Doaba region of Punjab, with deep-rooted connections to Canada's Punjabi community. The city's sports goods, hand tools, and IT sectors produce skilled workers eligible for LMIA and Express Entry. Jalandhar's numerous IELTS coaching centres help applicants achieve high language scores critical for CRS optimization.",
  "Mohali": "Part of the Chandigarh tri-city area, Mohali's IT and pharma corridor (IT City, Phase 8B) produces highly qualified Express Entry candidates. Mohali professionals from companies like Infosys, TCS, and Quark frequently score 470+ CRS points. The city's proximity to Chandigarh's VFS centre and IELTS test centres makes the application process seamless.",
  "Bathinda": "Bathinda is emerging as a key immigration hub in the Malwa region of Punjab. The city's agricultural economy and growing education sector are driving increasing numbers of students and young professionals toward Canada. Bathinda's relatively lower cost of living means applicants easily meet proof-of-funds requirements, while strong family connections in Canada's prairies support LMIA and sponsorship pathways.",
  "Patiala": "Patiala, the royal city of Punjab, has a thriving education ecosystem with Thapar Institute and Punjabi University producing thousands of Canada-eligible graduates each year. The city's strong healthcare and education workforce aligns perfectly with Canada's in-demand NOC categories. Patiala applicants benefit from excellent IELTS preparation centres and a well-connected diaspora in Ontario and BC.",
  "Hoshiarpur": "Hoshiarpur is one of Punjab's highest per-capita emigration districts, with deep generational ties to Canada. The Doaba region's tradition of Canadian migration means nearly every family has relatives in the GTA, Vancouver, or Calgary — creating strong sponsorship and LMIA job offer pipelines. Hoshiarpur applicants consistently score well on IELTS due to the district's strong English coaching infrastructure.",
  "Moga": "Moga district in the Malwa belt of Punjab has seen a significant rise in Canada PR applications since 2024. The city's dairy and agriculture sector professionals are increasingly seeking Express Entry and LMIA pathways. Moga's close-knit community connections to Canada's Manitoba and Saskatchewan provinces create unique PNP nomination opportunities for applicants from this region.",
  "Pathankot": "Situated at the gateway of Punjab, Himachal Pradesh, and Jammu & Kashmir, Pathankot draws immigration aspirants from across northern India. The city's military and government sector employees often transition to Canada through Federal Skilled Worker streams. Pathankot's growing IELTS coaching industry and affordable living costs make it an emerging immigration hotspot for families seeking PR.",
  // Gujarat cities
  "Surat": "Gujarat's diamond capital and one of India's fastest-growing cities, Surat's textile and diamond polishing industries produce skilled workers increasingly seeking Canada Express Entry and Australia PR. The city's entrepreneurial culture aligns with Canada's Start-Up Visa and self-employed pathways. Surat's growing IT sector and proximity to Mumbai's VFS centre make immigration processing convenient.",
  "Gandhinagar": "Gujarat's capital and home to GIFT City — India's first International Financial Services Centre — Gandhinagar produces finance, IT, and government professionals eligible for Express Entry and EU Blue Card programs. The city's planned infrastructure and high literacy rate mean applicants typically have strong documentation and language scores.",
  // Haryana cities
  "Faridabad": "As Haryana's most populous city and part of the NCR, Faridabad's manufacturing, automotive, and engineering sectors produce skilled workers who score well on Express Entry. The city's proximity to Delhi's VFS Global centre and multiple IELTS coaching institutes make the immigration process accessible. Faridabad professionals in mechanical and electrical engineering find strong matches with Canada's NOC in-demand list.",
  "Ambala": "Ambala, at the crossroads of Haryana and Punjab, serves as a key immigration hub for the region. The city's defence, scientific instruments, and food processing industries produce candidates eligible for LMIA and Express Entry. Ambala's strong educational infrastructure (including Ambala Cantonment's coaching centres) helps applicants achieve competitive IELTS scores.",
  "Karnal": "Known as the 'Rice Bowl of India,' Karnal's agriculture-tech and dairy research sectors (NDRI, CSSRI) produce professionals with specialized skills valued by Canada's agri-food immigration streams. The city's growing IT and education sectors are also driving Express Entry and study visa applications. Karnal's affordable cost of living ensures applicants easily meet proof-of-funds requirements.",
  "Panipat": "The 'City of Weavers' has diversified beyond textiles into oil refining and IT. Panipat professionals in manufacturing and engineering increasingly pursue Canada PR through Express Entry and LMIA pathways. The city's proximity to Delhi's VFS centre and strong community networks in Canada's Ontario make family sponsorship a popular pathway.",
  // Rajasthan cities
  "Jodhpur": "The 'Blue City' of Rajasthan has a growing IT and tourism sector producing candidates for Canada Express Entry and Australia skilled migration. Jodhpur's IIT and AIIMS campuses generate highly qualified medical and engineering graduates who consistently score high CRS points. The city's handicraft and hospitality professionals also find pathways through LMIA work permits.",
  "Udaipur": "The 'City of Lakes' has a thriving tourism, hospitality, and IT sector. Udaipur's hotel management graduates are in demand for Canada's hospitality LMIA positions. The city's growing tech startup scene and engineering colleges (like CTAE) produce Express Entry-eligible professionals. Udaipur's relatively low cost of living ensures applicants comfortably meet proof-of-funds requirements.",
  "Kota": "Known as India's coaching capital, Kota produces thousands of engineering and medical graduates annually who are prime candidates for Canada Express Entry, Australia skilled migration, and Germany's EU Blue Card. The city's intense academic culture means applicants typically have strong educational credentials. Many Kota students transition through study visa to PGWP to PR pathways.",
};

const regionMap: Record<string, string> = {
  // Punjab
  "Ludhiana": "Punjab, India", "Amritsar": "Punjab, India", "Jalandhar": "Punjab, India",
  "Mohali": "Punjab, India", "Chandigarh": "Punjab, India", "Bathinda": "Punjab, India",
  "Patiala": "Punjab, India", "Hoshiarpur": "Punjab, India", "Moga": "Punjab, India",
  "Pathankot": "Punjab, India",
  // Gujarat
  "Ahmedabad": "Gujarat, India", "Vadodara": "Gujarat, India", "Rajkot": "Gujarat, India",
  "Surat": "Gujarat, India", "Gandhinagar": "Gujarat, India",
  // Haryana
  "Gurugram": "Haryana, India", "Faridabad": "Haryana, India", "Ambala": "Haryana, India",
  "Karnal": "Haryana, India", "Panipat": "Haryana, India",
  // Rajasthan
  "Jaipur": "Rajasthan, India", "Jodhpur": "Rajasthan, India", "Udaipur": "Rajasthan, India",
  "Kota": "Rajasthan, India",
};

const getStateTag = (name: string) => regionMap[name] || "India";
const getStateName = (name: string) => {
  const r = regionMap[name];
  return r ? r.split(",")[0].trim() : null;
};

const indianCities: CityData[] = [
  "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Pune", "Ahmedabad", "Kolkata",
  "Lucknow", "Jaipur", "Chandigarh", "Noida", "Gurugram", "Indore", "Patna", "Bhubaneswar",
  "Coimbatore", "Vadodara", "Nagpur", "Rajkot", "Varanasi", "Kanpur", "Nashik", "Agra", "Cochin",
  "Ludhiana", "Amritsar", "Jalandhar", "Mohali", "Bathinda", "Patiala", "Hoshiarpur", "Moga", "Pathankot",
  "Surat", "Gandhinagar", "Faridabad", "Ambala", "Karnal", "Panipat", "Jodhpur", "Udaipur", "Kota"
].map((name) => {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  const region = getStateTag(name);
  const state = getStateName(name);
  const hasState = !!state;
  const stateLabel = state || "India";
  return {
    slug,
    name,
    country: "india" as const,
    region,
    metaTitle: hasState
      ? `Best Immigration Consultant in ${name}, ${stateLabel} | Canada PR, LMIA & Study Visa – 4 Aces Visa`
      : `Best Immigration Consultant in ${name} | Canada, Australia & Germany PR – 4 Aces Visa`,
    metaDescription: hasState
      ? `Top-rated immigration consultant in ${name}, ${stateLabel}. Expert help for Canada PR, Express Entry, LMIA work permits, PNP & study permits from ${name}. Free assessment. 98% success rate.`
      : `Looking for a trusted immigration consultant in ${name}? 4 Aces Visa helps with Canada PR, Australia migration, Germany work visa, study permits & more. Free assessment.`,
    intro: hasState
      ? `If you're in ${name}, ${stateLabel} looking to immigrate, 4 Aces Visa is your trusted partner. We offer expert guidance for Canada Express Entry, LMIA work permits, PNP applications, study permits, and more. Our ${name} specialists have helped hundreds of ${stateLabel} families achieve their immigration goals with a 98% success rate.`
      : `Are you in ${name} and dreaming of settling abroad? 4 Aces Visa is your trusted immigration partner in ${name}, offering expert guidance for Canada PR, Australia skilled migration, and Germany Job Seeker Visa. Our ${name} team has helped hundreds of local professionals and families achieve their global immigration goals with a 98% success rate.`,
    localInsight: indianCityInsights[name] || `${name} has a growing pool of immigration-ready professionals. Our local expertise helps ${name} residents navigate complex visa processes with confidence.`,
    services: [
      `Canada Express Entry PR from ${name}`,
      `Australia Skilled Migration (189/190/491)`,
      `Germany Job Seeker Visa & EU Blue Card`,
      `Study Visa for Canada & Australia`,
      `Work Permits & LMIA Processing`,
      `Provincial Nominee Programs (PNP)`,
      `Family Sponsorship & Visitor Visa`,
    ],
    testimonial: {
      name: `Client from ${name}`,
      text: `4 Aces Visa made my Canada PR journey seamless. From document prep in ${name} to landing in Canada — every step was guided perfectly.`,
      visa: "Canada PR",
    },
    faqs: [
      { question: `Who is the best immigration consultant in ${name}?`, answer: `4 Aces Visa is rated among the top immigration consultants in ${name}, with a 98% success rate across Canada, Australia, and Germany immigration applications. We offer personalized pathway guidance, transparent pricing, and free initial assessments.` },
      { question: `How much does Canada PR cost from ${name}?`, answer: `Canada PR costs from ${name} include government fees (CAD 1,365), IELTS exam (~₹16,000), WES evaluation (~₹15,000), and consulting fees. 4 Aces Visa offers transparent all-inclusive packages. Book a free consultation for an exact quote.` },
      { question: `Can I apply for Australia PR from ${name}?`, answer: `Yes! Many professionals from ${name} qualify for Australia's skilled migration program. You need 65+ points, an occupation on the Skilled Occupation List, and a valid skills assessment. Our ${name} team handles the entire process.` },
      { question: `What documents do I need for Germany visa from ${name}?`, answer: `For Germany Job Seeker Visa from ${name}, you need a recognized degree, proof of funds (~€11,208 blocked account), health insurance, and ideally B1 German proficiency. Contact our ${name} office for a document checklist.` },
    ],
  };
});

const canadianCityInsights: Record<string, string> = {
  "Toronto": "Canada's largest city and the GTA is the top destination for newcomers, processing more PR applications than any other region. Toronto's diverse economy in finance, tech, and healthcare means strong LMIA opportunities and the Ontario PNP is one of the most active streams.",
  "Vancouver": "BC's gateway city attracts immigrants with its Pacific Rim connections and strong tech sector. The BC PNP Tech stream offers fast-tracked processing for in-demand occupations, and Vancouver's mild climate is a major draw for families.",
  "Calgary": "Alberta's economic engine offers lower cost of living than Toronto/Vancouver with strong oil & gas, tech, and agriculture sectors. The Alberta Advantage Immigration Program (AAIP) provides additional PR pathways beyond Express Entry.",
  "Edmonton": "Alberta's capital is experiencing rapid growth in tech and healthcare. Edmonton offers more affordable housing than other major cities, and the AAIP frequently targets occupations in healthcare, trades, and engineering.",
  "Mississauga": "Part of the GTA, Mississauga has one of Canada's largest South Asian communities and a thriving corporate sector. Many newcomers choose Mississauga for its proximity to Toronto with more affordable housing options.",
  "Ottawa": "Canada's capital has a strong public sector and growing tech industry (Kanata North). Ottawa's bilingual environment can boost CRS scores for French-speaking applicants by 20-50 points.",
  "Winnipeg": "Manitoba's capital is one of Canada's most immigrant-friendly cities, with the MPNP being one of the most accessible provincial nominee programs. Lower CRS scores are often sufficient through provincial streams.",
  "Quebec City": "Quebec's capital operates under its own immigration system (ARRIMA). French proficiency is essential but opens doors to faster processing and dedicated Quebec-specific skilled worker programs.",
  "Brampton": "Known as the 'Flower City,' Brampton has one of Canada's fastest-growing populations driven by immigration. Strong logistics, manufacturing, and healthcare sectors create consistent LMIA opportunities.",
  "Surrey": "BC's second-largest city offers a more affordable alternative to Vancouver while maintaining access to BC PNP streams. Surrey's growing tech corridor and diverse community make it a top choice for newcomers.",
  "Halifax": "Nova Scotia's capital offers the Atlantic Immigration Program (AIP) — one of Canada's fastest PR pathways. Lower competition and growing demand for skilled workers make Halifax increasingly attractive.",
  "London ON": "Southwestern Ontario's hub has a strong healthcare and education sector. London's moderate size qualifies for rural and northern immigration streams with additional CRS points.",
  "Kitchener": "Part of the Waterloo Region tech triangle, Kitchener attracts tech immigrants with its startup ecosystem. The Ontario PNP Tech stream frequently draws candidates working in this corridor.",
  "Victoria": "BC's capital offers a unique blend of government, tech, and tourism employment. Victoria's exceptional quality of life and BC PNP access make it a sought-after destination for families.",
  "Saskatoon": "Saskatchewan's largest city offers the SINP — one of Canada's most accessible PNPs with lower minimum requirements. Strong agriculture, mining, and growing tech sectors drive labour demand.",
  "Regina": "Saskatchewan's capital actively recruits immigrants through SINP. Regina's affordable housing and strong job market in government, agriculture, and energy make it ideal for newcomers seeking quick settlement.",
  "Hamilton": "The 'Steel City' is transforming into a healthcare and tech hub. Just 45 minutes from Toronto, Hamilton offers GTA proximity with significantly lower living costs and Ontario PNP eligibility.",
  "Windsor": "Directly across from Detroit, Windsor's unique cross-border economy creates LMIA opportunities in automotive, logistics, and manufacturing. The city's affordable housing is a major draw for newcomers.",
  "Kelowna": "BC's Okanagan gem offers lifestyle-focused immigration with growing tech, wine, and tourism industries. Rural and northern BC PNP streams provide additional pathways for Kelowna-bound applicants.",
  "Richmond": "Part of Metro Vancouver, Richmond has the highest percentage of Chinese-speaking residents in North America. Strong connections to Asian business networks create unique entrepreneurial immigration opportunities.",
  "Thunder Bay": "Northwestern Ontario's hub qualifies for Northern Ontario immigration streams with additional CRS points. Healthcare and natural resources sectors actively seek skilled immigrants.",
  "Moncton": "New Brunswick's hub city offers the Atlantic Immigration Program and one of Canada's lowest costs of living. Moncton's bilingual community is especially welcoming to French-speaking immigrants.",
  "Saint John": "New Brunswick's port city offers AIP pathways and a tight labour market actively seeking skilled workers. Lower competition means faster processing and easier job matching.",
  "Charlottetown": "PEI's capital runs one of Canada's most active PNP programs relative to its size. Charlottetown's close-knit community and strong settlement services make it ideal for newcomer families.",
  "Prince George": "Northern BC's largest city qualifies for rural and northern immigration streams. Strong forestry, healthcare, and education sectors create consistent demand for skilled immigrants.",
  "Scarborough": "Part of Toronto's east end, Scarborough has one of Canada's most diverse immigrant populations with thriving South Asian, Chinese, and Filipino communities. The area's strong healthcare, retail, and transit infrastructure creates consistent LMIA opportunities, while its affordable housing relative to downtown Toronto makes it a top landing destination for newcomers.",
  "Milton": "One of Canada's fastest-growing towns, Milton in Halton Region has seen a massive influx of South Asian immigrants. Its proximity to Toronto, excellent schools, and growing commercial sector make it ideal for newcomer families. Milton's logistics and warehouse industry generates strong LMIA-based work permit opportunities.",
  "Waterloo": "Home to the University of Waterloo and a globally recognized tech corridor, Waterloo attracts skilled immigrants in software, AI, and engineering. The Waterloo Region's startup ecosystem rivals Silicon Valley in density, and the Ontario PNP Tech stream frequently targets professionals in this corridor.",
  // BC cities
  "Abbotsford": "The heart of BC's Fraser Valley, Abbotsford has a large South Asian (Punjabi) community and a strong agriculture and transportation sector. The BC PNP regional streams offer expedited processing for Abbotsford-bound applicants. Many newcomers choose Abbotsford for its affordable housing, proximity to Vancouver, and strong community support networks.",
  "Burnaby": "Metro Vancouver's third-largest city, Burnaby is home to SFU, BCIT, and a booming tech corridor (Metrotown, Brentwood). The city's diverse economy in film, tech, and retail creates strong LMIA opportunities. Burnaby's excellent transit connections to Vancouver and more affordable housing make it a preferred landing destination for newcomers.",
  "Nanaimo": "Vancouver Island's second city offers a relaxed lifestyle with growing healthcare, education, and tourism sectors. Nanaimo qualifies for BC PNP regional pilot programs, and its lower cost of living compared to Vancouver makes it attractive for families. The city's Vancouver Island University produces study-to-PR pathway candidates.",
  "Kamloops": "BC's interior hub has a strong forestry, mining, healthcare, and education economy. Thompson Rivers University makes Kamloops a study visa destination with PGWP-to-PR pathways. The city's affordable housing and BC PNP regional streams make it an increasingly popular choice for newcomers seeking quality of life outside Metro Vancouver.",
};

const canadianProvinceMap: Record<string, string> = {
  "Toronto": "Ontario, Canada", "Mississauga": "Ontario, Canada", "Brampton": "Ontario, Canada",
  "Ottawa": "Ontario, Canada", "London ON": "Ontario, Canada", "Kitchener": "Ontario, Canada",
  "Hamilton": "Ontario, Canada", "Windsor": "Ontario, Canada", "Thunder Bay": "Ontario, Canada",
  "Scarborough": "Ontario, Canada", "Milton": "Ontario, Canada", "Waterloo": "Ontario, Canada",
  "Vancouver": "British Columbia, Canada", "Surrey": "British Columbia, Canada",
  "Victoria": "British Columbia, Canada", "Kelowna": "British Columbia, Canada",
  "Richmond": "British Columbia, Canada", "Prince George": "British Columbia, Canada",
  "Abbotsford": "British Columbia, Canada", "Burnaby": "British Columbia, Canada",
  "Nanaimo": "British Columbia, Canada", "Kamloops": "British Columbia, Canada",
};

const canadianCities: CityData[] = [
  "Toronto", "Vancouver", "Calgary", "Edmonton", "Mississauga", "Ottawa", "Winnipeg",
  "Quebec City", "Brampton", "Surrey", "Halifax", "London ON", "Kitchener", "Victoria",
  "Saskatoon", "Regina", "Hamilton", "Windsor", "Kelowna", "Richmond", "Thunder Bay",
  "Moncton", "Saint John", "Charlottetown", "Prince George", "Scarborough", "Milton", "Waterloo",
  "Abbotsford", "Burnaby", "Nanaimo", "Kamloops"
].map((name) => {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  return {
    slug,
    name,
    country: "canada" as const,
    region: canadianProvinceMap[name] || "Canada",
    metaTitle: `Immigration Services in ${name} | PR, Work Permit & Sponsorship – 4 Aces Visa`,
    metaDescription: `Need immigration help in ${name}? 4 Aces Visa offers PR applications, work permits, family sponsorship, and citizenship guidance in ${name}. Free consultation.`,
    intro: `Welcome to 4 Aces Visa ${name} — your local immigration partner for all visa and PR needs. Whether you're a newcomer looking to extend your status, sponsor your family, or transition from a work permit to permanent residency, our ${name} team provides hands-on guidance every step of the way.`,
    localInsight: canadianCityInsights[name] || `${name} offers unique immigration advantages with local PNP streams and a welcoming community for newcomers.`,
    services: [
      `PR Application & Express Entry in ${name}`,
      `Work Permit Extensions & LMIA`,
      `Family Sponsorship (Spouse, Parents, Children)`,
      `Citizenship Application`,
      `Provincial Nominee Program (PNP)`,
      `Study Permit & Post-Graduation Work Permit`,
      `Visitor Visa & Super Visa`,
    ],
    testimonial: {
      name: `Client in ${name}`,
      text: `The ${name} team at 4 Aces Visa helped me sponsor my parents. The entire process was smooth and stress-free. Highly recommended!`,
      visa: "Family Sponsorship",
    },
    faqs: [
      { question: `What immigration services are available in ${name}?`, answer: `4 Aces Visa in ${name} offers Express Entry PR, work permits, family sponsorship, PNP applications, study permits, visitor visas, and citizenship guidance. Book a free consultation to discuss your specific needs.` },
      { question: `How long does PR processing take from ${name}?`, answer: `Express Entry PR processing from ${name} typically takes 6 months after receiving an Invitation to Apply (ITA). PNP-based applications may take 12-18 months. Our ${name} team expedites every step.` },
      { question: `Can I sponsor my family from ${name}?`, answer: `Yes! If you're a Canadian PR or citizen in ${name}, you can sponsor your spouse, common-law partner, parents, and dependent children. Processing times vary — spousal sponsorship takes about 12 months.` },
      { question: `Do you offer in-person consultations in ${name}?`, answer: `Yes, 4 Aces Visa offers both in-person and virtual consultations in ${name}. Book a free initial assessment online or call our ${name} office.` },
    ],
  };
});

export const cities: CityData[] = [...indianCities, ...canadianCities];
