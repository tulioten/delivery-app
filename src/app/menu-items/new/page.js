'use client'

import { useProfile } from '@/components/UseProfile'
import UserTabs from '@/components/layout/UserTabs'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import Left from '@/components/icons/LeftArrow'
import MenuItemForm from '@/components/layout/MenuItemForm'

export default function NewMenuItemPage() {
  const [redirectToItems, setRedirectToItems] = useState(false)
  const { loading, data } = useProfile()

  async function handleMenuSubmit(ev, data) {
    ev.preventDefault()
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
        <MenuItemForm onSubmit={handleMenuSubmit} menuItem={null} />
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
