'use client'

import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ProfilePage() {
  const session = useSession()
  const { status } = session
  const userData = session?.data?.user
  const [userName, setUserName] = useState('')
  const [userImage, setUserImage] = useState('')
  const [saved, setSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(userData.name)
      setUserImage(userData.image)
    }
  }, [session, status])

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault()
    setSaved(false)
    setIsSaving(true)

    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName }),
    })
    setIsSaving(false)
    if (response.ok) {
      setSaved(true)
    }
  }

  async function handleProfileImage(ev) {
    const files = ev.target.files
    if (files?.length === 1) {
      const data = new FormData()
      data.set('files', files[0])
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      })
      const profileImageLink = await response.json()
      setUserImage(profileImageLink)
    }
  }

  if (status === 'loading') {
    return 'Loading...'
  }

  if (status === 'unauthenticated') {
    return redirect('/login')
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl m-8">Profile</h1>
      <div className="max-w-md mx-auto">
        {saved && (
          <h2 className="text-center p-4 bg-green-200 font-semibold rounded-xl">
            Profile has been updated!
          </h2>
        )}
        {isSaving && (
          <h2 className="text-center p-4 bg-blue-200 font-semibold rounded-xl">
            Updating...
          </h2>
        )}
        <div className="flex gap-4 items-center">
          <div>
            <div className="p-2  rounded-lg relative">
              {userImage && (
                <Image
                  className="rounded-full w-full h-full mb-1"
                  alt="Atavar"
                  src={userImage}
                  width={250}
                  height={250}
                />
              )}
              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleProfileImage}
                />
                <span className="mt-2 block p-1 border border-gray-300 rounded-lg text-center cursor-pointer">
                  Edit
                </span>
              </label>
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input
              type="text"
              placeholder="Full Name"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            />
            <input
              type="email"
              disabled={true}
              placeholder="Email"
              value={userData.email}
            />
            <input type="text" placeholder="Address" />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  )
}
