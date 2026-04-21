import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Search, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { nocData, nocCategories, teerInfo, type NOCEntry } from "@/data/nocData";
import PathwayWidget from "@/components/PathwayWidget";
import ConnectedFooter from "@/components/ConnectedFooter";
import ReturnLoopCard from "@/components/ReturnLoopCard";

const NOCFinderPage = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTeer, setSelectedTeer] = useState<string>("All");

  const results = useMemo<NOCEntry[]>(() => {
    const q = query.trim().toLowerCase();
    return nocData.filter((noc) => {
      const matchesSearch =
        !q ||
        noc.title.toLowerCase().includes(q) ||
        noc.code.includes(q) ||
        noc.altTitles.some((t) => t.toLowerCase().includes(q)) ||
        noc.category.toLowerCase().includes(q);
      const matchesCategory =
        selectedCategory === "All" || noc.category === selectedCategory;
      const matchesTeer =
        selectedTeer === "All" || String(noc.teer) === selectedTeer;
      return matchesSearch && matchesCategory && matchesTeer;
    });
  }, [query, selectedCategory, selectedTeer]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Canada NOC Finder",
    url: "https://www.4acesvisa.com/noc-finder",
    applicationCategory: "ImmigrationTool",
    description:
      "Search Canada's National Occupation Classification (NOC) codes, TEER levels, and Express Entry eligibility for 30+ occupations.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a NOC code in Canada?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A NOC (National Occupational Classification) code is a 5-digit number Canada uses to classify every job type. As of 2022, NOC codes use the TEER (Training, Education, Experience, Responsibilities) system with 6 levels (0-5). Express Entry accepts TEER 0, 1, 2, and 3 occupations.",
        },
      },
      {
        "@type": "Question",
        name: "Which NOC TEER levels qualify for Express Entry?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "TEER 0, 1, 2, and 3 occupations qualify for Express Entry (Federal Skilled Worker, Federal Skilled Trades, Canadian Experience Class). TEER 4 and 5 do not qualify for Express Entry but may qualify for Provincial Nominee Programs (PNP).",
        },
      },
      {
        "@type": "Question",
        name: "How do I find my NOC code for a Canadian visa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Search for your job title in the NOC Finder above. Match your duties — not just your job title — to the NOC description. Your employer can confirm the NOC code in a job offer letter. IRCC officers verify NOC codes based on your primary duties.",
        },
      },
      {
        "@type": "Question",
        name: "Can I apply for Canadian PR with a TEER 3 job?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. TEER 3 occupations (like truck driver, NOC 73300) are eligible for Express Entry via the Federal Skilled Trades Program and category-based draws targeting transportation and agriculture. As of 2026, category draws have lowered CRS cutoffs for these occupations.",
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Canada NOC Finder — Search NOC Codes & TEER Levels | 4 Aces Visa</title>
        <meta
          name="description"
          content="Find your Canadian NOC code instantly. Search 500+ occupations by job title, check TEER level, Express Entry eligibility, salary ranges, and top provinces hiring. Updated 2026."
        />
        <link rel="canonical" href="https://www.4acesvisa.com/noc-finder" />
        <meta property="og:title" content="Canada NOC Finder — Search NOC Codes & TEER Levels" />
        <meta
          property="og:description"
          content="Free tool to look up your NOC code, TEER level, and Express Entry eligibility in seconds."
        />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* ── HERO ── */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-3">
              Free Immigration Tool
            </p>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
              Canada NOC Finder
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-2">
              As of 2022, Canada uses the <strong>TEER system</strong> (Training, Education, Experience, Responsibilities) to classify all jobs into 6 levels. TEER 0–3 qualify for Express Entry.
            </p>
            <p className="text-primary-foreground/70 text-base">
              Search your job title or NOC code below to check your Express Entry eligibility instantly.
            </p>
          </div>
        </div>
      </section>

      {/* ── SEARCH + FILTERS ── */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by job title, NOC code, or keyword (e.g. nurse, 21232, welder)…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-base bg-background shadow-sm"
              aria-label="Search NOC occupations"
            />
          </div>

          {/* Filter row */}
          <div className="flex flex-wrap gap-2 mb-8">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {["All", ...nocCategories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:border-primary/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* TEER filter */}
            <div className="flex flex-wrap gap-2 ml-auto">
              {["All", "0", "1", "2", "3", "4", "5"].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTeer(t)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    selectedTeer === t
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:border-primary/40"
                  }`}
                >
                  {t === "All" ? "All TEER" : `TEER ${t}`}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-4">
            {results.length === nocData.length
              ? `Showing all ${nocData.length} occupations`
              : `${results.length} occupation${results.length !== 1 ? "s" : ""} found`}
          </p>

          {/* Result cards */}
          {results.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-semibold">No results for "{query}"</p>
              <p className="text-sm mt-1">Try a different keyword or check the spelling.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((noc) => {
                const teer = teerInfo[noc.teer];
                return (
                  <article
                    key={noc.code}
                    className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:border-primary/40 transition-colors"
                  >
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h2 className="font-display font-bold text-foreground text-lg leading-tight">
                          {noc.title}
                        </h2>
                        <p className="text-xs text-muted-foreground mt-0.5">{noc.category}</p>
                      </div>
                      <span className="shrink-0 font-mono text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground border border-border">
                        {noc.code}
                      </span>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span
                        className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full border ${teer.color}`}
                      >
                        {teer.label}
                      </span>
                      {noc.eeEligible ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="h-3 w-3" /> Express Entry Eligible
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
                          <XCircle className="h-3 w-3" /> Not EE Eligible
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {noc.description}
                    </p>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground border-t border-border pt-3">
                      <div>
                        <span className="font-semibold text-foreground block">Salary (CAD/yr)</span>
                        {noc.salaryRange}
                      </div>
                      <div>
                        <span className="font-semibold text-foreground block">Top Provinces</span>
                        {noc.topProvinces.slice(0, 2).join(", ")}
                      </div>
                    </div>

                    {/* Alt titles */}
                    {noc.altTitles.length > 0 && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">Also known as: </span>
                        {noc.altTitles.slice(0, 3).join(", ")}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── TEER REFERENCE TABLE ── */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            TEER Level Reference Guide
          </h2>
          <p className="text-muted-foreground mb-6">
            Canada's TEER system (introduced November 2022) replaced the old skill-level A/B/C/D classification.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">TEER Level</th>
                  <th className="text-left px-4 py-3 font-semibold">Training Required</th>
                  <th className="text-left px-4 py-3 font-semibold">EE Eligible?</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Examples</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { teer: "TEER 0", training: "Management occupations", eligible: "✅ Yes", examples: "CEO, Director, Head Surgeon", bg: "bg-purple-50" },
                  { teer: "TEER 1", training: "University degree", eligible: "✅ Yes", examples: "Software Developer, RN, Accountant", bg: "" },
                  { teer: "TEER 2", training: "College diploma or 2-yr apprenticeship", eligible: "✅ Yes", examples: "Electrician, Dental Hygienist, Web Designer", bg: "bg-muted/30" },
                  { teer: "TEER 3", training: "High school + short training", eligible: "✅ Yes", examples: "Truck Driver, Security Guard, Admin Officer", bg: "" },
                  { teer: "TEER 4", training: "High school only", eligible: "❌ No", examples: "Food processing worker, Retail clerk", bg: "bg-muted/30" },
                  { teer: "TEER 5", training: "Short work demonstration only", eligible: "❌ No", examples: "Seasonal labourer, General farmworker", bg: "" },
                ].map((row) => (
                  <tr key={row.teer} className={`border-t border-border ${row.bg}`}>
                    <td className="px-4 py-3 font-bold text-foreground">{row.teer}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.training}</td>
                    <td className="px-4 py-3 font-semibold">{row.eligible}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{row.examples}</td>
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
          <h2 className="font-display font-bold text-2xl text-foreground mb-6">
            Frequently Asked Questions — NOC Codes
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "What is a NOC code in Canada?",
                a: "A NOC (National Occupational Classification) code is a 5-digit number Canada uses to classify every job. As of 2022, the system uses TEER levels (0–5). TEER 0–3 are eligible for Express Entry; TEER 4–5 are not.",
              },
              {
                q: "Which TEER levels qualify for Express Entry?",
                a: "TEER 0, 1, 2, and 3 qualify for the Federal Skilled Worker Program (FSWP), Federal Skilled Trades Program (FSTP), and Canadian Experience Class (CEC). TEER 4 and 5 may qualify for some Provincial Nominee Programs (PNPs) but not Express Entry.",
              },
              {
                q: "How do I find my NOC code?",
                a: "Search your job title above. Match your primary duties — not just your title — to the NOC description. Your employer can confirm the NOC in a job offer letter. Use the Government of Canada's official NOC database at noc.esdc.gc.ca for full duty descriptions.",
              },
              {
                q: "Can I apply for Canadian PR with a TEER 3 job?",
                a: "Yes. TEER 3 jobs like truck driver (NOC 73300) qualify via Express Entry's Federal Skilled Trades Program. Category-based draws in 2025–2026 specifically targeted transportation and agriculture workers, often with lower CRS cutoffs.",
              },
              {
                q: "What if my NOC code is TEER 4 or 5?",
                a: "You may still qualify for PR through a Provincial Nominee Program (PNP) — many provinces have pathways for lower-TEER workers, especially in agriculture, food processing, and hospitality. Contact us for a free eligibility assessment.",
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
            Found Your NOC? Check Your CRS Score Next
          </h2>
          <p className="text-primary-foreground/80 mb-6 text-base">
            Once you know your NOC code and TEER level, calculate your Comprehensive Ranking System (CRS) score to see where you stand in the Express Entry pool.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/crs-calculator"
              className="inline-flex items-center justify-center bg-gold text-accent-foreground hover:bg-gold-dark font-bold px-8 py-4 rounded-lg transition-colors"
            >
              Calculate My CRS Score
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center border-2 border-primary-foreground/30 hover:border-primary-foreground text-primary-foreground font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Get Free Assessment
            </Link>
          </div>
        </div>
      </section>
      <PathwayWidget />
      <ReturnLoopCard />
      <ConnectedFooter
        tool={{ label: "CRS Score Calculator", href: "/crs-calculator" }}
        hub={{ label: "PNP Draw Tracker", href: "/pnp-tracker" }}
        funnel={{ label: "Get your best pathway", href: "/quiz" }}
      />
    </>
  );
};

export default NOCFinderPage;
