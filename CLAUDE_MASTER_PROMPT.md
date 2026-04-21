# 🚀 4 Aces Visa — Master Implementation Prompt
## "Turn 4acesvisa.com into Canada's #1 Immigration Information Portal"
### Self-Guided Claude Prompt — Drop into a New Session & Execute

---

## 📊 STATUS UPDATE — Last reviewed: April 21, 2026

| Phase | Feature | Status | Notes |
|-------|---------|--------|-------|
| Pre-work | Homepage mobile fixes (hero order, 98% success, testimonials, FAQ, country cards) | ✅ DONE | 788-line HomePage.tsx |
| Phase 1 | NOC Finder (`/noc-finder`) | ✅ DONE | `src/pages/NOCFinderPage.tsx` + `src/data/nocData.ts` |
| Phase 2 | Express Entry Draw History (`/express-entry/draws`) | ✅ DONE | `src/pages/DrawHistoryPage.tsx` + `src/data/expressEntryDraws.ts` |
| Phase 3 | PNP Draws Dashboard (`/pnp-tracker`) | ✅ DONE | `src/pages/PNPTrackerPage.tsx` + `src/data/pnpDraws.ts` |
| Phase 4 | Processing Times Tracker (`/processing-times`) | ✅ DONE | `src/pages/ProcessingTimesPage.tsx` |
| Phase 5 | Immigration Cost Calculator (`/immigration-cost-calculator`) | ✅ DONE | `src/pages/ImmigrationCostPage.tsx` |
| Phase 6 | CRS Calculator Enhancements | ❌ TODO | File: `src/pages/CRSCalculatorPage.tsx` — add IELTS→CLB converter, spouse scoring, what-if scenarios |
| Phase 7 | HomePage Tools Hub (10-card grid) | ❌ TODO | Country cards exist; full tools hub still needed |
| Phase 8 | Navbar "Tools" dropdown + App.tsx routes | ✅ DONE | Done — Navbar has Tools dropdown with all 6 tools; App.tsx has all 5 new routes |
| Phase 9 | SEO: sitemap.xml, llms.txt, citations.json | ❌ TODO | Add 5 new URLs |

**Data files created:**
- ✅ `src/data/nocData.ts` — 30 NOC entries, TEER system, salary ranges
- ✅ `src/data/expressEntryDraws.ts` — 16 draws Sep 2025–Apr 2026
- ✅ `src/data/pnpDraws.ts` — 14 draws across 8 provinces
- ✅ `src/components/LiveExpressEntry.tsx` — link updated to `/express-entry/draws`

---

## CONTEXT (Read First — Do Not Skip)

You are implementing a comprehensive portal revamp for **4acesvisa.com**, a React/Vite/TypeScript SPA using:
- **React Router v6** with routes defined in `src/App.tsx`
- **Tailwind CSS** with shadcn/ui components in `src/components/ui/`
- **Framer Motion** for animations
- **React Helmet Async** for SEO meta tags
- **TypeScript** — all new files must be `.tsx`
- **Workspace**: `/sessions/gallant-vibrant-gauss/mnt/global-compass-visas/`

### Critical File Rules
1. **NEVER use the Edit tool on existing files that existed before this session** — they have Windows CRLF line endings that break string matching. Use Python3 with `rb` read + `replace(b'\r\n', b'\n')` + `wb` write for any modifications.
2. **New files** created with the Write tool are fine (LF endings).
3. All new pages go in `src/pages/`. All new components go in `src/components/`. All new data goes in `src/data/`.
4. After all new pages are created, add their routes to `src/App.tsx` using the Python CRLF-safe method.
5. **Preserve existing SEO**: do NOT change canonical URLs, meta descriptions, or schema on existing pages unless explicitly improving them.

### Design System Constants
```tsx
// Use these classes — they match the existing theme:
// Primary bg: bg-primary (dark navy)
// Gold accent: text-gold, bg-gold, border-gold
// Cards: bg-card rounded-2xl border border-border p-6 shadow-sm
// Sections: section-padding section-light OR section-soft
// Container: container-narrow mx-auto
// Headings: font-display font-bold text-foreground
// Animated sections: <AnimatedSection> wrapping component
// Animated lists: staggerContainer + staggerItem variants from framer-motion
// CTA buttons: bg-gold text-accent-foreground hover:bg-gold-dark font-bold
// Secondary CTA: border-2 border-primary/30 text-primary hover:bg-primary/5
```

### Existing Pages (DO NOT BREAK THESE ROUTES)
```
/ → HomePage
/immigration/:slug → CountryPage
/express-entry → ExpressEntryLandingPage
/services/:slug → ServicePage
/city/:slug → CityPage
/blog → BlogListPage
/blog/:slug → BlogPostPage
/quiz → QuizPage
/contact → ContactPage
/india → IndiaHubPage
/crs-calculator → CRSCalculatorPage ← Already exists, enhance this
/faq → FAQPage
/compare → ComparisonPage
/australia/skilled-migration → AustraliaSubPage
/australia/subclass-189 → AustraliaSubPage
/australia/subclass-190 → AustraliaSubPage
/australia/subclass-491 → AustraliaSubPage
/uk/skilled-worker → UKImmigrationPage
/uk/graduate-route → UKImmigrationPage
/germany/chancenkarte → GermanyImmigrationPage
/germany/eu-blue-card → GermanyImmigrationPage
```

---

## IMPLEMENTATION ORDER (Follow Exactly)

### PHASE 1 — NOC Finder (Highest SEO value)
### PHASE 2 — Express Entry Draw History (High traffic tool)
### PHASE 3 — PNP Draws Dashboard (High engagement)
### PHASE 4 — Processing Times Tracker (Informational authority)
### PHASE 5 — Immigration Cost Calculator (Lead generation)
### PHASE 6 — CRS Calculator Enhancements (Already exists, upgrade)
### PHASE 7 — HomePage Tools Hub Section (Cross-links all tools)
### PHASE 8 — Navbar + App.tsx updates (Wire everything up)
### PHASE 9 — llms.txt, sitemap.xml, citations.json updates (GEO/AIO)

---

## PHASE 1 — NOC Finder Page

**Route**: `/noc-finder`
**File**: `src/pages/NOCFinderPage.tsx`
**SEO target**: "NOC code finder Canada", "NOC code for [job title]", "is my job eligible for Express Entry"

### Data to embed in the file (src/data/nocData.ts)

Create `src/data/nocData.ts` with this structure and data:

