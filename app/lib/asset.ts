/**
 * Prefixes a public asset path (e.g. "/images/foo.webp") with the deploy
 * basePath. Next.js prefixes `<Link>` hrefs and `/_next/*` bundles with
 * `basePath` automatically, but it does NOT touch raw `<img src>` / `<a href>`
 * pointing at files in `public/`. On a GitHub Pages *project* site the app is
 * served from a subpath (`/abdullah-mohamed-portofolio`), so those absolute
 * paths would 404 without this helper.
 *
 * `NEXT_PUBLIC_BASE_PATH` is injected by `next.config.mjs`. It is "" in local
 * dev (root) and "/<repo>" for the production build, so the same code works in
 * both places.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  // Leave absolute URLs and protocol links (http, mailto, tel, data, #) alone.
  if (!path || /^([a-z]+:|\/\/|#)/i.test(path)) return path;
  return `${BASE_PATH}${path.startsWith("/") ? "" : "/"}${path}`;
}
