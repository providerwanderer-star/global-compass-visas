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

const indianCities = extractQuotedList(
  resolve(root, "src/data/cityData.ts"),
  "indianCities"
).map(toCitySlug);
const canadianCities = extractQuotedList(
  resolve(root, "src/data/cityData.ts"),
  "canadianCities"
).map(toCitySlug);

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
add("/express-entry", 0.9, "weekly");

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

// City pages (if routed via /city/:slug — the route exists in App.tsx)
for (const slug of [...indianCities, ...canadianCities]) add(`/city/${slug}`, 0.7);

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
