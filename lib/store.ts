import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: {
    id: number;
    name: string;
    email: string;
    credits: number;
    role: string;
  } | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: UserState['user'], token: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'user-storage', // Persist in localStorage
    }
  )
);
