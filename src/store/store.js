import { configureStore } from "@reduxjs/toolkit";

import categorySlice from "./categorySlice";
import productsSlice from "./productsSlice";
import cartSlice from "./cartSlice";
import favoriteSlice from "./favoriteSlice"


const store = configureStore({
    reducer:{
       categoryStore: categorySlice,
       productsStore:productsSlice,
       cartStore:cartSlice,
       favoriteStore:favoriteSlice
    }
});

export default store;