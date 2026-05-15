You are working on the existing React + Vite + TypeScript site **4 Aces Visa / Global Compass Visas** at `https://www.4acesvisa.com`. The site is already ranking and appearing in AI search results (ChatGPT, Perplexity, Google AI Overviews) and converting weekly inquiries. The next phase is to scale this dramatically by (a) adding origin-country and origin-city targeting for users in USA, UK, Australia, and additional Indian regions searching for Canada PR / immigration, (b) building pathway-comparison pages, (c) restructuring content into AI-citable chunks, and (d) positioning the brand as the unbiased one-stop solution for any immigration inquiry — with a lead form on every page.

DO NOT rebuild what exists. Preserve all existing pages, components, data files, routes, the EligibilityForm, the sitemap script, and all current styling. Stack stays the same: Vite + React 18 + TypeScript + Tailwind + shadcn/ui + react-helmet-async + React Hook Form + Zod + TanStack Query + Framer Motion + Supabase + react-snap.

**What already exists (do not duplicate):** 74 city pages (43 Indian + 31 Canadian) at `/city/:slug`, 3 Indian state hubs (Gujarat, Haryana, Rajasthan) at `/india/:slug`, India hub at `/india`, India→Canada pathway pages (`/india/canada-pr-india`, `/india/study-permit-india`, `/india/work-permit-india`), 4 destination country pages (Canada/Australia/Germany/UK) at `/immigration/:slug` with Australia/UK/Germany sub-routes, services pages, `/compare` (country-level comparison), CRS Calculator, NOC Finder, PNP Tracker, Processing Times, Immigration Cost Calculator, Blog, News Hub, FAQ, Quiz. EligibilityForm is already embedded on 14 pages.

**Goal positioning:** The site must read as an unbiased authority on every immigration pathway worldwide — not a Canada-only consultancy. Every page should compare options honestly, cite government sources, name a legal reviewer, and end with a lead-capture form for free consultation.

Execute the following 14 tasks in order. After each task, list files created vs modified and confirm before moving on.

---

**TASK 1 — Origin Country Hubs for USA, UK, Australia**

Create three new origin-country hub pages mirroring the structure of the existing `/india` hub (IndiaHubPage.tsx). Add data files first, then pages.

Create `src/data/originCountryData.ts` with entries for `usa`, `uk`, `australia` containing: country name, flag emoji, diaspora context (total Indian-origin population if relevant, key cities with strong outbound migration), top 5 reasons people from this country move to Canada (or USA/Australia for others), policy context (e.g., H-1B backlog for USA, post-Brexit settlement for UK), key pathways available to citizens/residents of that country, FAQs, testimonials placeholder.

Create three new page components: `src/pages/UsaHubPage.tsx`, `src/pages/UkHubPage.tsx`, `src/pages/AustraliaOriginHubPage.tsx` at routes `/usa`, `/uk`, `/from-australia` (use `/from-australia` to avoid collision with existing `/australia/*` destination routes).

Each hub page must include: definitional lead paragraph (50–80 words), TL;DR card, hero with H1 "Immigration & Canada PR from [Country] — Complete 2026 Guide", breaking news ticker filtered to that country, 3-pathway grid (Canada PR, USA→Canada, Other options), interactive comparison table, "Best for [persona]" sections (3–5 personas), origin-city links grid (will be populated in Task 3), case-outcome stat card, named legal reviewer byline at top, last-updated date, .gov source citations (USCIS, IRCC, Home Office, DHA), 8–12 FAQs with FAQPage schema, embedded EligibilityForm, related-pages section.

Add to `App.tsx` routes and to `scripts/generate-sitemap.mjs`.

---

**TASK 2 — Origin-Country Pathway Pages**

For each origin country (USA, UK, Australia), create 3 pathway sub-pages following the India pattern.

Routes:
- `/usa/canada-pr-from-usa`, `/usa/h1b-to-canada-pr`, `/usa/eb-backlog-canada-alternative`
- `/uk/canada-pr-from-uk`, `/uk/post-graduation-uk-to-canada`, `/uk/skilled-worker-to-canada`
- `/from-australia/canada-pr-from-australia`, `/from-australia/189-491-to-canada`, `/from-australia/parent-visa-alternative-canada`

Each page: 1500–2500 words, definitional lead, eligibility checklist, step-by-step pathway with HowTo schema (numbered steps with `totalTime`, `estimatedCost`), processing-time table, cost breakdown in local currency + CAD, document checklist with country-specific items (e.g., for USA: I-94, EAD, H-1B approval notice; for UK: BRP, Share Code; for Australia: VEVO check), tax/financial considerations when leaving origin country, comparison block "Should you stay or move?", named legal reviewer byline, .gov citations, 10+ FAQs, embedded EligibilityForm.

