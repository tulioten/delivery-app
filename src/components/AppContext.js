'use client'
import { SessionProvider } from 'next-auth/react'
import { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export const CartContext = createContext({})

export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice
  if (cartProduct.size) {
    price += cartProduct.size.price
  }
  if (cartProduct.extras?.length > 0) {
    for (const ingredient of cartProduct.extras) {
      price += ingredient.price
    }
  }
  return price
}

export default function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([])
  const localStorage =
    typeof window !== 'undefined' ? window.localStorage : null

  useEffect(() => {
    if (localStorage && localStorage.getItem('cart')) {
      setCartProducts(JSON.parse(localStorage.getItem('cart')))
    }
  }, [])

  function clearCart() {
    setCartProducts([])
    saveCartInLocalStorage([])
  }

  function removeCartProducts(indexToRemove) {
    setCartProducts((prevCartProducts) => {
      const newCartProducts = prevCartProducts.filter(
        (value, index) => index !== indexToRemove,
      )
      saveCartInLocalStorage(newCartProducts)
      return newCartProducts
    })
    toast.success('Item removed!')
  }

  function saveCartInLocalStorage(cartProducts) {
    if (localStorage) {
      localStorage.setItem('cart', JSON.stringify(cartProducts))
    }
  }

  function addToCart(product, size = null, extras = []) {
    setCartProducts((prevProducts) => {
      const cartProduct = { ...product, size, extras }
      const newProducts = [...prevProducts, cartProduct]
      saveCartInLocalStorage(newProducts)
      return newProducts
    })
  }

  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          removeCartProducts,
          clearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  )
}
