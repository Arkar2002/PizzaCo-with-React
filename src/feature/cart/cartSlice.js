import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      if (Array.isArray(action.payload)) {
        state.carts = action.payload;
        return;
      }
      state.carts.push(action.payload);
    },

    deleteItem(state, action) {
      state.carts = state.carts.filter(
        (cart) => cart.pizzaId !== action.payload,
      );
    },

    increaseQuantity(state, action) {
      const item = state.carts.find((cart) => cart.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },

    decreaseQuantity(state, action) {
      const item = state.carts.find((cart) => cart.pizzaId === action.payload);
      item.quantity--;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
      item.totalPrice = item.unitPrice * item.quantity;
    },

    clearItem(state) {
      state.carts = [];
    },
  },
});

export const {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  clearItem,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.carts;

export const getCartTotalPrice = (state) =>
  state.cart.carts.reduce((acc, cur) => acc + cur.totalPrice, 0);

export const getOneCartQuantity = (id) => (state) =>
  state.cart.carts?.find((cart) => cart.pizzaId === id)?.quantity ?? 0;
