import type { MetadataRoute } from "next";

// Required for `output: "export"` — emit sitemap.xml at build time.
export const dynamic = "force-static";

// Must match the host that serves 200 — the apex 308-redirects to www.
const SITE_URL = "https://www.abdullahmohamed.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      // Trailing slash matches `trailingSlash: true` in next.config.mjs, so the
      // <loc> is the canonical form and not a URL that redirects.
      url: `${SITE_URL}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
