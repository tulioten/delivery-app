'use client'

import { useProfile } from '@/components/UseProfile'
import UserTabs from '@/components/layout/UserTabs'
import EditableImage from '@/components/layout/EditableImage'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import Left from '@/components/icons/LeftArrow'

export default function NewMenuItemPage() {
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [basePrice, setBasePrice] = useState('')
  const [redirectToItems, setRedirectToItems] = useState(false)
  const { loading, data } = useProfile()

  async function handleMenuSubmit(ev) {
    ev.preventDefault()
    const data = { image, name, description, basePrice }
    const savingPromise = new Promise((resolve, reject) => {
      const waitingResponse = async () => {
        const response = await fetch('/api/menu-items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })

        if (response.ok) {
          return resolve()
        } else {
          reject(console.error('Unexpected Error'))
        }
      }
      setImage('')
      setName('')
      setDescription('')
      setBasePrice('')
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

// {/* <div>
//   <h2 className="mt-4 mb-1 text-sm text-gray-500">
//     {items?.length > 0 &&
//       items.map((it) => (
//         <button
//           onClick={() => {
//             setEditItem(it)
//             setImage(it.image)
//             setName(it.name)
//             setDescription(it.description)
//             setBasePrice(it.basePrice)
//           }}
//           className=" bg-gray-200 rounded-xl p-2 px-4 mb-2 gap-2 cursor-pointer"
//         >
//           <span>{it.name}</span>
//         </button>
//       ))}
//   </h2>
// </div> */}
// ---------------------------------------------------------------------------------------
// #######################################################################################
// ---------------------------------------------------------------------------------------
// useEffect(() => {
//   fetchItems()
// }, [])

// function fetchItems() {
//   fetch('/api/menu-items').then((res) => {
//     res.json().then((items) => {
//       setItems(items)
//     })
//   })
// }
