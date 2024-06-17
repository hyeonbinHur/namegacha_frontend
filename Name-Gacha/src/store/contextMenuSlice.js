import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    target: {
        id: null,
        name: null,
    },
    isOpen: false,
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
            state.target = null;
            state.id = null;
            state.isOpen = false;
            console.log('context menu close');
        },
        // addChild(){

        // },
        // editItSelf(){

        // },
        // deleteItSelf(){

        // }
    },
});

export const { openContextMenu, closeContextMenu } = contextMenuSlice.actions;
export default contextMenuSlice.reducer;
