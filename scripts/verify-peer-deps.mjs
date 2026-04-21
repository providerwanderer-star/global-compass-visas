#!/usr/bin/env node
/**
 * Verifies critical peer dependencies are installed before `vite build`.
 * Prevents postbuild (react-snap / prerender) failures caused by missing
 * transitive peers that Vite resolves at build time.
 *
 * Add new packages to REQUIRED below as needed.
 */
import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = dirname(dirname(fileURLToPath(import.meta.url)));

// Packages that must resolve from the project root.
// Each entry: { name, reason }
const REQUIRED = [
  {
    name: "@tanstack/query-core",
    reason: "Required peer of @tanstack/react-query; missing it breaks vite build / react-snap.",
  },
  {
    name: "@tanstack/react-query",
    reason: "Used across the app for data fetching.",
  },
  {
    name: "react",
    reason: "Core runtime.",
  },
  {
    name: "react-dom",
    reason: "Core runtime.",
  },
];

const missing = [];
for (const dep of REQUIRED) {
  const pkgJson = join(root, "node_modules", dep.name, "package.json");
  if (!existsSync(pkgJson)) {
    missing.push(dep);
    continue;
  }
  try {
    require(pkgJson);
  } catch (err) {
    missing.push({ ...dep, error: err?.message });
  }
}

if (missing.length > 0) {
  console.error("\n\u274c Peer dependency check failed before build:\n");
  for (const m of missing) {
    console.error(`  - ${m.name}`);
    console.error(`      reason: ${m.reason}`);
    if (m.error) console.error(`      error:  ${m.error}`);
  }
  console.error(
    "\nInstall the missing package(s) and re-run the build, e.g.:\n  bun add " +
      missing.map((m) => m.name).join(" ") +
      "\n",
  );
  process.exit(1);
}

console.log(
  `\u2705 Peer dependency check passed (${REQUIRED.length} package${REQUIRED.length === 1 ? "" : "s"} verified).`,
);
