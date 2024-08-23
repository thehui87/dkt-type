import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counterSlice';
import toolbarReducer from './toolbar/toolbar.slice';
import typingStatsReducer from './toolbar/typingstats.slice';

export const store = configureStore({
    reducer: {
        // counter: counterReducer,
        toolbar: toolbarReducer,
        typingstats: typingStatsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
