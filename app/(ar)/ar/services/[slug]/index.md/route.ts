import { markdownResponse, servicePageMarkdown } from "../../../../../lib/markdown";
import { findService, servicePages } from "../../../../../lib/services";

const lang = "ar" as const;

// Required for `output: "export"` — one static file per service.
export const dynamic = "force-static";

/** Same slug set as the page itself, so every service page has a twin. */
export function generateStaticParams() {
  return servicePages(lang).map((page) => ({ slug: page.slug }));
}

/** The Markdown twin of a service page. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const page = findService(slug, lang);
  // Unreachable via generateStaticParams; kept so the handler is total.
  if (!page) return new Response("Not found", { status: 404 });
  return markdownResponse(servicePageMarkdown(page, lang));
}
