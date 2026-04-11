import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { documentsData } from "@/data/documentsData";
import { CheckCircle, Lightbulb, ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";

const DocumentsPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const doc = documentsData.find((d) => d.slug === slug);

  if (!doc) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Document checklist not found</h1>
          <Link to="/documents/canada-pr">
            <Button>View Canada PR Documents</Button>
          </Link>
        </div>
      </div>
    );
  }

  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: doc.tips.map((tip) => ({
      "@type": "Question",
      name: `Tip: ${tip}`,
      acceptedAnswer: { "@type": "Answer", text: tip },
    })),
  };

  return (
    <>
      <Helmet>
        <title>{doc.title} | 4 Aces Visa</title>
        <meta name="description" content={doc.description} />
        <meta property="og:title" content={`${doc.title} | 4 Aces Visa`} />
        <meta property="og:description" content={doc.description} />
        <script type="application/ld+json">{JSON.stringify(schemaFAQ)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-gold/5 py-12 md:py-16">
        <div className="container-narrow mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-gold">Home</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Documents</span>
            <span>/</span>
            <span className="text-foreground font-medium">{doc.shortTitle}</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{doc.emoji}</span>
            <h1 className="font-display text-2xl md:text-4xl font-extrabold text-foreground leading-tight">
              {doc.title}
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl">{doc.description}</p>
        </div>
      </section>

      {/* Quick Nav */}
      <section className="border-b border-border bg-background sticky top-14 md:top-16 z-30">
        <div className="container-narrow mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
          {doc.documents.map((cat) => (
            <a
              key={cat.category}
              href={`#${cat.category.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-xs whitespace-nowrap px-3 py-1.5 rounded-full border border-border hover:bg-gold/10 hover:border-gold hover:text-gold transition-colors font-medium"
            >
              {cat.category}
            </a>
          ))}
        </div>
      </section>

      {/* Document Categories */}
      <section className="py-10 md:py-16">
        <div className="container-narrow mx-auto px-4 space-y-10">
          {doc.documents.map((cat, idx) => (
            <AnimatedSection key={cat.category} delay={idx * 0.05}>
              <div
                id={cat.category.toLowerCase().replace(/\s+/g, "-")}
                className="scroll-mt-32"
              >
                <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-gold" />
                  {cat.category}
                </h2>
                <div className="bg-card rounded-xl border border-border p-5 md:p-6">
                  <ul className="space-y-3">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-foreground/80 text-sm md:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="py-10 md:py-14 bg-gold/5">
        <div className="container-narrow mx-auto px-4">
          <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-gold" />
            Pro Tips
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {doc.tips.map((tip) => (
              <div
                key={tip}
                className="bg-card rounded-xl border border-gold/20 p-4 flex items-start gap-3"
              >
                <span className="text-gold text-lg">💡</span>
                <p className="text-foreground/80 text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Checklists */}
      <section className="py-10 md:py-14">
        <div className="container-narrow mx-auto px-4">
          <h2 className="font-display text-xl font-bold text-foreground mb-6">
            Other Document Checklists
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {documentsData
              .filter((d) => d.slug !== doc.slug)
              .map((d) => (
                <Link
                  key={d.slug}
                  to={`/documents/${d.slug}`}
                  className="p-4 rounded-xl border border-border hover:border-gold hover:shadow-md transition-all text-center group"
                >
                  <span className="text-2xl block mb-2">{d.emoji}</span>
                  <span className="text-sm font-medium text-foreground group-hover:text-gold transition-colors">
                    {d.shortTitle}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary">
        <div className="container-narrow mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
            Need Help Preparing Your Documents?
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Our experts will review your documents and guide you through every step.
          </p>
          <Link to="/contact">
            <Button className="bg-gold text-accent-foreground hover:bg-gold-dark font-semibold shadow-gold">
              Get Free Assessment <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default DocumentsPage;
