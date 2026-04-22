#!/usr/bin/env node
/**
 * NOC Coverage Audit
 * ──────────────────
 * Compares src/data/nocData.ts (our curated dataset) against:
 *   A) The full ESDC NOC 2021 v1.0 master list (scripts/noc-source/noc-2021-master.csv)
 *   B) The IRCC Express Entry-eligible subset (TEER 0–3 per FSWP/CEC rules)
 *
 * Reports:
 *   • Total coverage % vs. each universe
 *   • Coverage by TEER and by major group (first 2 digits)
 *   • Top-priority gaps (EE-eligible high-immigration sectors not in our data)
 *   • Codes in our data that DON'T exist in the ESDC master (typos)
 *
 * Exit code 0 always — this is an informational audit, not a gate.
 * Run with: node scripts/audit-noc-coverage.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ── Load master NOC list ─────────────────────────────────────────────────────
const csv = fs.readFileSync(path.join(ROOT, "scripts/noc-source/noc-2021-master.csv"), "utf8");
const masterRows = csv.split("\n").slice(1).filter(Boolean).map((line) => {
  const m = line.match(/^(\d{5}),(\d),"(.+)"$/);
  return m ? { code: m[1], teer: Number(m[2]), title: m[3] } : null;
}).filter(Boolean);

const masterByCode = new Map(masterRows.map((r) => [r.code, r]));
const eeEligibleMaster = masterRows.filter((r) => r.teer <= 3);

// ── Load our curated NOC data via on-the-fly TS transpile ────────────────────
async function loadTs(rel) {
  const src = fs.readFileSync(path.join(ROOT, rel), "utf8");
  const out = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const tmp = path.join(ROOT, ".cache-audit");
  fs.mkdirSync(tmp, { recursive: true });
  const file = path.join(tmp, path.basename(rel).replace(/\.ts$/, ".mjs"));
  fs.writeFileSync(file, out);
  return import(pathToFileURL(file).href + `?t=${Date.now()}`);
}
const { nocData } = await loadTs("src/data/nocData.ts");
const ourCodes = new Set(nocData.map((n) => n.code));

// ── Audit A: full ESDC universe ──────────────────────────────────────────────
const missingFromMaster = nocData.filter((n) => !masterByCode.has(n.code));
const fullCoverage = (ourCodes.size / masterRows.length) * 100;
const eeCovered = eeEligibleMaster.filter((r) => ourCodes.has(r.code)).length;
const eeCoverage = (eeCovered / eeEligibleMaster.length) * 100;

// ── Coverage by TEER ─────────────────────────────────────────────────────────
const byTeer = [0, 1, 2, 3, 4, 5].map((teer) => {
  const totalInTeer = masterRows.filter((r) => r.teer === teer);
  const haveInTeer = totalInTeer.filter((r) => ourCodes.has(r.code)).length;
  return { teer, total: totalInTeer.length, have: haveInTeer, pct: (haveInTeer / totalInTeer.length) * 100 };
});

// ── Coverage by major group (first 2 digits) ─────────────────────────────────
const majorGroupNames = {
  "00": "Legislative & senior managers",
  "01": "Specialized middle managers (BFA)",
  "10": "Specialized middle mgmt (admin/finance)",
  "11": "Professional finance & business",
  "12": "Admin & financial supervisors",
  "13": "Admin & transport logistics",
  "14": "Admin & financial support",
  "20": "Specialized mgmt (eng/sci/IT)",
  "21": "Professional natural & applied sciences",
  "22": "Technical natural & applied sciences",
  "30": "Specialized mgmt (healthcare)",
  "31": "Professional health occupations",
  "32": "Technical health occupations",
  "33": "Assisting health-services occupations",
  "40": "Mgmt (education/social/govt)",
  "41": "Professional law/education/social",
  "42": "Front-line public protection & paraprofessionals",
  "43": "Assisting in education/legal/protection",
  "44": "Care providers & public-protection support",
  "45": "Student monitors, crossing guards",
  "50": "Specialized mgmt (art/culture/sport)",
  "51": "Professional art & culture",
  "52": "Technical art/culture/sport",
  "53": "Occupations in art/culture/sport",
  "54": "Support occupations in sport",
  "55": "Support in art & culture",
  "60": "Mgmt retail/wholesale/customer",
  "62": "Retail sales supervisors & specialists",
  "63": "Sales & service occupations",
  "64": "Sales/service representatives",
  "65": "Sales/service support",
  "70": "Mgmt trades & transportation",
  "72": "Technical trades & transport officers",
  "73": "General trades",
  "74": "Mail/message distribution & maintenance",
  "75": "Helpers, labourers, transport drivers",
  "80": "Mgmt production & agriculture",
  "82": "Supervisors natural-resources/agri",
  "83": "Natural-resources & related production",
  "84": "Workers natural-resources/agri",
  "85": "Harvesting/landscaping labourers",
  "90": "Mgmt manufacturing & utilities",
  "92": "Manufacturing/utilities supervisors",
  "93": "Central control & process operators",
  "94": "Machine operators/assemblers",
  "95": "Labourers manufacturing/utilities",
};
const byMajor = {};
for (const r of masterRows) {
  const mg = r.code.slice(0, 2);
  if (!byMajor[mg]) byMajor[mg] = { total: 0, have: 0, eeTotal: 0, eeHave: 0 };
  byMajor[mg].total++;
  if (r.teer <= 3) byMajor[mg].eeTotal++;
  if (ourCodes.has(r.code)) {
    byMajor[mg].have++;
    if (r.teer <= 3) byMajor[mg].eeHave++;
  }
}

// ── Priority gaps: EE-eligible occupations NOT in our data ───────────────────
const eeGaps = eeEligibleMaster.filter((r) => !ourCodes.has(r.code));

// High-immigration major groups worth prioritizing in our curation
const PRIORITY_GROUPS = ["21", "22", "31", "32", "33", "41", "42", "44", "62", "63", "72", "73", "82", "83", "92", "93"];
const priorityGaps = eeGaps.filter((r) => PRIORITY_GROUPS.includes(r.code.slice(0, 2)));

// ── Report ───────────────────────────────────────────────────────────────────
console.log("\n📋 4 Aces Visa — NOC Coverage Audit");
console.log("══════════════════════════════════════════════════════════");
console.log(`Curated NOCs              : ${ourCodes.size}`);
console.log(`ESDC NOC 2021 master      : ${masterRows.length} unit groups`);
console.log(`IRCC EE-eligible (T0-T3)  : ${eeEligibleMaster.length} unit groups`);
console.log("──────────────────────────────────────────────────────────");
console.log(`Coverage vs. full master  : ${fullCoverage.toFixed(1)}%   (${ourCodes.size}/${masterRows.length})`);
console.log(`Coverage vs. EE-eligible  : ${eeCoverage.toFixed(1)}%   (${eeCovered}/${eeEligibleMaster.length})`);

console.log("\n📊 Coverage by TEER level");
console.log("──────────────────────────────────────────────────────────");
for (const t of byTeer) {
  const bar = "█".repeat(Math.round(t.pct / 5)).padEnd(20, "░");
  const flag = t.teer <= 3 ? "EE" : "  ";
  console.log(`  TEER ${t.teer} ${flag}  ${bar} ${t.pct.toFixed(0).padStart(3)}%   ${t.have}/${t.total}`);
}

console.log("\n🏭 Coverage by major group (EE-eligible only, sorted by gap size)");
console.log("──────────────────────────────────────────────────────────");
const ranked = Object.entries(byMajor)
  .filter(([, v]) => v.eeTotal > 0)
  .map(([mg, v]) => ({ mg, name: majorGroupNames[mg] || "?", ...v, gap: v.eeTotal - v.eeHave }))
  .sort((a, b) => b.gap - a.gap);
for (const g of ranked.slice(0, 25)) {
  const pct = ((g.eeHave / g.eeTotal) * 100).toFixed(0);
  const status = g.eeHave === 0 ? "❌" : g.gap === 0 ? "✅" : "⚠️ ";
  console.log(
    `  ${status} ${g.mg}  ${g.name.padEnd(48)}  ${String(g.eeHave).padStart(2)}/${String(g.eeTotal).padStart(2)}  (${pct.padStart(3)}%)`
  );
}

console.log(`\n⚡ Top-priority EE gaps (${priorityGaps.length} occupations in core immigration major groups)`);
console.log("──────────────────────────────────────────────────────────");
for (const g of priorityGaps.slice(0, 30)) {
  console.log(`  ${g.code}  T${g.teer}  ${g.title}`);
}
if (priorityGaps.length > 30) console.log(`  … and ${priorityGaps.length - 30} more`);

if (missingFromMaster.length) {
  console.log(`\n🚨 Codes in nocData.ts NOT present in ESDC master (typos?)`);
  console.log("──────────────────────────────────────────────────────────");
  for (const n of missingFromMaster) console.log(`  ${n.code}  "${n.title}"`);
}

// ── Write JSON artifact for tooling ──────────────────────────────────────────
const outPath = path.join(ROOT, "scripts/noc-source/coverage-report.json");
fs.writeFileSync(outPath, JSON.stringify({
  generatedAt: new Date().toISOString(),
  curated: ourCodes.size,
  esdcTotal: masterRows.length,
  eeEligibleTotal: eeEligibleMaster.length,
  fullCoveragePct: Number(fullCoverage.toFixed(2)),
  eeCoveragePct: Number(eeCoverage.toFixed(2)),
  byTeer,
  byMajor: ranked,
  eeGaps: eeGaps.map((r) => ({ code: r.code, teer: r.teer, title: r.title })),
  priorityGaps: priorityGaps.map((r) => ({ code: r.code, teer: r.teer, title: r.title })),
  missingFromMaster: missingFromMaster.map((n) => ({ code: n.code, title: n.title })),
}, null, 2));

console.log(`\n✓ Full report written to ${path.relative(ROOT, outPath)}`);

// ── Mirror artifacts into public/admin so the in-app admin page can fetch them ─
const publicDir = path.join(ROOT, "public/admin");
fs.mkdirSync(publicDir, { recursive: true });
fs.copyFileSync(outPath, path.join(publicDir, "coverage-report.json"));
fs.copyFileSync(
  path.join(ROOT, "scripts/noc-source/noc-2021-master.csv"),
  path.join(publicDir, "noc-2021-master.csv"),
);
console.log(`✓ Mirrored to public/admin/ for in-app admin viewer`);
console.log("✓ Done.\n");

fs.rmSync(path.join(ROOT, ".cache-audit"), { recursive: true, force: true });