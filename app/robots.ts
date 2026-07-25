import type { MetadataRoute } from "next";
// SITE_URL is the single source of truth for the production host (lib/site.ts).
import { SITE_URL } from "./lib/site";

// Required for `output: "export"` — emit robots.txt at build time.
export const dynamic = "force-static";

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
