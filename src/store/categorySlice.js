import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    allCategory: [],
  },
  reducers: {
    saveAllCategoryActions: (state, action) => {
      state.allCategory = action.payload;
    },
  },
});

export const { saveAllCategoryActions } = categorySlice.actions;
export default categorySlice.reducer;
