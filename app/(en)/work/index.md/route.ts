import { markdownResponse, workIndexMarkdown } from "../../../lib/markdown";

// Required for `output: "export"` — render at build time into a static file.
export const dynamic = "force-static";

/** The Markdown twin of the `/work/` index. */
export function GET() {
  return markdownResponse(workIndexMarkdown("en"));
}
