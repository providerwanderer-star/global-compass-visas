import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, Globe, Award, Users, Clock, CheckCircle, Star, BookOpen,
  Briefcase, GraduationCap, Search, Shield, Heart, Plane, FileText,
  RefreshCw, MapPin, BadgeCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import EligibilityForm from "@/components/EligibilityForm";
import AnimatedCounter from "@/components/AnimatedCounter";
import AnimatedSection from "@/components/AnimatedSection";
import heroBg from "@/assets/hero-bg.jpg";
import studentsImg from "@/assets/students-canada.jpg";
import familyImg from "@/assets/family-reunion.jpg";
import newLifeImg from "@/assets/new-life-canada.jpg";
import heroStudents from "@/assets/hero-students.png";
import heroFamily from "@/assets/hero-family.png";
import consultationImg from "@/assets/consultation.jpg";
import { countries } from "@/data/countryData";
import { blogPosts } from "@/data/blogData";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const immigrationServices = [
  { icon: Award, label: "Express Entry PR", description: "CRS optimization & 6-month PR processing", href: "/services/express-entry" },
  { icon: GraduationCap, label: "Student Visa", description: "Admissions, study permits & post-grad pathways", href: "/services/student-visa" },
  { icon: Briefcase, label: "LMIA Assistance", description: "Employer coordination & CRS points boost", href: "/services/lmia-assistance" },
  { icon: MapPin, label: "PNP Application", description: "Provincial nomination with +600 CRS points", href: "/services/pnp-application" },
  { icon: RefreshCw, label: "Visa Restoration", description: "Restore expired status within 90 days", href: "/services/visa-restoration" },
  { icon: Plane, label: "Visitor & Super Visa", description: "Family visits & extended stay visas", href: "/services/visitor-visa" },
  { icon: Shield, label: "Travel Insurance", description: "Mandatory medical coverage for visas", href: "/services/visitor-visa-insurance" },
  { icon: Heart, label: "Family Sponsorship", description: "Sponsor spouse, parents & children", href: "/services/family-sponsorship" },
  { icon: BadgeCheck, label: "Citizenship Application", description: "Complete your immigration journey", href: "/services/citizenship-application" },
  { icon: FileText, label: "Work Permits", description: "Open & employer-specific work permits", href: "/services/work-permits" },
];

const testimonials = [
  { name: "Rajesh K.", country: "Canada PR", text: "4 Aces Visa helped me get my Canada PR in just 8 months. Their CRS optimization strategy was brilliant! By immigrants, for immigrants — they truly understand the journey.", rating: 5 },
  { name: "Priya M.", country: "Australia 190", text: "I was confused between Canada and Australia. They analyzed my profile and Australia was perfect. Got my 190 visa! They've been through it themselves — that makes all the difference.", rating: 5 },
  { name: "Ahmed S.", country: "Germany Blue Card", text: "From Job Seeker Visa to EU Blue Card in 4 months. The team knows exactly what they're doing because they've walked this path themselves.", rating: 5 },
  { name: "Sneha R.", country: "Canada Study → PR", text: "Got admission to a top DLI and study permit approved on first try. Now working on my PGWP! By immigrants, for immigrants — they mean it.", rating: 5 },
  { name: "David L.", country: "UK Skilled Worker", text: "The UK visa process felt overwhelming until 4 Aces Visa stepped in. Got my Skilled Worker visa approved in 5 weeks. Incredible service.", rating: 5 },
  { name: "Maria C.", country: "Canada Family Sponsorship", text: "Sponsored my parents through Super Visa. The team handled insurance, documents, everything. So grateful to have my family together in Canada.", rating: 5 },
];

const stats = [
  { value: "15,000+", label: "Successful Visas" },
  { value: "98%", label: "Success Rate" },
  { value: "4", label: "Countries Served" },
  { value: "10+", label: "Years Experience" },
];

