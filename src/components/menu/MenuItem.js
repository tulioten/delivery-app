import { useContext, useState } from 'react'
import { CartContext } from '../AppContext'
import MenuItemTile from '@/components/menu/MenuItemTile'
import toast from 'react-hot-toast'
import Image from 'next/image'

export default function MenuItem(menuItem) {
  const { image, name, description, basePrice, sizes, extraIngredients } =
    menuItem
  const [showPopUp, setShowPopUp] = useState(false)
  const { addToCart } = useContext(CartContext)

  function handleAddToCartButton() {
    if (sizes.length === 0 && extraIngredients.length === 0) {
      addToCart(menuItem)
      toast.success('Added to cart!')
    } else {
      setShowPopUp(true)
    }
  }

  return (
    <>
      {showPopUp && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <Image
              src={image}
              alt={name}
              width={300}
              height={300}
              className="mx-auto"
            />
            <h2 className="text-lg font-bold text-center mb-4">{name}</h2>
            <p className="text-center text-gray-500 text-sm mb-2">
              {description}
            </p>
            {sizes.length > 0 && (
              <div className="bg-gray-200 rounded-md text-center p-2">
                <h3>Pick your Size</h3>
              </div>
            )}
          </div>
        </div>
      )}
      <MenuItemTile props={handleAddToCartButton} {...menuItem} />
    </>
  )
}
