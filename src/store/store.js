import { configureStore } from '@reduxjs/toolkit';
import displayReducer from './displayPrintersSlice';

const store = configureStore({
    reducer: { display: displayReducer },
});

export default store;
