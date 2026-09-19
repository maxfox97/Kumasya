import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib/cn'

const buttonVariants = cva(
  'inline-flex h-[30px] items-center justify-center gap-2 whitespace-nowrap rounded-sm px-3 text-body-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      intent: {
        primary: 'bg-bg-primary text-text-inverse hover:bg-bg-primary/90',
        default:
          'border border-border-default bg-bg-surface text-text-primary hover:bg-bg-subtle',
        danger: 'bg-palette-red3 text-text-inverse hover:bg-palette-red3/90',
        minimal: 'text-text-muted hover:bg-bg-subtle',
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  },
)

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ intent }), className)}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'
