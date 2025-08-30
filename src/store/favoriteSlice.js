import { createSlice } from "@reduxjs/toolkit";


const favoriteSlice = createSlice({
    name:'favorite',
    initialState:{
        allFavorite:[],
        totalFavorite:0
    },
    reducers:{
        saveAllFavorite:(state,action) => {
            console.log(action.payload);

              let copyFavorite = [...state.allFavorite];

            //duplikati
            let findIndex = null;
            copyFavorite.find((item, index) => {

                if (item.id === action.payload.id) {
                    findIndex = index;
                    return;
                }
            });
            if(findIndex === null){
                copyFavorite.push(action.payload);
                state.totalFavorite++;
            }else{
                copyFavorite.splice(findIndex,1);
                state.totalFavorite--;
            }

            state.allFavorite = copyFavorite;
            
        }
    }
});
export const { saveAllFavorite} = favoriteSlice.actions;
export default favoriteSlice.reducer;