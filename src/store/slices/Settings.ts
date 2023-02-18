import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { startAppListening } from '@/store/listenerMiddleware';
import { LocalStorage } from '@/lib/LocalStorage';

export interface SettingsState {
  apiHost: string;
  forceJsonEditor: boolean;
}

const initialState: SettingsState = Object.assign(
  {
    apiHost:
      process.env.NODE_ENV === 'development'
        ? 'localhost:3000'
        : 'https://midis-test.iky.su',
    forceJsonEditor: false,
  },
  LocalStorage.load('app-settings')
);

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setHost: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        apiHost: action.payload,
      };
    },
    setForceJsonEditor: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        forceJsonEditor: action.payload,
      };
    },
  },
});

export const settingsActions = settingsSlice.actions;

startAppListening({
  predicate: (action) => {
    return action.type.startsWith(settingsSlice.name);
  },
  effect: (action, api) => {
    const { settings } = api.getState();
    LocalStorage.save('app-settings', settings);
  },
});

export default settingsSlice.reducer;
