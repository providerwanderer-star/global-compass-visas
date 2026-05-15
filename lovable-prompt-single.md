You are working on an existing React + Vite + TypeScript site called **4 Aces Visa / Global Compass Visas**. DO NOT rebuild existing pages, components, or data layers. Only ADD or MODIFY what I request below.

**Stack already in place (preserve all of this):**
- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- React Router v6
- react-helmet-async (for SEO metadata)
- React Hook Form + Zod
- TanStack React Query
- Framer Motion
- Supabase (DB + auth)
- react-snap (static pre-rendering on build)

**Existing structure to preserve:**
- `src/pages/` — 32 route pages (HomePage, BlogListPage, NewsHubPage, ExpressEntryLandingPage, country hubs, etc.)
- `src/components/` — shadcn + custom (Navbar, Footer, EligibilityForm, LiveExpressEntry, NewsStripHome)
- `src/data/` — TypeScript data files (blogData, serviceData, countryData, cityData, stateHubData, documentsData, blogEnhancements, nocData, expressEntryDraws, pnpDraws)
- `src/integrations/` — Supabase client
- `scripts/generate-sitemap.mjs` — auto-generates sitemap from data files

**Brand (already configured, preserve):**
- Colors: Navy `--navy` + Gold `--gold` + Cream background
- Fonts: Inter (headings `font-display`), DM Sans (body)
- Logo: `src/assets/logo-icon.png` + "4 Aces Visa" wordmark

**Tools already built (preserve):** CRS Calculator, NOC Finder, Draw History, PNP Tracker, Processing Times, Immigration Cost Calc, In-Demand Jobs.

The goal of this work is to turn the site into a household-name search portal for immigration updates by closing specific SEO, schema, content, and trust-signal gaps. Execute the following 11 tasks in order. After each task, confirm completion and list files created/modified before moving to the next.

---

**TASK 1 — Article + NewsArticle Schema on Blog & News Posts**

On every `/blog/[slug]` and `/news/[slug]` page, add JSON-LD structured data using react-helmet-async.

- Use `NewsArticle` schema for `/news/*` posts, `Article` for `/blog/*` posts
- Pull fields from existing `blogData.ts` + news feed: headline, datePublished, dateModified, author (as Person with name, url to `/authors/[slug]`), publisher (Organization: "4 Aces Visa", logo URL), image, description, mainEntityOfPage, articleSection
- Add BreadcrumbList schema too
- Validate output mentally against schema.org spec

Create a reusable `<ArticleSchema />` component in `src/components/seo/ArticleSchema.tsx` that accepts a post object and renders the JSON-LD in Helmet. Use it in blog + news post templates.

---

**TASK 2 — FAQPage & HowTo Schema**

1. Create `<FAQSchema />` component — takes an array of `{question, answer}` and renders FAQPage JSON-LD. Add it to: FAQ page, every country/visa hub that has an FAQ section, every blog post with FAQs in `blogEnhancements.ts`.
2. Create `<HowToSchema />` component — takes `name`, `description`, and `steps[]`. Add it to tool pages: CRS Calculator (`/crs-calculator`), NOC Finder, Immigration Cost Calculator, Draw History explainer. Each HowTo should describe how to use the tool in 3–5 steps.

---

**TASK 3 — Hreflang Tags**

Add hreflang metadata to every page via react-helmet-async.

Create a `<Hreflang />` component in `src/components/seo/Hreflang.tsx` that accepts the current path and outputs:
```html
<link rel="alternate" hreflang="en" href="https://www.4acesvisa.com{path}" />
<link rel="alternate" hreflang="en-IN" href="https://www.4acesvisa.com/in{path}" />
<link rel="alternate" hreflang="en-CA" href="https://www.4acesvisa.com/ca{path}" />
<link rel="alternate" hreflang="x-default" href="https://www.4acesvisa.com{path}" />
```

