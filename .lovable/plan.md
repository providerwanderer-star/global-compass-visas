
## Part A — Why /news is broken, and the fix

### Root cause
In the last security pass I locked `immigration-news` behind `getClaims()` and rejected `role === "anon"`. But the news page is public, so browsers call it with the anon JWT → 401 → the client shows "Failed to send a request." That's the immediate outage. The static fallback ("Draw #344") is 2 months stale because nothing has ever actually written new draws — the current function only *searches* IRCC via Firecrawl at request-time and returns whatever comes back; it never upserts into the `express_entry_draws` or `pnp_draws` tables. So the "live" feed on the site has always been reading the seeded static data.

### Rearchitecture (the only way this actually works)

```text
[pg_cron every 30 min]
   -> ingest-immigration-draws (edge fn, service-role writes)
        - Firecrawl scrape canada.ca EE rounds page  -> upsert express_entry_draws
        - Firecrawl scrape each provincial PNP page  -> upsert pnp_draws
        - Firecrawl search IRCC newsroom last 7d     -> upsert immigration_news (NEW table)
        - write ingestion_runs row (status, counts, error)
        - on success: call regenerate-sitemap + indexnow-ping with changed URLs
        - on any-source failure: enqueue alert

[public GET /functions/v1/immigration-news]  (verify_jwt=false, reads DB only, no Firecrawl)
   -> returns latest N rows from the 3 tables, merged + sorted, with `lastIngestedAt`

[public GET /functions/v1/draws-json]  (verify_jwt=false, cached 15min)
   -> clean JSON: {draws: [...], pnp: [...], lastUpdated, sources}
   -> referenced in llms.txt

[pg_cron every 1h]
   -> ingestion-health-check
        - if max(ingestion_runs.finished_at where status='ok') < now() - 90 min
        - fire Resend email to sahil280389@gmail.com AND POST to ALERT_WEBHOOK_URL
```

### DB migration (Part A)
- New table `immigration_news` (title, summary, source_url, source_name, published_at, category).
- New table `ingestion_runs` (source, status, items_upserted, error_message, started_at, finished_at).
- RLS: public SELECT on both; writes service_role only. Grants included.
- Backfill of `express_entry_draws` since Draw #344 and PNP rounds since Sep 2026: I'll run the ingestion function once against a wider Firecrawl date range (`tbs: qdr:y`) to pull historical rounds from canada.ca and CIC News, then dedupe by draw_number/date+province. **Flag: any round I can't verify against canada.ca I will *not* insert** — I'll list them in the run output for you to review rather than fabricate.

### UX degradation
NewsHubPage: swap the "Could not load latest external news" banner for a `FreshnessBanner`-style strip that reads `lastIngestedAt`. If > 2 hours old → visible amber "Data may be delayed — last synced X ago" bar. If fetch fails entirely → red bar with retry.

### Alerts
- New secret `ALERT_WEBHOOK_URL` (I'll ask you to paste it via add_secret — Slack/Discord webhook URL).
- Resend: check if a Resend connector is linked; if not, I'll flag and use webhook-only until you connect it. (You said "both" — I need the webhook URL and either Resend connector or confirmation to skip email until Resend is linked.)

---

## Part B — OINP overhaul

### Closure notices
I'll add a reusable `<StreamClosedNotice />` component (amber banner, links to new OWP page) and drop it on top of:
- `src/pages/PNPTrackerPage.tsx` (Ontario section)
- Any page in `src/data/pnpDraws.ts` rendering historical Ontario streams
- `src/data/serviceData.ts` / `src/data/comparisonData.ts` Ontario entries
- `src/pages/StateHubPage.tsx` when `state === "ontario"`
- Blog posts in `src/data/blogData.ts` mentioning the 8 legacy streams (grep + add banner at top of `BlogPostPage.tsx` when slug is in a closed-stream list)
- News feed items whose `title` matches legacy stream names

Legacy pages stay live for SEO (as you said).

### New page
`/pnp/ontario/workforce-priority-stream` — new route in App.tsx, new file `src/pages/OntarioWorkforcePriorityStreamPage.tsx`. Same template as `ExpressEntryLandingPage.tsx`: hero, 3-pathway cards (Skilled TEER 0–3, Essential TEER 4–5, Self-Employed Physicians), job-offer requirement callout, comparison table (old 8 streams → new pathway mapping), EOI timeline (states "expected later summer 2026, not yet open"), CRS implications, FAQ. Schemas: Service + FAQPage + BreadcrumbList. Live "last updated" from `ingestion_runs`.

### Content sourcing
I will draft the page from the facts in your prompt + verifiable ontario.ca content pulled via Firecrawl. Anything I can't verify I'll leave as "official details pending — check ontario.ca/OINP" rather than invent specifics.

---

## Part C — Automation + AEO

- `secrets--generate_secret` for `INDEXNOW_KEY` (32 chars).
- New public file `public/{INDEXNOW_KEY}.txt` containing the key (IndexNow verification).
- New edge fn `indexnow-notify` called at end of successful ingestion with changed URLs → POST to `https://api.indexnow.org/indexnow`.
- New edge fn `draws-json` returning documented JSON at `https://<host>/functions/v1/draws-json` (I can't create `/api/draws.json` at the app root — this is a Vite SPA, not Next; I'll document the functions URL in llms.txt and add a client-side redirect if you want a prettier alias later).
- Update `public/llms.txt` and `public/llms-full.txt`: Garg Brothers branding sweep verify, OINP overhaul summary, draws-json endpoint reference, "Last major update: 2026-07-03".
- `<LastUpdatedStamp />` component on `/news` and the new OWP page, reading `lastIngestedAt`.
- Bing Webmaster Tools: I'll add the verification meta tag placeholder in `index.html` and give you the exact URL + steps to submit. Actual submission requires your Microsoft account login — I can't do that from here.

---

## What I need from you before I start
1. **Webhook URL** for alerts (Slack/Discord incoming webhook). If you don't have one yet, I'll wire the code and you paste later.
2. **Resend**: confirm I should link the Resend connector now, or skip email alerts until you link it.
3. **Bing site verification**: OK to just prep the meta tag and hand you the submit steps? (I have no way to log into your MS account.)

If you say "just go, use the webhook path only for now, skip Resend, prep Bing steps" I'll start immediately. Otherwise I'll wait for the three answers above so I don't have to rework files.