const HomePage = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div>
      <Helmet>
        <title>4 Aces Visa | Immigration Consultancy for Canada, Australia, Germany & UK</title>
        <meta name="description" content="By the immigrants, for the immigrants. Expert immigration services for Canada PR, study visas, LMIA, PNP, work permits, visitor visas, and citizenship. Free assessment." />
        <link rel="canonical" href="https://4acesvisa.com" />
        <meta name="keywords" content="immigration consultancy, Canada PR, Express Entry, study visa, work permit, LMIA, PNP, family sponsorship, Australia migration, Germany Blue Card, UK Skilled Worker visa, 4 Aces Visa" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="4 Aces Visa | Immigration Consultancy" />
        <meta property="og:description" content="Expert immigration services for Canada, Australia, Germany & UK. 15,000+ visas processed. 98% success rate." />
        <meta property="og:url" content="https://4acesvisa.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "Which country is easiest for immigration in 2026?", "acceptedAnswer": { "@type": "Answer", "text": "Canada offers the fastest PR pathways through Express Entry (6 months processing). Germany's Job Seeker Visa is easiest to obtain initially. Australia rewards high-skilled professionals. The UK's Skilled Worker visa is efficient with a job offer." }},
              { "@type": "Question", "name": "How much does immigration consulting cost?", "acceptedAnswer": { "@type": "Answer", "text": "4 Aces Visa offers a free initial eligibility assessment. Our packages vary based on complexity and destination. Transparent pricing with no hidden fees." }},
              { "@type": "Question", "name": "What does 'By immigrants, for immigrants' mean?", "acceptedAnswer": { "@type": "Answer", "text": "Our consultants have personally gone through the immigration process. We understand the stress, confusion, and life-changing decisions involved — because we've lived it." }},
              { "@type": "Question", "name": "Can 4 Aces Visa guarantee my visa approval?", "acceptedAnswer": { "@type": "Answer", "text": "No ethical consultancy can guarantee approval as the final decision rests with immigration authorities. However, our 98% success rate reflects our expertise in preparing strong, compliant applications." }},
              { "@type": "Question", "name": "Do I need IELTS for immigration?", "acceptedAnswer": { "@type": "Answer", "text": "For Canada, IELTS or equivalent is mandatory for Express Entry. Australia requires English for skilled migration. Germany may accept other certifications. UK requires B1 for Skilled Worker visa. Higher scores significantly improve your chances." }}
            ]
          })}
        </script>
      </Helmet>

      {/* Hero — bright split layout with people */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-secondary via-background to-muted overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/3" />

        <div className="relative container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left — Text */}
            <div className="order-2 lg:order-1">
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6 badge-pulse">
                  <Globe className="h-4 w-4" />
                  By the Immigrants, For the Immigrants
                </span>
              </motion.div>
              <motion.h1
                className="font-display text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-foreground leading-tight mb-6"
                initial="hidden" animate="visible" variants={fadeUp} custom={1}
              >
                Your Dream of Living Abroad{" "}
                <span className="gradient-text">Starts Here.</span>
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl"
                initial="hidden" animate="visible" variants={fadeUp} custom={2}
              >
                🇨🇦 Canada &nbsp;•&nbsp; 🇦🇺 Australia &nbsp;•&nbsp; 🇩🇪 Germany &nbsp;•&nbsp; 🇬🇧 United Kingdom
              </motion.p>
              <motion.p
                className="text-base text-muted-foreground/80 mb-8 max-w-xl"
                initial="hidden" animate="visible" variants={fadeUp} custom={3}
              >
                Express Entry • Student Visa • Work Permits • Family Sponsorship • Citizenship — Complete immigration services across 4 countries.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4" initial="hidden" animate="visible" variants={fadeUp} custom={4}>
                <Link to="/contact">
                  <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base shadow-gold px-8 py-6 text-lg hover:scale-105 transition-transform">
                    🚀 Get FREE Assessment <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/quiz">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-primary/30 text-primary hover:bg-primary/5 font-semibold text-base px-8 py-6 transition-all">
                    Explore Pathways
                  </Button>
                </Link>
              </motion.div>
              <motion.div className="flex items-center gap-6 mt-6" initial="hidden" animate="visible" variants={fadeUp} custom={5}>
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <span className="text-muted-foreground text-sm">4.9/5</span>
                </div>
                <div className="text-border">|</div>
                <span className="text-muted-foreground text-sm font-medium">15,000+ visas processed</span>
                <div className="text-border hidden sm:block">|</div>
                <span className="text-muted-foreground text-sm font-medium hidden sm:block">98% success rate</span>
              </motion.div>
            </div>

            {/* Right — People images collage */}
            <div className="order-1 lg:order-2 relative flex justify-center items-center min-h-[320px] md:min-h-[420px]">
              {/* Accent circle behind */}
              <motion.div
                className="absolute w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full bg-primary/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              {/* Students image — right side */}
              <motion.img
                src={heroStudents}
                alt="Happy international students starting their immigration journey"
                className="relative z-10 w-[200px] md:w-[260px] lg:w-[300px] drop-shadow-2xl ml-auto"
                width={640}
                height={640}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              />
              {/* Family image — bottom left, offset so no overlap */}
              <motion.img
                src={heroFamily}
                alt="Happy immigrant family reunited"
                className="absolute bottom-4 left-0 md:left-4 z-20 w-[150px] md:w-[190px] lg:w-[220px] rounded-2xl shadow-elevated border-4 border-background object-cover"
                width={640}
                height={640}
                initial={{ opacity: 0, x: -40, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              />
              {/* Floating stat badge */}
              <motion.div
                className="absolute top-4 right-0 md:top-8 md:right-4 z-30 bg-card shadow-elevated rounded-xl px-4 py-3 border border-border"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-bold text-foreground">98% Success</p>
                    <p className="text-xs text-muted-foreground">Visa Approval Rate</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats — animated counters */}
      <section className="bg-card border-b border-border">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <AnimatedCounter key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Canada Services Grid */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <AnimatedSection className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-wider mb-3">
              🌍 Immigration Services
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Complete Immigration Solutions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From your first study permit to becoming a permanent resident abroad — we cover every step of the journey.
            </p>
          </AnimatedSection>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {immigrationServices.map((s) => (
              <motion.div key={s.label} variants={staggerItem}>
                <Link to={s.href} className="block group h-full">
                  <div className="bg-card rounded-xl border border-border p-5 h-full flex flex-col items-center text-center card-interactive glow-hover">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-3 group-hover:bg-gold/20 transition-colors group-hover:scale-110 duration-300">
                      <s.icon className="h-6 w-6 text-gold" />
                    </div>
                    <h3 className="font-display text-sm font-bold text-foreground mb-1">{s.label}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Life in Canada — Visual Showcase */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto">
          <AnimatedSection className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-wider mb-3">
              Your Future Awaits
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              This Could Be Your Story
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every year, thousands of immigrants build new lives abroad. Here's what your journey could look like.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { img: studentsImg, alt: "International students on a university campus abroad", tag: "Study Abroad", title: "World-Class Education", desc: "Join thousands of international students at top universities worldwide" },
              { img: familyImg, alt: "Family reuniting at airport", tag: "Family Sponsorship", title: "Reunite with Family", desc: "Bring your loved ones closer through family sponsorship programs" },
              { img: newLifeImg, alt: "Young couple with house keys in new neighborhood", tag: "Permanent Residency", title: "Build Your New Life", desc: "From PR to your first home — we help you settle into life abroad" },
              { img: consultationImg, alt: "Immigration consultant meeting with clients", tag: "Expert Guidance", title: "Personal Consultation", desc: "One-on-one guidance from consultants who've been through the process" },
            ].map((item, i) => (
              <motion.div
                key={item.tag}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative group overflow-hidden rounded-2xl cursor-pointer"
              >
                <img src={item.img} alt={item.alt} loading="lazy" width={1280} height={720} className="w-full h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 transform group-hover:-translate-y-1 transition-transform duration-300">
                  <span className="inline-block bg-gold/90 text-accent-foreground text-xs font-bold px-3 py-1 rounded-full mb-2">{item.tag}</span>
                  <h3 className="font-display text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-white/80 text-xs mt-1 group-hover:text-white transition-colors">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/contact">
              <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold shadow-gold hover:scale-105 transition-transform">
                Start Your Story Today <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Country Comparison */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <AnimatedSection className="text-center mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Not Sure Which Country? We Help You Choose.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compare immigration pathways across four top destinations. Our consultants have personally immigrated — we know the reality, not just the paperwork.
            </p>
          </AnimatedSection>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {countries.map((c) => (
              <motion.div key={c.slug} variants={staggerItem}>
                <Link to={`/immigration/${c.slug}`} className="block group">
                  <div className={`bg-card rounded-xl border p-6 h-full card-interactive ${c.slug === "canada" ? "border-gold/40 ring-1 ring-gold/20" : "border-border"}`}>
                    <motion.div
                      className="text-4xl mb-3"
                      whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      {c.flag}
                    </motion.div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">{c.name}</h3>
                    <p className="text-gold text-xs font-medium mb-3">{c.tagline}</p>
                    <ul className="space-y-1.5 mb-4">
                      {c.pathways.slice(0, 4).map((p) => (
                        <li key={p.title} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />
                          {p.title}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center text-xs font-medium text-gold group-hover:gap-2 transition-all">
                      Explore pathways <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-8 text-center">
            <Link to="/quiz">
              <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold shadow-gold hover:scale-105 transition-transform">
                Take the Pathway Quiz <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <AnimatedSection className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-wider mb-3">
              By the Immigrants, For the Immigrants
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Real Stories from Real Immigrants
            </h2>
            <p className="text-muted-foreground">We've been where you are. These are stories from people just like you.</p>
          </AnimatedSection>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={staggerItem}>
                <div className="bg-card rounded-xl border border-border p-6 h-full card-interactive">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center shrink-0"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="font-display font-bold text-gold text-sm">{t.name.split(" ").map(n => n[0]).join("")}</span>
                    </motion.div>
                    <div>
                      <div className="font-semibold text-sm text-foreground">{t.name}</div>
                      <div className="text-xs text-gold">{t.country}</div>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground italic leading-relaxed">"{t.text}"</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Eligibility Form */}
      <section className="section-padding bg-primary" id="eligibility">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Check Your Immigration Eligibility — <span className="text-gold">Free</span>
              </h2>
              <p className="text-gold/80 text-sm font-medium mb-3 badge-pulse inline-block">⚡ Next Express Entry draw expected within 2 weeks — check your eligibility now</p>
              <p className="text-primary-foreground/70 mb-6">
                Get a personalized eligibility assessment from consultants who've been through the immigration process themselves.
              </p>
              <ul className="space-y-3">
                {["Free expert assessment", "Response within 24 hours", "No obligation consultation", "100% confidential", "By immigrants, for immigrants"].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2 text-primary-foreground/80 text-sm"
                  >
                    <CheckCircle className="h-4 w-4 text-gold" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="bg-card rounded-xl p-6 md:p-8 shadow-elevated">
                <EligibilityForm sourcePage="homepage" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <div className="flex justify-between items-end mb-12">
            <AnimatedSection>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Immigration Insights & Guides
              </h2>
              <p className="text-muted-foreground">Expert articles to help you navigate your immigration journey.</p>
            </AnimatedSection>
            <Link to="/blog" className="hidden md:inline-flex items-center text-sm font-medium text-gold hover:underline hover:gap-2 transition-all">
              View all articles <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {blogPosts.slice(0, 3).map((post) => (
              <motion.div key={post.slug} variants={staggerItem}>
                <Link to={`/blog/${post.slug}`} className="block group">
                  <div className="bg-card rounded-xl border border-border overflow-hidden h-full card-interactive">
                    <div className="bg-secondary p-4 group-hover:bg-gold/10 transition-colors duration-300">
                      <BookOpen className="h-8 w-8 text-gold group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-medium text-gold">{post.category}</span>
                      <h3 className="font-display text-lg font-bold text-foreground mt-1 mb-2 group-hover:text-gold transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{post.readTime} read</span>
                        <span className="flex items-center text-gold font-medium group-hover:gap-1.5 transition-all">
                          Read more <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/blog">
              <Button variant="outline" className="border-gold text-gold hover:bg-gold/10">View All Articles</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto max-w-3xl">
          <AnimatedSection className="text-center mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
          </AnimatedSection>
          <div className="space-y-4">
            {[
              { q: "Which country is easiest for immigration in 2026?", a: "Canada offers the fastest PR pathways through Express Entry (6 months processing). Germany's Job Seeker Visa is easiest to obtain initially. Australia rewards high-skilled professionals. The UK's Skilled Worker visa is efficient with a job offer. The best choice depends on your profile — book a free consultation." },
              { q: "How much does immigration consulting cost?", a: "4 Aces Visa offers a free initial eligibility assessment. Our packages vary based on complexity and destination. Transparent pricing with no hidden fees." },
              { q: "What does 'By immigrants, for immigrants' mean?", a: "Our consultants have personally gone through the immigration process. We understand the stress, confusion, and life-changing decisions involved — because we've lived it. This first-hand experience makes our guidance more practical and empathetic." },
              { q: "Can 4 Aces Visa guarantee my visa approval?", a: "No ethical consultancy can guarantee approval as the final decision rests with immigration authorities. However, our 98% success rate reflects our expertise in preparing strong, compliant applications." },
              { q: "Do I need IELTS for immigration?", a: "For Canada, IELTS or equivalent is mandatory for Express Entry. Australia requires English for skilled migration. Germany may accept other certifications. UK requires B1 for Skilled Worker visa. Higher scores significantly improve your chances." },
            ].map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl border border-border group card-interactive"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer font-display font-semibold text-foreground">
                  {faq.q}
                  <span className="text-gold ml-4 text-xl group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-primary text-center overflow-hidden">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Start Your Immigration Journey?
            </h2>
            <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">
              Join 15,000+ successful immigrants who trusted 4 Aces Visa. By the immigrants, for the immigrants — we've been where you are.
            </p>
            <p className="text-gold/80 text-sm font-medium mb-8 badge-pulse inline-block">⚡ Limited free consultation slots available this week</p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto bg-gold text-accent-foreground hover:bg-gold-dark font-bold text-lg shadow-gold px-10 py-6 hover:scale-105 transition-transform">
                  🚀 Start Your Journey — FREE <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="https://wa.me/16478622190" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto bg-transparent border-2 border-white/40 text-white hover:bg-white/10 font-semibold text-base px-8 py-6 hover:border-white/70 transition-all">
                  💬 WhatsApp Us
                </Button>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
