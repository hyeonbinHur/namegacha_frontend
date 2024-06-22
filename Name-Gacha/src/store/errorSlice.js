import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isError: false,
    errorMessage: null,
    errorCode: null,
};

const errorSlice = createSlice({
    name: 'errorSlice',
    initialState: initialState,
    reducers: {
        setError(state, action) {
            console.log('error setted in reducer');
            state.isError = true;
            state.errorMessage = action.payload.message;
            state.errorCode = action.payload.code;
        },
        clearError(state) {
            console.log('clear error in reducer');
            state.isError = false;
            state.errorMessage = null;
            state.errorCode = null;
        },
    },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
