// Wave 10B — Restoration & Out-of-Status: /restoration/:scenario
export type RestorationSlug =
  | "restore-status-90-days"
  | "implied-status-explained"
  | "out-of-status-recovery"
  | "expired-study-permit"
  | "expired-work-permit"
  | "visitor-overstay"
  | "lost-pr-card"
  | "pr-residency-obligation-breach";

export interface RestorationGuide {
  slug: RestorationSlug;
  name: string;
  shortName: string;
  oneLiner: string;
  who: string;
  deadline: string;
  fee: string;
  whileWaiting: string;
  outcome: string;
  steps: string[];
  pitfalls: string[];
  faqs: { q: string; a: string }[];
}

const mk = (
  slug: RestorationSlug, name: string, shortName: string, oneLiner: string,
  who: string, deadline: string, fee: string, whileWaiting: string, outcome: string,
  steps: string[], pitfalls: string[],
  faqs: [string, string][],
): RestorationGuide => ({
  slug, name, shortName, oneLiner, who, deadline, fee, whileWaiting, outcome,
  steps, pitfalls,
  faqs: faqs.map(([q, a]) => ({ q, a })),
});

export const RESTORATION: Record<RestorationSlug, RestorationGuide> = {
  "restore-status-90-days": mk(
    "restore-status-90-days",
    "Restore Status in Canada — The 90-Day Rule Explained",
    "Restore Status (90 Days)",
    "If your study, work or visitor status has expired, you have 90 days to apply for restoration before you must leave Canada.",
    "Anyone in Canada whose temporary status expired within the last 90 days.",
    "Strict 90 days from the day status expired. After day 91, restoration is no longer available.",
    "CAD 239.75 restoration fee + the standard permit fee (CAD 100 visitor / 155 work / 150 study).",
    "No work or study allowed during restoration — you are out of status until restored.",
    "If approved, status is restored retroactively to the date of expiry; if refused, you must leave Canada.",
    [
      "Stop working/studying immediately once status expires (continuing = misrepresentation risk)",
      "Apply online within 90 days using the appropriate IRCC form",
      "Pay restoration fee (CAD 239.75) plus the underlying permit fee",
      "Submit a written explanation of why status was lost + intention to comply",
      "Wait 4-6 months for decision; if refused, leave Canada immediately"
    ],
    [
      "Continuing to work/study after expiry — voids restoration eligibility",
      "Missing day 90 — IRCC will refuse and you must depart",
      "Applying for restoration without addressing why status was lost",
      "Forgetting the restoration fee — application returned"
    ],
    [
      ["Can I work while my restoration is pending?", "No — restoration does not give you implied status. You must stop working/studying until the new permit is issued."],
      ["What happens after day 90?", "You lose restoration eligibility and must leave Canada. Re-entering would require a fresh application from abroad."]
    ],
  ),
  "implied-status-explained": mk(
    "implied-status-explained",
    "Implied Status in Canada — Your Rights While Waiting on a Permit",
    "Implied Status",
    "Implied status lets you keep studying, working or visiting on the same terms while IRCC processes your extension — only if you applied before expiry.",
    "Anyone who filed a permit extension inside Canada before their current status expired.",
    "Application must be filed BEFORE current permit expires — even one day late loses implied status.",
    "Standard permit-extension fee only.",
    "You may continue working/studying under the SAME conditions as the expired permit (same employer, same school).",
    "Implied status lasts until IRCC decides; if approved, new permit issued; if refused, 90-day restoration window begins.",
    [
      "Submit extension application online before the current permit expires",
      "Save the IRCC submission receipt — proves implied status to employers/schools",
      "Continue working/studying under same conditions (no employer change on closed permit)",
      "If leaving Canada during implied status, you cannot re-enter without a new permit",
      "Wait for decision; new permit replaces implied status when issued"
    ],
    [
      "Filing on the expiry date itself — risky if IRCC stamps it next day",
      "Changing employer while on implied status (closed work permit) = unauthorized work",
      "Leaving Canada and trying to re-enter on implied status — denied at border",
      "Assuming implied status applies to a different permit type (it doesn't)"
    ],
    [
      ["How long does implied status last?", "Until IRCC makes a decision. Processing can take 3-9 months; you stay on implied status the whole time."],
      ["Can I travel outside Canada on implied status?", "You can leave, but you cannot re-enter on implied status. You must wait for the new permit before returning."]
    ],
  ),
  "out-of-status-recovery": mk(
    "out-of-status-recovery",
    "Out of Status in Canada — Recovery Options Beyond 90 Days",
    "Out-of-Status Recovery",
    "Past the 90-day restoration window, your options narrow to leaving and reapplying, an H&C application, or a TRP for temporary stay.",
    "Anyone whose Canadian status expired more than 90 days ago.",
    "No deadline to leave, but each day adds risk of removal order and future inadmissibility.",
    "H&C: CAD 635 + 575 RPRF. TRP: CAD 239.75. Reapplication from abroad: standard fees.",
    "Working/studying without status = misrepresentation risk + bars on future applications.",
    "Cleanest fix is to depart and reapply from abroad. H&C or TRP for those who cannot leave.",
    [
      "Stop all unauthorized work/study immediately",
      "Assess: can you leave Canada and reapply? (cleanest option)",
      "If you cannot leave: consider H&C for PR (24-36 month timeline) or TRP for short-term stay",
      "Consult an authorized representative — out-of-status files require careful handling",
      "Document everything: rent, employment, family ties — needed for H&C"
    ],
    [
      "Working while out of status — creates a misrepresentation history",
      "Marrying solely to fix status — IRCC screens for marriages of convenience",
      "Ignoring a removal order — leads to deportation and 1-year inadmissibility bar",
      "Filing H&C without strong establishment evidence"
    ],
    [
      ["Will leaving Canada get me banned?", "Voluntary departure within a short timeframe usually does not trigger a ban. Removal orders, however, can bar re-entry for 1-5 years."],
      ["Can I get PR from out of status?", "Yes via H&C, but approval is discretionary and slow. Typical processing 24-36 months."]
    ],
  ),
  "expired-study-permit": mk(
    "expired-study-permit",
    "Expired Study Permit — Extension, Restoration & PGWP Options",
    "Expired Study Permit",
    "An expired study permit can be restored within 90 days; after that you must leave Canada. PGWP eligibility may also be affected by expiry timing.",
    "International students whose study permit has expired or is about to expire.",
    "Restoration: 90 days from expiry. PGWP: 180 days from program completion to apply.",
    "Extension: CAD 150. Restoration: CAD 239.75 + 150 study fee.",
    "Cannot study during restoration. Cannot work on/off campus once permit expires.",
    "If restored, study resumes. If outside 90 days, must leave and re-apply from abroad.",
    [
      "If still in program: file extension before expiry to keep implied status",
      "If expired within 90 days: file restoration + new study permit application",
      "If program is complete: assess PGWP eligibility — 180-day window applies",
      "Stop working/studying the moment status expires",
      "If past 90 days: leave Canada and reapply from abroad"
    ],
    [
      "Continuing to attend classes while out of status",
      "Working on/off campus on an expired study permit (unauthorized work)",
      "Missing the 180-day PGWP application window after program completion",
      "Filing PGWP after restoration without confirming permit validity"
    ],
    [
      ["Can I apply for PGWP if my study permit expired?", "Yes — you have 180 days from program completion to apply, even if the study permit has expired (as long as it was valid when you completed)."],
      ["What if I stopped studying months ago?", "If past 180 days from program completion, PGWP is no longer available. You'd need a different work permit pathway."]
    ],
  ),
  "expired-work-permit": mk(
    "expired-work-permit",
    "Expired Work Permit — Restoration & Switching Streams",
    "Expired Work Permit",
    "Work permit expired? You have 90 days to restore — but you cannot work during that time. Closed-permit holders may also need a new LMIA.",
    "Foreign workers whose closed (LMIA) or open work permit has expired.",
    "90 days from expiry for restoration.",
    "Restoration: CAD 239.75 + 155 work permit fee. New LMIA: CAD 1,000 (employer).",
    "No work allowed during restoration — full stop, even with the same employer.",
    "If restored, work resumes. Otherwise leave Canada and reapply with a fresh LMIA or PNP.",
    [
      "Stop working the moment permit expires",
      "Within 90 days: file restoration + new work permit application (and new LMIA if closed)",
      "Notify employer — many employers don't realize implied status doesn't extend after expiry",
      "If past 90 days: leave Canada and reapply abroad with valid LMIA or job offer",
      "Consider PNP nomination as a faster PR pathway if eligible"
    ],
    [
      "Continuing to work after permit expiry — unauthorized work + future inadmissibility",
      "Assuming an LMIA stays valid — it expires after 6-18 months and may need renewal",
      "Not applying for spouse open work permit at the same time",
      "Missing the 90-day window because of slow employer paperwork"
    ],
    [
      ["Can my employer keep me on payroll during restoration?", "No — you cannot legally work. Some employers grant unpaid leave; others terminate. Confirm in writing."],
      ["Do I need a new LMIA to restore?", "For closed permits, yes — the original LMIA must still be valid or replaced. Open permits don't need an LMIA."]
    ],
  ),
  "visitor-overstay": mk(
    "visitor-overstay",
    "Visitor Overstay in Canada — Fixing an Expired TRV or eTA Stay",
    "Visitor Overstay",
    "Visitors who stayed past their authorized period have 90 days to restore as a visitor or must leave Canada.",
    "Tourists, family visitors, and business travelers who overstayed their stamped period or visitor record.",
    "90 days from when authorized stay ended.",
    "Restoration: CAD 239.75 + 100 visitor record fee.",
    "Visitor activities only — no work or study while out of status or during restoration.",
    "If restored, can stay as visitor; if not, must leave and may face inadmissibility for future visa.",
    [
      "Calculate exact date authorized stay ended (look at passport stamp or eTA confirmation)",
      "Within 90 days: file Visitor Record restoration online (IMM 5708)",
      "Pay restoration + visitor record fees",
      "Explain reason for overstay (medical, family emergency, flight issues, etc.)",
      "If past 90 days: depart Canada — voluntary departure is best"
    ],
    [
      "Working informally during overstay — creates misrepresentation history",
      "Trying to extend after restoration window closed",
      "Ignoring overstay assuming border won't notice — flagged on next entry",
      "Marrying or applying for spousal PR solely to stay — IRCC screens for genuineness"
    ],
    [
      ["Will overstaying affect my next Canada visa?", "Yes — it must be disclosed on every future application and reduces approval odds. Short overstays with strong explanation can be overcome."],
      ["Can I just leave and come back?", "You can depart, but re-entry requires a fresh visa or eTA, and the overstay history may trigger refusal."]
    ],
  ),
  "lost-pr-card": mk(
    "lost-pr-card",
    "Lost or Expired PR Card — Replacement & PRTD from Abroad",
    "Lost PR Card",
    "A lost, stolen or expired PR card can be replaced inside Canada or via a PR Travel Document if you're stuck abroad.",
    "Permanent residents whose PR card is lost, stolen, expired or never issued.",
    "No deadline to replace, but you can't board a flight to Canada without a valid card or PRTD.",
    "Replacement: CAD 50. PRTD: CAD 50. Both processed by IRCC.",
    "PR status doesn't expire even if the card does — you remain a PR.",
    "New 5-year card issued inside Canada, or single-use PRTD for return travel.",
    [
      "Inside Canada: apply for new card on IMM 5444 with photos + ID",
      "Outside Canada: apply for PR Travel Document at nearest visa office",
      "Provide proof of residency obligation compliance (730 days in last 5 years)",
      "Wait 50-100 days for new card; PRTD ~2-4 weeks for urgent cases",
      "Update IRCC address if moved to ensure card delivery"
    ],
    [
      "Letting card expire and missing residency obligation = removal order risk",
      "Trying to board a flight with expired PR card from abroad — denied boarding",
      "Not providing residency proof — IRCC may refuse or initiate H&C review",
      "Forgetting to update address — card returned to IRCC"
    ],
    [
      ["Does my PR status expire when my PR card does?", "No — PR status is independent of the card. The card just proves status for travel. You stay a PR until you renounce or are stripped of status."],
      ["What if I'm stuck abroad without a PR card?", "Apply for a PRTD at the nearest visa office. It's a single-use travel document that lets you board a flight back to Canada."]
    ],
  ),
  "pr-residency-obligation-breach": mk(
    "pr-residency-obligation-breach",
    "PR Residency Obligation Breach — 730-Day Rule & H&C Defence",
    "PR Residency Breach",
    "PRs must be physically in Canada 730 days in every 5-year period. Falling short can trigger loss of status, but H&C can save it.",
    "PRs who spent significant time abroad and may not meet the 730/1825-day rule.",
    "Reviewed at PR card renewal, port-of-entry, or PRTD application. Appeal: 30 days from negative finding.",
    "Appeal at IAD: no filing fee. Counsel: CAD 6,000-15,000.",
    "Status remains valid until formally revoked — but travel becomes risky.",
    "Either status retained (with H&C) or removal order issued; can be appealed to IAD.",
    [
      "Calculate exact days in Canada in last 5 years (use travel history)",
      "If under 730: do not voluntarily renounce or sign waiver at airport",
      "Apply for PRTD or face inadmissibility report at border — both trigger H&C review",
      "Build H&C case: family in Canada, work transferred abroad, medical issues",
      "If removal order issued, appeal to IAD within 30 days with full H&C package"
    ],
    [
      "Signing a voluntary renunciation form at the border — irreversible",
      "Counting time abroad with a Canadian citizen spouse incorrectly (counts only if you're accompanying them)",
      "Missing the 30-day IAD appeal deadline",
      "Weak H&C — best-interest-of-child and establishment in Canada are critical"
    ],
    [
      ["Does time with my Canadian spouse abroad count?", "Yes — days outside Canada accompanying a Canadian citizen spouse or common-law partner count toward the 730-day requirement."],
      ["Can I get my PR back after losing it?", "Only via successful IAD appeal or a new PR application from scratch. Lost PR status is rarely restored outside of appeal."]
    ],
  ),
};

export const RESTORATION_LIST = Object.values(RESTORATION);
export function getRestoration(slug: string | undefined): RestorationGuide | null {
  if (!slug) return null;
  return RESTORATION[slug as RestorationSlug] ?? null;
}