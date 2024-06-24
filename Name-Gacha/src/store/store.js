import { configureStore } from '@reduxjs/toolkit';
import threadReducer from './threadSlice';
import contextMenuReducer from './contextMenuSlice';
import detailPageReducer from './detailPageSlice';
import errorReducer from './errorSlice';
import identifierReducer from './identifiyerModal';

export const store = configureStore({
    reducer: {
        errorSlice: errorReducer,
        currentThread: threadReducer,
        currentContextMenu: contextMenuReducer,
        detailPageSlice: detailPageReducer,
        identifierModalSlice: identifierReducer,
    },
});
// export default store;
