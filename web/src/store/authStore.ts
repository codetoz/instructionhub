import { create } from 'zustand';
import { getAuthToken, initAuth, login, logout } from '../services/auth';

interface AuthState {
  user: any;
  initialize: () => Promise<void>;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  initialize: async () => {
    console.log('initialize');
    try {
      const user = await initAuth();
      set({ user });
      console.log({ user, token: getAuthToken() });
    } catch (e) {
      console.log('init error', { e });
    }
  },
  login: () => {
    login();
  },
  logout: () => {
    logout();
    set({ user: null });
  },
}));
