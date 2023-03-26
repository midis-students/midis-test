import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  token: string | undefined;
};

export const useAuth = create<AuthState>()(
  persist(
    (_set) => ({
      token: undefined,
    }),
    {
      name: 'authorization',
    }
  )
);

export const useIsAuth = () => Boolean(useAuth((select) => select.token));
