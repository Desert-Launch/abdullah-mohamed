import type { Metadata, Viewport } from "next";
import { DM_Sans, Cairo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TrackClicks } from "../components/TrackClicks";
import { copy } from "../data/copy";
import type { Lang } from "../data/types";

// DM Sans — a geometric, low-contrast open sans in the Google Sans family.
// (Google Sans / Product Sans itself is proprietary and can't be bundled. To use
// real licensed files, swap this for next/font/local pointing at app/fonts/.)
// Weights match what globals.css actually sets (400/500/600/700); each extra
// weight is another woff2 on the critical path.
export const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

// Production serves the www host; the apex 308-redirects to it. Every SEO
// signal (canonical, og:url, hreflang, JSON-LD url, sitemap, robots) derives
// from this constant, so it must match the host that actually answers 200.
export const SITE_URL = "https://www.abdullahmohamed.dev";

/**
 * Canonical path per locale. `trailingSlash: true` in next.config.mjs, so both
 * end in "/" — these strings are the canonical form and must not redirect.
 * English keeps the bare root it has always had; Arabic gets its own URL so it
 * can actually be crawled.
 */
export const localePath: Record<Lang, string> = { en: "/", ar: "/ar/" };

/** The other locale — used for og:alternateLocale. (The header's language menu
 *  lists every locale by name, so it reads `localePath` directly.) */
export const otherLang: Record<Lang, Lang> = { en: "ar", ar: "en" };

const OG_LOCALE: Record<Lang, string> = { en: "en_US", ar: "ar_EG" };

/**
 * The cards WhatsApp, LinkedIn and X show for either locale home page, in
 * preference order.
 *
 * og:image is a *candidate list*, not a try-this-then-that chain: nearly every
 * scraper takes the first one, and Facebook is the notable one that moves down
 * the list when an earlier image fails to fetch or is too small. So the first
 * entry is what people will actually see — the designed card — and the hero
 * crop is the standby.
 *
 * Both are plain files under `public/`, not generated `opengraph-image.tsx`
 * routes, and that is load-bearing twice over:
 *   1. A generated card is an extension-less route, which `trailingSlash: true`
 *      308s to a trailing-slash path — a static host serves it as
 *      octet-stream, and some scrapers won't follow the redirect. A real
 *      .png/.jpg has neither problem.
 *   2. The file convention *replaces* anything declared here, so a single
 *      generated card would make a second candidate impossible.
 * (The /work cards are still generated — one card per project can't be a
 * static file — so they still depend on the content-type rule in vercel.json.)
 *
 * `og-card.png` is baked from `renderSiteOgImage` in lib/og.tsx; regenerate it
 * when the hero copy changes (see CLAUDE.md). Both are 1200x630 and ~110-140KB:
 * WhatsApp routinely skips previews for images much over 300KB.
 */
export const SHARE_IMAGES = [
  {
    url: "/images/og-card.png",
    width: 1200,
    height: 630,
    alt: "Abdullah Mohamed — Full-stack, real-time AI, and Flutter: products that ship and hold up in production. Senior Software Engineer, Cairo, Egypt.",
  },
  {
    url: "/images/og-home.jpg",
    width: 1200,
    height: 630,
    alt: "The abdullahmohamed.dev hero: full-stack, real-time AI, and Flutter — products that ship and hold up in production.",
  },
];

