'use client'
import { CartContext, cartProductPrice } from '@/components/AppContext'
import SectionHeaders from '@/components/layout/SectionHeaders'
import Trash from '@/components/icons/Trash'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import AddressInputs from '@/components/layout/AddressInputs'
import { useProfile } from '@/components/UseProfile'

export default function CartPage() {
  const { cartProducts, removeCartProducts } = useContext(CartContext)
  const [address, setAddress] = useState({})
  const { data: profileData } = useProfile()

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

  let total = 0
  for (const product of cartProducts) {
    total += cartProductPrice(product)
  }

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }))
  }
  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader={'Cart'} />
      </div>
      <div className="grid grid-cols-2 gap-8 mt-8">
        <div>
          {cartProducts?.length === 0 && <div>No products in your cart</div>}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <div className="flex items-center gap-4 border-b py-4">
                <div className="w-24">
                  <Image width={240} height={240} src={product.image} alt="" />
                </div>
                <div className="grow">
                  <h3 className="font-semibold">{product.name}</h3>
                  {product.size && (
                    <div className="text-sm text-gray-700">
                      <div>Size:</div>
                      <span className="text-xs ml-3 text-gray-500">
                        {product.size.name}
                      </span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div className="text-sm ">
                      Extras:
                      {product.extras.map((extra) => (
                        <div className="text-xs ml-3 text-gray-400">
                          {extra.name} ${extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-lg font-semibold">
                  ${cartProductPrice(product)}
                </div>
                <div className="ml-2">
                  <button
                    type="button"
                    onClick={() => removeCartProducts(index)}
                    className="p-2"
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          <div className="text-right py-2 pr-16">
            <span className="text-gray-500">Subtotal: </span>
            <span className="text-lg font-semibold pl-2">${total}</span>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form action="">
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
