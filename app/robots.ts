import type { MetadataRoute } from "next";

// Required for `output: "export"` — emit robots.txt at build time.
export const dynamic = "force-static";

// Must match the host that serves 200 — the apex 308-redirects to www.
const SITE_URL = "https://www.abdullahmohamed.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
