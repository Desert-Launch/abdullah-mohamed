# CLAUDE.md

Personal-branding / portfolio site for Abdullah Mohamed (senior software
engineer). Single-page marketing site: hero, proof, services + process, selected work,
stack map, experience, recommendations, about + principles, contact.
Goal is conversion — freelance leads and senior product roles. See `PLAN.md`
for the product intent. The homepage is the "Production strata" redesign
(2026-09-25, from the Claude Design project `475e320d…`).

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
- **Standalone `/work`, `/services`, `/cv` and `/start-a-project` routes, in both locales.** Each
  locale group mounts the same routes under its root:
  - `(en)/work/` → **`/work/`**, `(en)/work/[slug]/` → **`/work/<slug>/`**;
    `(ar)/ar/work/…` → **`/ar/work/…`**
  - `(en)/services/` → **`/services/`**, `(en)/services/[slug]/` →
    **`/services/<slug>/`**; `(ar)/ar/services/…` → **`/ar/services/…`**

  - `(en)/cv/` → **`/cv/`**; `(ar)/ar/cv/` → **`/ar/cv/`**
  - `(en)/start-a-project/` → **`/start-a-project/`**; `(ar)/ar/start-a-project/`
    → **`/ar/start-a-project/`** — the project brief (see "Notable specifics")

  The route files are thin: they pick the locale and render the shared page
  bodies in `app/components/pages/` (`WorkIndex`, `WorkDetail`,
  `ServicesIndex`, `ServiceDetail`, `CvPage`, `InquiryPage`). They live **inside the locale groups on
  purpose**: a top-level `app/work/` would have no root layout at all.
  `app/lib/work.ts` and `app/lib/services.ts` own the locale-aware path
  helpers (`workPath(slug, lang)`, `servicePath(slug, lang)` — every call
  site passes `lang`; there is no English default), the sort/join, `caseMeta`
  (fills the `work.caseMeta` title/description templates), and the
  `build*Metadata` wrappers. A service page's copy is
  `Dictionary.servicePages.pages[]` (seven pages, one per **visitor
  situation** — MVP, mobile, web, SaaS, business software, AI, improving an
  existing app — listed in that array's order everywhere). **Prices are never
  typed into a page:** `ServicePage.pricing` names the `plans` it is priced
  as (omitted = the plan with its own slug; several = priced as the build it
  becomes, e.g. MVP quotes web + mobile; `[]` = "priced per project", no
  published number). Read prices only through `servicePrice(page, lang)` —
  the homepage rows, cards, OG card, Markdown and `Offer` JSON-LD all do.
  Proof is `caseStudies` by slug; `servicesCiting` is the reverse join a
  case-study page uses for its "hire me for the same thing" links. The old
  `/services/flutter-app-development/` 308s to `mobile-app-development`
  (`vercel.json`, both locales) — don't reuse that slug.
  `app/lib/inquiry.ts` owns `inquiryPath(lang, service?)`.
  `app/lib/cv.ts` owns `cvPath(lang)` and `buildCvMetadata`. **`/cv/` does not
  store the employment history**: `CvPage` renders `Dictionary.experiences`,
  the same array the homepage timeline uses, so the résumé and the timeline
  cannot disagree. Only the summary, education, graded skills and languages
  are its own (`Dictionary.cv`).
  Chrome comes from `WorkHeader` (reduced nav — the homepage header,
  `home/HomeChrome`, is built on anchors + a scrollspy that don't exist here; takes `lang` and
  `section="work" | "services" | "cv" | "start"`, ends its nav with the
  "Start a project" pill, and renders `LanguageMenu` so the
  Arabic version of a sub-page is reachable from the page, not only from
  `<head>`) and the shared `Footer` with `linkBase={localePath[lang]}`. The services pages exist for search intent
  ("hire a Flutter developer", "مطور فلاتر"); see `docs/seo.md`.
- **Sub-page metadata** comes from `buildPageMetadata` in `lib/site.tsx`,
  which takes a locale-independent `subpath` and emits the self-canonical plus
  the full en/ar/x-default hreflang cluster. It declares the home share cards
  as OG images by default; the English `/work` and `/services` segments have
  their own `opengraph-image.tsx` and **must pass `images: null`** — a
  declared list *replaces* the generated card, and `undefined` would just
  trigger the default. The Arabic routes keep the default: satori can't set
  Arabic. `buildWorkMetadata` / `buildServiceMetadata` encode this.
- **The homepage** is `Portfolio.tsx` — a *server* component that composes
  the sections in `app/components/home/`. The interactive parts are client
  islands: `HomeChrome` (header, floating nav, phone menu dialog, scrollspy),
  `ThemeSwitch`, `StackMap`, `ExperienceTabs`, `CopyEmailButton`, and
  `HomeMotion` (and, on `/start-a-project/`, `InquiryForm`). Pass client islands slices, not the whole dictionary (a
  dictionary prop is serialized into the page); `AgentTools` takes `lang` and
  reads `copy` itself for the same reason.
- **The hero `<h1>`** holds the meta row's first two items (`hero.eyebrow` —
  name + role — and `hero.place`) above the tagline, so the page's one heading
  names the person and the role. Don't move them out to a `<p>`. The
  availability line (`hero.status`) floats beside them but is outside the
  heading. The tagline's words rise on a **transform-only** CSS animation
  (`homeWordRise`) and the in-heading meta row is transform-only too: text
  that starts at `opacity: 0` is excluded from LCP, and this heading is the LCP
  element. Never put opacity on anything inside the `h1`. Spaces between the
  heading's spans are real text nodes — without them its text runs together
  for crawlers and screen readers (the same holds for multi-part links).
