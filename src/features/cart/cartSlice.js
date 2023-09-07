import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.carts.push(action.payload);
    },
    deleteItem(state, action) {
      state.carts = state.carts.filter(
        (item) => item.pizzaId !== action.payload,
      );
    },
    increaseItem(state, action) {
      const item = state.carts.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItem(state, action) {
      const item = state.carts.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.carts = [];
    },
  },
});

export const { addItem, deleteItem, increaseItem, decreaseItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (store) => store.cart.carts;

export const getTotalCartQuantity = (store) =>
  store.cart.carts.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (store) =>
  store.cart.carts.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = (id) => (store) =>
  store.cart.carts.find((item) => item.pizzaId === id)?.quantity;
