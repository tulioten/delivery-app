'use client'
import { useProfile } from '@/components/UseProfile'
import UserTabs from '@/components/layout/UserTabs'
import MenuItemForm from '@/components/layout/MenuItemForm'
import { redirect, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import Left from '@/components/icons/LeftArrow'

export default function EditMenu() {
  const { id } = useParams()
  const [menuItem, setMenuItem] = useState(null)
  const [redirectToItems, setRedirectToItems] = useState(false)
  const { loading, data } = useProfile()

  useEffect(() => {
    fetch('/api/menu-items').then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id)
        setMenuItem(item)
      })
    })
  }, [])

  async function handleMenuSubmit(ev, data) {
    ev.preventDefault()
    data = { ...data, _id: id }
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

  async function handleDeleteClick() {
    const deletingPromise = new Promise((resolve, reject) => {
      const waitingResponse = async () => {
        const response = await fetch('/api/menu-items?_id=' + id, {
          method: 'DELETE',
        })
        if (response.ok) {
          return resolve()
        } else {
          reject(console.error('Try Again'))
        }
      }
      waitingResponse()
    })

    await toast.promise(deletingPromise, {
      loading: 'Deleting Item',
      success: 'Item Deleted',
      error: 'Sorry, try again',
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
        <MenuItemForm menuItem={menuItem} onSubmit={handleMenuSubmit} />
        <div className="max-w-md mx-auto mt-2">
          <div className="max-w-xs ml-auto pl-4">
            <button onClick={handleDeleteClick}>Delete</button>
          </div>
        </div>
      </section>
    </div>
  )
}
