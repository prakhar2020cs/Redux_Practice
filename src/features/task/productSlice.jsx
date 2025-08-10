// state logic , executed on state

import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name:'product',
    initialState:{
        
    },
    reducers:{
        addProduct(state, action){
            state.product.push(action.payload);

        },
        removeProduct(state, action){
            state.product = state.product.filter((item) => item.id !== action.payload.id);
        },
        
    }
})