Create reusable data file `src/data/originPathwayData.ts` to avoid hard-coding.

---

**TASK 3 — US, UK, Australia City Pages**

Extend the existing `cityData.ts` pattern to add city pages for top origin cities. Build a new dynamic route `/from/:countrySlug/:citySlug` to keep separation clean from existing `/city/:slug` (Indian + Canadian focus).

Add to `src/data/originCityData.ts`:

**USA cities (20):** New York, San Francisco, San Jose, Seattle, Austin, Dallas, Houston, Chicago, Boston, Los Angeles, San Diego, Atlanta, Washington DC, Bay Area (Cupertino/Sunnyvale combined), Plano (Dallas suburb), Edison NJ, Jersey City, Fremont, Bellevue, Redmond.

**UK cities (10):** London, Manchester, Birmingham, Leeds, Glasgow, Edinburgh, Bristol, Reading, Cambridge, Liverpool.

**Australia cities (8):** Sydney, Melbourne, Brisbane, Perth, Adelaide, Canberra, Gold Coast, Hobart.

**Additional Indian cities to add (15) — strong outbound migration:** Trivandrum, Visakhapatnam, Mangalore, Mysore, Goa, Bhopal, Ranchi, Guwahati, Dehradun, Shimla, Srinagar, Jammu, Madurai, Tiruchirappalli, Salem.

Each city page must include 6 unique modules (per AI-search best practices to avoid thin-content penalties):
1. Definitional lead: "Indian-origin / [Country] residents in [City] most commonly move to Canada via [top pathways]."
2. Diaspora context for that city → top Canadian destination (estimated community size, neighborhoods, top employers in Canada hiring from that city).
3. Local visa office data (nearest VFS / consulate / biometrics center, address, current wait times).
4. Cost-of-living comparison table: [Origin city] vs Toronto vs Vancouver vs Calgary (rent, groceries, transit, tax).
5. Named local context: top 3 employers in origin city that sponsor Canada moves, common departure profile.
6. 6–10 FAQs specific to this corridor (e.g., "How long does it take to move from Bangalore to Toronto on Express Entry?").

All pages: Article + FAQPage + BreadcrumbList schema, named legal reviewer, last-updated date, embedded EligibilityForm.

Update `scripts/generate-sitemap.mjs` to emit all new URLs.

---

**TASK 4 — Origin→Destination Corridor Pages**

Create the highest-leverage AI-citation asset: corridor pages with URL pattern `/move/:originCity-to-:destinationCity/:visaProgram`.

Generate combos from `src/data/corridorCombos.ts` — start with 60 high-value corridors:

**India → Canada (30):** Delhi→Toronto, Mumbai→Toronto, Bangalore→Toronto, Hyderabad→Toronto, Chennai→Toronto, Pune→Toronto, Ahmedabad→Toronto, Kolkata→Toronto, Delhi→Vancouver, Mumbai→Vancouver, Bangalore→Vancouver, Hyderabad→Vancouver, Delhi→Calgary, Mumbai→Calgary, Bangalore→Ottawa, Hyderabad→Ottawa, Delhi→Edmonton, Mumbai→Edmonton, Bangalore→Mississauga, Hyderabad→Mississauga, Chennai→Mississauga, Pune→Mississauga, Bangalore→Brampton, Delhi→Winnipeg, Mumbai→Winnipeg, Bangalore→Halifax, Hyderabad→Halifax, Delhi→Saskatoon, Mumbai→Quebec City, Bangalore→Victoria.

**USA → Canada (20):** New York→Toronto, SF→Vancouver, Bay Area→Toronto, Seattle→Vancouver, Seattle→Toronto, Austin→Toronto, Dallas→Toronto, Houston→Calgary, Chicago→Toronto, Boston→Toronto, LA→Vancouver, NYC→Montreal, Edison NJ→Toronto, Plano→Calgary, Bellevue→Vancouver, Redmond→Vancouver, San Jose→Toronto, Atlanta→Toronto, DC→Toronto, Bay Area→Calgary.

**UK → Canada (5):** London→Toronto, London→Vancouver, Manchester→Toronto, Birmingham→Toronto, Edinburgh→Toronto.

**Australia → Canada (5):** Sydney→Toronto, Melbourne→Toronto, Sydney→Vancouver, Melbourne→Vancouver, Brisbane→Calgary.

