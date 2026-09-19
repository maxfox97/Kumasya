import {
  ClipboardList,
  LayoutDashboard,
  MessageCircle,
  SlidersHorizontal,
  User,
  Users,
  UtensilsCrossed,
} from 'lucide-react'
import { paths } from '@/app/routes'
import type { NavSection } from '@/widgets/sidebar'

export const navSections: NavSection[] = [
  {
    label: 'РОБОЧЕ МІСЦЕ',
    items: [
      {
        label: 'A2 Зведення кухні',
        path: paths.dashboard,
        icon: LayoutDashboard,
      },
      { label: 'A3 Видача по класах', path: paths.classes, icon: Users },
      { label: 'A5 Замовлення', path: paths.orders, icon: ClipboardList },
    ],
  },
  {
    label: 'ДОВІДНИКИ',
    items: [
      { label: 'A6 Меню та ціни', path: paths.menu, icon: UtensilsCrossed },
      { label: 'A4 Користувачі', path: paths.users, icon: User },
    ],
  },
  {
    label: 'СЕРВІС',
    items: [
      { label: 'A7 Підтримка', path: paths.support, icon: MessageCircle },
      {
        label: 'A8 Налаштування',
        path: paths.settings,
        icon: SlidersHorizontal,
      },
    ],
  },
]
