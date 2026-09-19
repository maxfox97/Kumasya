import { type InputHTMLAttributes, forwardRef } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/shared/lib/cn'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  /** Renders the "Search" variant from Figma: leading search icon. */
  search?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, search, type = 'text', ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {search && (
          <Search
            className="pointer-events-none absolute left-[10px] size-4 text-text-muted"
            aria-hidden
          />
        )}
        <input
          ref={ref}
          type={search ? 'search' : type}
          className={cn(
            'h-[30px] w-full rounded-sm border border-border-default bg-bg-surface px-[10px] text-body-compact text-text-primary placeholder:text-text-muted focus-visible:border-border-focus focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
            search && 'pl-8',
            className,
          )}
          {...props}
        />
      </div>
    )
  },
)
Input.displayName = 'Input'