- **One hero CTA row, by design** (Tell me what you're building →
  `/start-a-project/` · Explore selected work · Download CV). The brief is
  first because the site's job is inbound projects; the two audiences are
  served by the contact section's lanes. "Let's talk" survives as the
  floating nav's and phone menu's CTA, into `#contact`.
- **Services sit right after "In production"** (section 03): a visitor who
  came to hire finds their situation on the second screen. The rows are
  service *pages* (name · situation · price), not `plans`.
  The first viewport carries the "200,000+ students" figure on the strata card;
  the full proof set is section 02 ("In production").
- **Homepage motion** is declared with data attributes (`data-reveal`,
  `data-line`, `data-count`, `data-stagger`, `data-rise`, `data-parallax`,
  `data-spot`, `data-magnetic`, `data-cursor`, `data-tilt`) and driven by
  `HomeMotion.tsx`. Only content still below the fold is armed, so nothing
  visible at load is hidden and re-shown; reduced motion keeps only the
  reading-progress line. Count-ups only animate plain numbers ("200,000+",
  "41%") — ranges and labels stay as written.
- **Structured data** lives in `app/lib/jsonld.ts` as one `@graph` per page
  type, rendered by `<JsonLd>` in the page (not the root layout). The locale
  layouts emit the site-wide `Person` / `WebSite` / `ProfessionalService`;
  the home page adds `ProfilePage` (the homepage has no FAQ, so no
  `FAQPage`), `/work` adds
  `CollectionPage`/`Article` + breadcrumbs, `/services/` adds its engagement
  FAQ as `FAQPage`, each `/services/<slug>/` adds `Service` + one `Offer`
  per plan it is priced as (none when scoped) + its own `FAQPage`, and
  `/start-a-project/` is a `ContactPage`. **FAQPage only where the FAQ is on
  that URL.**
  Prices come from `Plan.minPrice` (number) and `Plan.price` (string) — change
  both together.
