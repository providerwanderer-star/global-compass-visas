import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Search, ArrowRight, ExternalLink, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedSection from "@/components/AnimatedSection";
import { nocList, nocLastUpdated } from "@/data/nocData";

const categories = ["All", "Tech", "Healthcare", "Trades", "Transport", "Agriculture", "Business", "Education"] as const;
type Cat = typeof categories[number];

const teerInfo = [
  { teer: 0, label: "Management occupations", example: "Senior managers, restaurant managers" },
  { teer: 1, label: "University degree required", example: "Engineers, doctors, software developers" },
  { teer: 2, label: "College diploma or apprenticeship 2+ years", example: "Electricians, paramedics, web developers" },
  { teer: 3, label: "College diploma or apprenticeship < 2 years", example: "Truck drivers, dental assistants, bakers" },
  { teer: 4, label: "High school + occupation-specific training", example: "Early childhood educators, retail supervisors" },
  { teer: 5, label: "No formal education required", example: "Cleaners, harvest labourers, food counter attendants" },
];

const faqs = [
  { q: "What is a NOC code?", a: "The National Occupational Classification (NOC) is Canada's standardised system for organising jobs. Each occupation has a 5-digit NOC 2021 code and a TEER level (0–5) that indicates training requirements. IRCC uses your NOC to determine Express Entry eligibility and points." },
  { q: "What is TEER and why does it matter?", a: "TEER (Training, Education, Experience and Responsibilities) replaced the old NOC skill levels in 2022. For Express Entry, you generally need a job in TEER 0, 1, 2 or 3. TEER 4 and 5 jobs are eligible only through specific category-based draws or PNP streams." },
  { q: "How do I find my exact NOC code?", a: "Match the duties listed in your offer letter or résumé to the official ESDC NOC profile, not just the job title. Two people with the same title can fall under different NOC codes depending on actual responsibilities. We can help confirm your NOC during a free assessment." },
  { q: "Which NOCs are best for Canada PR in 2026?", a: "High-demand NOCs include software developers (21232), registered nurses (31301), early childhood educators (42202), electricians (72200), truck drivers (73300), and physicians (31102). Most are eligible for category-based Express Entry draws or popular PNP streams." },
];

const NOCFinderPage = () => {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<Cat>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return nocList.filter((n) => {
      const matchCat = cat === "All" || n.category === cat;
      const matchQ = !q || n.title.toLowerCase().includes(q) || n.code.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, cat]);

  return (
    <div>
      <Helmet>
        <title>Canada NOC Code Finder 2026 — TEER & Express Entry Eligibility | 4 Aces Visa</title>
        <meta name="description" content="Search Canadian NOC 2021 codes by job title, code, or category. See TEER level, Express Entry category eligibility and PR pathway notes." />
        <link rel="canonical" href="https://www.4acesvisa.com/tools/noc-finder" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              { "@type": "WebApplication", name: "Canada NOC Finder", url: "https://www.4acesvisa.com/tools/noc-finder", applicationCategory: "UtilityApplication", offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" } },
              { "@type": "BreadcrumbList", itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.4acesvisa.com/" },
                { "@type": "ListItem", position: 2, name: "Tools", item: "https://www.4acesvisa.com/tools" },
                { "@type": "ListItem", position: 3, name: "NOC Finder", item: "https://www.4acesvisa.com/tools/noc-finder" },
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
            <span className="text-gold">NOC Finder</span>
          </nav>
          <span className="inline-flex items-center gap-2 bg-gold/20 text-gold px-3 py-1.5 rounded-full text-xs font-bold mb-4 border border-gold/30">
            <Search className="h-3.5 w-3.5" /> NOC 2021 v1.0 · {nocList.length} curated occupations
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-3">Canada NOC Code Finder</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl">
            Search by job title, NOC code or category. Each result shows TEER level and Express Entry eligibility notes.
          </p>
        </div>
      </section>

      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          {/* Search + filter */}
          <div className="bg-card border border-border rounded-2xl p-5 mb-6 shadow-card">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search 'software developer', '21232', 'nurse'..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${cat === c ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/70"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold text-foreground uppercase tracking-wider">NOC</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-foreground uppercase tracking-wider">Occupation</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-foreground uppercase tracking-wider">TEER</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-foreground uppercase tracking-wider">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-foreground uppercase tracking-wider">EE</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No occupations match. Try a different keyword or category.</td></tr>
                  ) : filtered.map((n) => (
                    <tr key={n.code} className="border-t border-border hover:bg-secondary/40 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs font-bold text-primary">{n.code.replace("_truck", "")}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-foreground">{n.title}</div>
                        {n.notes && <div className="text-xs text-muted-foreground mt-0.5">{n.notes}</div>}
                      </td>
                      <td className="px-4 py-3"><span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gold/10 text-gold text-xs font-bold">{n.teer}</span></td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{n.category}</td>
                      <td className="px-4 py-3">{n.eeEligible ? <CheckCircle2 className="h-4 w-4 text-success" /> : <span className="text-muted-foreground text-xs">—</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-3">
            Showing {filtered.length} of {nocList.length} curated occupations · Updated {new Date(nocLastUpdated).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </section>

      {/* TEER explainer */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">TEER Levels Explained</h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">TEER replaced NOC "skill levels" in November 2022. Express Entry generally requires TEER 0–3 work experience.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teerInfo.map((t) => (
              <div key={t.teer} className="bg-card border border-border rounded-xl p-5 flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-display font-bold text-xl">{t.teer}</div>
                <div>
                  <h3 className="font-bold text-foreground text-sm mb-1">TEER {t.teer} — {t.label}</h3>
                  <p className="text-xs text-muted-foreground">e.g. {t.example}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-6 inline-flex items-center gap-1.5 justify-center w-full">
            <ExternalLink className="h-3.5 w-3.5" />
            Full classification: <a href="https://noc.esdc.gc.ca/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-gold underline">ESDC NOC 2021</a>
          </p>
        </div>
      </section>

      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <div className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-2xl p-6 md:p-8 text-center">
            <h2 className="font-display text-xl md:text-2xl font-bold mb-2">Not sure which NOC fits your job?</h2>
            <p className="text-primary-foreground/80 text-sm mb-5 max-w-xl mx-auto">NOC selection is based on duties, not job titles. Get a free profile review to confirm your code and PR pathway.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact"><Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold">Confirm My NOC <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              <Link to="/crs-calculator"><Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">Calculate CRS</Button></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto max-w-3xl">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">NOC Finder — FAQ</h2>
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
};

export default NOCFinderPage;
