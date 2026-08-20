import { useRouter } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { buttonClass } from '~/components/ui/button'

export function RouteError({ error, reset }: ErrorComponentProps) {
  const router = useRouter()

  return (
    <section className="flex min-h-svh items-center">
      <div className="mx-auto w-full max-w-3xl px-5 py-32 text-center sm:px-8">
        <p className="label-caps text-destructive">Error</p>
        <div aria-hidden className="mx-auto mt-5 h-px w-24 bg-destructive" />
        <h1 className="mt-8 font-display text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
          This page didn’t load.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
          {error.message}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            className={buttonClass()}
            onClick={() => {
              reset()
              void router.invalidate()
            }}
          >
            Try again
          </button>
          <Link to="/" className={buttonClass({ variant: 'ghost' })}>
            Go home
          </Link>
        </div>
      </div>
    </section>
  )
}
