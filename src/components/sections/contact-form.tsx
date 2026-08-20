import { useState } from 'react'
import { submitContactRequest } from '~/fn/contact'
import {
  PROJECT_TYPES,
  contactSchema,
  fieldErrors,
  type ContactInput,
} from '~/lib/forms'
import { captureSource } from '~/lib/source'

type Errors = Partial<Record<keyof ContactInput, string>>

const FIELD =
  'mt-2 w-full border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/80'

/** Fields the schema rejects when empty, in DOM order — the order focus should
 *  follow when a submit fails validation. */
const REQUIRED_ORDER: Array<keyof ContactInput> = [
  'name',
  'email',
  'projectType',
  'message',
]

/**
 * Validates in the browser for fast feedback, then posts to a server function
 * that re-validates against the same schema. The page itself stays static, so
 * it is still prerendered and instantly cacheable.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({})
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed'>(
    'idle',
  )

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const fd = new FormData(form)

    const parsed = contactSchema.safeParse({
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      company: String(fd.get('company') ?? ''),
      projectType: String(fd.get('projectType') ?? ''),
      message: String(fd.get('message') ?? ''),
      website: String(fd.get('website') ?? ''),
      source: captureSource(),
    })

    if (!parsed.success) {
      const next = fieldErrors<ContactInput>(parsed.error)
      setErrors(next)
      setState('idle')
      // Announcing the errors is not enough on its own: a screen reader or
      // keyboard user is left sitting on the submit button with no way to know
      // which field to go back to. Move them to the first one that failed.
      const first = REQUIRED_ORDER.find((key) => next[key])
      if (first) {
        requestAnimationFrame(() => {
          form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
        })
      }
      return
    }

    setErrors({})
    setState('sending')
    try {
      await submitContactRequest({ data: parsed.data })
      setState('sent')
      form.reset()
    } catch {
      setState('failed')
    }
  }

  const border = (key: keyof Errors) =>
    errors[key]
      ? 'border-destructive'
      : 'border-hairline-strong focus:border-teal'

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="contact-form-heading"
      className="clip-facet border border-hairline bg-surface p-6 sm:p-9"
    >
      <h2 id="contact-form-heading" className="sr-only">
        Project enquiry form
      </h2>

      {/* WCAG 3.3.2: required fields have to be identified up front, not only
          once a submit has already failed. */}
      <p className="mb-6 text-xs text-muted-foreground">
        All fields are required unless marked optional.
      </p>
      {/* Honeypot — visually and programmatically hidden from people. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label-caps">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`${FIELD} ${border('name')}`}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-sm text-destructive">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="label-caps">
            Email
          </label>
          <input
            id="email"
            name="email"
            required
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`${FIELD} ${border('email')}`}
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-sm text-destructive">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="label-caps">
            Company{' '}
            <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            className={`${FIELD} ${border('company')}`}
          />
        </div>
        <div>
          <label htmlFor="projectType" className="label-caps">
            Project type
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            defaultValue=""
            aria-invalid={!!errors.projectType}
            aria-describedby={errors.projectType ? 'type-error' : undefined}
            className={`${FIELD} ${border('projectType')}`}
          >
            <option value="" disabled>
              Select one
            </option>
            {PROJECT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.projectType && (
            <p id="type-error" className="mt-2 text-sm text-destructive">
              {errors.projectType}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="message" className="label-caps">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What are you building, and where is it now?"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`${FIELD} resize-y ${border('message')}`}
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-sm text-destructive">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={state === 'sending'}
        className="clip-facet-sm mt-8 w-full bg-amber px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
      >
        {state === 'sending' ? 'Sending…' : 'Send message'}
      </button>

      <div aria-live="polite" className="mt-4 min-h-6">
        {state === 'sent' && (
          <p className="border-l-2 border-teal pl-3 text-sm text-teal">
            Thanks — your message is with us. We reply within one business day.
          </p>
        )}
        {state === 'failed' && (
          <p className="border-l-2 border-destructive pl-3 text-sm text-destructive">
            That did not send. Please try again, or email us directly.
          </p>
        )}
      </div>
    </form>
  )
}
