# FINAL Lovable Prompt — 4 Aces Visa (Phase 2: AI-Search Scale)

> Copy everything below the line into Lovable. Feed it ONE TASK AT A TIME — paste the GLOBAL GUARDRAILS first, wait for acknowledgment, then send Task 1, wait for completion + diff review, then Task 2, etc. Do NOT paste all 14 tasks at once.

---

## GLOBAL GUARDRAILS — READ FIRST AND OBEY ON EVERY TASK

You are working on the existing production React + Vite + TypeScript site **4 Aces Visa / Global Compass Visas** at `https://www.4acesvisa.com`. The site is already live, ranking, and converting weekly inquiries from AI search engines. Your job is to ADD new pages, components, data, and schema — NOT to rebuild or refactor what works.

**ABSOLUTE RULES (apply to every task below):**

1. **DO NOT delete, rename, or refactor any existing file unless I explicitly say so in the task.** Preserve every file in `src/pages/`, `src/components/`, `src/data/`, `src/integrations/`, `src/lib/`, `src/hooks/`, `src/assets/`, `scripts/`.

2. **DO NOT modify any of these existing entities (treat them as frozen unless the task explicitly names them):**
   - 32 existing route pages (HomePage, BlogListPage, NewsHubPage, ExpressEntryLandingPage, all country pages, all service pages, CityPage, StateHubPage, IndiaHubPage, IndiaPRPage, IndiaStudyPermitPage, IndiaWorkPermitPage, ComparisonPage, CRSCalculatorPage, NOCFinderPage, PNPTrackerPage, etc.)
   - 74 city pages content (43 Indian + 31 Canadian) in `cityData.ts`
   - 3 Indian state hubs (Gujarat, Haryana, Rajasthan) in `stateHubData.ts`
   - The existing `EligibilityForm.tsx` component internals — you may COMPOSE/WRAP it into new variants but DO NOT change its props, validation, or submit behavior
   - The existing `Navbar`, `Footer`, `LiveExpressEntry`, `NewsStripHome` components
   - `scripts/generate-sitemap.mjs` — you may APPEND new URL generators but DO NOT change existing ones
   - All Supabase migrations, tables, and client config
   - All Tailwind config, color tokens (`--navy`, `--gold`), fonts (Inter + DM Sans), and logo

3. **NEW WORK GOES IN NEW NAMESPACES.** Every new route uses a new URL prefix to avoid collisions:
   - `/usa`, `/uk`, `/from-australia` (NOT `/australia` which is taken)
   - `/from/:country/:city` for origin city pages (NOT `/city/:slug` which is taken)
   - `/move/:origin-to-:dest/:program` for corridor pages
   - `/compare/:slug` extends the existing `/compare` index — do not replace `/compare` itself
   - `/canada/:slug` for provinces — this route exists but data is empty, you populate
   - `/visa-terms/:slug`, `/updates`, `/updates/:yyyy-mm`, `/methodology`, `/why-not-us`, `/credentials`, `/case-outcomes`, `/myths`

4. **NEW DATA GOES IN NEW FILES.** Do not modify `blogData.ts`, `cityData.ts`, `countryData.ts`, `serviceData.ts`, `stateHubData.ts`, `documentsData.ts`, `nocData.ts`, `expressEntryDraws.ts`, `pnpDraws.ts`, `blogEnhancements.ts`. Create new files: `originCountryData.ts`, `originCityData.ts`, `originPathwayData.ts`, `corridorCombos.ts`, `pathwayCompareData.ts`, `canadianProvincesData.ts`, `visaTermsData.ts`.

5. **GIT CHECKPOINT BEFORE EVERY TASK.** Before starting any task, run `git status` and confirm working tree is clean. Tell me to commit current state if it isn't. After completing each task, list every file you CREATED and every file you MODIFIED in a clear table. Never modify a file outside the explicit scope of the current task.

