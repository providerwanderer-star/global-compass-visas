import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tools } from "@/data/toolsData";

const formatDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" }) : "";

const ToolsHubPage = () => (
  <div>
    <Helmet>
      <title>Canada Immigration Tools & Live Data | 4 Aces Visa</title>
      <meta
        name="description"
        content="Free Canada immigration tools: CRS calculator, Express Entry draw tracker, PNP tracker, NOC finder, processing times and pathway quiz. Updated regularly from IRCC sources."
      />
      <link rel="canonical" href="https://www.4acesvisa.com/tools" />
    </Helmet>
    <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-12 md:py-16">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
          🛠️ Tools & Live Updates
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">
          Canada Immigration Tools
        </h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
          Calculate your CRS, find your NOC, track every IRCC draw, and check processing times — all free.
        </p>
      </div>
    </section>
    <section className="section-padding section-light">
      <div className="container-narrow mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((t) => (
            <Link key={t.title} to={t.href} className="block group">
              <div className="bg-card rounded-2xl border border-border p-6 h-full card-interactive">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <t.icon className="h-6 w-6 text-gold" />
                  </div>
                  {t.status === "soon" ? (
                    <span className="text-[10px] font-bold bg-muted text-muted-foreground px-2 py-0.5 rounded uppercase tracking-wider">
                      Coming soon
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold bg-success/15 text-success px-2 py-0.5 rounded uppercase tracking-wider">
                      Live
                    </span>
                  )}
                </div>
                <h2 className="font-display text-lg font-bold text-foreground mb-1.5">{t.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-gold transition-colors">
                    Open tool <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  {t.updated && (
                    <span className="text-[10px] text-muted-foreground">Updated {formatDate(t.updated)}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 bg-secondary rounded-2xl p-6 md:p-8 text-center">
          <p className="text-sm text-muted-foreground mb-2 inline-flex items-center gap-1.5">
            <ExternalLink className="h-3.5 w-3.5" />
            Data sourced from IRCC and provincial nomination programs
          </p>
          <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3">
            Want a personalised plan based on your numbers?
          </h3>
          <Link to="/contact">
            <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold shadow-gold">
              Get a Free Profile Assessment <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default ToolsHubPage;
