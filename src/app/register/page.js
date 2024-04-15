'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [creatingUser, setCreatingUser] = useState(false)
  const [userCreated, setUserCreated] = useState(false)
  const [error, setError] = useState(false)

  async function handleFormSubmit(e) {
    e.preventDefault()
    setUserCreated(false)
    setCreatingUser(true)
    setError(false)

    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (response.ok) {
      setUserCreated(true)
    } else {
      setError(true)
    }
    setCreatingUser(false)
  }

  return (
    <section>
      <h1 className="text-center text-primary text-4xl m-8">Register</h1>

      {userCreated && (
        <div className="text-center">
          User created.
          <br /> Now you can{' '}
          <Link className="hover:underline font-semibold" href={'/login'}>
            {' '}
            Login{' '}
          </Link>
        </div>
      )}

      {error && (
        <div className="text-center">
          An error has occurred. <br />
          Please try again.
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

        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="flex gap-4 mt-2 justify-center items-center"
        >
          <Image
            src={'/google.png'}
            alt={'google logo'}
            width={24}
            height={24}
          />
          Continue with Google
        </button>
        <div className="text-center my-4 text-gray-500">
          Already have an account?
          <br />
          <Link className="hover:underline" href={'/login'}>
            Login here
          </Link>
        </div>
      </form>
    </section>
  )
}