6. **NO REGRESSION POLICY.** After every task, run `npm run build`. If the build fails OR if any of these existing routes stop rendering, STOP and report instead of attempting to "fix": `/`, `/immigration/canada`, `/india`, `/india/canada-pr-india`, `/city/mumbai`, `/city/toronto`, `/express-entry`, `/crs-calculator`, `/compare`, `/blog`, `/news`, `/contact`, `/quiz`, `/faq`.

7. **DIFF-BEFORE-WRITE FOR EXISTING FILES.** If a task requires modifying an existing file (e.g., adding a route to `App.tsx`, adding a URL generator to `generate-sitemap.mjs`, adding a section to HomePage), SHOW ME THE DIFF FIRST AND WAIT FOR APPROVAL. Do not write the change until I respond "approved".

8. **EXISTING COPY IS SACRED UNLESS THE TASK EXPLICITLY SAYS REWRITE.** Do not "improve" headlines, descriptions, or content on existing pages while implementing a task that has a different purpose. If you see something that could be better, note it at the end of the task report — do not change it.

9. **PRESERVE EXISTING SCHEMA.** Existing pages already have ProfessionalService + BreadcrumbList schema. When adding new schemas, APPEND additional `<script type="application/ld+json">` tags via react-helmet-async. Do not remove or rewrite existing JSON-LD blocks.

10. **REPORT FORMAT (every task ends with this):**
   - Files created: [list with paths]
   - Files modified: [list with paths + 1-line summary of change]
   - New routes added: [list]
   - New sitemap entries: [count]
   - Build status: PASS / FAIL
   - Existing routes spot-checked: [list of routes verified still working]
   - Any deviations from task spec: [list or "none"]

**Acknowledge these guardrails. Tell me you understand and will obey rule 5 (git checkpoint), rule 7 (diff-before-write), and rule 10 (report format). Then wait for me to send Task 1.**

---

## STACK CONTEXT (already in place — preserve)

Vite + React 18 + TypeScript · Tailwind + shadcn/ui · React Router v6 · react-helmet-async · React Hook Form + Zod · TanStack Query · Framer Motion · Supabase · react-snap. Brand: Navy `--navy` + Gold `--gold` + Cream background, Inter (`font-display`) + DM Sans, `src/assets/logo-icon.png`.

**Already built (DO NOT rebuild):** 74 city pages (43 Indian + 31 Canadian) at `/city/:slug`, 3 Indian state hubs at `/india/:slug`, India hub at `/india`, India→Canada pathway pages, 4 destination country pages at `/immigration/:slug`, services pages, `/compare` country-level comparison, CRS Calculator, NOC Finder, PNP Tracker, Processing Times, Immigration Cost Calculator, Blog, News Hub, FAQ, Quiz. EligibilityForm embedded on 14 pages.

**Goal:** Scale from ~150 indexed pages to ~400+ AI-citable pages, position as the unbiased global immigration authority (Canada + USA + UK + Australia + Germany), capture origin-country + corridor + comparison search demand, and convert every visitor through contextual lead forms.

---

## TASK 1 — Origin Country Hubs (USA, UK, Australia)

**Scope:** Add three NEW origin-country hub pages. Mirrors existing `/india` hub pattern.

**Files to create:**
- `src/data/originCountryData.ts` — entries for `usa`, `uk`, `australia` with: country name, flag emoji, diaspora context, top 5 reasons people move from this country to Canada, policy context (H-1B backlog for USA, post-Brexit for UK, housing crisis for AU), pathway list, FAQs, testimonials placeholder.
- `src/pages/UsaHubPage.tsx`, `src/pages/UkHubPage.tsx`, `src/pages/AustraliaOriginHubPage.tsx`

**Files to modify (DIFF-BEFORE-WRITE required):**
- `src/App.tsx` — append three routes: `/usa`, `/uk`, `/from-australia`
- `scripts/generate-sitemap.mjs` — append three new URLs

**Page requirements:** Definitional lead (50–80 words), TL;DR card, hero with H1 "Immigration & Canada PR from [Country] — Complete 2026 Guide", 3-pathway grid, comparison table, 3–5 "Best for [persona]" sections, origin-city links grid (placeholder — populated in Task 3), case-outcome stat card, named legal reviewer byline, last-updated date, .gov citations (USCIS, IRCC, Home Office, DHA), 8–12 FAQs with FAQPage schema, embedded EligibilityForm, related-pages section.

