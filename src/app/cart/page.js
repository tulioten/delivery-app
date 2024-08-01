'use client'
import { CartContext, cartProductPrice } from '@/components/AppContext'
import SectionHeaders from '@/components/layout/SectionHeaders'
import { useContext, useEffect, useState } from 'react'
import AddressInputs from '@/components/layout/AddressInputs'
import { useProfile } from '@/components/UseProfile'
import toast from 'react-hot-toast'
import CartProduct from '@/components/menu/CartProduct'
import generateKey from '@/libs/generateKey'

export default function CartPage() {
  const { cartProducts, removeCartProducts } = useContext(CartContext)
  const [address, setAddress] = useState({})
  const { data: profileData } = useProfile()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('Payment failed :(')
      }
    }
  }, [])

  useEffect(() => {
    if (profileData) {
      const { phone, streetAddress, city, postalCode, country } = profileData
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      }
      setAddress(addressFromProfile)
    }
  }, [profileData])

  let subtotal = 0
  for (const product of cartProducts) {
    subtotal += cartProductPrice(product)
  }
  const delivery = 5

  const total = subtotal + delivery

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }))
  }

  async function proceedToCheckout(ev) {
    ev.preventDefault()

    // address and shopping cart products
    const promise = new Promise((resolve, reject) => {
      fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve()
          window.location = await response.json()
        } else {
          reject(console.log('error'))
        }
      })
    })

    await toast.promise(promise, {
      loading: 'Preparing your order...',
      success: 'Redirecting to payment...',
      error: 'Something went wrong.',
    })
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader={'Cart'} />
        <p className="mt-4">Your shopping cart is empty.</p>
      </section>
    )
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader={'Cart'} />
      </div>
      {/* Left side - Product Info Section */}
      <div className="sm:grid grid-cols-2 gap-8 mt-8">
        <div>
          {cartProducts?.length === 0 && <div>No products in your cart</div>}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <CartProduct
                key={generateKey()}
                product={product}
                onRemove={removeCartProducts}
                index={index}
              />
            ))}
          <div className="py-2 pr-16 flex justify-end items-center">
            <div className="text-gray-500">
              Subtotal: <br />
              Delivery: <br />
              Total:
            </div>
            <div className="text-lg font-semibold pl-2">
              ${subtotal}
              <br />${delivery}
              <br />${total}
            </div>
          </div>
        </div>
        {/* Right side - Address and Pay Section */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProps={{ handleAddressChange }}
            />
            <button type="submit">Pay ${total}</button>
          </form>
        </div>
      </div>
    </section>
  )
}
