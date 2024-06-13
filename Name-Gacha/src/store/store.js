import { configureStore } from '@reduxjs/toolkit';
import threadReducer from './threadSlice';

export const store = configureStore({
    reducer: {
        currentThread: threadReducer,
    },
});
// export default store;