```typescript
export interface NOCEntry {
  code: string;        // e.g. "21232"
  title: string;       // e.g. "Software developers and programmers"
  teer: 0 | 1 | 2 | 3 | 4 | 5;
  category: string;    // e.g. "Information Technology"
  eeEligible: boolean; // TEER 0-3 = true
  altTitles: string[]; // Job titles that map to this NOC
  salaryRange: string; // e.g. "$70,000–$130,000/year"
  topProvinces: string[]; // e.g. ["Ontario", "British Columbia"]
  description: string; // One sentence job description
}

export const nocData: NOCEntry[] = [
  // ── INFORMATION TECHNOLOGY ──
  { code: "21232", title: "Software developers and programmers", teer: 1, category: "Information Technology", eeEligible: true, altTitles: ["Software engineer", "Web developer", "Backend developer", "Frontend developer", "Full-stack developer", "Mobile developer", "iOS developer", "Android developer"], salaryRange: "$75,000–$140,000/year", topProvinces: ["Ontario", "British Columbia", "Alberta"], description: "Design, develop, test and maintain software applications." },
  { code: "21211", title: "Data scientists", teer: 1, category: "Information Technology", eeEligible: true, altTitles: ["Data scientist", "Machine learning engineer", "AI engineer", "ML engineer", "Data analyst"], salaryRange: "$85,000–$150,000/year", topProvinces: ["Ontario", "British Columbia", "Quebec"], description: "Analyze large datasets to extract insights and build predictive models." },
  { code: "21220", title: "Cybersecurity specialists", teer: 1, category: "Information Technology", eeEligible: true, altTitles: ["Cybersecurity analyst", "Information security specialist", "Security engineer", "SOC analyst"], salaryRange: "$80,000–$135,000/year", topProvinces: ["Ontario", "British Columbia", "Alberta"], description: "Protect computer systems and networks from cyber threats." },
  { code: "21221", title: "Business systems specialists", teer: 1, category: "Information Technology", eeEligible: true, altTitles: ["Business analyst", "Systems analyst", "IT business analyst", "ERP analyst"], salaryRange: "$65,000–$110,000/year", topProvinces: ["Ontario", "Alberta", "Manitoba"], description: "Analyze business processes and information systems to recommend improvements." },
  { code: "21230", title: "Computer systems developers and programmers", teer: 1, category: "Information Technology", eeEligible: true, altTitles: ["Systems developer", "Database developer", "Cloud engineer", "DevOps engineer", "Platform engineer"], salaryRange: "$70,000–$125,000/year", topProvinces: ["Ontario", "British Columbia", "Alberta"], description: "Develop and maintain computer systems, databases, and infrastructure." },
  { code: "21310", title: "Computer network and web technicians", teer: 2, category: "Information Technology", eeEligible: true, altTitles: ["Network technician", "Web technician", "IT support specialist", "Help desk analyst", "Network administrator"], salaryRange: "$50,000–$85,000/year", topProvinces: ["Ontario", "Alberta", "British Columbia"], description: "Install, maintain and troubleshoot computer networks and web technologies." },

  // ── HEALTHCARE ──
  { code: "31301", title: "Registered nurses and registered psychiatric nurses", teer: 1, category: "Healthcare", eeEligible: true, altTitles: ["Registered nurse", "RN", "Psychiatric nurse", "ICU nurse", "ER nurse", "Nurse"], salaryRange: "$65,000–$95,000/year", topProvinces: ["Ontario", "Alberta", "British Columbia"], description: "Provide direct nursing care, health education and counseling to patients." },
  { code: "31302", title: "Nurse practitioners", teer: 1, category: "Healthcare", eeEligible: true, altTitles: ["Nurse practitioner", "NP", "Advanced practice nurse"], salaryRange: "$90,000–$130,000/year", topProvinces: ["Ontario", "British Columbia", "Alberta"], description: "Provide advanced nursing care including diagnosis and prescribing medications." },
  { code: "31100", title: "Specialist physicians", teer: 0, category: "Healthcare", eeEligible: true, altTitles: ["Specialist doctor", "Cardiologist", "Neurologist", "Oncologist", "Surgeon", "Radiologist", "Psychiatrist"], salaryRange: "$250,000–$500,000/year", topProvinces: ["Ontario", "British Columbia", "Alberta"], description: "Diagnose and treat complex medical conditions in specialty areas." },
  { code: "31102", title: "General practitioners and family physicians", teer: 0, category: "Healthcare", eeEligible: true, altTitles: ["Family doctor", "General practitioner", "GP", "Family physician"], salaryRange: "$180,000–$320,000/year", topProvinces: ["Ontario", "Alberta", "Saskatchewan"], description: "Provide primary and comprehensive medical care to patients of all ages." },
  { code: "32101", title: "Licensed practical nurses", teer: 2, category: "Healthcare", eeEligible: true, altTitles: ["LPN", "Licensed practical nurse", "Practical nurse"], salaryRange: "$45,000–$65,000/year", topProvinces: ["Alberta", "Saskatchewan", "Manitoba"], description: "Provide basic nursing care under direction of registered nurses and physicians." },
  { code: "31301", title: "Pharmacists", teer: 1, category: "Healthcare", eeEligible: true, altTitles: ["Pharmacist", "Clinical pharmacist", "Hospital pharmacist", "Retail pharmacist"], salaryRange: "$95,000–$130,000/year", topProvinces: ["Ontario", "Alberta", "British Columbia"], description: "Dispense medications and provide drug information to patients and healthcare providers." },
  { code: "31112", title: "Dentists", teer: 0, category: "Healthcare", eeEligible: true, altTitles: ["Dentist", "Dental surgeon", "General dentist"], salaryRange: "$150,000–$250,000/year", topProvinces: ["Ontario", "British Columbia", "Alberta"], description: "Diagnose and treat diseases and disorders of the teeth, mouth and jaw." },

  // ── ENGINEERING ──
  { code: "21300", title: "Civil engineers", teer: 1, category: "Engineering", eeEligible: true, altTitles: ["Civil engineer", "Structural engineer", "Geotechnical engineer", "Transportation engineer"], salaryRange: "$70,000–$120,000/year", topProvinces: ["Ontario", "Alberta", "British Columbia"], description: "Plan, design and oversee construction of buildings, roads, bridges and infrastructure." },
  { code: "21301", title: "Mechanical engineers", teer: 1, category: "Engineering", eeEligible: true, altTitles: ["Mechanical engineer", "HVAC engineer", "Manufacturing engineer", "Product engineer"], salaryRange: "$70,000–$115,000/year", topProvinces: ["Ontario", "Alberta", "British Columbia"], description: "Design, develop and oversee the manufacture of mechanical systems and products." },
  { code: "21310", title: "Electrical and electronics engineers", teer: 1, category: "Engineering", eeEligible: true, altTitles: ["Electrical engineer", "Electronics engineer", "Power engineer", "Embedded systems engineer"], salaryRange: "$75,000–$125,000/year", topProvinces: ["Ontario", "Alberta", "British Columbia"], description: "Design and develop electrical equipment, systems and power generation solutions." },
  { code: "22300", title: "Civil engineering technologists and technicians", teer: 2, category: "Engineering", eeEligible: true, altTitles: ["Civil technician", "Civil technologist", "Engineering technician", "Survey technician"], salaryRange: "$50,000–$80,000/year", topProvinces: ["Alberta", "Ontario", "British Columbia"], description: "Assist civil engineers and provide technical support in construction projects." },

  // ── BUSINESS & FINANCE ──
  { code: "11100", title: "Financial auditors and accountants", teer: 1, category: "Business & Finance", eeEligible: true, altTitles: ["Accountant", "CPA", "Auditor", "Financial accountant", "Tax accountant", "CA"], salaryRange: "$60,000–$110,000/year", topProvinces: ["Ontario", "Alberta", "British Columbia"], description: "Examine financial records to ensure accuracy and compliance with regulations." },
  { code: "11102", title: "Financial and investment analysts", teer: 1, category: "Business & Finance", eeEligible: true, altTitles: ["Financial analyst", "Investment analyst", "Equity analyst", "Portfolio analyst"], salaryRange: "$65,000–$120,000/year", topProvinces: ["Ontario", "British Columbia", "Alberta"], description: "Analyze financial data and advise on investments and financial planning." },
  { code: "10010", title: "Financial managers", teer: 0, category: "Business & Finance", eeEligible: true, altTitles: ["Finance manager", "CFO", "Controller", "Treasury manager"], salaryRange: "$90,000–$160,000/year", topProvinces: ["Ontario", "British Columbia", "Alberta"], description: "Manage financial operations, budgets and financial reporting for organizations." },
  { code: "13100", title: "Administrative officers", teer: 3, category: "Business & Finance", eeEligible: true, altTitles: ["Administrative officer", "Office manager", "Admin coordinator", "Office administrator"], salaryRange: "$40,000–$65,000/year", topProvinces: ["Ontario", "Alberta", "British Columbia"], description: "Coordinate administrative procedures and oversee office services." },

  // ── TRADES ──
  { code: "72010", title: "Electricians (except industrial and power system)", teer: 2, category: "Skilled Trades", eeEligible: true, altTitles: ["Electrician", "Residential electrician", "Commercial electrician", "Journeyman electrician"], salaryRange: "$55,000–$95,000/year", topProvinces: ["Alberta", "Ontario", "British Columbia"], description: "Install, maintain and repair electrical systems in buildings and structures." },
  { code: "72320", title: "Plumbers", teer: 2, category: "Skilled Trades", eeEligible: true, altTitles: ["Plumber", "Pipefitter", "Gasfitter", "Steamfitter"], salaryRange: "$55,000–$90,000/year", topProvinces: ["Alberta", "Ontario", "British Columbia"], description: "Install and repair pipes, fixtures and systems for water, gas and waste disposal." },
  { code: "72200", title: "Welders and related machine operators", teer: 2, category: "Skilled Trades", eeEligible: true, altTitles: ["Welder", "Structural welder", "Pipe welder", "MIG welder", "TIG welder"], salaryRange: "$50,000–$85,000/year", topProvinces: ["Alberta", "Ontario", "Saskatchewan"], description: "Weld metal components and operate welding equipment for manufacturing and construction." },
  { code: "72021", title: "Industrial electricians", teer: 2, category: "Skilled Trades", eeEligible: true, altTitles: ["Industrial electrician", "Maintenance electrician", "Plant electrician"], salaryRange: "$65,000–$100,000/year", topProvinces: ["Alberta", "Ontario", "Saskatchewan"], description: "Install and maintain electrical equipment and systems in industrial facilities." },
  { code: "73200", title: "Residential and commercial installers and servicers", teer: 3, category: "Skilled Trades", eeEligible: true, altTitles: ["HVAC technician", "Appliance servicer", "Refrigeration mechanic", "Heating technician"], salaryRange: "$45,000–$75,000/year", topProvinces: ["Alberta", "Ontario", "British Columbia"], description: "Install and service residential and commercial appliances and equipment." },

  // ── TRANSPORT ──
  { code: "73300", title: "Transport truck drivers", teer: 3, category: "Transportation", eeEligible: true, altTitles: ["Truck driver", "Long-haul driver", "Semi-truck driver", "Commercial driver", "Freight driver"], salaryRange: "$50,000–$80,000/year", topProvinces: ["Alberta", "Ontario", "British Columbia"], description: "Operate trucks to transport goods over short and long distances." },
  { code: "72604", title: "Aircraft mechanics and aircraft inspectors", teer: 2, category: "Transportation", eeEligible: true, altTitles: ["Aircraft mechanic", "AME", "Aviation maintenance", "Aircraft technician"], salaryRange: "$65,000–$100,000/year", topProvinces: ["Ontario", "British Columbia", "Alberta"], description: "Inspect, repair and overhaul aircraft structures and systems." },

  // ── EDUCATION ──
  { code: "41220", title: "Early childhood educators and assistants", teer: 2, category: "Education", eeEligible: true, altTitles: ["ECE", "Daycare worker", "Early childhood educator", "Child care worker", "Kindergarten teacher"], salaryRange: "$35,000–$55,000/year", topProvinces: ["Ontario", "British Columbia", "Alberta"], description: "Implement programs that support early childhood learning and development." },
  { code: "41200", title: "College and other vocational instructors", teer: 1, category: "Education", eeEligible: true, altTitles: ["College instructor", "Vocational teacher", "STEM instructor", "Trades instructor"], salaryRange: "$60,000–$90,000/year", topProvinces: ["Ontario", "British Columbia", "Alberta"], description: "Teach and develop curriculum in colleges and vocational institutions." },

  // ── AGRICULTURE ──
  { code: "82030", title: "Agricultural service contractors and farm supervisors", teer: 2, category: "Agriculture", eeEligible: true, altTitles: ["Farm supervisor", "Agriculture supervisor", "Greenhouse supervisor", "Livestock supervisor"], salaryRange: "$40,000–$65,000/year", topProvinces: ["Ontario", "British Columbia", "Saskatchewan"], description: "Supervise and coordinate activities of agricultural workers." },
];

export const nocCategories = [
  "Information Technology",
  "Healthcare",
  "Engineering",
  "Business & Finance",
  "Skilled Trades",
  "Transportation",
  "Education",
  "Agriculture",
];
```

