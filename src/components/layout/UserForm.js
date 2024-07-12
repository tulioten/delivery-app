'use client'
import EditableImage from '@/components/layout/EditableImage'
import { useState } from 'react'
import { useProfile } from '../UseProfile'

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || '')
  const [image, setImage] = useState(user?.image || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '')
  const [city, setCity] = useState(user?.city || '')
  const [postalCode, setPostalCode] = useState(user?.postalCode || '')
  const [country, setCountry] = useState(user?.country || '')
  const [admin, setAdmin] = useState(user?.admin || false)
  const { data: LoggedInUserData } = useProfile()

  return (
    <div className="flex gap-4">
      <div>
        <div className="p-2  rounded-lg relative">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            image,
            phone,
            streetAddress,
            city,
            postalCode,
            country,
            admin,
          })
        }
      >
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
          value={user.email}
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
        <div className="grid grid-cols-2 gap-2">
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
        {LoggedInUserData.admin && (
          <div>
            <label
              className="p-2 inline-flex items-center gap-2 mb-2"
              htmlFor="adminCb"
            >
              <input
                className=""
                type="checkbox"
                id="adminCb"
                value={'1'}
                checked={admin}
                onClick={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}
        <button type="submit">Save</button>
      </form>
    </div>
  )
}
