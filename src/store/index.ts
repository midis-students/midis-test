import { configureStore } from '@reduxjs/toolkit';
import exercisesReducer from './slices/Exercies';
import settingsReducer from './slices/Settings';
import { listenerMiddleware } from '@/store/listenerMiddleware';


export const store = configureStore({
  reducer: {
    exercises: exercisesReducer,
    settings: settingsReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
