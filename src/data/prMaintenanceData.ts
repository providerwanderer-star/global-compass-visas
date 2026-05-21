// Wave 13C — PR maintenance & travel: /pr-maintenance/:topic
export type PrMaintSlug =
  | "pr-card-renewal"
  | "pr-card-first-application"
  | "residency-obligation-735-days"
  | "prtd-travel-document"
  | "urgent-prtd-processing"
  | "pr-card-lost-stolen"
  | "voluntary-renunciation-pr"
  | "h-and-c-residency-obligation";

export interface PrMaintGuide {
  slug: PrMaintSlug;
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
  slug: PrMaintSlug, name: string, shortName: string, oneLiner: string,
  who: string, processingTime: string, fee: string, keyRule: string, outcome: string,
  steps: string[], pitfalls: string[], faqs: [string, string][],
): PrMaintGuide => ({ slug, name, shortName, oneLiner, who, processingTime, fee, keyRule, outcome, steps, pitfalls, faqs: faqs.map(([q, a]) => ({ q, a })) });

export const PRMAINT: Record<PrMaintSlug, PrMaintGuide> = {
  "pr-card-renewal": mk(
    "pr-card-renewal", "PR Card Renewal — Apply Before Expiry to Avoid Travel Issues", "PR Card Renewal",
    "Permanent residents must renew the PR card every 5 years to keep proof of status and ability to board flights to Canada.",
    "PRs whose card expires within 9 months or has expired.",
    "Decision: 60–80 days standard.",
    "CAD 50.",
    "Must meet 730-of-1825-days residency obligation to renew.",
    "New 5-year PR card mailed to Canadian address.",
    ["Confirm you meet 730-day residency obligation","Gather travel history, proof of presence (tax returns, employment, leases)","Apply online via PR portal or mail paper IMM 5444","Pay CAD 50","Wait for card; pickup notice mailed; collect in person at IRCC office"],
    ["Applying when residency obligation not met — could trigger removal","Travel outside Canada while waiting — risky without PR card","Wrong Canadian address — card returned","Forgetting to update online account on move"],
    [["What if my PR card expires while I'm abroad?","You need a PRTD (PR Travel Document) from a visa office to board a flight back to Canada."],["Does an expired PR card mean I lost PR status?","No — PR status is permanent unless formally lost. Only the card expires."]],
  ),
  "pr-card-first-application": mk(
    "pr-card-first-application", "First PR Card — Automatic After Landing", "First PR Card",
    "Your first PR card is issued automatically after landing if IRCC has your Canadian address within 180 days of becoming a PR.",
    "New permanent residents.",
    "30–80 days after IRCC receives your address.",
    "Free for first card.",
    "You have 180 days from landing to give IRCC a Canadian address.",
    "PR card mailed to Canadian address.",
    ["Land in Canada (port of entry or virtual)","Within 180 days, update IRCC with Canadian mailing address","IRCC produces card automatically","Receive card by mail, sign and store safely","Card valid 5 years from issue"],
    ["No Canadian address in 180 days — must apply later (paid)","Address typos — card returned","Travel before card arrives — board with eCOPR + passport","Sharing address with multiple landings — confusion"],
    [["How do I update my address with IRCC?","Use the 'Address Notification' tool on IRCC website (no IRCC account needed)."],["Can I travel before my first PR card arrives?","Yes inbound to Canada — show eCOPR/CoPR + passport. Air travel back to Canada is fine until card system updates."]],
  ),
  "residency-obligation-735-days": mk(
    "residency-obligation-735-days", "PR Residency Obligation — 730 Days in 5 Years Explained", "Residency Obligation",
    "To keep PR status, you must be physically present in Canada at least 730 days (2 years) in every rolling 5-year period.",
    "All permanent residents.",
    "Calculated continuously; checked at PR card renewal, PRTD applications and entry to Canada.",
    "N/A — no fee, just a rule.",
    "Days outside Canada with Canadian-citizen spouse or working for Canadian employer abroad CAN count.",
    "PR status maintained as long as 730/1825 met.",
    ["Track every entry/exit (passports stamps, flight records)","Add days inside Canada","Add eligible exceptions: accompanying Canadian spouse, employed by Canadian business abroad","Confirm total is at least 730 in any rolling 5-year window","Keep records for PRTD/renewal proof"],
    ["Counting days outside with non-Canadian spouse — don't count","Self-employed abroad — usually doesn't count, must be Canadian employer","Forgetting CBSA logs every entry — lying triggers misrepresentation","Cutting it close (730–800 days) — risky for renewal"],
    [["What happens if I'm short on days?","CBSA/IRCC can issue a removal order. You can appeal on H&C grounds or simply lose PR."],["Do days as a visitor before becoming PR count?","No — only days as a PR count toward residency obligation."]],
  ),
  "prtd-travel-document": mk(
    "prtd-travel-document", "PR Travel Document (PRTD) — Get Back to Canada Without a Card", "PRTD",
    "PRs outside Canada without a valid PR card need a PRTD to board a commercial flight back to Canada.",
    "PRs abroad with expired or lost PR card needing to fly back.",
    "Standard: 2–8 weeks; varies by visa office.",
    "CAD 50.",
    "Visa officer assesses whether you meet residency obligation.",
    "Single-use travel sticker placed in passport; valid one-way to Canada.",
    ["Apply online or to nearest visa office abroad","Upload travel history, proof of residency in Canada, passport","Pay CAD 50","Submit additional H&C evidence if you don't meet residency obligation","Receive PRTD sticker; board flight to Canada"],
    ["Applying too close to flight date — processing varies","Weak residency proof — refusal","Misrepresenting travel history — banned for 5 years","No backup plan if PRTD refused"],
    [["Can I drive back to Canada without a PRTD?","Yes — land entry from US accepts other PR proof (CoPR, expired card). PRTD is mainly for air boarding."],["What if my PRTD is refused?","You receive a removal order with right to appeal at IAD within 60 days. Stay outside Canada during appeal."]],
  ),
  "urgent-prtd-processing": mk(
    "urgent-prtd-processing", "Urgent PRTD — Emergency Processing for Travel to Canada", "Urgent PRTD",
    "Visa offices can fast-track PRTD applications for emergencies: serious illness, death in family, urgent business travel.",
    "PRs abroad with documented urgent need to return to Canada.",
    "Often 5–10 business days for urgent.",
    "CAD 50 — same as standard.",
    "Must submit proof of urgency (hospital letter, death certificate, employer letter).",
    "Expedited PRTD sticker for one-way travel to Canada.",
    ["Apply for standard PRTD","Add cover letter explaining urgency with supporting documents","Email visa office requesting urgent processing","Provide flight booking proof","Receive expedited PRTD by courier"],
    ["No documentary proof of urgency — refused expedited","Booking flight before PRTD issued — risk of cancellation","Asking for urgent processing for vacation — refused","Going through wrong visa office (must be jurisdiction)"],
    [["What counts as 'urgent'?","Death/illness of immediate family, medical emergency, urgent business with documented financial impact, court appearance."],["Can I track my urgent PRTD?","Email the visa office directly; standard online tracking often doesn't show urgent status."]],
  ),
  "pr-card-lost-stolen": mk(
    "pr-card-lost-stolen", "Lost or Stolen PR Card — Report and Replace", "Lost/Stolen PR Card",
    "If your PR card is lost, stolen or destroyed, apply for a replacement (inside Canada) or PRTD (outside Canada).",
    "PRs whose card is missing or damaged.",
    "Decision: 60–80 days standard.",
    "CAD 50.",
    "Report stolen cards to police — get report number for application.",
    "New PR card mailed to Canadian address.",
    ["Report theft to police (if stolen); keep report number","Apply for replacement card via IRCC website or mail","Include explanation letter, police report (if applicable)","Pay CAD 50","Wait 60–80 days; pickup in person at IRCC if requested"],
    ["Travelling without backup proof (eCOPR/passport) — board denial","Not reporting theft — possible identity fraud","Multiple replacement requests — flagged as suspicious","Forgetting that PR status itself is intact (just the card is gone)"],
    [["Can I travel while replacement is processing?","Outbound from Canada yes, but you'll need PRTD to fly back. Drive across US-Canada land border with passport + CoPR if available."],["What if I find the lost card after applying?","Destroy the old one — the new application invalidates it."]],
  ),
  "voluntary-renunciation-pr": mk(
    "voluntary-renunciation-pr", "Voluntary Renunciation of PR — When and How", "Renounce PR",
    "PRs who no longer wish to maintain status can voluntarily renounce it via IRCC, often to avoid removal proceedings or simplify travel.",
    "PRs settled abroad who don't intend to return or maintain residency obligation.",
    "Decision: 2–4 months.",
    "Free.",
    "Renunciation is permanent — to return as PR you must reapply from scratch.",
    "Confirmation letter; you become a foreign national again.",
    ["Submit IMM 5782 Application to Voluntarily Renounce PR","Explain reason (settled abroad, accepting other citizenship, etc.)","Submit PR card if you have it","Wait for IRCC decision letter","Apply for visitor visa/eTA to visit Canada in future"],
    ["Renouncing without backup citizenship — may become stateless (rare)","Confusing renunciation with citizenship renunciation — different processes","Renouncing then changing mind — must reapply for PR from scratch","Tax implications — Canadian tax residency separate from immigration"],
    [["Why would someone renounce PR?","To avoid forced removal proceedings, get visa-free travel to certain countries, or simplify foreign citizenship applications."],["Can I return as a visitor after renouncing?","Yes — you become a foreign national and need a visa or eTA depending on your citizenship."]],
  ),
  "h-and-c-residency-obligation": mk(
    "h-and-c-residency-obligation", "H&C Appeal for Failed Residency Obligation — Keep PR Status", "H&C Residency Appeal",
    "PRs who don't meet the 730-day residency obligation can request humanitarian & compassionate (H&C) consideration to keep status.",
    "PRs facing removal order due to insufficient days in Canada.",
    "Appeal decision: 12–24 months at IAD.",
    "CAD 50 PRTD + IAD appeal fees (free initially).",
    "Must show compelling H&C factors: child best interests, hardship, establishment, family ties.",
    "PR status retained if appeal succeeds; otherwise removal order finalized.",
    ["Receive removal order from CBSA/IRCC officer","File Notice of Appeal at IAD within 60 days","Gather H&C evidence: family in Canada, hardship abroad, child best interests","Attend IAD hearing (often virtual)","Receive decision; appeal Federal Court if refused"],
    ["Missing 60-day appeal window — lose right to appeal","Weak H&C narrative — focus on best interests of Canadian-citizen children","Returning to Canada illegally while appeal pending","Not having a lawyer/RCIC for the hearing"],
    [["What are strong H&C factors?","Canadian-citizen children's best interests, medical care unavailable abroad, persecution risk, deep establishment in Canada before leaving."],["What happens if I lose the H&C appeal?","You lose PR status. You can apply for visitor visa or restart PR process via Express Entry/PNP/sponsorship."]],
  ),
};

export const PRMAINT_LIST = Object.values(PRMAINT);
export function getPrMaint(slug: string | undefined): PrMaintGuide | null {
  if (!slug) return null;
  return PRMAINT[slug as PrMaintSlug] ?? null;
}