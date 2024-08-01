import React from 'react'

export default function AddToCartButton({
  hasSizesOrExtras,
  onClick,
  basePrice,
}) {
  if (!hasSizesOrExtras) {
    return (
      <div className="flying-button-parent w-full mt-4" onClick={onClick}>
        <button>Add to cart for ${basePrice}</button>
      </div>
    )
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-primary text-white py-2 font-semibold px-4  mt-2 rounded-full"
    >
      <span>Add to cart (from ${basePrice})</span>
    </button>
  )
}
