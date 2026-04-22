import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { MapPin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { pnpDraws, pnpProvinces } from "@/data/pnpDraws";
import PathwayWidget from "@/components/PathwayWidget";
import ConnectedFooter from "@/components/ConnectedFooter";
import ReturnLoopCard from "@/components/ReturnLoopCard";
import FreshnessBanner from "@/components/FreshnessBanner";
import DataSourceNote from "@/components/DataSourceNote";

const provinceColors: Record<string, string> = {
  ON: "bg-blue-100 text-blue-800 border-blue-200",
  BC: "bg-emerald-100 text-emerald-800 border-emerald-200",
  AB: "bg-orange-100 text-orange-800 border-orange-200",
  SK: "bg-yellow-100 text-yellow-800 border-yellow-200",
  MB: "bg-purple-100 text-purple-800 border-purple-200",
  NS: "bg-red-100 text-red-800 border-red-200",
  PE: "bg-pink-100 text-pink-800 border-pink-200",
  NB: "bg-teal-100 text-teal-800 border-teal-200",
};

const PNPTrackerPage = () => {
  const [activeProvince, setActiveProvince] = useState<string>("All");

  const filtered = useMemo(() => {
    if (activeProvince === "All") return pnpDraws;
    return pnpDraws.filter((d) => d.province === activeProvince);
  }, [activeProvince]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Canada PNP Draw Tracker",
    url: "https://www.4acesvisa.com/pnp-tracker",
    applicationCategory: "ImmigrationTool",
    description:
      "Track Provincial Nominee Program (PNP) draws across all Canadian provinces — minimum scores, invitation counts, and stream details.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which Canadian provinces have the lowest PNP score requirements?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "As of 2026, Saskatchewan (SINP), New Brunswick (NBPNP), and Nova Scotia (NSNP) have historically drawn candidates with lower score thresholds, especially for targeted streams in healthcare, agriculture, and trades. Score requirements change with each draw.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between PNP and Express Entry?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Express Entry is a federal immigration system managed by IRCC. PNP (Provincial Nominee Program) lets Canadian provinces nominate workers they need most. A provincial nomination adds 600 CRS points to your Express Entry profile, virtually guaranteeing an ITA. Some PNPs are 'enhanced' (linked to Express Entry) while others are 'base' (separate provincial process).",
        },
      },
      {
        "@type": "Question",
        name: "How does a PNP nomination affect my Express Entry CRS score?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Provincial Nominee Program (PNP) nomination adds 600 additional CRS points to your Express Entry profile. Since the maximum CRS without PNP is around 1,200, a nomination effectively guarantees you will receive an Invitation to Apply (ITA) in the next general draw.",
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>PNP Draw Tracker 2026 — Provincial Nominee Program Draws | 4 Aces Visa</title>
        <meta
          name="description"
          content="Track all Canadian Provincial Nominee Program (PNP) draws in 2026 — Ontario, BC, Alberta, Saskatchewan, Manitoba and more. Minimum scores, ITAs, and stream details updated regularly."
        />
        <link rel="canonical" href="https://www.4acesvisa.com/pnp-tracker" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="4 Aces Visa" />
        <meta property="og:title" content="PNP Draw Tracker 2026 — Provincial Nominee Program Draws | 4 Aces Visa" />
        <meta property="og:description" content="Track all Canadian Provincial Nominee Program (PNP) draws in 2026 — Ontario, BC, Alberta, Saskatchewan, Manitoba and more. Minimum scores, ITAs, and stream details updated regularly." />
        <meta property="og:url" content="https://www.4acesvisa.com/pnp-tracker" />
        <meta property="og:image" content="https://www.4acesvisa.com/og-default.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@4acesvisa" />
        <meta name="twitter:image" content="https://www.4acesvisa.com/og-default.jpg" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.4acesvisa.com/"},{"@type":"ListItem","position":2,"name":"PNP Tracker","item":"https://www.4acesvisa.com/pnp-tracker"}]})}</script>
      </Helmet>

      {/* ── HERO ── */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-3">
              Updated Regularly
            </p>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
              PNP Draw Tracker
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Provincial Nominee Program draws across all Canadian provinces. A PNP nomination adds <strong className="text-gold">+600 CRS points</strong> — virtually guaranteeing an Express Entry ITA.
            </p>
          </div>
        </div>
      </section>

      {/* ── PNP + EE ADVANTAGE CALLOUT ── */}
      <section className="py-8 section-soft border-b border-border">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <FreshnessBanner topic="pnp" className="mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-card rounded-xl border border-border p-5 text-center">
              <div className="text-3xl font-bold text-primary mb-1">+600</div>
              <div className="text-sm text-muted-foreground">CRS points added with a provincial nomination</div>
            </div>
            <div className="bg-card rounded-xl border border-border p-5 text-center">
              <div className="text-3xl font-bold text-primary mb-1">13</div>
              <div className="text-sm text-muted-foreground">provinces &amp; territories with active PNP streams</div>
            </div>
            <div className="bg-card rounded-xl border border-border p-5 text-center">
              <div className="text-3xl font-bold text-primary mb-1">~2 wks</div>
              <div className="text-sm text-muted-foreground">typical draw frequency for most provinces</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROVINCE FILTER + DRAW CARDS ── */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          {/* Province filter tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {pnpProvinces.map((prov) => (
              <button
                key={prov}
                onClick={() => setActiveProvince(prov)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  activeProvince === prov
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary/40"
                }`}
              >
                {prov}
              </button>
            ))}
          </div>

          {/* Draw cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((draw, i) => (
              <article
                key={i}
                className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full border ${provinceColors[draw.provinceCode] || "bg-gray-100 text-gray-700"}`}>
                        {draw.provinceCode}
                      </span>
                      <span className="text-xs text-muted-foreground">{draw.date}</span>
                    </div>
                    <h2 className="font-display font-bold text-foreground text-base leading-tight">
                      {draw.province}
                    </h2>
                    <p className="text-sm text-muted-foreground">{draw.stream}</p>
                  </div>
                  <a
                    href={draw.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`Official ${draw.province} PNP page`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/40 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-primary">
                      {draw.minScore !== undefined ? draw.minScore : "—"}
                    </div>
                    <div className="text-xs text-muted-foreground">Min Score</div>
                  </div>
                  <div className="bg-muted/40 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-primary">
                      {draw.invitations.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Invitations</div>
                  </div>
                </div>

                {draw.notes && (
                  <p className="text-xs text-muted-foreground mt-3 italic">{draw.notes}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PNP vs EE TABLE ── */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">PNP vs. Express Entry — What's the Difference?</h2>
          <p className="text-muted-foreground mb-6">Two pathways to Canadian PR — understand which is right for you.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold w-1/3">Factor</th>
                  <th className="text-left px-4 py-3 font-semibold">Express Entry (Federal)</th>
                  <th className="text-left px-4 py-3 font-semibold">PNP (Provincial)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Managed by", "IRCC (federal)", "Each province separately"],
                  ["Score system", "CRS (max ~1200)", "Province-specific (varies)"],
                  ["Processing time", "~6 months", "~12–18 months (base PNP)"],
                  ["Job offer required?", "No (but helps +50/200 CRS)", "Often yes (some streams)"],
                  ["Best for", "High CRS scores (480+)", "Lower CRS but in-demand occupation"],
                  ["Combined pathway", "—", "PNP nomination adds +600 CRS"],
                ].map(([factor, ee, pnp], i) => (
                  <tr key={factor} className={`border-t border-border ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                    <td className="px-4 py-3 font-semibold text-foreground">{factor}</td>
                    <td className="px-4 py-3 text-muted-foreground">{ee}</td>
                    <td className="px-4 py-3 text-muted-foreground">{pnp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="font-display font-bold text-2xl text-foreground mb-6">PNP FAQs</h2>
          <div className="space-y-3">
            {[
              {
                q: "Which province has the easiest PNP to get in 2026?",
                a: "It depends on your occupation and profile. Saskatchewan (SINP) and New Brunswick (NBPNP) have historically invited candidates with lower score thresholds. BC PNP's Tech stream is popular for IT workers. There is no universally 'easiest' PNP — the right fit depends on your NOC code and work experience.",
              },
              {
                q: "How does a PNP nomination affect my Express Entry CRS?",
                a: "A provincial nomination adds 600 CRS points to your Express Entry profile. Since general draws in 2026 have cutoffs around 505–515, a nomination takes your effective score well above 1,100, guaranteeing you receive an ITA in the next general draw.",
              },
              {
                q: "Do I need a job offer for a PNP?",
                a: "It depends on the stream. Many PNP streams (like Ontario's Employer Job Offer stream, Alberta's Opportunity Stream) require a job offer from a provincial employer. However, Express Entry-linked PNP streams (like Ontario's Human Capital Priorities) do not require a job offer if you meet the CRS threshold.",
              },
              {
                q: "How long does PNP processing take?",
                a: "Base PNP applications (outside Express Entry) typically take 12–18 months: 6–12 months for provincial processing plus 6–12 months for IRCC PR processing. Enhanced PNP (through Express Entry) is faster — typically 6 months — once you receive the provincial nomination.",
              },
            ].map(({ q, a }) => (
              <details key={q} className="group bg-card border border-border rounded-xl">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-foreground text-sm list-none">
                  {q}
                  <span className="ml-3 shrink-0 text-muted-foreground group-open:rotate-45 transition-transform duration-200 text-xl leading-none">+</span>
                </summary>
                <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <DataSourceNote
        updated="2026-04-22"
        sources={[
          { label: "Ontario (OINP)", href: "https://www.ontario.ca/page/ontario-immigrant-nominee-program" },
          { label: "BC PNP", href: "https://www.welcomebc.ca/immigrate-to-b-c/about-the-bc-pnp" },
          { label: "Alberta (AAIP)", href: "https://www.alberta.ca/alberta-advantage-immigration-program" },
          { label: "Saskatchewan (SINP)", href: "https://www.saskatchewan.ca/residents/moving-to-saskatchewan/live-in-saskatchewan/by-immigrating/saskatchewan-immigrant-nominee-program" },
          { label: "Manitoba (MPNP)", href: "https://immigratemanitoba.com/" },
        ]}
        caveat="Each province publishes its own draw history; we mirror the most recent invitations and minimum scores. Always confirm eligibility on the official provincial site before applying."
      />

      {/* ── CTA ── */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-2xl sm:text-3xl mb-3">
            Not Sure Which Province to Target?
          </h2>
          <p className="text-primary-foreground/80 mb-6">
            Our consultants match your NOC code, CRS score, and work history to the best PNP streams for your profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center bg-gold text-accent-foreground hover:bg-gold-dark font-bold px-8 py-4 rounded-lg transition-colors">
              Get Free PNP Assessment
            </Link>
            <Link to="/crs-calculator" className="inline-flex items-center justify-center border-2 border-primary-foreground/30 hover:border-primary-foreground text-primary-foreground font-semibold px-8 py-4 rounded-lg transition-colors">
              Calculate CRS Score
            </Link>
          </div>
        </div>
      </section>
      <PathwayWidget />
      <ReturnLoopCard />
      <ConnectedFooter
        tool={{ label: "CRS Score Calculator", href: "/crs-calculator" }}
        hub={{ label: "Canada Immigration Hub", href: "/immigration/canada" }}
        funnel={{ label: "Get your best PR pathway", href: "/quiz" }}
      />
    </>
  );
};

export default PNPTrackerPage;
