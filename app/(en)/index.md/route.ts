import { homeMarkdown, markdownResponse } from "../../lib/markdown";

// Required for `output: "export"` — render at build time into out/index.md.
export const dynamic = "force-static";

/** `/index.md` — the Markdown twin of `/`, served to `Accept: text/markdown`
 *  via the redirect in vercel.json. */
export function GET() {
  return markdownResponse(homeMarkdown("en"));
}
