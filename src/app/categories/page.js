'use client'

import UserTabs from '@/components/layout/UserTabs'
import { useProfile } from '@/components/UseProfile'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function CategoriesPage() {
  const [newCategoryName, setNewCategoryName] = useState('')
  const [categories, setCategories] = useState([])
  const [editedCategory, setEditedCategory] = useState(null)
  const { loading: profileLoading, data: profileData } = useProfile()

  useEffect(() => {
    fetchCategories()
  }, [])

  function fetchCategories() {
    fetch('/api/categories').then((res) => {
      res.json().then((categories) => {
        setCategories(categories)
      })
    })
  }

  async function handleNewCategorySubmit(ev) {
    ev.preventDefault()
    const creationPromise = new Promise((resolve, reject) => {
      const waitingResponse = async () => {
        const response = await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newCategoryName }),
        })
        setNewCategoryName('')
        fetchCategories()
        if (response.ok) {
          return resolve()
        } else {
          reject(console.error('Unexpected Error'))
        }
      }
      waitingResponse()
    })
    await toast.promise(creationPromise, {
      loading: 'Creating your new category...',
      success: 'Category created successfully',
      error: 'Error, sorry...',
    })
  }

  if (profileLoading) {
    return 'Loading user info...'
  }

  if (!profileData.admin) {
    return redirect('/')
  }

  return (
    <section className=" mt-8 max-w-lg mx-auto ">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleNewCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>{editedCategory ? 'Edit Category' : 'New category'}</label>
            <input
              type="text"
              value={newCategoryName}
              onChange={(ev) => setNewCategoryName(ev.target.value)}
            />
          </div>
          <div className="pb-2">
            <button className="border border-primary" type="submit">
              {editedCategory ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-4 mb-1 text-sm text-gray-500">Edit category:</h2>
        {categories?.length > 0 &&
          categories.map((cat) => (
            <button
              onClick={setEditedCategory(cat)}
              className="flex bg-gray-200 rounded-xl p-2 px-4 mb-2 gap-2 cursor-pointer"
            >
              <span>{cat.name}</span>
            </button>
          ))}
      </div>
    </section>
  )
}
