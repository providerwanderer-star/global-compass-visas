import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HelpCircle, ArrowRight, Search } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";

const faqCategories = [
  {
    id: "pathways",
    title: "Immigration Pathways",
    icon: "🛤️",
    faqs: [
      { q: "How can I apply for Canada PR from India in 2026?", a: "Three main pathways: Express Entry (Federal Skilled Worker, Canadian Experience Class, or Federal Skilled Trades), Provincial Nominee Programs (PNP), or LMIA-based work permits leading to PR. Express Entry is the fastest at 6-8 months. Start by getting your IELTS score, WES credential assessment, and creating an Express Entry profile on IRCC." },
      { q: "What is the difference between Express Entry and PNP?", a: "Express Entry is the federal system that ranks all candidates by CRS score and issues ITAs. PNP (Provincial Nominee Program) allows individual provinces like Ontario (OINP), BC, Alberta, and Saskatchewan to nominate candidates based on local labor market needs. A PNP nomination adds 600 CRS points to your Express Entry profile, guaranteeing a PR invitation." },
      { q: "Can I get Canada PR without a job offer?", a: "Yes, the Federal Skilled Worker Program (FSWP) under Express Entry does not require a job offer. You qualify based on CRS score alone. However, a valid LMIA job offer adds 50-200 CRS points and significantly improves your chances of receiving an ITA." },
      { q: "What are the top 5 immigration pathways to Canada in 2026?", a: "1) Express Entry FSWP — fastest PR for skilled workers with CLB 7+ and 67+ FSW points. 2) Provincial Nominee Program (PNP) — +600 CRS points, ideal for moderate CRS profiles. 3) LMIA Work Permit → PR — employer-sponsored route adding 50-200 CRS points. 4) Study Permit → PGWP → CEC — best for young applicants wanting Canadian education. 5) Atlantic Immigration Program (AIP) — employer-driven, lower requirements, fast processing for Atlantic provinces." },
      { q: "What is the Atlantic Immigration Program (AIP)?", a: "The AIP is a permanent employer-driven pathway for skilled workers and international graduates to settle in New Brunswick, Nova Scotia, PEI, or Newfoundland. It requires a job offer from a designated Atlantic employer, minimum CLB 4 (NOC TEER 0/1/2/3) or CLB 5 (TEER 4), and no points system — making it accessible for candidates with lower CRS scores." },
      { q: "Which country is the easiest to immigrate to in 2026?", a: "Canada offers the fastest PR through Express Entry (6 months). Germany's Chancenkarte (Opportunity Card) visa is easiest to obtain initially with just 6 points. Australia rewards high-skilled professionals with points-based PR. The UK is efficient if you have a job offer. Your best option depends on your age, education, language skills, and work experience." },
    ],
  },
  {
    id: "crs-ielts",
    title: "CRS Score & IELTS",
    icon: "📊",
    faqs: [
      { q: "What is the minimum CRS score for Canada PR in 2026?", a: "Recent Express Entry general draws have had CRS cutoffs between 430-490. Category-based draws for healthcare, STEM, trades, transport, agriculture, and French speakers may have lower cutoffs (typically 380-440). A PNP nomination adds 600 CRS points, virtually guaranteeing an invitation." },
      { q: "How can I increase my CRS score fast in 2026?", a: "Top strategies ranked by impact: 1) Improve IELTS to CLB 9+ (adds up to 124 points). 2) Get a PNP nomination (+600 points — game changer). 3) Obtain an LMIA job offer (+50-200 points). 4) Learn French and take TEF/TCF (+25-50 points). 5) Complete a Canadian credential (WES or Canadian degree). 6) Get spouse's IELTS and credentials assessed. 7) Gain additional work experience in a NOC TEER 0/1 occupation." },
      { q: "What IELTS score do I need for Canada PR?", a: "Minimum CLB 7 for Federal Skilled Worker Program: IELTS L6.0, R6.0, W6.0, S6.0. For maximum CRS points, aim for CLB 10: L8.5, R8.0, W7.5, S7.5. Each band increase from CLB 7 to CLB 9 can add 40-80 CRS points. Canadian Experience Class requires minimum CLB 7 (NOC TEER 0/1) or CLB 5 (NOC TEER 2/3)." },
      { q: "Do I need IELTS for immigration?", a: "For Canada, IELTS or equivalent (CELPIP, PTE Core) is mandatory for Express Entry. Australia requires English for skilled migration (IELTS, PTE, or TOEFL). Germany may accept alternatives like TestDaF or Goethe-Institut certificates. UK requires B1 English for Skilled Worker visa." },
      { q: "What is the CRS score breakdown?", a: "CRS awards points for: Age (max 110), Education (max 150), Language (max 160 for first official, 30 for second), Canadian work experience (max 80), Spouse factors (max 40), Skill transferability (max 100), and Additional points (PNP +600, LMIA +50-200, Canadian education +15-30, French +25-50). Maximum possible: 1,200 with companion, 600 without." },
    ],
  },
  {
    id: "costs-timelines",
    title: "Costs & Timelines",
    icon: "💰",
    faqs: [
      { q: "How much does Canada PR cost from India in 2026?", a: "Total costs include IRCC processing fees (~CAD 1,365), IELTS exam (~₹16,000), WES credential evaluation (~₹15,000), biometrics (CAD 85), police clearances (~₹500-2,000), and medical exam (~₹5,000-8,000). Grand total is typically ₹3-5 lakhs (CAD 2,500-5,000) excluding consultant fees. 4 Aces Visa offers transparent pricing with no hidden charges." },
      { q: "How long does Canada PR take from India?", a: "Express Entry: 6-8 months from ITA to PR approval. PNP-based: 12-18 months total. Study permit to PR pathway: 3-5 years (2-year program + 3-year PGWP + CEC application). LMIA work permit to PR: 8-14 months. Total timeline from start to PR landing is typically 8-18 months for direct pathways." },
      { q: "How much does immigration consulting cost?", a: "4 Aces Visa offers a free initial eligibility assessment. Consulting packages vary by complexity, destination country, and pathway chosen. We provide transparent pricing with no hidden fees — you'll know the exact cost upfront before committing. Book a free assessment to get a personalized quote." },
      { q: "What are the costs for Australian PR from India?", a: "Australian PR costs include skills assessment (AUD 500-1,500 depending on authority), IELTS/PTE (₹15,000-20,000), visa application fee (AUD 4,115 for Subclass 189/190), health examination (₹5,000-8,000), police clearance (₹500-2,000), and biometrics. Total: approximately AUD 5,000-7,000 (₹2.5-4 lakhs) excluding consultant fees." },
    ],
  },
  {
    id: "study",
    title: "Study Visas & Courses",
    icon: "🎓",
    faqs: [
      { q: "What are the best courses in Canada for PR in 2026?", a: "Top PR-friendly programs include: Computer Science & IT (NOC 21232-21234), Nursing & Healthcare (NOC 31301-31302), Business Analytics & Supply Chain Management, Early Childhood Education (high PNP demand), Electrical & Mechanical Engineering Technology, Cybersecurity & Cloud Computing, and Hospitality Management. Choose 2-year diplomas at DLIs for a 3-year PGWP, maximizing your PR pathway." },
      { q: "Which colleges in Canada are best for PR pathway?", a: "Top DLIs for PR pathway include Conestoga College (Ontario), Seneca Polytechnic (Toronto), Douglas College (BC), BCIT (Vancouver), Humber College (Toronto), Fanshawe College (London ON), Saskatchewan Polytechnic, and NAIT (Alberta). Look for programs aligned with NOC TEER 0/1/2/3 occupations and provinces with active PNP draws." },
      { q: "How does the study-to-PR pathway work in Canada?", a: "1) Get admission to a Designated Learning Institution (DLI). 2) Apply for a study permit with proof of funds (CAD 20,635+/year + tuition). 3) Complete your program (2-year recommended for 3-year PGWP). 4) Obtain Post-Graduation Work Permit (PGWP). 5) Gain 1+ year of Canadian work experience in NOC TEER 0/1/2/3. 6) Apply through Canadian Experience Class (CEC) in Express Entry. This pathway takes 3-5 years total but provides Canadian education and experience advantages." },
      { q: "Can my spouse work while I study in Canada?", a: "Yes, spouses of study permit holders at eligible DLIs can apply for a Spousal Open Work Permit (SOWP). This allows your spouse to work full-time for any employer in Canada. The SOWP is valid for the same duration as your study permit. This provides additional income and Canadian work experience that can help with future PR applications." },
    ],
  },
  {
    id: "govt-programs",
    title: "Government Programs & Assistance",
    icon: "🏛️",
    faqs: [
      { q: "What government settlement programs are available for new immigrants to Canada?", a: "Canada offers extensive free settlement services: IRCC-funded Settlement Programs (language classes, job help, mentoring), the Canadian Immigrant Integration Program (CIIP) for pre-arrival orientation, the Foreign Credential Recognition Program (FCRP) for credential assessment, Provincial Settlement Services (ISANS, OCASI), and the Resettlement Assistance Program. New immigrants also access free healthcare (after waiting period), public education for children, and Canada Child Benefit (CCB)." },
      { q: "What financial assistance is available for immigrants in Canada?", a: "New immigrants can access: Canada Child Benefit (CCB) up to $7,437/child/year, GST/HST Credit (~$500/year), Provincial benefits (Ontario Trillium Benefit, BC Climate Action Tax Credit), Settlement funding for language training (LINC/CLIC — free), Federal Skilled Worker loans for credential recognition, and Start-up Visa Program for immigrant entrepreneurs. PR holders also qualify for EI, CPP, and OAS after meeting residency requirements." },
      { q: "What is the Start-up Visa Program?", a: "Canada's Start-up Visa Program is for immigrant entrepreneurs with an innovative business idea. Requirements: letter of support from a designated organization (venture capital fund, angel investor group, or business incubator), CLB 5 in English or French, and sufficient settlement funds. It grants PR directly — no need for Express Entry or PNP. Ideal for business owners from India looking to establish a company in Canada." },
      { q: "What free language training is available for immigrants?", a: "Canada offers free Language Instruction for Newcomers to Canada (LINC) for English and Cours de langue pour les immigrants au Canada (CLIC) for French. Available to PR holders and protected persons. Programs range from beginner to advanced, include childcare, and are offered at community centers, colleges, and online. Some provinces offer additional language programs beyond federal LINC." },
    ],
  },
  {
    id: "countries",
    title: "Australia, Germany & UK",
    icon: "🌍",
    faqs: [
      { q: "How many points do I need for Australian PR in 2026?", a: "Minimum 65 points required, but competitive scores are 80-90+ for most occupations. Points: Age 25-32 (30 pts), Bachelor's degree (15 pts), 5+ years experience (10 pts), IELTS 8+ Superior (20 pts), Australian study (5 pts), regional nomination (15 pts). Subclass 189 (independent) is most competitive; Subclass 190 (state-nominated) adds 5 points; Subclass 491 (regional) adds 15 points." },
      { q: "What is Germany's Chancenkarte (Opportunity Card) visa 2026?", a: "The Chancenkarte replaced the old Job Seeker Visa in June 2024. It's a points-based system requiring 6+ points from: Recognized degree (1-3 pts), language skills (1-3 pts), work experience (1-3 pts), age under 35 (2 pts), and German connection (1 pt). Valid for 1 year to search for employment. You can work part-time (20 hrs/week) while searching — a major improvement over the old visa." },
      { q: "How can I get a UK Skilled Worker Visa in 2026?", a: "You need: a job offer from an UKVI-licensed sponsor, minimum salary of £26,200 or the going rate for your occupation (whichever is higher), English at B1 level (IELTS 4.0+), and 70 points on the PBS. Points: Job offer from approved sponsor (20), job at appropriate skill level (20), English language (10), salary threshold (20). After 5 years, apply for Indefinite Leave to Remain (ILR)." },
      { q: "Which is better — Canada or Australia for immigration?", a: "Canada: faster processing (6 months vs 12-18), more pathways, lower English requirement (CLB 7 vs IELTS 7+), PNP adds 600 guaranteed points. Australia: higher average salaries, better climate, strong regional programs, points-based with no lottery. Both offer excellent healthcare, education, and quality of life. Best choice depends on your occupation, age, language scores, and lifestyle preferences." },
    ],
  },
  {
    id: "family",
    title: "Family & Sponsorship",
    icon: "👨‍👩‍👧‍👦",
    faqs: [
      { q: "Can I bring my family to Canada with my PR?", a: "Yes. Your spouse/common-law partner and dependent children (under 22, unmarried) are included in your PR application. Your spouse gets an open work permit. After becoming a PR, you can sponsor parents and grandparents through the PGP program or invite them on a Super Visa (10-year multiple entry, 5-year stays per visit)." },
      { q: "What is the Super Visa for parents in 2026?", a: "The Super Visa is a 10-year multiple-entry visa allowing parents and grandparents of Canadian citizens or PRs to stay up to 5 years per visit. Requirements: inviter must meet minimum income (LICO+30%), private medical insurance of minimum $100,000 coverage from a Canadian insurer. Processing takes 3-6 months." },
      { q: "How does spousal sponsorship work in Canada?", a: "Canadian citizens and PRs can sponsor their spouse, common-law partner, or conjugal partner. Processing takes 12-15 months. The sponsored spouse receives PR status and an open work permit while the application is processed. You need to prove a genuine relationship through photos, communication records, joint finances, and cohabitation evidence." },
      { q: "Can I sponsor my parents for Canadian PR?", a: "Yes, through the Parents and Grandparents Program (PGP). It opens annually with limited spots (typically 10,000-15,000 invitations). You must meet the Minimum Necessary Income (MNI) for 3 consecutive years. Processing takes 20-24 months. Alternative: Super Visa allows parents to visit for up to 5 years at a time without PR." },
    ],
  },
  {
    id: "consultant",
    title: "Choosing a Consultant",
    icon: "✅",
    faqs: [
      { q: "How do I choose the best immigration consultant?", a: "Look for: proven track record with verifiable success rates, transparent pricing with no hidden fees, personal immigration experience (consultants who've been through the process themselves), knowledge of multiple pathways, and free initial assessments. Red flags: guaranteeing visa approval (no one can), cash-only payments, high-pressure sales tactics, and inability to explain the process clearly. 4 Aces Visa consultants are immigrants themselves with a 98% success rate." },
      { q: "Does 4 Aces Visa guarantee visa approval?", a: "No ethical consultancy can guarantee visa approval — anyone who does is a red flag. However, our 98% success rate across 15,000+ applications reflects deep expertise in preparing strong, compliant applications. We identify weaknesses in your profile early and address them before submission, maximizing your chances." },
      { q: "What does 'By immigrants, for immigrants' mean?", a: "Our consultants have personally gone through immigration to Canada, Australia, Germany, and the UK. We understand the stress, uncertainty, and life-changing decisions because we've lived through every step — from IELTS prep to landing day. This firsthand experience means we don't just process paperwork; we provide empathetic, practical guidance based on real lived experience." },
      { q: "What regions does 4 Aces Visa serve?", a: "We serve clients across India (Punjab, Gujarat, Haryana, Rajasthan — including Ludhiana, Amritsar, Jalandhar, Chandigarh, Ahmedabad, Surat, Gurugram, Jaipur) and Canada (Ontario and British Columbia — including Toronto, Brampton, Mississauga, Vancouver, Surrey). We offer both in-person and virtual consultations for clients worldwide." },
    ],
  },
  {
    id: "policy-2026",
    title: "2026 Policy Updates",
    icon: "📰",
    faqs: [
      { q: "What are the major Canada immigration changes in 2026?", a: "Key 2026 changes: Express Entry category-based draws expanded to cover more STEM, healthcare, and trades occupations. PNP allocations increased across provinces. Study permit financial requirements updated to CAD 20,635/year. PGWP eligibility tightened — only programs aligned with labor market needs qualify. Spousal open work permits limited to spouses of master's/doctoral students. LMIA processing targets reduced to 30 business days." },
      { q: "Has Express Entry CRS cutoff changed in 2026?", a: "Yes. General draw CRS cutoffs range between 430-490 in 2026. Category-based draws (healthcare, STEM, trades, French speakers) have lower cutoffs of 380-440. IRCC conducts draws biweekly, sometimes weekly. The trend shows slightly lower cutoffs due to increased draw frequency and PNP allocations." },
      { q: "Is PGWP still available for international students in 2026?", a: "Yes, but with restrictions. PGWP eligibility now requires programs to be aligned with labor market needs. Language benchmarks added: CLB 7 for university graduates, CLB 5 for college graduates. Not all programs qualify — verify PGWP eligibility before enrollment. Two-year programs still offer 3-year PGWPs." },
      { q: "What is Canada's immigration target for 2026?", a: "Canada's Immigration Levels Plan targets approximately 395,000 new permanent residents in 2026, reduced from previous years' higher targets. This includes approximately 110,000 through Express Entry, 120,000 through PNP, 80,000 through family sponsorship, and 85,000 through other categories including refugees and humanitarian." },
      { q: "Are LMIA rules changing in 2026?", a: "Yes. LMIA processing now targets 30 business days. Global Talent Stream maintains 2-week processing. Low-wage LMIA applications face increased scrutiny with stricter employer compliance requirements. Employers must demonstrate genuine recruitment efforts for Canadian workers before LMIA approval." },
    ],
  },
  {
    id: "tech-ai",
    title: "Tech & AI Immigration",
    icon: "💻",
    faqs: [
      { q: "How can AI and tech professionals immigrate to Canada in 2026?", a: "Three main pathways: 1) Express Entry STEM category draws with CRS cutoffs of 400-440. 2) Global Talent Stream providing work permits in 2 weeks for specialized tech roles. 3) BC Tech Pilot and Ontario Tech Draws through PNP. Key NOC codes: 21231 (Software Engineers), 21211 (Data Scientists), 21222 (Cybersecurity Analysts), 21232 (Software Developers)." },
      { q: "What is the Global Talent Stream for tech workers?", a: "The Global Talent Stream (GTS) is a fast-track work permit program processing in just 2 weeks. Category A is for unique talent referred by designated partners. Category B is for employers hiring occupations on the Global Talent Occupations List (including software engineers, data scientists, AI specialists). Employers must create a Labour Market Benefits Plan committing to job creation and skills training." },
      { q: "Which Canadian cities are best for tech jobs?", a: "Top tech hubs: Toronto (Vector Institute, 400+ tech companies), Vancouver (growing AI corridor, gaming industry), Montreal (Mila AI Institute, strong French-English tech scene), Ottawa (government tech, Shopify HQ), Waterloo (Waterloo Region tech triangle, BlackBerry, Google). Toronto and Vancouver offer highest salaries; Montreal and Ottawa have lower cost of living." },
      { q: "What salary can tech workers expect in Canada?", a: "Average salaries: AI/ML Engineer CAD 120,000-180,000, Software Engineer CAD 90,000-140,000, Data Scientist CAD 95,000-150,000, Cybersecurity Analyst CAD 85,000-130,000, Cloud Architect CAD 110,000-170,000, DevOps Engineer CAD 95,000-145,000. Tech salaries in Toronto and Vancouver are highest but also have higher cost of living." },
    ],
  },
  {
    id: "documents",
    title: "Documents & Checklists",
    icon: "📄",
    faqs: [
      { q: "What documents do I need for Canada Express Entry?", a: "Essential documents: valid passport, IELTS/CELPIP results (within 2 years), WES credential assessment, reference letters from employers (must include job title, duties, hours, salary), police clearance certificates from every country lived in 6+ months, medical exam results from panel physician, proof of funds (bank statements), digital photos meeting IRCC specifications, and birth certificates." },
      { q: "How do I get my education credentials assessed for Canada?", a: "Use a designated organization: WES (World Education Services) is most common. Process: 1) Create WES account and select 'ECA for IRCC'. 2) Request official transcripts sent directly from your university to WES. 3) Submit academic documents. 4) WES evaluates and issues ECA report. Timeline: 6-8 weeks. Cost: CAD 300. Valid for 5 years." },
      { q: "What are the proof of funds requirements for Canada PR?", a: "You must show settlement funds (unless you have a valid job offer or are CEC applicant): 1 person = CAD 14,690, 2 people = CAD 18,288, 3 people = CAD 22,483, 4 people = CAD 27,297. Show funds through bank statements, fixed deposits, or investment statements. Funds must be available and transferable — not borrowed or pledged." },
      { q: "How do I write an employer reference letter for Express Entry?", a: "The reference letter must be on company letterhead and include: your full name, company name and address, your job title, dates of employment (start and end), number of hours per week, annual salary or hourly wage, main duties and responsibilities (match NOC description), and supervisor's name, title, and signature. Each position requires a separate letter." },
      { q: "What medical tests are required for Canada immigration?", a: "IRCC medical exam includes: general physical examination, blood tests (HIV, syphilis, hepatitis), urine test, chest X-ray (for ages 11+), and vision test. Must be done by an IRCC-designated panel physician. Results are sent directly to IRCC. Valid for 12 months. Cost: approximately ₹5,000-8,000 in India." },
    ],
  },
];

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState("pathways");
  const [searchQuery, setSearchQuery] = useState("");

  const allFaqs = faqCategories.flatMap((cat) =>
    cat.faqs.map((faq) => ({ ...faq, category: cat.title, categoryId: cat.id }))
  );

  const filteredFaqs = searchQuery.trim()
    ? allFaqs.filter(
        (faq) =>
          faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  const activeCat = faqCategories.find((c) => c.id === activeCategory);

  const schemaFaqs = allFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  }));

  return (
    <>
      <Helmet>
        <title>Immigration FAQ 2026 — Canada PR, Study Visa, IELTS, CRS | 4 Aces Visa</title>
        <meta name="description" content="Expert answers to 35+ immigration questions: Canada PR pathways, CRS score, IELTS requirements, best courses for PR, government settlement programs, Australia & Germany immigration, costs and timelines." />
        <link rel="canonical" href="https://www.4acesvisa.com/faq" />
        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: schemaFaqs,
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.4acesvisa.com" },
                { "@type": "ListItem", position: 2, name: "FAQ", item: "https://www.4acesvisa.com/faq" },
              ],
            },
          ])}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-14 md:py-20">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <HelpCircle className="h-4 w-4" />
              35+ Expert Answers
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Immigration FAQ — 2026
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Expert answers to the most-asked immigration questions about Canada PR, study visas, work permits, IELTS, CRS scores, and more.
            </p>
          </AnimatedSection>

          {/* Search */}
          <AnimatedSection delay={0.15}>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search questions… e.g. 'CRS score', 'best courses', 'Super Visa'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold shadow-lg"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-secondary border-b border-border">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">FAQ</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="section-padding">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          {searchQuery.trim() ? (
            /* Search Results */
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-xl font-bold text-foreground mb-6">
                {filteredFaqs!.length} result{filteredFaqs!.length !== 1 ? "s" : ""} for "{searchQuery}"
              </h2>
              {filteredFaqs!.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No questions matched your search.</p>
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFaqs!.map((faq, i) => (
                    <motion.details
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="bg-card rounded-xl border border-border group card-interactive"
                    >
                      <summary className="flex items-center justify-between p-6 cursor-pointer font-display font-semibold text-foreground text-sm md:text-base">
                        <span className="pr-4">{faq.q}</span>
                        <span className="text-gold ml-4 text-xl shrink-0 group-open:rotate-45 transition-transform duration-300">+</span>
                      </summary>
                      <div className="px-6 pb-6">
                        <span className="inline-block text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full mb-2">{faq.category}</span>
                        <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.details>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Category View */
            <div className="grid lg:grid-cols-[280px_1fr] gap-8">
              {/* Sidebar */}
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <h2 className="font-display text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Categories</h2>
                <nav className="space-y-1">
                  {faqCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                        activeCategory === cat.id
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.title}</span>
                      <span className="ml-auto text-xs opacity-60">{cat.faqs.length}</span>
                    </button>
                  ))}
                </nav>
              </aside>

              {/* FAQ list */}
              <div className="max-w-3xl">
                <AnimatedSection>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {activeCat?.icon} {activeCat?.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">{activeCat?.faqs.length} questions in this category</p>
                </AnimatedSection>
                <div className="space-y-4">
                  {activeCat?.faqs.map((faq, i) => (
                    <motion.details
                      key={faq.q}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-card rounded-xl border border-border group card-interactive"
                    >
                      <summary className="flex items-center justify-between p-6 cursor-pointer font-display font-semibold text-foreground text-sm md:text-base">
                        <span className="pr-4">{faq.q}</span>
                        <span className="text-gold ml-4 text-xl shrink-0 group-open:rotate-45 transition-transform duration-300">+</span>
                      </summary>
                      <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.details>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-primary to-primary/90 text-center">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Still Have Questions?
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
              Get personalized answers from our immigration experts. Book a free eligibility assessment today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact">
                <Button className="bg-gold text-accent-foreground hover:bg-gold-dark font-semibold shadow-gold text-base px-8 py-3">
                  Free Assessment <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/quiz">
                <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-white/10 text-base px-8 py-3">
                  Take Pathway Quiz
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default FAQPage;
