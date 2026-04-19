#!/usr/bin/env node
/**
 * Verifies that react-snap produced static HTML with actual content
 * (not just an empty <div id="root"></div>) for key SEO routes.
 *
 * Run after `npm run build` with: npm run verify:prerender
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const DIST = resolve(process.cwd(), "dist");

// Routes where prerendered HTML is most critical for SEO/AEO
const CRITICAL = [
  "/",
  "/express-entry",
  "/crs-calculator",
  "/quiz",
  "/faq",
  "/blog",
  "/india",
  "/india/canada-pr-india",
  "/services/express-entry",
  "/services/study-visas",
  "/documents/canada-pr",
];

const pathFor = (route) =>
  route === "/"
    ? resolve(DIST, "index.html")
    : resolve(DIST, route.replace(/^\//, ""), "index.html");

const fails = [];
const warns = [];
let passes = 0;

for (const route of CRITICAL) {
  const p = pathFor(route);
  if (!existsSync(p)) {
    fails.push(`${route}  →  MISSING (${p})`);
    continue;
  }
  const html = readFileSync(p, "utf8");

  // 1. Root must not be empty
  if (/<div id="root"><\/div>/.test(html)) {
    fails.push(`${route}  →  <div id="root"> is empty (not prerendered)`);
    continue;
  }
  // 2. H1 must be present in initial HTML
  if (!/<h1[\s>]/i.test(html)) {
    warns.push(`${route}  →  no <h1> in initial HTML`);
  }
  // 3. Meta title should match page (not fall back to site default only)
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1] ?? "";
  if (!title || title.length < 10) {
    warns.push(`${route}  →  weak or missing <title>`);
  }
  passes++;
}

console.log(`\nPrerender verification — ${CRITICAL.length} routes checked`);
console.log(`  ✓ ${passes} passed`);
if (warns.length) {
  console.log(`  ⚠ ${warns.length} warnings:`);
  warns.forEach((w) => console.log(`    - ${w}`));
}
if (fails.length) {
  console.log(`  ✗ ${fails.length} failures:`);
  fails.forEach((f) => console.log(`    - ${f}`));
  process.exit(1);
}
console.log("");
