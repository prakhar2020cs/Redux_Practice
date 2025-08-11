// state logic , executed on state

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk('products/getProducts', async()=>{
    const data = await fetch('https://dummyjson.com/products');
    const result = await data.json();
    return result;
})



const productSlice = createSlice({
    name:'product',
   initialState:{
    data:[],
    status:'idle'
   },
  

      extraReducers: (builder)=>{
        builder
        .addCase(getProducts.fulfilled, (state, action)=>{
state.status ='idle' ;
state.data = action.payload ;  
})
    .addCase(getProducts.pending, (state, action)=>{
state.status ='loading'         })
.addCase(getProducts.rejected, (state, action)=>{
state.status ='error'         })
    }
        
    })
// these are actions, actionType, auto generated based on reducer functions
// export  {getProducts} = productSlice.actions;

// gives us state
export default productSlice.reducer;


