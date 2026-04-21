import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, ExternalLink, ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import PathwayWidget from "@/components/PathwayWidget";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { expressEntryDraws, drawsLastUpdated } from "@/data/expressEntryDraws";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" });

const faqs = [
  { q: "How often does IRCC hold Express Entry draws?", a: "IRCC typically holds Express Entry draws every 1–2 weeks. They alternate between general all-program draws, program-specific draws (CEC, FSW, FST, PNP), and category-based draws (healthcare, STEM, French, trades, transport, agriculture, education)." },
  { q: "What does CRS cutoff mean?", a: "The CRS cutoff is the minimum Comprehensive Ranking System score required to receive an Invitation to Apply (ITA) in that draw. Anyone in the Express Entry pool with a score equal to or above the cutoff received an ITA." },
  { q: "What are category-based draws?", a: "Since 2023, IRCC runs draws targeting specific categories: healthcare, STEM occupations, trades, transport, agriculture, French-language proficiency, and education. These typically have lower CRS cutoffs because they target labour market needs." },
  { q: "How can I get an ITA in the next draw?", a: "Improve your CRS score before the next draw by: (1) retaking IELTS/CELPIP for higher CLB, (2) securing a PNP nomination (+600), (3) getting a valid LMIA job offer (+50–200), or (4) adding French test results. Use our CRS Calculator to model your changes." },
];

const ExpressEntryDrawsPage = () => (
  <div>
    <Helmet>
      <title>Express Entry Draws 2026 — Latest CRS Cutoffs & ITAs | 4 Aces Visa</title>
      <meta name="description" content="Live archive of Canada Express Entry draws in 2026: dates, CRS cutoffs, categories, and ITAs issued. Updated weekly from IRCC." />
      <link rel="canonical" href="https://www.4acesvisa.com/tools/express-entry-draws" />
      <meta property="og:title" content="Express Entry Draws 2026 — Latest CRS Cutoffs | 4 Aces Visa" />
      <meta property="og:description" content="Track every Canada Express Entry draw in 2026 with CRS cutoffs, ITA counts and category labels." />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Dataset",
              name: "Canada Express Entry Draws 2026",
              description: "Archive of Express Entry draws including CRS cutoff, category and ITAs.",
              url: "https://www.4acesvisa.com/tools/express-entry-draws",
              dateModified: drawsLastUpdated,
              license: "https://www.canada.ca/en/transparency/terms.html",
              creator: { "@type": "Organization", name: "4 Aces Visa" },
              isBasedOn: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile/rounds-invitations.html",
            },
            { "@type": "BreadcrumbList", itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.4acesvisa.com/" },
              { "@type": "ListItem", position: 2, name: "Tools", item: "https://www.4acesvisa.com/tools" },
              { "@type": "ListItem", position: 3, name: "Express Entry Draws", item: "https://www.4acesvisa.com/tools/express-entry-draws" },
            ]},
            { "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
          ],
        })}
      </script>
    </Helmet>

    <section className="bg-primary text-primary-foreground pt-24 pb-10 md:pt-32 md:pb-14">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-5">
          <Link to="/" className="hover:text-gold">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/tools" className="hover:text-gold">Tools</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gold">Express Entry Draws</span>
        </nav>
        <span className="inline-flex items-center gap-2 bg-gold/20 text-gold px-3 py-1.5 rounded-full text-xs font-bold mb-4 border border-gold/30">
          <TrendingUp className="h-3.5 w-3.5" /> Live archive · Updated {formatDate(drawsLastUpdated)}
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-bold mb-3">Express Entry Draw Tracker 2026</h1>
        <p className="text-primary-foreground/70 text-lg max-w-2xl">
          Every recent IRCC draw — date, category, CRS cutoff and ITAs issued. Mirrored from official IRCC sources.
        </p>
      </div>
    </section>

    {/* Latest summary */}
    <section className="section-padding section-light">
      <div className="container-narrow mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {expressEntryDraws.slice(0, 1).map((d) => (
            <>
              <div key="date" className="bg-card border border-border rounded-xl p-5"><p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Latest draw</p><p className="font-display text-xl font-bold text-foreground">{formatDate(d.date)}</p></div>
              <div key="crs" className="bg-card border border-gold/30 rounded-xl p-5"><p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">CRS cutoff</p><p className="font-display text-xl font-bold text-gold">{d.crsCutoff}</p></div>
              <div key="itas" className="bg-card border border-border rounded-xl p-5"><p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">ITAs issued</p><p className="font-display text-xl font-bold text-foreground">{d.invitations.toLocaleString()}</p></div>
              <div key="cat" className="bg-card border border-border rounded-xl p-5"><p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Category</p><p className="text-sm font-bold text-foreground leading-tight">{d.category}</p></div>
            </>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-foreground uppercase tracking-wider">#</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-foreground uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-foreground uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-foreground uppercase tracking-wider">ITAs</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-foreground uppercase tracking-wider">CRS Cutoff</th>
                </tr>
              </thead>
              <tbody>
                {expressEntryDraws.map((d) => (
                  <tr key={d.number} className="border-t border-border hover:bg-secondary/50 transition-colors">
                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs">#{d.number}</td>
                    <td className="px-4 py-3 text-foreground font-medium whitespace-nowrap">{formatDate(d.date)}</td>
                    <td className="px-4 py-3 text-foreground">{d.category}</td>
                    <td className="px-4 py-3 text-right text-foreground tabular-nums">{d.invitations.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right font-bold text-gold tabular-nums">{d.crsCutoff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-4 inline-flex items-center gap-1.5">
          <ExternalLink className="h-3.5 w-3.5" /> Source:
          <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile/rounds-invitations.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-gold underline">IRCC — Rounds of Invitations</a>
        </p>

        {/* CRS Trend Chart */}
        <div className="mt-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">CRS cutoff trend (last {expressEntryDraws.length} draws)</h2>
          <p className="text-sm text-muted-foreground mb-5">PNP draws inflate the line because they require 600+ bonus points. General CEC draws hover around 510–540 in 2026.</p>
          <div className="bg-card border border-border rounded-2xl p-4 md:p-6">
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={[...expressEntryDraws].reverse().map(d => ({ date: d.date.slice(5), crs: d.crsCutoff, category: d.category }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} domain={[380, 760]} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
                />
                <Line type="monotone" dataKey="crs" stroke="hsl(var(--gold))" strokeWidth={2.5} dot={{ r: 3, fill: "hsl(var(--gold))" }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-10">
          <PathwayWidget />
        </div>

        {/* CTA */}
        <div className="mt-10 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-2xl p-6 md:p-8 text-center">
          <h2 className="font-display text-xl md:text-2xl font-bold mb-2">Compare your profile to the latest cutoff</h2>
          <p className="text-primary-foreground/80 text-sm mb-5 max-w-xl mx-auto">Calculate your CRS in 2 minutes and see exactly how many points you need to gain.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/crs-calculator"><Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold">Check My CRS Score <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            <Link to="/contact"><Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">Get Free Profile Review</Button></Link>
          </div>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="section-padding section-soft">
      <div className="container-narrow mx-auto max-w-3xl">
        <AnimatedSection>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">Express Entry Draws — FAQ</h2>
        </AnimatedSection>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="bg-card border border-border rounded-xl p-5 group">
              <summary className="font-semibold text-foreground cursor-pointer list-none flex items-start justify-between gap-4">
                <span>{f.q}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="text-sm text-muted-foreground mt-3 leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default ExpressEntryDrawsPage;
