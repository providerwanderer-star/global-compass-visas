import { AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface StreamClosedNoticeProps {
  streamName?: string;
  closureDate?: string;
  replacementPath?: string;
  replacementLabel?: string;
}

/**
 * Reusable banner for any legacy Ontario stream that closed on 25–26 June 2026.
 * Kept generic so the same component can flag any future stream closure.
 */
export const StreamClosedNotice = ({
  streamName = "This OINP stream",
  closureDate = "June 25, 2026",
  replacementPath = "/pnp/ontario/workforce-priority-stream",
  replacementLabel = "Ontario Workforce Priority Stream",
}: StreamClosedNoticeProps) => {
  return (
    <div
      role="alert"
      className="not-prose my-6 rounded-lg border border-amber-300 bg-amber-50 p-4 md:p-5 text-amber-950"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5 text-amber-700" />
        <div className="flex-1">
          <p className="font-bold text-sm md:text-base leading-snug">
            {streamName} closed permanently on {closureDate} — no further invitations are being issued.
          </p>
          <p className="text-sm mt-1 text-amber-900/90">
            Ontario replaced its eight legacy OINP streams with a single new pathway.
            Read the {replacementLabel} guide to see which of its three routes fits your profile.
          </p>
          <Link
            to={replacementPath}
            className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-amber-900 hover:text-amber-700 underline underline-offset-2"
          >
            View {replacementLabel} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StreamClosedNotice;