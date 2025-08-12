// state logic , executed on state

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { removeFromCart } from "../cart/cartSlice";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const data = await fetch("https://dummyjson.com/products");
    const result = await data.json();
    localStorage.setItem("products", JSON.stringify(result));
    return result;
  }
);

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

      product.stock -= 1;
      localStorage.setItem("products", JSON.stringify(state.data));
    },
    increaseProductStock(state, action) {
      const product = state.data.products.find(
        (p) => p.id === action.payload.id
      );

      product.stock += 1;
      localStorage.setItem("products", JSON.stringify(state.data));
    },
    getFromLocal(state, action) {
      state.data = JSON.parse(localStorage.getItem("products"));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(getProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "error";
      });
    //     .addCase(removeFromCart, (state, action) => {
    //     const product = state.data.products.find(p => p.id === action.payload.id);
    //     if (product) {
    //         product.stock += 1;
    //         localStorage.setItem('products', JSON.stringify(state.data));
    //     }
    // });
  },
});
// these are actions, actionType, auto generated based on reducer functions
// export  {getProducts} = productSlice.actions;

// gives us state
export default productSlice.reducer;

export const { decreaseProductStock, getFromLocal,increaseProductStock } = productSlice.actions;
