// Wave 12B — Atlantic & Rural Pilots: /pilot/:program
export type PilotSlug =
  | "atlantic-immigration-program"
  | "rural-community-immigration-pilot"
  | "francophone-community-immigration-pilot"
  | "agri-food-pilot"
  | "home-care-worker-pilot"
  | "yukon-community-pilot"
  | "pei-pnp-pilot"
  | "nova-scotia-aip-stream";

export interface PilotGuide {
  slug: PilotSlug;
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
  slug: PilotSlug, name: string, shortName: string, oneLiner: string,
  who: string, processingTime: string, fee: string, keyRule: string, outcome: string,
  steps: string[], pitfalls: string[],
  faqs: [string, string][],
): PilotGuide => ({
  slug, name, shortName, oneLiner, who, processingTime, fee, keyRule, outcome,
  steps, pitfalls,
  faqs: faqs.map(([q, a]) => ({ q, a })),
});

export const PILOTS: Record<PilotSlug, PilotGuide> = {
  "atlantic-immigration-program": mk(
    "atlantic-immigration-program", "Atlantic Immigration Program (AIP) — PR via Atlantic Canada Employer", "Atlantic Immigration Program",
    "AIP gives PR to skilled workers and international graduates with a job offer from a designated employer in New Brunswick, Nova Scotia, PEI or Newfoundland.",
    "Skilled workers (1 year experience) or recent Atlantic graduates with a designated employer job offer.",
    "6-12 months from PR application.",
    "CAD 1,365 federal PR fee. No provincial fee.",
    "Job offer from designated employer + settlement plan from settlement service provider.",
    "PR for principal applicant + family.",
    ["Find a designated employer in NB/NS/PEI/NL (employer must be approved by province)","Receive job offer (NOC TEER 0/1/2/3/4 acceptable)","Get endorsed by province via employer's endorsement application","Obtain Settlement Plan from designated service provider","Submit PR application to IRCC with endorsement letter"],
    ["Applying without a designated-employer offer — non-designated employers can't endorse","Skipping the Settlement Plan — mandatory document","Picking wrong NOC level — must match experience","Trying to use AIP for self-employment — employer-driven only"],
    [["Do I need a Labour Market Impact Assessment?","No — AIP is LMIA-exempt. The provincial endorsement replaces LMIA."],["Can I apply from inside Canada?","Yes — current temporary workers and Atlantic graduates can apply from within Canada."]],
  ),
  "rural-community-immigration-pilot": mk(
    "rural-community-immigration-pilot", "Rural Community Immigration Pilot (RCIP) — PR to Small-Town Canada", "Rural Community Pilot",
    "RCIP succeeds RNIP and offers PR to skilled workers with job offers from designated employers in participating rural communities.",
    "Workers with eligible job offer in a participating rural community + 1 year work experience.",
    "6-12 months after community recommendation.",
    "CAD 1,365 federal PR fee.",
    "Community-issued recommendation + designated employer job offer + intent to live in community.",
    "PR for principal applicant + family.",
    ["Identify participating community (e.g. Thunder Bay, Sault Ste. Marie, Brandon, Vernon)","Apply to designated employer in that community for an eligible job","Submit application to community for recommendation","Receive community recommendation letter","Submit PR application to IRCC within 6 months of recommendation"],
    ["Applying to a non-participating community — only specific cities qualify","Missing community-specific extra requirements (residency intent docs)","Job offer below NOC TEER 0/1/2/3 threshold","Not moving to the community after PR (community can flag IRCC)"],
    [["What's the difference between RCIP and the old RNIP?","RCIP replaces RNIP from 2024. Similar concept; updated community list and tighter employer designation rules."],["Can I move to a different city after PR?","Legally yes (Charter mobility) but the pilot expects genuine residency intent in the community. Frequent quick moves can flag enforcement."]],
  ),
  "francophone-community-immigration-pilot": mk(
    "francophone-community-immigration-pilot", "Francophone Community Immigration Pilot (FCIP) — PR for French Speakers", "Francophone Community Pilot",
    "FCIP is a new pilot launching 2024-2025 to attract French-speaking workers to designated Francophone minority communities outside Quebec.",
    "French-speaking workers (CLB 5+ French) with eligible job offers in designated communities.",
    "6-12 months after community recommendation.",
    "CAD 1,365 federal PR fee.",
    "CLB 5 French + job offer in designated Francophone minority community + community recommendation.",
    "PR for principal applicant + family.",
    ["Confirm CLB 5+ in French (TEF, TCF or TEFAQ)","Identify designated Francophone community (list updated 2024-2025)","Secure job offer from designated employer in that community","Apply to community for recommendation","Submit PR application within 6 months of recommendation"],
    ["English-only applicants — French language proof required","Confusing with Quebec immigration (different system, different rules)","Applying before community list is finalized for 2025","Missing the 6-month window after community recommendation"],
    [["Do I need French at native level?","No — CLB 5 (intermediate) in French is sufficient. Higher levels add adaptability points."],["Can I apply if I also speak English?","Yes — bilingualism is encouraged. French is the primary requirement; English is a bonus."]],
  ),
  "agri-food-pilot": mk(
    "agri-food-pilot", "Agri-Food Pilot — PR for Agri-Food & Meat Processing Workers", "Agri-Food Pilot",
    "Agri-Food Pilot offers PR to experienced workers in meat product manufacturing, greenhouse/nursery/floriculture, and animal production.",
    "Workers with 12 months full-time eligible Canadian work experience in qualifying NOCs.",
    "12 months processing.",
    "CAD 1,365 federal PR fee.",
    "12 months eligible Canadian work experience + CLB 4 + secondary education + permanent job offer (outside Quebec).",
    "PR for principal applicant + family.",
    ["Work for 12 months on LMIA-supported permit in eligible NOC (industrial butcher, food processing labourer, harvest worker, etc.)","Confirm CLB 4 English/French","Show educational equivalency (Canadian high school or ECA)","Secure permanent full-time job offer (outside Quebec)","Submit PR application — annual cap on intake (16,500 over pilot)"],
    ["Working in a non-qualifying NOC — only specific agri-food roles","Missing the 12-month continuous experience requirement","Job offer in Quebec — pilot excludes Quebec","Annual cap fills early — apply as soon as eligible"],
    [["Which NOCs qualify?","Specific NOCs: 63201 (butchers), 65202 (industrial butchers), 84120 (specialised livestock), 85100 (livestock labourers), 85101 (harvest labourers), 94141 (industrial food processing), 95106 (food processing labourers)."],["Is the pilot ending soon?","The pilot has been extended to May 2025 with possibility of becoming permanent. Watch IRCC announcements."]],
  ),
  "home-care-worker-pilot": mk(
    "home-care-worker-pilot", "Home Care Worker Immigration Pilots — Child Care & Home Support", "Home Care Pilots",
    "Two pilots launched 2024: Home Child Care Provider Pilot and Home Support Worker Pilot. Both offer PR pathway to caregivers from day one.",
    "Workers with caregiving experience + secure offer from Canadian family.",
    "12 months processing.",
    "CAD 1,365 federal PR fee.",
    "CLB 4 + Canadian high school equivalency + 6 months recent training/experience + offer from Canadian household.",
    "PR for principal applicant + family (PR granted from day 1, not after work experience).",
    ["Confirm CLB 4 in English or French","Show secondary education credential (ECA if foreign)","Document 6 months of training or work in caregiving","Secure full-time job offer from Canadian household (not agency)","Submit application; annual cap (intake reopens periodically)"],
    ["Working for an agency — must be a private household","Old 'Live-in Caregiver' or 'Caring for Children Class' rules — replaced by new pilots","Missing the cap window — limited annual slots","Confusing this with TFWP caregiver work permit (different program)"],
    [["Do I have to live with the employer?","No — live-in is not required. You can live anywhere as long as you work for the employer family."],["How is this different from the old pilots?","New pilots grant PR from day 1 (not after 24 months of Canadian work experience as before)."]],
  ),
  "yukon-community-pilot": mk(
    "yukon-community-pilot", "Yukon Community Pilot — Territorial PR Pathway", "Yukon Community Pilot",
    "Yukon Community Program nominates workers with job offers from designated Yukon employers in Whitehorse and rural communities.",
    "Workers with full-time Yukon job offer + relevant experience or training.",
    "6-12 months from nomination.",
    "Yukon application fee + CAD 1,365 federal PR.",
    "Yukon nomination through community employer + intent to settle in Yukon.",
    "PR via PNP Express Entry or paper-based.",
    ["Find a designated Yukon employer with eligible job offer","Apply through employer for nomination","Receive territorial nomination certificate","Apply for federal PR via Express Entry (if eligible) or paper-based PNP","Move to Yukon and start work"],
    ["Missing territorial residency intent","Working remotely from outside Yukon — community-driven pilot","Confusing Yukon Community with Yukon Express Entry stream","Not factoring high cost of living in Whitehorse"],
    [["How small is the Yukon intake?","Yukon nominates ~430 applicants annually (small but high approval rate due to demand)."],["Do I need to speak French?","No — English-only is accepted. Yukon is primarily Anglophone."]],
  ),
  "pei-pnp-pilot": mk(
    "pei-pnp-pilot", "PEI PNP — Labour Impact & Express Entry Streams", "PEI PNP",
    "Prince Edward Island Provincial Nominee Program runs Labour Impact (employer-driven), Express Entry, and Business Impact streams with low CRS thresholds.",
    "Workers with PEI job offer or Express Entry candidates with PEI ties.",
    "EOI to nomination: 6-12 months.",
    "PEI fee CAD 300 + CAD 1,365 federal PR.",
    "PEI invites monthly via EOI — Labour Impact requires employer job offer; Express Entry requires federal profile.",
    "Provincial nomination then PR via Express Entry or paper.",
    ["Register PEI EOI (Expression of Interest)","If invited, submit full application with job offer (Labour Impact) or EE profile","Receive provincial nomination certificate","Apply for federal PR (600 CRS bonus if EE-aligned)","Land in PEI and meet residency intent"],
    ["Treating PEI as a backup if you don't live there — residency intent matters","Express Entry stream requires existing EE profile in pool","Labour Impact requires legitimate job offer (not arranged for points)","Missing monthly EOI draws"],
    [["What's the typical PEI Express Entry CRS cutoff?","PEI Express Entry stream often invites at CRS 300+ (much lower than federal draws)."],["Can I move out of PEI after PR?","Charter mobility allows it, but enforcement scrutinises rapid moves and could trigger investigation if pattern of misrepresentation is found."]],
  ),
  "nova-scotia-aip-stream": mk(
    "nova-scotia-aip-stream", "Nova Scotia NSNP & AIP Streams — Fastest PR via Atlantic Canada", "Nova Scotia Streams",
    "Nova Scotia operates multiple streams: NSNP Skilled Worker, Occupations in Demand, Express Entry Labour Market Priorities, and AIP endorsement.",
    "Skilled workers, in-demand occupations, or those with NS job offer.",
    "NSNP nomination: 3-6 months. PR after nomination: 6-12 months.",
    "NS fee CAD 600 + CAD 1,365 federal PR.",
    "Stream-specific — Skilled Worker needs job offer; LMP draws target specific NOCs from EE pool.",
    "Provincial nomination then federal PR.",
    ["Identify best NS stream (Skilled Worker, OID, LMP, AIP)","Register in Express Entry if applicable; create NSNP profile","Apply when invited or stream opens (some are first-come first-served)","Receive nomination","Submit federal PR within 6 months of nomination"],
    ["Missing first-come first-served stream openings (Skilled Worker fills in minutes)","Wrong NOC — OID list updates frequently","Applying without job offer to Skilled Worker stream","Treating NSNP and AIP as same — they're separate routes"],
    [["What's the fastest NS route?","Express Entry Labour Market Priorities — targeted invitations to EE candidates with skills NS needs (no separate application needed beyond EE)."],["Can I use both NSNP and AIP?","You typically pick one route. AIP is employer-driven and skips the LMIA; NSNP has multiple streams with different criteria."]],
  ),
};

export const PILOTS_LIST = Object.values(PILOTS);
export function getPilot(slug: string | undefined): PilotGuide | null {
  if (!slug) return null;
  return PILOTS[slug as PilotSlug] ?? null;
}