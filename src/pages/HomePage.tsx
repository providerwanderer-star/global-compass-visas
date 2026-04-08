import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowRight, Globe, Award, Users, Clock, CheckCircle, Star, BookOpen,
  Briefcase, GraduationCap, Search, Shield, Heart, Plane, FileText,
  RefreshCw, MapPin, BadgeCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import EligibilityForm from "@/components/EligibilityForm";
import heroBg from "@/assets/hero-bg.jpg";
import studentsImg from "@/assets/students-canada.jpg";
import familyImg from "@/assets/family-reunion.jpg";
import newLifeImg from "@/assets/new-life-canada.jpg";
import consultationImg from "@/assets/consultation.jpg";
import { countries } from "@/data/countryData";
import { blogPosts } from "@/data/blogData";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const canadaServices = [
  { icon: Award, label: "Express Entry PR", description: "CRS optimization & 6-month PR processing", href: "/services/express-entry" },
  { icon: GraduationCap, label: "Student Visa", description: "DLI admission, study permits & PGWP pathway", href: "/services/student-visa" },
  { icon: Briefcase, label: "LMIA Assistance", description: "Employer coordination & +50-200 CRS points", href: "/services/lmia-assistance" },
  { icon: MapPin, label: "PNP Application", description: "Provincial nomination with +600 CRS points", href: "/services/pnp-application" },
  { icon: RefreshCw, label: "Visa Restoration", description: "Restore expired status within 90 days", href: "/services/visa-restoration" },
  { icon: Plane, label: "Visitor Visa & Super Visa", description: "Family visits & 10-year Super Visa", href: "/services/visitor-visa" },
  { icon: Shield, label: "Visitor Visa Insurance", description: "Mandatory Super Visa medical coverage", href: "/services/visitor-visa-insurance" },
  { icon: Heart, label: "Family Sponsorship", description: "Sponsor spouse, parents & children", href: "/services/family-sponsorship" },
  { icon: BadgeCheck, label: "Citizenship Application", description: "Complete your Canadian journey", href: "/services/citizenship-application" },
  { icon: FileText, label: "Work Permits", description: "LMIA, open & employer-specific permits", href: "/services/work-permits" },
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
  return (
    <div>
      <Helmet>
        <title>4 Aces Visa | Immigration Consultancy for Canada, Australia, Germany & UK</title>
        <meta name="description" content="By the immigrants, for the immigrants. Expert immigration services for Canada PR, study visas, LMIA, PNP, work permits, visitor visas, and citizenship. Free assessment." />
        <link rel="canonical" href="https://4acesvisa.com" />
      </Helmet>
      {/* Hero — Canada-Focused */}
      <section className="relative min-h-[55vh] md:min-h-[65vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="relative container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-3xl">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 bg-gold/15 text-gold px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                <Globe className="h-4 w-4" />
                By the Immigrants, For the Immigrants
              </span>
            </motion.div>
            <motion.h1
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              initial="hidden" animate="visible" variants={fadeUp} custom={1}
            >
              Your Canadian Dream{" "}
              <span className="gradient-text">Starts Here.</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/80 mb-4 max-w-2xl"
              initial="hidden" animate="visible" variants={fadeUp} custom={2}
            >
              🇨🇦 Canada &nbsp;•&nbsp; 🇦🇺 Australia &nbsp;•&nbsp; 🇩🇪 Germany &nbsp;•&nbsp; 🇬🇧 United Kingdom
            </motion.p>
            <motion.p
              className="text-base text-white/55 mb-8 max-w-xl"
              initial="hidden" animate="visible" variants={fadeUp} custom={3}
            >
              Express Entry • Student Visa • LMIA • PNP • Visitor Visa • Family Sponsorship • Citizenship — Complete Canadian immigration services by consultants who've been through the process themselves.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4" initial="hidden" animate="visible" variants={fadeUp} custom={4}>
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto bg-gold text-accent-foreground hover:bg-gold-dark font-bold text-base shadow-gold px-8 py-6 text-lg">
                  🚀 Get FREE Assessment Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/immigration/canada">
                <Button size="lg" className="w-full sm:w-auto bg-transparent border-2 border-white/40 text-white hover:bg-white/10 font-semibold text-base px-8 py-6">
                  Explore Canada Pathways
                </Button>
              </Link>
            </motion.div>
            <motion.div className="flex items-center gap-6 mt-6" initial="hidden" animate="visible" variants={fadeUp} custom={5}>
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <span className="text-white/70 text-sm">4.9/5</span>
              </div>
              <div className="text-white/40">|</div>
              <span className="text-white/70 text-sm font-medium">15,000+ visas processed</span>
              <div className="text-white/40 hidden sm:block">|</div>
              <span className="text-white/70 text-sm font-medium hidden sm:block">98% success rate</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card border-b border-border">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-primary">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Canada Services Grid */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-wider mb-3">
              🇨🇦 Canada Immigration Services
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Complete Canadian Immigration Solutions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From your first study permit to becoming a Canadian citizen — we cover every step of the journey. By immigrants who've walked this path, for immigrants building their future.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {canadaServices.map((s, i) => (
              <motion.div key={s.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i % 5}>
                <Link to={s.href} className="block group h-full">
                  <div className="bg-card rounded-xl border border-border p-5 hover:shadow-elevated transition-all hover:border-gold/30 h-full flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-3">
                      <s.icon className="h-6 w-6 text-gold" />
                    </div>
                    <h3 className="font-display text-sm font-bold text-foreground mb-1">{s.label}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Life in Canada — Visual Showcase */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-wider mb-3">
              Your Future Awaits
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              This Could Be Your Story
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every year, thousands of immigrants build new lives in Canada. Here's what your journey could look like.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="relative group overflow-hidden rounded-2xl">
              <img src={studentsImg} alt="International students on a Canadian university campus in autumn" loading="lazy" width={1280} height={720} className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-block bg-gold/90 text-accent-foreground text-xs font-bold px-3 py-1 rounded-full mb-2">Study in Canada</span>
                <h3 className="font-display text-lg font-bold text-white">World-Class Education</h3>
                <p className="text-white/80 text-xs mt-1">Join thousands of international students at top Canadian universities</p>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="relative group overflow-hidden rounded-2xl">
              <img src={familyImg} alt="Indian family reuniting at Canadian airport" loading="lazy" width={1280} height={720} className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-block bg-gold/90 text-accent-foreground text-xs font-bold px-3 py-1 rounded-full mb-2">Family Sponsorship</span>
                <h3 className="font-display text-lg font-bold text-white">Reunite with Family</h3>
                <p className="text-white/80 text-xs mt-1">Bring your parents, spouse, and children to Canada through sponsorship</p>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="relative group overflow-hidden rounded-2xl">
              <img src={newLifeImg} alt="Young couple with house keys in Canadian neighborhood" loading="lazy" width={1280} height={720} className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-block bg-gold/90 text-accent-foreground text-xs font-bold px-3 py-1 rounded-full mb-2">Permanent Residency</span>
                <h3 className="font-display text-lg font-bold text-white">Build Your New Life</h3>
                <p className="text-white/80 text-xs mt-1">From PR to your first home — we help you settle into Canadian life</p>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className="relative group overflow-hidden rounded-2xl">
              <img src={consultationImg} alt="Immigration consultant meeting with clients" loading="lazy" width={1280} height={720} className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-block bg-gold/90 text-accent-foreground text-xs font-bold px-3 py-1 rounded-full mb-2">Expert Guidance</span>
                <h3 className="font-display text-lg font-bold text-white">Personal Consultation</h3>
                <p className="text-white/80 text-xs mt-1">One-on-one guidance from consultants who've been through the process</p>
              </div>
            </motion.div>
          </div>
          <div className="mt-8 text-center">
            <Link to="/contact">
              <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold shadow-gold">
                Start Your Story Today <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Country Comparison */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Not Sure Which Country? We Help You Choose.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compare immigration pathways across four top destinations. Our consultants have personally immigrated — we know the reality, not just the paperwork.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {countries.map((c, i) => (
              <motion.div
                key={c.slug}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
              >
                <Link to={`/immigration/${c.slug}`} className="block group">
                  <div className={`bg-card rounded-xl border p-6 hover:shadow-elevated transition-all h-full ${c.slug === "canada" ? "border-gold/40 ring-1 ring-gold/20" : "border-border hover:border-gold/30"}`}>
                    <div className="text-4xl mb-3">{c.flag}</div>
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
                      Explore pathways <ArrowRight className="h-3 w-3 ml-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-wider mb-3">
              By the Immigrants, For the Immigrants
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Real Stories from Real Immigrants
            </h2>
            <p className="text-muted-foreground">We've been where you are. These are stories from people just like you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i % 3}>
                <div className="bg-card rounded-xl border border-border p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
                      <span className="font-display font-bold text-gold text-sm">{t.name.split(" ").map(n => n[0]).join("")}</span>
                    </div>
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
          </div>
        </div>
      </section>

      {/* Eligibility Form */}
      <section className="section-padding bg-primary" id="eligibility">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Check Your Immigration Eligibility — <span className="text-gold">Free</span>
              </h2>
              <p className="text-gold/80 text-sm font-medium mb-3">⚡ Next Express Entry draw expected within 2 weeks — check your eligibility now</p>
              <p className="text-primary-foreground/70 mb-6">
                Get a personalized eligibility assessment from consultants who've been through the immigration process themselves. We analyze your profile and recommend the best pathway.
              </p>
              <ul className="space-y-3">
                {["Free expert assessment", "Response within 24 hours", "No obligation consultation", "100% confidential", "By immigrants, for immigrants"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                    <CheckCircle className="h-4 w-4 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-xl p-6 md:p-8 shadow-elevated">
              <EligibilityForm sourcePage="homepage" />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Immigration Insights & Guides
              </h2>
              <p className="text-muted-foreground">Expert articles to help you navigate your immigration journey.</p>
            </div>
            <Link to="/blog" className="hidden md:inline-flex items-center text-sm font-medium text-gold hover:underline">
              View all articles <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post, i) => (
              <motion.div key={post.slug} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Link to={`/blog/${post.slug}`} className="block group">
                  <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-elevated transition-all h-full">
                    <div className="bg-secondary p-4">
                      <BookOpen className="h-8 w-8 text-gold" />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-medium text-gold">{post.category}</span>
                      <h3 className="font-display text-lg font-bold text-foreground mt-1 mb-2 group-hover:text-gold transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{post.readTime} read</span>
                        <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              { q: "Which country is easiest for immigration in 2026?", a: "Canada offers the fastest PR pathways through Express Entry (6 months processing). Germany's Job Seeker Visa is easiest to obtain initially. Australia rewards high-skilled professionals. The UK's Skilled Worker visa is efficient with a job offer. The best choice depends on your profile — book a free consultation." },
              { q: "How much does immigration consulting cost?", a: "4 Aces Visa offers a free initial eligibility assessment. Our packages vary based on complexity and destination. Transparent pricing with no hidden fees." },
              { q: "What does 'By immigrants, for immigrants' mean?", a: "Our consultants have personally gone through the immigration process. We understand the stress, confusion, and life-changing decisions involved — because we've lived it. This first-hand experience makes our guidance more practical and empathetic." },
              { q: "Can 4 Aces Visa guarantee my visa approval?", a: "No ethical consultancy can guarantee approval as the final decision rests with immigration authorities. However, our 98% success rate reflects our expertise in preparing strong, compliant applications." },
              { q: "Do I need IELTS for immigration?", a: "For Canada, IELTS or equivalent is mandatory for Express Entry. Australia requires English for skilled migration. Germany may accept other certifications. UK requires B1 for Skilled Worker visa. Higher scores significantly improve your chances." },
            ].map((faq, i) => (
              <details key={i} className="bg-card rounded-xl border border-border group">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-display font-semibold text-foreground">
                  {faq.q}
                  <span className="text-gold ml-4 text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-primary text-center">
        <div className="container-narrow mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Start Your Immigration Journey?
          </h2>
          <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">
            Join 15,000+ successful immigrants who trusted 4 Aces Visa. By the immigrants, for the immigrants — we've been where you are.
          </p>
          <p className="text-gold/80 text-sm font-medium mb-8">⚡ Limited free consultation slots available this week</p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <Link to="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-gold text-accent-foreground hover:bg-gold-dark font-bold text-lg shadow-gold px-10 py-6">
                🚀 Start Your Journey — FREE <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="https://wa.me/16478622190" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto bg-transparent border-2 border-white/40 text-white hover:bg-white/10 font-semibold text-base px-8 py-6">
                💬 WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
