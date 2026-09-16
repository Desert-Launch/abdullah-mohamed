import { markdownResponse, servicesIndexMarkdown } from "../../../../lib/markdown";

// Required for `output: "export"` — render at build time into a static file.
export const dynamic = "force-static";

/** The Markdown twin of the `/ar/services/` index. */
export function GET() {
  return markdownResponse(servicesIndexMarkdown("ar"));
}
