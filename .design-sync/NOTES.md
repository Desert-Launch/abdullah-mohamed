# design-sync notes — portfolio site → claude.ai/design

Project: https://claude.ai/design/p/453659fe-1f58-4fca-95e1-0c84f065f10c
("Abdullah Mohamed Portfolio"). Shape: `package`, no Storybook.

## Re-sync recipe (from the repo root)

```bash
SK=<design-sync skill dir>
mkdir -p .ds-sync && cp -r "$SK"/package-build.mjs "$SK"/package-validate.mjs "$SK"/package-capture.mjs "$SK"/resync.mjs "$SK"/lib "$SK"/storybook .ds-sync/
echo '{"name":"ds-sync-deps","private":true}' > .ds-sync/package.json
(cd .ds-sync && npm i esbuild ts-morph @types/react playwright@1.63.0)
node .design-sync/build.mjs            # cfg.buildCmd — ALWAYS before the driver
# fetch the project's _ds_sync.json -> .design-sync/.cache/remote-sync.json
node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules ./node_modules \
  --out ./ds-bundle --remote .design-sync/.cache/remote-sync.json
```

No `--entry` flag: `cfg.entry` points at `.design-sync/ds-entry.ts`.

## How this repo is made to look like a package

The site is a Next app with no library build, so `.design-sync/` supplies the
pieces a DS package would ship:

- `package.json` here is the converter's package root (it walks up from
  `ds-entry.ts`). Not an npm package — nothing installs from it.
- `ds-entry.ts` is the bundle entry: the 19 visual components plus `copy`,
  `shared` data and the lookup helpers (`findProject`, `servicePages`, …).
  `AgentTools`, `JsonLd`, `TrackClicks`, `TrackPageView` are left out on
  purpose (render nothing). **Adding a component to the site → export it here
  and add a `component-docs/<Name>.md` category stub.**
- `build.mjs` (= `cfg.buildCmd`) must run before the converter: `tsc` emits the
  `.d.ts` tree to `.cache/dist/` (the props contracts) and it writes
  `.cache/ds.css` = `:root{--font-sans;--font-cairo}` + `app/globals.css`
  (`cfg.cssEntry` must live under this dir, so globals.css is copied).
- `tsconfig.json` maps the Next-only imports to `shims/`: `next/font/google`
  (a build-time transform), `@vercel/analytics/next` and
  `@vercel/speed-insights/next` (a design must not report page views). The
  converter's paths plugin reads `paths` from THIS file only (no `extends`).
  No `baseUrl`: TS 6 rejects it (TS5101); paths resolve relative to the file.
- `shims/process-env.ts` is the entry's first import: it sets
  `process.env.NEXT_PUBLIC_BASE_PATH` to `https://www.abdullahmohamed.dev`, so
  `asset("/images/…")` resolves against production (served with
  `Access-Control-Allow-Origin: *`). The upload never carries `public/`.
  Side effect: defines a minimal global `process` in the design runtime.
- `fonts/` holds DM Sans (latin) + Cairo (arabic, latin) woff2, downloaded
  from Google Fonts — the same files and subsets `next/font` serves per
  `lib/site.tsx`. Variable fonts, one file per subset. Wired via
  `cfg.extraFonts`.
- `component-docs/*.md` are frontmatter-only `category` stubs (chrome /
  sections / elements / pages). An empty body keeps the synthesized
  `.prompt.md` (props + the preview examples). Kept out of `docs/` because the
  default `guidelinesGlob` would ship `docs/*.md` as guidelines.

## Previews

- Every preview imports `./_kit/card-harness` first. It (1) removes the card
  harness's `body{background:#fff}` so globals.css's own `body` rule (paper +
  aurora, cream ink) shows — without it every card is cream-on-white — and
  (2) flips `loading="lazy"` images to eager. **Why (2):**
  `package-capture.mjs`'s `settle()` awaits `img.decode()` on every image with
  no timeout; a lazy image below the viewport never loads, so capture hangs
  forever (ExperienceTimeline is ~7,400px tall). Symptom: capture stops
  emitting lines and one component never finishes.
- Previews are the JSX the design agent should write (`.site-shell` + `dir` +
  `copy.en`), because `.prompt.md` copies them verbatim as examples. Keep
  harness glue in `_kit/`, never in the exported story bodies.
