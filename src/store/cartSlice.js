import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        totalProduct: 0,
        totalPrice:0
    },
    reducers: {
        saveInCartAction: (state, action) => {
            // console.log(action.payload);

            let copyCart = [...state.cart];

            //duplikati
            let findIndex = null;
            copyCart.find((item, index) => {

                if (item.id === action.payload.id) {
                    findIndex = index;
                    return;
                }
            });
            if (findIndex === null) {
                copyCart.push({ ...action.payload, count: 1, cartTotal: action.payload.price })
                state.totalProduct++
                state.totalPrice += action.payload.price;
            } else {
                copyCart[findIndex].count++;
            }

            state.cart = copyCart;
            localStorage.setItem('cart_item', JSON.stringify(copyCart))
            localStorage.setItem('cart_total',JSON.stringify(state.totalProduct))
        },
        delateFromCartAction: (state, action) => {
            console.log(action.payload);

            let copyCart = [...state.cart]
            let findIndex = null;

            copyCart.find((item , index) =>{
                if(item.id === action.payload.id){
                    findIndex = index;
                    return;
                }
            })
            if(findIndex !== null){
               copyCart.splice(findIndex,1);
               state.totalProduct--;
               state.totalPrice = subTotal(copyCart)
            }



            state.cart = copyCart;
            localStorage.setItem('cart_item', JSON.stringify(copyCart))
            localStorage.setItem('cart_total',JSON.stringify(state.totalProduct))
        },
        savePriceHengleAction: (state , action) => {
             console.log(action.payload);

             const {index ,increment} = action.payload;
             let copyCart = [...state.cart];

             copyCart[index].cartTotal += copyCart[index].price * increment
             state.totalPrice = subTotal(copyCart)

             if(copyCart[index].count === 1 && increment === -1){
                copyCart.splice(index,1)
                state.totalProduct--;
             }else{
                 copyCart[index].count += increment

             }



             state.cart = copyCart;
              localStorage.setItem('cart_item', JSON.stringify(copyCart))
             localStorage.setItem('cart_total',JSON.stringify(state.totalProduct))
        }
    }
});

function subTotal(arreyCart){
  return arreyCart.reduce((acc,curent) => {
    return acc + curent.cartTotal;
  },0)
}

export const { saveInCartAction , delateFromCartAction,savePriceHengleAction} = cartSlice.actions;
export default cartSlice.reducer;