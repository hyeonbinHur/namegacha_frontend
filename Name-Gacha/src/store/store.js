import { configureStore } from '@reduxjs/toolkit';
import threadReducer from './threadSlice';
import contextMenuReducer from './contextMenuSlice';
import detailPageReducer from './detailPageSlice';
import errorReducer from './errorSlice';

export const store = configureStore({
    reducer: {
        errorSlice: errorReducer,
        currentThread: threadReducer,
        currentContextMenu: contextMenuReducer,
        detailPageSlice: detailPageReducer,
    },
});
// export default store;
