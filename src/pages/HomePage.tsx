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
import heroCombined from "@/assets/hero-combined.jpg";
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

const homeFaqs = [
  { q: "How can I apply for Canada PR from India in 2026?", a: "You can apply through three main pathways: Express Entry (Federal Skilled Worker, Canadian Experience Class, or Federal Skilled Trades), Provincial Nominee Programs (PNP), or LMIA-based work permits leading to PR. Express Entry is the fastest at 6-8 months. Start by getting your IELTS score, WES credential assessment, and creating an Express Entry profile on IRCC." },
  { q: "What is the minimum CRS score for Canada PR in 2026?", a: "Recent Express Entry general draws have had CRS cutoffs between 430-490. Category-based draws for healthcare, STEM, trades, transport, agriculture, and French speakers may have lower cutoffs (typically 380-440). A PNP nomination adds 600 CRS points, virtually guaranteeing an invitation." },
  { q: "Which country is the easiest to immigrate to in 2026?", a: "Canada offers the fastest PR through Express Entry (6 months). Germany's Chancenkarte (Opportunity Card) visa is easiest to obtain initially with just 6 points. Australia rewards high-skilled professionals with points-based PR. The UK is efficient if you have a job offer. Your best option depends on your age, education, language skills, and work experience." },
  { q: "Can I get Canada PR without a job offer?", a: "Yes, the Federal Skilled Worker Program (FSWP) under Express Entry does not require a job offer. You qualify based on CRS score alone. However, a valid LMIA job offer adds 50-200 CRS points and significantly improves your chances of receiving an ITA." },
  { q: "What is the difference between Express Entry and PNP?", a: "Express Entry is the federal system that ranks all candidates by CRS score and issues ITAs. PNP (Provincial Nominee Program) allows individual provinces like Ontario (OINP), BC, Alberta, and Saskatchewan to nominate candidates based on local labor market needs. A PNP nomination adds 600 CRS points to your Express Entry profile, guaranteeing a PR invitation." },
  { q: "How much does Canada PR cost from India in 2026?", a: "Total costs include IRCC processing fees (~CAD 1,365), IELTS exam (~₹16,000), WES credential evaluation (~₹15,000), biometrics (CAD 85), police clearances (~₹500-2,000), and medical exam (~₹5,000-8,000). Grand total is typically ₹3-5 lakhs (CAD 2,500-5,000) excluding consultant fees. 4 Aces Visa offers transparent pricing with no hidden charges." },
  { q: "How long does Canada PR take from India?", a: "Express Entry: 6-8 months from ITA to PR approval. PNP-based: 12-18 months total. Study permit to PR pathway: 3-5 years (2-year program + 3-year PGWP + CEC application). LMIA work permit to PR: 8-14 months. Total timeline from start to PR landing is typically 8-18 months for direct pathways." },
  { q: "What are the best courses in Canada for PR in 2026?", a: "Top PR-friendly programs include: Computer Science & IT (NOC 21232-21234), Nursing & Healthcare (NOC 31301-31302), Business Analytics & Supply Chain Management, Early Childhood Education (high PNP demand), Electrical & Mechanical Engineering Technology, Cybersecurity & Cloud Computing, and Hospitality Management. Choose 2-year diplomas at DLIs for a 3-year PGWP, maximizing your PR pathway." },
  { q: "Which colleges in Canada are best for PR pathway?", a: "Top DLIs for PR pathway include Conestoga College (Ontario), Seneca Polytechnic (Toronto), Douglas College (BC), BCIT (Vancouver), Humber College (Toronto), Fanshawe College (London ON), Saskatchewan Polytechnic, and NAIT (Alberta). Look for programs aligned with NOC TEER 0/1/2/3 occupations and provinces with active PNP draws." },
  { q: "What are the top 5 immigration pathways to Canada in 2026?", a: "1) Express Entry FSWP — fastest PR for skilled workers with CLB 7+ and 67+ FSW points. 2) Provincial Nominee Program (PNP) — +600 CRS points, ideal for moderate CRS profiles. 3) LMIA Work Permit → PR — employer-sponsored route adding 50-200 CRS points. 4) Study Permit → PGWP → CEC — best for young applicants wanting Canadian education. 5) Atlantic Immigration Program (AIP) — employer-driven, lower requirements, fast processing for Atlantic provinces." },
  { q: "What is the Atlantic Immigration Program (AIP)?", a: "The AIP is a permanent employer-driven pathway for skilled workers and international graduates to settle in New Brunswick, Nova Scotia, PEI, or Newfoundland. It requires a job offer from a designated Atlantic employer, minimum CLB 4 (NOC TEER 0/1/2/3) or CLB 5 (TEER 4), and no points system — making it accessible for candidates with lower CRS scores." },
  { q: "What government settlement programs are available for new immigrants to Canada?", a: "Canada offers extensive free settlement services: IRCC-funded Settlement Programs (language classes, job help, mentoring), the Canadian Immigrant Integration Program (CIIP) for pre-arrival orientation, the Foreign Credential Recognition Program (FCRP) for credential assessment, Provincial Settlement Services (ISANS, OCASI), and the Resettlement Assistance Program. New immigrants also access free healthcare (after waiting period), public education for children, and Canada Child Benefit (CCB)." },
  { q: "What financial assistance is available for immigrants in Canada?", a: "New immigrants can access: Canada Child Benefit (CCB) up to $7,437/child/year, GST/HST Credit (~$500/year), Provincial benefits (Ontario Trillium Benefit, BC Climate Action Tax Credit), Settlement funding for language training (LINC/CLIC — free), Federal Skilled Worker loans for credential recognition, and Start-up Visa Program for immigrant entrepreneurs. PR holders also qualify for EI, CPP, and OAS after meeting residency requirements." },
  { q: "How many points do I need for Australian PR in 2026?", a: "Minimum 65 points required, but competitive scores are 80-90+ for most occupations. Points: Age 25-32 (30 pts), Bachelor's degree (15 pts), 5+ years experience (10 pts), IELTS 8+ Superior (20 pts), Australian study (5 pts), regional nomination (15 pts). Subclass 189 (independent) is most competitive; Subclass 190 (state-nominated) adds 5 points; Subclass 491 (regional) adds 15 points." },
  { q: "What is Germany's Chancenkarte (Opportunity Card) visa 2026?", a: "The Chancenkarte replaced the old Job Seeker Visa in June 2024. It's a points-based system requiring 6+ points from: Recognized degree (1-3 pts), language skills (1-3 pts), work experience (1-3 pts), age under 35 (2 pts), and German connection (1 pt). Valid for 1 year to search for employment. You can work part-time (20 hrs/week) while searching — a major improvement over the old visa." },
  { q: "How can I get a UK Skilled Worker Visa in 2026?", a: "You need: a job offer from an UKVI-licensed sponsor, minimum salary of £26,200 or the going rate for your occupation (whichever is higher), English at B1 level (IELTS 4.0+), and 70 points on the PBS. Points: Job offer from approved sponsor (20), job at appropriate skill level (20), English language (10), salary threshold (20). After 5 years, apply for Indefinite Leave to Remain (ILR)." },
  { q: "How can I increase my CRS score fast in 2026?", a: "Top strategies ranked by impact: 1) Improve IELTS to CLB 9+ (adds up to 124 points). 2) Get a PNP nomination (+600 points — game changer). 3) Obtain an LMIA job offer (+50-200 points). 4) Learn French and take TEF/TCF (+25-50 points). 5) Complete a Canadian credential (WES or Canadian degree). 6) Get spouse's IELTS and credentials assessed. 7) Gain additional work experience in a NOC TEER 0/1 occupation." },
  { q: "What IELTS score do I need for Canada PR?", a: "Minimum CLB 7 for Federal Skilled Worker Program: IELTS L6.0, R6.0, W6.0, S6.0. For maximum CRS points, aim for CLB 10: L8.5, R8.0, W7.5, S7.5. Each band increase from CLB 7 to CLB 9 can add 40-80 CRS points. Canadian Experience Class requires minimum CLB 7 (NOC TEER 0/1) or CLB 5 (NOC TEER 2/3)." },
  { q: "Can I bring my family to Canada with my PR?", a: "Yes. Your spouse/common-law partner and dependent children (under 22, unmarried) are included in your PR application. Your spouse gets an open work permit. After becoming a PR, you can sponsor parents and grandparents through the PGP program or invite them on a Super Visa (10-year multiple entry, 5-year stays per visit)." },
  { q: "What is the Super Visa for parents in 2026?", a: "The Super Visa is a 10-year multiple-entry visa allowing parents and grandparents of Canadian citizens or PRs to stay up to 5 years per visit. Requirements: inviter must meet minimum income (LICO+30%), private medical insurance of minimum $100,000 coverage from a Canadian insurer. Processing takes 3-6 months." },
  { q: "How do I choose the best immigration consultant?", a: "Look for: proven track record with verifiable success rates, transparent pricing with no hidden fees, personal immigration experience, knowledge of multiple pathways, and free initial assessments. Red flags: guaranteeing visa approval, cash-only payments, high-pressure sales tactics, and inability to explain the process clearly. 4 Aces Visa consultants are immigrants themselves with a 98% success rate." },
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
        <title>Your Complete Visa & Immigration Solution Specialist | 4 Aces Visa</title>
        <meta name="description" content="Your all-in-one visa & immigration specialists. PR, work permits, study visas, visitor visas & family sponsorship for Canada, Australia, Germany & UK. 15,000+ visas processed. Free assessment." />
        <link rel="canonical" href="https://www.4acesvisa.com/" />
        <meta name="keywords" content="Canada PR consultant Punjab, immigration consultant Ontario, work permit Canada from India, Express Entry 2026, LMIA, PNP, study permit Canada, Canada immigration from Punjab, immigration consultant Brampton, Canada PR from India, 4 Aces Visa" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Your Complete Visa & Immigration Solution Specialist | 4 Aces Visa" />
        <meta property="og:description" content="All-in-one immigration experts. PR, work permits, study visas, visitor visas & family sponsorship for Canada, Australia, Germany & UK. 15,000+ visas processed." />
        <meta property="og:url" content="https://www.4acesvisa.com/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://www.4acesvisa.com/#organization",
                "name": "4 Aces Visa",
                "url": "https://www.4acesvisa.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.4acesvisa.com/favicon.ico",
                  "width": 512,
                  "height": 512
                },
                "description": "By the immigrants, for the immigrants. Global immigration consultancy for Canada, Australia, Germany & UK with 15,000+ successful visas and 98% approval rate.",
                "foundingDate": "2016",
                "telephone": "+1-647-862-2190",
                "email": "sahil280389@gmail.com",
                "contactPoint": [
                  {
                    "@type": "ContactPoint",
                    "telephone": "+1-647-862-2190",
                    "contactType": "customer service",
                    "availableLanguage": ["English", "Hindi", "Punjabi"],
                    "areaServed": ["CA", "AU", "DE", "GB", "IN"]
                  }
                ],
                "areaServed": [
                  {"@type": "Country", "name": "Canada"},
                  {"@type": "Country", "name": "Australia"},
                  {"@type": "Country", "name": "Germany"},
                  {"@type": "Country", "name": "United Kingdom"},
                  {"@type": "Country", "name": "India"}
                ],
                "knowsAbout": [
                  "Immigration Consulting", "Express Entry Canada", "Study Visa",
                  "Work Permits", "Provincial Nominee Program", "LMIA",
                  "Family Sponsorship", "Visitor Visa", "Citizenship Application",
                  "Australia Skilled Migration", "Germany Job Seeker Visa",
                  "EU Blue Card", "UK Skilled Worker Visa"
                ],
                "sameAs": ["https://wa.me/16478622190"]
              },
              {
                "@type": "LocalBusiness",
                "@id": "https://www.4acesvisa.com/#localbusiness",
                "name": "4 Aces Visa — Immigration Consultants",
                "image": "https://www.4acesvisa.com/favicon.ico",
                "url": "https://www.4acesvisa.com",
                "telephone": "+1-647-862-2190",
                "email": "sahil280389@gmail.com",
                "description": "Licensed immigration consultants specializing in Canada Express Entry PR, LMIA work permits, PNP, study permits, family sponsorship, visitor visas & citizenship for Canada, Australia, Germany & UK.",
                "priceRange": "$$",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Brampton",
                  "addressRegion": "Ontario",
                  "addressCountry": "CA"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 43.7315,
                  "longitude": -79.7624
                },
                "openingHoursSpecification": [
                  {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    "opens": "09:00",
                    "closes": "18:00"
                  },
                  {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": "Saturday",
                    "opens": "10:00",
                    "closes": "15:00"
                  }
                ],
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "15000",
                  "bestRating": "5"
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Immigration Services",
                  "itemListElement": [
                    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Express Entry PR"}},
                    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Student Visa"}},
                    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "LMIA Work Permit"}},
                    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Provincial Nominee Program"}},
                    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Family Sponsorship"}},
                    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Visitor & Super Visa"}},
                    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Citizenship Application"}},
                    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Work Permits"}}
                  ]
                }
              },
              {
                "@type": "FAQPage",
                "mainEntity": homeFaqs.map(faq => ({
                  "@type": "Question",
                  "name": faq.q,
                  "acceptedAnswer": { "@type": "Answer", "text": faq.a }
                }))
              }
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
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-stretch">
            {/* Left — Text */}
            <div className="order-1 lg:order-1 flex flex-col justify-center">
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
                Your Complete{" "}
                <span className="gradient-text">Visa & Immigration Solution Specialist</span>
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl"
                initial="hidden" animate="visible" variants={fadeUp} custom={2}
              >
                PR, work permits, study visas, visitor visas, family sponsorship & more — one team, every pathway, 98% success rate.
              </motion.p>
              <motion.p
                className="text-base text-muted-foreground/80 mb-8 max-w-xl"
                initial="hidden" animate="visible" variants={fadeUp} custom={3}
              >
                🇨🇦 Canada &nbsp;•&nbsp; 🇦🇺 Australia &nbsp;•&nbsp; 🇩🇪 Germany &nbsp;•&nbsp; 🇬🇧 UK — Every visa type, every destination, handled end-to-end.
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
                <div className="text-border">|</div>
                <span className="text-muted-foreground text-sm font-medium">98% success rate</span>
              </motion.div>
            </div>

            {/* Right — Hero image blended into background */}
            <div className="order-2 lg:order-2 relative flex items-center justify-center lg:min-h-full">
              {/* Accent circle behind */}
              <motion.div
                className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-primary/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              {/* Image with edge-fade mask — fills the column height */}
              <motion.div
                className="relative w-full lg:absolute lg:inset-0 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <img
                  src={heroCombined}
                  alt="Happy students and families starting their immigration journey"
                  className="w-full h-full object-cover lg:object-center"
                  width={1280}
                  height={720}
                />
              </motion.div>
              {/* Floating stat badge */}
              <motion.div
                className="absolute -bottom-2 right-4 md:right-8 z-30 bg-card shadow-elevated rounded-xl px-4 py-3 border border-border"
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


      {/* Destination Quick-Select — Where do you want to move? */}
      <section className="py-8 px-4 bg-white border-b border-border">
        <div className="container-narrow mx-auto">
          <AnimatedSection className="text-center mb-6">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">🌐 Where do you want to move?</p>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { flag: "🇨🇦", country: "Canada", label: "Express Entry PR", time: "6 months", href: "/immigration/canada" },
              { flag: "🇦🇺", country: "Australia", label: "Skilled Migration", time: "8–12 months", href: "/australia/skilled-migration" },
              { flag: "🇩🇪", country: "Germany", label: "EU Blue Card / Chancenkarte", time: "4–12 weeks", href: "/germany/chancenkarte" },
              { flag: "🇬🇧", country: "United Kingdom", label: "Skilled Worker Visa", time: "3–8 weeks", href: "/uk/skilled-worker" },
            ].map((c, i) => (
              <Link key={i} to={c.href} className="block group">
                <div className="bg-card rounded-xl border border-border p-4 text-center card-interactive hover:border-gold/50 transition-all h-full">
                  <span className="text-3xl block mb-2">{c.flag}</span>
                  <h3 className="font-bold text-foreground text-sm">{c.country}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.label}</p>
                  <span className="text-xs text-gold font-semibold mt-1.5 block">⏱ {c.time}</span>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-center mt-4">
            <Link to="/compare" className="text-sm text-primary underline underline-offset-2 font-medium hover:text-primary/80">
              Compare all countries side-by-side →
            </Link>
          </p>
        </div>
      </section>
      {/* How We Help You Migrate — Step Process */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto">
          <AnimatedSection className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-wider mb-3">
              🚀 Your Pathway to PR
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How We Help You Migrate to Canada
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you're in Punjab or Ontario, our proven 5-step process has helped 15,000+ immigrants achieve their Canadian dream.
            </p>
          </AnimatedSection>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-5 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { step: "01", title: "Free Assessment", desc: "We evaluate your CRS score, education, work experience & language proficiency to identify the best pathway." },
              { step: "02", title: "Strategy & Optimization", desc: "Personalized plan to maximize your CRS score — IELTS coaching, PNP targeting, LMIA coordination." },
              { step: "03", title: "Document Preparation", desc: "Complete document compilation, WES/ECA evaluation, and application-ready dossier preparation." },
              { step: "04", title: "Application Filing", desc: "Expert submission of your Express Entry profile, PNP application, or work permit with zero errors." },
              { step: "05", title: "Landing & Settlement", desc: "Post-approval guidance — COPR, landing prep, and settlement support in Canada." },
            ].map((item) => (
              <motion.div key={item.step} variants={staggerItem}>
                <div className="bg-card rounded-xl border border-border p-5 h-full card-interactive text-center">
                  <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-3">
                    <span className="font-display font-bold text-gold text-sm">{item.step}</span>
                  </div>
                  <h3 className="font-display text-sm font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-8 text-center">
            <Link to="/contact">
              <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold shadow-gold hover:scale-105 transition-transform">
                Get Your Free Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
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
                  <p className="text-white/80 text-sm mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding section-soft">
        <div className="container-narrow mx-auto">
          <AnimatedSection className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-wider mb-3">
              ⭐ Client Stories
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Real Results, Real People
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Over 15,000 successful visas — here’s what our clients say about their journey.
            </p>
          </AnimatedSection>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={staggerItem}>
                <div className="bg-card rounded-xl border border-border p-5 h-full flex flex-col shadow-sm">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 italic">&ldquo;{t.text}&rdquo;</p>
                  <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gold/15 flex items-center justify-center font-bold text-gold text-sm flex-shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{t.name}</p>
                      <p className="text-xs text-gold font-medium">{t.country}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding section-light">
        <div className="container-narrow mx-auto">
          <AnimatedSection className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-wider mb-3">
              ❓ Common Questions
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Immigration FAQ 2026
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Answers to the most common questions about Canada PR, Express Entry, and global immigration.
            </p>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto space-y-3">
            {homeFaqs.slice(0, 10).map((faq, i) => (
              <details key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer list-none font-semibold text-foreground text-sm hover:bg-muted/30 transition-colors">
                  <span>{faq.q}</span>
                  <span className="text-gold text-xl flex-shrink-0 select-none">+</span>
                </summary>
                <div className="px-5 pb-4 text-muted-foreground text-sm leading-relaxed border-t border-border pt-3">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/faq">
              <Button variant="outline" size="lg" className="border-2 border-primary/30 text-primary hover:bg-primary/5 font-semibold">
                View All FAQs <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;