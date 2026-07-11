import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

// GitHub Pages *project* site: served from https://<user>.github.io/<repo>/,
// so the app lives under a subpath. basePath makes Next emit its own
// links/bundles under that prefix; the `asset()` helper (app/lib/asset.ts)
// covers raw <img>/<a> paths, which Next does not rewrite.
//
// OPT-IN — deliberately NOT tied to NODE_ENV. The subpath is applied only when
// explicitly requested:
//   • PAGES_BASE_PATH="/foo"  → use that exact path (CI passes "/<repo>")
//   • PAGES=1                 → use "/<repo>" from the constant below
//   • neither set             → "" (root build)
// So a plain `next build` stays at root and its `out/` previews correctly with
// `serve out`. The previous NODE_ENV coupling silently baked the subpath into
// every production build, which 404'd assets when served locally at root.
const repo = "abdullah-mohamed-portofolio";
const basePath =
  process.env.PAGES_BASE_PATH ?? (process.env.PAGES ? `/${repo}` : "");

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
