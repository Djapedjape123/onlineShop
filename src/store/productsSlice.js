import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "category",
  initialState: {
    allProducts: [],
    isLoading:false,
  },
  reducers: {
    saveAllProductsActions: (state, action) => {
      state.allProducts = action.payload;
      state.isLoading = true;
    },
  },
});

export const { saveAllProductsActions } = productsSlice.actions;
export default productsSlice.reducer;