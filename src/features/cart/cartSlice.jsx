// state logic , executed on state

import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../product/productSlice";

const loadCart = () => {
  const saved = localStorage.getItem("cart");
  return saved ? JSON.parse(saved) : [];
};
const saveCart = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};
const clearCart = () => {
  localStorage.setItem("cart", JSON.stringify([]));
};
const cartSlice = createSlice({
  name: "cart",
  initialState: loadCart() || [],
  reducers: {
    addToCart(state, action) {
      let cartItem = state.find((item) => item.id == action.payload.id);
      if (cartItem ) {
        cartItem.stock += 1;
        saveCart(state);
      } else {
        state.push({ ...action.payload, stock: 1 });
        saveCart(state);
      }
    },
    clearFromCart(state, action) {
      clearCart();
      return [];
    },
    // removeFromCart(state, action) {
    //   let cartItem = state.find((item) => item.id == action.payload.id);
    //   if (cartItem.stock == 1) {
    //     let updatedCart = state.filter((item) => item.id !== action.payload.id);
    //     saveCart(updatedCart);
    //     return updatedCart;
    //   } else {
    //     cartItem.stock -= 1;
    //     saveCart(state);
    //   }
    // },

    increaseCartStock(state, action) {
      const cartItem = state.find((item) => item.id === action.payload.id);
      
      cartItem.stock++;
      saveCart(state);
    },
    decreaseCartStock(state, action) {
      if(action.payload.type === "remove"){
          const newData = state.filter((item)=>item.id !== action.payload.id)
        saveCart(newData)
        return newData;
      
       }
      const cartItem = state.find((item) => item.id === action.payload.id);

      if (cartItem.stock > 1) {
        cartItem.stock--;
        saveCart(state);
      } else {
        let updatedCart = state.filter((item) => item.id !== action.payload.id);
        saveCart(updatedCart);
        return updatedCart;
      }
    },

    //       increaseStock(state  , action) {
    //   state.find(p=>p.id === action.payload.id).stock++;
    // },
    // decreaseStock(state  , action) {
    //   state.find(p=>p.id === action.payload.id).stock--;
    // }
  },

  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      let savedCart = loadCart();
      return savedCart;
    });
  },
});

// these are actions, actionType, auto generated based on reducer functions
export const {
  addToCart,
  removeFromCart,
  clearFromCart,
  increaseCartStock,
  decreaseCartStock,
} = cartSlice.actions;

// gives us state
export default cartSlice.reducer;
