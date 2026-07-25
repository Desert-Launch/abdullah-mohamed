# CLAUDE.md

Personal-branding / portfolio site for Abdullah Mohamed (senior software
engineer). Single-page marketing site: hero, case studies, experience,
freelance work, services, pricing, process, testimonials, FAQ, contact. Goal is
conversion — freelance leads and senior product roles. See `PLAN.md` for the
product intent.

## Stack

- **Next.js (App Router)** + **React** + **TypeScript** (`strict`), built with
  **Turbopack**. `next.config.mjs` sets `output: "export"` (static export; see the
  next/image note below).
- **No CSS framework** — one hand-written global stylesheet, plain CSS with
  custom properties. No Tailwind, no CSS Modules, no styled-components.
- Fonts via `next/font/google`: **DM Sans** (Latin) + **Cairo** (Arabic),
  exposed as `--font-sans` / `--font-cairo`. DM Sans is a stand-in for the
  proprietary Google Sans; to use licensed Google Sans files, swap the
  `DM_Sans(...)` call in `lib/site.tsx` for `next/font/local` pointing at
  `app/fonts/` (keep the `--font-sans` variable name so the CSS is unchanged).
  Type weight scale is intentionally light: body 400, most labels/headings 500,
  emphasis (eyebrows, buttons, stat numbers) 600 — no 700+.
- `@/*` path alias maps to the project root (see `tsconfig.json`).

## Commands

```bash
npm run dev      # local dev server (Turbopack)
npm run build    # production build
npm run start    # serve the production build
npx tsc --noEmit # typecheck (tsconfig has noEmit; strict is on)
```

There is **no lint or test script** configured. Typecheck with `tsc` before
considering a change done.

## Architecture

- **Two locales, two routes, two root layouts.** `<html>` may only be rendered
  by a root layout, and a root layout cannot read the current route — so each
  locale owns one, via route groups:
  - `app/(en)/layout.tsx` + `app/(en)/page.tsx` → **`/`** (English)
  - `app/(ar)/layout.tsx` + `app/(ar)/ar/page.tsx` → **`/ar/`** (Arabic)

  There is deliberately **no `app/layout.tsx` / `app/page.tsx`** — adding one
  back would collide with the route groups.