**Do NOT:** modify existing `/india`, `/immigration/australia` (destination), or `/immigration/uk` routes.

---

## TASK 2 — Origin-Country Pathway Pages

**Scope:** Add 9 NEW pathway sub-pages under origin hubs.

**Files to create:**
- `src/data/originPathwayData.ts`
- 9 new page components OR a single template `src/pages/OriginPathwayPage.tsx` with dynamic routing

**New routes:**
- `/usa/canada-pr-from-usa`, `/usa/h1b-to-canada-pr`, `/usa/eb-backlog-canada-alternative`
- `/uk/canada-pr-from-uk`, `/uk/post-graduation-uk-to-canada`, `/uk/skilled-worker-to-canada`
- `/from-australia/canada-pr-from-australia`, `/from-australia/189-491-to-canada`, `/from-australia/parent-visa-alternative-canada`

**Files to modify (DIFF-BEFORE-WRITE):** `App.tsx`, `generate-sitemap.mjs`.

**Page requirements:** 1500–2500 words, definitional lead, eligibility checklist, step-by-step pathway with HowTo schema (numbered steps with `totalTime`, `estimatedCost`), processing-time table, cost breakdown (local currency + CAD), document checklist with country-specific items, tax/financial considerations when leaving origin, "Should you stay or move?" comparison, named legal reviewer byline, .gov citations, 10+ FAQs, embedded EligibilityForm.

**Do NOT:** modify existing `/india/canada-pr-india`, `/india/study-permit-india`, `/india/work-permit-india`.

---

## TASK 3 — Origin City Pages (USA, UK, Australia + 15 more Indian cities)

**Scope:** Build a NEW dynamic route `/from/:countrySlug/:citySlug` for origin city pages. Separate from existing `/city/:slug`.

**Files to create:**
- `src/data/originCityData.ts` — 53 cities total:
  - USA (20): New York, San Francisco, San Jose, Seattle, Austin, Dallas, Houston, Chicago, Boston, Los Angeles, San Diego, Atlanta, Washington DC, Bay Area, Plano, Edison NJ, Jersey City, Fremont, Bellevue, Redmond
  - UK (10): London, Manchester, Birmingham, Leeds, Glasgow, Edinburgh, Bristol, Reading, Cambridge, Liverpool
  - Australia (8): Sydney, Melbourne, Brisbane, Perth, Adelaide, Canberra, Gold Coast, Hobart
  - India additions (15): Trivandrum, Visakhapatnam, Mangalore, Mysore, Goa, Bhopal, Ranchi, Guwahati, Dehradun, Shimla, Srinagar, Jammu, Madurai, Tiruchirappalli, Salem
- `src/pages/OriginCityPage.tsx`

**Files to modify (DIFF-BEFORE-WRITE):** `App.tsx` (add dynamic route), `generate-sitemap.mjs` (append 53 URLs).

**For the 15 new Indian cities:** add them to a NEW separate data file `originCityData.ts` under `india` namespace; do NOT modify the existing `cityData.ts`. If keeping them in `/from/india/:city` is undesirable, route them via the existing `/city/:slug` AFTER showing me a diff and getting approval.

**Page requirements per city (6 unique modules to avoid thin-content penalties):** definitional lead, diaspora context for that city → top Canadian destination, local visa office data (VFS / consulate, address, wait times), cost-of-living table vs Toronto/Vancouver/Calgary, named local context (top 3 employers sponsoring Canada moves, common departure profile), 6–10 corridor-specific FAQs. Article + FAQPage + BreadcrumbList schema, named legal reviewer, last-updated, embedded EligibilityForm.

---

## TASK 4 — Origin→Destination Corridor Pages

**Scope:** Build NEW dynamic route `/move/:originCity-to-:destinationCity/:visaProgram` with 60 high-value corridors.

