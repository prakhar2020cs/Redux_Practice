// for the global states


import { configureStore } from '@reduxjs/toolkit'
import cartSlice from '../features/cart/cartSlice'
import productSlice from '../features/product/productSlice'
export const store = configureStore({
    reducer: {
        cart: cartSlice,
        products:productSlice
    },
})


export default store;