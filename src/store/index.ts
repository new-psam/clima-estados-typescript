import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from '@/store/slices/weatherSlice';

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
    },
});

// Tipagens para ajudar o TypeScript a não reclamar depois
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;