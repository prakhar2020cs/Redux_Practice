// for the global states


import { configureStore } from '@reduxjs/toolkit'
import cartSlice from '../features/cartSlice'
import productSlice from '../features/productSlice'
export const store = configureStore({
    reducer: {
        cart: cartSlice,
        product: productSlice,
    },
})