- `_kit/` edits are NOT part of any grade key — after changing it, re-capture
  with `--force` and re-grade.
- Page components render `.aurora-field` (`position: fixed`) → `[GRID_OVERFLOW]`
  in grid/column mode; they use `cardMode: single` (primary English).
- Theme is dark-only in previews: light theme lives on `:root[data-theme]`,
  so it can't differ per cell.
- `ContactForm` success/error states are internal (set by a real submit) —
  not previewed.
- `LanguageMenu` "Open" story clicks the real trigger after mount; only one
  menu can be open per document (opening moves focus), so one Open story.
- `LanguageMenu` card is 900px wide: at ≤760px the site hides the language
  label (`.lang-menu-current`).

## Environment

- Playwright must match the cached chromium in `~/Library/Caches/ms-playwright`
  (macOS path, not `~/.cache`): `playwright@1.63.0` ↔ chromium 1243. Install it
  into `.ds-sync/` after staging (`cd .ds-sync && npm i playwright@1.63.0`).
- Captures of full pages are slow (dozens of images from production each);
  the full 19-component capture takes a few minutes. Don't pipe it through
  `tail` if you want progress.

## Known render warns

- `CountUp` stat values (Hero, Portfolio, CountUp cards) are captured
  mid-animation (e.g. "181,000+" instead of "200,000+"). The live card
  settles on the real value; this is the component, not a defect.
- `DOCS_UNMAPPED` never fires now (every component has a stub); if it does, a
  new component lacks its `component-docs/` stub.

## Re-sync risks

- **2026-09-25: the homepage was redesigned** ("Production strata", from the
  Claude Design project 475e320d…). Hero, TopBar, CaseStudies,
  ExperienceTimeline, SelectedWork, ContactForm, ShotGallery, SocialLinks and
  CountUp were deleted and dropped from `ds-entry.ts`; their CSS is gone. The
  uploaded project (453659fe…) still holds them until the next sync, and that
  sync's upload deletes them. **`conventions.md` is stale**: its class table
  (`service-card`, `case-card`, `plan-card`, `process-step`, `hero-proof-item`,
  `service-grid`, `process-grid`, `case-grid`, `plans-grid`, `contact-section`)
  and its `Hero` example name things that no longer exist. Re-validate and
  rewrite it on the next sync — the new vocabulary is the `home-*`, `feat-*`,
  `strata-*`, `stack-map-*` families in globals.css, and the new sections in
  `app/components/home/` are candidates for their own exports and previews.
- The bundle throws `Cannot set properties of undefined (setting 'jsx')` when
  `_ds_bundle.js` evaluates before `window.React` exists (seen when a Claude
  Design page loads React from a CDN after the bundle). The react shim in
  `lib/bundle.mjs` reads `window.React` at module init; worth reporting, since
  a design that uses a DS component would crash the same way.

- `fonts/*.woff2` are a snapshot of Google Fonts (DM Sans v17, Cairo v31). If
  `lib/site.tsx` changes families, weights or subsets, re-download and update
  `fonts/fonts.css`.
- `shims/process-env.ts` hard-codes the production origin. If the host
  changes (or images move), update it — cards and designs would show broken
  images otherwise, and nothing in the build would fail.
- `shims/next-font-google.ts` only exports `DM_Sans` and `Cairo`. A new
  `next/font/google` family in `lib/site.tsx` fails the bundle with a missing
  export — add it to the shim.
- New Next-only imports reachable from a component (`next/link`,
  `next/image`, `next/navigation`) are not shimmed — the bundle will fail to
  resolve or crash at runtime. Add a shim + a `paths` entry.
- `.d.ts` bodies name `Dictionary`, `Social`, `CaseStudy`, `ServicePage`,
  `Shot` without defining them; `conventions.md` maps each to where it comes
  from. Keep that table true if types.ts renames anything.
- Preview examples reference dictionary paths (`copy.en.caseStudies[0]`,
  `findProject("faheem", …)`, `servicePages("en")[0]`). If content is
  reordered or a slug is removed, the preview breaks or shows a different
  study — re-capture after content edits.
- The conventions header's class/token table was validated against this
  build's `_ds_bundle.css`; renames in globals.css make it lie silently.
