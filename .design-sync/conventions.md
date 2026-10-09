# Abdullah Mohamed — portfolio design system

The real components and stylesheet of abdullahmohamed.dev: a bilingual
(English / Arabic, full RTL) dark-first portfolio site in an editorial style —
large light type, hairline rules, numbered sections, no card grids. Plain CSS
classes and CSS custom properties — **no utility classes, no CSS-in-JS, no
style props.**

## Setup

Everything is on `window.AbdullahPortfolio`: the components plus the site's
real content and helpers.

```jsx
const { Portfolio, WorkHeader, Footer, copy, shared } = window.AbdullahPortfolio;
```

- **Wrap homepage-style work in `.home` with a `dir`, and each section's
  content in `.home-wrap`.** `.home` sets the ink colour, the font and the
  motion easing; `dir="rtl"` switches the font to Cairo and drops the negative
  tracking Arabic can't take. `.home-wrap` is the 1320px column with the side
  gutters. Without them sections run edge to edge in the wrong font.
  `<div className="home" dir="ltr"><section className="home-section home-wrap">…</section></div>`
- **Page components render their own shell, header and footer** —
  `Portfolio` (the homepage), `CvPage`, `WorkIndex`, `WorkDetail`,
  `ServicesIndex`, `ServiceDetail`. Render them bare: `<Portfolio lang="en" />`.
  The sub-pages use the older `.site-shell` layout with `WorkHeader` and
  `Footer`.
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

Homepage copy lives in `copy[lang].home` (strata, stack map, principles),
`hero`, `proof`, `caseStudiesHeading`, `workHeading`, `servicesHeading`,
`processHeading` and `contact`. Image paths like `/images/…` go through
`asset()`, which resolves them against the live site — pass the paths as they
appear in `copy`/`shared`.

## Styling vocabulary (from `_ds_bundle.css`)

| Family | Classes |
|---|---|
| Layout | `home`, `home-wrap`, `home-section`, `home-head` (h2 + side paragraph), `home-kicker` (small muted label) |
| Section label | `home-label` > `home-label-n` (the "02"), `home-label-text`, `home-label-line` (the hairline) |
| Links & rows | `home-link` (muted text link), `home-rows` > `li` > `home-row` (full-width ruled row) with `home-row-n` and `home-row-arrow` |
| Buttons | `button primary`, `button ghost`, `button secondary`; trailing `<span className="button-icon button-icon--go">→</span>` |
| Lists | `proof-list`, `about-list`, `feat-metrics` — `dl`s of ruled rows |
| Pieces | `device` (a phone screen in a bezel), `home-spot` (pointer-lit wash), `feat-stage`, `feat-diagram`, `strata`, `tag-row` (+ `compact`) |
| Steps | `process` > `ol` > `li` with `process-dot`, `process-n`, `h4`, `p` |
| RTL | a `→ ← ↗` glyph needs `className="glyph-dir"` to mirror in Arabic — except inside `button-icon--go`, which mirrors itself |

Tokens — use `var(--…)`, never hex: `--ink`, `--ink-soft`, `--muted`,
`--paper`, `--surface`, `--surface-solid`, `--surface-soft`, `--line`,
`--gold` (the accent — it is purple), `--gold-soft`, `--glass`,
`--glass-strong`, `--glass-border`, `--radius`, `--max`, `--shadow`,
`--success`, `--danger`. Fonts: `var(--font-sans)` (DM Sans) and
`var(--font-cairo)` (Cairo). Weights stay light: 400 body, 500 headings and
display type, 600 emphasis — nothing heavier. Display type tracks tight
(`letter-spacing` around -0.04em) and sits at line-height ~1.

Read `_ds_bundle.css` (the `HOMEPAGE — "Production strata"` block) before
inventing a class; each component's `.prompt.md` shows it composed with real
`copy`.

## Example

```jsx
const { copy } = window.AbdullahPortfolio;
const t = copy.en;

<div className="home" dir="ltr">
  <section className="home-section home-wrap">
    <div className="home-label">
      <span className="home-label-n">08</span>
      <span className="home-label-text">{t.servicesHeading.eyebrow}</span>
      <span className="home-label-line" />
    </div>
    <div className="home-head">
      <h2>{t.servicesHeading.title}</h2>
      <p>{t.servicesHeading.body}</p>
    </div>
    <div className="process">
      <h3>{t.processHeading.title}</h3>
      <ol>
        {t.process.map((step, i) => (
          <li key={step.title}>
            <span className="process-dot" />
            <span className="process-n">{String(i + 1).padStart(2, "0")}</span>
            <h4>{step.title}</h4>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
    <a className="button primary" href="#contact">
      {t.hero.talk} <span className="button-icon button-icon--go">→</span>
    </a>
  </section>
</div>
```
