import { configureStore } from '@reduxjs/toolkit';
import exerciesReducer from './slices/Exercies';

export const store = configureStore({
  reducer: {
    exercies: exerciesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