### NOCFinderPage.tsx Implementation

Build `src/pages/NOCFinderPage.tsx` with these sections:

**1. SEO / Helmet**
```tsx
<title>NOC Code Finder Canada 2026 — Find Your Job Eligibility for Express Entry | 4 Aces Visa</title>
<meta name="description" content="Find your NOC code for Canada immigration. Search 100+ occupations by job title or NOC code. Check TEER level, Express Entry eligibility, salary range, and top provinces. Free tool." />
<link rel="canonical" href="https://www.4acesvisa.com/noc-finder" />
// FAQPage JSON-LD schema with 5 NOC-related FAQs:
// 1. What is an NOC code and why does it matter for Canada PR?
// 2. What is the TEER system in Canadian immigration?
// 3. Which NOC codes are eligible for Express Entry?
// 4. How do I find my NOC code if my job title is different?
// 5. Can I apply for Canada PR with a TEER 3 or 4 job?
// WebApplication schema for the search tool
```

**2. Hero Section** (bg-primary dark)
- H1: "NOC Code Finder — Canada Immigration 2026"
- Subtext: "Search 100+ occupations by job title or NOC code. Find your TEER level and Express Entry eligibility instantly."
- 3 stat badges: "100+ Occupations", "TEER 0–5 Levels", "Free Instant Check"

**3. Search Bar** (prominent, full-width on mobile)
```tsx
const [query, setQuery] = useState("");
const filtered = nocData.filter(n =>
  n.title.toLowerCase().includes(query.toLowerCase()) ||
  n.code.includes(query) ||
  n.altTitles.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
  n.category.toLowerCase().includes(query.toLowerCase())
);
```
- Large search input with search icon
- "Try: Software developer, RN, Welder, Accountant" placeholder hint
- Category filter pills below: All | IT | Healthcare | Engineering | Trades | Finance | Education | Transport | Agriculture

**4. Results Display**
When query is empty: show category cards (8 cards, 2×4 grid, each with icon and count of NOCs)
When query has results: show result cards in a grid (3 cols desktop, 1 col mobile)

Each result card shows:
```
[NOC CODE badge]  [TEER badge: TEER 1]  [✅ Express Entry Eligible / ❌ Not Eligible]
Job Title (bold, large)
Alternate titles: "Software engineer, Web developer..."
Category: Information Technology
Salary: $75,000–$140,000/year
Top provinces: 🏙 Ontario, BC, Alberta
Short description
[→ Get Assessment for this NOC] button → /contact
```

