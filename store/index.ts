import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './todos/todoSlice';

const store = configureStore({
  reducer: {
    [todoSlice.name]: todoSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
