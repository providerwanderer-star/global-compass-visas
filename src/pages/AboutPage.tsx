import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Award, CheckCircle, Shield, Globe2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import EligibilityForm from "@/components/EligibilityForm";
import ConnectedFooter from "@/components/ConnectedFooter";
import SeoSchema from "@/components/SeoSchema";

const SITE = "https://www.gargbrothers.ca";

/**
 * /about — E-E-A-T anchor page. Establishes RCIC credentials, founder bio,
 * company facts, and Person + AboutPage schema so AI engines and Google can
 * verify the people behind the advice.
 */
const AboutPage = () => {
  const url = `${SITE}/about`;
  const title = "About Garg Brothers — Immigration Consultancy for Canada, Australia, UK & Germany";
  const description =
    "Garg Brothers is an immigration consultancy team with 15,000+ applications processed since 2016 across Canada, Australia, Germany and the UK. Meet the team and see how we work.";

  const teamLD = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}/about#team`,
    name: "Garg Brothers Immigration Team",
    url,
    email: "sahil280389@gmail.com",
    telephone: "+1-647-862-2190",
    knowsLanguage: ["English", "Hindi", "Punjabi"],
    knowsAbout: [
      "Canadian Express Entry",
      "Provincial Nominee Program",
      "LMIA Work Permits",
      "Study Permits",
      "Family Sponsorship",
      "Australian Skilled Migration",
      "Germany EU Blue Card",
      "UK Skilled Worker Visa",
    ],
    sameAs: [
      "https://www.linkedin.com/company/4acesvisa",
      "https://www.instagram.com/4acesvisa",
    ],
  };

  const aboutLD = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${url}#aboutpage`,
    url,
    name: title,
    description,
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: "Garg Brothers", url: SITE },
    about: { "@id": `${SITE}/#organization` },
    mainEntity: { "@id": `${SITE}/about#team` },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".speakable", ".lead"],
    },
  };

  const credentials = [
    { icon: Shield, title: "Regulated Advice", desc: "In Canada, only Regulated Canadian Immigration Consultants (RCIC) and lawyers may charge for immigration advice. Verify any consultant on the public CICC register at college-ic.ca before paying." },
    { icon: Award, title: "High Approval Rate", desc: "Consistent track record across Express Entry, PNP, LMIA, study permits and family sponsorships since 2016. Approval-rate figure is our internal all-time average across represented files; individual outcomes depend on IRCC's assessment of each file." },
    { icon: Users, title: "15,000+ Applications Processed", desc: "Hands-on representation for skilled workers, students, families and business immigrants since 2016." },
    { icon: Globe2, title: "4-Country Coverage", desc: "Canada, Australia, Germany and the United Kingdom — single team, end-to-end service." },
  ];

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${SITE}/og-default.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${SITE}/og-default.jpg`} />
        <script type="application/ld+json">{JSON.stringify(aboutLD)}</script>
        <script type="application/ld+json">{JSON.stringify(teamLD)}</script>
      </Helmet>

      <SeoSchema breadcrumbs={[{ name: "About", url: "/about" }]} />

      {/* Hero */}
      <section className="bg-primary pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4"
            >
              About Garg Brothers — By Immigrants, For Immigrants
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lead text-lg text-primary-foreground/80 mb-8"
            >
              Garg Brothers is an immigration consultancy team founded in 2016. Since then we
              have helped 15,000+ skilled workers, students, families and entrepreneurs move
              to Canada, Australia, Germany and the UK. Canadian files are handled with
              regulated (RCIC / lawyer) representation as required by IRCC.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Link to="/quiz">
                <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-semibold shadow-gold">
                  Free Eligibility Check <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Credentials grid */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">How We Work</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              We are an immigration consultancy team. Canadian files that require paid
              representation are handled by regulated consultants (RCIC) or lawyers, as
              required by IRCC. You can verify any Canadian consultant on the public{" "}
              <a
                href="https://college-ic.ca/protecting-the-public/find-an-immigration-consultant"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                CICC register
              </a>{" "}
              before paying any fee.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {credentials.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-xl border border-border p-6 card-interactive"
              >
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mb-3">
                  <c.icon className="h-5 w-5 text-gold" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <AnimatedSection className="lg:col-span-2">
              <h2 className="font-display text-3xl font-bold text-foreground mb-3">
                Meet the Garg Brothers Immigration Team
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Garg Brothers was founded in 2016 by immigrants, for immigrants. Our team has
                since guided 15,000+ skilled workers, international students, families and
                entrepreneurs through Express Entry, PNP, LMIA, study permits and family
                sponsorship — plus parallel pathways in Australia, Germany and the UK.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Canadian paid representation is handled by regulated consultants (RCIC) or
                immigration lawyers, as required under IRCC rules. Every file is managed
                end-to-end by our team — no junior hand-offs, no offshore call centres.
              </p>
              <ul className="space-y-2 mt-6">
                {[
                  "Founded in 2016",
                  "15,000+ applications represented across 4 destination countries",
                  "Canadian files handled by regulated representatives (RCIC / lawyer) per IRCC rules",
                  "Specialisation: Express Entry, PNP, LMIA, study permits, family sponsorship",
                  "Languages: English, Hindi, Punjabi",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
            <aside>
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24 card-interactive">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">
                  Talk to our team
                </h3>
                <EligibilityForm sourcePage="about-page" />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto max-w-3xl">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Immigration changes lives. We exist to make the process honest, fast and
              transparent for every applicant — no inflated promises, no hidden fees, and no
              advice from anyone who isn't legally authorised to give it.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Canadian files that require paid representation are handled by regulated
              consultants (RCIC) or lawyers. Every quote is fixed in writing. Every client
              gets a direct line to the team member managing their case.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <ConnectedFooter
        tool={{ label: "CRS Score Calculator", href: "/crs-calculator" }}
        hub={{ label: "Canada Immigration Hub", href: "/immigration/canada" }}
        funnel={{ label: "Get your best pathway", href: "/quiz" }}
      />
    </div>
  );
};

export default AboutPage;