Each corridor page (~2000 words) must include: definitional lead, eligibility checklist (corridor-specific), processing-time table (origin VFS → IRCC → POE), cost breakdown in both currencies, full document checklist with origin-specific items, diaspora module (community size in destination, neighborhoods, top employers), cost-of-living side-by-side, tax onboarding/exit considerations, schools & dependents info, 8+ FAQs, "Choose Express Entry / PNP / Study Permit if…" verdict block, named legal reviewer, .gov citations (link to USCIS, IRCC, Home Office, DHA as applicable), last-updated stamp, EligibilityForm.

Implement with a single dynamic route + template page `src/pages/CorridorPage.tsx` reading from `corridorCombos.ts`. Include all URLs in sitemap.

---

**TASK 5 — Pathway Comparison Pages**

Existing `/compare` is country-level. Add pathway-level "X vs Y" pages that AI engines love to cite. Create dynamic route `/compare/:slug` with a template page `src/pages/PathwayComparePage.tsx`.

Build these 12 comparison pages (data in `src/data/pathwayCompareData.ts`):

1. `/compare/express-entry-vs-pnp` — Canada Express Entry vs Provincial Nominee Program
2. `/compare/express-entry-vs-australia-189` — Canada EE vs Australia Skilled Independent
3. `/compare/canada-pr-vs-usa-green-card` — Canada PR vs US Green Card (EB-2/EB-3)
4. `/compare/h1b-vs-canada-work-permit` — H-1B vs Canada Work Permit / GTS
5. `/compare/study-permit-canada-vs-uk-vs-australia` — Study Visa: Canada vs UK vs Australia
6. `/compare/canada-pr-vs-uk-skilled-worker` — Canada PR vs UK Skilled Worker Visa
7. `/compare/eb2-niw-vs-canada-pr` — EB-2 NIW vs Canada Express Entry
8. `/compare/lmia-vs-gts-vs-cusma` — Canada work permit pathways for US/Mexican citizens
9. `/compare/canada-pgwp-vs-uk-graduate-route` — Post-study work: Canada PGWP vs UK Graduate Route
10. `/compare/family-sponsorship-canada-vs-usa` — Family/spouse sponsorship: Canada vs USA
11. `/compare/canada-pr-vs-germany-blue-card` — Canada PR vs Germany EU Blue Card / Chancenkarte
12. `/compare/express-entry-vs-quebec-arrima` — Federal Express Entry vs Quebec Arrima/PSTQ

Each page MUST follow this AI-citable structure exactly:
1. **TL;DR verdict** in first 75 words (e.g., "Choose Express Entry if you have CRS 470+ and don't need provincial ties; choose PNP if your CRS is 400–470 and you're flexible on province").
2. **Comparison table** — 8 rows × 2 columns. Rows: eligibility, processing time, cost (USD/CAD), success rate, work rights during processing, path to citizenship, dependent rights, key drawback. Cells contain short descriptive phrases (not checkmarks).
3. **Decision framework** — numbered "Pick A if 1+2+3, pick B if 4+5".
4. **Scoring matrix** — both options scored 1–10 on 7 dimensions (speed, cost, certainty, flexibility, family, career, lifestyle) with totals.
5. **"Best for [persona]"** sections — 3 personas per option.
6. **"When this changes" caveat** — what policy update could flip the verdict.
7. **5+ FAQs.**
8. Named legal reviewer byline + last-updated date + .gov source citations + EligibilityForm.

---

**TASK 6 — AI-Citable Content Blocks (retrofit existing pages)**

The AI-search research shows specific content shapes drive citations. Retrofit existing high-value pages (HomePage, all 4 country pages, ExpressEntryLandingPage, IndiaPRPage, top 10 blog posts, FAQ page) with these reusable components:

Create components in `src/components/content/`:

1. `<DefinitionalLead title description />` — renders a 50–80 word definitional paragraph at top of page styled as a card with subtle background. Use on every visa/program page.
2. `<TLDRCard summary={string[]} />` — bulleted TL;DR card at top, 3–5 short factual statements.
3. `<StatCard label value source sourceUrl date />` — single stat with citation (e.g., "EB-2 India backlog: 13.3 years · Source: US State Dept May 2026 Visa Bulletin").
4. `<ComparisonTable rows columns />` — clean, mobile-safe comparison table.
5. `<VerdictBlock options={[{label, conditions[]}]} />` — "Choose X if…" decision card.
6. `<PersonaCard persona description bestProgram />` — "Best for: Indian software engineers on H-1B…" block, 3–4 per page.
7. `<EligibilityChecklist items />` — checklist with one criterion per `<li>`.
8. `<StepByStepGuide steps={[{title, description, time, cost}]} />` — auto-emits HowTo schema.
9. `<LastUpdatedBadge date reviewerName credentials />` — top-of-page stamp: "Updated May 13, 2026 · Legally reviewed by Sahil Garg, RCIC #R512345".
10. `<GovSourceCitation source url quote />` — inline citation block linking to USCIS/IRCC/Home Office.
11. `<FAQAccordion items />` — emits FAQPage schema automatically.