- **Social cards.** The locale home pages (`/`, `/ar/`) declare two candidates
  via `SHARE_IMAGES` in `lib/site.tsx`, both static files under `public/`:
  `og-card.png` (the designed card — what everyone actually sees) then
  `og-home.jpg` (a crop of the hero, the standby). og:image is a *candidate
  list*, not a try-then-fall-back chain: nearly every scraper takes the first,
  Facebook being the one that moves down when an earlier image fails. Twitter
  gets only the first — it shows exactly one.
  The `/work` routes generate theirs per project from `app/lib/og.tsx`
  (`next/og`), via `opengraph-image.tsx` in `app/(en)/work/` and
  `app/(en)/work/[slug]/`. The traps, all load-bearing:
  - **A generated card is an extension-less route**, which `trailingSlash:
    true` then 308s to a trailing-slash path. A static host serves it as
    octet-stream, so `vercel.json` forces the content-type with a wildcard
    rule (`/(.*)opengraph-image-(.*)`) — exact-path rules silently never
    match. A plain file under `public/` has neither problem, which is why the
    home cards are one.
  - A declared `openGraph.images` **only applies if there is no
    `opengraph-image.*` file in that segment** — the file convention wins.
  - A generated image file **must sit in the same segment as its page**. With
    no `app/layout.tsx`, the `(en)`/`(ar)` groups *are* the root layouts, so an
    image at `app/` is built as its own route and attached to nothing. The site
    shipped for months with no share image because of this.
  - satori can't use `next/font`, so `app/fonts/*.ttf` are checked in (see the
    README there). Generated cards are Latin-only: satori reverses Arabic word
    order.
  - `meta.social` (short) feeds `og:`/`twitter:description`, not
    `meta.description` — WhatsApp and LinkedIn cut around 150 characters.
  - Keep share images ~1200x630 and under ~300KB; WhatsApp skips heavier ones.
  - After any change here: `curl -sIL <og:image url> | grep -i content-type`.
  - **Regenerating `og-card.png`** (do this when the hero copy changes — a
    static file can't track the dictionary the way a route did):
    `git show 9649a91:'app/(en)/opengraph-image.tsx' > 'app/(en)/opengraph-image.tsx'`,
    `npm run build`, `cp out/opengraph-image-* public/images/og-card.png`, then
    delete the route again — leaving it in place would override `SHARE_IMAGES`
    and drop the second candidate. `renderSiteOgImage` in `lib/og.tsx` is kept
    for exactly this.
- SEO/crawl files: `app/robots.txt/route.ts`, `app/sitemap.ts` (every page
  in both locales, each with the full hreflang alternate set and a `lastmod`
  of `BUILD_DATE` from `lib/jsonld.ts` — the same constant as every page's
  `dateModified`, so the two can't disagree),
  `public/llms.txt` (hand-written index — update it when prices, pages, or the
  availability line change), `app/llms-full.txt/route.ts` (every English
  Markdown twin in one file, generated), `public/<indexnow-key>.txt` +
  `scripts/indexnow.sh` (Bing/ChatGPT-search pings; run after a deploy), and
  `app/icon.svg` / `app/apple-icon.png`.

  robots.txt is a **route handler, not `app/robots.ts`** — Next's
  `MetadataRoute.Robots` convention can only emit directives it models, and the
  `Content-Signal` line is not one of them. Don't "restore" the convention.
  It lists the AI *search* crawlers as explicit `Allow` groups; training-only
  bots (GPTBot, ClaudeBot, Google-Extended) are deliberately absent — adding
  them would opt in to training against the `ai-train=no` signal.
- **Agent discovery.** See `docs/agent-readiness.md` for the whole picture and
  the post-deploy `curl` checks. The load-bearing parts:
  - **Markdown twins.** Every page has one at `<page path>index.md`, rendered
    by a `force-static` route handler from `app/lib/markdown.ts` — the *same*
    dictionary the React tree renders, so the two can't drift. Add a page →
    add its twin and its `vercel.json` redirect.
  - `vercel.json` negotiates `Accept: text/markdown` with **307 redirects, not
    rewrites**: a vercel.json rewrite is evaluated *after* the filesystem
    check, so a rewrite on `/` (which resolves to `index.html`) never fires.
    The `/work/:slug` rule is constrained to `([a-z0-9-]+)` so it can't match
    `index.md` and bounce a Markdown request to `…/index.md/index.md`.
  - Static export drops the headers a route handler returns, so every
    content-type comes from a `vercel.json` rule — `/(.*).md` and the
    extension-less catalog. Use **wildcard** sources: `trailingSlash: true`
    308s extension-less paths, and an exact-path rule then silently misses
    (the same trap as the OG images above).
  - The `Link` header's hreflang entries must be the **full en/ar/x-default
    set with absolute URLs** — a relative or partial set is invalid to Google
    and Lighthouse (it shipped that way for months).
  - `vercel.json`'s first `/(.*)` rule is the **security headers** (HSTS with
    `includeSubDomains`, `nosniff`, `X-Frame-Options`, Referrer-Policy,
    Permissions-Policy, and a CSP in **report-only** mode). The CSP is
    report-only on purpose: Next inlines scripts a static export can't nonce,
    Cloudflare injects its own, and nothing collects the reports yet — flip it
    to enforcing only after a week of clean consoles on production. If a new
    third-party script or fetch is added, add its origin to the policy.
  - `public/.well-known/agent-skills/index.json` carries a `sha256:` digest per
    `SKILL.md`. **Editing a skill without recomputing its digest ships a file
    that fails integrity checks** — the one-liner is in the doc.
  - `AgentTools.tsx` (WebMCP) is intentionally **read-only**: it drafts a
    `mailto:` and never POSTs the contact form. Don't add a sending tool.
  - `public/.well-known/http-message-signatures-directory` is the Web Bot Auth
    JWKS — the **outbound** half of the agent surface: it identifies requests
    *this* domain signs and sends, not requests it receives. Nothing signs
    anything today, so it is inert on purpose. **The private key is not in this
    repo and must never be committed.** Rotating means replacing `x` *and*
    `kid` (the RFC 8037 thumbprint) together.
  - **DNS-AID lives in DNS, not here.** `scripts/dns-aid.sh apply|verify` owns
    the `_index._agents` SVCB record on Cloudflare (published; verify with the
    script, never by editing this repo). Only `_index` is published — no
    `_a2a`, and no agent protocol in `alpn`, because there is no agent endpoint
    to hand anyone. Don't debug it with `dig SVCB …` on macOS: DiG 9.10.6
    predates the type and returns the name's A records instead. The auditor
    still marks `dnsAid` failed because **DNSSEC is deliberately off** — the
    registrar can't take Cloudflare's algorithm-13 DS. That is a settled
    decision, not a TODO; the reasoning is in `docs/agent-readiness.md`.
  - The audit's OAuth / MCP-server-card / payments / commerce items are
    **declined on purpose**, not forgotten. The doc says why for each: the site
    has no API, no accounts, and nothing machine-purchasable, and publishing
    discovery metadata for endpoints that don't exist points agents at 404s.

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
- `nav` is the homepage's five section anchors (Services, Work, Experience,
  About, Contact), in page order. It must keep a `#contact` entry — `WorkHeader` borrows its label —
  and the sub-page `Footer` renders it against `linkBase`. A non-anchor entry
  would need `asset()`, since Next only applies `basePath` to `<Link>`.
