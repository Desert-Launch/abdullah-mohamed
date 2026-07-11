import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

// GitHub Pages *project* site: served from https://<user>.github.io/<repo>/,
// so the app lives under a subpath. basePath/assetPrefix make Next emit its
// own links/bundles under that prefix; the `asset()` helper (app/lib/asset.ts)
// covers raw <img>/<a> paths, which Next does not rewrite.
//
// Only applied for the production build (`next build`), so `npm run dev` stays
// at the root. Override the repo name via the PAGES_BASE_PATH env var if needed.
const repo = "abdullah-mohamed-portofolio";
const basePath =
  process.env.PAGES_BASE_PATH ??
  (process.env.NODE_ENV === "production" ? `/${repo}` : "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export — GitHub Pages only serves static files, so this
  // replaces the Node-server "standalone" output. Produces an `out/` dir.
  output: "export",
  basePath,
  // Trailing slashes make directory-style URLs resolve on Pages' static host.
  trailingSlash: true,
  // The static export has no Image Optimization server; the site already uses
  // plain <img>, but this keeps any future next/image usage from breaking.
  images: { unoptimized: true },
  // Expose basePath to the client so `asset()` can prefix public assets.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  turbopack: {
    root,
  },
};

export default nextConfig;
