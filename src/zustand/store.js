import {create} from 'zustand'
import {persist} from "zustand/middleware";

export const useStore = create(
    persist(
        (set) => ({
            cart: [],
            addToCart: (item) => set((state) => ({cart: [...state.cart, item]})),
            removeFromCart: (id) => set((state) => ({cart: state.cart.filter(item => item.id !== id)})),
            resetCart: () => set({cart: []}),
        }),
        {
            name: 'cart-storage'
        },)
)
