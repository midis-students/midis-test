import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Hosts from '@/config/hosts';

type Settings = {
  apiHost: string;
  forceJSONEditor: boolean;
  viewRawTask: boolean;
};

type SettingStore = Settings & {
  update: <T extends keyof Settings>(key: T, value: Settings[T]) => void;
};

export const useSettings = create<SettingStore>()(
  persist(
    (set) => ({
      apiHost: Hosts.primary,
      forceJSONEditor: false,
      viewRawTask: false,
      update: (key, value) => set({ [key]: value }),
    }),
    {
      name: 'app-settings',
    }
  )
);
