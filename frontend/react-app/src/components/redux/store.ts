// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit'; // Import configureStore from Redux Toolkit
import rootReducer from './rootReducer';


const store = configureStore({
    reducer: rootReducer,
    // Optionally, you can specify middleware and other store configurations here
});

export default store;