**Files to create:**
- `src/data/corridorCombos.ts` — 60 corridor entries (30 India→Canada, 20 USA→Canada, 5 UK→Canada, 5 AU→Canada) per the list below
- `src/pages/CorridorPage.tsx`

**Files to modify (DIFF-BEFORE-WRITE):** `App.tsx`, `generate-sitemap.mjs`.

**Corridors:**
- **India → Canada (30):** Delhi/Mumbai/Bangalore/Hyderabad/Chennai/Pune/Ahmedabad/Kolkata × Toronto, plus Delhi/Mumbai/Bangalore/Hyderabad × Vancouver, plus Delhi/Mumbai × Calgary, Bangalore/Hyderabad × Ottawa, Delhi/Mumbai × Edmonton, Bangalore/Hyderabad/Chennai/Pune × Mississauga, Bangalore × Brampton, Delhi/Mumbai × Winnipeg, Bangalore/Hyderabad × Halifax, Delhi × Saskatoon, Mumbai × Quebec City, Bangalore × Victoria
- **USA → Canada (20):** NYC/SF/Bay Area × Toronto, Seattle × Vancouver/Toronto, Austin/Dallas × Toronto, Houston × Calgary, Chicago/Boston × Toronto, LA × Vancouver, NYC × Montreal, Edison NJ × Toronto, Plano × Calgary, Bellevue/Redmond × Vancouver, San Jose × Toronto, Atlanta × Toronto, DC × Toronto, Bay Area × Calgary
- **UK → Canada (5):** London × Toronto/Vancouver, Manchester/Birmingham/Edinburgh × Toronto
- **AU → Canada (5):** Sydney/Melbourne × Toronto, Sydney/Melbourne × Vancouver, Brisbane × Calgary

**Page requirements per corridor (~2000 words):** definitional lead, eligibility checklist (corridor-specific), processing-time table (origin VFS → IRCC → POE), cost breakdown both currencies, full document checklist with origin-specific items (e.g., USCIS approval notice for USA, BRP/Share Code for UK, VEVO check for AU, PCC from Passport Seva + Form 16 for India), diaspora module, cost-of-living side-by-side, tax onboarding/exit, schools & dependents, 8+ FAQs, "Choose Express Entry / PNP / Study Permit if…" verdict block, named legal reviewer, .gov citations, last-updated, EligibilityForm.

---

## TASK 5 — Pathway Comparison Pages

**Scope:** Build NEW dynamic route `/compare/:slug` with 12 pathway-level comparison pages. The existing `/compare` index page stays as-is and gets cross-linked from these new sub-pages.

**Files to create:**
- `src/data/pathwayCompareData.ts`
- `src/pages/PathwayComparePage.tsx`

**Files to modify (DIFF-BEFORE-WRITE):** `App.tsx`, `generate-sitemap.mjs`. The existing `ComparisonPage.tsx` at `/compare` STAYS untouched — if you want to add a "See pathway comparisons →" link section to it, show me the diff first.

**Comparisons to build:**
1. `/compare/express-entry-vs-pnp`
2. `/compare/express-entry-vs-australia-189`
3. `/compare/canada-pr-vs-usa-green-card`
4. `/compare/h1b-vs-canada-work-permit`
5. `/compare/study-permit-canada-vs-uk-vs-australia`
6. `/compare/canada-pr-vs-uk-skilled-worker`
7. `/compare/eb2-niw-vs-canada-pr`
8. `/compare/lmia-vs-gts-vs-cusma`
9. `/compare/canada-pgwp-vs-uk-graduate-route`
10. `/compare/family-sponsorship-canada-vs-usa`
11. `/compare/canada-pr-vs-germany-blue-card`
12. `/compare/express-entry-vs-quebec-arrima`

