import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentThread: null,
};

const threadSlice = createSlice({
    name: 'currentThread',
    initialState: initialState,
    reducers: {
        setThread(state, action) {
            state.currentThread = action.payload.newThread;
        },
    },
});

export const { setThread } = threadSlice.actions;
export default threadSlice.reducer;
