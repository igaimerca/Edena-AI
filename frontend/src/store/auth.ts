import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface AuthState {
  user: {
    uid: string
    email: string
    displayName: string
    backendId?: string // ✅ must be set after login
  } | null
  setUser: (user: any | null) => void
  logout: () => void
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
