import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { TrendingUp, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { expressEntryDraws, drawCategories, avgCRS } from "@/data/expressEntryDraws";
import PathwayWidget from "@/components/PathwayWidget";
import ConnectedFooter from "@/components/ConnectedFooter";
import ReturnLoopCard from "@/components/ReturnLoopCard";
import FreshnessBanner from "@/components/FreshnessBanner";

const categoryColors: Record<string, string> = {
  General:     "bg-blue-100 text-blue-800 border-blue-200",
  STEM:        "bg-purple-100 text-purple-800 border-purple-200",
  Healthcare:  "bg-emerald-100 text-emerald-800 border-emerald-200",
  Trades:      "bg-orange-100 text-orange-800 border-orange-200",
  Transport:   "bg-yellow-100 text-yellow-800 border-yellow-200",
  Agriculture: "bg-lime-100 text-lime-800 border-lime-200",
  French:      "bg-red-100 text-red-800 border-red-200",
  Education:   "bg-teal-100 text-teal-800 border-teal-200",
};

const DrawHistoryPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [crsCheck, setCrsCheck] = useState<string>("");

  const filtered = useMemo(() => {
    if (activeCategory === "All") return expressEntryDraws;
    return expressEntryDraws.filter((d) => d.category === activeCategory);
  }, [activeCategory]);

  // "Does my score qualify?" widget
  const crsNum = parseInt(crsCheck, 10);
  const lastGeneral = expressEntryDraws.find((d) => d.category === "General");
  const lastDraw = expressEntryDraws[0];
  const qualifiesLatest = !isNaN(crsNum) && crsNum >= lastDraw.crsMin;
  const qualifiesGeneral = !isNaN(crsNum) && lastGeneral && crsNum >= lastGeneral.crsMin;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Express Entry Draw History",
    url: "https://www.4acesvisa.com/express-entry/draws",
    applicationCategory: "ImmigrationTool",
    description: "Complete history of Express Entry draws with CRS cutoffs, ITAs issued, and category breakdowns. Updated after every draw.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What was the latest Express Entry draw CRS cutoff?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `The most recent draw (#${lastDraw.drawNumber}) on ${lastDraw.date} was a ${lastDraw.category} draw with a CRS cutoff of ${lastDraw.crsMin}, inviting ${lastDraw.itas.toLocaleString()} candidates. Cutoffs change every draw — check this page for the latest.`,
        },
      },
      {
        "@type": "Question",
        name: "How often does IRCC run Express Entry draws?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "IRCC typically runs Express Entry draws every two weeks, alternating between General draws and category-based draws. Category draws target specific groups: STEM, Healthcare, Trades, Transportation, Agriculture, French-language proficiency, and Education.",
        },
      },
      {
        "@type": "Question",
        name: "What is a category-based Express Entry draw?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Canada introduced category-based draws in 2023 to target occupations with the highest labour shortages. Instead of drawing purely by CRS score, IRCC selects candidates from specific fields like STEM or Healthcare. Category draws often have lower CRS cutoffs than General draws.",
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Express Entry Draw History 2025–2026 — CRS Cutoffs & ITAs | 4 Aces Visa</title>
        <meta
          name="description"
          content="Complete Express Entry draw history with CRS cutoffs, ITAs issued, and category breakdown. Check if your score qualifies and see trends for General, STEM, Healthcare, and Trades draws."
        />
        <link rel="canonical" href="https://www.4acesvisa.com/express-entry/draws" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="4 Aces Visa" />
        <meta property="og:title" content="Express Entry Draw History 2025–2026 — CRS Cutoffs & ITAs | 4 Aces Visa" />
        <meta property="og:description" content="Complete Express Entry draw history with CRS cutoffs, ITAs issued, and category breakdown. Check if your score qualifies and see trends for General, STEM, Healthcare, and Trades draws." />
        <meta property="og:url" content="https://www.4acesvisa.com/express-entry/draws" />
        <meta property="og:image" content="https://www.4acesvisa.com/og-default.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@4acesvisa" />
        <meta name="twitter:image" content="https://www.4acesvisa.com/og-default.jpg" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.4acesvisa.com/"},{"@type":"ListItem","position":2,"name":"Express Entry Draw History","item":"https://www.4acesvisa.com/express-entry/draws"}]})}</script>
      </Helmet>

      {/* ── HERO ── */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-3">
              Updated After Every Draw
            </p>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
              Express Entry Draw History
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Every IRCC draw from 2025–2026 — CRS cutoffs, ITAs issued, and category breakdowns. Latest draw: <strong className="text-gold">Draw #{lastDraw.drawNumber}</strong> on {lastDraw.date} ({lastDraw.category}, CRS {lastDraw.crsMin}).
            </p>
          </div>
        </div>
      </section>

      {/* ── DOES MY SCORE QUALIFY? WIDGET ── */}
      <section className="py-8 section-soft border-b border-border">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <FreshnessBanner topic="express-entry" className="mb-6" />
          <div className="bg-card rounded-2xl border-2 border-border p-6 max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="font-display font-bold text-lg text-foreground">Does My CRS Score Qualify?</h2>
            </div>
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-foreground mb-1">
                  Enter your CRS score
                </label>
                <input
                  type="number"
                  min="300"
                  max="1200"
                  placeholder="e.g. 480"
                  value={crsCheck}
                  onChange={(e) => setCrsCheck(e.target.value)}
                  className="w-full border-2 border-border rounded-lg px-4 py-2.5 text-base focus:border-primary focus:outline-none"
                />
              </div>
              <Link
                to="/crs-calculator"
                className="text-sm text-primary font-semibold hover:underline whitespace-nowrap pb-2.5"
              >
                Calculate my score →
              </Link>
            </div>

            {!isNaN(crsNum) && crsNum > 200 && (
              <div className="mt-4 space-y-2">
                <div className={`flex items-center gap-2 p-3 rounded-lg text-sm font-semibold ${qualifiesLatest ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`}>
                  {qualifiesLatest ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <XCircle className="h-4 w-4 shrink-0" />}
                  {qualifiesLatest
                    ? `Your score of ${crsNum} would have qualified for the last ${lastDraw.category} draw (cutoff: ${lastDraw.crsMin})`
                    : `Your score of ${crsNum} is ${lastDraw.crsMin - crsNum} points below the last ${lastDraw.category} draw (cutoff: ${lastDraw.crsMin})`}
                </div>
                {lastGeneral && (
                  <div className={`flex items-center gap-2 p-3 rounded-lg text-sm font-semibold ${qualifiesGeneral ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"}`}>
                    {qualifiesGeneral ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <XCircle className="h-4 w-4 shrink-0" />}
                    {qualifiesGeneral
                      ? `You would have qualified for the last General draw (cutoff: ${lastGeneral.crsMin})`
                      : `${lastGeneral.crsMin - crsNum} points below last General draw (cutoff: ${lastGeneral.crsMin}) — consider category draws or improving your profile`}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CATEGORY AVERAGES ── */}
      <section className="py-6 section-light border-b border-border">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-base text-foreground mb-4">Average CRS Cutoff by Category (2025–2026)</h2>
          <div className="flex flex-wrap gap-3">
            {(["General", "STEM", "Healthcare", "Trades", "Transport", "Agriculture", "French"] as const).map((cat) => {
              const avg = avgCRS(cat);
              if (!avg) return null;
              const latestForCat = expressEntryDraws.find((d) => d.category === cat);
              return avg ? (
                <div key={cat} className={`px-4 py-2.5 rounded-xl border text-xs font-semibold ${categoryColors[cat] || "bg-gray-100 text-gray-800"}`}>
                  <span className="block font-bold text-sm">{cat}</span>
                  <span>Avg CRS: {avg}</span>
                  {latestForCat && <span className="block opacity-70">Latest: {latestForCat.crsMin}</span>}
                </div>
              ) : null;
            })}
          </div>
        </div>
      </section>

      {/* ── DRAW TABLE ── */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {drawCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Draw #</th>
                  <th className="text-left px-4 py-3 font-semibold">Date</th>
                  <th className="text-left px-4 py-3 font-semibold">Category</th>
                  <th className="text-right px-4 py-3 font-semibold">CRS Cutoff</th>
                  <th className="text-right px-4 py-3 font-semibold">ITAs Issued</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((draw, i) => (
                  <tr key={draw.drawNumber} className={`border-t border-border ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                    <td className="px-4 py-3 font-mono text-muted-foreground">#{draw.drawNumber}</td>
                    <td className="px-4 py-3 text-foreground font-medium">{draw.date}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full border ${categoryColors[draw.category] || "bg-gray-100 text-gray-700"}`}>
                        {draw.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-foreground text-base">{draw.crsMin}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground">{draw.itas.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-muted-foreground mt-3">
            Source: IRCC official draw results. Updated within 24 hours of each draw.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="font-display font-bold text-2xl text-foreground mb-6">
            Express Entry Draw FAQs
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "What was the latest Express Entry draw CRS cutoff?",
                a: `Draw #${lastDraw.drawNumber} on ${lastDraw.date} was a ${lastDraw.category} draw with a CRS cutoff of ${lastDraw.crsMin}, inviting ${lastDraw.itas.toLocaleString()} candidates.`,
              },
              {
                q: "How often does IRCC run Express Entry draws?",
                a: "IRCC typically runs draws every two weeks, alternating between General draws and category-based draws targeting STEM, Healthcare, Trades, Transportation, Agriculture, and French-language proficiency.",
              },
              {
                q: "What is a category-based Express Entry draw?",
                a: "Category draws (introduced 2023) target specific occupation groups with high labour demand. They often have lower CRS cutoffs than General draws, giving lower-scoring candidates in targeted fields a better chance.",
              },
              {
                q: "What CRS score do I need for Express Entry in 2026?",
                a: `General draws in 2026 have required roughly 505–515 CRS. Category draws (STEM, Healthcare) have required 431–482. Your target score depends on which category you fall into. Use our CRS Calculator to find your score.`,
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

      {/* ── CTA ── */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-2xl sm:text-3xl mb-3">
            Ready to Enter the Express Entry Pool?
          </h2>
          <p className="text-primary-foreground/80 mb-6">
            Calculate your CRS score, find your NOC code, and get a free assessment from our RCIC-licensed consultants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/crs-calculator" className="inline-flex items-center justify-center bg-gold text-accent-foreground hover:bg-gold-dark font-bold px-8 py-4 rounded-lg transition-colors">
              Calculate CRS Score
            </Link>
            <Link to="/noc-finder" className="inline-flex items-center justify-center border-2 border-primary-foreground/30 hover:border-primary-foreground text-primary-foreground font-semibold px-8 py-4 rounded-lg transition-colors">
              Find My NOC Code
            </Link>
          </div>
        </div>
      </section>
      <PathwayWidget />
      <ReturnLoopCard />
      <ConnectedFooter
        tool={{ label: "PNP Draw Tracker", href: "/pnp-tracker" }}
        hub={{ label: "Express Entry Hub", href: "/express-entry" }}
        funnel={{ label: "Compare your profile", href: "/compare" }}
      />
    </>
  );
};

export default DrawHistoryPage;
