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
        pushMessages(state, action) {
            console.log('push messages');
            console.log(action.payload.userMessage);
            console.log(action.payload.aiMessage);
            state.messages = [
                ...state.messages,
                action.payload.userMessage,
                action.payload.aiMessage,
            ];
        },
        clearThread(state) {
            state.currentThread = null;
            state.messages = [];
        },
    },
});

export const { setThread, setMessages, pushMessages, clearThread } =
    threadSlice.actions;
export default threadSlice.reducer;
