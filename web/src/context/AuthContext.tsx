import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import keycloak from '../keycloak';

interface AuthContextProps {
  user: any;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {}
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    keycloak.init({ onLoad: 'check-sso' }).then((authenticated) => {
      if (authenticated) {
        setUser(keycloak.tokenParsed);
        localStorage.setItem('user', JSON.stringify(keycloak.tokenParsed));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    });
  }, []);

  const login = () => {
    keycloak.login();
  };

  const logout = () => {
    keycloak.logout();
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}