- `CaseStudy.shots` is `Shot[]` (`{src, alt, caption}`), not bare paths — the
  caption is what makes an Arabic-only screenshot legible to an English
  reader on the `/work` page.
- **A case study needs `published` (ISO date), `metaDescription` (~150
  chars, the SERP snippet — the summary runs 200+ and was cut mid-sentence)
  and `requirements` ("What it had to do", restated only from its own
  challenge/decisions), and should have `decisions`.**
  `published` feeds `Article.datePublished`; without it a study had only the
  build date and appeared to change on every deploy. `decisions` is the
  "what I chose over what, and why" block — the part a hiring manager reads a
  case study for, and the thing the original three studies lacked. Write a
  decision only where there was a real alternative; a feature list is
  `process`, not a decision. `appCategory`/`platforms` feed the
  `SoftwareApplication` node.
- **The homepage features the first three studies** (`FEATURED` in
  `home/WorkSection.tsx`), sorted by `workProjects` (the `featured` flag) so
  its three and `/work`'s first three agree: the first on a screen stage, the
  second as the Talia system diagram (`home.talia` — any other study falls
  back to the stage), the third as the full-width card. The rest are rows,
  showing `results[highlight ?? 0]`. `/work` renders all of them.
- A product belongs in `selectedWork` **or** in `caseStudies`, not both — the
  "also shipped" strip exists for apps that have a store link and no write-up.
- Anything the `/work` and `/services` pages render comes from
  `Dictionary.work` / `Dictionary.servicePages`; both locales are routed, so
  Arabic copy there is live, not a placeholder.
- Meta titles: `meta.title` must keep a `|` — the part before it is the
  suffix the layout template appends to every sub-page title. Sub-page titles
  (`work.meta`, `servicePages.meta`, each `ServicePage.meta`) are the page's
  own part only, or the suffix doubles.
