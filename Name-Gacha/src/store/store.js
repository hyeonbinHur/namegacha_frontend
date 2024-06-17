import { configureStore } from '@reduxjs/toolkit';
import threadReducer from './threadSlice';
import contextMenuReducer from './contextMenuSlice';

export const store = configureStore({
    reducer: {
        currentThread: threadReducer,
        currentContextMenu: contextMenuReducer,
    },
});
// export default store;
