#!/usr/bin/env node
/**
 * Cross-validate NOC, Express Entry draws, In-Demand Jobs, and PNP draws.
 * Reports:
 *   - Duplicate / malformed NOC codes
 *   - In-demand jobs whose `noc` doesn't exist in nocData
 *   - In-demand jobs whose teer/industry disagree with nocData
 *   - EE category-based draws with no NOC mapped to that category
 *   - PNP draws missing required fields or with unparseable dates
 *   - Mismatched eeEligible flags (TEER 4/5 must be false; in-demand jobs
 *     listing Express Entry pathways must reference EE-eligible NOCs)
 *
 * Exit code 1 on any error so it can gate CI.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const require = createRequire(import.meta.url);

/** Transpile a .ts module on the fly and import it. */
async function loadTs(relPath) {
  const abs = path.join(ROOT, relPath);
  const src = fs.readFileSync(abs, "utf8");
  const out = ts.transpileModule(src, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText;
  const tmp = path.join(ROOT, ".cache-validate");
  fs.mkdirSync(tmp, { recursive: true });
  const file = path.join(tmp, path.basename(relPath).replace(/\.ts$/, ".mjs"));
  fs.writeFileSync(file, out);
  return import(pathToFileURL(file).href + `?t=${Date.now()}`);
}

const errors = [];
const warnings = [];
const err = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);

const [{ nocData }, { expressEntryDraws, drawCategories }, { inDemandJobs }, { pnpDraws }] =
  await Promise.all([
    loadTs("src/data/nocData.ts"),
    loadTs("src/data/expressEntryDraws.ts"),
    loadTs("src/data/inDemandJobs.ts"),
    loadTs("src/data/pnpDraws.ts"),
  ]);

