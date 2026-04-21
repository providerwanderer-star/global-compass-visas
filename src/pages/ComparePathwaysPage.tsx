import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Scale, Zap, MapPin, GraduationCap, Briefcase, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AnimatedSection from "@/components/AnimatedSection";

type Fit = "best" | "good" | "tough";

interface Pathway {
  key: string;
  icon: typeof Zap;
  name: string;
  href: string;
  timeline: string;
  cost: string;
  blurb: string;
  pros: string[];
  cons: string[];
}

const PATHWAYS: Pathway[] = [
  {
    key: "ee",
    icon: Zap,
    name: "Express Entry (FSWP / CEC)",
    href: "/express-entry",
    timeline: "6–12 months",
    cost: "CAD 2,300–3,500",
    blurb: "Federal points-based PR. No job offer needed if your CRS is competitive.",
    pros: ["Fastest PR (6 months post-ITA)", "No job offer required", "Open work permit not needed"],
    cons: ["High CRS cutoffs (470+ general)", "Competitive — score sensitive", "No regional flexibility"],
  },
  {
    key: "pnp",
    icon: MapPin,
    name: "Provincial Nominee Program (PNP)",
    href: "/services/pnp-application",
    timeline: "12–18 months",
    cost: "CAD 2,500–4,500",
    blurb: "Province nominates you for +600 CRS — virtually guarantees ITA.",
    pros: ["+600 CRS = ITA guaranteed", "Many streams without job offer", "Lower base CRS accepted"],
    cons: ["Tied to a province for ~2 years", "Slower than EE-only", "Stream-specific eligibility"],
  },
  {
    key: "study",
    icon: GraduationCap,
    name: "Study-to-PR (DLI → PGWP → CEC)",
    href: "/study-to-pr",
    timeline: "4–6 years total",
    cost: "CAD 60K–120K",
    blurb: "Study at a DLI, get up to 3-year PGWP, qualify for CEC after 1 year of skilled work.",
    pros: ["Build Canadian credentials & network", "PGWP open work permit (no LMIA)", "Highest long-term success rate"],
    cons: ["Slowest pathway", "High upfront cost", "Recent PGWP eligibility tightening"],
  },
  {
    key: "work",
    icon: Briefcase,
    name: "Work Permit (LMIA / Open)",
    href: "/services/work-permits",
    timeline: "3–9 months for permit",
    cost: "CAD 1,500–4,000",
    blurb: "LMIA-backed or open work permit. Bridge to PR via CEC or PNP after gaining experience.",
    pros: ["Get to Canada quickly", "Earn while you wait", "+50–200 CRS for valid LMIA"],
    cons: ["LMIA hard to obtain", "Employer-dependent (closed permits)", "Doesn't grant PR directly"],
  },
];

function scoreFit(pw: string, inputs: { crs: number; hasOffer: boolean; canStudy: boolean; province: string; speed: string }): Fit {
  const { crs, hasOffer, canStudy, province, speed } = inputs;
  if (pw === "ee") {
    if (crs >= 470) return "best";
    if (crs >= 430) return "good";
    return "tough";
  }
  if (pw === "pnp") {
    if (province && province !== "any") return "best";
    if (crs >= 380) return "good";
    return "good";
  }
  if (pw === "study") {
    if (canStudy && speed !== "fast") return "best";
    if (canStudy) return "good";
    return "tough";
  }
  if (pw === "work") {
    if (hasOffer) return "best";
    if (speed === "fast") return "good";
    return "tough";
  }
  return "good";
}

const fitStyles: Record<Fit, { label: string; cls: string; icon: typeof CheckCircle }> = {
  best: { label: "Best fit", cls: "bg-success/15 text-success border-success/30", icon: CheckCircle },
  good: { label: "Good fit", cls: "bg-gold/15 text-gold border-gold/30", icon: AlertCircle },
  tough: { label: "Tough fit", cls: "bg-destructive/10 text-destructive border-destructive/30", icon: XCircle },
};

