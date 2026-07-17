# Implementation Plan — Portfolio Enhancements

> **STATUS (2026-07-14): Implemented.** All phases below are done except
> analytics account creation (owner action — see `CONTENT_TODO.md` "Still
> open"). Case-study pages and blog remain "Later / out of scope". This file
> is kept as the record of what was built and why.

Plan for a code agent working on this repo. Read `CLAUDE.md` first and follow
its rules strictly, especially:

- All display copy lives in the dictionaries (`app/data/types.ts` +
  `app/data/en.ts` + `app/data/ar.ts`). Never hardcode user-facing strings in
  components. Any new field goes into all three files.
- All styling goes in `app/globals.css` using the existing design tokens
  (`--ink`, `--muted`, `--paper`, `--surface`, `--gold`, `--line`, …). Never
  hardcode colors. Test both `data-theme="dark"` and `"light"`.
- The site is bilingual EN/AR with full RTL — use logical CSS properties for
  any new layout, and write real Arabic copy (not transliteration) in `ar.ts`.
- Preserve the established a11y patterns: `aria-label` on landmark sections,
  `aria-hidden` on decorative nodes, keyboard-operable controls, visible
  focus, `prefers-reduced-motion` fallbacks for any motion.
- New sections get a stable `id` in `Portfolio.tsx` and a matching `nav`
  entry in **both** dictionaries.
- Definition of done for every phase: `npx tsc --noEmit` passes, `npm run
  build` passes, and the section renders correctly in dark/light × EN/AR.

Context: the dictionaries already contain **unrendered** data for `plans`,
`testimonials`, and `stackGroups` — several phases below re-enable existing
data rather than inventing new content.

Content the site owner must supply is tracked in `CONTENT_TODO.md`. Phases
marked **[needs owner content]** should still be built now, but with the
existing placeholder/sample data and safe fallbacks (the codebase already has
this pattern: empty `storeLinks` render no button, `sample: true`
testimonials are visibly placeholders).

---

## Phase 1 — Re-render existing dead data (no new content needed)

### 1.1 Engagement plans section
- Render `t.plans` (Audit / Launch / Partner) as a new `#plans` section in
  `Portfolio.tsx`, placed **after Services, before Selected work**.
- Use `t.plansHeading` (already in both dictionaries) for the heading block.
- Card layout: reuse the existing card patterns (`data-reveal`, `data-glow`,
  `.card-spotlight` / `.card-edge`). The `featured: true` plan (Launch) gets
  a highlighted treatment — check `globals.css` for a leftover
  `.plan-card.featured` style before writing new CSS; reuse it if present.
- Each card ends with a CTA linking to `#contact`.
- Add a nav entry only if the nav doesn't get crowded (7 items max on
  desktop); otherwise leave it out of nav — the section anchor is enough.

### 1.2 Testimonials section **[needs owner content]**
- Render `t.testimonials` with `t.testimonialsHeading` as `#testimonials`,
  placed **immediately before Contact** (social proof at the decision point).
- Respect the `sample?: boolean` flag: when ALL testimonials are
  `sample: true`, do **not** render the section at all in production builds
  (a placeholder quote visible to a real client is worse than no section).
  Simplest rule: filter out `sample` items and hide the section when the
  filtered list is empty. Owner swaps in real quotes later and the section
  appears automatically.

### 1.3 Expanded proof grid
- The proof grid currently has 2 stats. Extend `t.proof` in both dictionaries
  to 4: `10+ apps shipped`, `20,000+ students on Faheem`, `5+ years shipping
  production`, `4 regions`. Keep the `CountUp` treatment.
- Verify the grid CSS handles 4 items on mobile (2×2) without new breakpoint
  bugs.

## Phase 2 — New conversion sections

### 2.1 Process section ("How working with me looks")
- New `#process` section between Plans and Selected work.
- New `Dictionary` fields: `processHeading` (eyebrow/title/body) and
  `process: { step: string; title: string; body: string }[]` — 4 steps:
  1. Intro call — free, scoped, no commitment (link the booking CTA).
  2. Plan — a written scope with milestones and a price.
  3. Build — weekly shipped, testable slices; you see progress every week.
  4. Handoff — docs, deployment, and the code is yours.
- Visual: horizontal numbered strip on desktop, vertical on mobile. Reuse the
  numbered-card idiom from `.service-card-number`.
- Write proper Arabic copy in `ar.ts`.

### 2.2 FAQ section
- New `#faq` section after Testimonials (or before Contact if testimonials is
  hidden by the sample filter).
- New fields: `faqHeading` + `faq: { q: string; a: string }[]` with ~5
  entries: timezone/overlap with US–EU–Gulf, communication cadence, code
  ownership & handoff, languages (English/Arabic), how pricing works
  (reference the plans).
