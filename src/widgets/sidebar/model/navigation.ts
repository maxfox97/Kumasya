import type { LucideIcon } from 'lucide-react'

export type NavItem = {
  label: string
  path: string
  icon: LucideIcon
}

export type NavSection = {
  label: string
  items: NavItem[]
}
