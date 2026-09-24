# Abdullah Mohamed — portfolio design system

The real components and stylesheet of abdullahmohamed.dev: a bilingual
(English / Arabic, full RTL) dark-first portfolio site. Plain CSS classes and
CSS custom properties — **no utility classes, no CSS-in-JS, no style props.**

## Setup

Everything is on `window.AbdullahPortfolio`: the components plus the site's
real content and helpers.

```jsx
const { Hero, Footer, copy, shared } = window.AbdullahPortfolio;
```

- **Wrap sections in `.site-shell` with a `dir`.** It sets the 1180px column
  and gutters; `dir="rtl"` also switches the font to Cairo. Without it,
  sections run edge to edge and Arabic renders in the Latin font.
  `<div className="site-shell" dir="ltr">…</div>`
- **Page components render their own shell, header and footer** —
  `Portfolio`, `CvPage`, `WorkIndex`, `WorkDetail`, `ServicesIndex`,
  `ServiceDetail`. Render them bare: `<WorkIndex lang="en" />`.
- **Don't paint the page background.** The stylesheet's `body` rule draws the
  `--paper` colour, the aurora wash and the ink colour; the ink is cream, so a
  white background makes all text vanish.
- **Theme**: dark by default. Light theme = `data-theme="light"` on `<html>`
  (tokens are redefined on `:root[data-theme="light"]`), never on a div.

## Content comes from `copy`, never invented

Components take the whole dictionary: `t={copy.en}` or `t={copy.ar}`, with a
matching `lang="en" | "ar"`. The prop types name these shapes:

| Type | Where to get one |
|---|---|
| `Dictionary` | `copy.en` / `copy.ar` |
| `Social` | `shared.socials` (the array is what `socials` takes) |
| `CaseStudy` | `findProject("faheem", lang)` or `copy[lang].caseStudies[i]` |
| `ServicePage` | `servicePages(lang)[i]` or `findService(slug, lang)` |
| `Shot` | `{ src, alt, caption }` — `copy[lang].caseStudies[i].shots` |
| `ContactFormCopy` | `copy[lang].contact.form` |

Image paths like `/images/…` go through `asset()`, which resolves them against
the live site — pass the paths as they appear in `copy`/`shared`.

## Styling vocabulary (from `_ds_bundle.css`)

| Family | Classes |
|---|---|
| Layout | `site-shell`, `section`, `section-heading` (eyebrow + h2 + p), `split-section`, `sticky-heading` |
| Type | `eyebrow` (small caps kicker); `h1`–`h3` are styled globally |
| Buttons | `button primary`, `button ghost`, `button secondary`; trailing `<span className="button-icon button-icon--go">→</span>` |
| Cards | `service-card`, `case-card`, `plan-card`, `process-step`, `hero-proof-item`, `contact-section` |
| Grids | `service-grid`, `process-grid`, `case-grid`, `plans-grid`, `tag-row` (+ `compact`) |
| RTL | a `→ ← ↗` glyph needs `className="glyph-dir"` to mirror in Arabic — except inside `button-icon--go`, which mirrors itself |

Tokens — use `var(--…)`, never hex: `--ink`, `--ink-soft`, `--muted`,
`--paper`, `--surface`, `--surface-solid`, `--surface-soft`, `--line`,
`--gold` (the accent — it is purple), `--gold-soft`, `--glass`,
`--glass-strong`, `--glass-border`, `--radius`, `--max`, `--shadow`,
`--success`, `--danger`. Fonts: `var(--font-sans)` (DM Sans) and
`var(--font-cairo)` (Cairo). Weights stay light: 400 body, 500 headings,
600 emphasis — nothing heavier.

Read `_ds_bundle.css` before inventing a class; each component's
`.prompt.md` shows it composed with real `copy`.

## Example

```jsx
const { Hero, copy, shared } = window.AbdullahPortfolio;
const t = copy.en;

<div className="site-shell" dir="ltr">
  <Hero t={t} lang="en" socials={shared.socials} />
  <section className="section">
    <div className="section-heading">
      <p className="eyebrow">{t.processHeading.eyebrow}</p>
      <h2>{t.processHeading.title}</h2>
    </div>
    <ol className="process-grid">
      {t.process.map((step, i) => (
        <li className="process-step" key={step.title}>
          <span className="process-number">{String(i + 1).padStart(2, "0")}</span>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
        </li>
      ))}
    </ol>
    <a className="button primary" href="#contact">
      {t.hero.primary} <span className="button-icon button-icon--go">→</span>
    </a>
  </section>
</div>
```
