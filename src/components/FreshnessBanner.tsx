import { Link } from "react-router-dom";
import { Radio, ArrowRight } from "lucide-react";
import { getFreshness, relativeFromNow, type FreshnessTopic } from "@/lib/freshness";

interface FreshnessBannerProps {
  topic: FreshnessTopic;
  className?: string;
}

/**
 * Live "what just changed" strip fed by the news + draw data modules.
 * Drop near the top of GEO/AEO pages so visitors and AI crawlers can see
 * the page reflects the most recent immigration update.
 */
const FreshnessBanner = ({ topic, className = "" }: FreshnessBannerProps) => {
  const f = getFreshness(topic);
  return (
    <div
      className={`bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 ${className}`}
      role="status"
      aria-live="polite"
    >
      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary shrink-0">
        <Radio className="h-3.5 w-3.5 animate-pulse" aria-hidden="true" />
        Live · updated {relativeFromNow(f.lastUpdatedISO)}
      </span>
      <p className="text-sm text-foreground flex-1">
        {f.headline}
        <span className="text-muted-foreground"> · {f.source}</span>
      </p>
      {f.href && (
        <Link
          to={f.href}
          className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1 shrink-0"
        >
          See details <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
};

export default FreshnessBanner;