- **Standalone `/work` routes** (English only today):
  - `app/(en)/work/page.tsx` → **`/work/`** — grid of every case study
    (featured first) plus an "also shipped" strip for the Selected Work apps
  - `app/(en)/work/[slug]/page.tsx` → **`/work/<slug>/`** — one full page per
    case study, via `generateStaticParams`

  They live **inside the `(en)` group on purpose**: a top-level `app/work/`
  would have no root layout at all. `app/lib/work.ts` owns the slug/path
  helpers, the sort, and `buildWorkMetadata` (per-page canonical + OG, and
  deliberately **no hreflang** while `/ar/work` doesn't exist). Chrome comes
  from `WorkHeader` (reduced nav — the homepage `TopBar` is built on anchors +
  a scrollspy that don't exist here) and the shared `Footer` with `linkBase="/"`
  so its section anchors resolve back to the homepage.
- **Social cards** are all generated at build time by `app/lib/og.tsx`
  (`next/og`), one `opengraph-image.tsx` per route:
  `app/(en)/` (→ `/`), `app/(ar)/ar/` (→ `/ar/`), `app/(en)/work/`,
  `app/(en)/work/[slug]/`. `twitter:image` is mirrored from `og:image`.
  Gotchas, all load-bearing:
  - The image file **must sit in the same segment as the page**. With no
    `app/layout.tsx`, the `(en)`/`(ar)` groups *are* the root layouts, so an
    image at `app/` is built as its own route and attached to nothing — the
    site shipped for months with no share image because of this.
  - Routes without params need `dynamic = "force-static"`.
  - Next writes them as **extension-less files**, so `vercel.json` sets their
    `content-type`; without it a static host serves them as octet-stream and
    the scrapers refuse the card. **Adding a new card means adding a rule.**
  - satori can't use `next/font`, so `app/fonts/*.ttf` are checked in (see the
    README there). Cards are **Latin-only**: satori reverses Arabic word
    order, so `/ar` shares the English card and only its og:title/description
    are Arabic.
  - `meta.social` (short) feeds `og:`/`twitter:description`, not
    `meta.description` — WhatsApp and LinkedIn cut around 150 characters.
- **`app/lib/site.tsx`** is the shared shell both root layouts call: fonts,
  `SITE_URL`, `buildMetadata(lang)` (title/description/canonical/hreflang/OG),
  `siteViewport`, the Person + FAQ JSON-LD, the pre-paint `noFlashScript`, and
  the `RootHtml` component. Change site-wide `<head>` behaviour here, once.
- Both pages render **`app/components/Portfolio.tsx`** with a `lang` prop — the
  orchestrator that composes every section. Start there to change the page.
- Components live in `app/components/`. `Portfolio` is `"use client"`, so
  everything it renders is in the client bundle today; `ContactForm`, `CountUp`
  and `ShotGallery` are the only ones that genuinely need to be.
- SEO/crawl files: `app/robots.ts`, `app/sitemap.ts` (both locales + hreflang
  alternates), `public/llms.txt`, and the image routes `opengraph-image.png` /
  `twitter-image.png` (each with a sibling `.alt.txt`) / `icon.svg` /
  `apple-icon.png`.

## Content & i18n (important)

The site is **bilingual EN/AR with full RTL**, and **all display copy lives in
data, not in components.**

- `app/data/types.ts` — the `Dictionary` interface: the single contract for
  every piece of page content.
- `app/data/en.ts` and `app/data/ar.ts` — the two dictionaries, each typed as
  `Dictionary`. `app/data/copy.ts` combines them into `copy[lang]`.
- `app/data/shared.ts` — language-agnostic data (social links, company logos,
  per-app store links + lifecycle status, the `appImages` map of image paths).

**Rules when touching content:**

- To add/change any text, edit the dictionaries — never hardcode user-facing
  strings in a component. Components receive the resolved dictionary as a `t`
  prop.
- Adding a field means updating **all three**: `types.ts` (the interface),
  then `en.ts` **and** `ar.ts`. Keep EN and AR in sync — TypeScript will error
  if a dictionary is missing a required field.
- To add a new section: add it in `Portfolio.tsx` with a stable `id`, and add
  the matching `nav` entry (label + `#anchor`) to **both** dictionaries.
- `nav` entries are normally `#anchor`s. The EN dictionary has one real path
  (`["Work", "/work/"]`); `TopBar` and `Footer` run non-anchor hrefs through
  `asset()`, since Next only applies `basePath` to `<Link>`.
- `CaseStudy.shots` is `Shot[]` (`{src, alt, caption}`), not bare paths — the
  caption is what makes an Arabic-only screenshot legible to an English
  reader on the `/work` page. `Product.shots` is still `string[]`;
  `ShotGallery` accepts either.
- Anything the `/work` pages render comes from `Dictionary.work`, present in
  both dictionaries even though only English is routed today.
- Section order is the **JSX sequence in `Portfolio.tsx`**, not a data array.
  Reordering means moving JSX blocks; ids must stay stable (they are the nav
  anchors and the scrollspy targets).

## Theme & language state

- **Language is the URL, not state.** `lang` is a prop passed from the route's
  page; `<html lang>`/`dir` are rendered on the server per locale. The language
  switch in `TopBar` is an `<a href>` to the other locale (`localePath` in
  `lib/site.tsx`), not a state toggle. Do **not** reintroduce a `portfolio-lang`
  localStorage key or let a stored preference rewrite `<html lang>` — that would
  put the served markup out of sync with the URL a crawler indexed.
- `Portfolio.tsx` owns `theme` (`dark`|`light`) and `palette` state. Effects
  write them to `<html>` (`data-theme`, `data-palette`) and persist to
  `localStorage` keys **`portfolio-theme`** and **`portfolio-palette`**. These
  survive a locale switch because it is a normal navigation.
- `lib/site.tsx`'s `noFlashScript` runs before paint to read those two keys and
  set the `<html>` attributes, preventing a theme flash. State is initialised
  **from** those attributes so the first client render already matches — don't
  reintroduce a flash by initialising from a constant default instead.
- `dir` comes from each dictionary (`en.dir = "ltr"`, `ar.dir = "rtl"`).

## Styling conventions

- Everything is in **`app/globals.css`** (~1.8k lines). Class-name based; no
  utility classes. Match the existing BEM-ish naming (`.section-heading`,
  `.experience-group`, `.plan-card.featured`).
- **Design tokens are CSS custom properties** defined on `:root` (dark) and
  overridden on `:root[data-theme="light"]`. Use the tokens (`--ink`,
  `--muted`, `--paper`, `--surface`, `--gold`, `--line`, `--radius`, `--max`,
  glass/aurora vars) — **do not hardcode colors**, or you'll break light mode.
- Theme scoping is driven by the `data-theme` attribute on `<html>` (and
  mirrored on `.site-shell`). RTL is handled via `dir`; prefer logical CSS
  where you add layout so it flips correctly for Arabic.
- Images use plain `<img>` with `loading="lazy"` and `.webp` assets from
  `public/images`. Decorative images use `alt=""`; meaningful ones have real
  alt text.

## Accessibility (already established — preserve it)

The codebase already follows good a11y practice; keep it that way:

- Skip link (`.skip-link` → `#home`), visually-hidden labels (`.sr-only`) on
  form inputs, `aria-label` on landmark sections, `aria-hidden` on decorative
  nodes, and both-theme `themeColor`.
- When adding UI, follow the same patterns: real labels, keyboard-operable
  controls, visible focus, and token colors that pass contrast in **both**
  themes.

## Notable specifics

- The **contact form submits via Web3Forms** (`ContactForm.tsx`, key in
  `shared.ts`) — client-side POST, no backend. If the key is emptied it falls
  back to the original `mailto:` flow. There's a honeypot field and
  success/error strings in the dictionaries.
- The `--gold` token currently resolves to a purple (`#8b7cf0`); the comments
  still describe an "Obsidian & Gold" palette. Treat the token as the source
  of truth, not the comment, and change the token if adjusting the accent.
- Testimonials are real quotes (LinkedIn recommendations, excerpted; full
  texts in `assets/linkedin.json`). The section hides itself if the list is
  ever emptied. There is no placeholder/sample mechanism — don't add fake
  quotes.
- **App lifecycle honesty**: `storeLinks` in `shared.ts` carries a `status`
  (`live | retired | private | unreleased`) per app. Only real https URLs
  render store buttons; non-live apps get a status badge. Never claim "live"
  in copy for the aggregate numbers — say "shipped".
- Analytics is opt-in via `NEXT_PUBLIC_ANALYTICS_SRC` / `_ID` env vars at
  build time (see `lib/site.tsx`); unset means no script is emitted.

## Design skills

Project-local UI/UX skills live in `.claude/skills/` (accessibility-wcag,
visual-design-refactoring, color-and-typography, responsive-mobile-first,
motion-microinteractions, ux-heuristics-audit, interactive-portfolio). They
load automatically for matching design tasks, or invoke with `/<skill-name>`.
Use them when doing visual/UX work on this site.
