import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, ArrowRight, GraduationCap, Briefcase, Plane, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SmartCTA from "@/components/SmartCTA";
import PathwayWidget from "@/components/PathwayWidget";
import AnimatedSection from "@/components/AnimatedSection";

const faqs = [
  { q: "Can I move to Canada while on OPT in 2026?", a: "Yes. As of April 2026, OPT holders are popular candidates for Canadian Express Entry because of their US degree, English fluency, and skilled work experience. Canadian work experience is not required to qualify for Express Entry — Federal Skilled Worker (FSW) accepts foreign experience including OPT employment in NOC TEER 0, 1, 2, or 3 occupations." },
  { q: "Does OPT count as work experience for Canadian PR?", a: "Yes. OPT employment counts toward the 1+ year of skilled work experience needed for FSW (Federal Skilled Worker) under Express Entry, provided your role is in NOC TEER 0/1/2/3. Document your role with pay stubs, employment letter, tax forms (W-2), and a job description matching the NOC duties." },
  { q: "What's the fastest path from OPT to Canada PR?", a: "Three options ranked by speed: (1) Apply for Express Entry directly with a strong CRS — processing 6 months. (2) Get a Canadian job offer + LMIA-exempt work permit (CUSMA for US citizens) — work in Canada, then apply via CEC. (3) Provincial Nominee Program (PNP) — adds 600 CRS points and is easier with US tech experience." },
  { q: "Can H1B and OPT applicants use CUSMA work permits?", a: "Only US/Mexican citizens qualify for CUSMA (formerly NAFTA) work permits. If you're a US citizen on OPT, you can apply LMIA-exempt for 60+ professional occupations. If you're an Indian or other-national OPT holder, you'll need an LMIA-based work permit OR Express Entry/PNP without a Canadian job." },
  { q: "How much does it cost to move from OPT to Canada PR?", a: "Express Entry PR application fees are CAD $1,525 for the principal applicant (~USD $1,120) plus CAD $635 for biometrics, language tests (~USD $260), credential evaluation (~USD $230), and medical exam (~USD $350). Total ~USD $2,000–2,500 plus settlement funds requirement of CAD $14,690 for a single applicant." },
];

const OPTToCanadaPage = () => (
  <div>
    <Helmet>
      <title>OPT to Canada PR 2026 — Move from US OPT/STEM OPT to Canada | 4 Aces Visa</title>
      <meta name="description" content="Move from US OPT or STEM OPT to Canada PR in 2026. Express Entry, CUSMA work permits and PNP options for OPT holders. Step-by-step from a licensed RCIC." />
      <link rel="canonical" href="https://www.4acesvisa.com/opt-to-canada" />
      <meta property="og:title" content="OPT to Canada PR 2026 — Complete Guide for US Students" />
      <meta property="og:description" content="OPT and STEM OPT holders: how to switch from the US to Canada in 2026. Express Entry, work permits and timelines explained." />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.4acesvisa.com/" },
            { "@type": "ListItem", position: 2, name: "OPT to Canada", item: "https://www.4acesvisa.com/opt-to-canada" },
          ]},
          { "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      })}</script>
    </Helmet>

    <section className="bg-primary text-primary-foreground pt-24 pb-10 md:pt-32 md:pb-14">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-5">
          <Link to="/" className="hover:text-gold">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gold">OPT to Canada</span>
        </nav>
        <span className="inline-flex items-center gap-2 bg-gold/20 text-gold px-3 py-1.5 rounded-full text-xs font-bold mb-4 border border-gold/30">
          🇺🇸 → 🇨🇦 US Student Funnel · As of April 2026
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-bold mb-3">OPT to Canada PR — 2026 Guide for US Students</h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mb-6">
          Your US degree + OPT work experience makes you a top Express Entry candidate. Here's exactly how to move from F-1/OPT to Canadian permanent residency.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/crs-calculator"><Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold">Check My CRS Score <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          <Link to="/contact"><Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">Free Consultation</Button></Link>
        </div>
      </div>
    </section>

    <section className="section-padding section-light">
      <div className="container-narrow mx-auto">
        <SmartCTA variant="crs" position="intro" className="mb-6" />
        <AnimatedSection>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">Why OPT holders choose Canada</h2>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            With H-1B uncertainty and longer green-card backlogs, US students on OPT and STEM OPT are switching to Canada in record numbers. Canadian PR is faster (~6 months via Express Entry), permanent from day one, and your US degree counts toward CRS points.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {[
            { icon: GraduationCap, title: "Your US degree counts", desc: "Bachelor's = 112 CRS pts, Master's = 126, PhD = 150 (after ECA from WES)." },
            { icon: Briefcase, title: "OPT work experience qualifies", desc: "1+ year of NOC TEER 0/1/2/3 work in the US makes you eligible for FSW." },
            { icon: Plane, title: "No need to leave the US first", desc: "Apply for Canadian PR while still on OPT. Move once approved." },
          ].map((b) => (
            <div key={b.title} className="bg-card border border-border rounded-xl p-6">
              <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center mb-3">
                <b.icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-1">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">3 Pathways from OPT to Canada</h2>
        <div className="space-y-4 mb-12">
          {[
            { num: "1", title: "Express Entry (Federal Skilled Worker)", time: "6–8 months", desc: "Submit your profile, get an ITA when your CRS clears the cutoff (typically 510–540 in 2026), then file PR. No Canadian job required." },
            { num: "2", title: "CUSMA Work Permit → CEC PR", time: "2 weeks + 6 months", desc: "US citizens only: LMIA-exempt work permit for 60+ professional roles. Work in Canada 1 year, then apply via Canadian Experience Class." },
            { num: "3", title: "Provincial Nominee Program (PNP)", time: "10–14 months", desc: "Tech-friendly streams (Ontario OINP, BC PNP Tech, Alberta AAIP) target STEM OPT graduates. Adds 600 CRS points." },
          ].map((p) => (
            <div key={p.num} className="bg-card border border-border rounded-xl p-5 md:p-6 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gold text-accent-foreground font-display font-bold flex items-center justify-center shrink-0">{p.num}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                  <h3 className="font-display font-bold text-foreground">{p.title}</h3>
                  <span className="text-xs font-bold text-gold bg-gold/10 px-2 py-1 rounded">{p.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <PathwayWidget />

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-12 mb-6">Step-by-step OPT → Canada PR checklist</h2>
        <ol className="space-y-3 mb-12">
          {[
            "Take IELTS General or CELPIP (target CLB 9 = IELTS 8/7/7/7).",
            "Get your US degree evaluated by WES (~6 weeks, USD $230).",
            "Calculate your CRS score using our free calculator.",
            "Create your Express Entry profile on the IRCC portal.",
            "Wait for an ITA (or apply for a PNP nomination for +600 points).",
            "Submit complete PR application within 60 days of ITA.",
            "Complete biometrics + medical exam.",
            "Receive COPR (Confirmation of Permanent Residence) — typically 6 months.",
            "Land in Canada and activate PR status.",
          ].map((step, i) => (
            <li key={i} className="bg-card border border-border rounded-xl p-4 flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
              <span className="text-foreground">{step}</span>
            </li>
          ))}
        </ol>

        <SmartCTA variant="pathway" position="end" className="mb-12" />

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">OPT to Canada — FAQ</h2>
        <div className="space-y-3 max-w-3xl mx-auto">
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

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <SmartCTA variant="crs" />
          <SmartCTA variant="noc" />
          <SmartCTA variant="compare" />
          <SmartCTA variant="pathway" />
        </div>
      </div>
    </section>
  </div>
);

export default OPTToCanadaPage;
