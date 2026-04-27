import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeatherState {
    favorites: any[];
    loading: boolean;
}

const initialState: WeatherState = {
    favorites: [],
    loading: false,
};

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        // Ação para quando o Firebase mandar dados novos
        setFavorites: (state, action: PayloadAction<any[]>) => {
            state.favorites = action.payload;
            state.loading = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { setFavorites, setLoading } = weatherSlice.actions;
export default weatherSlice.reducer;