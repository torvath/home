import { legalUpdated, type LegalSection } from '~/content/legal'

/** Long-form legal copy: one column, measured line length, no decoration. */
export function LegalBody({ sections }: { sections: Array<LegalSection> }) {
  return (
    <section className="border-b border-hairline">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="space-y-12">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display text-xl font-medium tracking-[-0.01em] text-foreground">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.points && (
                <ul className="mt-5 space-y-3">
                  {section.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-teal"
                        style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <p className="mt-16 border-t border-hairline pt-6 text-xs text-muted-foreground">
          Last updated: {legalUpdated}.
        </p>
      </div>
    </section>
  )
}
