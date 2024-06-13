import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentThread: null,
    messages: [],
};

const threadSlice = createSlice({
    name: 'currentThread',
    initialState: initialState,
    reducers: {
        setThread(state, action) {
            state.currentThread = action.payload.newThread;
        },
        setMessages(state, action) {
            state.messages = action.payload.messages;
        },
    },
});

export const { setThread, setMessages } = threadSlice.actions;
export default threadSlice.reducer;