export function buildMetadata(lang: Lang): Metadata {
  const t = copy[lang];
  const { title, description } = t.meta;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s | ${title.split("|")[0].trim()}` },
    description,
    applicationName: "Abdullah Mohamed Portfolio",
    authors: [{ name: "Abdullah Mohamed", url: SITE_URL }],
    creator: "Abdullah Mohamed",
    // Google ignores this tag; Bing (and so ChatGPT search, which is built on
    // Bing's index) still reads it lightly. Phrased the way people search —
    // role + stack + place + intent — not as a bag of nouns.
    keywords: [
      "Abdullah Mohamed",
      "Abdullah Mohamed software engineer",
      "senior software engineer Cairo",
      "senior software engineer Egypt remote",
      "full-stack developer Egypt",
      "freelance full-stack developer",
      "hire React Node.js developer",
      "Flutter developer Egypt",
      "freelance Flutter developer",
      "hire Flutter developer",
      "real-time AI integration developer",
      "AI chatbot voice integration",
      "SaaS MVP developer",
      "multi-tenant SaaS development",
      "Arabic RTL app developer",
      "PostgreSQL",
      "Next.js",
    ],
    // Self-referential canonical per locale, plus the full hreflang cluster.
    // x-default points at English, the locale served from the bare root.
    alternates: {
      canonical: localePath[lang],
      languages: {
        en: localePath.en,
        ar: localePath.ar,
        "x-default": localePath.en,
      },
    },
    openGraph: {
      type: "website",
      url: localePath[lang],
      siteName: "Abdullah Mohamed",
      title,
      // The share preview gets the short description: WhatsApp and LinkedIn
      // cut around 150 characters, so the SERP-length one above would be
      // truncated mid-sentence.
      description: t.meta.social,
      locale: OG_LOCALE[lang],
      alternateLocale: [OG_LOCALE[otherLang[lang]]],
      images: SHARE_IMAGES,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t.meta.social,
      // Twitter shows exactly one image; no candidate list to fall back through.
      images: [SHARE_IMAGES[0]],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

/**
 * Metadata for a standalone sub-page (`/work/…`, `/services/…`), which exists
 * at the same `subpath` under every locale root — so it gets the same
 * self-canonical + full hreflang cluster the home pages have.
 *
 * Next merges metadata shallowly, so `openGraph` and `alternates` here replace
 * the locale layout's versions wholesale rather than extending them — every
 * field a page needs must be declared.
 *
 * `images` defaults to the home share cards. A segment with its own
 * `opengraph-image.tsx` (the English /work and /services routes) must pass
 * `images: null`: a list declared here *replaces* the generated card (verified
 * in the build output — the file convention only wins when nothing is
 * declared), and `null` is an explicit "declare nothing" that a destructuring
 * default can't swallow the way `undefined` would.
 */
export function buildPageMetadata({
  lang,
  title,
  description,
  subpath,
  type = "website",
  images = SHARE_IMAGES,
}: {
  lang: Lang;
  title: string;
  description: string;
  /** Path below the locale root, e.g. "work/faheem/". */
  subpath: string;
  type?: "website" | "article";
  images?: typeof SHARE_IMAGES | null;
}): Metadata {
  const path = `${localePath[lang]}${subpath}`;
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        en: `${localePath.en}${subpath}`,
        ar: `${localePath.ar}${subpath}`,
        "x-default": `${localePath.en}${subpath}`,
      },
    },
    openGraph: {
      type,
      url: `${SITE_URL}${path}`,
      siteName: "Abdullah Mohamed",
      title,
      description,
      locale: OG_LOCALE[lang],
      alternateLocale: [OG_LOCALE[otherLang[lang]]],
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images ? { images: [images[0]] } : {}),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export const siteViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e0d0b" },
    { media: "(prefers-color-scheme: light)", color: "#faf8f2" },
  ],
};

// Structured data lives in app/lib/jsonld.ts. The site-wide graph (Person,
// WebSite, ProfessionalService) is rendered by each locale layout; page-level
// nodes (ProfilePage + FAQ, Article, Service…) by the page that owns them. The
// root layout emits none itself: it cannot see the route, and FAQPage markup
// on a page with no FAQ is a guidelines violation.

// Privacy-light analytics (e.g. Umami Cloud), opt-in via env at build time:
//   NEXT_PUBLIC_ANALYTICS_SRC = script URL (https://cloud.umami.is/script.js)
//   NEXT_PUBLIC_ANALYTICS_ID  = the site/website id from the provider
// Unset (local dev, forks) → no script is emitted at all.
const analyticsSrc = process.env.NEXT_PUBLIC_ANALYTICS_SRC;
const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;

// Runs before paint to apply the theme and avoid a flash of the wrong one
// (FOUC). The stored value is a preference — "light", "dark", or "system"/unset,
// which follows the OS — resolved exactly as `useSiteTheme` resolves it. It
// deliberately does NOT touch lang/dir: the URL is the single source of truth
// for language, so a stored preference must never override the locale the
// server rendered.
const noFlashScript = `(function(){var d=document.documentElement;d.dataset.revealReady='1';try{var t=localStorage.getItem('portfolio-theme');d.dataset.theme=(t==='light'||t==='dark')?t:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');}catch(e){d.dataset.theme='dark';}})();`;

/**
 * The `<html>` shell, parameterised by locale. `<html>` may only be rendered by
 * a root layout and a root layout cannot read the current route, so each locale
 * has its own root layout (via route groups) and both call this.
 */
export function RootHtml({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  const t = copy[lang];
  return (
    <html
      lang={lang}
      dir={t.dir}
      data-theme="dark"
      className={`${sans.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
        {analyticsSrc && analyticsId ? (
          <script defer src={analyticsSrc} data-website-id={analyticsId} />
        ) : null}
      </head>
      <body suppressHydrationWarning>
        <a className="skip-link" href="#home">
          {t.skipLink}
        </a>
        {children}
        <Analytics />
        <SpeedInsights />
        {/* Conversion events for every `data-track` CTA (docs/analytics.md). */}
        <TrackClicks />
      </body>
    </html>
  );
}