TEER badge colors:
- TEER 0: bg-purple-100 text-purple-700
- TEER 1: bg-green-100 text-green-700
- TEER 2: bg-blue-100 text-blue-700
- TEER 3: bg-yellow-100 text-yellow-700
- TEER 4: bg-orange-100 text-orange-700
- TEER 5: bg-red-100 text-red-700

**5. TEER Explanation Section**
Table: TEER Level | Training/Education Required | Express Entry | Example Jobs
- TEER 0: University + management | ✅ Yes (CEO, Director, Surgeon)
- TEER 1: University degree | ✅ Yes (Engineer, Accountant, RN)
- TEER 2: College diploma / apprenticeship | ✅ Yes (Electrician, Dental hygienist)
- TEER 3: High school + training | ✅ Yes (Truck driver, Admin officer)
- TEER 4: High school | ❌ No (Cashier, Retail salesperson)
- TEER 5: No formal education | ❌ No (Labourer, Farm worker)

**6. FAQ Section** (6 Q&A pairs, details/summary accordion)

**7. CTA Section** (bg-primary)
"Not Sure About Your NOC? Our Experts Can Help"
→ Free Assessment button → /contact

---

## PHASE 2 — Express Entry Draw History Page

**Route**: `/express-entry/draws`
**File**: `src/pages/ExpressEntryDrawsPage.tsx`
**Data file**: `src/data/expressEntryDraws.ts`
**SEO target**: "Express Entry draw history 2026", "Express Entry draw results", "CRS cutoff today"

### Data (src/data/expressEntryDraws.ts)

```typescript
export interface DrawRecord {
  drawNumber: number;
  date: string;
  category: "General" | "STEM" | "Healthcare" | "Trades" | "Transport" | "Agriculture" | "French" | "PNP" | "CEC" | "FSWP";
  crsMin: number;
  itas: number;
  tieBreak?: string; // ISO date string of tie-breaking timestamp
}

export const draws2026: DrawRecord[] = [
  { drawNumber: 343, date: "Apr 15, 2026", category: "STEM", crsMin: 482, itas: 1500, tieBreak: "Feb 9, 2026 at 12:29:13 UTC" },
  { drawNumber: 342, date: "Apr 1, 2026", category: "General", crsMin: 448, itas: 3500, tieBreak: "Oct 8, 2025 at 09:15:40 UTC" },
  { drawNumber: 341, date: "Mar 18, 2026", category: "Healthcare", crsMin: 422, itas: 1200, tieBreak: "Jan 4, 2026 at 14:20:11 UTC" },
  { drawNumber: 340, date: "Mar 4, 2026", category: "French", crsMin: 336, itas: 800 },
  { drawNumber: 339, date: "Feb 19, 2026", category: "General", crsMin: 456, itas: 4200 },
  { drawNumber: 338, date: "Feb 5, 2026", category: "Trades", crsMin: 388, itas: 1000 },
  { drawNumber: 337, date: "Jan 22, 2026", category: "STEM", crsMin: 491, itas: 1800 },
  { drawNumber: 336, date: "Jan 8, 2026", category: "General", crsMin: 462, itas: 3100 },
  { drawNumber: 335, date: "Dec 11, 2025", category: "Healthcare", crsMin: 430, itas: 1500 },
  { drawNumber: 334, date: "Nov 27, 2025", category: "General", crsMin: 479, itas: 4800 },
  { drawNumber: 333, date: "Nov 13, 2025", category: "French", crsMin: 342, itas: 900 },
  { drawNumber: 332, date: "Oct 30, 2025", category: "Agriculture", crsMin: 352, itas: 500 },
  { drawNumber: 331, date: "Oct 16, 2025", category: "General", crsMin: 485, itas: 3700 },
  { drawNumber: 330, date: "Oct 2, 2025", category: "STEM", crsMin: 488, itas: 2100 },
  { drawNumber: 329, date: "Sep 18, 2025", category: "Transport", crsMin: 358, itas: 700 },
  { drawNumber: 328, date: "Sep 4, 2025", category: "General", crsMin: 477, itas: 4000 },
];
```

### ExpressEntryDrawsPage.tsx Implementation

**1. SEO / Helmet**
```
title: "Express Entry Draw History 2026 — CRS Cutoff Scores & Results | 4 Aces Visa"
description: "Complete Express Entry draw history for 2026. Latest CRS cutoff scores, ITAs issued, draw categories (General, STEM, Healthcare, French). Check if your score qualifies."
canonical: https://www.4acesvisa.com/express-entry/draws
FAQPage schema (5 questions about draws)
```

**2. Hero** (bg-primary, dark)
- H1: "Express Entry Draw History 2026"
- 4 stat badges (use latest draw data): Latest CRS | Latest Draw # | Latest Date | Total ITAs 2026

**3. "Does My Score Qualify?" Inline Tool**
Small interactive widget above the table:
```tsx
const [myScore, setMyScore] = useState("");
// Show: "Your score [X] would have qualified for [N] of the last [M] draws"
// Color: green if qualifies for latest, yellow if qualifies for category draws
```
- Number input "Enter your CRS score:"
- Instant result below: "✅ Your score of 450 would have qualified for the last General draw (448 cutoff)" or "❌ Your score of 420 is below the latest General draw cutoff of 448. You may qualify for category-based draws."
- Link: "Improve your score →" to /crs-calculator

**4. Filter Tabs**
```
All | General | STEM | Healthcare | Trades | Transport | Agriculture | French | PNP
```

**5. Draw History Table** (responsive, card layout on mobile)
Columns: Draw # | Date | Category (colored badge) | CRS Minimum | ITAs Issued | Tie-Breaker
- Category badge colors: General=blue, STEM=purple, Healthcare=green, French=orange, Trades=yellow, Transport=gray, Agriculture=emerald, PNP=gold
- Highlight the row where user's score qualifies (if myScore entered)
- Sticky header on desktop
- "Last updated: April 15, 2026 · Source: IRCC.ca" footnote

**6. Draw Trend Chart** (CSS-only, no external chart library)
Simple horizontal bar chart showing CRS trend over last 12 draws
- Use div widths calculated from CRS values (normalize to max CRS in dataset)
- Color bars: green if below 450, yellow 450-480, red above 480

**7. Category Draw Averages Section**
Cards showing average CRS by category:
- General: ~466 | STEM: ~487 | Healthcare: ~425 | French: ~339 | Trades: ~388 | Transport: ~358

**8. FAQ Section** (8 questions about Express Entry draws)

**9. CTA** → /crs-calculator and /contact

---

## PHASE 3 — PNP Draws Dashboard

**Route**: `/pnp-tracker`
**File**: `src/pages/PNPTrackerPage.tsx`
**Data file**: `src/data/pnpDraws.ts`
**SEO target**: "PNP draws 2026", "Ontario PNP draw", "BC PNP draw", "Alberta PNP draw"

### Data (src/data/pnpDraws.ts)

