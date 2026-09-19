import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/shared/lib/cn'

/**
 * Generic neutral pill (e.g. sidebar nav counters). For order/refund status
 * chips use `StatusBadge` instead.
 */
export const Badge = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-sm bg-bg-subtle px-2 py-0.5 text-label text-text-muted',
        className,
      )}
      {...props}
    />
  )
})
Badge.displayName = 'Badge'