**Structure required EXACTLY (this is what AI engines cite):**
1. **TL;DR verdict** in first 75 words
2. **Comparison table** — 8 rows × 2 columns (eligibility, processing time, cost USD/CAD, success rate, work rights during processing, path to citizenship, dependent rights, key drawback) — short descriptive cells, not checkmarks
3. **Decision framework** — numbered "Pick A if 1+2+3, pick B if 4+5"
4. **Scoring matrix** — both options scored 1–10 on 7 dimensions (speed, cost, certainty, flexibility, family, career, lifestyle) with totals
5. **"Best for [persona]"** — 3 personas per option
6. **"When this changes" caveat** — what policy update could flip the verdict
7. **5+ FAQs** with FAQPage schema
8. Named legal reviewer byline + last-updated + .gov source citations + EligibilityForm

---

## TASK 6 — AI-Citable Content Components (NEW components only)

**Scope:** Create 11 NEW reusable React components in a NEW folder `src/components/content/`. DO NOT retrofit existing pages in this task — that comes later in Task 6b (a separate, opt-in pass).

**Files to create in `src/components/content/`:**
1. `DefinitionalLead.tsx` — props: `title`, `description`. Renders 50–80 word definitional card with subtle background.
2. `TLDRCard.tsx` — props: `summary: string[]`. Bulleted card, 3–5 statements.
3. `StatCard.tsx` — props: `label`, `value`, `source`, `sourceUrl`, `date`. Single stat with citation.
4. `ComparisonTable.tsx` — props: `rows`, `columns`. Mobile-safe comparison table.
5. `VerdictBlock.tsx` — props: `options: [{label, conditions[]}]`. "Choose X if…" decision card.
6. `PersonaCard.tsx` — props: `persona`, `description`, `bestProgram`.
7. `EligibilityChecklist.tsx` — props: `items: string[]`.
8. `StepByStepGuide.tsx` — props: `steps: [{title, description, time, cost}]`. Auto-emits HowTo schema.
9. `LastUpdatedBadge.tsx` — props: `date`, `reviewerName`, `credentials`. Top-of-page stamp.
10. `GovSourceCitation.tsx` — props: `source`, `url`, `quote`. Inline citation block.
11. `FAQAccordion.tsx` — props: `items: [{q, a}]`. Auto-emits FAQPage schema.

**Use these new components on all pages created in Tasks 1, 2, 3, 4, 5.** Do NOT touch existing pages in this task.

---

## TASK 6b — Retrofit Existing Pages (RUN ONLY AFTER MANUAL APPROVAL)

**Scope:** Optional retrofit. Apply Task 6 components to existing pages. **Skip this task entirely unless I explicitly say "run task 6b".**

If approved: HomePage, 4 country pages, ExpressEntryLandingPage, IndiaPRPage, FAQ page, top 10 blog posts get `<LastUpdatedBadge />` + `<TLDRCard />` + `<GovSourceCitation />` ADDED to their existing structure. DO NOT remove existing content. DO NOT change H1s, hero copy, or sections. Only ADD the new components in non-disruptive locations (top of page for badge, after hero for TL;DR, sidebar or end for citations).

DIFF-BEFORE-WRITE required for every existing file touched.

---

## TASK 7 — Advanced Schema (DefinedTerm, Speakable, ClaimReview, GovernmentService, Dataset)

**Scope:** Build NEW schema components in `src/components/seo/`. Apply them only to NEW pages from Tasks 1–5 in this pass. Existing pages get these schemas only if Task 6b is run.

**Files to create:**
- `src/components/seo/DefinedTermSchema.tsx`
- `src/components/seo/SpeakableSchema.tsx`
- `src/components/seo/GovernmentServiceSchema.tsx`
- `src/components/seo/DatasetSchema.tsx`
- `src/components/seo/ClaimReviewSchema.tsx`
- `src/data/visaTermsData.ts` — glossary of visa programs (Express Entry, H-1B, EB-2, PNP, LMIA, PGWP, Skilled Worker, 189, 190, EU Blue Card, Chancenkarte, etc.) with DefinedTerm structure
- `src/pages/VisaTermsHubPage.tsx` at `/visa-terms` — glossary index
- `src/pages/VisaTermPage.tsx` at `/visa-terms/:slug` — individual term pages
- `src/pages/MythsPage.tsx` at `/myths` — uses ClaimReviewSchema

