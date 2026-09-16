/**
 * One `<script type="application/ld+json">` block.
 *
 * Rendered inside the page rather than in `<head>`: search engines read JSON-LD
 * anywhere in the document, and only a page knows what it is about — the root
 * layout cannot see the route. `<` is escaped so a string in the dictionaries
 * can never close the script element early.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
