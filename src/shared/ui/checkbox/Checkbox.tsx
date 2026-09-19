import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { Check, Minus } from 'lucide-react'
import { cn } from '@/shared/lib/cn'

export type CheckboxProps = Omit<BaseCheckbox.Root.Props, 'className'> & {
  className?: string
}

/**
 * Presentational "Checkbox" primitive from Figma (16px box, radius sm),
 * built on Base UI's Checkbox for checked/indeterminate/disabled state and
 * native form/name/value integration. Purely visual — the accessible name
 * comes from the caller's own `id`/`aria-label`/`aria-labelledby`, or by
 * wrapping it in a `<label>`.
 */
export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <BaseCheckbox.Root
      className={cn(
        'group flex size-4 shrink-0 items-center justify-center rounded-sm border border-border-strong bg-bg-surface outline-offset-2 data-[checked]:border-bg-primary data-[checked]:bg-bg-primary data-[indeterminate]:border-bg-primary data-[indeterminate]:bg-bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-focus data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <BaseCheckbox.Indicator className="flex text-text-inverse data-[unchecked]:hidden">
        <Check
          className="size-3 group-data-[indeterminate]:hidden"
          aria-hidden
        />
        <Minus
          className="hidden size-3 group-data-[indeterminate]:block"
          aria-hidden
        />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  )
}
