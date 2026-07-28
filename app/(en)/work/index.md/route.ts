import { markdownResponse, workIndexMarkdown } from "../../../lib/markdown";

// Required for `output: "export"` — render at build time into out/work/index.md.
export const dynamic = "force-static";

/** `/work/index.md` — the Markdown twin of the `/work/` index. */
export function GET() {
  return markdownResponse(workIndexMarkdown());
}
