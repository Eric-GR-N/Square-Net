import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { User } from 'oidc-client';
import userManager from '../../../auth/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const updateAuthState = () => {
    userManager.getUser().then((currentUser) => {
      if (currentUser && !currentUser.expired) {
        setIsAuthenticated(true);
        setUser(currentUser);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
  };

  useEffect(() => {
    // Setting up the event listeners
    userManager.events.addUserLoaded(updateAuthState);
    userManager.events.addUserUnloaded(updateAuthState);

    // Initial load
    updateAuthState();

    // Cleanup by removing the event listeners when the component unmounts.
    return () => {
      userManager.events.removeUserLoaded(updateAuthState);
      userManager.events.removeUserUnloaded(updateAuthState);
    };
  }, []);

  const login = () => {
    userManager.signinRedirect();
  };

  const logout = () => {
    userManager.signoutRedirect();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
