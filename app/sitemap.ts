import type { MetadataRoute } from "next";

// Required for `output: "export"` — emit sitemap.xml at build time.
export const dynamic = "force-static";

const SITE_URL = "https://abdullahmohamed.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