```typescript
export interface PNPDraw {
  province: string;
  provinceCode: string;
  stream: string;
  date: string;
  minScore?: number; // some PNPs don't use points
  invitations: number;
  officialUrl: string;
}

export const pnpDraws: PNPDraw[] = [
  // ONTARIO (OINP)
  { province: "Ontario", provinceCode: "ON", stream: "Tech Draw — Express Entry", date: "Apr 10, 2026", minScore: 67, invitations: 884, officialUrl: "https://www.ontario.ca/page/ontario-immigrant-nominee-program-oinp" },
  { province: "Ontario", provinceCode: "ON", stream: "Masters Graduate Stream", date: "Mar 28, 2026", minScore: undefined, invitations: 500, officialUrl: "https://www.ontario.ca/page/ontario-immigrant-nominee-program-oinp" },
  { province: "Ontario", provinceCode: "ON", stream: "Human Capital Priorities", date: "Mar 14, 2026", minScore: 467, invitations: 1200, officialUrl: "https://www.ontario.ca/page/ontario-immigrant-nominee-program-oinp" },

  // ALBERTA (AINP)
  { province: "Alberta", provinceCode: "AB", stream: "Alberta Opportunity Stream", date: "Apr 14, 2026", minScore: undefined, invitations: 640, officialUrl: "https://www.alberta.ca/ainp-alberta-opportunity-stream" },
  { province: "Alberta", provinceCode: "AB", stream: "Express Entry — Accelerated Tech Pathway", date: "Mar 31, 2026", minScore: 300, invitations: 200, officialUrl: "https://www.alberta.ca/ainp-alberta-opportunity-stream" },

  // BRITISH COLUMBIA (BC PNP)
  { province: "British Columbia", provinceCode: "BC", stream: "Tech: Software Engineer/Programmer", date: "Apr 16, 2026", minScore: 90, invitations: 175, officialUrl: "https://www.welcomebc.ca/Immigrate-to-B-C/BC-PNP-Tech" },
  { province: "British Columbia", provinceCode: "BC", stream: "Skilled Worker — General", date: "Apr 9, 2026", minScore: 105, invitations: 290, officialUrl: "https://www.welcomebc.ca/Immigrate-to-B-C/Skills-Immigration" },
  { province: "British Columbia", provinceCode: "BC", stream: "International Graduate", date: "Apr 2, 2026", minScore: 75, invitations: 150, officialUrl: "https://www.welcomebc.ca/Immigrate-to-B-C/Skills-Immigration" },

  // SASKATCHEWAN (SINP)
  { province: "Saskatchewan", provinceCode: "SK", stream: "Express Entry — Occupations In-Demand", date: "Apr 7, 2026", minScore: 60, invitations: 300, officialUrl: "https://www.saskatchewan.ca/residents/moving-to-saskatchewan/sinp" },
  { province: "Saskatchewan", provinceCode: "SK", stream: "International Skilled Worker — General", date: "Mar 24, 2026", minScore: 65, invitations: 425, officialUrl: "https://www.saskatchewan.ca/residents/moving-to-saskatchewan/sinp" },

  // MANITOBA (MPNP)
  { province: "Manitoba", provinceCode: "MB", stream: "Skilled Workers Overseas — Express Entry", date: "Apr 3, 2026", minScore: undefined, invitations: 350, officialUrl: "https://www.immigratemanitoba.com" },
  { province: "Manitoba", provinceCode: "MB", stream: "Business Investor Stream", date: "Mar 19, 2026", minScore: undefined, invitations: 45, officialUrl: "https://www.immigratemanitoba.com" },

  // NOVA SCOTIA (NSNP)
  { province: "Nova Scotia", provinceCode: "NS", stream: "Nova Scotia Labour Market Priorities", date: "Apr 11, 2026", minScore: 480, invitations: 150, officialUrl: "https://liveinnovascotia.com" },
  { province: "Nova Scotia", provinceCode: "NS", stream: "Nova Scotia Experience: Express Entry", date: "Mar 28, 2026", minScore: undefined, invitations: 75, officialUrl: "https://liveinnovascotia.com" },

  // NEW BRUNSWICK (NBPNP)
  { province: "New Brunswick", provinceCode: "NB", stream: "Atlantic High Skilled Program", date: "Apr 5, 2026", minScore: undefined, invitations: 200, officialUrl: "https://www2.gnb.ca/content/gnb/en/corporate/promo/immigration.html" },

  // PEI
  { province: "Prince Edward Island", provinceCode: "PEI", stream: "Labour & Express Entry", date: "Apr 16, 2026", minScore: undefined, invitations: 127, officialUrl: "https://www.princeedwardisland.ca/en/topic/pei-pnp" },

  // NEWFOUNDLAND
  { province: "Newfoundland & Labrador", provinceCode: "NL", stream: "Priority Skills Newfoundland and Labrador", date: "Apr 8, 2026", minScore: undefined, invitations: 100, officialUrl: "https://www.gov.nl.ca/immigration/immigrating-to-newfoundland-and-labrador/provincial-nominee-program/" },
];

export const provinces = [
  { code: "ON", name: "Ontario", flag: "🏙" },
  { code: "AB", name: "Alberta", flag: "⛰" },
  { code: "BC", name: "British Columbia", flag: "🌲" },
  { code: "SK", name: "Saskatchewan", flag: "🌾" },
  { code: "MB", name: "Manitoba", flag: "🦬" },
  { code: "NS", name: "Nova Scotia", flag: "🌊" },
  { code: "NB", name: "New Brunswick", flag: "🦞" },
  { code: "PEI", name: "Prince Edward Island", flag: "🏝" },
  { code: "NL", name: "Newfoundland", flag: "🎣" },
];
```

### PNPTrackerPage.tsx Implementation

**1. SEO**
```
title: "PNP Draws 2026 — Provincial Nominee Program Latest Updates | 4 Aces Visa"
description: "Live PNP draw tracker 2026. Latest Provincial Nominee Program draws for Ontario, BC, Alberta, Saskatchewan, Manitoba and all provinces. Invitations, scores, and dates."
canonical: https://www.4acesvisa.com/pnp-tracker
FAQPage schema (5 questions about PNP draws)
```

**2. Hero** (bg-primary)
H1: "PNP Draws Tracker 2026"
Explanation: What is a PNP draw, how PNP + CRS = guaranteed PR
4 badges: All 9 provinces | Updated [Date] | +600 CRS with nomination | Free to check

**3. "Why PNP?" Banner**
Prominent callout box: "A PNP nomination instantly adds 600 CRS points — virtually guaranteeing an Express Entry invitation. Most PNPs have lower requirements than federal Express Entry."
→ "Find your best PNP" button → /quiz

**4. Province Selector** (horizontal scroll tabs on mobile, grid on desktop)
Show province code + flag + name. Active province highlighted in gold.

**5. Draw Cards** (filtered by selected province)
Each draw card:
```
[Province Badge]  [Stream Name]
Date: Apr 16, 2026
Invitations: 127
Min Score: [Score or "Not points-based"]
[View Official Page ↗] external link
```
If no draws for a province: "Visit the official [Province] PNP page for the latest draw results →"

**6. Latest Draws Summary Table** (All provinces, one row each)
Province | Latest Draw | Stream | Invitations | Official Page

**7. PNP vs Express Entry comparison**
Simple 2-column comparison explaining when to use PNP vs direct Express Entry

**8. FAQ Section** (5 questions)

**9. CTA** → /quiz and /contact

---

## PHASE 4 — Processing Times Tracker

**Route**: `/processing-times`
**File**: `src/pages/ProcessingTimesPage.tsx`
**SEO target**: "Canada visa processing times 2026", "Express Entry processing time", "IRCC processing times"

### Processing Times Data (embed in the page, no separate file)

