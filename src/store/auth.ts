import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface AuthState {
  user: any | null;
  setUser: (user: any | null) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    } as PersistOptions<AuthState>
  )
);

export default useAuthStore;
