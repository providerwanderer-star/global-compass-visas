import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

/**
 * Shown on non-Canada country pages to nudge users into our Canada-first portal
 * without breaking existing SEO equity on those pages.
 */
const CanadaRedirectBanner = ({ countryName }: { countryName: string }) => (
  <section className="bg-gold/10 border-y border-gold/30 py-4">
    <div className="container-narrow mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
      <span className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Sparkles className="h-4 w-4 text-gold" />
        Comparing {countryName} with Canada? Most clients now choose Canada for faster PR.
      </span>
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm font-bold text-gold hover:text-gold-dark whitespace-nowrap"
      >
        Explore Canada pathways <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  </section>
);

export default CanadaRedirectBanner;