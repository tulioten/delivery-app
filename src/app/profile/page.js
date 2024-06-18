'use client'

import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const session = useSession()
  const { status } = session
  const userData = session?.data?.user
  const [userName, setUserName] = useState('')
  const [userImage, setUserImage] = useState('')
  const [phone, setPhone] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(userData.name)
      setUserImage(userData.image)
    }
  }, [session, status])

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault()

    const updatePromise = fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName, image: userImage }),
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

  async function handleProfileImage(ev) {
    const files = ev.target.files
    if (files?.length === 1) {
      const data = new FormData()
      data.set('files', files[0])

      const uploadPromise = fetch('/api/upload', {
        method: 'POST',
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((profileImageLink) => {
            setUserImage(profileImageLink)
          })
        }
        throw new Error('Something went wrong')
      })

      await toast.promise(uploadPromise, {
        loading: 'Uploading...',
        success: 'Upload successfully!',
        error: 'Error Uploading Image!',
      })
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
        <div className="flex gap-4">
          <div>
            <div className="p-2  rounded-lg relative">
              {userImage && (
                <Image
                  className="rounded-full w-full h-full mb-1"
                  alt="Avatar"
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
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
            <input
              type="text"
              placeholder="Street Address"
              value={streetAddress}
              onChange={(ev) => setStreetAddress(ev.target.value)}
            />
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(ev) => setCity(ev.target.value)}
              />
              <input
                type="text"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(ev) => setPostalCode(ev.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(ev) => setCountry(ev.target.value)}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  )
}
