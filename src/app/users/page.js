'use client'

import { useProfile } from '@/components/UseProfile'
import Edit from '@/components/icons/Edit'
import UserTabs from '@/components/layout/UserTabs'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const { loading, data } = useProfile()

  useEffect(() => {
    fetch('/api/users').then((res) => {
      res.json().then((users) => {
        setUsers(users)
      })
    })
  }, [])

  if (loading) {
    return 'Loading user profile...'
  }

  if (!data.admin) {
    return 'Not an admin'
  }

  return (
    <section className=" mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={data.admin} />
      <div className="mt-8">
        {users?.length > 0 &&
          users.map((user) => (
            <div
              key={user._id}
              className="flex bg-gray-200 rounded-lg px-4 p-1 mb-4 items-center justify-between"
            >
              <div
                className="grid grid-cols-2  grow"
                style={{ gridTemplateColumns: '.3fr .7fr' }}
              >
                <div className="text-gray-900">
                  {!!user.name && <span>{user.name}</span>}
                  {!user.name && <span className="italic">No name</span>}
                </div>
                <span className="text-gray-500">{user.email}</span>
              </div>
              <div>
                <Link className="button" href={'/users/' + user._id}>
                  <Edit />
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}
