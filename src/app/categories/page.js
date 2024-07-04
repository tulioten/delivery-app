'use client'

import Trash from '@/components/icons/Trash'
import Edit from '@/components/icons/Edit'
import BackArrow from '@/components/icons/BackArrow'
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

  async function handleDeleteClick(_id) {
    const deletingPromise = new Promise((resolve, reject) => {
      const waitingResponse = async () => {
        const response = await fetch('/api/categories?_id=' + _id, {
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
      loading: 'Deleting Category',
      success: 'Category Deleted',
      error: 'Sorry, try again',
    })

    fetchCategories()
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
          <div className="pb-2 flex gap-2">
            <button className="border border-primary" type="submit">
              {editedCategory ? 'Update' : 'Create'}
            </button>
            <button
              className="border border-primary bg-primary text-white px-2"
              type="button"
              onClick={() => {
                setEditedCategory(null)
                setCategoryName('')
              }}
            >
              <BackArrow />
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-4 mb-1 text-sm text-gray-500">Categories:</h2>
        {categories?.length > 0 &&
          categories.map((cat) => (
            <div className="flex bg-gray-200 rounded-xl p-2 px-4 mb-2 gap-2 items-center">
              <div className="grow hover:underline cursor-pointer">
                {cat.name}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditedCategory(cat)
                    setCategoryName(cat.name)
                  }}
                  className="px-2"
                  type="button"
                >
                  <Edit />
                </button>
                <button
                  onClick={() => {
                    handleDeleteClick(cat._id)
                  }}
                  className="px-2"
                  type="button"
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}
