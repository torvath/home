import { useRef, useState } from 'react'
import { subscribeToLaunch } from '~/fn/notify'
import { notifySchema } from '~/lib/forms'
import { captureSource } from '~/lib/source'

/** Email capture for a product that has not launched yet. */
export function NotifyForm({ product }: { product: string }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'failed'>(
    'idle',
  )

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const parsed = notifySchema.safeParse({
      email,
      product,
      website: '',
      source: captureSource(),
    })
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Enter a valid email.')
      setState('idle')
      // Send focus back to the field the message is describing, rather than
      // leaving it on the button the message is not attached to.
      inputRef.current?.focus()
      return
    }

    setError(null)
    setState('sending')
    try {
      await subscribeToLaunch({ data: parsed.data })
      setState('done')
      setEmail('')
    } catch {
      setState('failed')
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8 max-w-md">
      <label htmlFor="notify-email" className="label-caps block">
        Get notified at launch
      </label>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          ref={inputRef}
          id="notify-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            if (error) setError(null)
          }}
          aria-invalid={!!error}
          aria-describedby={
            error ? 'notify-error' : state === 'done' ? 'notify-success' : undefined
          }
          className={`min-w-0 flex-1 border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/80 ${
            error
              ? 'border-destructive'
              : 'border-hairline-strong focus:border-teal'
          }`}
        />
        <button
          type="submit"
          disabled={state === 'sending'}
          className="clip-facet-sm shrink-0 bg-amber px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {state === 'sending' ? 'Adding…' : 'Notify me'}
        </button>
      </div>
      <div aria-live="polite" className="mt-2 min-h-5">
        {error && (
          <p id="notify-error" className="text-sm text-destructive">
            {error}
          </p>
        )}
        {state === 'done' && !error && (
          <p id="notify-success" className="text-sm text-teal">
            You are on the list. We will email you when it launches.
          </p>
        )}
        {state === 'failed' && (
          <p className="text-sm text-destructive">
            That did not save. Please try again in a moment.
          </p>
        )}
      </div>
    </form>
  )
}