**Files to modify (DIFF-BEFORE-WRITE):** `App.tsx`, `generate-sitemap.mjs`.

Stack 3–4 complementary schemas per page. Speakable schema wraps TL;DR + first FAQ via CSS selectors.

---

## TASK 8 — Legal Reviewer & E-E-A-T Layer

**Scope:** Strengthen E-E-A-T signals. Most of this is NEW additions.

**Files to create:**
- `src/components/seo/LegalReviewBadge.tsx`
- `src/pages/CredentialsPage.tsx` at `/credentials`
- `src/pages/CaseOutcomesPage.tsx` at `/case-outcomes` — anonymized stats, Dataset schema
- `src/components/TrustStrip.tsx` — footer trust-strip component

**Files to modify (DIFF-BEFORE-WRITE):**
- `src/data/authorsData.ts` (created in Phase 1) — extend with `licenseAuthority`, `licenseNumber`, `verificationUrl`, `yearsExperience`, `casesHandled`, `successRate`
- Optionally `Footer.tsx` to mount `TrustStrip` — diff first

**Place `LegalReviewBadge`** at the top of every NEW page created in Tasks 1–5, 7. Do NOT retrofit existing pages here.

---

## TASK 9 — Canadian Provincial Pages

**Scope:** Populate the existing `/canada/:slug` route which currently has no data. This is a fill-in, not a route change.

**Files to create:**
- `src/data/canadianProvincesData.ts` — 13 entries: Ontario, BC, Alberta, Quebec, Manitoba, Saskatchewan, Nova Scotia, New Brunswick, Newfoundland & Labrador, PEI, Yukon, NWT, Nunavut
- `src/pages/CanadianProvincePage.tsx`

**Files to modify (DIFF-BEFORE-WRITE):**
- `src/App.tsx` — wire `/canada/:slug` route to the new page component (route exists but maps to nothing useful)
- `scripts/generate-sitemap.mjs` — append 13 provincial URLs

**Page requirements:** PNP program details, current draws, in-demand occupations + NOC codes, median wages, cost-of-living, climate, links to existing city pages in that province (use existing `cityData.ts` Canadian cities — read-only), processing times, personas, FAQs, .gov source links. Article + FAQ + GovernmentService + BreadcrumbList schema. Named legal reviewer, last-updated, EligibilityForm.

---

## TASK 10 — Lead-Form Coverage & New Variants

**Scope:** Ensure every new page captures inquiries. DO NOT modify `EligibilityForm.tsx` itself — compose/wrap it.

**Files to create:**
- `src/components/forms/EligibilityFormCompact.tsx` — wraps existing form, exposes only 3 fields inline
- `src/components/forms/EligibilityFormCorridor.tsx` — wraps existing form, pre-fills `originCity` + `destinationCity` from URL params
- `src/components/forms/EligibilityFormPathway.tsx` — wraps existing form, pre-fills `pathwayInterest`
- `src/components/StickyFormCta.tsx` — floating CTA button + modal wrapper
- `src/components/ExitIntentModal.tsx` — desktop exit-intent trigger, sessionStorage suppression

**Files to modify (DIFF-BEFORE-WRITE):**
- Mount `<StickyFormCta />` + `<ExitIntentModal />` globally — likely in a layout wrapper. Show me the diff of wherever you mount them.
- The existing `EligibilityForm.tsx` may need a `defaultValues` prop added if it doesn't accept one. If you change its interface, show me the diff AND verify all 14 existing usages still work.

**Supabase:** ensure submissions store `originPath` (page URL), `originCity`, `destinationCity`, `pathwayInterest`. If the existing table lacks these columns, create a migration to add them as nullable — do not alter existing columns.

---

## TASK 11 — Unbiased Positioning (REQUIRES DIFF + APPROVAL)

**Scope:** This is the most invasive task because it touches existing copy. **DIFF EVERY CHANGE AND WAIT FOR APPROVAL BEFORE WRITING.**