For now, the `/in` and `/ca` prefixes can resolve to the same page (we'll localize content later). Wire this into the `<SEO />` wrapper component (built in Task 11) or directly into each page's Helmet. Also update `scripts/generate-sitemap.mjs` to emit hreflang alternates per URL.

---

**TASK 4 — Author System**

Create a new data file `src/data/authorsData.ts` with 3–4 consultant profiles:
```ts
{
  slug: string,
  name: string,
  credentials: string,  // e.g., "Licensed RCIC #R512345"
  title: string,
  bio: string,
  photo: string,
  specializations: string[],
  linkedin?: string,
  twitter?: string,
  publishedSlugs: string[],
}
```

Create:
1. `/authors/[slug]` route with AuthorPage component — shows bio, photo, credentials, published articles grid (cross-ref `blogData`), CTA to book call, Person schema with `sameAs` links
2. `<AuthorByline />` component — circular avatar + "By [Name], Licensed RCIC #XXXXX" + link to author page — embed in blog/news post templates
3. Index page `/authors` listing all consultants

---

**TASK 5 — Breaking News Ticker (Homepage)**

Add a horizontal auto-scrolling news ticker to HomePage, just below the Navbar, above the hero.

- Pulls latest 5 items from the existing news feed (`newsFeed.ts`)
- Auto-scrolls right-to-left at a calm, readable speed
- Pauses on hover
- Each item: red "LIVE" badge + dated timestamp + headline (clickable)
- Responsive: on mobile, swipeable carousel instead of continuous scroll
- Use Framer Motion for smooth animation

Component: `src/components/home/BreakingNewsTicker.tsx`

---

**TASK 6 — Sticky Top Announcement Bar**

Create `<AnnouncementBar />` and mount it above the Navbar globally (sticky with navbar on scroll).

- Left: "Licensed RCIC Consultants · CICC/ICCRC Regulated"
- Right: "Free 60-second Assessment →" CTA linking to `/quiz` or assessment form
- Dismissible (sessionStorage)
- Navy background, gold CTA text

Ensure existing `ProfileBanner` is either removed or repurposed so there's no duplication.

---

**TASK 7 — Newsletter Integration**

Create `<NewsletterSignup />` reusable component. Accept `variant`: `"inline"` | `"footer"` | `"modal"`.

- Email input + submit
- On submit, POST to env var `VITE_NEWSLETTER_WEBHOOK_URL` (placeholder)
- Show success state: "Welcome to the 12,000+ who get weekly immigration updates."
- Use react-hook-form + Zod validation

Embed in: Footer, end of every blog + news post, sidebar of NewsHubPage, exit-intent modal (trigger on mouseout to top of viewport — desktop only).

---

**TASK 8 — RSS & JSON Feeds**

Create a build-time script `scripts/generate-feeds.mjs` (mirror pattern of `generate-sitemap.mjs`) that outputs:
- `public/feed.xml` — RSS 2.0 with 50 latest news + blog items
- `public/feed.json` — JSON Feed 1.1 format
- `public/news-sitemap.xml` — Google News sitemap format (articles ≤ 2 days old, with `<news:news>` tags)

Add to `package.json` postbuild alongside the existing sitemap script. Add `<link rel="alternate" type="application/rss+xml">` to the site `<head>` in the main layout.

---

**TASK 9 — Expert Team Section (Homepage)**

Add a new section to HomePage between "Country Selector" and "Latest News":

- Title: "Meet Your Licensed Immigration Experts"
- 4 consultant cards pulled from `authorsData.ts`
- Each card: headshot, name, credentials, specializations as tag pills, "Book with [Name]" CTA
- Responsive grid: 4 cols desktop → 2 tablet → 1 mobile
- Subtle hover lift + Framer Motion stagger entrance

Component: `src/components/home/ExpertTeamSection.tsx`

---

**TASK 10 — Programmatic SEO Pages**

Generate combinatorial landing pages from existing data to dramatically expand indexed pages.

Pattern: `/immigration/[destination]/[visa-type]/for-[origin]`

Examples:
- `/immigration/canada/express-entry/for-indians`
- `/immigration/canada/pnp/ontario-for-gujaratis`
- `/immigration/usa/h1b/for-indians`
- `/immigration/australia/skilled-migration/for-indians`

Implementation:
1. Create `src/data/programmaticCombos.ts` — array of `{destination, visaType, origin, originRegion?}` objects
2. Dynamic route `/immigration/:destination/:visaType/for-:origin` with template page pulling content blocks
3. Template sections: hero, why-this-combo-matters, eligibility checklist, processing times, typical profile, success story placeholder, FAQs, CTA, related pages
4. Each page: unique title/meta/H1, Article schema, canonical, internal links to 8+ related combos
5. Add all generated URLs to the sitemap script

Start with 30–50 high-value combos (Indians to Canada/Australia/USA, top-5 origin cities × top-3 destinations × top-3 visa types).

---

**TASK 11 — Canonical Tag Audit + Open Graph Images**

1. Create a `<SEO />` wrapper component in `src/components/seo/SEO.tsx` that takes `title`, `description`, `canonical`, `ogImage`, `type` and handles all Helmet tags in one place. Replace inline Helmet usage page-by-page.
2. Ensure every page declares its canonical URL. Audit the 32 pages in `src/pages/` — any missing canonical should fail a build-time check.
3. For dynamic OG images: create a build-time script `scripts/generate-og-images.mjs` using `@vercel/og` or `satori` to generate a branded OG image per blog/news post (navy background, gold accent, headline text, "4 Aces Visa" logo, author name). Output to `public/og/[slug].png`.

---

**FINAL VERIFICATION**

After all 11 tasks complete, run these checks and report back:
1. `npm run build` passes
2. All 32+ existing pages still render (no regressions)
3. Schema validates (paste JSON-LD output from 3 sample pages for review)
4. Lighthouse scores on homepage, one blog post, one tool page
5. Sitemap includes all programmatic URLs + hreflang alternates
6. RSS feed opens without error
7. No console errors in dev mode

Report any files you modified vs. created, so I can review the diff.
