import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Select as BaseSelect } from '@base-ui/react/select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/shared/lib/cn'

export type SelectOption<Value extends string = string> = {
  value: Value
  label: ReactNode
  disabled?: boolean
}

export type SelectProps<Value extends string = string> = Pick<
  BaseSelect.Root.Props<Value>,
  'value' | 'defaultValue' | 'onValueChange' | 'disabled' | 'name' | 'required'
> & {
  options: SelectOption<Value>[]
  placeholder?: ReactNode
  className?: string
  /** Accessible name/description for the trigger button; the caller owns copy. */
  'aria-label'?: string
  'aria-labelledby'?: string
  triggerProps?: ButtonHTMLAttributes<HTMLButtonElement>
}

/**
 * Presentational "Type=Select" input from Figma, built on Base UI's Select
 * so the trigger/popup/items get real listbox semantics and keyboard
 * support. Purely visual — callers own the option list, selection logic,
 * and accessible name.
 */
export function Select<Value extends string = string>({
  options,
  placeholder,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  triggerProps,
  ...rootProps
}: SelectProps<Value>) {
  return (
    <BaseSelect.Root items={options} {...rootProps}>
      <BaseSelect.Trigger
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        {...triggerProps}
        className={cn(
          'flex h-[30px] w-full items-center justify-between gap-2 rounded-sm border border-border-default bg-bg-surface px-[10px] text-body-compact text-text-primary data-[popup-open]:border-border-focus focus-visible:border-border-focus focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
          className,
        )}
      >
        <BaseSelect.Value placeholder={placeholder} />
        <BaseSelect.Icon className="text-text-muted">
          <ChevronDown className="size-4" aria-hidden />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner
          className="outline-none"
          sideOffset={4}
          alignItemWithTrigger={false}
        >
          <BaseSelect.Popup className="min-w-[var(--anchor-width)] rounded-md border border-border-subtle bg-bg-surface py-1 text-body-compact text-text-primary shadow-lg">
            {options.map((option) => (
              <BaseSelect.Item
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="flex cursor-default items-center justify-between gap-2 px-[10px] py-[6px] data-[highlighted]:bg-bg-subtle data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
                <BaseSelect.ItemIndicator className="text-bg-primary">
                  <Check className="size-4" aria-hidden />
                </BaseSelect.ItemIndicator>
              </BaseSelect.Item>
            ))}
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  )
}
