'use client'

import UserTabs from '@/components/layout/UserTabs'
import { useProfile } from '@/components/UseProfile'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function CategoriesPage() {
  const [CategoryName, setCategoryName] = useState('')
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

  async function handleCategorySubmit(ev) {
    ev.preventDefault()
    const creationPromise = new Promise((resolve, reject) => {
      const data = { name: CategoryName }
      if (editedCategory) {
        data._id = editedCategory._id
      }
      const waitingResponse = async () => {
        const response = await fetch('/api/categories', {
          method: editedCategory ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        setCategoryName('')
        fetchCategories()
        setEditedCategory(null)
        if (response.ok) {
          return resolve()
        } else {
          reject(console.error('Unexpected Error'))
        }
      }
      waitingResponse()
    })
    await toast.promise(creationPromise, {
      loading: editedCategory
        ? 'Updating Category'
        : 'Creating your new category...',
      success: editedCategory
        ? 'Category Updated'
        : 'Category created successfully',
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
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>{editedCategory ? 'Edit Category' : 'New category'}</label>
            {editedCategory && (
              <>
                : <strong>{editedCategory.name}</strong>
              </>
            )}
            <input
              type="text"
              value={CategoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
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
              onClick={() => {
                setEditedCategory(cat)
                setCategoryName(cat.name)
              }}
              className="flex bg-gray-200 rounded-xl p-2 px-4 mb-2 gap-2 cursor-pointer hover:bg-red-200"
            >
              <span>{cat.name}</span>
            </button>
          ))}
      </div>
    </section>
  )
}
