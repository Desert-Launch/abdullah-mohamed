import "./globals.css";
import type { Metadata, Viewport } from "next";
import { DM_Sans, Cairo } from "next/font/google";

// DM Sans — a geometric, low-contrast open sans in the Google Sans family.
// (Google Sans / Product Sans itself is proprietary and can't be bundled. To use
// real licensed files, swap this for next/font/local pointing at app/fonts/.)
const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

const SITE_URL = "https://abdullahmohamed.dev";
const DESCRIPTION =
  "Abdullah Mohamed is a senior software engineer who builds AI products, Flutter apps, backend systems, and deployment pipelines that survive production. Available for freelance and product roles.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Abdullah Mohamed | Senior Software Engineer",
    template: "%s | Abdullah Mohamed",
  },
  description: DESCRIPTION,
  applicationName: "Abdullah Mohamed Portfolio",
  authors: [{ name: "Abdullah Mohamed", url: SITE_URL }],
  creator: "Abdullah Mohamed",
  keywords: [
    "Abdullah Mohamed",
    "Senior Software Engineer",
    "Flutter developer",
    "Node.js developer",
    "AI product engineer",
    "Full-stack engineer",
    "Mobile app developer",
    "Freelance software engineer",
    "Egypt",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Abdullah Mohamed",
    title: "Abdullah Mohamed | Senior Software Engineer",
    description: DESCRIPTION,
    locale: "en_US",
    alternateLocale: ["ar_AR"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdullah Mohamed | Senior Software Engineer",
    description: DESCRIPTION,
    creator: "@Abdullah3010",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e0d0b" },
    { media: "(prefers-color-scheme: light)", color: "#faf8f2" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abdullah Mohamed",
  jobTitle: "Senior Software Engineer",
  description: DESCRIPTION,
  url: SITE_URL,
  email: "mailto:abdullah.mohamed102001@gmail.com",
  knowsAbout: [
    "Flutter",
    "Dart",
    "Node.js",
    "PostgreSQL",
    "AWS",
    "Azure OpenAI",
    "Docker",
    "AI product development",
    "Mobile app development",
  ],
  sameAs: [
    "https://github.com/Abdullah3010",
    "https://linkedin.com/in/abdullah-mohamed-3010",
  ],
  worksFor: { "@type": "Organization", name: "Appenza Studio" },
};

// Runs before paint to apply the saved theme/language and avoid a flash of the
// default theme (FOUC) on load, especially the LTR->RTL flip for Arabic visitors.
const noFlashScript = `(function(){try{var d=document.documentElement;d.dataset.revealReady='1';var t=localStorage.getItem('portfolio-theme');d.dataset.theme=(t==='light'||t==='dark')?t:'dark';var p=localStorage.getItem('portfolio-palette');d.dataset.palette=(p==='terracotta'||p==='teal')?p:'current';var l=localStorage.getItem('portfolio-lang');if(l==='ar'||l==='en'){d.lang=l;d.dir=l==='ar'?'rtl':'ltr';}}catch(e){d.dataset.theme='dark';d.dataset.palette='current';}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
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
      </head>
      <body suppressHydrationWarning>
        <a className="skip-link" href="#home">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
