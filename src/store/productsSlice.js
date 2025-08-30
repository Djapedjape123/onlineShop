import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "category",
  initialState: {
    allProducts: [],
    isLoading:false,
    selectCategory:'',
    searchProducts:'',
  },
  reducers: {
    saveAllProductsActions: (state, action) => {
      state.allProducts = action.payload;
      state.isLoading = true;
    },
    saveCategoryAction: (state,action) =>{
      state.selectCategory = action.payload
    },
    saveSearchAction: (state , action) =>{
      state.searchProducts = action.payload
    }

  },
});

export const { saveAllProductsActions,saveCategoryAction,saveSearchAction } = productsSlice.actions;
export default productsSlice.reducer;