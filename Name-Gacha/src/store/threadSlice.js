import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    globalThreadType: 'variable',
    currentVariableThread: null,
    currentFunctionthread: null,
    functionMessages: [],
    variableMessages: [],

    /**아래 두개 지우고, 새로운함수 만들어서, 글로벌 스레드 타입 결정
     *
     * 글로벌 스레드 타입으로, 추가할 identifier type 함수인지 변수인지까지 구분 가능
     * 챗 리절트 컴포넌트에서 변수 or 함수 버튼 누르는걸로 global thread 타입 결정 가능
     * 글로벌 스레드 타입에따라, 어떤 쓰레드 사용할지, 어떤 메세지 배열 사용할지 결정하고,
     * 챗 리절트에 보여주기
     *
     */
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
