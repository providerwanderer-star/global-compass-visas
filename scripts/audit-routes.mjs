// Improved route audit — handles motion.h1, dynamic Helmet props, og/twitter cards
import fs from 'fs';
import path from 'path';

const SRC = 'src/pages';
const app = fs.readFileSync('src/App.tsx', 'utf8');
const routeRegex = /<Route\s+path="([^"]+)"\s+element=\{<(\w+)/g;
const routes = [];
let m;
while ((m = routeRegex.exec(app))) routes.push({ path: m[1], component: m[2] });

const results = [];
for (const r of routes) {
  const file = path.join(SRC, `${r.component}.tsx`);
  if (!fs.existsSync(file)) { results.push({ ...r, missing: true }); continue; }
  const src = fs.readFileSync(file, 'utf8');

  // Match <title>literal</title>, <title>{expr}</title>, <title>{`tpl ${x}`}</title>
  const titleM = src.match(/<title>([^<{][^<]*)<\/title>/);
  const titleTpl = src.match(/<title>\s*\{[\s\S]*?\}\s*<\/title>/);
  const title = titleM ? titleM[1].trim() : titleTpl ? `[dyn]` : null;

  const canM = src.match(/rel="canonical"\s+href=(?:"([^"]+)"|\{([^}]+)\})/);
  const canonical = canM ? (canM[1] ?? `[dyn]`) : null;

  const descM = src.match(/name="description"\s+content=(?:"([^"]+)"|\{([^}]+)\})/);
  const description = descM ? (descM[1] ?? `[dyn]`) : null;

  // Match <h1>, <motion.h1>, <h1 attr=...>, <motion.h1 attr=...>
  const h1Match = src.match(/<(?:motion\.)?h1[\s>]/);
  const hasH1 = !!h1Match;

  // OG + Twitter
  const hasOgTitle = /property="og:title"/.test(src);
  const hasOgDesc  = /property="og:description"/.test(src);
  const hasOgUrl   = /property="og:url"/.test(src);
  const hasTwCard  = /name="twitter:card"/.test(src);

  results.push({ ...r, title, canonical, description, hasH1, hasOgTitle, hasOgDesc, hasOgUrl, hasTwCard, dynamic: r.path.includes(':') });
}

const ok = '✓', bad = '✗';
console.log('# Route Audit v2 (motion-aware)\n');
console.log(`Total routes: ${results.length}\n`);

const missing = results.filter(r => !r.title || !r.canonical || !r.description || !r.hasH1);
console.log(`## Missing core SEO fields (${missing.length})`);
if (!missing.length) console.log('  ✓ all routes have title + canonical + description + H1');
else missing.forEach(r => {
  const gaps = [];
  if (!r.title) gaps.push('title'); if (!r.canonical) gaps.push('canonical');
  if (!r.description) gaps.push('description'); if (!r.hasH1) gaps.push('h1');
  console.log(`  ${bad} ${r.path}  →  ${r.component}  missing: ${gaps.join(', ')}`);
});

const ogGaps = results.filter(r => !r.hasOgTitle || !r.hasOgDesc || !r.hasOgUrl || !r.hasTwCard);
console.log(`\n## Missing social tags (${ogGaps.length} routes)`);
ogGaps.forEach(r => {
  const gaps = [];
  if (!r.hasOgTitle) gaps.push('og:title'); if (!r.hasOgDesc) gaps.push('og:description');
  if (!r.hasOgUrl) gaps.push('og:url'); if (!r.hasTwCard) gaps.push('twitter:card');
  console.log(`  ${bad} ${r.path.padEnd(35)} ${r.component.padEnd(28)} missing: ${gaps.join(', ')}`);
});

console.log(`\n## All clear summary`);
const clean = results.filter(r => r.title && r.canonical && r.description && r.hasH1);
console.log(`  Core SEO complete: ${clean.length}/${results.length}`);
const ogClean = results.filter(r => r.hasOgTitle && r.hasOgDesc && r.hasOgUrl && r.hasTwCard);
console.log(`  Social tags complete: ${ogClean.length}/${results.length}`);
