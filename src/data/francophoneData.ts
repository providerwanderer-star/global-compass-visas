// Wave 6A — French / Francophone pathway pages: /francophone/:pathway
export type FrancophoneSlug =
  | "francophone-mobility-program"
  | "category-based-french-draws"
  | "quebec-prtq"
  | "quebec-peq"
  | "tef-canada-prep";

export interface FrancophonePathway {
  slug: FrancophoneSlug;
  name: string;
  shortName: string;
  oneLiner: string;
  whoQualifies: string;
  processingTime: string;
  govFees: string;
  keyRequirements: string[];
  steps: { t: string; d: string }[];
  rejectionReasons: string[];
  faqs: { q: string; a: string }[];
}

export const FRANCOPHONE_PATHWAYS: Record<FrancophoneSlug, FrancophonePathway> = {
  "francophone-mobility-program": {
    slug: "francophone-mobility-program",
    name: "Francophone Mobility Program (LMIA-exempt C16)",
    shortName: "Francophone Mobility",
    oneLiner: "LMIA-exempt closed work permit for French-speaking workers destined to any province outside Quebec.",
    whoQualifies: "Foreign nationals with a valid Canadian job offer outside Quebec who can demonstrate at least NCLC 5 oral proficiency in French.",
    processingTime: "4–8 weeks (varies by visa office)",
    govFees: "CAD 155 work permit + CAD 230 employer compliance fee",
    keyRequirements: [
      "TEF Canada / TCF Canada — minimum NCLC 5 in oral comprehension and oral expression",
      "Valid job offer from a Canadian employer outside Quebec (any NOC TEER)",
      "Employer must submit an offer of employment via the Employer Portal",
      "Proof of intent to leave Canada at end of stay (for some visa offices)"
    ],
    steps: [
      { t: "Take TEF Canada or TCF Canada", d: "Score at least NCLC 5 in oral expression and oral comprehension. Reading and writing not required." },
      { t: "Secure a job offer outside Quebec", d: "Any NOC TEER level qualifies. Employer needs no LMIA — exemption code C16 applies." },
      { t: "Employer files Offer of Employment", d: "Through the Employer Portal — pays CAD 230 compliance fee, gets an offer number." },
      { t: "Apply for the work permit", d: "Submit online with the offer number, TEF/TCF results and standard documents." },
      { t: "Land and start work", d: "Spouse gets an open work permit; kids get free K-12 schooling." }
    ],
    rejectionReasons: [
      "TEF/TCF score below NCLC 5 in oral skills",
      "Job offer in Quebec (Quebec is excluded — use PEQ or Quebec work permit instead)",
      "Officer doubts genuineness of job offer or French ability",
      "Missing employer offer number / unpaid compliance fee"
    ],
    faqs: [
      { q: "Do I need a job offer in French to qualify?", a: "No — the job can be in English or any language. Only your French ability matters, not the language of work." },
      { q: "Can my spouse work in Canada?", a: "Yes — the spouse of a Francophone Mobility work-permit holder gets an open work permit valid for the same duration." },
      { q: "Does this lead to PR?", a: "Indirectly — after 1 year of skilled work you qualify for Express Entry CEC, plus French-proficiency category-based draws give 25–50 bonus CRS points." },
      { q: "Is Quebec covered?", a: "No — Quebec is excluded. For Quebec, use the PEQ or a regular Quebec work permit with CAQ." },
      { q: "How long is the work permit?", a: "Typically issued for the duration of the job offer, up to 3 years; renewable from inside Canada." }
    ],
  },
  "category-based-french-draws": {
    slug: "category-based-french-draws",
    name: "Express Entry French-Proficiency Category Draws",
    shortName: "French Category Draws",
    oneLiner: "Lower CRS cut-offs for Express Entry candidates with strong French — the single biggest PR shortcut in 2026.",
    whoQualifies: "Express Entry candidates with NCLC 7+ in all four French abilities (reading, writing, listening, speaking).",
    processingTime: "6–8 months from ITA to PR",
    govFees: "CAD 1,365 single applicant / CAD 2,710 couple",
    keyRequirements: [
      "Active Express Entry profile",
      "TEF Canada or TCF Canada with NCLC 7+ in all four abilities",
      "All standard CEC / FSW eligibility (work experience, ECA, language)",
      "Proof of funds unless invited under CEC"
    ],
    steps: [
      { t: "Take TEF or TCF Canada", d: "Target NCLC 7 minimum in all four abilities. Most candidates need 6–9 months of structured prep from an Indian/Anglophone background." },
      { t: "Create / update Express Entry profile", d: "Enter your French scores. The profile is automatically pooled for French category draws." },
      { t: "Wait for category-based ITA", d: "French draw cut-offs in 2024–2025 ranged from 379 to 478 — far below general draws (524–542)." },
      { t: "Submit complete PR application", d: "60 days to upload PCC, medicals, employment proofs, language tests, ECA and fees." },
      { t: "Land in any province", d: "Most files complete in 6–8 months from ITA." }
    ],
    rejectionReasons: [
      "TEF/TCF scores below NCLC 7 in any one ability (writing is the most common fail)",
      "Profile claims French but TEF results expire before COPR",
      "Misrepresentation of language scores or work experience"
    ],
    faqs: [
      { q: "How much lower is the French draw CRS?", a: "Historically 50–150 points lower than general draws — the largest gap of any category." },
      { q: "Do I also need English?", a: "No. French alone qualifies you. But English NCLC 5+ adds extra CRS points." },
      { q: "How do I prep for TEF from India?", a: "Plan for 400–600 hours of structured French study. Alliance Française (Delhi/Mumbai/Bangalore) offers DELF/TEF prep tracks." },
      { q: "Is TCF Canada accepted?", a: "Yes — IRCC accepts both TEF Canada and TCF Canada. Pick whichever your test centre offers sooner." },
      { q: "Can I claim PNP boost too?", a: "Yes — French + provincial nomination is the single highest-CRS profile possible." }
    ],
  },
  "quebec-prtq": {
    slug: "quebec-prtq",
    name: "Quebec Skilled Worker Program (PRTQ)",
    shortName: "Quebec PRTQ",
    oneLiner: "Quebec's main skilled-worker PR program — application via Arrima Expression of Interest.",
    whoQualifies: "Foreign skilled workers with French ability (recommended), education and work experience valued by Quebec's labour market.",
    processingTime: "12–24 months end-to-end (Arrima → CSQ → federal PR)",
    govFees: "CAD ~890 CSQ application + CAD 1,365 federal PR fees",
    keyRequirements: [
      "Submit Arrima Expression of Interest (free, valid 12 months)",
      "Score competitive on Quebec's points grid (employment, training, French, age)",
      "TEF Quebec or TCF Quebec (B2 oral strongly recommended for invitation)",
      "Federal admissibility (medical, security, criminal)"
    ],
    steps: [
      { t: "Submit Arrima EOI", d: "Free online profile in the Arrima portal. Valid 12 months." },
      { t: "Receive invitation from MIFI", d: "Quebec's Ministry of Immigration issues invitations periodically based on labour-market needs and points." },
      { t: "Apply for the CSQ", d: "Submit the Selection Certificate application within 60 days of invitation. Pay CAD ~890." },
      { t: "Apply for federal PR", d: "Once CSQ is issued, apply to IRCC for permanent residence. Federal step is mostly admissibility checks." },
      { t: "Land in Quebec", d: "PR card issued; you commit to settling in Quebec." }
    ],
    rejectionReasons: [
      "Insufficient French — most invitations now require B2 oral",
      "Arrima profile not updated (scores recalculated dynamically)",
      "Foreign diploma not on Quebec's preferred list (Liste des domaines de formation)",
      "Federal admissibility failure (medical, criminality, misrepresentation)"
    ],
    faqs: [
      { q: "Do I need French to apply?", a: "Technically no, but practically yes — recent Arrima draws have been almost exclusively for candidates with B2 oral French." },
      { q: "Can I live outside Quebec on a Quebec PR?", a: "Legally PR is portable, but the program assumes intent to settle in Quebec. Misrepresenting intent risks PR cancellation." },
      { q: "How long does Arrima → landing take?", a: "Typically 12–24 months end-to-end across MIFI + IRCC." },
      { q: "Is there a job offer requirement?", a: "No — but a validated Quebec job offer adds significant points and can almost guarantee invitation." },
      { q: "What's the difference vs PEQ?", a: "PEQ is for graduates of Quebec institutions or Quebec workers already in-province. PRTQ is the open skilled-worker stream." }
    ],
  },
  "quebec-peq": {
    slug: "quebec-peq",
    name: "Programme de l'expérience québécoise (PEQ)",
    shortName: "Quebec PEQ",
    oneLiner: "Fast-track Quebec PR for graduates of Quebec institutions and skilled workers already working in Quebec.",
    whoQualifies: "Two streams: (1) graduates of recognised Quebec diplomas, (2) temporary foreign workers with 24 months of full-time skilled work in Quebec.",
    processingTime: "6 months (CSQ) + 12–18 months (federal PR)",
    govFees: "CAD ~890 CSQ + CAD 1,365 federal PR fees",
    keyRequirements: [
      "Graduate stream: Quebec diploma + 12 months Quebec work in TEER 0/1/2/3",
      "Worker stream: 24 months of skilled Quebec work in last 48 months",
      "TEF/TCF Quebec — oral B2 (NCLC 7) minimum",
      "Intent to live in Quebec"
    ],
    steps: [
      { t: "Confirm eligibility stream", d: "Graduate (Quebec diploma + 12 mo work) or worker (24 mo skilled work in Quebec)." },
      { t: "Pass TEF/TCF Quebec at B2 oral", d: "Mandatory. No exemption — even native French speakers must take the test." },
      { t: "Submit PEQ + CSQ application", d: "Online via Arrima. Pay CAD ~890. MIFI typically decides in 6 months." },
      { t: "Apply for federal PR", d: "Submit IRCC PR application with the CSQ." },
      { t: "Land and stay in Quebec", d: "PR issued; commit to residing in Quebec." }
    ],
    rejectionReasons: [
      "Quebec diploma not on the recognised list",
      "Work experience in non-eligible NOC (TEER 4/5)",
      "TEF/TCF below B2 oral",
      "Gaps in work history within the 48-month window"
    ],
    faqs: [
      { q: "Do I need 24 months work if I graduated in Quebec?", a: "No — graduates need only 12 months of post-graduation skilled work in Quebec." },
      { q: "Does part-time work count?", a: "No — only full-time work (30+ hrs/week) in TEER 0/1/2/3 is counted." },
      { q: "Is Anglophone study in Quebec allowed?", a: "Yes — diplomas from McGill, Concordia, Bishop's count, but you still need TEF/TCF B2 oral in French." },
      { q: "How does PEQ compare to PRTQ?", a: "PEQ is faster (6 months vs 12+) and has a fixed eligibility checklist instead of competitive Arrima draws." },
      { q: "Can I switch from PEQ to a federal program?", a: "Yes — many candidates also keep an Express Entry profile active for the French category draws as a backup." }
    ],
  },
  "tef-canada-prep": {
    slug: "tef-canada-prep",
    name: "TEF Canada / TCF Canada Prep Guide",
    shortName: "TEF / TCF Prep",
    oneLiner: "How to go from zero French to NCLC 7 — the threshold for Express Entry French category draws.",
    whoQualifies: "Anyone targeting Francophone Mobility (NCLC 5) or French category Express Entry draws (NCLC 7).",
    processingTime: "6–12 months of structured prep typically",
    govFees: "TEF Canada ~CAD 405 / TCF Canada ~CAD 405 (including reading, writing, listening, speaking)",
    keyRequirements: [
      "Choose TEF Canada or TCF Canada (both accepted by IRCC)",
      "Target NCLC 5 (Francophone Mobility) or NCLC 7+ (Express Entry French draws)",
      "Book test centre 2–3 months in advance — limited capacity globally",
      "Results valid 2 years for IRCC purposes"
    ],
    steps: [
      { t: "Pick test and target NCLC", d: "TEF Canada and TCF Canada are both accepted. NCLC 5 = Francophone Mobility, NCLC 7 = French category draws." },
      { t: "Diagnostic test", d: "Take a free online TEF/TCF mock to identify weakest skill (usually writing for English-first speakers)." },
      { t: "Structured prep — 400–600 hours", d: "Alliance Française tracks (Delhi/Mumbai/Bangalore), DELF B1→B2 path, Lawless French, Coffee Break French podcasts." },
      { t: "Take 2–3 full mocks", d: "TV5Monde, Bonjour de France and France Éducation International publish free mocks." },
      { t: "Book the official test", d: "Test centres in Delhi, Mumbai, Bangalore, Toronto, Vancouver. Slots fill 2–3 months ahead." }
    ],
    rejectionReasons: [
      "Writing scored below NCLC 7 — most common fail for STEM candidates",
      "Listening section under-practised vs reading",
      "Speaking section affected by lack of conversational practice"
    ],
    faqs: [
      { q: "How long does it really take to reach NCLC 7?", a: "From zero, plan 9–12 months of consistent daily practice (1–2 hrs/day). From A2/B1, 4–6 months is realistic." },
      { q: "TEF or TCF — which is easier?", a: "TCF tends to be slightly more academic; TEF is more communicative. Pick whichever your test centre offers sooner." },
      { q: "Are results valid for both PR and work permits?", a: "Yes — results valid 2 years for IRCC, used for both Francophone Mobility and Express Entry." },
      { q: "Do I need a tutor?", a: "Recommended for writing and speaking. Reading and listening can be self-studied with apps + podcasts." },
      { q: "Can I take the test in Canada?", a: "Yes — Alliance Française centres in Toronto, Vancouver, Calgary and others offer regular dates." }
    ],
  },
};

export const FRANCOPHONE_LIST = Object.values(FRANCOPHONE_PATHWAYS);
export const getFrancophonePathway = (slug?: string) =>
  slug ? FRANCOPHONE_PATHWAYS[slug as FrancophoneSlug] : undefined;
