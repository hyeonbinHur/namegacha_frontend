import { configureStore } from '@reduxjs/toolkit';
import threadReducer from './threadSlice';
import contextMenuReducer from './contextMenuSlice';
import detailPageReducer from './detailPageSlice';

export const store = configureStore({
    reducer: {
        currentThread: threadReducer,
        currentContextMenu: contextMenuReducer,
        detailPageSlice: detailPageReducer,
    },
});
// export default store;
