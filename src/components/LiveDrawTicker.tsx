import { Link } from "react-router-dom";
import { TrendingUp, ArrowRight } from "lucide-react";
import { expressEntryDraws, drawsLastUpdated } from "@/data/expressEntryDraws";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" });

const LiveDrawTicker = () => {
  const latest = expressEntryDraws[0];
  if (!latest) return null;
  return (
    <div className="bg-primary text-primary-foreground border-y border-primary/30">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center gap-3 md:gap-6 text-sm">
        <div className="flex items-center gap-2 font-semibold shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          <TrendingUp className="h-4 w-4 text-gold" />
          Latest EE Draw
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-primary-foreground/90">
          <span><span className="text-primary-foreground/60">Date:</span> <strong className="text-white">{formatDate(latest.date)}</strong></span>
          <span><span className="text-primary-foreground/60">Category:</span> <strong className="text-white">{latest.category}</strong></span>
          <span><span className="text-primary-foreground/60">CRS:</span> <strong className="text-gold">{latest.crsCutoff}</strong></span>
          <span><span className="text-primary-foreground/60">ITAs:</span> <strong className="text-white">{latest.invitations.toLocaleString()}</strong></span>
        </div>
        <Link
          to="/tools/express-entry-draws"
          className="ml-auto inline-flex items-center gap-1 text-gold hover:text-gold-light font-semibold whitespace-nowrap"
        >
          View all draws <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="text-center text-[10px] text-primary-foreground/50 pb-1.5">
        Updated {formatDate(drawsLastUpdated)} · Source: IRCC
      </div>
    </div>
  );
};

export default LiveDrawTicker;