Retrofit: every country page gets TL;DR + Stat + Verdict + Persona + Last Updated. Every blog/news post gets Last Updated + Gov Citations + FAQ. Every comparison + corridor page uses all 11.

---

**TASK 7 — Advanced Schema (DefinedTerm, Speakable, ClaimReview, GovernmentService, Dataset)**

Beyond Article/FAQ/HowTo (already in Phase 1), add the schemas AI engines specifically reward.

Create `src/components/seo/`:
1. `<DefinedTermSchema term description termCode inDefinedTermSet />` — apply to every visa/program (Express Entry, H-1B, EB-2, PNP, LMIA, PGWP, Skilled Worker, 189, 190, EU Blue Card, etc.). Build a DefinedTermSet "Global Immigration Glossary" with all terms cross-linked.
2. `<SpeakableSchema cssSelector />` — wrap the TL;DR + first FAQ as speakable on every page so voice/audio AI assistants surface them.
3. `<GovernmentServiceSchema name provider areaServed serviceType />` — for each visa program page, identify it as a government service with IRCC/USCIS/Home Office as provider.
4. `<DatasetSchema name description data />` — for Processing Times tracker, PNP Tracker, Draw History, and Visa Bulletin tracker pages.
5. `<ClaimReviewSchema claim reviewer reviewRating />` — create a new page `/myths` debunking immigration myths ("Can I buy Canadian PR?", "Does marriage to a Canadian guarantee PR?", etc.) with ClaimReview schema on each entry.

Stack 3–4 complementary schemas per page minimum.

---

**TASK 8 — Legal Reviewer & E-E-A-T Layer**

Immigration is YMYL — AI engines deeply discount uncredentialed content. Strengthen E-E-A-T.

1. Extend `src/data/authorsData.ts` (created in Phase 1) to include legal-reviewer fields: `licenseAuthority` (CICC/ICCRC/MARA/State Bar), `licenseNumber`, `verificationUrl` (link to official registry), `yearsExperience`, `casesHandled`, `successRate`.
2. Add `<LegalReviewBadge reviewer />` component — shows photo, name, credential, "Verify license →" link, last-reviewed date. Mount at top of every country, visa, comparison, corridor, blog, news, and city page.
3. Build `/credentials` public page listing the firm's regulatory licenses with verification links to CICC public registry.
4. Add `/case-outcomes` page with anonymized stats: total cases filed, approval rate, average processing time vs IRCC published medians, by visa category. Schema as Dataset.
5. Add a "Why trust us" trust-strip component to every page footer area: license badge, years in business, total clients served, third-party review aggregate (Google + Trustpilot).

---

**TASK 9 — Programmatic Canadian Provincial Pages**

Route `/canada/:slug` exists but is unpopulated. Build provincial hub pages for all 10 provinces + 3 territories.

Create `src/data/canadianProvincesData.ts` with entries for: Ontario, British Columbia, Alberta, Quebec, Manitoba, Saskatchewan, Nova Scotia, New Brunswick, Newfoundland & Labrador, PEI, Yukon, NWT, Nunavut.

Each entry: PNP program name and codes, current draw trends, top in-demand occupations (with NOC codes), median wages, cost-of-living index, climate, top cities in that province (link to existing city pages), processing times, success-profile personas, FAQs, .gov source links to provincial immigration site.

Build `src/pages/CanadianProvincePage.tsx` template with all AI-citable components from Task 6, EligibilityForm embedded, link to relevant existing city pages within that province, comparison with neighboring provinces, schema stack (Article + FAQ + GovernmentService + BreadcrumbList).

Wire into sitemap script.

---

**TASK 10 — Lead-Form Coverage Audit & Form Enhancements**

The goal is that every page captures inquiries. Audit + enhance.

