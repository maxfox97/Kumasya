/**
 * Centralized route path contract. Import these instead of writing route
 * strings by hand so paths.ts stays the single source of truth.
 */
export const paths = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
  classes: '/classes',
  users: '/users',
  orders: '/orders',
  menu: '/menu',
  support: '/support',
  settings: '/settings',
} as const

export type AppPath = (typeof paths)[keyof typeof paths]
