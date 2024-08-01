'use client'
import React, { useContext, useState } from 'react'
import { CartContext } from '../AppContext'
import MenuItemTile from '@/components/menu/MenuItemTile'
import Image from 'next/image'

export default function MenuItem(menuItem) {
  const { image, name, description, basePrice, sizes, extraIngredients } =
    menuItem
  const [selectedExtraIngredients, setSelectedExtraIngredients] = useState([])
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null)
  const [showPopUp, setShowPopUp] = useState(false)
  const { addToCart } = useContext(CartContext)

  async function handleAddToCartButton() {
    const hasOptions = sizes.length > 0 || extraIngredients.length > 0
    if (hasOptions && !showPopUp) {
      setShowPopUp(true)
      return
    }
    addToCart(menuItem, selectedSize, selectedExtraIngredients)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setShowPopUp(false)
  }

  function handleAddExtraIngredient(ev, extraIngredient) {
    const checked = ev.target.checked

    if (checked) {
      setSelectedExtraIngredients((prev) => [...prev, extraIngredient])
    } else {
      setSelectedExtraIngredients((prev) => {
        return prev.filter(
          (ingredient) => ingredient.name !== extraIngredient.name,
        )
      })
    }
  }

  let itemPrice = basePrice
  if (selectedSize) {
    itemPrice += selectedSize.price
  }
  if (selectedExtraIngredients?.length > 0) {
    for (const ingredient of selectedExtraIngredients) {
      itemPrice += ingredient.price
    }
  }

  return (
    <>
      {showPopUp && (
        <div
          onClick={() => setShowPopUp(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div className="bg-white my-8 p-2 rounded-lg max-w-md w-full">
            <div
              onClick={(ev) => ev.stopPropagation()}
              className="overflow-y-scroll p-2 h-full scrollbar-hidden"
              style={{ maxHeight: 'calc(100vh - 100px)' }}
            >
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
                <div className=" text-center p-2">
                  <h3 className="text-center text-gray-700">Pick your size:</h3>
                  {sizes.map((size) => (
                    <label
                      key={size._id}
                      className=" flex items-center gap-1 text-left px-2 py-2 border rounded-md mb-1"
                    >
                      <input
                        onChange={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                        type="radio"
                        name="size"
                      />
                      {size.name} ${basePrice + size.price}
                    </label>
                  ))}
                </div>
              )}
              {extraIngredients.length > 0 && (
                <div className="text-center p-2">
                  <h3 className="text-center text-gray-700">Any extras?</h3>
                  {extraIngredients.map((extraIngredient) => (
                    <label
                      key={extraIngredient._id}
                      className="flex items-center gap-1 text-left px-2 py-2 border rounded-md mb-1"
                    >
                      <input
                        onClick={(ev) =>
                          handleAddExtraIngredient(ev, extraIngredient)
                        }
                        type="checkbox"
                        name={extraIngredient.name}
                      />
                      {extraIngredient.name} ${extraIngredient.price}
                    </label>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <div
                  onClick={handleAddToCartButton}
                  className="flying-button-parent w-full primary"
                >
                  <button>Add to cart for ${itemPrice}</button>
                </div>
                <button type="button" onClick={() => setShowPopUp(!showPopUp)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile props={handleAddToCartButton} {...menuItem} />
    </>
  )
}
