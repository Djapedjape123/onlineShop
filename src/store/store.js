import { configureStore } from "@reduxjs/toolkit";

import categorySlice from "./categorySlice";
import productsSlice from "./productsSlice";



const store = configureStore({
    reducer:{
       categoryStore: categorySlice,
       productsStore:productsSlice
    }
});

export default store;