import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    target: {
        id: null,
        name: null,
    },
    isOpen: false,
    isAdd: false,
    addType: null,
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
            state.target.name = null;
            state.target.id = null;
            state.isOpen = false;
            state.isAdd = false;
            state.addType = null;
            state.isEdit = false;
        },

        clearContextMenu(state) {
            state.target.name = null;
            state.target.id = null;
            state.isOpen = false;
            state.isAdd = false;
            state.addType = null;
            state.isEdit = false;
        },

        addChild(state, action) {
            state.target.name = action.payload.name;
            state.target.id = action.payload.id;
            state.isAdd = true;
            state.addType = action.payload.addType;
            state.isOpen = false;
        },
        editItSelf(state, action) {
            console.log('edit start');
            state.target.name = action.payload.name;
            state.target.id = action.payload.id;
            state.isEdit = true;
            state.isOpen = false;
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