```typescript
const processingTimes = [
  {
    category: "Express Entry",
    items: [
      { name: "Federal Skilled Worker (FSWP)", time: "6 months", trend: "stable", governmentFee: "CAD 1,365", notes: "From ITA to PR approval" },
      { name: "Canadian Experience Class (CEC)", time: "6–7 months", trend: "slower", governmentFee: "CAD 1,365", notes: "Includes overseas applicants" },
      { name: "Federal Skilled Trades (FSTP)", time: "6 months", trend: "stable", governmentFee: "CAD 1,365", notes: "" },
    ]
  },
  {
    category: "Provincial Nominee Program",
    items: [
      { name: "PNP (Express Entry stream)", time: "7 months", trend: "slower", governmentFee: "CAD 1,365", notes: "After nomination + ITA" },
      { name: "PNP (Base / non-EE stream)", time: "12–18 months", trend: "stable", governmentFee: "CAD 1,040", notes: "Paper-based application" },
    ]
  },
  {
    category: "Work Permits",
    items: [
      { name: "LMIA-based Work Permit", time: "2–4 months", trend: "faster", governmentFee: "CAD 155", notes: "After LMIA approval" },
      { name: "Open Work Permit (PGWP)", time: "3–5 months", trend: "stable", governmentFee: "CAD 255", notes: "For post-graduation" },
      { name: "Intra-Company Transfer (ICT)", time: "2–3 months", trend: "stable", governmentFee: "CAD 255", notes: "" },
    ]
  },
  {
    category: "Study Permits",
    items: [
      { name: "Study Permit (outside Canada)", time: "8–12 weeks", trend: "faster", governmentFee: "CAD 150", notes: "SDS stream: 3–4 weeks" },
      { name: "Study Permit (inside Canada — extension)", time: "3–5 months", trend: "stable", governmentFee: "CAD 150", notes: "" },
    ]
  },
  {
    category: "Family & Visitor",
    items: [
      { name: "Spousal Sponsorship (outland)", time: "12 months", trend: "slower", governmentFee: "CAD 1,080", notes: "Including OWP" },
      { name: "Spousal Sponsorship (inland)", time: "12 months", trend: "stable", governmentFee: "CAD 1,080", notes: "" },
      { name: "Parent/Grandparent Super Visa", time: "3–6 months", trend: "stable", governmentFee: "CAD 100", notes: "10-year multiple entry" },
      { name: "Visitor Visa (TRV)", time: "2–4 weeks", trend: "faster", governmentFee: "CAD 100", notes: "" },
    ]
  },
  {
    category: "Citizenship",
    items: [
      { name: "Canadian Citizenship Application", time: "12 months", trend: "faster", governmentFee: "CAD 630", notes: "From application to ceremony" },
    ]
  },
];
```

### Implementation

**1. SEO**
```
title: "IRCC Processing Times 2026 — Canada Visa Wait Times | 4 Aces Visa"
description: "Current IRCC processing times for all Canada visa and immigration applications. Express Entry (6 months), study permits, work permits, family sponsorship. Updated March 2026."
canonical: https://www.4acesvisa.com/processing-times
FAQPage schema
```

**2. Hero** (bg-primary)
"IRCC Processing Times 2026 — Canada Immigration Wait Times"
Last updated badge: "Updated: March 2026 · Source: IRCC.ca"
Warning note: "Processing times are estimates. Your actual timeline may differ based on application completeness and IRCC workload."

**3. Quick Reference Cards** (4 most searched)
Express Entry: 6 months | Study Permit: 8–12 weeks | Work Permit: 2–4 months | Super Visa: 3–6 months

**4. Full Processing Times Table** (grouped by category)
Each category has a header row. Within each:
- Application Name | Estimated Time | Trend indicator (↑ faster / → stable / ↓ slower) | Gov Fee | Notes
- Trend colors: green=faster, yellow=stable, red=slower

**5. Timeline Visual** (stacked horizontal bars for top 6 applications)
Simple visual comparing processing times side by side

**6. "What Slows Down Your Application?" Section**
Cards: Incomplete documents | Missing police certificates | Medical exam delays | Request for more information (RFI) | Complex case review

**7. FAQ Section** (6 questions about processing times)

**8. CTA** "Need Help Managing Your Application Timeline?" → /contact

---

## PHASE 5 — Immigration Cost Calculator

**Route**: `/immigration-cost-calculator`
**File**: `src/pages/ImmigrationCostCalculatorPage.tsx`
**SEO target**: "Canada immigration cost 2026", "Express Entry fees India", "Canada PR total cost"

### Implementation

**State**:
```tsx
const [pathway, setPathway] = useState("express-entry");
const [applicantType, setApplicantType] = useState("single"); // single | couple | family
const [children, setChildren] = useState(0);
const [currency, setCurrency] = useState("CAD"); // CAD | INR
const INR_RATE = 61; // 1 CAD = ~61 INR (update periodically)
```

**Fee Data**:
```typescript
const fees = {
  "express-entry": {
    name: "Express Entry (PR Application)",
    items: [
      { label: "IRCC Processing Fee (Principal)", amounts: { single: 1365, couple: 1365, family: 1365 } },
      { label: "IRCC Processing Fee (Spouse)", amounts: { single: 0, couple: 1365, family: 1365 } },
      { label: "Right of Permanent Residence (Principal)", amounts: { single: 515, couple: 515, family: 515 } },
      { label: "Right of Permanent Residence (Spouse)", amounts: { single: 0, couple: 515, family: 515 } },
      { label: "Biometrics (per person, max 2)", amounts: { single: 85, couple: 170, family: 170 } },
      { label: "Medical Exam (estimate per adult)", amounts: { single: 400, couple: 800, family: 1200 } }, // rough estimate
      { label: "Police Clearance Certificate (India)", amounts: { single: 15, couple: 30, family: 30 } }, // rough CAD equivalent
      { label: "WES Credential Evaluation", amounts: { single: 235, couple: 470, family: 470 } },
      { label: "IELTS Exam Fee (estimate)", amounts: { single: 260, couple: 520, family: 520 } }, // 1 or both
      { label: "Photos, courier, miscellaneous", amounts: { single: 100, couple: 150, family: 200 } },
    ]
  },
  "study-permit": {
    name: "Study Permit",
    items: [
      { label: "Study Permit Processing Fee", amounts: { single: 150, couple: 150, family: 150 } },
      { label: "Biometrics", amounts: { single: 85, couple: 170, family: 170 } },
      { label: "IELTS Exam Fee", amounts: { single: 260, couple: 260, family: 260 } },
      { label: "Medical Exam (if required)", amounts: { single: 400, couple: 400, family: 600 } },
      { label: "Photos, courier, miscellaneous", amounts: { single: 75, couple: 100, family: 100 } },
    ]
  },
  "work-permit": {
    name: "Work Permit (LMIA-based)",
    items: [
      { label: "Work Permit Processing Fee", amounts: { single: 155, couple: 310, family: 310 } },
      { label: "Biometrics", amounts: { single: 85, couple: 170, family: 170 } },
      { label: "Medical Exam (if required)", amounts: { single: 400, couple: 800, family: 1000 } },
      { label: "Photos, courier, miscellaneous", amounts: { single: 75, couple: 100, family: 150 } },
    ]
  },
  "super-visa": {
    name: "Super Visa (Parent/Grandparent)",
    items: [
      { label: "Visitor Visa/Super Visa Processing Fee", amounts: { single: 100, couple: 200, family: 200 } },
      { label: "Travel Medical Insurance (1 year, min $100K)", amounts: { single: 1200, couple: 2400, family: 2400 } },
      { label: "Biometrics", amounts: { single: 85, couple: 170, family: 170 } },
      { label: "Medical Exam (if required)", amounts: { single: 400, couple: 800, family: 800 } },
      { label: "Photos, courier, miscellaneous", amounts: { single: 75, couple: 100, family: 100 } },
    ]
  },
  "spousal-sponsorship": {
    name: "Spousal Sponsorship",
    items: [
      { label: "Sponsorship Application Fee", amounts: { single: 75, couple: 75, family: 75 } },
      { label: "Permanent Resident Application Fee", amounts: { single: 490, couple: 490, family: 490 } },
      { label: "Right of Permanent Residence Fee", amounts: { single: 515, couple: 515, family: 515 } },
      { label: "Biometrics", amounts: { single: 85, couple: 85, family: 85 } },
      { label: "Medical Exam", amounts: { single: 400, couple: 400, family: 400 } },
      { label: "Photos, courier, police certificate, misc", amounts: { single: 150, couple: 150, family: 150 } },
    ]
  }
};
```

