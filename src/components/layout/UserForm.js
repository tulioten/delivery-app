'use client'
import EditableImage from '@/components/layout/EditableImage'
import AddressInputs from '@/components/layout/AddressInputs'
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

  function handleAddressChange(propName, value) {
    if (propName === 'phone') setPhone(value)
    if (propName === 'streetAddress') setStreetAddress(value)
    if (propName === 'city') setCity(value)
    if (propName === 'postalCode') setPostalCode(value)
    if (propName === 'country') setCountry(value)
  }

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
        <AddressInputs
          addressProps={{ phone, streetAddress, city, postalCode, country }}
          setAddressProps={handleAddressChange}
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