**Files to create:**
- `src/pages/MethodologyPage.tsx` at `/methodology`
- `src/pages/WhyNotUsPage.tsx` at `/why-not-us`

**Files to modify (DIFF-BEFORE-WRITE, EACH SEPARATELY):**
- HomePage hero H1 + subhead — show old vs new side by side
- HomePage — add "How we stay unbiased" section. Show me proposed placement.
- Navbar — soften Canada-only language if present. Show me current vs proposed.
- Footer — soften Canada-only language if present. Show me current vs proposed.
- Page meta descriptions on HomePage and country pages — show me current vs proposed.

**STOP after each diff. Do not batch.** I will approve one change at a time.

---

## TASK 12 — Freshness + Updates Layer

**Scope:** Add freshness signal infrastructure.

**Files to create:**
- `src/pages/UpdatesPage.tsx` at `/updates`
- `src/pages/UpdatesDigestPage.tsx` at `/updates/:yyyy-mm`
- `src/components/LivePolicyUpdates.tsx` — sidebar widget (3 latest news for a country)
- `scripts/check-freshness.mjs` — build-time check, warns (not fails initially) if any page hasn't been touched in 90 days

**Files to modify (DIFF-BEFORE-WRITE):**
- Add `lastUpdated` fields to NEW data files only. Do NOT add to existing data files (`blogData.ts`, `cityData.ts`, etc.) in this task — that's a separate retrofit pass.
- `generate-sitemap.mjs` — emit `lastmod` from `lastUpdated` field on new URLs.
- `package.json` — add `check-freshness` to scripts (do not change other scripts). Show diff.

---

## TASK 13 — Internal Linking & Glossary Cross-Links

**Scope:** Build internal-link graph among NEW pages.

**Files to create:**
- `src/components/RelatedPages.tsx` — algorithmic 6-most-relevant surfacing based on tags
- `src/components/EntityCrossLinks.tsx` — inline visa-term linker (e.g., wraps "Express Entry" → `/visa-terms/express-entry`)
- `src/components/Breadcrumbs.tsx` — visible breadcrumbs + BreadcrumbList schema

**Use these only on NEW pages from Tasks 1–5, 7, 9.** Retrofit to existing pages is out of scope for this task.

Cross-link rule: every new page should link to at least 8 other relevant pages via `RelatedPages` or contextual links in body.

---

## TASK 14 — Final Verification

**Scope:** Full audit before declaring done.

**Run and report:**
1. `npm run build` — must PASS. If it fails, STOP and report.
2. Updated route count — should be ~400+ (existing ~150 + new from this phase).
3. Sitemap output count + 20 sample new URLs.
4. JSON-LD validates on 5 sample pages (one origin hub, one corridor, one comparison, one province, one visa-term). Paste schemas.
5. EligibilityForm renders on 100% of new content pages. List any exclusions.
6. Lighthouse scores on: HomePage (existing — should be unchanged), one corridor page (`/move/bangalore-to-toronto/express-entry`), one comparison page (`/compare/express-entry-vs-pnp`), one origin city page (`/from/usa/seattle`), one province page (`/canada/ontario`).
7. Spot-check existing pages still work: `/`, `/immigration/canada`, `/india`, `/india/canada-pr-india`, `/city/mumbai`, `/city/toronto`, `/express-entry`, `/crs-calculator`, `/compare`, `/blog`, `/news`, `/contact`, `/quiz`, `/faq`. Report any regression.
8. Full files-created vs files-modified table grouped by task.

---

## END OF PROMPT

**Workflow reminder for me (the user):**

1. Paste GLOBAL GUARDRAILS, wait for acknowledgment.
2. `git checkout -b phase2-ai-scale && git status` clean.
3. Feed Task 1. Review diff. Approve modifications to App.tsx and sitemap. `git commit -m "task 1"`.
4. Run `npm run build` locally + open 3 existing pages. If clean, proceed to Task 2.
5. Repeat for Tasks 2–10, 12–14. SKIP Task 6b and Task 11 unless explicitly desired (these touch existing copy).
6. After Task 14 passes, merge to main.
