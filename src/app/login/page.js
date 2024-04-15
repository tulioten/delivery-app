'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginInProgress, setLoginInProgress] = useState(false)

  async function handleFormSubmit(e) {
    e.preventDefault()
    setLoginInProgress(true)

    await signIn('credentials', { email, password, callbackUrl: '/' })

    setLoginInProgress(false)
  }

  return (
    <section>
      <h1 className="text-center text-primary text-4xl m-8">Login</h1>
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          disabled={loginInProgress}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          disabled={loginInProgress}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loginInProgress}>
          Login
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
      </form>
    </section>
  )
}
