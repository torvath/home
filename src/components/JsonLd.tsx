/**
 * Emits a schema.org graph as JSON-LD.
 *
 * Rendered in the page body rather than the head: crawlers accept JSON-LD
 * anywhere in the document, and keeping it in the component tree means the
 * data travels with the section it describes.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from local content modules, never user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
