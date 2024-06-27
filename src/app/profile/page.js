'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import UserTabs from '@/components/layout/UserTabs'
import EditableImage from '@/components/layout/EditableImage'

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
  const [isAdmin, setIsAdmin] = useState(false)
  const [profileFetched, setProfileFetched] = useState(false)

  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(userData.name)
      setUserImage(userData.image)
      fetch('/api/profile').then((response) => {
        response.json().then((data) => {
          setPhone(data.phone)
          setStreetAddress(data.streetAddress)
          setCity(data.city)
          setPostalCode(data.postalCode)
          setCountry(data.country)
          setIsAdmin(data.admin)
          setProfileFetched(true)
        })
      })
    }
  }, [session, status])

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault()

    const updatePromise = fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: userName,
        image: userImage,
        streetAddress,
        phone,
        city,
        postalCode,
        country,
      }),
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
      <div className="max-w-md mt-10 mx-auto">
        <div className="flex gap-4">
          <div>
            <div className="p-2  rounded-lg relative">
              <EditableImage link={userImage} setLink={setUserImage} />
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <label>First and last Name</label>
            <input
              type="text"
              placeholder="First and last Name"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              disabled={true}
              placeholder="Email"
              value={userData.email}
            />
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
            <label>Street Address</label>
            <input
              type="text"
              placeholder="Street Address"
              value={streetAddress}
              onChange={(ev) => setStreetAddress(ev.target.value)}
            />
            <div className="flex gap-2">
              <div>
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(ev) => setCity(ev.target.value)}
                />
              </div>
              <div>
                <label>Postal Code</label>
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
              </div>
            </div>
            <label>Country</label>
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
