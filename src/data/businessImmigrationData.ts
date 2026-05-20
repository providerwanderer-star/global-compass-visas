// Wave 12A — Business & Investor Immigration: /business-immigration/:program
export type BusinessSlug =
  | "start-up-visa"
  | "self-employed-persons"
  | "ontario-entrepreneur-oinp"
  | "bc-entrepreneur"
  | "manitoba-entrepreneur"
  | "saskatchewan-entrepreneur"
  | "quebec-investor-suspended"
  | "intra-company-transferee";

export interface BusinessGuide {
  slug: BusinessSlug;
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
  slug: BusinessSlug, name: string, shortName: string, oneLiner: string,
  who: string, processingTime: string, fee: string, keyRule: string, outcome: string,
  steps: string[], pitfalls: string[],
  faqs: [string, string][],
): BusinessGuide => ({
  slug, name, shortName, oneLiner, who, processingTime, fee, keyRule, outcome,
  steps, pitfalls,
  faqs: faqs.map(([q, a]) => ({ q, a })),
});

export const BUSINESS: Record<BusinessSlug, BusinessGuide> = {
  "start-up-visa": mk(
    "start-up-visa", "Canada Start-Up Visa (SUV) — Founder PR Pathway", "Start-Up Visa",
    "The Start-Up Visa program grants PR to founders whose business is backed by a designated Canadian VC, angel group or incubator.",
    "Entrepreneurs with a scalable business and a Letter of Support from a designated organization.",
    "31-37 months at current backlog (intake capped 2024-2026).",
    "CAD 2,475 principal applicant + CAD 850 RPRF.",
    "Letter of Support from a designated organization + CLB 5 English/French + min settlement funds.",
    "Approved founders and up to 5 co-founders receive PR.",
    ["Pitch business to a designated VC, angel group or incubator","Secure Letter of Support (VC: CAD 200k+ / Angel: CAD 75k+ / Incubator: acceptance)","Meet CLB 5 in English or French (IELTS/CELPIP)","Show settlement funds (CAD 13,757 single → higher for family)","Submit PR application via PR Portal"],
    ["Going to a non-designated incubator — letters are invalid","Co-founder cap: max 5 essential people per business","Sham businesses without genuine operations — refusals climbing","Underestimating processing time (3 years current backlog)"],
    [["Can I work in Canada while waiting?","Yes — you can apply for a work permit linked to your SUV application and start operations early."],["Does my business have to launch in Canada?","Yes — essential operations must be carried out in Canada and headquarters must be Canadian."]],
  ),
  "self-employed-persons": mk(
    "self-employed-persons", "Self-Employed Persons Program — Athletes & Cultural Workers", "Self-Employed Persons",
    "PR for self-employed athletes and cultural workers (musicians, artists, writers) who can contribute to Canada's cultural or athletic life.",
    "World-class athletes or cultural professionals with 2+ years self-employed experience.",
    "Currently paused (2024-2026 intake suspended). Backlog: 50+ months.",
    "CAD 2,140 principal + CAD 850 RPRF.",
    "Selection score 35/100 + intention/ability to be self-employed in Canada.",
    "Approved applicants receive PR for themselves and family.",
    ["Document 2 years of relevant self-employed experience in cultural/athletic field","Score 35/100 on selection grid (experience, education, age, language, adaptability)","Show settlement funds to support self and family","Submit Schedule 6A self-employed worksheet","Await processing (currently paused — monitor intake reopening)"],
    ["Applying as a coach or admin — only performers/creators qualify","Failing to prove world-class or professional level of contribution","Confusing this with the suspended Investor program","Underestimating funds requirement (no fixed minimum — must support family)"],
    [["Is this program currently open?","IRCC paused new intake until end of 2026 to reduce backlog. Already-submitted applications continue processing."],["Do I need a business plan?","Yes — describe how you'll be self-employed in Canada and the cultural/athletic value you'll add."]],
  ),
  "ontario-entrepreneur-oinp": mk(
    "ontario-entrepreneur-oinp", "Ontario Entrepreneur Stream (OINP) — Investment & PR Pathway", "Ontario Entrepreneur",
    "OINP Entrepreneur Stream issues nominations to founders investing CAD 200k-600k+ in an Ontario business with job creation.",
    "Entrepreneurs with CAD 800k+ net worth and serious investment intent in Ontario.",
    "EOI to nomination: 6-12 months. Nomination → PR: 18 months via provincial nominee Express Entry.",
    "Application CAD 3,500 (Ontario) + federal PR CAD 1,365.",
    "Investment minimums: CAD 600k (GTA) or CAD 200k (outside GTA) + 2 PR jobs (GTA) or 1 (outside GTA).",
    "Work permit issued first, PR nomination after performance agreement met.",
    ["Submit Expression of Interest with business concept and personal net worth","If invited, apply with full business plan and supporting docs","Sign performance agreement with Ontario","Move to Canada on work permit, execute investment and hire","Apply for PR nomination after 20-month performance period"],
    ["Buying a passive franchise — must be active management role","Not meeting hire commitment by performance review","Investing in wrong region (GTA vs outside GTA triggers different thresholds)","Trying to use loaned funds — must be personal investment"],
    [["Do I get PR immediately?","No — work permit first, then PR after meeting performance agreement (~20 months in business)."],["Can I buy an existing business?","Yes — acquisitions are permitted if you take active management and meet hire/investment thresholds."]],
  ),
  "bc-entrepreneur": mk(
    "bc-entrepreneur", "BC PNP Entrepreneur Streams — Base & Regional Pilot", "BC Entrepreneur",
    "BC PNP offers two entrepreneur streams — Base (CAD 600k investment, Metro Vancouver) and Regional Pilot (smaller communities).",
    "Entrepreneurs with CAD 600k (Base) or CAD 300k (Regional) net worth.",
    "EOI to nomination: 12-18 months.",
    "BC fee CAD 3,500 + federal PR CAD 1,365.",
    "Eligible investment + 1 job (Base) or 1 job (Regional) + active management.",
    "Work permit then PR nomination after performance review.",
    ["Pick stream: Base (Metro Vancouver) or Regional Pilot (small communities)","Submit EOI; if scored high enough, receive ITA","File complete application with business plan and net worth verification","Work in BC under work permit; execute business and hire requirement","Apply for PR nomination after 20+ months of business operation"],
    ["Choosing Regional Pilot but locating in Metro Vancouver","Inflating net worth — third-party verification required","Operating remotely — must reside in BC during work permit","Missing job creation by performance review = nomination denied"],
    [["What counts as 'Regional' in BC?","Communities with population under 75,000 and outside Metro Vancouver/Abbotsford. Specific list on BC PNP site."],["Can I run a tech start-up?","Yes — tech businesses qualify; ensure local hire and Canadian operations."]],
  ),
  "manitoba-entrepreneur": mk(
    "manitoba-entrepreneur", "Manitoba PNP Business Investor Stream (BIS-E)", "Manitoba Entrepreneur",
    "Manitoba's Business Investor Stream nominates entrepreneurs investing CAD 250k+ in Winnipeg or CAD 150k+ outside Winnipeg.",
    "Entrepreneurs with CAD 500k net worth and exploratory visit to Manitoba.",
    "EOI to nomination: 12 months.",
    "Manitoba fee CAD 2,500 + federal PR CAD 1,365.",
    "Required exploratory visit + business plan + investment + 1 hire (Winnipeg) or 0 (outside).",
    "Work permit + PR after Business Performance Agreement met (12-24 months).",
    ["Visit Manitoba on exploratory trip (mandatory before EOI)","Submit EOI with business research and investment plan","File full application if invited","Sign Business Performance Agreement and execute","Apply for PR nomination after meeting BPA terms"],
    ["Skipping the exploratory visit — disqualifies application","Investing in passive holdings (real estate, securities) — must be operating business","Choosing Winnipeg without funds for higher threshold","Missing performance milestones in BPA"],
    [["Is an exploratory visit really mandatory?","Yes — Manitoba requires a documented exploratory visit before EOI submission. Skipping it auto-disqualifies."],["What businesses are excluded?","Passive real estate, payday loans, scrap metal, and home-based businesses are excluded."]],
  ),
  "saskatchewan-entrepreneur": mk(
    "saskatchewan-entrepreneur", "Saskatchewan Entrepreneur Category (SINP)", "Saskatchewan Entrepreneur",
    "SINP Entrepreneur Category requires CAD 200k-300k investment, 1/3 ownership, and creation of 2 jobs for non-family.",
    "Entrepreneurs with CAD 500k net worth and 3+ years business/management experience.",
    "EOI to nomination: 12 months.",
    "Saskatchewan fee CAD 2,500 + federal PR CAD 1,365.",
    "Min CAD 300k Regina/Saskatoon or CAD 200k elsewhere + 2 jobs for non-family.",
    "Work permit then PR nomination after Business Performance Agreement met.",
    ["Submit EOI with points-based scoring (experience, investment, language, age)","If invited, apply with business proposal","Sign Business Performance Agreement","Move on work permit, execute investment and create 2 jobs (non-family)","Apply for PR nomination after BPA performance review"],
    ["Hiring family members for the 2 jobs — does not count","Investing only in real estate","Choosing Regina/Saskatoon without higher investment ready","Not registering business with provincial bodies"],
    [["Can family members count toward the 2 jobs?","No — must be jobs for non-family Canadian citizens or PRs."],["Is there a points minimum?","Saskatchewan uses a competitive EOI draw — minimum invitation score varies by draw."]],
  ),
  "quebec-investor-suspended": mk(
    "quebec-investor-suspended", "Quebec Investor Program — Current Status & Alternatives", "Quebec Investor",
    "The Quebec Investor Program is suspended until at least 2026. Alternatives: Quebec Entrepreneur, Quebec Self-Employed, federal Start-Up Visa.",
    "High-net-worth investors previously targeting CAD 1.2M passive investment.",
    "Currently suspended — no new applications.",
    "N/A — program paused.",
    "Pre-suspension: CAD 2M net worth + CAD 1.2M 5-year investment.",
    "No new intake; existing files being processed.",
    ["Confirm program status (currently suspended until 2026)","Consider alternatives: SUV (federal), Quebec Entrepreneur, Quebec Self-Employed","Evaluate Ontario or BC entrepreneur streams if Quebec residency not essential","Plan for reopening — likely restructured with higher thresholds","Consult RCIC before committing funds"],
    ["Assuming the program will reopen on the same terms","Engaging unauthorised consultants promising QIIP slots","Trying to qualify with Quebec Entrepreneur instead — different rules entirely","Buying real estate expecting it to count as 'investment'"],
    [["When will QIIP reopen?","No official date — suspended through at least 2026. Restructured version likely with higher investment threshold."],["What's the closest active alternative?","Federal Start-Up Visa for entrepreneurs, or Quebec Entrepreneur for active business operators."]],
  ),
  "intra-company-transferee": mk(
    "intra-company-transferee", "Intra-Company Transferee (ICT) Work Permit — Executives, Managers & Specialists", "ICT Work Permit",
    "ICT allows multinational companies to transfer executives, managers or specialised-knowledge employees to a Canadian branch without LMIA.",
    "Employees of multinationals transferring to a Canadian parent, branch, subsidiary or affiliate.",
    "2-4 months processing (LMIA-exempt under C12).",
    "CAD 155 work permit + CAD 230 employer compliance fee.",
    "1+ year continuous full-time employment with foreign entity in past 3 years + qualifying corporate relationship.",
    "Work permit issued for 1-3 years (initial) up to 5-7 years total.",
    ["Confirm qualifying corporate relationship (parent/subsidiary/branch/affiliate)","Document 1+ year of full-time work in qualifying role abroad","Prepare support letter detailing role, salary, duties","Submit work permit application via IRCC online or at border (US/Mexican citizens)","Track 5-year cap (executive/manager) or 7-year cap (specialised knowledge)"],
    ["Confusing 'specialised knowledge' with general industry experience","New Canadian branch — must show physical premises and viable business plan","Hitting the time cap and being forced to leave Canada","Mixing ICT with LMIA-stream work permit (different rules)"],
    [["Can ICT lead to PR?","Indirectly — ICT holders typically transition to PR via Express Entry CEC after gaining Canadian work experience."],["What if my Canadian branch is brand new?","'Start-up ICT' rules apply — 1-year initial work permit with proof of premises, business plan and ability to support operations."]],
  ),
};

export const BUSINESS_LIST = Object.values(BUSINESS);
export function getBusiness(slug: string | undefined): BusinessGuide | null {
  if (!slug) return null;
  return BUSINESS[slug as BusinessSlug] ?? null;
}