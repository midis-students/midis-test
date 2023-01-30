import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import exercisesReducer from './slices/Exercies';
import settingsReducer from './slices/Settings';
import authReducer from './slices/Auth';
import userReducer from './slices/User';
import taskReducer from './slices/Task';
import { listenerMiddleware } from '@/store/listenerMiddleware';
import { Services } from '@/lib/Services';

export const store = configureStore({
  reducer: {
    exercises: exercisesReducer,
    settings: settingsReducer,
    auth: authReducer,
    user: userReducer,
    task: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),
});

window.api = new Services(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

declare global {
  interface Window {
    api: Services;
  }
}
