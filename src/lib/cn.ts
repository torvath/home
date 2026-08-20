import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Conditional class names with Tailwind conflict resolution. */
export function cn(...inputs: Array<ClassValue>): string {
  return twMerge(clsx(inputs))
}
