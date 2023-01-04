import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '../hooks';
import { store as AppStore } from '@/store';
import { startAppListening } from '@/store/listenerMiddleware';
import { LocalStorage } from '@/lib/LocalStorage';

export interface SettingsState {
  apiHost: string;
  requestDebug: boolean;
}

const initialState: SettingsState = Object.assign({
  apiHost: '',
  requestDebug: false,
}, LocalStorage.load('app-settings'));

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
    setRequestDebug: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        requestDebug: action.payload,
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
