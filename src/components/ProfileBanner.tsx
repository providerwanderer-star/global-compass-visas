import { Link } from "react-router-dom";
import { Sparkles, RefreshCw, ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { latestCoreDraw } from "@/data/expressEntryDraws";

/**
 * ProfileBanner — personalized welcome strip.
 * Hidden if no profile data. Dismissable per session.
 */
const ProfileBanner = () => {
  const { profile } = useUserProfile();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;
  // Only show if we know something about the user
  if (!profile.crsScore && !profile.origin && !profile.intent && (profile.visitCount ?? 0) < 2) return null;

  const latestCore = latestCoreDraw();
  const cutoff = latestCore?.crsMin ?? 510;
  const userScore = profile.crsScore;
  const delta = userScore ? userScore - cutoff : null;

  let headline = "Welcome back to 4 Aces Visa";
  let sub = "Your personalized Canada immigration dashboard.";
  let ctaLabel = "Continue your journey";
  let ctaHref = "/quiz";

  if (userScore && delta !== null) {
    if (delta >= 0) {
      headline = `Your CRS ${userScore} clears the latest cut-off (${cutoff})`;
      sub = `You're +${delta} above the most recent General draw. Time to act.`;
      ctaLabel = "Start your PR application";
      ctaHref = "/contact";
    } else {
      headline = `Your CRS ${userScore} is ${Math.abs(delta)} below the latest cut-off (${cutoff})`;
      sub = "Close the gap with PNP, French, or job-offer points.";
      ctaLabel = "See how to boost your score";
      ctaHref = "/crs-calculator";
    }
  } else if (profile.origin === "India") {
    headline = "Welcome back from India";
    sub = "Most popular: Canada PR via Express Entry & Study → PR pathway.";
    ctaHref = "/india";
    ctaLabel = "India → Canada hub";
  } else if (profile.origin === "US") {
    headline = "Welcome back from the US";
    sub = "Top picks: H1B → Canada PR (no LMIA) and OPT → Study Permit transfer.";
    ctaHref = "/blog/h1b-to-canada-pr";
    ctaLabel = "US → Canada playbook";
  } else if (profile.intent === "Study") {
    headline = "Planning to study in Canada?";
    sub = "Get your SDS / non-SDS document checklist and shortlist DLIs.";
    ctaHref = "/services/student-visa";
    ctaLabel = "Study visa pathway";
  }

  return (
    <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-gold/10 border-b border-border">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-gold shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold text-sm md:text-base text-foreground truncate">{headline}</p>
            <p className="text-xs md:text-sm text-muted-foreground truncate">{sub}</p>
          </div>
          <Link
            to={ctaHref}
            className="hidden sm:inline-flex items-center gap-1 bg-gold text-accent-foreground hover:bg-gold-dark font-semibold text-xs px-3 py-1.5 rounded-md shadow-gold transition-colors"
          >
            {ctaLabel} <ArrowRight className="h-3 w-3" />
          </Link>
          {userScore && (
            <Link
              to="/crs-calculator"
              className="hidden md:inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
              title="Recheck your CRS score"
            >
              <RefreshCw className="h-3 w-3" /> Recheck
            </Link>
          )}
          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;