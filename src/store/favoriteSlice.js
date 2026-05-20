import { createSlice } from "@reduxjs/toolkit";

// 1. DODATO: Funkcija koja proverava da li već imamo nešto sačuvano u memoriji
const getFavoritesFromLocalStorage = () => {
    const storedFavorites = localStorage.getItem('favorite_items');
    if (storedFavorites) {
        return JSON.parse(storedFavorites);
    }
    return [];
};

// 2. DODATO: Učitavamo početne vrednosti pre nego što se slice napravi
const initialFavorites = getFavoritesFromLocalStorage();

const favoriteSlice = createSlice({
    name:'favorite',
    initialState:{
        // 3. DODATO: Umesto praznog niza i nule, prosleđujemo podatke iz funkcije
        allFavorite: initialFavorites,
        totalFavorite: initialFavorites.length 
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
            
            // 4. DODATO: Nakon što se završi tvoja logika, novu listu guramo u localStorage
            localStorage.setItem('favorite_items', JSON.stringify(state.allFavorite));
        }
    }
});

export const { saveAllFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;