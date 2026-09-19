import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { authClient } from '@/app/providers/auth'
import { paths } from '@/app/routes'
import { Sidebar } from '@/widgets/sidebar'
import { navSections } from './navigation'

export function AdminLayoutRoute() {
  const navigate = useNavigate()
  const { data: session } = authClient.useSession()
  const [logoutPending, setLogoutPending] = useState(false)

  async function handleLogout() {
    if (logoutPending) return

    setLogoutPending(true)

    try {
      const { error } = await authClient.signOut()

      if (error) {
        return
      }

      navigate(paths.login, { replace: true })
    } catch {
      // Stay on the current route; logout error UI is deferred.
    } finally {
      setLogoutPending(false)
    }
  }

  const user = session?.user
    ? { name: session.user.name, email: session.user.email }
    : null

  return (
    <div className="flex h-screen w-full">
      <Sidebar
        navSections={navSections}
        user={user}
        onLogout={handleLogout}
        logoutPending={logoutPending}
      />

      <main className="flex-1 overflow-y-auto bg-bg-app p-6">
        <Outlet />
      </main>
    </div>
  )
}
