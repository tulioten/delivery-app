'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [creatingUser, setCreatingUser] = useState(false)
  const [userCreated, setUserCreated] = useState(true)

  async function handleFormSubmit(e) {
    e.preventDefault()
    setCreatingUser(true)
    await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
    setCreatingUser(false)
    setUserCreated(true)
  }

  return (
    <section>
      <h1 className="text-center text-primary text-4xl m-8">Register</h1>

      {userCreated && (
        <div className="text-center">
          User created.
          <br /> Now you can{' '}
          <Link className="underline font-semibold" href={'/login'}>
            {' '}
            Login{' '}
          </Link>
        </div>
      )}

      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          disabled={creatingUser}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          disabled={creatingUser}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={creatingUser}>
          Register
        </button>

        <div className="text-center text-gray-500 mt-2">
          Or login with Provider
        </div>

        <button className="flex gap-4 mt-2 justify-center items-center">
          <Image
            src={'/google.png'}
            alt={'google logo'}
            width={24}
            height={24}
          />
          Continue with Google
        </button>
      </form>
    </section>
  )
}
