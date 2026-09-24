import { llmsFullMarkdown, markdownResponse } from "../lib/markdown";

// Required for `output: "export"` — emit llms-full.txt at build time.
export const dynamic = "force-static";

/**
 * `/llms-full.txt` — the whole English site as one Markdown document.
 *
 * `public/llms.txt` is the hand-written index (short, curated); this is the
 * generated full text it points at, rebuilt from the dictionaries on every
 * build so it can't go stale. The static host serves `.txt` as text/plain,
 * which is what the llms.txt convention expects; the body is Markdown.
 */
export function GET() {
  return markdownResponse(llmsFullMarkdown());
}
