import { create } from 'zustand';
import { User } from './types';

interface AuthState {
  user?: User;
  setUser: (user: User) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: undefined,
  setUser(user) {
    set({ user });
  },
}));

export default useAuthStore