- `about.facts` is the quotable "at a glance" `<dl>`; one line per value,
  only facts stated elsewhere on the page. `home.stack` and `home.principles`
  follow the same rule: every point on the stack map and every principle is
  taken from a case study or an experience entry (principles cite theirs by
  slug).
- In Arabic copy, a "→" between Arabic words points backwards in RTL — use
  "←" for a flow ("وزارة ← مدرسة"). Latin runs (`datasource → repository`)
  keep "→".
- `Dictionary.markdown` holds the section labels for the `Accept:
  text/markdown` twins. They're not in the HTML UI, but they're still copy a
  human reads through an agent — so they live in the dictionaries, and the
  Arabic twin is genuinely Arabic. Only URLs and slugs are shared between the
  two locales' Markdown.
- Section order is the **JSX sequence in `Portfolio.tsx`**, not a data array.
  Reordering means moving JSX blocks; ids must stay stable (they are the nav
  anchors and the scrollspy targets). The "02"…"09" labels are numbered from
  that same order.

## Theme & language state

- **Language is the URL, not state.** `lang` is a prop passed from the route's
  page; `<html lang>`/`dir` are rendered on the server per locale. The language
  switch in the homepage header and `WorkHeader` is `LanguageMenu` (the
  homepage footer and phone menu also link the other locale by its own name) —
  a menu-button dropdown listing every
  locale by its own name, whose items are plain `<a href>`s built from
  `localePath` (`lib/site.tsx`), not a state toggle. Only open/closed is client
  state; picking a language must stay a navigation, so keep the items real
  links (`hrefLang` + `aria-current`). Do **not** reintroduce a `portfolio-lang`
  localStorage key or let a stored preference rewrite `<html lang>` — that would
  put the served markup out of sync with the URL a crawler indexed.
- **Theme is a preference: `system` (default, "Auto") | `light` | `dark`**,
  stored in the `localStorage` key **`portfolio-theme`**; the resolved theme
  (`dark`|`light`) is written to `<html data-theme>`. `useSiteTheme` is one
  module-level store (`useSyncExternalStore`), so the homepage's three
  `ThemeSwitch` controls and the sub-pages' two-state toggle always agree; it
  follows the OS live while the preference is `system`. It survives a locale
  switch because that is a normal navigation. Visitors from before the
  redesign mostly have `dark` stored (the old hook wrote its default on
  mount), so they keep dark.
- **There is no palette picker any more.** The four-swatch selector, the
  `data-palette` attribute, the `portfolio-palette` key, the `Palette` type
  and the three alternate token sets were removed: a theme playground in the
  header reads as a portfolio feature demo rather than a product, and it took
  the most valuable header pixels on every page. Auto/light/dark stays. Don't
  reintroduce it.
- `lib/site.tsx`'s `noFlashScript` runs before paint, reads that key and
  resolves `system` through `prefers-color-scheme` exactly as `useSiteTheme`
  does, and sets `<html data-theme>` — no theme flash. The store's server
  snapshot is the default, so hydration matches the SSR HTML and React
  re-renders with the stored preference afterwards.
- `dir` comes from each dictionary (`en.dir = "ltr"`, `ar.dir = "rtl"`).

## Styling conventions

- Everything is in **`app/globals.css`** (~5.5k lines). Class-name based; no
  utility classes. Match the existing BEM-ish naming. The homepage is one
  block at the end ("HOMEPAGE — Production strata"): `home-*` for chrome and
  shared parts, then per-section families (`strata-*`, `proof-*`, `feat-*`,
  `cinema-*`, `study-row*`, `stack-map-*`, `exp-*`, `rec-*`, `lane*`,
  `reach*`). New names must not collide with the sub-pages' classes (`case-*`,
  `work-*`, `service-*`, `cv-*`) — the sub-pages still use those.
- **Design tokens are CSS custom properties** defined on `:root` (dark) and
  overridden on `:root[data-theme="light"]`. Use the tokens (`--ink`,
  `--muted`, `--paper`, `--surface`, `--gold`, `--line`, `--radius`, `--max`,
  glass/aurora vars) — **do not hardcode colors**, or you'll break light mode.
