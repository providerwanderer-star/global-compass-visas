export interface NOCEntry {
  code: string;
  title: string;
  teer: 0 | 1 | 2 | 3 | 4 | 5;
  category: string;
  eeEligible: boolean;
  altTitles: string[];
  salaryRange: string; // CAD/year
  topProvinces: string[];
  description: string;
}

export const nocCategories = [
  "Information Technology",
  "Healthcare",
  "Engineering",
  "Business & Finance",
  "Trades & Skilled",
  "Transportation",
  "Education",
  "Agriculture & Food",
] as const;

export const nocData: NOCEntry[] = [
  // ── INFORMATION TECHNOLOGY ──────────────────────────────────────────────
  {
    code: "21211",
    title: "Data Scientist",
    teer: 1,
    category: "Information Technology",
    eeEligible: true,
    altTitles: ["Machine Learning Engineer", "AI Engineer", "Data Analyst", "Analytics Scientist"],
    salaryRange: "$85,000 – $145,000",
    topProvinces: ["Ontario", "British Columbia", "Alberta"],
    description:
      "Designs and implements algorithms and statistical models to extract insights from large datasets. High demand across finance, healthcare, and tech sectors.",
  },
  {
    code: "21232",
    title: "Software Developer",
    teer: 1,
    category: "Information Technology",
    eeEligible: true,
    altTitles: ["Software Engineer", "Web Developer", "Full-Stack Developer", "Backend Developer", "Frontend Developer"],
    salaryRange: "$75,000 – $135,000",
    topProvinces: ["Ontario", "British Columbia", "Quebec"],
    description:
      "Designs, codes, tests, and maintains software applications. One of Canada's highest-demand occupations under Express Entry's STEM category draws.",
  },
  {
    code: "21220",
    title: "Cybersecurity Specialist",
    teer: 1,
    category: "Information Technology",
    eeEligible: true,
    altTitles: ["Information Security Analyst", "Security Engineer", "Network Security Specialist", "Penetration Tester"],
    salaryRange: "$80,000 – $140,000",
    topProvinces: ["Ontario", "British Columbia", "Alberta"],
    description:
      "Protects computer systems and networks from cyber threats. Growing field with strong government and private sector demand.",
  },
  {
    code: "21221",
    title: "Database Analyst",
    teer: 1,
    category: "Information Technology",
    eeEligible: true,
    altTitles: ["DBA", "Database Administrator", "Data Engineer", "Database Developer"],
    salaryRange: "$70,000 – $110,000",
    topProvinces: ["Ontario", "Alberta", "British Columbia"],
    description:
      "Designs, installs, monitors, and maintains database management systems. Essential in enterprise and cloud environments.",
  },
  {
    code: "21234",
    title: "Web Designer",
    teer: 2,
    category: "Information Technology",
    eeEligible: true,
    altTitles: ["UX Designer", "UI Developer", "Digital Designer", "Interaction Designer"],
    salaryRange: "$55,000 – $90,000",
    topProvinces: ["Ontario", "British Columbia", "Quebec"],
    description:
      "Creates the visual design and user experience of websites and web applications.",
  },
  {
    code: "22220",
    title: "Computer Network Technician",
    teer: 2,
    category: "Information Technology",
    eeEligible: true,
    altTitles: ["Network Administrator", "IT Support Technician", "Systems Administrator", "Help Desk Technician"],
    salaryRange: "$50,000 – $85,000",
    topProvinces: ["Ontario", "Alberta", "British Columbia"],
    description:
      "Installs, configures, and maintains computer networks and related infrastructure.",
  },

  // ── HEALTHCARE ───────────────────────────────────────────────────────────
  {
    code: "31301",
    title: "Registered Nurse",
    teer: 1,
    category: "Healthcare",
    eeEligible: true,
    altTitles: ["RN", "Critical Care Nurse", "Emergency Nurse", "Psychiatric Nurse"],
    salaryRange: "$75,000 – $110,000",
    topProvinces: ["Ontario", "British Columbia", "Alberta"],
    description:
      "Provides direct patient care, administers medications, and collaborates with medical teams. Targeted in Express Entry healthcare category draws.",
  },
  {
    code: "31111",
    title: "Family Physician",
    teer: 0,
    category: "Healthcare",
    eeEligible: true,
    altTitles: ["General Practitioner", "GP", "Primary Care Doctor", "Family Doctor"],
    salaryRange: "$220,000 – $350,000",
    topProvinces: ["Ontario", "Alberta", "British Columbia", "Saskatchewan"],
    description:
      "Provides primary healthcare services including diagnosis, treatment, and preventive care. Severe shortage across Canada, especially in rural areas.",
  },
  {
    code: "31120",
    title: "Dentist",
    teer: 0,
    category: "Healthcare",
    eeEligible: true,
    altTitles: ["General Dentist", "Dental Surgeon", "Oral Health Specialist"],
    salaryRange: "$150,000 – $280,000",
    topProvinces: ["Ontario", "British Columbia", "Alberta"],
    description:
      "Diagnoses, prevents, and treats diseases and conditions of the oral cavity.",
  },
  {
    code: "32120",
    title: "Dental Hygienist",
    teer: 2,
    category: "Healthcare",
    eeEligible: true,
    altTitles: ["Dental Therapist", "Oral Health Therapist", "Dental Hygiene Practitioner"],
    salaryRange: "$60,000 – $90,000",
    topProvinces: ["Ontario", "British Columbia", "Alberta"],
    description:
      "Cleans teeth, examines patients for signs of oral diseases, and provides preventive care and treatment.",
  },
  {
    code: "33102",
    title: "Personal Support Worker",
    teer: 3,
    category: "Healthcare",
    eeEligible: true,
    altTitles: ["PSW", "Home Support Worker", "Care Aide", "Personal Care Attendant"],
    salaryRange: "$35,000 – $55,000",
    topProvinces: ["Ontario", "British Columbia", "Alberta"],
    description:
      "Provides personal care and assistance to elderly, disabled, or ill individuals. High demand especially post-pandemic.",
  },
  {
    code: "31204",
    title: "Pharmacist",
    teer: 1,
    category: "Healthcare",
    eeEligible: true,
    altTitles: ["Clinical Pharmacist", "Hospital Pharmacist", "Retail Pharmacist", "Pharmacy Specialist"],
    salaryRange: "$95,000 – $140,000",
    topProvinces: ["Ontario", "Alberta", "British Columbia"],
    description:
      "Dispenses prescription medications, advises patients on drug interactions, and manages medication therapy.",
  },
  {
    code: "32101",
    title: "Licensed Practical Nurse (LPN)",
    teer: 2,
    category: "Healthcare",
    eeEligible: true,
    altTitles: ["LPN", "Registered Practical Nurse", "RPN", "Vocational Nurse"],
    salaryRange: "$55,000 – $80,000",
    topProvinces: ["Ontario", "Alberta", "British Columbia", "Manitoba"],
    description:
      "Provides nursing care under the direction of registered nurses or physicians. Targeted in Express Entry healthcare category draws.",
  },
  {
    code: "31302",
    title: "Nurse Practitioner",
    teer: 1,
    category: "Healthcare",
    eeEligible: true,
    altTitles: ["NP", "Advanced Practice Nurse", "Primary Care NP"],
    salaryRange: "$95,000 – $140,000",
    topProvinces: ["Ontario", "British Columbia", "Alberta"],
    description:
      "Diagnoses and treats patients with extended scope of practice. Eligible for Express Entry healthcare draws — among lowest CRS cut-offs.",
  },
  {
    code: "31303",
    title: "Physician Assistant / Midwife / Allied Health",
    teer: 1,
    category: "Healthcare",
    eeEligible: true,
    altTitles: ["Midwife", "Physician Assistant", "PA"],
    salaryRange: "$80,000 – $130,000",
    topProvinces: ["Ontario", "British Columbia", "Manitoba"],
    description:
      "Provides clinical care under physician supervision or independent midwifery services. Targeted by healthcare category draws.",
  },
  {
    code: "32102",
    title: "Paramedic / Emergency Medical Responder",
    teer: 2,
    category: "Healthcare",
    eeEligible: true,
    altTitles: ["EMT", "Advanced Care Paramedic", "Primary Care Paramedic"],
    salaryRange: "$55,000 – $90,000",
    topProvinces: ["Ontario", "Alberta", "British Columbia"],
    description:
      "Responds to medical emergencies, provides pre-hospital care, and transports patients. High demand across all provinces.",
  },
  {
    code: "31202",
    title: "Physiotherapist",
    teer: 1,
    category: "Healthcare",
    eeEligible: true,
    altTitles: ["PT", "Physical Therapist", "Sports Physiotherapist"],
    salaryRange: "$72,000 – $110,000",
    topProvinces: ["Ontario", "British Columbia", "Alberta"],
    description:
      "Assesses and treats patients with physical impairments. Targeted by healthcare category Express Entry draws.",
  },
  {
    code: "31203",
    title: "Occupational Therapist",
    teer: 1,
    category: "Healthcare",
    eeEligible: true,
    altTitles: ["OT", "Rehabilitation Therapist"],
    salaryRange: "$70,000 – $105,000",
    topProvinces: ["Ontario", "British Columbia", "Alberta"],
    description:
      "Helps patients develop daily-living skills after injury or illness. Eligible for healthcare category draws.",
  },
  {
    code: "31112",
    title: "Specialist Physician (Internal/Surgery/Psychiatry)",
    teer: 0,
    category: "Healthcare",
    eeEligible: true,
    altTitles: ["Surgeon", "Psychiatrist", "Cardiologist", "Anesthesiologist", "Pediatrician"],
    salaryRange: "$280,000 – $500,000+",
    topProvinces: ["Ontario", "Alberta", "British Columbia", "Quebec"],
    description:
      "Diagnoses and treats specialized medical conditions. Severe shortage — healthcare category Express Entry priority.",
  },
  {
    code: "31100",
    title: "Optometrist",
    teer: 1,
    category: "Healthcare",
    eeEligible: true,
    altTitles: ["Eye Care Specialist", "Vision Care Doctor"],
    salaryRange: "$110,000 – $180,000",
    topProvinces: ["Ontario", "Alberta", "British Columbia"],
    description:
      "Examines eyes, prescribes corrective lenses, and detects ocular diseases.",
  },
  {
    code: "31201",
    title: "Chiropractor",
    teer: 1,
    category: "Healthcare",
    eeEligible: true,
    altTitles: ["DC", "Doctor of Chiropractic"],
    salaryRange: "$70,000 – $130,000",
    topProvinces: ["Ontario", "British Columbia", "Alberta"],
    description:
      "Diagnoses and treats musculoskeletal disorders, especially of the spine.",
  },
  {
    code: "31209",
    title: "Other Health Diagnosing & Treating Professional",
    teer: 1,
    category: "Healthcare",
    eeEligible: true,
    altTitles: ["Naturopath", "Audiologist", "Speech-Language Pathologist", "Dietitian"],
    salaryRange: "$65,000 – $110,000",
    topProvinces: ["Ontario", "British Columbia", "Alberta"],
    description:
      "Includes audiologists, dietitians, and speech-language pathologists. Healthcare category eligible.",
  },
  {
    code: "32109",
    title: "Medical Laboratory Technologist",
    teer: 2,
    category: "Healthcare",
    eeEligible: true,
    altTitles: ["Med Lab Tech", "MLT", "Cytotechnologist"],
    salaryRange: "$60,000 – $90,000",
    topProvinces: ["Ontario", "Alberta", "British Columbia"],
    description:
      "Performs medical laboratory tests to assist in diagnosis and treatment of patients.",
  },
  {
    code: "32121",
    title: "Medical Radiation Technologist",
    teer: 2,
    category: "Healthcare",
    eeEligible: true,
    altTitles: ["X-Ray Technologist", "MRI Tech", "CT Tech", "Radiographer"],
    salaryRange: "$65,000 – $95,000",
    topProvinces: ["Ontario", "Alberta", "British Columbia"],
    description:
      "Operates medical imaging equipment. Healthcare category Express Entry eligible.",
  },
  {
    code: "41301",
    title: "Social Worker",
    teer: 1,
    category: "Healthcare",
    eeEligible: true,
    altTitles: ["MSW", "Clinical Social Worker", "Community Social Worker"],
    salaryRange: "$58,000 – $90,000",
    topProvinces: ["Ontario", "British Columbia", "Alberta"],
    description:
      "Helps individuals, families, and groups address social and personal problems. High demand in mental health and child welfare.",
  },
  {
    code: "41320",
    title: "Psychologist",
    teer: 1,
    category: "Healthcare",
    eeEligible: true,
    altTitles: ["Clinical Psychologist", "Counselling Psychologist", "PhD Psychology"],
    salaryRange: "$80,000 – $140,000",
    topProvinces: ["Ontario", "British Columbia", "Alberta"],
    description:
      "Assesses and treats mental, emotional, and behavioural disorders. Healthcare category eligible.",
  },

  // ── ENGINEERING ──────────────────────────────────────────────────────────
  {
    code: "21301",
    title: "Civil Engineer",
    teer: 1,
    category: "Engineering",
    eeEligible: true,
    altTitles: ["Structural Engineer", "Construction Engineer", "Transportation Engineer", "Environmental Engineer"],
    salaryRange: "$75,000 – $120,000",
    topProvinces: ["Ontario", "Alberta", "British Columbia"],
    description:
      "Designs and oversees construction of infrastructure such as roads, bridges, buildings, and water systems.",
  },
  {
    code: "21310",
    title: "Electrical Engineer",
    teer: 1,
    category: "Engineering",
    eeEligible: true,
    altTitles: ["Power Systems Engineer", "Electronics Engineer", "Telecommunications Engineer"],
    salaryRange: "$80,000 – $130,000",
    topProvinces: ["Ontario", "Alberta", "British Columbia"],
    description:
      "Designs and develops electrical systems, equipment, and components for various industries.",
  },
  {
    code: "21321",
    title: "Mechanical Engineer",
    teer: 1,
    category: "Engineering",
    eeEligible: true,
    altTitles: ["Manufacturing Engineer", "Design Engineer", "HVAC Engineer", "Automotive Engineer"],
    salaryRange: "$78,000 – $125,000",
    topProvinces: ["Ontario", "Alberta", "Quebec"],
    description:
      "Designs, develops, and tests mechanical devices and systems including machinery, engines, and tools.",
  },
  {
    code: "21330",
    title: "Chemical Engineer",
    teer: 1,
    category: "Engineering",
    eeEligible: true,
    altTitles: ["Process Engineer", "Petroleum Engineer", "Environmental Process Engineer"],
    salaryRange: "$82,000 – $135,000",
    topProvinces: ["Alberta", "Ontario", "Saskatchewan"],
    description:
      "Designs and develops processes for manufacturing chemicals, petroleum products, and other materials.",
  },

  // ── BUSINESS & FINANCE ───────────────────────────────────────────────────
  {
    code: "11100",
    title: "Financial Auditor",
    teer: 1,
    category: "Business & Finance",
    eeEligible: true,
    altTitles: ["CPA", "Accountant", "Tax Accountant", "Financial Analyst", "Controller"],
    salaryRange: "$65,000 – $120,000",
    topProvinces: ["Ontario", "British Columbia", "Alberta"],
    description:
      "Examines financial records to ensure accuracy and compliance with regulations. CPA designation highly valued.",
  },
  {
    code: "11102",
    title: "Financial Planner",
    teer: 1,
    category: "Business & Finance",
    eeEligible: true,
    altTitles: ["Financial Advisor", "Wealth Manager", "Investment Advisor", "CFP"],
    salaryRange: "$65,000 – $130,000",
    topProvinces: ["Ontario", "British Columbia", "Alberta"],
    description:
      "Advises clients on financial goals including retirement planning, investments, and insurance.",
  },
  {
    code: "10010",
    title: "HR Manager",
    teer: 0,
    category: "Business & Finance",
    eeEligible: true,
    altTitles: ["Human Resources Director", "People Operations Manager", "Talent Manager", "HR Director"],
    salaryRange: "$90,000 – $150,000",
    topProvinces: ["Ontario", "British Columbia", "Alberta"],
    description:
      "Plans, organizes, and directs human resources activities within an organization.",
  },

  // ── TRADES & SKILLED ─────────────────────────────────────────────────────
  {
    code: "72200",
    title: "Electrician",
    teer: 2,
    category: "Trades & Skilled",
    eeEligible: true,
    altTitles: ["Journeyman Electrician", "Industrial Electrician", "Construction Electrician", "Master Electrician"],
    salaryRange: "$65,000 – $100,000",
    topProvinces: ["Alberta", "British Columbia", "Ontario"],
    description:
      "Installs and maintains electrical systems in residential, commercial, and industrial buildings. Red-Seal trade with high demand.",
  },
  {
    code: "72320",
    title: "Plumber",
    teer: 2,
    category: "Trades & Skilled",
    eeEligible: true,
    altTitles: ["Steamfitter", "Pipefitter", "Gasfitter", "Plumbing Contractor"],
    salaryRange: "$60,000 – $95,000",
    topProvinces: ["Alberta", "Ontario", "British Columbia"],
    description:
      "Installs and repairs pipes and fixtures for water, gas, steam, and waste disposal systems.",
  },
  {
    code: "72021",
    title: "Welder",
    teer: 2,
    category: "Trades & Skilled",
    eeEligible: true,
    altTitles: ["Boilermaker", "Metal Fabricator", "Structural Welder", "MIG/TIG Welder"],
    salaryRange: "$55,000 – $90,000",
    topProvinces: ["Alberta", "Saskatchewan", "Ontario"],
    description:
      "Operates welding equipment to join metal parts used in construction, manufacturing, and oil & gas.",
  },
  {
    code: "72310",
    title: "Carpenter",
    teer: 2,
    category: "Trades & Skilled",
    eeEligible: true,
    altTitles: ["Cabinet Maker", "Construction Carpenter", "Finish Carpenter", "Millwright"],
    salaryRange: "$50,000 – $85,000",
    topProvinces: ["British Columbia", "Ontario", "Alberta"],
    description:
      "Constructs and repairs frameworks and structures made of wood and other materials.",
  },

  // ── TRANSPORTATION ────────────────────────────────────────────────────────
  {
    code: "73300",
    title: "Transport Truck Driver",
    teer: 3,
    category: "Transportation",
    eeEligible: true,
    altTitles: ["Long Haul Truck Driver", "Semi-Truck Driver", "18-Wheeler Driver", "Commercial Driver"],
    salaryRange: "$50,000 – $80,000",
    topProvinces: ["Alberta", "Ontario", "British Columbia"],
    description:
      "Operates heavy transport trucks to deliver goods across provinces and internationally. Class 1/A licence required.",
  },
  {
    code: "72024",
    title: "Heavy Equipment Operator",
    teer: 2,
    category: "Transportation",
    eeEligible: true,
    altTitles: ["Crane Operator", "Excavator Operator", "Bulldozer Operator", "Loader Operator"],
    salaryRange: "$58,000 – $95,000",
    topProvinces: ["Alberta", "British Columbia", "Saskatchewan"],
    description:
      "Operates heavy construction and mining equipment such as cranes, excavators, and bulldozers.",
  },

  // ── EDUCATION ─────────────────────────────────────────────────────────────
  {
    code: "41220",
    title: "Secondary School Teacher",
    teer: 1,
    category: "Education",
    eeEligible: true,
    altTitles: ["High School Teacher", "Math Teacher", "Science Teacher", "ESL Teacher"],
    salaryRange: "$65,000 – $100,000",
    topProvinces: ["Ontario", "British Columbia", "Alberta"],
    description:
      "Teaches academic, technical, and vocational subjects to students in secondary school.",
  },
  {
    code: "41210",
    title: "Elementary School Teacher",
    teer: 1,
    category: "Education",
    eeEligible: true,
    altTitles: ["Primary School Teacher", "Kindergarten Teacher", "Special Needs Teacher"],
    salaryRange: "$60,000 – $95,000",
    topProvinces: ["Ontario", "British Columbia", "Alberta"],
    description:
      "Teaches children from kindergarten through Grade 8 in a range of subjects.",
  },

  // ── AGRICULTURE & FOOD ────────────────────────────────────────────────────
  {
    code: "82030",
    title: "Agricultural Equipment Operator",
    teer: 3,
    category: "Agriculture & Food",
    eeEligible: true,
    altTitles: ["Farm Worker", "Crop Farmer", "Combine Operator", "Greenhouse Worker"],
    salaryRange: "$35,000 – $55,000",
    topProvinces: ["Saskatchewan", "Alberta", "Ontario"],
    description:
      "Operates farm machinery such as tractors and combines for crop production and harvesting.",
  },
  {
    code: "94141",
    title: "Food and Beverage Processing Worker",
    teer: 4,
    category: "Agriculture & Food",
    eeEligible: false,
    altTitles: ["Meat Cutter", "Food Processing Labourer", "Packing Plant Worker"],
    salaryRange: "$32,000 – $50,000",
    topProvinces: ["Alberta", "Ontario", "Manitoba"],
    description:
      "Operates machines and performs manual tasks in food and beverage processing plants.",
  },
];

export const teerInfo: Record<number, { label: string; color: string; description: string }> = {
  0: {
    label: "TEER 0",
    color: "bg-purple-100 text-purple-800 border-purple-200",
    description: "Management occupations — usually university + years of experience",
  },
  1: {
    label: "TEER 1",
    color: "bg-green-100 text-green-800 border-green-200",
    description: "University degree required — Express Entry eligible",
  },
  2: {
    label: "TEER 2",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    description: "College diploma or 2+ year apprenticeship — Express Entry eligible",
  },
  3: {
    label: "TEER 3",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    description: "High school + short training — Express Entry eligible",
  },
  4: {
    label: "TEER 4",
    color: "bg-orange-100 text-orange-800 border-orange-200",
    description: "High school only — NOT eligible for Express Entry",
  },
  5: {
    label: "TEER 5",
    color: "bg-red-100 text-red-800 border-red-200",
    description: "Short work demonstration only — NOT eligible for Express Entry",
  },
};
