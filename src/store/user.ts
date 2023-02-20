import { create } from 'zustand';
import { Profile, Roles } from '@/lib/api/type';

type UserState = {
  current: Profile | null;

  isAdmin: () => boolean;
};

export const useUser = create<UserState>((set, get) => ({
  current: null,
  isAdmin: () => {
    const current = get().current;
    if (!current) return false;
    return [Roles.Admin, Roles.Teacher].includes(current.role);
  },
}));
