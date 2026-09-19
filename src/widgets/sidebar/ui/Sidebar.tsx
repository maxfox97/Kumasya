import { LogOut } from 'lucide-react'
import { NavLink } from 'react-router'
import { cn } from '@/shared/lib/cn'
import type { NavSection } from '../model/navigation'

export type SidebarUser = {
  name: string
  email: string
}

export type SidebarProps = {
  navSections: NavSection[]
  user: SidebarUser | null
  onLogout: () => void
  logoutPending?: boolean
}

const rowClasses =
  'flex w-full items-center gap-2.5 rounded-md px-3 py-[9px] text-body-compact text-text-on-dark-muted'

export function Sidebar(props: SidebarProps) {
  const { navSections, user, onLogout, logoutPending } = props

  return (
    <div className="flex h-screen w-[240px] shrink-0 flex-col gap-0.5 bg-bg-sidebar px-3 pb-4">
      <div className="flex flex-col gap-0.5 px-3 pb-[18px] pt-5">
        <p className="text-heading-md text-text-inverse">Кумася Kids</p>
        <p className="text-label font-normal text-text-on-dark-muted">
          Адмін-панель
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.label} className="flex flex-col gap-0.5">
            <div className="flex px-3 pb-1.5 pt-[18px]">
              <p className="text-caption text-text-on-dark-muted">
                {section.label}
              </p>
            </div>

            {section.items.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      rowClasses,
                      isActive && 'bg-bg-sidebar-active text-text-inverse',
                    )
                  }
                >
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="h-px w-full bg-bg-sidebar-active" />

      {user ? (
        <div className="flex flex-col gap-0.5 px-3 pb-1 pt-3">
          <p className="text-body-compact font-medium text-text-inverse">
            {user.name}
          </p>
          <p className="text-label font-normal text-text-on-dark-muted">
            {user.email}
          </p>
        </div>
      ) : null}

      <button
        type="button"
        onClick={onLogout}
        disabled={logoutPending}
        className={cn(rowClasses, 'cursor-pointer disabled:opacity-50')}
      >
        <LogOut className="size-4 shrink-0" aria-hidden="true" />
        <span>Вийти</span>
      </button>
    </div>
  )
}
