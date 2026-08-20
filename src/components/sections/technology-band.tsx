import { technology } from '~/content/company'

/** Restrained stack band — wide-tracked small caps, thin dividers, no logo wall. */
export function TechnologyBand({ note = false }: { note?: boolean }) {
  return (
    <section className="border-b border-hairline bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <h2 className="label-caps text-center">Technology we work in</h2>
        <ul className="mt-8 flex flex-wrap items-center justify-center">
          {technology.stack.map((tech, i) => (
            <li key={tech} className="flex items-center">
              {i > 0 && (
                <span aria-hidden className="mx-4 h-4 w-px bg-hairline sm:mx-6" />
              )}
              <span className="font-display text-[0.7rem] tracking-[0.26em] text-foreground/80 uppercase sm:text-xs">
                {tech}
              </span>
            </li>
          ))}
        </ul>
        {note && (
          <p className="mx-auto mt-8 max-w-xl text-center text-sm leading-relaxed text-muted-foreground">
            {technology.note}
          </p>
        )}
      </div>
    </section>
  )
}
