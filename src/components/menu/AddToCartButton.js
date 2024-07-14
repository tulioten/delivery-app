import React from 'react'
import FlyingButton from 'react-flying-item'

export default function AddToCartButton({
  hasSizesOrExtras,
  onClick,
  basePrice,
  image,
}) {
  if (!hasSizesOrExtras) {
    return (
      <div className="flying-button-parent w-full mt-4" onClick={onClick}>
        <FlyingButton targetTop={'5%'} targetLeft={'95%'} src={image}>
          Add to cart for ${basePrice}
        </FlyingButton>
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
