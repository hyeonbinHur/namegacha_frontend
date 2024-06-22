import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isError: false,
    error: null,
};

const errorSlice = createSlice({
    name: 'errorSlice',
    initialState: initialState,
    reducers: {
        setError(state, action) {
            console.log('error setted in reducer');
            state.isError = true;
            state.error = action.payload.error;
        },
        clearError(state) {
            state.isError = false;
            state.error = null;
        },
    },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
