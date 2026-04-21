import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, ExternalLink, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import PathwayWidget from "@/components/PathwayWidget";
import { pnpSnapshots, pnpLastUpdated } from "@/data/pnpDraws";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" });

const faqs = [
  { q: "What is a Provincial Nominee Program (PNP)?", a: "Each Canadian province (except Quebec, which has its own system) runs a Provincial Nominee Program to nominate immigrants whose skills meet local labour-market needs. A PNP nomination adds 600 CRS points to an Express Entry profile, virtually guaranteeing an Invitation to Apply." },
  { q: "Which province has the easiest PNP in 2026?", a: "There is no universally easiest PNP — the right province depends on your occupation, language ability and ties. Saskatchewan SINP and Manitoba MPNP often have lower thresholds for in-demand occupations. Ontario OINP Tech is highly competitive but has frequent draws. Atlantic provinces are accessible if you have a job offer." },
  { q: "How do I apply for a PNP?", a: "Most provinces use an Expression of Interest (EOI) system. You create a province-specific profile, get scored, and wait for an invitation. Some streams require a job offer; others (like Ontario Human Capital Priorities) do not. After nomination, you submit your full PR application via Express Entry or paper-based PNP." },
  { q: "How long does PNP processing take?", a: "Provincial nomination itself takes 2–6 months depending on stream. Once nominated, PR processing via Express Entry takes about 11 months; paper-based PNP takes around 21 months." },
];

const PNPDrawsPage = () => {
  const [filter, setFilter] = useState<string>("all");
  const filtered = useMemo(
    () => filter === "all" ? pnpSnapshots : pnpSnapshots.filter((p) => p.code === filter),
    [filter]
  );
  return (
  <div>
    <Helmet>
      <title>Canada PNP Draw Tracker 2026 — Provincial Nomination Updates | 4 Aces Visa</title>
      <meta name="description" content="Latest Provincial Nominee Program draws across Canada: Ontario, BC, Alberta, Saskatchewan, Manitoba, Atlantic provinces. Cutoffs, streams and official sources." />
      <link rel="canonical" href="https://www.4acesvisa.com/tools/pnp-draws" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Dataset", name: "Canada PNP Draws 2026", description: "Snapshot of latest Provincial Nominee Program draws by province.", url: "https://www.4acesvisa.com/tools/pnp-draws", dateModified: pnpLastUpdated },
            { "@type": "BreadcrumbList", itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.4acesvisa.com/" },
              { "@type": "ListItem", position: 2, name: "Tools", item: "https://www.4acesvisa.com/tools" },
              { "@type": "ListItem", position: 3, name: "PNP Draws", item: "https://www.4acesvisa.com/tools/pnp-draws" },
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
          <span className="text-gold">PNP Draws</span>
        </nav>
        <span className="inline-flex items-center gap-2 bg-gold/20 text-gold px-3 py-1.5 rounded-full text-xs font-bold mb-4 border border-gold/30">
          <MapPin className="h-3.5 w-3.5" /> Updated {formatDate(pnpLastUpdated)}
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-bold mb-3">PNP Draw Tracker — All Provinces</h1>
        <p className="text-primary-foreground/70 text-lg max-w-2xl">
          Latest provincial nomination draws across Canada. Each card shows the most recent invitation round and links to the official source.
        </p>
      </div>
    </section>

    <section className="section-padding section-light">
      <div className="container-narrow mx-auto">
        <div className="bg-secondary/60 border border-border rounded-xl p-4 mb-8 text-sm text-muted-foreground">
          ⚠️ <strong className="text-foreground">Snapshot data:</strong> Provincial draws happen on different schedules and aren't published via a unified API. We mirror official sources weekly. Always verify the latest update on each province's official page (linked below).
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pnpSnapshots.map((p) => (
            <div key={p.code} className="bg-card border border-border rounded-2xl p-6 card-interactive">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-3xl mb-1">{p.flag}</div>
                  <h2 className="font-display text-lg font-bold text-foreground">{p.province}</h2>
                  <p className="text-xs text-muted-foreground">{p.program}</p>
                </div>
                <span className="text-[10px] font-bold bg-gold/10 text-gold px-2 py-1 rounded uppercase tracking-wider">{p.code}</span>
              </div>
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Latest draw</span><span className="font-semibold text-foreground">{formatDate(p.latestDate)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Stream</span><span className="font-semibold text-foreground text-right max-w-[60%]">{p.latestStream}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Invitations</span><span className="font-semibold text-foreground tabular-nums">{p.invitations.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Cutoff</span><span className="font-bold text-gold">{p.scoreCutoff}</span></div>
              </div>
              <a href={p.officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-gold transition-colors">
                Official source <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-2xl p-6 md:p-8 text-center">
          <h2 className="font-display text-xl md:text-2xl font-bold mb-2">Not sure which province fits your profile?</h2>
          <p className="text-primary-foreground/80 text-sm mb-5 max-w-xl mx-auto">Get a province recommendation based on your NOC, language and education.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact"><Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold">Get Province Match <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            <Link to="/services/pnp-application"><Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">PNP Service Details</Button></Link>
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding section-soft">
      <div className="container-narrow mx-auto max-w-3xl">
        <AnimatedSection>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">PNP — FAQ</h2>
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

export default PNPDrawsPage;