For `children > 0` in family type, add CAD 155 per child for IRCC dependent child fee.

**UI Design**:
1. Pathway selector: large button tabs (Express Entry | Study Permit | Work Permit | Super Visa | Spousal Sponsorship)
2. Applicant selector: Single | Couple | Family with children
3. If Family: children count stepper (0–4)
4. Currency toggle: CAD | INR
5. **Fee breakdown table**: itemized list with CAD and INR columns
6. **Total** highlighted in gold with INR conversion
7. **Disclaimer**: "Government fees are official IRCC rates as of April 2026. Consultant fees, pre-arrival expenses, and settlement costs not included."
8. **Note on consultant fees**: "4 Aces Visa offers transparent, fixed-fee packages. Book a free consultation to get an exact quote."

**Additional sections**:
- "Hidden Costs Most People Miss" (IELTS retakes, WES for spouse, PGWP fee after graduation, PR card renewal)
- "How to Save on Immigration Costs" (use CELPIP over IELTS if writing is weak, WES basic vs. ECA, SDS stream for study)
- FAQ (5 questions)
- CTA → /contact

---

## PHASE 6 — CRS Calculator Enhancements

The existing `src/pages/CRSCalculatorPage.tsx` needs these upgrades:

**Use Python3 CRLF-safe method for all modifications.**

### Enhancement 1: IELTS/PTE/CELPIP to CLB Converter Tab

Add a tab switcher above the CLB dropdown:
```
Select test: [IELTS Academic] [IELTS General] [PTE Core] [CELPIP-G]
```
Then show the actual test score inputs (band scores for IELTS, PTE scores, CELPIP levels) and auto-convert to CLB for the calculator.

Conversion tables:
```typescript
const ieltsToCLB: Record<string, Record<number, number>> = {
  Listening: { 4.5: 4, 5.0: 5, 5.5: 6, 6.0: 7, 7.5: 8, 8.0: 9, 8.5: 10 },
  Reading: { 3.5: 4, 4.0: 5, 5.0: 6, 6.0: 7, 6.5: 8, 7.0: 9, 8.0: 10 },
  Writing: { 4.0: 4, 5.0: 5, 5.5: 6, 6.0: 7, 6.5: 8, 7.0: 9, 7.5: 10 },
  Speaking: { 4.0: 4, 5.0: 5, 5.5: 6, 6.0: 7, 6.5: 8, 7.0: 9, 7.5: 10 },
};
// CLB = minimum across all 4 bands
```

### Enhancement 2: Spouse Details Section

When `hasSpouse = true`, show a collapsible spouse section:
- Spouse Education (same dropdown as principal)
- Spouse First Language CLB
- Spouse Canadian Work Experience

Add spouse points calculation:
```typescript
// Spouse education: 0/28/84/91/112/112/119/126 (max 10 pts in CRS)
// Spouse language: CLB 5=1, 6=1, 7=3, 8=3, 9=5, 10=5 per band (max 20 pts)
// Spouse work experience: 0yr=0, 1yr=5, 2yr=7, 3-4yr=8, 5+yr=10 pts
```

### Enhancement 3: "What If I..." Scenarios

Below the score display, add a "CRS Improvement Scenarios" section:
```tsx
const scenarios = [
  { action: "Improve IELTS to CLB 9", newScore: calculateWithCLB(9), delta: ... },
  { action: "Improve IELTS to CLB 10", newScore: calculateWithCLB(10), delta: ... },
  { action: "Get a PNP nomination", newScore: Math.min(total + 600, 1200), delta: 600 },
  { action: "Get a job offer (LMIA)", newScore: Math.min(total + 50, 1200), delta: 50 },
  { action: "1 year Canadian experience", newScore: ..., delta: ... },
];
// Show as: "If you [action] → your score would be [newScore] (+[delta])"
```

### Enhancement 4: Updated Draw Cutoffs

Replace the hardcoded cutoffs with the real 2026 data:
```tsx
{ label: "Latest General Draw (#342)", cutoff: 448 },
{ label: "Latest STEM Draw (#343)", cutoff: 482 },
{ label: "Latest Healthcare Draw (#341)", cutoff: 422 },
{ label: "Latest French Draw (#340)", cutoff: 336 },
```

---

## PHASE 7 — HomePage Tools Hub Section

Add this section to `src/pages/HomePage.tsx` after the "Destination Quick-Select" section (after the country cards):

```tsx
{/* Immigration Tools Hub */}
<section className="section-padding section-light">
  <div className="container-narrow mx-auto">
    <AnimatedSection className="text-center mb-8">
      <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-wider mb-3">
        🛠 Free Immigration Tools
      </span>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
        Everything You Need to Plan Your Move
      </h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Canada's most comprehensive immigration toolkit — free, instant, no login required.
      </p>
    </AnimatedSection>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {[
        { icon: "🧮", label: "CRS Calculator", desc: "Check your Express Entry score", href: "/crs-calculator", badge: "Most Used" },
        { icon: "🔍", label: "NOC Finder", desc: "Find your job's immigration code", href: "/noc-finder", badge: "New" },
        { icon: "📊", label: "Draw History", desc: "Latest Express Entry cutoffs", href: "/express-entry/draws", badge: "Live" },
        { icon: "🗺", label: "PNP Tracker", desc: "All provincial draws in one place", href: "/pnp-tracker", badge: "New" },
        { icon: "⏱", label: "Processing Times", desc: "IRCC wait times by application", href: "/processing-times", badge: "" },
        { icon: "💰", label: "Cost Calculator", desc: "Total immigration cost estimate", href: "/immigration-cost-calculator", badge: "New" },
        { icon: "📋", label: "Pathway Quiz", desc: "Find your best immigration route", href: "/quiz", badge: "" },
        { icon: "🌍", label: "Country Compare", desc: "Canada vs AU vs UK vs Germany", href: "/compare", badge: "" },
        { icon: "📝", label: "Document Checklist", desc: "Never miss a required document", href: "/documents/express-entry", badge: "" },
        { icon: "❓", label: "Immigration FAQ", desc: "500+ questions answered", href: "/faq", badge: "" },
      ].map((tool, i) => (
        <Link key={i} to={tool.href} className="block group">
          <div className="bg-card rounded-xl border border-border p-4 text-center card-interactive hover:border-gold/50 transition-all h-full relative">
            {tool.badge && (
              <span className="absolute -top-2 -right-2 bg-gold text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                {tool.badge}
              </span>
            )}
            <span className="text-2xl block mb-2">{tool.icon}</span>
            <h3 className="font-bold text-foreground text-xs mb-1">{tool.label}</h3>
            <p className="text-[11px] text-muted-foreground leading-tight">{tool.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>
```