1. Audit all routes in `App.tsx`. List any page that doesn't render EligibilityForm. Add a contextual variant of EligibilityForm to every page that's missing it (excluding utility pages like `/contact` which already collect leads).
2. Create variants in EligibilityForm: `compact` (3 fields, inline), `full` (current), `corridor-specific` (pre-fills origin and destination based on URL params), `pathway-specific` (pre-fills program of interest).
3. Add `<StickyFormCta />` — bottom-right floating button on mobile + desktop that opens EligibilityForm in a modal. Mount globally below navbar (excluded on form pages themselves).
4. Add exit-intent modal version of EligibilityForm (desktop only, mouseout to top of viewport, sessionStorage suppression).
5. End every comparison, corridor, country, and pathway page with a strong "Get free unbiased pathway assessment" CTA section above the EligibilityForm.
6. Pipe submissions to existing Supabase table; ensure every submission stores `originPath` (page URL), `originCity`, `destinationCity`, `pathwayInterest` for downstream segmentation.

---

**TASK 11 — Unbiased Positioning Content**

To portray the brand as the unbiased one-stop authority (not just Canada-focused), add these elements globally:

1. Rewrite homepage hero H1 + subhead to position as "Your Unbiased Global Immigration Advisor — Canada, USA, UK, Australia, Germany & more". Subhead: "Compare every pathway. Get matched to the best route for your profile. Licensed consultants. No upsell — just clarity."
2. Add a homepage section "How we stay unbiased" with 4 cards: licensed-consultant code of ethics, transparent comparison methodology, .gov-source-only citations, no commissions from any government program.
3. Add `/methodology` page explaining how comparisons, scoring matrices, and recommendations are computed — link from every comparison/corridor page.
4. Add `/why-not-us` page (counterintuitive trust signal) — honest scenarios where the user should NOT hire the firm (e.g., "You already have a strong case and a clear pathway; you may not need consultancy.").
5. Soften any Canada-only language across navigation, footer, and meta descriptions to reflect multi-country authority.

---

**TASK 12 — Freshness + News Velocity Layer**

AI engines penalize stale content. Ensure freshness signal across the site.

1. Add `lastUpdated` to every data file entity (blogData, serviceData, countryData, cityData, etc.). Build a build-time check that fails CI if any country/visa/comparison page hasn't been touched in 90 days.
2. Create `src/pages/UpdatesPage.tsx` at `/updates` — chronological feed of every page recently updated, with NewsArticle schema. Pulls from a `lastUpdated` index.
3. Add monthly "What changed in [Month] 2026" digest pages auto-generated at build time at `/updates/:yyyy-mm` — schema as NewsArticle, links to all pages updated that month.
4. Auto-bump `dateModified` whenever data changes for that page.
5. Add a small "Live policy updates" sidebar widget to every country page pulling latest 3 news items relevant to that country.

---

**TASK 13 — Internal Linking & Breadcrumb Graph**

AI engines and Google use internal-link density to understand topical authority.

1. Build `<RelatedPages currentPath />` component — algorithmically surfaces 6 most relevant pages based on shared tags (country, visa type, persona, origin). Mount at bottom of every content page above the form.
2. Build `<EntityCrossLinks term />` — inline component that links any visa-term mention to its DefinedTerm hub page (build a small terminology dictionary mapping "Express Entry" → `/visa-terms/express-entry`, "H-1B" → `/visa-terms/h1b`, etc., and a glossary index at `/visa-terms`).
3. Ensure every new page (origin hub, corridor, comparison, province) cross-links to at least 8 other relevant pages.
4. Add BreadcrumbList schema and visible breadcrumbs to every page (Home → Country → Visa type, etc.).

---

**TASK 14 — Final Verification**

After all tasks, report back on:
1. `npm run build` passes with all pre-rendered routes.
2. Updated route count (should be ~400+ pages: existing 150 + ~250 new from corridors, comparisons, origin hubs, cities, provinces, terms, updates).
3. Sitemap output count and a sample of 20 new URLs.
4. JSON-LD validates on 5 sample pages (origin hub, corridor, comparison, province, retrofitted blog post). Paste schemas.
5. EligibilityForm renders on 100% of content pages. List any exclusions.
6. Lighthouse scores on: HomePage, one corridor page, one comparison page, one origin city page, one province page.
7. List all files created vs modified, grouped by task.
8. Spot-check: open `/move/bangalore-to-toronto/express-entry`, `/compare/express-entry-vs-pnp`, `/usa`, `/from/usa/seattle`, `/canada/ontario` — confirm all render with full content, schema, byline, and form.

Position the entire build as a coherent layer that makes the site rank in AI search engines, get cited as the unbiased source on every immigration query, and convert every visitor through contextual lead forms.
