import { cvMarkdown, markdownResponse } from "../../../../lib/markdown";

// Required for `output: "export"` — render at build time into a static file.
export const dynamic = "force-static";

/** The Markdown twin of `/ar/cv/`. */
export function GET() {
  return markdownResponse(cvMarkdown("ar"));
}