// ─────────────────────────────────────────────────────────────────────────────
// 1. NOC integrity
// ─────────────────────────────────────────────────────────────────────────────
const nocByCode = new Map();
const nocCodeRe = /^\d{5}$/;
for (const n of nocData) {
  if (!nocCodeRe.test(n.code)) err(`NOC: invalid code format "${n.code}" on "${n.title}"`);
  if (nocByCode.has(n.code)) err(`NOC: duplicate code ${n.code} ("${n.title}" vs "${nocByCode.get(n.code).title}")`);
  nocByCode.set(n.code, n);

  // TEER 4/5 cannot be EE-eligible (FSWP/CEC/FST all require TEER 0–3)
  if ((n.teer === 4 || n.teer === 5) && n.eeEligible) {
    err(`NOC ${n.code} "${n.title}" — TEER ${n.teer} cannot be eeEligible: true`);
  }
  // TEER 0–3 should normally be EE eligible — flag the inverse as a warning
  if (n.teer <= 3 && !n.eeEligible) {
    warn(`NOC ${n.code} "${n.title}" — TEER ${n.teer} marked eeEligible: false (verify)`);
  }
  if (!Array.isArray(n.topProvinces) || n.topProvinces.length === 0) {
    err(`NOC ${n.code} — topProvinces is empty`);
  }
  if (!n.salaryRange || !/\$/.test(n.salaryRange)) {
    err(`NOC ${n.code} — salaryRange missing or malformed: "${n.salaryRange}"`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. In-demand jobs ↔ NOC
// ─────────────────────────────────────────────────────────────────────────────
const jobBySlug = new Map();
for (const j of inDemandJobs) {
  if (jobBySlug.has(j.slug)) err(`InDemandJobs: duplicate slug "${j.slug}"`);
  jobBySlug.set(j.slug, j);

  const noc = nocByCode.get(j.noc);
  if (!noc) {
    err(`InDemandJobs "${j.slug}" — NOC ${j.noc} not present in nocData.ts`);
    continue;
  }
  if (noc.teer !== j.teer) {
    err(`InDemandJobs "${j.slug}" — TEER mismatch (job=${j.teer}, NOC ${j.noc}=${noc.teer})`);
  }
  // Salary range sanity (low ≤ high)
  if (j.salaryLow >= j.salaryHigh) {
    err(`InDemandJobs "${j.slug}" — salaryLow ${j.salaryLow} ≥ salaryHigh ${j.salaryHigh}`);
  }
  // EE-pathway jobs must point to an EE-eligible NOC
  const hasEEPath = j.pathways.some((p) => /^Express Entry|^Category-based/.test(p));
  if (hasEEPath && !noc.eeEligible) {
    err(`InDemandJobs "${j.slug}" — lists EE pathway but NOC ${j.noc} is eeEligible: false`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Express Entry draws
// ─────────────────────────────────────────────────────────────────────────────
const drawNumbers = new Set();
const seenCategories = new Set();
for (const d of expressEntryDraws) {
  if (drawNumbers.has(d.drawNumber)) err(`EE draw: duplicate drawNumber ${d.drawNumber}`);
  drawNumbers.add(d.drawNumber);
  seenCategories.add(d.category);

  if (Number.isNaN(Date.parse(d.date))) err(`EE draw #${d.drawNumber} — unparseable date "${d.date}"`);
  if (!Number.isInteger(d.crsMin) || d.crsMin < 0 || d.crsMin > 1200) {
    err(`EE draw #${d.drawNumber} — crsMin out of range: ${d.crsMin}`);
  }
  if (!Number.isInteger(d.itas) || d.itas <= 0) {
    err(`EE draw #${d.drawNumber} — invalid ITA count: ${d.itas}`);
  }
  if (!drawCategories.includes(d.category) && d.category !== "All") {
    err(`EE draw #${d.drawNumber} — category "${d.category}" not in drawCategories filter list`);
  }
}

// Each declared category (except General/All) should map to ≥1 NOC industry
const categoryToIndustry = {
  STEM:        ["Information Technology", "Engineering"],
  Healthcare:  ["Healthcare"],
  Trades:      ["Trades & Skilled"],
  Transport:   ["Transportation"],
  Agriculture: ["Agriculture & Food"],
  Education:   ["Education"],
};
for (const cat of seenCategories) {
  const industries = categoryToIndustry[cat];
  if (!industries) continue; // General / French — not occupation-targeted
  const count = nocData.filter((n) => industries.includes(n.category) && n.eeEligible).length;
  if (count === 0) {
    err(`EE category "${cat}" has 0 EE-eligible NOCs in matching industry/industries (${industries.join(", ")})`);
  }
}

// Each EE-eligible NOC industry should appear in at least one draw category
const industryToCategory = {
  "Information Technology": "STEM",
  "Engineering":            "STEM",
  "Healthcare":             "Healthcare",
  "Trades & Skilled":       "Trades",
  "Transportation":         "Transport",
  "Agriculture & Food":     "Agriculture",
  "Education":              "Education",
};
for (const [ind, cat] of Object.entries(industryToCategory)) {
  if (!seenCategories.has(cat) && !seenCategories.has("General")) {
    warn(`Industry "${ind}" has no recent ${cat} category draw — only general draws apply`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. PNP draws
// ─────────────────────────────────────────────────────────────────────────────
const provinceCodeRe = /^[A-Z]{2}$/;
const pnpRequired = ["province", "provinceCode", "stream", "date", "invitations", "officialUrl"];
for (const [i, p] of pnpDraws.entries()) {
  for (const f of pnpRequired) {
    if (p[f] === undefined || p[f] === null || p[f] === "") {
      err(`PNP[${i}] (${p.province ?? "?"} / ${p.stream ?? "?"}) — missing required field "${f}"`);
    }
  }
  if (p.provinceCode && !provinceCodeRe.test(p.provinceCode)) {
    err(`PNP[${i}] — invalid provinceCode "${p.provinceCode}" (expected 2 uppercase letters)`);
  }
  if (p.date && Number.isNaN(Date.parse(p.date))) {
    err(`PNP[${i}] (${p.province}) — unparseable date "${p.date}"`);
  }
  if (p.invitations !== undefined && (!Number.isInteger(p.invitations) || p.invitations <= 0)) {
    err(`PNP[${i}] (${p.province}) — invalid invitations: ${p.invitations}`);
  }
  if (p.officialUrl && !/^https?:\/\//.test(p.officialUrl)) {
    err(`PNP[${i}] (${p.province}) — officialUrl must be absolute: "${p.officialUrl}"`);
  }
  // minScore: undefined is allowed (some streams don't publish), but if present must be >= 0
  if (p.minScore !== undefined && (typeof p.minScore !== "number" || p.minScore < 0)) {
    err(`PNP[${i}] (${p.province}) — invalid minScore: ${p.minScore}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Report
// ─────────────────────────────────────────────────────────────────────────────
const summary = {
  nocs: nocData.length,
  inDemandJobs: inDemandJobs.length,
  eeDraws: expressEntryDraws.length,
  pnpDraws: pnpDraws.length,
  errors: errors.length,
  warnings: warnings.length,
};

console.log("\n📊 4 Aces Visa — Data Validation Report");
console.log("────────────────────────────────────────");
console.log(`NOC entries        : ${summary.nocs}`);
console.log(`In-demand jobs     : ${summary.inDemandJobs}`);
console.log(`Express Entry draws: ${summary.eeDraws}`);
console.log(`PNP draws          : ${summary.pnpDraws}`);
console.log("────────────────────────────────────────");

if (warnings.length) {
  console.log(`\n⚠️  Warnings (${warnings.length}):`);
  warnings.forEach((w) => console.log("  • " + w));
}
if (errors.length) {
  console.log(`\n❌ Errors (${errors.length}):`);
  errors.forEach((e) => console.log("  • " + e));
  console.log("\nFAIL — fix the errors above.\n");
  // Clean cache
  fs.rmSync(path.join(ROOT, ".cache-validate"), { recursive: true, force: true });
  process.exit(1);
}

console.log("\n✅ All datasets pass cross-validation.\n");
fs.rmSync(path.join(ROOT, ".cache-validate"), { recursive: true, force: true });