import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({children}) => {

    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('shopx-cart')
        return saved? JSON.parse(saved): []
    })

    useEffect(() => {
        localStorage.setItem('shopx-cart', JSON.stringify(cart))
    },[cart])

    const addToCart = (product) => {
        setCart(prev => {
            const exists = prev.find(cartItem => cartItem.id === product.id)

            if(exists){

                return prev.map(cartItem => 
                    cartItem.id === product.id? {...cartItem, quantity: cartItem.quantity + product.quantity}: cartItem
                )
            }

            return [...prev, {...product}]
        })
    }

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id))
    }

    const clearCart = () => setCart([])

    const totalItems = cart.reduce((sum,item) => sum + item.quantity, 0)

    const totalPrice = cart.reduce(
        (sum,item) => sum + item.price * item.quantity, 0
    )

    return(
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            totalItems,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)