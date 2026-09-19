import { createBrowserRouter } from 'react-router'
import { ProtectedRoute } from '@/app/providers/auth'
import { paths } from '@/app/routes'
import { AdminLayoutRoute } from './AdminLayoutRoute'
import { NotFound } from './NotFound'

export const router = createBrowserRouter([
  { path: paths.home },
  { path: paths.login },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayoutRoute />,
        children: [
          { path: paths.dashboard },
          { path: paths.classes },
          { path: paths.users },
          { path: paths.orders },
          { path: paths.menu },
          { path: paths.support },
          { path: paths.settings },
        ],
      },
    ],
  },
  { path: '*', element: <NotFound /> },
])
