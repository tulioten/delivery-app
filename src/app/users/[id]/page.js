'use client'
import UserForm from '@/components/layout/UserForm'
import UserTabs from '@/components/layout/UserTabs'
import { useProfile } from '@/components/UseProfile'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function EditUserPage() {
  const { loading, data } = useProfile()
  const [user, setUser] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    fetch('/api/profile?_id=' + id).then((res) => {
      res.json().then((user) => {
        setUser(user)
      })
    })
  }, [])

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault()
    const promise = new Promise((resolve, reject) => {
      const waitingResponse = async () => {
        const response = await fetch('/api/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, _id: id }),
        })
        if (response.ok) {
          resolve()
        } else {
          reject(console.log('Something is wrong'))
        }
      }
      waitingResponse()
    })
    await toast.promise(promise, {
      loading: 'Updating!',
      success: 'Updated!',
      error: 'Sorry, something is wrong',
    })
  }

  if (loading) {
    return 'Loading user profile...'
  }

  if (!data.admin) {
    return 'Not an admin'
  }

  return (
    <section className="mt-8 mx-auto max-w-lg">
      <UserTabs />

      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  )
}
