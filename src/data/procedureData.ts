// Wave 12C — Procedural how-to pages: /procedure/:topic
export type ProcedureSlug =
  | "biometrics-collection"
  | "upfront-medical-exam"
  | "police-certificate-canada"
  | "gcms-notes-request"
  | "webform-ircc"
  | "schedule-a-background"
  | "sponsorship-undertaking"
  | "study-permit-extension-online";

export interface ProcedureGuide {
  slug: ProcedureSlug;
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
  slug: ProcedureSlug, name: string, shortName: string, oneLiner: string,
  who: string, processingTime: string, fee: string, keyRule: string, outcome: string,
  steps: string[], pitfalls: string[],
  faqs: [string, string][],
): ProcedureGuide => ({
  slug, name, shortName, oneLiner, who, processingTime, fee, keyRule, outcome,
  steps, pitfalls,
  faqs: faqs.map(([q, a]) => ({ q, a })),
});

export const PROCEDURES: Record<ProcedureSlug, ProcedureGuide> = {
  "biometrics-collection": mk(
    "biometrics-collection", "Biometrics for Canadian Immigration — Cost, Timing & Where", "Biometrics",
    "Biometrics (10 fingerprints + photo) are required for most visa, work permit, study permit and PR applications. Valid for 10 years.",
    "Most applicants aged 14-79 for visa, work/study permit, PR or refugee claim.",
    "Letter sent within days of application; you have 30 days to give biometrics.",
    "CAD 85 individual / CAD 170 family / CAD 255 group performers.",
    "Once given, valid 10 years across most permit applications.",
    "Biometrics linked to application; processing resumes.",
    ["Submit application; receive Biometrics Instruction Letter (BIL)","Book appointment at a Visa Application Centre (VAC) or Application Support Centre (US)","Pay biometrics fee (already included if you paid online)","Attend appointment with BIL, passport and confirmation","Biometrics transmitted to IRCC; processing continues"],
    ["Missing the 30-day deadline — application can be refused","Going to wrong VAC (must be one listed in BIL)","Forgetting BIL or passport — appointment refused","Not paying fee — biometrics not recorded"],
    [["How long does the appointment take?","About 15-30 minutes including fingerprinting and photo."],["Do my old biometrics from 2018 still count?","Yes — biometrics are valid 10 years. Check IRCC account to confirm before paying again."]],
  ),
  "upfront-medical-exam": mk(
    "upfront-medical-exam", "Upfront Medical Exam (IME) — Save Months on Your Application", "Upfront Medical",
    "Doing your Immigration Medical Exam upfront (before IRCC requests it) cuts 2-4 months off processing for many applications.",
    "PR applicants, some work/study permit applicants, refugees, super visa applicants.",
    "Results valid 12 months. Booking turnaround: same week.",
    "CAD 200-400 depending on physician (panel physicians set own prices).",
    "Must be done by IRCC-approved 'panel physician' — regular doctor's exam is not accepted.",
    "Medical results uploaded directly to IRCC; you receive a confirmation slip to attach.",
    ["Find a panel physician on IRCC list near you","Book appointment; bring passport, glasses/lenses, prior medical history","Complete exam (vision, urine, blood tests, X-ray if 11+)","Physician uploads results to IRCC e-Medical system","Receive printed proof; attach IMM 1017E confirmation to your application"],
    ["Using a non-panel doctor — results rejected","Doing medical too early — must be within 12 months of decision","Missing the X-ray or blood tests at follow-up visit","Lost IMM 1017E confirmation — must request reissue"],
    [["Is upfront medical mandatory?","No — but it can save 2-4 months. IRCC will otherwise request medical after initial review."],["What if my medical reveals a health issue?","Most conditions don't refuse admissibility. Excess demand on healthcare or danger to public are the main grounds — many conditions get mitigation plans."]],
  ),
  "police-certificate-canada": mk(
    "police-certificate-canada", "Police Certificates for Canadian Immigration — Country-by-Country", "Police Certificates",
    "Every country where you've lived 6+ months consecutively since age 18 requires a police certificate. Rules and timelines vary by country.",
    "All PR applicants and some work/study permit applicants over 18.",
    "1 week (Canada/UK) to 3 months (India PCC).",
    "Country-specific (Canada CAD 25, India ~INR 500, US FBI USD 18).",
    "Must cover any country where you lived 6+ months since age 18.",
    "PDF certificate uploaded to PR application.",
    ["List every country you've lived in 6+ months consecutively since age 18","Research each country's police certificate process (consulate, FBI, RCMP, etc.)","Submit application with fingerprints/ID as required","Receive certificate (timing varies wildly)","Upload PDF to PR application — translate if not English/French"],
    ["Missing countries you lived in briefly but for 6+ months","Outdated certificates (must usually be <6 months old at submission)","Forgetting US FBI rap sheet if you ever lived/studied in the US","Not getting India PCC apostilled if requested"],
    [["Do I need a Canadian RCMP check if I live in Canada?","Yes if applying for PR from inside Canada (or if you've lived 6+ months in Canada since 18)."],["How fresh must the certificate be?","Generally within 6 months of submission; IRCC asks for updated ones if older."]],
  ),
  "gcms-notes-request": mk(
    "gcms-notes-request", "GCMS Notes Request — How to See Your IRCC File", "GCMS Notes",
    "GCMS (Global Case Management System) notes are the internal IRCC officer notes on your file. Request them via ATIP to see why you were refused or delayed.",
    "Anyone with an IRCC application (current, refused, or in process).",
    "30 days standard (Privacy Act deadline).",
    "Free — no fee.",
    "Must be a Canadian citizen, PR, or person physically present in Canada — others must use a Canadian representative.",
    "PDF notes received via email; reveal officer reasoning, concerns, missing docs.",
    ["Visit IRCC ATIP Online Request portal","Fill in personal info, application UCI and file number","Select 'GCMS notes' or 'CAIPS notes' (varies by application type)","Submit; receive case number","Notes emailed within 30 days as PDF"],
    ["Non-Canadians applying directly — must use Canadian rep","Wrong UCI or file number — request rejected","Treating GCMS as full evidence — only notes, not full record","Filing too early — wait until decision made or significant delay"],
    [["What can GCMS notes reveal?","Officer concerns, missing docs, security check status, processing stage, refusal reasoning, internal scoring."],["Can I appeal a refusal using GCMS notes?","Yes — GCMS notes often reveal the basis to file a Federal Court judicial review or reconsideration request."]],
  ),
  "webform-ircc": mk(
    "webform-ircc", "IRCC Webform — Update Address, Send Docs, Ask Questions", "IRCC Webform",
    "The IRCC webform is the official channel for updating address, sending missing documents, requesting case updates or correcting errors.",
    "Anyone with an active IRCC application or recent decision.",
    "Response 30-60 days (some 90+).",
    "Free.",
    "Use specific case-related categories — generic queries get template responses.",
    "Reference number issued; IRCC responds via email.",
    ["Visit IRCC 'Contact Us' page and select Webform","Enter UCI / application number / passport","Choose enquiry category (case status, document submission, address change, etc.)","Write clear, specific message (one issue per webform)","Submit; save reference number; await email response"],
    ["Sending the same webform 5 times — slows response, doesn't speed it up","Asking for general info instead of case-specific — gets template","Forgetting to update online account address too","Using webform when MP letter or ATIP is faster for delays"],
    [["How long does IRCC take to respond?","30-60 days for most webforms. Urgent humanitarian cases sometimes faster."],["Can I send documents via webform?","Yes — attach PDFs up to 50 MB. For PR apps, use the online portal upload instead when possible."]],
  ),
  "schedule-a-background": mk(
    "schedule-a-background", "Schedule A Background Declaration — How to Fill It Correctly", "Schedule A",
    "Schedule A (IMM 5669) is a background declaration listing every address, job and education for past 10 years. Errors trigger refusals.",
    "All PR applicants 18+; some work/study permit applicants.",
    "Submitted with application.",
    "Free (form itself).",
    "10-year history with NO gaps — even one-month gaps must be accounted for.",
    "Verified against other docs; inconsistencies = refusal for misrepresentation.",
    ["Download IMM 5669 from IRCC site","List every address since age 18 (or 10 years if older) with no gaps","List every job, education, military service, government employment","Declare all family members in Section C","Sign and date; submit with main application"],
    ["Address gaps — even 1 month triggers questions","Forgetting a short job — IRCC cross-checks tax records","Omitting military service in country of origin","Not declaring a family member (even estranged) — misrepresentation"],
    [["What if I don't remember exact dates 10 years ago?","Estimate and note 'approximate.' Better than leaving blank, but try to use tax slips/social media to anchor dates."],["Do I list every short trip?","No — Schedule A is residential addresses (places you lived). Travel is captured elsewhere."]],
  ),
  "sponsorship-undertaking": mk(
    "sponsorship-undertaking", "Sponsorship Undertaking — What You're Legally Committing To", "Sponsorship Undertaking",
    "When you sponsor a family member you sign a binding undertaking to financially support them for 3-20 years, even if circumstances change.",
    "Sponsors of spouse/partner, parents, grandparents or dependent children.",
    "Undertaking signed at PR application; runs from sponsored person's landing date.",
    "No separate fee — part of sponsorship.",
    "Spouse/partner: 3 years. Parent/grandparent: 20 years. Dependent child: 10 years or until 25.",
    "Sponsor legally liable to repay any social assistance the sponsored person receives.",
    ["Sign IMM 1344 Application to Sponsor","Acknowledge financial responsibility for full undertaking period","Maintain residency in Canada during undertaking","Notify sponsored person of obligations to repay you if they use welfare","Repay government for any social assistance the sponsored person receives during undertaking"],
    ["Divorce doesn't end the undertaking — still liable for ex-spouse","Sponsor moving abroad doesn't end the undertaking","Sponsored person on welfare = sponsor billed","Defaulting on prior undertaking blocks future sponsorships"],
    [["Does divorce end my sponsorship liability?","No — undertaking is binding for the full 3 years even after separation or divorce."],["What if the sponsored person uses welfare?","Government will pursue the sponsor for repayment. Outstanding amounts block any future sponsorship attempts."]],
  ),
  "study-permit-extension-online": mk(
    "study-permit-extension-online", "Study Permit Extension Online — Step-by-Step (2025)", "Study Permit Extension",
    "Apply to extend your study permit online at least 30 days before expiry to maintain implied status and full study/work rights.",
    "International students whose current study permit expires soon.",
    "Decision: 60-120 days. Apply 30+ days before expiry to keep implied status.",
    "CAD 150 study permit fee + CAD 85 biometrics if required.",
    "Apply before current permit expires to maintain implied status and PGWP eligibility.",
    "New study permit issued; can continue studies and 24-hour work without break.",
    ["Log into IRCC Secure Account or GCKey","Select 'Apply to extend study permit'","Upload letter of enrolment, proof of funds, valid passport, photo","Pay fees online","Submit at least 30 days before current permit expires for implied status protection"],
    ["Letting permit expire before applying — lose status and PGWP eligibility","Working over 24 hr/week off-campus during academic session — violates conditions","Missing biometrics request — application stalls","Not updating address — decision letter lost"],
    [["What is implied status?","If you apply to extend before your permit expires you can continue studying and working under the SAME conditions until IRCC decides."],["Can I work during extension processing?","Yes if you applied before expiry (implied status). If applied after expiry, work must stop."]],
  ),
};

export const PROCEDURES_LIST = Object.values(PROCEDURES);
export function getProcedure(slug: string | undefined): ProcedureGuide | null {
  if (!slug) return null;
  return PROCEDURES[slug as ProcedureSlug] ?? null;
}