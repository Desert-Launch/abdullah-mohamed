import { caseStudyMarkdown, markdownResponse } from "../../../../lib/markdown";
import { findProject, workProjects } from "../../../../lib/work";

// Required for `output: "export"` — one static file per project.
export const dynamic = "force-static";

/** Same slug set as the page itself, so every `/work/<slug>/` has a twin. */
export function generateStaticParams() {
  return workProjects().map((study) => ({ slug: study.slug }));
}

/** `/work/<slug>/index.md` — the Markdown twin of a case-study page. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const study = findProject(slug);
  // Unreachable via generateStaticParams; kept so the handler is total.
  if (!study) return new Response("Not found", { status: 404 });
  return markdownResponse(caseStudyMarkdown(study));
}
