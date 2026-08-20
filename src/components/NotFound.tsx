import { Link } from '@tanstack/react-router'
import { buttonClass } from '~/components/ui/button'
import { primaryNav } from '~/content/site'

export function NotFound() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-facets absolute inset-0" />
        <div className="grid-hairlines absolute inset-0 opacity-[0.12]" />
      </div>

      <div className="relative mx-auto w-full max-w-3xl px-5 py-32 text-center sm:px-8">
        <p className="label-caps">404</p>
        <div aria-hidden className="mx-auto mt-5 h-px w-24 gradient-brand" />
        <h1 className="mt-8 font-display text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
          That page isn’t here.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
          The link may be out of date, or the page may have moved. Everything
          the site does have is one click away.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/" className={buttonClass()}>
            Go home
          </Link>
          <Link to="/contact" className={buttonClass({ variant: 'ghost' })}>
            Contact us
          </Link>
        </div>

        <nav
          aria-label="Site sections"
          className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2"
        >
          {primaryNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  )
}