- Use native `<details>/<summary>` for zero-JS accessible accordions; style
  in `globals.css` (focus-visible ring, animated chevron with reduced-motion
  fallback, logical properties for RTL).
- Add FAQ JSON-LD (`FAQPage` schema) — follow the existing JSON-LD pattern in
  `app/layout.tsx`. Use the EN copy for the schema.

### 2.3 Availability line in hero
- New dictionary field `hero.currently` (e.g. "Currently building Faheem —
  taking new projects from August 2026"). Render as a small line near the
  existing `availability` text in `Hero.tsx`, with a subtle pulsing dot
  (`aria-hidden`, static under reduced motion).
- Owner confirms the actual wording/date in `CONTENT_TODO.md`; use a
  sensible default until then.

## Phase 3 — Contact reliability

### 3.1 Replace mailto-only form submission
- `ContactForm.tsx` currently builds a `mailto:` URL — on machines without a
  configured mail client the submit does nothing and the lead is lost.
- Integrate **Web3Forms** (or Formspree — owner picks, see `CONTENT_TODO.md`;
  both are POST-from-client, no backend, works with static export).
  Access key comes from `NEXT_PUBLIC_` env var; **until the key is set, keep
  the current mailto behavior as the fallback** so nothing breaks.
- Add success / error states as dictionary strings (both languages), an
  inline "or copy my email" button with clipboard API + copied-state
  feedback, and keep all existing labels/`sr-only` a11y.
- Honeypot field for spam; no captcha.

## Phase 4 — Proof & credibility wiring **[needs owner content]**

### 4.1 Store links + app status badges
- Some apps were removed from the stores by clients (business ended). The
  owner records each app's status in `CONTENT_TODO.md`:
  `live | retired | private | unreleased`.
- Extend the `storeLinks` map in `app/data/shared.ts` into a per-app record
  with `status` and optional `year` alongside the URLs (keep the "empty
  string ⇒ no button" behavior for links).
- In `SelectedWork.tsx`: `live` apps render store buttons (correct labels
  from `selectedWorkLabels`, `rel="noopener"`, `target="_blank"`); non-live
  apps render a small status badge instead — "Shipped {year} · retired",
  "Private build", "Unreleased". Badge strings are display copy → they go in
  the dictionaries (add a `statusLabels` field to `Dictionary`, EN + AR),
  with the year interpolated from `shared.ts`.
- Badge styling: token-based, subtle (muted text + `--line` border), must
  pass contrast in both themes.
- **Sitewide wording audit**: only claim "live" where at least one store link
  exists. Adjust hero/proof copy so the headline claim is "shipped to
  stores" (already true of the proof grid) and keep "live" only for apps
  that are (e.g. Faheem). Check `hero.lead`, `proofNote`, `logosLabel` in
  both dictionaries.

### 4.2 Case-study visuals
- When the owner adds Faheem screenshots to `public/images/` (webp), wire
  them into the `shots` field of the Faheem case study (the `shots` pattern
  already exists on Jaweb). Verify `CaseStudies.tsx` renders `shots` for both
  studies, lazy-loaded, with empty `alt` if decorative or real alt text if
  meaningful.

### 4.3 CV link
- Check `Hero.tsx` / `public/` for the CV download target. If the file is
  missing, hide the button until the owner drops the PDF in (same
  no-dead-link philosophy as `storeLinks`).

## Phase 5 — Measurement & SEO polish

### 5.1 Analytics
- Add a privacy-light analytics snippet (owner picks provider in
  `CONTENT_TODO.md`; default recommendation GoatCounter — free, no cookie
  banner needed). Load via `next/script` with `strategy="lazyOnload"` in
  `layout.tsx`, gated on a `NEXT_PUBLIC_` env var so local/dev builds don't
  report.
- Track outbound clicks on the two conversion CTAs (Book a call, form
  submit) as events if the chosen provider supports it cheaply.

### 5.2 Structured data
- FAQ schema ships in 2.2. Additionally verify the existing JSON-LD Person
  schema in `layout.tsx` still matches reality (role, sameAs links) after all
  the above changes.

## Later / out of scope for this pass
- Dedicated case-study pages (`/work/faheem` etc.) — worthwhile but a
  separate multi-page effort (routing, per-page metadata, sitemap updates).
- Blog/writing section — only if the owner commits to writing.

---

## Execution order & verification

Work phase by phase; each phase is one commit. After each phase:

1. `npx tsc --noEmit`
2. `npm run build`
3. Visual check in all four states (dark/light × EN/AR), including RTL layout
   of any new section, per the verification workflow (static build + serve +
   headless-Chrome screenshots).
4. Keyboard-only pass over any new interactive element.
