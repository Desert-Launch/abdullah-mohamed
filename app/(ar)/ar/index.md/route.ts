import { homeMarkdown, markdownResponse } from "../../../lib/markdown";

// Required for `output: "export"` — render at build time into out/ar/index.md.
export const dynamic = "force-static";

/** `/ar/index.md` — the Markdown twin of `/ar/`. */
export function GET() {
  return markdownResponse(homeMarkdown("ar"));
}
