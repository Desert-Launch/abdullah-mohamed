# Content TODO — status after the 2026-07-14 build

Everything you provided has been wired into the site. What follows is what's
done and the few items still open.

## ✅ Done (wired into the site)

- **Store links & status badges** — live apps (Faheem, YOLO, BTC, Q-Fight,
  Al-Muslim, pharmacy developer pages) link to their stores; retired /
  private / unreleased apps show honest badges ("Shipped 2023 · Retired",
  "Private build", "Unreleased") in EN and AR. Sitewide copy audited: the
  site now claims "shipped", never "live", for the aggregate numbers.
- **Testimonials** — 3 real quotes excerpted from your LinkedIn
  recommendations (Mohamed Sayed / Appenza, Ahmed Farid / Recovery Advisers,
  Mohamad Zakaria / Yassir) with headshots, in both languages. Full originals
  remain in `assets/linkedin.json`.
- **Screenshots** — Faheem shots in its case study; YOLO and BTC shots on
  their experience cards. Sources under `assets/`, web copies in
  `public/images/shots/`.
- **Contact form** — now actually submits via Web3Forms (your access key),
  with success/error messages, honeypot spam guard, a "Copy email" button,
  and mailto fallback if the key is ever removed.
- **New sections** — Engagement plans, Process, Testimonials, FAQ (with
  Google FAQ structured data). Nav kept as-is per your decision.
- **Availability line** — hero now says: "Currently building Faheem & Talia
  at Appenza, shipping Zikr in late July — taking new projects from August
  2026." Update this in `hero.currently` (en.ts + ar.ts) when the date
  passes.

## 🔲 Still open

1. **Analytics** — GoatCounter didn't work for you, so the site is wired for
   any Umami-style script, gated on env vars (nothing loads until they're
   set). Recommended: create a free account at **cloud.umami.is**, add the
   site, then put these in the GitHub Actions build step
   (`.github/workflows/deploy.yml`):
   - `NEXT_PUBLIC_ANALYTICS_SRC=https://cloud.umami.is/script.js`
   - `NEXT_PUBLIC_ANALYTICS_ID=<your website id>`
   Note: the footer currently says "No tracking · No cookies" — Umami is
   cookieless, but reword to "No cookies" alone when analytics goes live.
2. **Q-Fight Google Play** — still under review. When it's live, paste the
   URL into `storeLinks.qfight.play` in `app/data/shared.ts` and the button
   appears.
3. **Optional screenshots** — IMOX (some files already in `assets/imox/`)
   and Jaweb are retired; if you recover more shots (Wayback, Play Console,
   old repos' `fastlane/` folders), they can be added the same way.
4. **CV freshness** — `public/Abdullah_Mohamed_Abdullah_CV.pdf` exists and is
   linked from the hero; confirm it includes Faheem/Appenza, or export a
   fresh one over it.
5. **GitHub pinning** — done on GitHub itself, not in this repo: pin the six
   repos you listed (zikr, el-muslim, Fight-Gym-App, Xera back end/customer/
   portal) and give each a README with a screenshot.
