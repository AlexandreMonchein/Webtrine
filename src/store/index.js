import { configureStore } from '@reduxjs/toolkit';
import { stateReducer } from './state.reducer';


const store = configureStore({
    reducer: stateReducer,
});

export default store;