'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function UserTabs({ isAdmin }) {
  const path = usePathname()
  return (
    <div className="flex gap-2 mx-auto  justify-center tabs">
      <Link className={path === '/profile' ? 'active' : ''} href={'/profile'}>
        Profile
      </Link>
      {{ isAdmin } && (
        <>
          <Link
            className={path === '/categories' ? 'active' : ''}
            href={'/categories'}
          >
            Categories
          </Link>

          <Link
            className={/menu-items/.test(path) ? 'active' : ''}
            // className={path.includes('menu-items') ? 'active' : ''}
            href={'/menu-items'}
          >
            Menu Items
          </Link>

          <Link className={path === '/users' ? 'active' : ''} href={'/users'}>
            Users
          </Link>
        </>
      )}
    </div>
  )
}
