import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cartItems :[]
    },
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item._id === newItem._id);
            console.log(existingItem,state.cartItems)
            if (existingItem) {
                existingItem.count += 1;
            } else {
                state.cartItems.push({
                    ...newItem,
                    count: 1 // or set to newItem.count if count is already present in newItem
                });
            }
        },
        removeItem:(state,action)=>{
           let index = state.cartItems.findIndex((item)=>{
                return item._id===action.payload
            })
            if(state.cartItems[index].count>1){
                state.cartItems[index].count -=1
            }else{
                state.cartItems.splice(index , 1)
            }
           
        } ,
        clearCart:(state,action)=>{
            state.cartItems=[]
        }

    }
});


export const { addItem , removeItem , clearCart} = cartSlice.actions;
export default cartSlice.reducer