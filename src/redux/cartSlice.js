import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    totalAmount:0
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({ ...item, quantity: 1 });
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
    
         removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.cartItems= state.cartItems.filter(item => item.id !== itemId);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            },
    
        updateQuantity : (state, action) => {
            const { itemId, quantity } = action.payload;
            const existingItem = state.cartItems.find(item => item.id === itemId);
            if (existingItem) {
                existingItem.quantity += quantity;
                if(existingItem.quantity <1) {
                    existingItem.quantity = 1;
                }
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            }
        },
        calculateTotalAmount: (state) => {
            state.totalAmount = state.cartItems.reduce((total, item) => {
                return total + item.price * item.quantity;
            }, 0);
    
        }
    }

});
export const { addToCart, removeFromCart, updateQuantity, calculateTotalAmount } = counterSlice.actions;
export default counterSlice.reducer;