#!/usr/bin/env node
// Pre-build for design-sync (cfg.buildCmd). The site has no library build, so
// this produces the two inputs the converter expects from one:
//   1. a .d.ts tree for ds-entry.ts  -> .cache/dist/   (props contracts)
//   2. the stylesheet                -> .cache/ds.css  (cfg.cssEntry)
// Both are gitignored and regenerated on every sync. Run from the repo root.
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = dirname(here);
const cache = join(here, ".cache");

rmSync(join(cache, "dist"), { recursive: true, force: true });
execFileSync(join(root, "node_modules", ".bin", "tsc"), ["-p", join(here, "tsconfig.json")], {
  cwd: root,
  stdio: "inherit",
});

// next/font sets --font-sans / --font-cairo through a class on <html> that
// RootHtml renders; a design has no RootHtml, so define them on :root. The
// families themselves ship as @font-face via cfg.extraFonts (fonts/fonts.css).
const fontVars = `/* design-sync: next/font defines these on <html> in the real site. */
:root {
  --font-sans: "DM Sans";
  --font-cairo: "Cairo";
}

`;
mkdirSync(cache, { recursive: true });
writeFileSync(join(cache, "ds.css"), fontVars + readFileSync(join(root, "app", "globals.css"), "utf8"));
console.log("design-sync prebuild: .cache/dist (d.ts) + .cache/ds.css written");
