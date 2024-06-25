import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    target: {
        type: null,
        arrIndex: null,
        nameIndex: null,
    },
    isEdit: false,
};

const aiMessageEditSlice = createSlice({
    name: 'aiMessageEditSlice',
    initialState: initialState,
    reducers: {
        setIsEdit(state, action) {
            state.isEdit = true;
            state.target.type = action.payload.type;
            state.target.arrIndex = action.payload.arrIndex;
            state.target.nameIndex = action.payload.nameIndex;
        },
        clearIsEdit(state) {
            state.target.type = null;
            state.target.arrIndex = null;
            state.target.nameIndex = null;
            state.isEdit = false;
        },
    },
});

export const { setIsEdit, clearIsEdit } = aiMessageEditSlice.actions;
export default aiMessageEditSlice.reducer;
