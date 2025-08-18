// state logic , executed on state

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const data = await fetch("https://dummyjson.com/products");
    const result = await data.json();
    localStorage.setItem("products", JSON.stringify(result));
    return result;
  }
);

const saveStorage = (state)=>{

  console.log(state.data.products, "redux save to db call")
  axios.post("https://localhost:7146/api/products",  {withCredentials:true})
}

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: "idle",
  },

  reducers: {
    decreaseProductStock(state, action) {
      const product = state.data.products.find(
        (p) => p.id === action.payload.id
      );
  console.log("decrease product")
      product.stock -= 1;
      saveStorage(state);
      localStorage.setItem("products", JSON.stringify(state.data));
    },
    increaseProductStock(state, action) {
      debugger;
      if(action.payload.type === "add"){
        state.data.products.find((p)=>p.id === action.payload.id).stock += action.payload.stock;
        saveStorage(state);
      }else{

      const product = state.data.products.find(
        (p) => p.id === action.payload.id
      );

      product.stock += 1;
saveStorage(state)      
}

    },
    getFromLocal(state, action) {
      state.data = JSON.parse(localStorage.getItem("products"));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "idle";
      debugger;
        state.data = action.payload;
          console.log(state.data, "state.data from fulfilled");
      })
      .addCase(getProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "error";
      });
   
  },
});


// gives us state
export default productSlice.reducer;

export const { decreaseProductStock, getFromLocal,increaseProductStock } = productSlice.actions;
