#!/usr/bin/env node
/**
 * Regenerates public/sitemap.xml from the app's data files.
 * Run with: npm run generate:sitemap
 *
 * Enumerates every route including dynamic ones (blog posts, services,
 * documents, cities, state hubs, country pages) so AI engines and search
 * crawlers see the full surface area of the site.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const SITE = "https://www.4acesvisa.com";

// Helper: extract slugs from a TS data file via regex (no compile needed)
function extractSlugs(filePath) {
  const src = readFileSync(filePath, "utf8");
  const matches = [...src.matchAll(/slug:\s*"([a-z0-9-]+)"/g)];
  return [...new Set(matches.map((m) => m[1]))];
}

function extractQuotedList(filePath, arrayName) {
  const src = readFileSync(filePath, "utf8");
  const re = new RegExp(
    `const\\s+${arrayName}[^=]*=\\s*\\[([\\s\\S]*?)\\]`,
    "m"
  );
  const block = src.match(re)?.[1] ?? "";
  return [...block.matchAll(/"([^"]+)"/g)]
    .map((m) => m[1])
    .filter((name) => !/^[A-Z][a-z]+[A-Z]/.test(name)); // skip non-city tokens
}

const toCitySlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

const blogSlugs = extractSlugs(resolve(root, "src/data/blogData.ts"));
const serviceSlugs = extractSlugs(resolve(root, "src/data/serviceData.ts"));
const documentSlugs = extractSlugs(resolve(root, "src/data/documentsData.ts"));
const stateSlugs = extractSlugs(resolve(root, "src/data/stateHubData.ts"));
const originSlugs = extractSlugs(resolve(root, "src/data/geoOriginData.ts"));
const crsBandSlugs = extractSlugs(resolve(root, "src/data/crsBandData.ts"));
const settlementSlugs = extractSlugs(resolve(root, "src/data/settlementData.ts"));
const comparisonSlugs = extractSlugs(resolve(root, "src/data/comparisonData.ts"));

// Wave 2 — Origin geo (USA/UK/Australia) and corridor pages
function extractOriginCityPairs(filePath) {
  const src = readFileSync(filePath, "utf8");
  const re = /\{\s*slug:\s*"([a-z0-9-]+)",\s*name:\s*"[^"]+",\s*countrySlug:\s*"([a-z]+)"/g;
  const out = [];
  for (const m of src.matchAll(re)) out.push({ country: m[2], city: m[1] });
  return out;
}
let originCountrySlugs = ["usa", "uk", "australia"];
let originCityPairs = [];
try {
  originCityPairs = extractOriginCityPairs(resolve(root, "src/data/originGeoData.ts"));
} catch {
  originCityPairs = [];
}

// Wave 3 — Move corridor pages: /move/:corridor/:program
function extractMoveCorridorPairs(filePath) {
  const src = readFileSync(filePath, "utf8");
  const out = [];
  const blockRe = /slug:\s*"([a-z0-9-]+)",[\s\S]*?programs:\s*\[([^\]]+)\]/g;
  for (const m of src.matchAll(blockRe)) {
    const slug = m[1];
    const programs = [...m[2].matchAll(/"([a-z-]+)"/g)].map((x) => x[1]);
    for (const p of programs) out.push({ corridor: slug, program: p });
  }
  return out;
}
let moveCorridorPairs = [];
try {
  moveCorridorPairs = extractMoveCorridorPairs(resolve(root, "src/data/moveCorridorData.ts"));
} catch {
  moveCorridorPairs = [];
}

// Wave 4 — Occupation × Province pages: /jobs/:occupation/:province
function extractOccupationProvincePairs(filePath) {
  const src = readFileSync(filePath, "utf8");
  const occRe = /OCCUPATIONS:\s*Record<OccupationSlug,\s*Occupation>\s*=\s*\{([\s\S]*?)\n\};/;
  const provRe = /PROVINCES:\s*Record<ProvinceSlug,\s*Province>\s*=\s*\{([\s\S]*?)\n\};/;
  const occBlock = src.match(occRe)?.[1] ?? "";
  const provBlock = src.match(provRe)?.[1] ?? "";
  const occs = [...occBlock.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
  const provs = [...provBlock.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
  const out = [];
  for (const o of occs) for (const p of provs) out.push({ occupation: o, province: p });
  return out;
}
let occupationProvincePairs = [];
try {
  occupationProvincePairs = extractOccupationProvincePairs(
    resolve(root, "src/data/occupationProvinceData.ts"),
  );
} catch {
  occupationProvincePairs = [];
}

// Wave 5 — Study field × Province pages: /study/:field/:province
function extractStudyFieldPairs(fieldsPath, occProvPath) {
  const fSrc = readFileSync(fieldsPath, "utf8");
  const fields = [
    ...fSrc.matchAll(/slug:\s*"([a-z0-9-]+)",\s*\n?\s*name:/g),
  ].map((m) => m[1]);
  const oSrc = readFileSync(occProvPath, "utf8");
  const provBlock = oSrc.match(/PROVINCES:\s*Record<ProvinceSlug,\s*Province>\s*=\s*\{([\s\S]*?)\n\};/)?.[1] ?? "";
  const provs = [...provBlock.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
  const out = [];
  for (const f of fields) for (const p of provs) out.push({ field: f, province: p });
  return out;
}
let studyFieldPairs = [];
try {
  studyFieldPairs = extractStudyFieldPairs(
    resolve(root, "src/data/studyFieldData.ts"),
    resolve(root, "src/data/occupationProvinceData.ts"),
  );
} catch {
  studyFieldPairs = [];
}

// Wave 6 — Francophone pathways + Sponsorship
let francophoneSlugs = [];
let sponsorshipSlugs = [];
try {
  francophoneSlugs = extractSlugs(resolve(root, "src/data/francophoneData.ts"));
} catch {}
try {
  sponsorshipSlugs = extractSlugs(resolve(root, "src/data/sponsorshipData.ts"));
} catch {}

// Wave 7 — Refusal pages + City × Industry pages
let refusalSlugs = [];
let cityIndustryPairs = [];
try {
  refusalSlugs = extractSlugs(resolve(root, "src/data/refusalData.ts"));
} catch {}
try {
  const src = readFileSync(resolve(root, "src/data/cityIndustryData.ts"), "utf8");
  // Match objects with city + industry keys
  const re = /\{\s*city:\s*"([a-z-]+)"[^}]*?industry:\s*"([a-z-]+)"/g;
  for (const m of src.matchAll(re)) cityIndustryPairs.push({ city: m[1], industry: m[2] });
} catch {}

// Pull NOC codes from the local nocData.ts as a build-time fallback. The
// live edge function (`/functions/v1/sitemap`) supersedes this with the full
// Supabase-driven list and per-row lastmod dates.
function extractNocCodes(filePath) {
  const src = readFileSync(filePath, "utf8");
  const matches = [...src.matchAll(/code:\s*"(\d{4,5})"/g)];
  return [...new Set(matches.map((m) => m[1]))];
}
let nocCodes = [];
try {
  nocCodes = extractNocCodes(resolve(root, "src/data/nocData.ts"));
} catch {
  nocCodes = [];
}

const indianCities = extractQuotedList(
  resolve(root, "src/data/cityData.ts"),
  "indianCities"
).map(toCitySlug);
const canadianCities = extractQuotedList(
  resolve(root, "src/data/cityData.ts"),
  "canadianCities"
).map(toCitySlug);

// Phase 6 — pull NEW PR-intent city slugs added in cityPRContent.ts
function extractPRCitySlugs(filePath) {
  const src = readFileSync(filePath, "utf8");
  // Match both unquoted (TS) and quoted (JSON-style) `slug` keys.
  return [
    ...src.matchAll(/"?slug"?\s*:\s*"([a-z0-9-]+)"/g),
  ].map((m) => m[1]);
}
let prCitySlugs = [];
try {
  prCitySlugs = extractPRCitySlugs(resolve(root, "src/data/cityPRContent.ts"));
} catch {
  prCitySlugs = [];
}

// US PR-intent city slugs (cityUSContent.ts)
let usCitySlugs = [];
try {
  usCitySlugs = extractPRCitySlugs(resolve(root, "src/data/cityUSContent.ts"));
} catch {
  usCitySlugs = [];
}

const today = new Date().toISOString().slice(0, 10);

// Build URL entries
const urls = [];
const add = (path, priority = 0.7, changefreq = "monthly") =>
  urls.push({ loc: `${SITE}${path}`, lastmod: today, changefreq, priority });

// Core
add("/", 1.0, "weekly");
add("/contact", 0.8);
add("/quiz", 0.8);
add("/crs-calculator", 0.9);
add("/faq", 0.9, "weekly");
add("/blog", 0.9, "weekly");
add("/compare", 0.7);
for (const slug of comparisonSlugs) add(`/compare/${slug}`, 0.85, "monthly");
add("/express-entry", 0.9, "weekly");

// Wave 2 — Origin country hubs + city corridors
for (const slug of originCountrySlugs) add(`/${slug}`, 0.9, "weekly");
for (const { country, city } of originCityPairs) add(`/from/${country}/${city}`, 0.8, "monthly");

// Wave 3 — Move corridor pages
for (const { corridor, program } of moveCorridorPairs) add(`/move/${corridor}/${program}`, 0.8, "monthly");

// Wave 4 — Occupation × Province pages
for (const { occupation, province } of occupationProvincePairs) add(`/jobs/${occupation}/${province}`, 0.8, "monthly");

// Wave 5 — Study field × Province pages
for (const { field, province } of studyFieldPairs) add(`/study/${field}/${province}`, 0.8, "monthly");

// Wave 6 — French pathways + Family sponsorship
for (const slug of francophoneSlugs) add(`/francophone/${slug}`, 0.85, "monthly");
for (const slug of sponsorshipSlugs) add(`/sponsor/${slug}`, 0.85, "monthly");

// Wave 7 — Refusal + City × Industry
for (const slug of refusalSlugs) add(`/refusal/${slug}`, 0.9, "monthly");
for (const { city, industry } of cityIndustryPairs) add(`/city/${city}/${industry}`, 0.8, "monthly");

// India hub
add("/india", 0.9, "weekly");
add("/india/study-permit-india", 0.8);
add("/india/work-permit-india", 0.8);
add("/india/canada-pr-india", 0.8);

// State hubs (india + canada)
for (const slug of stateSlugs) {
  if (["gujarat", "haryana", "rajasthan"].includes(slug)) add(`/india/${slug}`, 0.8);
  else add(`/canada/${slug}`, 0.8);
}

// Country pages
for (const c of ["canada", "australia", "germany", "uk"]) add(`/immigration/${c}`, 0.9, "weekly");

// Services
for (const slug of serviceSlugs) add(`/services/${slug}`, 0.8);

// Documents
for (const slug of documentSlugs) add(`/documents/${slug}`, 0.8);

// Blog posts
for (const slug of blogSlugs) add(`/blog/${slug}`, 0.7);

// Geo sub-routes explicitly declared in App.tsx
const geoRoutes = [
  "/australia/skilled-migration",
  "/australia/subclass-189",
  "/australia/subclass-190",
  "/australia/subclass-491",
  "/uk/skilled-worker",
  "/uk/graduate-route",
  "/germany/chancenkarte",
  "/germany/eu-blue-card",
];
for (const r of geoRoutes) add(r, 0.8);

// Programmatic GEO: Canada PR by country of origin
for (const slug of originSlugs) add(`/canada-pr-from/${slug}`, 0.85, "weekly");

// Programmatic GEO: Canada PR by CRS score band
for (const slug of crsBandSlugs) add(`/canada-pr/crs/${slug}`, 0.85, "weekly");

// Settlement / Move-and-Settle hub
add("/settle-in-canada", 0.9, "weekly");
for (const slug of settlementSlugs) add(`/settle-in-canada/${slug}`, 0.8);

// City pages (if routed via /city/:slug — the route exists in App.tsx)
for (const slug of [...indianCities, ...canadianCities]) add(`/city/${slug}`, 0.7);

// Phase 6 — new PR-intent city pages (changefreq monthly, priority 0.7)
for (const slug of prCitySlugs) add(`/city/${slug}`, 0.7);

// US PR-intent city pages — H-1B / green-card-backlog audience (changefreq monthly, priority 0.7)
for (const slug of usCitySlugs) add(`/city/${slug}`, 0.7);

// NOC detail pages — high-traffic SEO surface
for (const code of nocCodes) add(`/noc/${code}`, 0.75);

// AI / live data pages
add("/for-ai", 0.5, "weekly");
add("/express-entry/draws", 0.95, "daily");
add("/pnp-tracker", 0.9, "daily");
add("/noc-finder", 0.9, "weekly");
add("/news", 0.9, "daily");
add("/processing-times", 0.85, "weekly");

// Generate XML
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(
    (u) =>
      `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`
  ),
  "</urlset>",
  "",
].join("\n");

writeFileSync(resolve(root, "public/sitemap.xml"), xml, "utf8");
console.log(`✓ Wrote sitemap.xml with ${urls.length} URLs`);
