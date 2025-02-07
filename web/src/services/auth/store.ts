import { create } from 'zustand';
import { initAuth, login, logout } from '.';

interface AuthState {
  user?: {
    id: string;
    scope: string;
    emailVerified: boolean;
    fullName: string;
    username: string;
    name: string;
    lastName: string;
    email: string;
  };
  isAuthenticating: boolean;
  isSigningIn: boolean;
  isSigningOut: boolean;
  initialize: () => Promise<void>;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticating: false,
  isSigningIn: false,
  isSigningOut: false,
  initialize: async () => {
    set({ isAuthenticating: true });
    try {
      const user = await initAuth();
      if (user)
        set({
          user: {
            fullName: user.name,
            username: user.preferred_username,
            id: user.sub,
            scope: user.scope,
            lastName: user.family_name,
            name: user.given_name,
            email: user.email,
            emailVerified: user.email_verified
          }
        });
    } catch (e) {
      // show toast that authentication failed, probably because of network problem
    } finally {
      set({ isAuthenticating: false });
    }
  },
  login: () => {
    set({ isSigningIn: true });
    login();
  },
  logout: () => {
    set({ isSigningOut: true });
    logout().then(() => set({ user: undefined, isSigningOut: false }));
  }
}));