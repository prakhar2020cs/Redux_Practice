// state logic , executed on state

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
   initialState:[],
    reducers:{
        addToCart(state, action){
            state.push(action.payload);

        },
        removeFromCart(state, action){
            return state.filter((item) => item.id !== action.payload.id);
        },
        
    }
})

// these are actions, actionType, auto generated based on reducer functions
export const {addToCart, removeFromCart} = cartSlice.actions;

// gives us state
export default cartSlice.reducer;