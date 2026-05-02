import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    loading: false,
  },
  reducers: {
    // This function saves the API data into our "Global Brain"
    setProducts: (state, action) => {
      state.allProducts = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
