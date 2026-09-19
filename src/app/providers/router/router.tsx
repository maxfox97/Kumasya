import { createBrowserRouter } from 'react-router'
import { paths } from '@/app/routes'
import { NotFound } from './NotFound'

/**
 * Central route table. Each planned path is registered here so it has a
 * stable, typed entry point, but its real screen is intentionally left
 * unattached — the dedicated implementation task (09 login, 10 dashboard,
 * and so on for the rest) wires its `Component`/`lazy` in without needing
 * to touch this file's structure. The destination of `/` (redirect vs. a
 * real home screen) depends on auth/session behavior owned by task 07, so
 * it is registered here with no element rather than guessed at. Likewise,
 * `08-create-admin-layout` introduces the nested layout route that will
 * wrap the protected paths below.
 */
export const router = createBrowserRouter([
  { path: paths.home },
  { path: paths.login },
  { path: paths.dashboard },
  { path: paths.classes },
  { path: paths.users },
  { path: paths.orders },
  { path: paths.menu },
  { path: paths.support },
  { path: paths.settings },
  { path: '*', element: <NotFound /> },
])
