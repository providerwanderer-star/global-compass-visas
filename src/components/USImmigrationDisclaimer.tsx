import { Info } from "lucide-react";

/**
 * Mandatory disclaimer for every US visa page. 4 Aces Visa / Garg Brothers
 * is an RCIC firm regulated for Canadian immigration only.
 * US visa content on this site is informational and never legal advice.
 */
export const USImmigrationDisclaimer = () => (
  <div
    role="note"
    aria-label="US immigration disclaimer"
    className="not-prose my-6 rounded-lg border border-blue-200 bg-blue-50 p-4 md:p-5 text-blue-950"
  >
    <div className="flex items-start gap-3">
      <Info className="h-5 w-5 shrink-0 mt-0.5 text-blue-700" />
      <div className="text-sm leading-relaxed">
        <p className="font-semibold">Informational content only — not legal advice.</p>
        <p className="mt-1 text-blue-900/90">
          4 Aces Visa (Garg Brothers) is a Regulated Canadian Immigration Consultancy
          (RCIC) authorized to represent clients for Canadian immigration only. We do
          not file US visa or green card applications and we do not provide US legal
          advice. The material below summarizes publicly available US government
          information as of the last review date, may become outdated, and should not
          be relied on as a substitute for advice from a licensed US immigration
          attorney. Always verify current requirements with USCIS, the US Department
          of State, or a US-licensed attorney before acting.
        </p>
      </div>
    </div>
  </div>
);

export default USImmigrationDisclaimer;