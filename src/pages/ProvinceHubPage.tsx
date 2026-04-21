import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, MapPin, ExternalLink, CheckCircle, Phone, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import EligibilityForm from "@/components/EligibilityForm";
import AnimatedSection from "@/components/AnimatedSection";
import ToolsCallout from "@/components/ToolsCallout";
import { provinceHubs } from "@/data/provinceHubData";
import { pnpSnapshots } from "@/data/pnpDraws";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.5 } }),
};

const ProvinceHubPage = () => {
  const { slug } = useParams();
  const hub = provinceHubs.find((p) => p.slug === slug);

  if (!hub) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Province Not Found</h1>
          <Link to="/" className="text-gold hover:underline">Go home</Link>
        </div>
      </div>
    );
  }

  const snapshot = pnpSnapshots.find((p) => p.code === hub.code);
  const url = `https://www.4acesvisa.com/canada-pnp/${hub.slug}`;

  return (
    <div>
      <Helmet>
        <title>{hub.metaTitle}</title>
        <meta name="description" content={hub.metaDescription} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={hub.metaTitle} />
        <meta property="og:description" content={hub.metaDescription} />
        <meta property="og:url" content={url} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              { "@type": "WebPage", name: hub.metaTitle, url },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.4acesvisa.com/" },
                  { "@type": "ListItem", position: 2, name: "PNP", item: "https://www.4acesvisa.com/tools/pnp-draws" },
                  { "@type": "ListItem", position: 3, name: hub.name, item: url },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: hub.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
              },
            ],
          })}
        </script>
      </Helmet>

      <section className="relative bg-primary pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--gold)/0.15),transparent_60%)]" />
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-6">
            <Link to="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/tools/pnp-draws" className="hover:text-gold">PNP</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">{hub.name}</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-gold/20 text-gold px-3 py-1.5 rounded-full text-xs font-bold mb-4 border border-gold/30">
              <MapPin className="h-3.5 w-3.5" /> {hub.program}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
              {hub.flag} {hub.name} PNP 2026
            </h1>
            <p className="text-lg text-primary-foreground/70 mb-8 max-w-2xl">{hub.intro}</p>
            <div className="flex flex-wrap gap-4">
              <a href="#assessment">
                <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold shadow-gold">
                  Free {hub.name} PNP Assessment <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="tel:+16478622190">
                <Button size="lg" className="bg-transparent border-2 border-white/40 text-white hover:bg-white/10 font-semibold">
                  <Phone className="mr-2 h-4 w-4" /> Speak to Expert
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick answer */}
      <section className="bg-card border-b border-border">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-3xl border-l-4 border-gold pl-6">
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Quick answer</p>
            <p className="text-foreground leading-relaxed">{hub.quickAnswer}</p>
          </div>
        </div>
      </section>

      {/* Latest snapshot */}
      {snapshot && (
        <section className="section-padding section-soft">
          <div className="container-narrow mx-auto max-w-3xl">
            <AnimatedSection>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                Latest {hub.name} Draw Snapshot
              </h2>
            </AnimatedSection>
            <div className="bg-card rounded-xl border border-gold/30 p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Date</div>
                <div className="font-display text-lg font-bold text-foreground">{snapshot.latestDate}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Stream</div>
                <div className="font-display text-sm font-bold text-foreground">{snapshot.latestStream}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Invitations</div>
                <div className="font-display text-lg font-bold text-gold">{snapshot.invitations.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Cutoff</div>
                <div className="font-display text-lg font-bold text-gold">{snapshot.scoreCutoff}</div>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Source:{" "}
              <a href={snapshot.officialUrl} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline inline-flex items-center gap-1">
                Official {hub.name} page <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </div>
        </section>
      )}

      {/* Streams */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
              {hub.name} PNP Streams
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
              Pick the right stream based on your work experience, education, and ties to {hub.name}.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hub.streams.map((s, i) => (
              <motion.div
                key={s.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-card rounded-xl border border-border p-5 hover:border-gold/30 transition-colors"
              >
                <h3 className="font-display font-bold text-foreground mb-1">{s.name}</h3>
                <p className="text-xs text-gold font-semibold mb-2">{s.cutoff}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top NOCs + Cities */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-gold" /> Top In-Demand NOCs
            </h2>
            <ul className="space-y-2">
              {hub.topNocs.map((noc) => (
                <li key={noc} className="flex items-center gap-2 bg-card rounded-lg border border-border p-3 text-sm text-foreground">
                  <CheckCircle className="h-4 w-4 text-success shrink-0" /> {noc}
                </li>
              ))}
            </ul>
            <Link to="/tools/noc-finder" className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-gold hover:underline">
              Search all NOCs <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div>
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gold" /> Top {hub.name} Cities
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {hub.topCities.map((c) => (
                <Link
                  key={c.slug}
                  to={`/city/${c.slug}`}
                  className="bg-card rounded-lg border border-border p-3 text-sm text-foreground hover:border-gold/40 hover:text-gold transition-colors text-center"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto max-w-3xl">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              {hub.name} PNP FAQ
            </h2>
          </AnimatedSection>
          <div className="space-y-4">
            {hub.faqs.map((faq, i) => (
              <motion.details
                key={faq.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl border border-border group"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer font-display font-semibold text-foreground text-sm md:text-base">
                  {faq.q}
                  <span className="text-gold ml-4 text-xl group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">{faq.a}</div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      <ToolsCallout
        tools={["crs-calculator", "pnp-draws", "noc-finder"]}
        title={`Tools for ${hub.name} PNP applicants`}
        description="Score your CRS, track the latest provincial draws, and find your eligible NOC."
        variant="soft"
      />

      <section className="section-padding bg-primary" id="assessment">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection>
              <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
                Free {hub.name} PNP Assessment
              </h2>
              <p className="text-primary-foreground/70 mb-6">
                We'll match your profile to the best {hub.name} stream and tell you exactly what you need
                — job offer, language scores, education credentials, or a CRS push.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="bg-card rounded-xl p-6 md:p-8 shadow-elevated">
                <EligibilityForm sourcePage={`province-${hub.slug}`} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProvinceHubPage;