'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import UserTabs from '@/components/layout/UserTabs'
import UserForm from '@/components/layout/UserForm'

export default function ProfilePage() {
  const session = useSession()
  const { status } = session
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [profileFetched, setProfileFetched] = useState(false)

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/profile').then((response) => {
        response.json().then((data) => {
          setUser(data)
          setIsAdmin(data.admin)
          setProfileFetched(true)
        })
      })
    }
  }, [session, status])

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault()

    const updatePromise = fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        return response
      }

      throw new Error('Update Error')
    })
    await toast.promise(updatePromise, {
      loading: 'Updating...',
      success: 'Update Complete!',
      error: 'Error updating',
    })
  }

  if (status === 'loading' || !profileFetched) {
    return 'Loading...'
  }

  if (status === 'unauthenticated') {
    return redirect('/login')
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-lg mt-10 mx-auto">
        <UserForm user={user} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  )
}
