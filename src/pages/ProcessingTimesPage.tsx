import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, ExternalLink, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import PathwayWidget from "@/components/PathwayWidget";
import { processingGroups, processingLastUpdated } from "@/data/processingTimes";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" });

const faqs = [
  { q: "How accurate are IRCC processing times?", a: "IRCC processing times reflect 80% of recently completed applications. Your individual case may be faster or slower depending on completeness, biometrics, security checks, and country of residence. Use the times shown as planning estimates, not guarantees." },
  { q: "Why do PNP paper-based applications take longer than Express Entry?", a: "Express Entry is a fully digital, points-based system processed within 6 months as a service standard. Paper-based PNP applications are reviewed manually outside Express Entry, which adds 12–18 months on top of provincial nomination time." },
  { q: "Has SDS (Student Direct Stream) been discontinued?", a: "Yes — IRCC ended the Student Direct Stream on 8 November 2024. Indian, Chinese and other previously-eligible applicants must now apply via the standard study permit stream, which currently takes around 9 weeks for applications outside Canada." },
  { q: "How can I check my own application status?", a: "Sign in to your IRCC Secure Account or use the Application Status Tracker. For sponsorship and PR cases not yet linked, use the Client Application Status (CAS) tool. We can help interpret status updates in your free assessment." },
];

const ProcessingTimesPage = () => (
  <div>
    <Helmet>
      <title>Canada Immigration Processing Times 2026 | 4 Aces Visa</title>
      <meta name="description" content="Current IRCC processing times for Canada PR, work permits, study permits, visitor visas, family sponsorship and citizenship. Updated weekly." />
      <link rel="canonical" href="https://www.4acesvisa.com/tools/processing-times" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Dataset", name: "Canada IRCC Processing Times 2026", description: "Current processing time estimates by application category.", url: "https://www.4acesvisa.com/tools/processing-times", dateModified: processingLastUpdated },
            { "@type": "BreadcrumbList", itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.4acesvisa.com/" },
              { "@type": "ListItem", position: 2, name: "Tools", item: "https://www.4acesvisa.com/tools" },
              { "@type": "ListItem", position: 3, name: "Processing Times", item: "https://www.4acesvisa.com/tools/processing-times" },
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
          <span className="text-gold">Processing Times</span>
        </nav>
        <span className="inline-flex items-center gap-2 bg-gold/20 text-gold px-3 py-1.5 rounded-full text-xs font-bold mb-4 border border-gold/30">
          <Clock className="h-3.5 w-3.5" /> Updated {formatDate(processingLastUpdated)}
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-bold mb-3">Canada Immigration Processing Times</h1>
        <p className="text-primary-foreground/70 text-lg max-w-2xl">
          Current IRCC service standards across PR, work, study, sponsorship, visitor and citizenship streams.
        </p>
      </div>
    </section>

    <section className="section-padding section-light">
      <div className="container-narrow mx-auto space-y-8">
        <div className="bg-secondary/60 border border-border rounded-xl p-4 text-sm text-muted-foreground">
          ⚠️ <strong className="text-foreground">Estimates only:</strong> Times reflect IRCC service standards for 80% of completed applications. Your individual processing may differ based on biometrics, security checks, completeness and country.
        </div>

        {processingGroups.map((g) => (
          <div key={g.group} className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-4 bg-secondary/60 border-b border-border flex items-center gap-2">
              <span className="text-2xl">{g.icon}</span>
              <h2 className="font-display text-lg font-bold text-foreground">{g.group}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground uppercase tracking-wider">
                    <th className="px-5 py-2 text-left font-semibold">Application</th>
                    <th className="px-5 py-2 text-left font-semibold">Program</th>
                    <th className="px-5 py-2 text-right font-semibold">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {g.rows.map((r) => (
                    <tr key={r.category} className="border-t border-border hover:bg-secondary/30 transition-colors">
                      <td className="px-5 py-3 text-foreground font-medium">{r.category}{r.note && <div className="text-xs text-muted-foreground mt-0.5">{r.note}</div>}</td>
                      <td className="px-5 py-3 text-muted-foreground">{r.program}</td>
                      <td className="px-5 py-3 text-right font-bold text-gold whitespace-nowrap">{r.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <p className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
          <ExternalLink className="h-3.5 w-3.5" /> Source:
          <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-gold underline">IRCC Processing Times</a>
        </p>

        <div className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-2xl p-6 md:p-8 text-center">
          <h2 className="font-display text-xl md:text-2xl font-bold mb-2">Need timeline guidance for your case?</h2>
          <p className="text-primary-foreground/80 text-sm mb-5 max-w-xl mx-auto">Our consultants can estimate your end-to-end timeline based on country, program and completeness.</p>
          <Link to="/contact"><Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold">Get Timeline Estimate <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
        </div>
      </div>
    </section>

    <section className="section-padding section-soft">
      <div className="container-narrow mx-auto max-w-3xl">
        <div className="mb-10">
          <PathwayWidget />
        </div>
        <AnimatedSection>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">Processing Times — FAQ</h2>
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

export default ProcessingTimesPage;
