import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calculator, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Two-up homepage search/CTA strip inspired by thesolutionhub.ca.
 * Left: CRS Score quick jump (numeric input → /crs-calculator).
 * Right: NOC Finder search (text input → /tools/noc-finder?q=...).
 */
const HomeQuickSearch = () => {
  const navigate = useNavigate();
  const [crs, setCrs] = useState("");
  const [noc, setNoc] = useState("");

  const submitCrs = (e: React.FormEvent) => {
    e.preventDefault();
    const score = crs.trim();
    navigate(score ? `/crs-calculator?score=${encodeURIComponent(score)}` : "/crs-calculator");
  };

  const submitNoc = (e: React.FormEvent) => {
    e.preventDefault();
    const q = noc.trim();
    navigate(q ? `/tools/noc-finder?q=${encodeURIComponent(q)}` : "/tools/noc-finder");
  };

  return (
    <section className="bg-white border-y border-border">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider mb-2">
            🔎 Instant lookup
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Check your CRS & find your NOC in seconds
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {/* CRS quick check */}
          <motion.form
            onSubmit={submitCrs}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-secondary/40 border border-border rounded-2xl p-5 md:p-6 hover:shadow-card transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-gold/15 p-2 rounded-lg">
                <Calculator className="h-4 w-4 text-gold" />
              </div>
              <h3 className="font-display text-base md:text-lg font-bold text-foreground">CRS Score Calculator</h3>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mb-4">
              Estimate your Comprehensive Ranking System score in 5 simple steps.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Calculator className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={1200}
                  value={crs}
                  onChange={(e) => setCrs(e.target.value)}
                  placeholder="CRS score"
                  aria-label="Your current CRS score"
                  className="pl-10 bg-white"
                />
              </div>
              <Button type="submit" className="bg-gold text-accent-foreground hover:bg-gold-dark font-semibold shadow-gold sm:w-auto">
                Calculate <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </motion.form>

          {/* NOC search */}
          <motion.form
            onSubmit={submitNoc}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="bg-secondary/40 border border-border rounded-2xl p-5 md:p-6 hover:shadow-card transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-gold/15 p-2 rounded-lg">
                <Search className="h-4 w-4 text-gold" />
              </div>
              <h3 className="font-display text-base md:text-lg font-bold text-foreground">NOC Code Finder</h3>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mb-4">
              Search 150+ Canadian occupations by job title, NOC code or keyword — check Express Entry eligibility & TEER level.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  value={noc}
                  onChange={(e) => setNoc(e.target.value)}
                  placeholder="Search NOC codes (e.g. software, 21232, nurse)"
                  aria-label="Search NOC codes"
                  className="pl-10 bg-white"
                />
              </div>
              <Button type="submit" className="bg-gold text-accent-foreground hover:bg-gold-dark font-semibold shadow-gold sm:w-auto">
                Search <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default HomeQuickSearch;
