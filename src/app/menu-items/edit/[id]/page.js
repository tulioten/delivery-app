'use client'
import { useProfile } from '@/components/UseProfile'
import UserTabs from '@/components/layout/UserTabs'
import EditableImage from '@/components/layout/EditableImage'
import { redirect, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import Left from '@/components/icons/LeftArrow'

export default function EditMenu() {
  const { id } = useParams()
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [basePrice, setBasePrice] = useState('')
  const [redirectToItems, setRedirectToItems] = useState(false)
  const { loading, data } = useProfile()

  useEffect(() => {
    fetch('/api/menu-items').then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id)
        setImage(item.image)
        setName(item.name)
        setDescription(item.description)
        setBasePrice(item.basePrice)
      })
    })
  }, [])

  async function handleMenuSubmit(ev) {
    ev.preventDefault()
    const data = { image, name, description, basePrice, _id: id }
    const savingPromise = new Promise((resolve, reject) => {
      const waitingResponse = async () => {
        const response = await fetch('/api/menu-items', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })

        if (response.ok) {
          return resolve()
        } else {
          reject(console.error('Unexpected Error'))
        }
      }
      waitingResponse()
    })
    await toast.promise(savingPromise, {
      loading: 'Saving this item',
      success: 'Saved',
      error: 'Error, sorry...',
    })

    setRedirectToItems(true)
  }

  if (redirectToItems) {
    return redirect('/menu-items')
  }

  if (loading) {
    return 'Loading user info...'
  }

  if (!data.admin) {
    return redirect('/profile')
  }

  return (
    <div>
      <section className="mt-8">
        <UserTabs isAdmin={true} />
        <div className="max-w-md mx-auto mt-8 ">
          <Link
            className="button bg-gray-200 hover:bg-red-200 "
            href={'/menu-items'}
          >
            <Left />
            <span>Show all menu items</span>
          </Link>
        </div>
        <form onSubmit={handleMenuSubmit} className="mt-8 max-w-md mx-auto">
          <div
            className="grid items-start gap-4"
            style={{ gridTemplateColumns: '.3fr .7fr' }}
          >
            <div>
              <EditableImage link={image} setLink={setImage} />
            </div>
            <div className="grow">
              <label>Item name</label>
              <input
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <label>Description</label>
              <input
                type="text"
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
              />
              <label>Base Price</label>
              <input
                type="text"
                value={basePrice}
                onChange={(ev) => setBasePrice(ev.target.value)}
              />
              <button type="submit">Save</button>
            </div>
          </div>
        </form>
      </section>
    </div>
  )
}
