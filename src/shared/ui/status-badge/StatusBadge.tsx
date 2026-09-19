import { type HTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib/cn'

/**
 * Visual variants for the "Tag" Figma component. `status` is presentational
 * only — mapping real order_status/refund_status values to a variant is the
 * job of the entity that owns those statuses, not this component.
 */
const statusBadgeVariants = cva(
  'inline-flex items-center rounded-sm px-2 py-0.5 text-label',
  {
    variants: {
      status: {
        success: 'bg-bg-success-subtle text-text-success',
        processing: 'bg-bg-primary-subtle text-text-link',
        warning: 'bg-bg-warning-subtle text-text-warning',
        danger: 'bg-bg-danger-subtle text-text-danger',
        neutral: 'bg-bg-neutral-subtle text-text-muted',
      },
    },
    defaultVariants: {
      status: 'neutral',
    },
  },
)

export type StatusBadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof statusBadgeVariants>

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ className, status, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(statusBadgeVariants({ status }), className)}
        {...props}
      />
    )
  },
)
StatusBadge.displayName = 'StatusBadge'