- Theme scoping is driven by the `data-theme` attribute on `<html>`. RTL is
  handled via `dir`; prefer logical CSS
  where you add layout so it flips correctly for Arabic. **A directional glyph
  is not logical** — "→", "←" and "↗" are LTR characters, so any one you add
  needs `className="glyph-dir"` (flipped with `scaleX(-1)` under `[dir=rtl]`).
  `.button-icon--go` has its own flip because its hover nudge has to compose
  with the mirror.
- Images use plain `<img>` with `loading="lazy"` and `.webp` assets from
  `public/images`. Decorative images use `alt=""`; meaningful ones have real
  alt text. Logos render at ≤60 px, so an app/company logo should be a real
  WebP at **192 px** and a few KB — three "`.webp`" logos were 50–140 KB PNGs
  with the wrong extension. Re-encode with `sharp` (in `node_modules` via
  Next) rather than committing an export straight from a design tool, and
  give logo `<img>`s the `width`/`height` of their CSS box.

## Accessibility (already established — preserve it)

The codebase already follows good a11y practice; keep it that way:

- Skip link (`.skip-link` → `#home`), visually-hidden labels (`.sr-only`) on
  form inputs, `aria-label` on landmark sections, `aria-hidden` on decorative
  nodes, and both-theme `themeColor`.
- When adding UI, follow the same patterns: real labels, keyboard-operable
  controls, visible focus, and token colors that pass contrast in **both**
  themes.

## Notable specifics

- **There is no contact form backend** (the Web3Forms form was removed with
  the redesign, 2026-09-25, and `api.web3forms.com` left the CSP). The
  contact section is two **lanes** (`contact.lanes`), one per audience — their
  buttons are built from `cvPdf`, `bookingHref` and `shared.socials`, so no
  label is duplicated — then the address with a copy button. Projects go to
  **`/start-a-project/`**: a plain-language brief (`Dictionary.inquiry`) that
  `InquiryForm` composes into an email, a WhatsApp message or the clipboard
  — the visitor sends it; nothing is POSTed anywhere. Without JS it is a
  real `mailto:` form (hence `mailto:` in the CSP `form-action`). Don't
  add a submission endpoint; that is exactly the spam surface the old form
  needed a captcha for. Option keys are shared by both locales and are what
  analytics receives — never the free text or contact details.
- The `--gold` token currently resolves to a purple (`#8b7cf0`); the comments
  still describe an "Obsidian & Gold" palette. Treat the token as the source
  of truth, not the comment, and change the token if adjusting the accent.
- Testimonials are real quotes (LinkedIn recommendations, excerpted; full
  texts in `assets/linkedin.json`). The first entry is the homepage's
  featured quote. The section hides itself if the list is ever emptied. There is no placeholder/sample mechanism — don't add fake
  quotes.
- **App lifecycle honesty**: `storeLinks` in `shared.ts` carries a `status`
  (`live | retired | private | unreleased`) per app. Only real https URLs
  render store buttons; non-live apps get a status badge. Never claim "live"
  in copy for the aggregate numbers — say "shipped".
- **Analytics and conversion events** — see `docs/analytics.md`. Vercel Web
  Analytics + Speed Insights load from `RootHtml`. A CTA declares its event
  with `data-track="<event>"` + `data-track-<prop>` attributes and stays a
  server component; `TrackClicks.tsx` (one delegated listener) reports them.
  Page-view events use `<TrackPageView>`, which seeds the SDK's `window.va`
  queue first because `<Analytics />` mounts *after* the page's effects in a
  static export — a bare `track()` in a mount effect is a silent no-op. Add
  events only from the catalogue in the doc; don't add scroll/theme events.
  `TrackPageView` is also how `/cv/`-style pages could report a view.
  The optional Umami hook (`NEXT_PUBLIC_ANALYTICS_SRC` / `_ID` at build time)
  is unset; unset means no script is emitted.

## Design skills

Project-local UI/UX skills live in `.claude/skills/` (accessibility-wcag,
visual-design-refactoring, color-and-typography, responsive-mobile-first,
motion-microinteractions, ux-heuristics-audit, interactive-portfolio). They
load automatically for matching design tasks, or invoke with `/<skill-name>`.
Use them when doing visual/UX work on this site.
