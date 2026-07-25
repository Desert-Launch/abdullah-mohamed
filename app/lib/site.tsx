import type { Metadata, Viewport } from "next";
import { DM_Sans, Cairo } from "next/font/google";
import { copy } from "../data/copy";
import type { Lang } from "../data/types";

// DM Sans — a geometric, low-contrast open sans in the Google Sans family.
// (Google Sans / Product Sans itself is proprietary and can't be bundled. To use
// real licensed files, swap this for next/font/local pointing at app/fonts/.)
export const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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

/** The other locale — used for the language switch link. */
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
const SHARE_IMAGES = [
  {
    url: "/images/og-card.png",
    width: 1200,
    height: 630,
    alt: "Abdullah Mohamed — I build products that ship, and survive production. Senior Software Engineer, Cairo, Egypt.",
  },
  {
    url: "/images/og-home.jpg",
    width: 1200,
    height: 630,
    alt: "The abdullahmohamed.dev hero: I build products that ship, and survive production.",
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
    keywords: [
      "Abdullah Mohamed",
      "Full-stack engineer",
      "Senior Software Engineer",
      "React developer",
      "Node.js developer",
      "PostgreSQL",
      "AI product engineer",
      "Real-time AI",
      "Flutter developer",
      "Freelance software engineer",
      "Egypt",
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

export const siteViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e0d0b" },
    { media: "(prefers-color-scheme: light)", color: "#faf8f2" },
  ],
};

/** Person schema — the primary machine-readable answer to "who is this and
 *  what can I hire them for". Emitted on both locales. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abdullah Mohamed",
  givenName: "Abdullah",
  familyName: "Mohamed",
  jobTitle: "Senior Software Engineer",
  description: copy.en.meta.description,
  url: SITE_URL,
  image: `${SITE_URL}/images/abdullah.webp`,
  email: "mailto:hi@abdullahmohamed.dev",
  telephone: "+20-111-185-2544",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
  knowsLanguage: ["en", "ar"],
  knowsAbout: [
    "Full-stack web development",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "SvelteKit",
    "TypeScript",
    "REST APIs",
    "WebSocket",
    "Real-time AI",
    "Azure OpenAI",
    "AWS",
    "Docker",
    "CI/CD",
    "Flutter",
    "Mobile app development",
    "Multi-tenant SaaS",
    "RBAC",
  ],
  worksFor: { "@type": "Organization", name: "Appenza Studio" },
  sameAs: [
    "https://github.com/Abdullah3010",
    "https://www.linkedin.com/in/abdullah-mohamed-3010",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Senior Full-Stack Software Engineer",
    occupationLocation: { "@type": "City", name: "Cairo" },
    skills: "Full-stack web, real-time AI, mobile, DevOps",
  },
  // Starting prices, mirroring the pricing cards. Kept in sync by hand — if the
  // plan cards change, change these too.
  makesOffer: [
    offer("SaaS / full system build", 6000),
    offer("Web app build", 3500),
    offer("Real-time AI feature", 3000),
    offer("Mobile app build", 5000),
  ],
};

function offer(name: string, minPrice: number) {
  return {
    "@type": "Offer",
    name,
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice,
      priceCurrency: "USD",
    },
  };
}

/** FAQ rich-result schema, generated from the dictionary for the locale being
 *  rendered, so the on-page FAQ and the structured data can never drift apart. */
function faqJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: copy[lang].faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

// Privacy-light analytics (e.g. Umami Cloud), opt-in via env at build time:
//   NEXT_PUBLIC_ANALYTICS_SRC = script URL (https://cloud.umami.is/script.js)
//   NEXT_PUBLIC_ANALYTICS_ID  = the site/website id from the provider
// Unset (local dev, forks) → no script is emitted at all.
const analyticsSrc = process.env.NEXT_PUBLIC_ANALYTICS_SRC;
const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;

// Runs before paint to apply the saved theme/palette and avoid a flash of the
// default theme (FOUC). It deliberately does NOT touch lang/dir: the URL is the
// single source of truth for language now, so a stored preference must never
// override the locale the server rendered.
const noFlashScript = `(function(){try{var d=document.documentElement;d.dataset.revealReady='1';var t=localStorage.getItem('portfolio-theme');d.dataset.theme=(t==='light'||t==='dark')?t:'dark';var p=localStorage.getItem('portfolio-palette');d.dataset.palette=(p==='terracotta'||p==='teal'||p==='gold')?p:'current';}catch(e){d.dataset.theme='dark';d.dataset.palette='current';}})();`;

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
      data-palette="current"
      className={`${sans.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(lang)) }}
        />
        {analyticsSrc && analyticsId ? (
          <script defer src={analyticsSrc} data-website-id={analyticsId} />
        ) : null}
      </head>
      <body suppressHydrationWarning>
        <a className="skip-link" href="#home">
          {t.skipLink}
        </a>
        {children}
      </body>
    </html>
  );
}