const ComparePathwaysPage = () => {
  const [crs, setCrs] = useState(450);
  const [hasOffer, setHasOffer] = useState("no");
  const [canStudy, setCanStudy] = useState("no");
  const [province, setProvince] = useState("any");
  const [speed, setSpeed] = useState("balanced");

  const fits = useMemo(
    () =>
      PATHWAYS.map((p) => ({
        ...p,
        fit: scoreFit(p.key, { crs, hasOffer: hasOffer === "yes", canStudy: canStudy === "yes", province, speed }),
      })),
    [crs, hasOffer, canStudy, province, speed],
  );

  const sorted = [...fits].sort((a, b) => {
    const order: Record<Fit, number> = { best: 0, good: 1, tough: 2 };
    return order[a.fit] - order[b.fit];
  });

  return (
    <div>
      <Helmet>
        <title>Compare Canada PR Pathways 2026 — EE vs PNP vs Study vs Work | 4 Aces Visa</title>
        <meta
          name="description"
          content="Side-by-side comparison of Canada PR pathways: Express Entry, PNP, Study-to-PR, and Work Permit. Get a personalized fit score in 60 seconds."
        />
        <link rel="canonical" href="https://www.4acesvisa.com/tools/compare-pathways" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              { "@type": "WebApplication", name: "Compare Canada PR Pathways", applicationCategory: "BusinessApplication", url: "https://www.4acesvisa.com/tools/compare-pathways" },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.4acesvisa.com/" },
                  { "@type": "ListItem", position: 2, name: "Tools", item: "https://www.4acesvisa.com/tools" },
                  { "@type": "ListItem", position: 3, name: "Compare Pathways", item: "https://www.4acesvisa.com/tools/compare-pathways" },
                ],
              },
            ],
          })}
        </script>
      </Helmet>

      <section className="relative bg-primary pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-6">
            <Link to="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/tools" className="hover:text-gold">Tools</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">Compare Pathways</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-gold/20 text-gold px-3 py-1.5 rounded-full text-xs font-bold mb-3 border border-gold/30">
              <Scale className="h-3.5 w-3.5" /> Free Tool · Updated Apr 2026
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-3 leading-tight">
              Compare Canada PR Pathways
            </h1>
            <p className="text-base md:text-lg text-primary-foreground/70 max-w-2xl">
              Tell us about your profile — we'll rank Express Entry, PNP, Study-to-PR, and Work Permit
              by fit score. No signup required.
            </p>
          </div>
        </div>
      </section>

      {/* Inputs */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto max-w-4xl">
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-card">
            <h2 className="font-display text-xl font-bold text-foreground mb-6">Your profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <Label htmlFor="crs">Estimated CRS Score</Label>
                <Input id="crs" type="number" min={0} max={1200} value={crs} onChange={(e) => setCrs(Number(e.target.value))} className="mt-1" />
                <p className="text-xs text-muted-foreground mt-1">
                  Don't know it?{" "}
                  <Link to="/crs-calculator" className="text-gold underline">Use the calculator</Link>
                </p>
              </div>
              <div>
                <Label>Canadian job offer?</Label>
                <Select value={hasOffer} onValueChange={setHasOffer}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Open to studying in Canada?</Label>
                <Select value={canStudy} onValueChange={setCanStudy}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Preferred province</Label>
                <Select value={province} onValueChange={setProvince}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any / no preference</SelectItem>
                    <SelectItem value="ontario">Ontario</SelectItem>
                    <SelectItem value="british-columbia">British Columbia</SelectItem>
                    <SelectItem value="alberta">Alberta</SelectItem>
                    <SelectItem value="other">Other province</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label>How fast do you need to move?</Label>
                <Select value={speed} onValueChange={setSpeed}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fast">As fast as possible (under 1 year)</SelectItem>
                    <SelectItem value="balanced">Balanced (1–2 years)</SelectItem>
                    <SelectItem value="patient">Long-term (3+ years OK)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
              Your pathway ranking
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
              Updated live as you change your inputs above.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {sorted.map((p, i) => {
              const f = fitStyles[p.fit];
              const Icon = p.icon;
              const FitIcon = f.icon;
              return (
                <motion.div
                  key={p.key}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-card rounded-2xl border border-border p-6 hover:shadow-card transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-gold" />
                      </div>
                      <h3 className="font-display text-base md:text-lg font-bold text-foreground">{p.name}</h3>
                    </div>
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full border ${f.cls}`}>
                      <FitIcon className="h-3 w-3" /> {f.label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{p.blurb}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <div className="bg-secondary/40 rounded-lg p-2">
                      <div className="text-muted-foreground">Timeline</div>
                      <div className="font-bold text-foreground">{p.timeline}</div>
                    </div>
                    <div className="bg-secondary/40 rounded-lg p-2">
                      <div className="text-muted-foreground">Est. cost</div>
                      <div className="font-bold text-foreground">{p.cost}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                    <div>
                      <div className="font-semibold text-success mb-1">Pros</div>
                      <ul className="space-y-1">
                        {p.pros.map((pro) => (
                          <li key={pro} className="text-muted-foreground flex items-start gap-1">
                            <span className="text-success mt-0.5">✓</span> {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold text-destructive mb-1">Cons</div>
                      <ul className="space-y-1">
                        {p.cons.map((con) => (
                          <li key={con} className="text-muted-foreground flex items-start gap-1">
                            <span className="text-destructive mt-0.5">✗</span> {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Link to={p.href}>
                    <Button variant="outline" size="sm" className="w-full border-gold/40 text-gold hover:bg-gold/10 font-semibold">
                      Explore {p.name.split(" ")[0]} <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-narrow mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
            Want a human to confirm your best pathway?
          </h2>
          <p className="text-primary-foreground/70 max-w-lg mx-auto mb-6">
            Our experts review your profile against current draws, PNP streams and processing times — for free.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold shadow-gold">
              Get Free Profile Review <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ComparePathwaysPage;