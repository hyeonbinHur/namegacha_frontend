import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    globalThreadType: 'variable',
    currentVariableThread: null,
    currentFunctionthread: null,
    functionMessages: [],
    variableMessages: [],
};
const threadSlice = createSlice({
    name: 'currentThread',
    initialState: initialState,
    reducers: {
        setThread(state, action) {
            if (state.globalThreadType === 'variable') {
                console.log('variable thread set');
                state.currentVariableThread = action.payload.newThread;
            } else {
                console.log('function thread set');
                state.currentFunctionthread = action.payload.newThread;
            }
        },
        setMessages(state, action) {
            state.messages = action.payload.messages;
        },
        pushMessages(state, action) {
            const newAiMessage = JSON.parse(
                action.payload.aiMessage[0].text.value
            );
            const newUserMessage = action.payload.userMessage[0].text.value;
            console.log(newAiMessage);
            console.log(newUserMessage);
            if (state.globalThreadType === 'variable') {
                state.variableMessages = [
                    ...state.variableMessages,
                    newUserMessage,
                    newAiMessage,
                ];
            } else {
                state.functionMessages = [
                    ...state.functionMessages,
                    newUserMessage,
                    newAiMessage,
                ];
            }
        },
        clearThread(state) {
            state.globalThreadType = 'variable';
            state.currentVariableThread = null;
            state.currentFunctionthread = null;
            state.functionMessages = [];
            state.variableMessages = [];
        },
        chageGlobalThreadType(state, action) {
            if (action.payload.globaltype === 'variable') {
                state.globalThreadType = 'variable';
            } else if (action.payload.globaltype === 'function') {
                state.globalThreadType = 'function';
            }
        },
        editAiMessageExp(state, action) {
            const arrayIndex = action.payload.arrayIndex;
            if (state.globalThreadType === 'variable') {
                let newAiMeesage = [...state.variableMessages];
                newAiMeesage[arrayIndex].Exp = action.payload.newExp;
                state.variableMessages = newAiMeesage;
            } else {
                let newAiMeesage = [...state.functionMessages];
                newAiMeesage[arrayIndex].exp = action.payload.newExp;
                state.functionMessages = newAiMeesage;
            }
        },
        editAiMessageName(state, action) {
            const arrayIndex = action.payload.arrayIndex;
            const nameIndex = action.payload.nameIndex;
            console.log(arrayIndex);
            console.log(nameIndex);
            if (state.globalThreadType === 'variable') {
                let newAiMeesage = [...state.variableMessages];

                newAiMeesage[arrayIndex].Names[nameIndex] =
                    action.payload.newName;
                state.variableMessages = newAiMeesage;
            } else {
                let newAiMeesage = [...state.functionMessages];
                newAiMeesage[arrayIndex].Names[nameIndex] =
                    action.payload.newName;
                state.functionMessages = newAiMeesage;
            }
        },
    },
});

export const {
    setThread,
    setMessages,
    pushMessages,
    clearThread,
    chageGlobalThreadType,
    editAiMessageExp,
    editAiMessageName,
} = threadSlice.actions;
export default threadSlice.reducer;
