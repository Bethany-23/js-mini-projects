import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalAmount: 0 },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    updateQuantity: (state, action) => {
      const { id, type } = action.payload; // type is 'inc' or 'dec'
      const item = state.items.find((i) => i.id === id);
      if (type === "inc") item.quantity++;
      if (type === "dec" && item.quantity > 1) item.quantity--;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, updateQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
