import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counterSlice';
import toolbarReducer from './toolbar/toolbar.slice';

export const store = configureStore({
    reducer: {
        // counter: counterReducer,
        toolbar: toolbarReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
