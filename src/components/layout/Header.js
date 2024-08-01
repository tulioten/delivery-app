'use client'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import ShoppingCart from '@/components/icons/ShoppingCart'
import { useContext, useState } from 'react'
import { CartContext } from '../AppContext'
import BarsIcon from '../icons/BarsIcon'

function AuthLinks({ status, userName }) {
  if (status === 'authenticated') {
    return (
      <>
        <Link href={'/profile'} className="whitespace-nowrap">
          Hello, {userName}
        </Link>

        <button
          onClick={() => signOut()}
          className="bg-primary rounded-full text-white px-8 py-2 "
        >
          Logout
        </button>
      </>
    )
  }
  if (status === 'unauthenticated') {
    return (
      <>
        <Link href={'/login'}>Login</Link>
        <Link
          href={'/register'}
          className="bg-primary rounded-full text-white px-8 py-2 "
        >
          Register
        </Link>
      </>
    )
  }
}

export default function Header() {
  const session = useSession()
  const status = session?.status
  const userData = session.data?.user
  const { cartProducts } = useContext(CartContext)
  const [mobileNav, setMobileNav] = useState(false)
  let userName = userData?.name || userData?.email
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0]
  }

  return (
    <header>
      <div className="flex md:hidden justify-between">
        <Link className="text-primary font-semibold text-2xl" href={'/'}>
          ST Pizza
        </Link>
        <div className="flex gap-8 items-center">
          <Link className="relative" href={'/cart'}>
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-sm py-1 px-1 rounded-full leading-3 ">
                {cartProducts.length}
              </span>
            )}
          </Link>
          <button
            className="border-0"
            onClick={() => setMobileNav((prev) => !prev)}
          >
            <BarsIcon />
          </button>
        </div>
      </div>
      {mobileNav && (
        <div
          onClick={() => setMobileNav(false)}
          className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-4 text-center "
        >
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/#about'}>About</Link>
          <Link href={'/#contact'}>Contact</Link>
          <AuthLinks status={status} userName={userName} />
        </div>
      )}
      <div className="hidden md:flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link className="text-primary font-semibold text-2xl" href={'/'}>
            ST Pizza
          </Link>
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/#about'}>About</Link>
          <Link href={'/#contact'}>Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold ">
          <AuthLinks status={status} userName={userName} />
          <Link className="relative" href={'/cart'}>
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-sm py-1 px-1 rounded-full leading-3 ">
                {cartProducts.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
