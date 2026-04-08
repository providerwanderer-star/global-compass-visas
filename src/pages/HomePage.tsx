import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Award, Users, Clock, CheckCircle, Star, BookOpen, Briefcase, GraduationCap, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import EligibilityForm from "@/components/EligibilityForm";
import heroBg from "@/assets/hero-bg.jpg";
import { countries } from "@/data/countryData";
import { blogPosts } from "@/data/blogData";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const pathways = [
  { icon: Briefcase, label: "Work Permits", description: "LMIA, TSS & employer-sponsored visas", href: "/services/work-permits" },
  { icon: GraduationCap, label: "Study Visas", description: "DLI admission + study permits + PGWP", href: "/services/study-visas" },
  { icon: Award, label: "Permanent Residency", description: "Express Entry, skilled migration & PNP", href: "/services/express-entry" },
  { icon: Search, label: "Job Seeker Visa", description: "Germany's unique job search pathway", href: "/services/job-seeker-visa" },
];

const testimonials = [
  { name: "Rajesh K.", country: "Canada PR", text: "4 Aces Visa helped me get my Canada PR in just 8 months. Their CRS optimization strategy was brilliant!", rating: 5 },
  { name: "Priya M.", country: "Australia 190", text: "I was confused between Canada and Australia. They analyzed my profile and Australia was perfect. Got my 190 visa!", rating: 5 },
  { name: "Ahmed S.", country: "Germany Blue Card", text: "From Job Seeker Visa to EU Blue Card in 4 months. The Germany team knows exactly what they're doing.", rating: 5 },
  { name: "Sneha R.", country: "Canada Study", text: "Got admission to a top DLI and study permit approved on first try. Now working on my PGWP!", rating: 5 },
];

const stats = [
  { value: "15,000+", label: "Successful Visas" },
  { value: "98%", label: "Success Rate" },
  { value: "3", label: "Countries Served" },
  { value: "10+", label: "Years Experience" },
];

const HomePage = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="relative container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <div className="max-w-3xl">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 bg-gold/15 text-gold px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                <Globe className="h-4 w-4" />
                Trusted by 15,000+ immigrants worldwide
              </span>
            </motion.div>
            <motion.h1
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              initial="hidden" animate="visible" variants={fadeUp} custom={1}
            >
              Not Sure Which Country to Move To?{" "}
              <span className="gradient-text">We Help You Choose.</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/70 mb-4 max-w-2xl"
              initial="hidden" animate="visible" variants={fadeUp} custom={2}
            >
              Canada 🇨🇦 &nbsp;|&nbsp; Australia 🇦🇺 &nbsp;|&nbsp; Germany 🇩🇪
            </motion.p>
            <motion.p
              className="text-base text-white/55 mb-8 max-w-xl"
              initial="hidden" animate="visible" variants={fadeUp} custom={3}
            >
              Work | Study | PR Pathways — Get expert guidance to find the right immigration pathway for your profile.
            </motion.p>
            <motion.div className="flex flex-wrap gap-4" initial="hidden" animate="visible" variants={fadeUp} custom={4}>
              <Link to="/contact">
                <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-semibold text-base shadow-gold px-8">
                  Check Eligibility <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white/25 text-white hover:bg-white/10 font-semibold text-base px-8">
                  Talk to Immigration Expert
                </Button>
              </Link>
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

      {/* Country Comparison */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Canada vs Australia vs Germany — Which is Right for You?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compare immigration pathways, processing times, and opportunities across three top destinations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {countries.map((c, i) => (
              <motion.div
                key={c.slug}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
              >
                <Link to={`/immigration/${c.slug}`} className="block group">
                  <div className="bg-card rounded-xl border border-border p-8 hover:shadow-elevated transition-all hover:border-gold/30 h-full">
                    <div className="text-5xl mb-4">{c.flag}</div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-2">{c.name}</h3>
                    <p className="text-gold text-sm font-medium mb-4">{c.tagline}</p>
                    <ul className="space-y-2 mb-6">
                      {c.pathways.map((p) => (
                        <li key={p.title} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                          {p.title}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center text-sm font-medium text-gold group-hover:gap-2 transition-all">
                      Explore pathways <ArrowRight className="h-4 w-4 ml-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pathway Selector */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Immigration Pathway
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you want to work, study, or settle permanently — we have the expertise to guide you.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pathways.map((p, i) => (
              <motion.div key={p.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Link to={p.href} className="block group">
                  <div className="bg-card rounded-xl border border-border p-6 hover:shadow-elevated transition-all hover:border-gold/30 text-center h-full">
                    <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                      <p.icon className="h-7 w-7 text-gold" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">{p.label}</h3>
                    <p className="text-sm text-muted-foreground">{p.description}</p>
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
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Success Stories from Our Clients
            </h2>
            <p className="text-muted-foreground">Real people, real results. Join thousands who trusted 4 Aces Visa.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <div className="bg-card rounded-xl border border-border p-6 h-full">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground mb-4 italic">"{t.text}"</p>
                  <div>
                    <div className="font-semibold text-sm text-foreground">{t.name}</div>
                    <div className="text-xs text-gold">{t.country}</div>
                  </div>
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
              <p className="text-primary-foreground/70 mb-6">
                Get a personalized eligibility assessment from our immigration experts. We'll analyze your profile and recommend the best pathway for you.
              </p>
              <ul className="space-y-3">
                {["Free expert assessment", "Response within 24 hours", "No obligation consultation", "100% confidential"].map((item) => (
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
              { q: "Which country is easiest for immigration in 2026?", a: "Canada offers the fastest PR pathways through Express Entry (6 months processing). Germany's Job Seeker Visa is easiest to obtain initially. Australia rewards high-skilled professionals with its points system. The best choice depends on your profile — book a free consultation to find out." },
              { q: "How much does immigration consulting cost?", a: "4 Aces Visa offers a free initial eligibility assessment. Our consulting packages vary based on the complexity of your case and destination country. We provide transparent pricing with no hidden fees." },
              { q: "Can 4 Aces Visa guarantee my visa approval?", a: "No ethical consultancy can guarantee visa approval as the final decision rests with immigration authorities. However, our 98% success rate reflects our expertise in preparing strong, compliant applications that maximize your chances." },
              { q: "How long does the entire immigration process take?", a: "Timelines vary by country and visa type: Canada Express Entry PR takes 6-12 months, Australia skilled migration takes 8-18 months, and Germany Job Seeker to Blue Card takes 6-12 months. We'll give you a realistic timeline during your consultation." },
              { q: "Do I need IELTS for immigration?", a: "For Canada, IELTS or equivalent is mandatory for Express Entry. For Australia, English proficiency is required for skilled migration. Germany may accept other language certifications. Higher language scores significantly improve your chances and CRS/points score." },
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
            Join 15,000+ successful immigrants who trusted 4 Aces Visa. Get your free eligibility assessment today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-semibold text-base shadow-gold px-8">
                Get Free Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white/25 text-white hover:bg-white/10 font-semibold text-base px-8">
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
