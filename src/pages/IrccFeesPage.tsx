import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, DollarSign, Calculator, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EligibilityForm from "@/components/EligibilityForm";
import AnimatedSection from "@/components/AnimatedSection";
import ToolsCallout from "@/components/ToolsCallout";
import PathwayWidget from "@/components/PathwayWidget";
import { irccFees, irccFeesUpdated, categoryLabels, IrccFee } from "@/data/irccFees";

const categories = Object.keys(categoryLabels) as IrccFee["category"][];

const IrccFeesPage = () => {
  const [active, setActive] = useState<IrccFee["category"] | "All">("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Record<string, number>>({});

  const filtered = useMemo(() => {
    return irccFees.filter((f) => {
      const matchCat = active === "All" || f.category === active;
      const matchQuery = !query || f.name.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [active, query]);

  const total = useMemo(() => {
    return Object.entries(selected).reduce((sum, [key, qty]) => {
      const fee = irccFees.find((f) => f.name === key);
      return sum + (fee ? fee.fee * qty : 0);
    }, 0);
  }, [selected]);

  const toggle = (name: string, fee: number) => {
    setSelected((prev) => {
      const next = { ...prev };
      if (next[name]) delete next[name];
      else next[name] = 1;
      return next;
    });
  };

  const updateQty = (name: string, qty: number) => {
    setSelected((prev) => ({ ...prev, [name]: Math.max(1, qty) }));
  };

  return (
    <div>
      <Helmet>
        <title>IRCC Fees Calculator 2026 — Canada PR, Work, Study & Visa Fees | 4 Aces Visa</title>
        <meta name="description" content="Current IRCC government fees in CAD: PR, work permit, study permit, visitor visa, citizenship, biometrics. Build a custom fee estimate for your application." />
        <link rel="canonical" href="https://www.4acesvisa.com/tools/ircc-fees" />
        <meta property="og:title" content="IRCC Fees Calculator 2026" />
        <meta property="og:description" content="Live IRCC fee list + custom calculator for PR, work, study and citizenship applications." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "IRCC Fees Calculator",
            applicationCategory: "GovernmentApplication",
            operatingSystem: "Web",
            url: "https://www.4acesvisa.com/tools/ircc-fees",
          })}
        </script>
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-secondary/40 border-b border-border">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/tools" className="hover:text-gold">Tools</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">IRCC Fees</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-white section-padding">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/20 px-3 py-1 rounded-full mb-4">
              <DollarSign className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-gold">Updated {irccFeesUpdated}</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              IRCC Government Fees — 2026
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Every current IRCC fee in CAD — PR, work, study, visit, citizenship, biometrics — plus a calculator to estimate your total application cost.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search + Filter */}
      <section className="bg-white border-b border-border sticky top-14 md:top-16 z-30 py-3">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search fees (e.g. PGWP, biometrics, citizenship)…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActive("All")}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${active === "All" ? "bg-gold text-accent-foreground border-gold" : "border-border text-foreground/70 hover:border-gold hover:text-gold"}`}
              >All</button>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${active === c ? "bg-gold text-accent-foreground border-gold" : "border-border text-foreground/70 hover:border-gold hover:text-gold"}`}
                >{categoryLabels[c]}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fee table + calculator */}
      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_320px] gap-8">
          <div>
            {filtered.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">No fees match your search.</p>
            ) : (
              <div className="space-y-2">
                {filtered.map((f) => {
                  const isSelected = !!selected[f.name];
                  return (
                    <div
                      key={f.name}
                      className={`border rounded-xl p-4 transition-all ${isSelected ? "border-gold bg-gold/5 shadow-card" : "border-border hover:border-gold/40 hover:shadow-card"}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-xs font-bold text-gold uppercase tracking-wider">{categoryLabels[f.category]}</span>
                          </div>
                          <h3 className="font-display font-bold text-base text-foreground">{f.name}</h3>
                          {f.notes && <p className="text-xs text-muted-foreground mt-1">{f.notes}</p>}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="font-display text-xl font-extrabold text-primary">CAD ${f.fee.toLocaleString()}</div>
                          <button
                            onClick={() => toggle(f.name, f.fee)}
                            className={`mt-1 text-xs font-semibold px-3 py-1 rounded-full transition-colors ${isSelected ? "bg-gold text-accent-foreground" : "bg-secondary text-foreground/70 hover:bg-gold hover:text-accent-foreground"}`}
                          >
                            {isSelected ? "Added ✓" : "+ Add"}
                          </button>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="mt-3 pt-3 border-t border-gold/30 flex items-center gap-3">
                          <span className="text-xs font-medium text-foreground/70">Quantity:</span>
                          <div className="flex items-center gap-1">
                            <button onClick={() => updateQty(f.name, selected[f.name] - 1)} className="h-7 w-7 rounded-md bg-white border border-border font-bold text-foreground hover:border-gold">−</button>
                            <span className="w-8 text-center text-sm font-bold">{selected[f.name]}</span>
                            <button onClick={() => updateQty(f.name, selected[f.name] + 1)} className="h-7 w-7 rounded-md bg-white border border-border font-bold text-foreground hover:border-gold">+</button>
                          </div>
                          <span className="ml-auto text-sm font-semibold text-primary">Subtotal: CAD ${(f.fee * selected[f.name]).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sticky calculator */}
          <aside className="lg:sticky lg:top-32 self-start">
            <div className="bg-primary text-white rounded-2xl p-6 shadow-elevated">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="h-5 w-5 text-gold" />
                <h3 className="font-display text-lg font-bold">Your fee estimate</h3>
              </div>
              {Object.keys(selected).length === 0 ? (
                <p className="text-sm text-white/70 mb-4">Add fees from the list to build your application cost estimate.</p>
              ) : (
                <ul className="space-y-2 mb-4 max-h-64 overflow-y-auto pr-1">
                  {Object.entries(selected).map(([name, qty]) => {
                    const fee = irccFees.find((f) => f.name === name)!;
                    return (
                      <li key={name} className="text-xs text-white/80 flex items-start justify-between gap-2 border-b border-white/10 pb-2">
                        <span className="flex-1 leading-snug">{name} {qty > 1 && <span className="text-gold">× {qty}</span>}</span>
                        <span className="font-semibold text-white whitespace-nowrap">${(fee.fee * qty).toLocaleString()}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
              <div className="border-t border-white/20 pt-3 flex items-baseline justify-between">
                <span className="text-sm font-medium text-white/80">Total (CAD)</span>
                <span className="font-display text-2xl font-extrabold text-gold">${total.toLocaleString()}</span>
              </div>
              <p className="text-[11px] text-white/50 mt-3 leading-relaxed">Government fees only. Excludes biometric travel, medical exam (~$300–500), language test (~$300), ECA (~$200) and consultancy fees.</p>
              <Link to="/contact">
                <Button className="w-full mt-4 bg-gold text-accent-foreground hover:bg-gold-dark font-semibold shadow-gold">
                  Get exact quote <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">Updated {irccFeesUpdated}. Verify on <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/fee-list.html" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">IRCC official fee list</a>.</p>
          </aside>
        </div>
      </section>

      <ToolsCallout />

      <section className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 my-8 max-w-3xl">
        <PathwayWidget />
      </section>

      <AnimatedSection className="bg-secondary/30 section-padding">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-3">Need help estimating total cost?</h2>
          <p className="text-center text-muted-foreground mb-6">Free assessment includes a personalized cost breakdown across IRCC fees, third-party costs and our consultancy fees.</p>
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card">
            <EligibilityForm sourcePage="ircc-fees" />
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default IrccFeesPage;
