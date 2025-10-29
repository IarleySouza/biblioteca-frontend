"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext(null)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart")
    return saved ? JSON.parse(saved) : []
  })

  const [rentalCart, setRentalCart] = useState(() => {
    const saved = localStorage.getItem("rentalCart")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem("rentalCart", JSON.stringify(rentalCart))
  }, [rentalCart])

  const addToCart = (livro) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === livro.id)
      if (exists) {
        return prev
      }
      return [...prev, livro]
    })
  }

  const addToRental = (livro) => {
    setRentalCart((prev) => {
      const exists = prev.find((item) => item.id === livro.id)
      if (exists) {
        return prev
      }
      return [...prev, livro]
    })
  }

  const removeFromCart = (livroId) => {
    setCart((prev) => prev.filter((item) => item.id !== livroId))
  }

  const removeFromRental = (livroId) => {
    setRentalCart((prev) => prev.filter((item) => item.id !== livroId))
  }

  const clearCart = () => {
    setCart([])
  }

  const clearRentalCart = () => {
    setRentalCart([])
  }

  const isInCart = (livroId) => {
    return cart.some((item) => item.id === livroId)
  }

  const isInRentalCart = (livroId) => {
    return rentalCart.some((item) => item.id === livroId)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        rentalCart,
        addToCart,
        addToRental,
        removeFromCart,
        removeFromRental,
        clearCart,
        clearRentalCart,
        isInCart,
        isInRentalCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
