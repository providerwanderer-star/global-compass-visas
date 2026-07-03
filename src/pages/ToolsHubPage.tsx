import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Calculator,
  Search,
  TrendingUp,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Compass,
  ArrowRight,
  Wrench,
} from "lucide-react";
import SeoSchema from "@/components/SeoSchema";
import EligibilityForm from "@/components/EligibilityForm";

const SITE = "https://www.4acesvisa.com";

interface Tool {
  title: string;
  href: string;
  desc: string;
  Icon: typeof Calculator;
  tag: "Calculator" | "Tracker" | "Search" | "Quiz";
}

const TOOLS: Tool[] = [
  {
    title: "CRS Score Calculator",
    href: "/crs-calculator",
    desc: "Estimate your Express Entry CRS score with spouse, education, language and work-experience factors — plus improvement tips.",
    Icon: Calculator,
    tag: "Calculator",
  },
  {
    title: "Immigration Cost Calculator",
    href: "/immigration-cost-calculator",
    desc: "Add up IRCC government fees, biometrics, medicals, ECA, language tests and proof-of-funds for your pathway.",
    Icon: DollarSign,
    tag: "Calculator",
  },
  {
    title: "NOC Code Finder",
    href: "/noc-finder",
    desc: "Search 500+ occupations by title or duty and get TEER, Express Entry eligibility and matching PNP streams.",
    Icon: Search,
    tag: "Search",
  },
  {
    title: "Express Entry Draw History",
    href: "/express-entry/draws",
    desc: "Full IRCC Express Entry draw archive — filter by program (CEC, FSW, PNP, category-based) and see cutoff trends.",
    Icon: TrendingUp,
    tag: "Tracker",
  },
  {
    title: "PNP Draw Tracker",
    href: "/pnp-tracker",
    desc: "Provincial Nominee Program draws across every province and territory — updated as results are published.",
    Icon: MapPin,
    tag: "Tracker",
  },
  {
    title: "IRCC Processing Times",
    href: "/processing-times",
    desc: "Current published processing times for Express Entry, PNP, study permits, work permits, PR cards and citizenship.",
    Icon: Clock,
    tag: "Tracker",
  },
  {
    title: "In-Demand Jobs in Canada",
    href: "/in-demand-jobs",
    desc: "Category-based Express Entry priority occupations — healthcare, STEM, trades, transport, agriculture.",
    Icon: Briefcase,
    tag: "Search",
  },
  {
    title: "Pathway Quiz",
    href: "/quiz",
    desc: "Answer 6 quick questions and get a personalized shortlist of Canadian PR and work-permit pathways.",
    Icon: Compass,
    tag: "Quiz",
  },
];

const ToolsHubPage = () => {
  const title = "Free Canada Immigration Tools & Calculators (2026) | 4 Aces Visa";
  const description =
    "Free tools built by RCIC-regulated consultants: CRS calculator, cost estimator, NOC finder, Express Entry & PNP draw trackers, IRCC processing times.";
  const canonical = `${SITE}/tools`;

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: TOOLS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE}${t.href}`,
      name: t.title,
    })),
  };

  return (
    <div className="bg-background">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify(itemListLd)}</script>
      </Helmet>
      <SeoSchema breadcrumbs={[{ name: "Tools", url: "/tools" }]} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-wider text-primary mb-2 inline-flex items-center gap-2">
            <Wrench className="h-4 w-4" /> Free Immigration Tools
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3">
            Canada immigration tools &amp; calculators
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Every tool below is free, built for prospective PR applicants, and maintained by our
            RCIC-regulated immigration team. No sign-up required.
          </p>
        </div>
      </section>

      {/* Tools grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS.map(({ title, href, desc, Icon, tag }) => (
            <Link
              key={href}
              to={href}
              className="group bg-card rounded-2xl border border-border hover:border-primary p-5 transition-all hover:shadow-md flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary inline-flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border border-border rounded-full px-2 py-0.5">
                  {tag}
                </span>
              </div>
              <h2 className="font-display text-lg font-bold text-foreground mb-1 group-hover:text-primary">
                {title}
              </h2>
              <p className="text-sm text-muted-foreground flex-1">{desc}</p>
              <span className="mt-4 text-sm font-semibold text-primary inline-flex items-center gap-1">
                Open tool <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Why use */}
      <section className="border-y border-border bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 max-w-5xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            Built by a regulated immigration team
          </h2>
          <div className="grid gap-6 md:grid-cols-3 text-sm text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground mb-1">IRCC-aligned data</h3>
              <p>Cutoffs, fees and processing times mirror the latest IRCC and provincial publications, and are reviewed by our consultants.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">No sign-up, no upsell</h3>
              <p>Every tool works without an account. You'll never be asked for a credit card to see your result.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Human backup</h3>
              <p>If a result surprises you, our 4 Aces Visa Immigration Team can review it on a free 15-minute discovery call.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="text-center mb-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Want a human check on your result?
            </h2>
            <p className="text-muted-foreground">
              Share your profile and our team will confirm the best-fit pathway — free.
            </p>
          </div>
          <EligibilityForm sourcePage="tools-hub" heading="Free eligibility review" />
        </div>
      </section>
    </div>
  );
};

export default ToolsHubPage;