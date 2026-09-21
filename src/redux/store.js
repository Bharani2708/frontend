import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../redux/cartSlice';

const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});
export default store;
export {store};