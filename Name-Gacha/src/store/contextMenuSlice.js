import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    target: {
        id: null,
        name: null,
    },
    isOpen: false,
    isAdd: false,
    isAddType: null,
    isEdit: false,
};

const contextMenuSlice = createSlice({
    name: 'currentContextMenu',
    initialState: initialState,
    reducers: {
        openContextMenu(state, action) {
            state.target.name = action.payload.name;
            state.target.id = action.payload.id;
            state.isOpen = true;
            console.log('context menu open');
        },
        closeContextMenu(state) {
            if (!state.isEdit) {
                state.target.name = null;
                state.target.id = null;
            }
            state.isOpen = false;
            state.isAdd = false;
            state.isAddType = null;
        },
        clearContextMenu(state) {
            state.target.name = null;
            state.target.id = null;
            state.isOpen = false;
            state.isAdd = false;
            state.isAddType = null;
        },

        addChild(state, action) {
            state.isAdd = true;
            state.isAddType = action.payload.addType;
        },
        editItSelf(state, action) {
            console.log('edit start');
            state.target.name = action.payload.name;
            state.target.id = action.payload.id;
            state.isEdit = true;
        },
        // deleteItSelf(){

        // }
    },
});

export const {
    openContextMenu,
    closeContextMenu,
    addChild,
    editItSelf,
    clearContextMenu,
} = contextMenuSlice.actions;
export default contextMenuSlice.reducer;
