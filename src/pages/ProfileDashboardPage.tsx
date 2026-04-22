import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Calculator,
  Compass,
  Flag,
  Briefcase,
  TrendingUp,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/hooks/useUserProfile";
import { crsBands } from "@/data/crsBandData";
import { originCountries } from "@/data/geoOriginData";
import { settlementGuides } from "@/data/settlementData";

function bandForScore(score: number): string {
  if (score < 350) return "below-350";
  if (score < 400) return "350-400";
  if (score < 450) return "400-450";
  if (score < 500) return "450-plus";
  return "500-plus";
}

const ProfileDashboardPage = () => {
  const { profile, reset } = useUserProfile();

  const recommendedBand =
    profile.crsScore !== null
      ? crsBands.find((b) => b.slug === bandForScore(profile.crsScore!))
      : null;

  const originSlugMap: Record<string, string> = {
    India: "india",
    US: "usa",
  };
  const recommendedOrigin =
    profile.origin && originSlugMap[profile.origin]
      ? originCountries.find((o) => o.slug === originSlugMap[profile.origin!])
      : null;

  const featuredSettlement = settlementGuides.slice(0, 3);

  const hasProfile =
    profile.origin || profile.intent || profile.crsScore !== null || profile.nocCode;

  return (
    <div className="bg-background min-h-screen">
      <Helmet>
        <title>{`Your immigration dashboard | 4 Aces Visa`}</title>
        <meta
          name="description"
          content="Your personalized Canada immigration dashboard — CRS, NOC, origin and recommended pathway in one view."
        />
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href="https://www.4acesvisa.com/dashboard" />
        <meta property="og:title" content="Your immigration dashboard | 4 Aces Visa" />
        <meta property="og:description" content="Your personalized Canada immigration dashboard — CRS, NOC, origin and recommended pathway in one view." />
        <meta property="og:url" content="https://www.4acesvisa.com/dashboard" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your immigration dashboard | 4 Aces Visa" />
        <meta name="twitter:description" content="Your personalized Canada immigration dashboard — CRS, NOC, origin and recommended pathway in one view." />
      </Helmet>

      <section className="section-padding section-light">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">
              Your dashboard
            </p>
            {hasProfile && (
              <button
                onClick={reset}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
              >
                <RotateCcw className="h-3 w-3" /> Reset profile
              </button>
            )}
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            {hasProfile ? "Welcome back" : "Build your immigration profile"}
          </h1>
          <p className="text-muted-foreground">
            {hasProfile
              ? `Visit ${profile.visitCount} • Last seen ${profile.lastVisit ? new Date(profile.lastVisit).toLocaleDateString() : "just now"}.`
              : "Tell us your origin, intent and CRS once — we'll personalize every page from then on."}
          </p>
        </div>
      </section>

      {/* Profile snapshot */}
      <section className="section-padding">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-card border border-border rounded-xl p-4">
              <Flag className="h-5 w-5 text-primary mb-2" />
              <p className="text-xs uppercase text-muted-foreground font-semibold">Origin</p>
              <p className="font-display text-lg font-bold text-foreground">
                {profile.origin ?? "—"}
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <Compass className="h-5 w-5 text-primary mb-2" />
              <p className="text-xs uppercase text-muted-foreground font-semibold">Intent</p>
              <p className="font-display text-lg font-bold text-foreground">
                {profile.intent ?? "—"}
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <Calculator className="h-5 w-5 text-primary mb-2" />
              <p className="text-xs uppercase text-muted-foreground font-semibold">CRS</p>
              <p className="font-display text-lg font-bold text-foreground">
                {profile.crsScore ?? "—"}
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <Briefcase className="h-5 w-5 text-primary mb-2" />
              <p className="text-xs uppercase text-muted-foreground font-semibold">NOC</p>
              <p className="font-display text-lg font-bold text-foreground">
                {profile.nocCode ?? "—"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            Recommended next steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {!profile.crsScore && (
              <Link
                to="/crs-calculator"
                className="bg-card border border-border hover:border-primary rounded-xl p-4 card-interactive flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-foreground">Calculate your CRS score</p>
                  <p className="text-xs text-muted-foreground">Takes 60 seconds.</p>
                </div>
                <ArrowRight className="h-4 w-4 text-primary" />
              </Link>
            )}
            {!profile.nocCode && (
              <Link
                to="/noc-finder"
                className="bg-card border border-border hover:border-primary rounded-xl p-4 card-interactive flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-foreground">Find your NOC code</p>
                  <p className="text-xs text-muted-foreground">Match your job title to NOC 2021.</p>
                </div>
                <ArrowRight className="h-4 w-4 text-primary" />
              </Link>
            )}
            {!profile.intent && (
              <Link
                to="/quiz"
                className="bg-card border border-border hover:border-primary rounded-xl p-4 card-interactive flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-foreground">Take the eligibility quiz</p>
                  <p className="text-xs text-muted-foreground">Discover your best PR pathway.</p>
                </div>
                <ArrowRight className="h-4 w-4 text-primary" />
              </Link>
            )}
            {recommendedBand && (
              <Link
                to={`/canada-pr/crs/${recommendedBand.slug}`}
                className="bg-card border border-border hover:border-primary rounded-xl p-4 card-interactive flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-foreground">
                    Strategy for CRS {recommendedBand.label}
                  </p>
                  <p className="text-xs text-muted-foreground">Tailored to your score.</p>
                </div>
                <ArrowRight className="h-4 w-4 text-primary" />
              </Link>
            )}
            {recommendedOrigin && (
              <Link
                to={`/canada-pr-from/${recommendedOrigin.slug}`}
                className="bg-card border border-border hover:border-primary rounded-xl p-4 card-interactive flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-foreground">
                    {recommendedOrigin.flag} Canada PR from {recommendedOrigin.country}
                  </p>
                  <p className="text-xs text-muted-foreground">Cost & timeline overview.</p>
                </div>
                <ArrowRight className="h-4 w-4 text-primary" />
              </Link>
            )}
            <Link
              to="/express-entry/draws"
              className="bg-card border border-border hover:border-primary rounded-xl p-4 card-interactive flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-foreground inline-flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" /> Latest Express Entry draws
                </p>
                <p className="text-xs text-muted-foreground">Live CRS cut-offs.</p>
              </div>
              <ArrowRight className="h-4 w-4 text-primary" />
            </Link>
          </div>
        </div>
      </section>

      {/* Settlement preview */}
      <section className="section-padding">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            Once you land in Canada
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {featuredSettlement.map((g) => (
              <Link
                key={g.slug}
                to={`/settle-in-canada/${g.slug}`}
                className="bg-card border border-border hover:border-primary rounded-xl p-4 card-interactive"
              >
                <div className="text-2xl mb-1" aria-hidden="true">{g.emoji}</div>
                <p className="font-semibold text-sm text-foreground">{g.topic}</p>
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <Button asChild variant="outline" size="sm">
              <Link to="/settle-in-canada">View all 6 settlement guides</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileDashboardPage;
