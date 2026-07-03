// Wave 11A — Immigrate as a [Profession]: /immigrate-as/:profession
export type ProfessionSlug =
  | "nurse"
  | "software-engineer"
  | "doctor"
  | "teacher"
  | "accountant"
  | "truck-driver"
  | "electrician"
  | "welder"
  | "chef"
  | "construction-worker";

export interface ProfessionGuide {
  slug: ProfessionSlug;
  name: string;
  shortName: string;
  oneLiner: string;
  who: string;
  processingTime: string;
  fee: string;
  keyRule: string;
  outcome: string;
  steps: string[];
  pitfalls: string[];
  faqs: { q: string; a: string }[];
}

const mk = (
  slug: ProfessionSlug, name: string, shortName: string, oneLiner: string,
  who: string, processingTime: string, fee: string, keyRule: string, outcome: string,
  steps: string[], pitfalls: string[],
  faqs: [string, string][],
): ProfessionGuide => ({
  slug, name, shortName, oneLiner, who, processingTime, fee, keyRule, outcome,
  steps, pitfalls, faqs: faqs.map(([q, a]) => ({ q, a })),
});

export const PROFESSIONS: Record<ProfessionSlug, ProfessionGuide> = {
  "nurse": mk(
    "nurse",
    "Immigrate to Canada as a Nurse — Full Pathway Guide",
    "Nurse to Canada",
    "Registered Nurses (NOC 31301) qualify for direct PR through Express Entry healthcare category-based draws plus every provincial Health Authority stream.",
    "Internationally educated nurses (RNs, RPNs, LPNs) with a recognised nursing degree and licensure.",
    "NNAS assessment: 6-12 months. PR via category draw: 6-8 months after ITA.",
    "NNAS USD 650 + NCLEX-RN USD 360 + Express Entry CAD 1,525.",
    "Must register with the provincial regulator (CNO, BCCNM, CRNA, CRNS) before practising.",
    "Direct PR + provincial nursing licence + RN job at CAD 38-52/hr.",
    [
      "Start NNAS credential assessment (mandatory for most provinces)",
      "Write IELTS Academic (most regulators need 6.5-7.0)",
      "Pass NCLEX-RN or jurisprudence exam for the target province",
      "Create Express Entry profile under NOC 31301 — wait for healthcare category draw",
      "Receive ITA, submit PR application with provincial regulator letter"
    ],
    [
      "Skipping NNAS — every province requires it for IEN registration",
      "Assuming home-country licence transfers directly — bridging may be required",
      "Underestimating IELTS — many regulators need 7.0 in speaking and listening",
      "Choosing a province without checking RN demand — Atlantic Canada and Saskatchewan are fastest"
    ],
    [
      ["Do I need a job offer to immigrate as a nurse?", "No — healthcare category-based Express Entry draws regularly issue ITAs to nurses without a job offer. A job offer adds 50-200 CRS points."],
      ["How long does the whole process take?", "Plan for 18-24 months: NNAS (6-12 months), licensing exams (3-6 months), Express Entry (6-8 months after ITA)."]
    ],
  ),
  "software-engineer": mk(
    "software-engineer",
    "Immigrate to Canada as a Software Engineer — PR Pathways",
    "Software Engineer to Canada",
    "Software engineers (NOC 21231) are eligible for STEM category-based Express Entry draws, every tech-stream PNP, and the Global Talent Stream for fast LMIA work permits.",
    "Developers, software engineers, architects, DevOps and SRE with a CS degree or equivalent experience.",
    "Express Entry: 6 months from ITA. PNP tech draws: monthly nominations.",
    "ECA via WES CAD 285 + Express Entry CAD 1,525 + PNP fee CAD 0-2,000.",
    "No mandatory provincial licence — engineering title 'P.Eng' is optional unless signing engineering work.",
    "PR + CAD 90-150K salary in Toronto/Vancouver/Montreal tech hubs.",
    [
      "Get an Educational Credential Assessment (WES, ICAS or IQAS)",
      "Write IELTS or CELPIP — target CLB 9+ for max points",
      "Submit Express Entry profile under NOC 21231 or 21232",
      "Watch for STEM category draws (CRS cut-off historically 470-490)",
      "Apply to BC, Ontario, Alberta tech PNP streams in parallel for backup"
    ],
    [
      "Using 'P.Eng' title in job ads without licensing — regulatory offence in most provinces",
      "Targeting only Toronto — Calgary and Halifax tech ecosystems have lower CRS thresholds",
      "Ignoring the Global Talent Stream — 2-week work permit option if you have a Canadian job offer",
      "Submitting EE without language results — profile won't be scored"
    ],
    [
      ["Is there a tech-specific Express Entry draw?", "Yes — IRCC runs STEM occupation category-based draws several times a year. Software engineering NOCs (21231, 21232) are always included."],
      ["Do I need a job offer to get tech PR?", "No — most software engineers immigrate without one. A job offer adds points but slows down the process."]
    ],
  ),
  "doctor": mk(
    "doctor",
    "Immigrate to Canada as a Doctor (IMG) — Full Pathway",
    "Doctor to Canada",
    "Internationally trained doctors (NOC 31100-31102) need MCC exams, residency match, and provincial licensure before practising — but qualify for direct PR via healthcare category draws.",
    "International medical graduates with MD and post-grad clinical experience.",
    "MCC exams: 6-18 months. Residency match: 1-2 cycles. PR: 6-8 months after ITA.",
    "MCCQE Part 1 CAD 1,460 + NAC OSCE CAD 2,860 + provincial licensure varies.",
    "Must complete Canadian residency or hold practice-ready assessment to practise medicine.",
    "PR + provincial medical licence + family medicine income CAD 250-350K, specialist CAD 300-500K.",
    [
      "Verify medical school in World Directory of Medical Schools (WDOMS)",
      "Pass MCCQE Part 1 (medical knowledge exam)",
      "Pass NAC OSCE (clinical skills exam)",
      "Apply to CaRMS (Canadian Residency Matching Service) or provincial Practice Ready Assessment",
      "File Express Entry under NOC 31102 — apply via healthcare category draw"
    ],
    [
      "Assuming you can practise immediately — Canadian residency or PRA is mandatory",
      "Choosing provinces without IMG-friendly residency seats — Saskatchewan, NL, Manitoba have more openings",
      "Skipping locum/clinical observership — strengthens CaRMS application",
      "Underestimating PRA cost — full assessment can exceed CAD 30,000"
    ],
    [
      ["Can I work as a doctor immediately on landing?", "No — you must hold a Canadian medical licence (CMQ, CPSO, etc.). Most IMGs spend 2-5 years on PRA or residency before independent practice."],
      ["Is there a faster route for family doctors?", "Yes — provincial Practice Ready Assessment (PRA) programs in BC, Alberta, Saskatchewan, Manitoba, Ontario can get you licensed in 12-24 months without redoing residency."]
    ],
  ),
  "teacher": mk(
    "teacher",
    "Immigrate to Canada as a Teacher — Provincial Certification & PR",
    "Teacher to Canada",
    "Teachers (NOC 41220 secondary, 41221 elementary) need provincial certification (OCT in Ontario, BC TC, etc.) — and qualify for the education category-based Express Entry draws launched in 2025.",
    "Internationally trained teachers with B.Ed and 1+ year teaching experience.",
    "Teacher certification: 3-6 months. PR: 6-8 months after ITA.",
    "Certification CAD 200-500 per province + Express Entry CAD 1,525.",
    "Each province sets its own teaching standards — Ontario College of Teachers is the largest.",
    "PR + provincial teaching certificate + entry-level salary CAD 50-70K, top-of-grid CAD 100K+.",
    [
      "Get an ECA (WES) for your B.Ed and any post-graduate degrees",
      "Apply to the provincial College of Teachers (OCT, BC TC, ATA, etc.)",
      "Complete additional pedagogy course if required by the regulator",
      "Submit Express Entry under NOC 41220/41221 — watch for education category draws",
      "Apply to school boards for permanent or supply teaching roles"
    ],
    [
      "Confusing 'teaching' (early childhood, NOC 42202) with 'teacher' (school, NOC 41220+)",
      "Skipping provincial certification — you cannot work in public schools without it",
      "Applying to one province only — Atlantic Canada and Saskatchewan have shorter wait lists",
      "Forgetting French requirement for Francophone school boards"
    ],
    [
      ["Is teaching in the education category Express Entry draws?", "Yes — NOC 41220 (secondary) and 41221 (elementary) are included in the 2025 IRCC education category. CRS cut-offs have been 430-470."],
      ["Can I teach without provincial certification?", "Only in private/independent schools that don't require it. All public schools and most private schools demand provincial College of Teachers membership."]
    ],
  ),
  "accountant": mk(
    "accountant",
    "Immigrate to Canada as an Accountant — CPA & PR Pathway",
    "Accountant to Canada",
    "Accountants (NOC 11100) qualify for general Express Entry, several PNP business streams, and can fast-track CPA designation via CPA Canada's international agreements.",
    "Internationally trained CA, CPA, ACCA, CMA, CIMA holders.",
    "CPA assessment: 3-6 months. PR: 6-8 months after ITA.",
    "CPA Canada international assessment CAD 600 + Express Entry CAD 1,525.",
    "CPA Canada has mutual recognition agreements with major bodies (ICAI, CPA Australia, ACCA, CPA Ireland, etc.).",
    "PR + path to CPA Canada designation + CAD 70-120K salary in finance/audit roles.",
    [
      "Apply to CPA Canada for credential assessment (international applicant route)",
      "Complete required CPA modules (waived if covered by mutual recognition)",
      "Get an ECA (WES) for your degree",
      "Submit Express Entry under NOC 11100 (Financial Auditors and Accountants)",
      "Optional: apply to Ontario, BC, Alberta PNP streams targeting finance"
    ],
    [
      "Confusing 'accountant' (NOC 11100, TEER 1) with 'bookkeeper' (NOC 12200, TEER 2) — only 11100 maps to most PNPs cleanly",
      "Skipping CPA — Big 4 and most senior roles require it",
      "Underestimating tax-law differences — Canadian tax practice has a steep learning curve",
      "Not leveraging ACCA / ICAI mutual recognition — saves 6-18 months of CPA modules"
    ],
    [
      ["Does ACCA transfer to CPA Canada?", "Yes — ACCA has a mutual recognition agreement. You complete a bridging module (CPA Reciprocity Exam) instead of the full CPA program."],
      ["Can ICAI Chartered Accountants get CPA Canada?", "Yes — under the MOU, ICAI CAs in good standing complete the CPA PEP capstone and CFE without redoing the foundation."]
    ],
  ),
  "truck-driver": mk(
    "truck-driver",
    "Immigrate to Canada as a Truck Driver — Full PR & LMIA Routes",
    "Truck Driver to Canada",
    "Long-haul truck drivers (NOC 73300) are in massive shortage — most immigrate via LMIA + employer-sponsored PR through PNPs in Saskatchewan, Manitoba, Alberta and Ontario.",
    "Drivers with Class 1 / heavy-vehicle experience.",
    "LMIA: 8-12 weeks. PNP nomination: 3-9 months. PR: 6-12 months total.",
    "LMIA CAD 1,000 (employer-paid) + PNP fee CAD 0-2,000 + PR CAD 1,525.",
    "Class 1 commercial licence must be obtained in your destination province after landing.",
    "Work permit on landing, then PR via Saskatchewan Long-Haul Trucker stream, Manitoba MPNP, or Alberta AAIP.",
    [
      "Find a Canadian trucking employer willing to sponsor LMIA",
      "Receive LMIA + employer job offer, apply for closed work permit",
      "Land in Canada, complete provincial Class 1 / Class A licence",
      "Work 6-12 months for the sponsoring employer",
      "Apply for provincial nomination via the truck-driver stream → file PR"
    ],
    [
      "Falling for fake job offers — verify LMIA approval number with employer",
      "Assuming foreign Class A licence transfers directly — every province re-tests",
      "Working short-haul (NOC 75201) when contract says long-haul — risks PR refusal",
      "Switching employers before nomination — closed work permits restrict you"
    ],
    [
      ["Is there a direct Express Entry route for truck drivers?", "Sometimes — IRCC has run transport category draws. Most truckers, though, go LMIA + PNP because CRS scores without a degree rarely clear EE cut-offs."],
      ["Which province is easiest for trucker PR?", "Saskatchewan's Long-Haul Truck Driver Project is the most direct — 6 months of work plus employer support is enough to apply for nomination."]
    ],
  ),
  "electrician": mk(
    "electrician",
    "Immigrate to Canada as an Electrician — Red Seal & PR",
    "Electrician to Canada",
    "Electricians (NOC 72200) qualify for the Federal Skilled Trades Program, every provincial trades stream, and the trades category-based Express Entry draws — high demand across all 10 provinces.",
    "Construction or industrial electricians with 4+ years experience.",
    "Trade assessment: 3-6 months. PR via FSTP: 6 months from ITA.",
    "Trade assessment CAD 500-1,500 + Express Entry CAD 1,525.",
    "Provincial trade authority (e.g. SkilledTradesBC, Ontario College of Trades) certifies experience — Red Seal opens national mobility.",
    "PR + Red Seal endorsement + CAD 32-48/hr, journeyperson rate CAD 50+/hr in BC/Alberta.",
    [
      "Get trade qualification assessed by the destination province (e.g. SkilledTradesBC)",
      "Pass the provincial Certificate of Qualification challenge exam",
      "Sit the Red Seal exam (interprovincial) — opens nationwide work rights",
      "Submit FSTP profile or apply through trades category Express Entry draws",
      "Optional: secure a Canadian job offer for LMIA + immediate work permit"
    ],
    [
      "Confusing 'industrial electrician' (NOC 72201) with 'construction electrician' (72200) — different exams",
      "Skipping Red Seal — limits you to one province",
      "Underestimating language requirement — FSTP needs CLB 5 speaking/listening and CLB 4 reading/writing",
      "Applying without recent work experience — must be in last 5 years"
    ],
    [
      ["Do I need Red Seal to immigrate?", "Not strictly — but the trades category Express Entry draws and most PNPs effectively require certification. Red Seal is the strongest single document."],
      ["Which province has the highest demand?", "Alberta and BC for industrial electricians (energy, mining, infrastructure). Ontario for construction electricians (residential/commercial boom)."]
    ],
  ),
  "welder": mk(
    "welder",
    "Immigrate to Canada as a Welder — Red Seal & PR Pathway",
    "Welder to Canada",
    "Welders (NOC 72106) are in chronic shortage — Federal Skilled Trades Program, trades category-based Express Entry draws, and PNPs all welcome certified welders.",
    "TIG, MIG, structural and pipeline welders with 4+ years experience.",
    "Trade assessment: 3-6 months. PR via FSTP: 6 months from ITA.",
    "Trade assessment CAD 500-1,500 + Express Entry CAD 1,525.",
    "CWB (Canadian Welding Bureau) certification is the industry-standard credential.",
    "PR + CWB tickets + CAD 28-45/hr (industrial/pipeline welders can earn CAD 55+/hr).",
    [
      "Get welding tickets assessed via CWB Group international division",
      "Sit Canadian Welding Bureau practical and theory tests",
      "Optional: complete provincial trade qualification for Red Seal endorsement",
      "Submit FSTP profile or apply through trades category Express Entry draws",
      "Optional: secure job offer with a CWB-certified employer for LMIA route"
    ],
    [
      "Skipping CWB — most fabrication shops only hire CWB-certified welders",
      "Assuming international tickets transfer — Canadian standards (CSA W47.1) differ",
      "Targeting only Alberta — Ontario and Quebec have strong manufacturing demand too",
      "Ignoring language requirements — FSTP still needs CLB 5/4"
    ],
    [
      ["Do I need to redo my welding tickets in Canada?", "Yes — CWB requires a Canadian practical test. Your international experience helps you pass quickly but the test is mandatory."],
      ["Is welding part of Express Entry?", "Yes — NOC 72106 is included in trades category-based draws. Cut-offs have been 425-440, much lower than general draws."]
    ],
  ),
  "chef": mk(
    "chef",
    "Immigrate to Canada as a Chef — PR via Trades & Hospitality PNPs",
    "Chef to Canada",
    "Chefs (NOC 62200) qualify for Federal Skilled Trades Program, Atlantic Immigration Program, Rural Northern Immigration Pilot, and almost every PNP hospitality stream.",
    "Chefs, sous chefs, and head cooks with 4+ years professional kitchen experience.",
    "PR via FSTP: 6 months from ITA. AIP: 6-12 months.",
    "Express Entry CAD 1,525 + provincial or AIP fee CAD 0-2,000.",
    "Red Seal Cook endorsement is preferred by most employers and required by some PNPs.",
    "PR + working in Canadian kitchens at CAD 22-36/hr (CAD 45+ for head chef roles).",
    [
      "Document 4+ years of full-time chef experience (reference letters, payslips)",
      "Get an ECA for any culinary diploma",
      "Apply to FSTP under NOC 62200 or get a Canadian job offer for LMIA",
      "Optional: pursue AIP via an Atlantic restaurant employer for faster PR",
      "Optional: Rural Northern Immigration Pilot communities actively recruit chefs"
    ],
    [
      "Claiming chef status when working as a line cook (NOC 63200) — IRCC checks job duties",
      "Skipping reference letters with NOC duty wording — most refusals are documentation",
      "Targeting only Toronto — Atlantic Canada and rural pilots have far shorter waits",
      "Forgetting Red Seal Cook — opens better wages and PNP options"
    ],
    [
      ["Is 'cook' different from 'chef' for immigration?", "Yes — chef (NOC 62200, TEER 2) carries more leadership and menu-planning duties than cook (NOC 63200, TEER 3). They unlock different programs."],
      ["Which pilot program is best for chefs?", "Atlantic Immigration Program if you can find a designated Atlantic employer. Rural Northern Immigration Pilot for smaller towns. Both move faster than Express Entry."]
    ],
  ),
  "construction-worker": mk(
    "construction-worker",
    "Immigrate to Canada as a Construction Worker — PR Pathways",
    "Construction Worker to Canada",
    "Construction trades workers (NOC 75110, 73100, 72310, 72320) are eligible for Federal Skilled Trades Program, Out-of-Status Construction Workers Pilot, and several PNP construction streams.",
    "Carpenters, framers, drywallers, concrete finishers, and general construction labourers.",
    "FSTP: 6 months from ITA. Out-of-Status pilot: 12-18 months.",
    "Express Entry CAD 1,525 + provincial fee CAD 0-2,000.",
    "Skilled trades workers need provincial trade certification; labourers (NOC 75110) do not but have fewer PR options.",
    "PR + trade certification + CAD 28-42/hr depending on trade and region.",
    [
      "Identify your exact NOC: carpenter (72310), bricklayer (72320), labourer (75110), etc.",
      "Get trade qualification assessed by destination province if you target FSTP",
      "For labourers without trade certification: pursue employer-sponsored LMIA + PNP route",
      "If already in Canada without status: apply via Out-of-Status Construction Workers Pilot (Ontario only)",
      "File Express Entry profile + apply to relevant PNP construction stream"
    ],
    [
      "Listing yourself as a 'general labourer' when actual duties match a skilled trade — undersells you",
      "Skipping trade certification — labourers (NOC 75110) have few direct PR routes",
      "Ignoring the Out-of-Status pilot — only chance for many GTA workers without status",
      "Targeting only Toronto — Calgary, Edmonton, Vancouver have construction booms"
    ],
    [
      ["Can a general construction labourer get PR?", "Yes but harder — NOC 75110 isn't FSTP-eligible. Most labourers go LMIA + PNP, Atlantic Immigration Program, or Rural Northern Immigration Pilot."],
      ["What is the Out-of-Status Construction Workers Pilot?", "A small Ontario-only IRCC pilot allowing undocumented construction workers in the GTA to apply for PR with a union letter and tax history. Caps are very limited."]
    ],
  ),
};

export const PROFESSION_LIST = Object.values(PROFESSIONS);
export function getProfession(slug: string | undefined): ProfessionGuide | null {
  if (!slug) return null;
  return PROFESSIONS[slug as ProfessionSlug] ?? null;
}