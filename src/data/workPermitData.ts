// Wave 13B — Work permit specializations: /work-permit/:stream
export type WorkPermitSlug =
  | "open-work-permit-spouse"
  | "iec-working-holiday"
  | "iec-young-professionals"
  | "iec-international-coop"
  | "intra-company-transfer"
  | "cusma-professionals"
  | "francophone-mobility"
  | "post-graduation-work-permit";

export interface WorkPermitGuide {
  slug: WorkPermitSlug;
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
  slug: WorkPermitSlug, name: string, shortName: string, oneLiner: string,
  who: string, processingTime: string, fee: string, keyRule: string, outcome: string,
  steps: string[], pitfalls: string[], faqs: [string, string][],
): WorkPermitGuide => ({ slug, name, shortName, oneLiner, who, processingTime, fee, keyRule, outcome, steps, pitfalls, faqs: faqs.map(([q, a]) => ({ q, a })) });

export const WORKPERMITS: Record<WorkPermitSlug, WorkPermitGuide> = {
  "open-work-permit-spouse": mk(
    "open-work-permit-spouse", "Spousal Open Work Permit (SOWP) — Work for Any Employer", "Spousal Open Work Permit",
    "The SOWP lets spouses of skilled workers and most international students work for any Canadian employer, no LMIA needed.",
    "Spouses of TEER 0/1 (and select 2/3) work permit holders or PGWP holders.",
    "Decision: 4–16 weeks; faster outside Canada.",
    "CAD 155 + CAD 100 open work permit holder fee.",
    "Principal applicant must be in eligible occupation per 2024 rule changes.",
    "Open work permit valid for the same duration as the principal applicant's permit.",
    ["Confirm principal applicant's eligibility (TEER 0/1 mainly since March 2024)","Gather marriage certificate or proof of common-law (12 months cohabitation)","Apply online with marriage proof, principal's permit, passport","Pay CAD 255 in fees; give biometrics","Receive open work permit; can start any job"],
    ["2024 narrowing — most TEER 2/3 spouses no longer eligible","Common-law without 12 months of joint documentation — refusal","Working before SOWP issued — illegal","Permit expiring before principal's — must align dates"],
    [["Does the SOWP let me work in healthcare or government?","Yes — open work permits have no occupation restrictions; standard licensing rules apply."],["Did the 2024 changes kill SOWP for spouses of students?","Mostly — only spouses of master's/PhD students or select professional programs remain eligible."]],
  ),
  "iec-working-holiday": mk(
    "iec-working-holiday", "IEC Working Holiday — 1–2 Years Open Work Permit", "IEC Working Holiday",
    "International Experience Canada's Working Holiday stream offers 18–35 year olds from 30+ countries an open work permit for 1–2 years.",
    "Citizens aged 18–35 (or 30) from eligible IEC countries (UK, Australia, France, etc.).",
    "Pool draws: weeks. Permit issue: 4–8 weeks after invitation.",
    "CAD 161 IEC participation + CAD 100 OWP holder fee.",
    "Quotas fill fast — must enter pool early in season.",
    "Open work permit, 12–24 months depending on country agreement.",
    ["Check your country's IEC quota and age limit","Create IRCC account and submit IEC profile to pool","Wait for Invitation to Apply (ITA)","Complete work permit application within 20 days of ITA","Activate permit by entering Canada within 12 months"],
    ["Quota fills in days for popular countries (France, UK)","Turning 36 mid-application — lose eligibility","No travel insurance for full stay — refused at port of entry","Activating permit but not finding work — clock still ticking"],
    [["Can I extend an IEC Working Holiday?","No — it's a one-time-per-category program. Some countries allow a second IEC under a different category (e.g., Young Professionals)."],["Can I do IEC twice?","Most countries allow participation in 2 different categories (e.g., Working Holiday + International Co-op) once each."]],
  ),
  "iec-young-professionals": mk(
    "iec-young-professionals", "IEC Young Professionals — Employer-Specific Work Permit", "IEC Young Professionals",
    "Young Professionals category offers a closed work permit for a specific Canadian job that advances your career, no LMIA required.",
    "18–35 year olds from eligible countries with a Canadian job offer in their field.",
    "Pool: weeks. Permit: 4–8 weeks after ITA.",
    "CAD 161 IEC + CAD 155 work permit + CAD 230 employer compliance fee.",
    "Job must be career-related and skill level NOC TEER 0/1/2/3.",
    "Employer-specific work permit, usually 12–24 months.",
    ["Find Canadian employer willing to support IEC","Employer pays CAD 230 compliance fee via Employer Portal","Submit IEC profile; receive ITA","Apply for work permit citing job offer LMIA-exempt code C21 / C22","Give biometrics; receive permit"],
    ["Job not career-related — refused","Employer not registering on Portal — application stalls","Switching employers requires new work permit","Profile expires after 1 year — must resubmit"],
    [["What if I want to change employers?","You must apply for a new work permit before starting — different from open permit holders."],["Does the employer need an LMIA?","No — IEC is LMIA-exempt under international agreements; only the compliance fee + Employer Portal registration is needed."]],
  ),
  "iec-international-coop": mk(
    "iec-international-coop", "IEC International Co-op — Work Placement for Students", "IEC International Co-op",
    "International Co-op (Internship) stream is for post-secondary students completing a mandatory work placement in Canada as part of their studies.",
    "Enrolled post-secondary students from eligible countries with a confirmed Canadian internship.",
    "Pool: weeks. Permit: 4–8 weeks after ITA.",
    "CAD 161 IEC + CAD 155 work permit + CAD 230 employer compliance fee.",
    "Internship must be required for degree completion — verified by school letter.",
    "Closed work permit valid for the internship duration, up to 12 months.",
    ["Get school letter confirming mandatory work placement","Find Canadian employer; employer registers on Employer Portal","Submit IEC profile; receive ITA","Apply for work permit with school letter + job offer","Receive permit; intern at Canadian employer"],
    ["School letter not mentioning mandatory — refusal","Internship not in field of study — refusal","Working beyond permit end date — illegal","Switching internships requires new permit"],
    [["Can International Co-op lead to PR?","Indirectly — completed Canadian work experience helps CEC/PNP applications later, but is too short for direct PR."],["Can I do this without being a current student?","No — must be actively enrolled and the placement must be part of the program."]],
  ),
  "intra-company-transfer": mk(
    "intra-company-transfer", "Intra-Company Transfer (ICT) — Move Your Job to Canada", "ICT Work Permit",
    "ICT allows multinational employers to transfer executives, senior managers and specialized-knowledge workers to a Canadian branch — no LMIA needed.",
    "Employees of multinationals with a Canadian office, 1+ year of recent service abroad.",
    "Decision: 8–12 weeks.",
    "CAD 155 work permit + CAD 230 employer compliance fee.",
    "Must have worked for the same multinational 1+ of the last 3 years.",
    "Closed work permit valid 1–3 years initially; extendable up to 5–7 years.",
    ["Confirm Canadian entity has qualifying relationship (parent/subsidiary/branch/affiliate)","Employer files offer via Employer Portal + CAD 230 fee","Gather org chart, employment history, role description","Apply for work permit citing LMIA-exempt code C12 (ICT specialized) or C61–C63","Receive permit; transfer to Canadian office"],
    ["Specialized knowledge role poorly justified — top refusal reason","Employer relationship not documented (parent/subsidiary)","Less than 1 year at multinational — ineligible","Trying ICT for newly-formed Canadian entity without business plan"],
    [["Can ICT lead to PR?","Yes — strong pathway via Express Entry/PNP after building Canadian work experience."],["What is 'specialized knowledge'?","Proprietary knowledge of the company's products, services or processes not generally available externally."]],
  ),
  "cusma-professionals": mk(
    "cusma-professionals", "CUSMA Professionals — Fast-Track Work Permit for US/Mexico Citizens", "CUSMA Professional",
    "CUSMA (formerly NAFTA) lets US and Mexican professionals in 60+ designated occupations get a work permit at the border in many cases.",
    "US and Mexican citizens with a Canadian job offer in a CUSMA-listed profession.",
    "Same-day at port of entry, or 4–8 weeks if applied online.",
    "CAD 155 work permit + CAD 230 employer compliance fee.",
    "Job must match a profession on the CUSMA list and meet education requirements.",
    "Closed work permit valid up to 3 years, renewable indefinitely.",
    ["Confirm profession is on CUSMA list (engineers, accountants, computer systems analysts, etc.)","Employer obtains LMIA-exempt offer via Employer Portal, pays CAD 230","Gather degree, job offer, CV","Apply at port of entry (US/Mexico citizens) or online","Receive permit valid up to 3 years"],
    ["Profession not on list — must use LMIA stream instead","Education credentials below CUSMA threshold","Self-employed or freelance not covered — must have employer","Marketing/sales roles not on CUSMA list"],
    [["Can my spouse get an open work permit?","Yes — spouses of CUSMA professionals in TEER 0/1 occupations qualify for SOWP."],["How many renewals are allowed?","Unlimited 3-year renewals while the job continues — but PR is the long-term path."]],
  ),
  "francophone-mobility": mk(
    "francophone-mobility", "Francophone Mobility — LMIA-Exempt Work Permit for French Speakers", "Francophone Mobility",
    "French-speaking workers with a job offer outside Quebec can get an LMIA-exempt work permit under the Francophone Mobility program.",
    "French speakers (CLB/NCLC 5+) with a Canadian job offer outside Quebec, any NOC.",
    "Decision: 4–8 weeks; often faster than LMIA streams.",
    "CAD 155 work permit + CAD 230 employer compliance fee (employer waived in some cases).",
    "Must work outside Quebec and demonstrate French proficiency (TEF/TCF).",
    "Closed work permit valid up to 2 years, renewable.",
    ["Take TEF/TCF Canada to prove NCLC 5+","Find Canadian employer outside Quebec","Employer files LMIA-exempt offer (code C16) on Employer Portal","Apply for work permit with French test result + offer","Receive permit; start work outside Quebec"],
    ["Working in Quebec — not eligible (Quebec has separate streams)","Outdated French test (validity 2 years)","Employer not registering offer on Portal","NCLC 4 or lower — refusal"],
    [["Can this lead to PR?","Yes — French-speaking work experience boosts Express Entry CRS by 25–50 points, plus dedicated category-based draws."],["Does my spouse get an open work permit?","Yes — Francophone Mobility principal applicants' spouses get SOWPs regardless of NOC level."]],
  ),
  "post-graduation-work-permit": mk(
    "post-graduation-work-permit", "Post-Graduation Work Permit (PGWP) — Eligibility & 2025 Rules", "PGWP",
    "PGWP lets eligible international graduates work in Canada open-permit for 1–3 years post-graduation, building Canadian work experience for PR.",
    "Graduates of eligible DLI programs (8+ months, field-aligned for 2024+ rules).",
    "Decision: 80–120 days. One-time only.",
    "CAD 255 (work permit + open holder fee).",
    "2024+ rule: program must be on PGWP-eligible field list for college graduates.",
    "Open work permit valid 1–3 years based on program length.",
    ["Complete eligible DLI program (8+ months)","Apply within 180 days of final marks","Submit transcript, completion letter, passport, valid status","Pay CAD 255; biometrics usually not needed if previously given","Receive PGWP; work any job for any employer"],
    ["Program not on 2024 eligible field list — refusal","Applying after 180 days — denied","Studying part-time during program — disqualifies","Distance learning over 50% — not eligible"],
    [["Can I extend a PGWP?","Generally no — it's one-time. Some 2024 exceptions for grads facing PR processing delays added a one-time 18-month extension."],["Does PGWP time count toward PR?","Yes — most CEC, PNP and category-based Express Entry paths use PGWP work experience."]],
  ),
};

export const WORKPERMITS_LIST = Object.values(WORKPERMITS);
export function getWorkPermit(slug: string | undefined): WorkPermitGuide | null {
  if (!slug) return null;
  return WORKPERMITS[slug as WorkPermitSlug] ?? null;
}