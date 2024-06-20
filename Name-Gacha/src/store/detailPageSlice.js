import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    target: {
        type: null,
        id: null,
        name: null,
    },
    isAdd: false,
    isEdit: false,
};

const detailPageSlice = createSlice({
    name: 'detailPageSlice',
    initialState: initialState,
    reducers: {
        setTaget(state, action) {
            state.target.type = action.payload.type;
            state.target.id = action.payload.id;
            state.target.name = action.payload.name;
        },
        setIsAdd(state) {
            state.isAdd = true;
        },
        setIsEdit(state) {
            state.isEdit = true;
        },
        setClear(state) {
            state.target.type = null;
            state.target.id = null;
            state.target.name = null;
            state.isAdd = false;
            state.isEdit = false;
        },
    },
});
export const { setIsAdd, setIsEdit, setTaget, setClear } =
    detailPageSlice.actions;
export default detailPageSlice.reducer;