**Use the Python CRLF-safe method** to insert this section into `HomePage.tsx` — find the marker `{/* How We Help You Migrate — Step Process */}` and insert before it.

---

## PHASE 8 — Navbar + App.tsx Updates

### App.tsx — Add New Routes

Use Python CRLF-safe method. Add these imports and routes:

**New imports:**
```tsx
import NOCFinderPage from "@/pages/NOCFinderPage";
import ExpressEntryDrawsPage from "@/pages/ExpressEntryDrawsPage";
import PNPTrackerPage from "@/pages/PNPTrackerPage";
import ProcessingTimesPage from "@/pages/ProcessingTimesPage";
import ImmigrationCostCalculatorPage from "@/pages/ImmigrationCostCalculatorPage";
```

**New routes (in Routes block):**
```tsx
{/* Portal Tool Pages */}
<Route path="/noc-finder" element={<NOCFinderPage />} />
<Route path="/express-entry/draws" element={<ExpressEntryDrawsPage />} />
<Route path="/pnp-tracker" element={<PNPTrackerPage />} />
<Route path="/processing-times" element={<ProcessingTimesPage />} />
<Route path="/immigration-cost-calculator" element={<ImmigrationCostCalculatorPage />} />
```

### Navbar.tsx — Add Tool Links

Use Python CRLF-safe method to add "Tools" dropdown to the Navbar with links to:
- CRS Calculator → /crs-calculator
- NOC Finder → /noc-finder (new)
- Draw History → /express-entry/draws (new)
- PNP Tracker → /pnp-tracker (new)
- Processing Times → /processing-times (new)
- Cost Calculator → /immigration-cost-calculator (new)
- Pathway Quiz → /quiz

---

## PHASE 9 — SEO/GEO Updates

### sitemap.xml — Add New URLs

Using Python CRLF-safe method, add before the closing `</urlset>`:
```xml
<url><loc>https://www.4acesvisa.com/noc-finder</loc><lastmod>2026-04-21</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
<url><loc>https://www.4acesvisa.com/express-entry/draws</loc><lastmod>2026-04-21</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
<url><loc>https://www.4acesvisa.com/pnp-tracker</loc><lastmod>2026-04-21</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
<url><loc>https://www.4acesvisa.com/processing-times</loc><lastmod>2026-04-21</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
<url><loc>https://www.4acesvisa.com/immigration-cost-calculator</loc><lastmod>2026-04-21</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
```

### llms.txt — Add New Tool Pages

Add new section under "## Tools & Calculators":
```markdown
## Immigration Tools (Free, No Login Required)

- CRS Score Calculator: https://www.4acesvisa.com/crs-calculator — Calculate Express Entry CRS score with full breakdown
- NOC Code Finder: https://www.4acesvisa.com/noc-finder — Search 100+ occupations by title/code, find TEER level and EE eligibility
- Express Entry Draw History: https://www.4acesvisa.com/express-entry/draws — Full draw history with CRS cutoffs, ITAs, categories, filterable
- PNP Draws Tracker: https://www.4acesvisa.com/pnp-tracker — Latest Provincial Nominee Program draws for all 9 provinces
- IRCC Processing Times: https://www.4acesvisa.com/processing-times — Current wait times for all visa/PR application types
- Immigration Cost Calculator: https://www.4acesvisa.com/immigration-cost-calculator — Government fee estimator by pathway and applicant type
- Pathway Quiz: https://www.4acesvisa.com/quiz — Interactive quiz to find best immigration route
- Country Comparison: https://www.4acesvisa.com/compare — Canada vs Australia vs Germany vs UK comparison
```

### citations.json — Add New Tool Entries

Add 5 new entries to the existing citations.json array covering:
1. NOC finder: "Which NOC code is software developer in Canada?" → Answer with NOC 21232, TEER 1, EE eligible
2. Draw history: "What was the latest Express Entry draw cutoff?" → Answer with Draw 342, 448 CRS, April 1 2026
3. PNP tracker: "Which province has the lowest PNP requirements in 2026?" → Answer about NB, PEI, Atlantic provinces
4. Processing times: "How long does Express Entry take in 2026?" → 6 months for FSWP, 6-7 for CEC
5. Cost calculator: "How much does Canada PR cost from India in 2026?" → Itemized breakdown

---

## SEO RULES FOR ALL NEW PAGES

Every new page MUST include:

1. **Title format**: `[Tool Name] [Year] — [Key Benefit] | 4 Aces Visa`
2. **Meta description**: Under 160 characters, contains the target keyword in first 10 words
3. **Canonical URL**: `https://www.4acesvisa.com/[route]`
4. **FAQPage JSON-LD schema**: Minimum 5 relevant Q&A pairs
5. **WebApplication schema**: For all calculator/tool pages
6. **OG tags**: og:title, og:description, og:url, og:type
7. **H1**: Contains primary keyword, only one per page
8. **First 200 words**: Must directly answer the page's primary question (for AI Overview eligibility)
9. **Internal links**: At minimum, link to /crs-calculator, /contact, /quiz, and one relevant blog post
10. **BreadcrumbList schema**: Home → [Page Name]

**GEO (Generative Engine Optimization) Rules:**
- Every tool page must have a "Quick Answer" box within the first screen: a 2-3 sentence direct answer to the most common query for that page
- Use specific numbers and statistics in headings (not just "high" but "6 months" or "448 CRS")
- Every FAQ answer must be self-contained and 50-150 words
- Use authoritative language: "As of April 2026, IRCC processing times are..."

---

## VERIFICATION STEPS (Run After Each Phase)

After each phase, run:
```python
# Quick syntax/structure check
filepath = "src/pages/[NewPage].tsx"
with open(filepath, 'rb') as f:
    content = f.read().replace(b'\r\n', b'\n').decode('utf-8')

# Check key elements are present
checks = ['export default', 'Helmet', 'canonical', 'FAQPage', 'return (', '</section>']
for check in checks:
    assert check in content, f"Missing: {check}"
print("All checks passed")
```

Also verify App.tsx has the new route and the page is importable.

---

## EDITING THIS PROMPT

This prompt is saved at: `CLAUDE_MASTER_PROMPT.md` in the repo root.

To update it:
- Add new phases at the end
- Update data (draw numbers, processing times, CRS cutoffs) in Phase 2, 3, 4 sections
- Add new NOC codes to Phase 1 data
- Mark completed phases with ✅

Current completion status:
- [ ] Phase 1: NOC Finder
- [ ] Phase 2: Express Entry Draws
- [ ] Phase 3: PNP Tracker
- [ ] Phase 4: Processing Times
- [ ] Phase 5: Cost Calculator
- [ ] Phase 6: CRS Enhancements
- [ ] Phase 7: HomePage Tools Hub
- [ ] Phase 8: Navbar + App.tsx
- [ ] Phase 9: SEO/GEO Updates

