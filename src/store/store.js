import { configureStore } from "@reduxjs/toolkit";

import categorySlice from "./categorySlice";
import productsSlice from "./productsSlice";
import cartSlice from "./cartSlice"


const store = configureStore({
    reducer:{
       categoryStore: categorySlice,
       productsStore:productsSlice,
       cartStore:cartSlice
    }
});

export default store;