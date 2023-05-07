import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken } from '../api/authApi';

interface AuthContextData {
  isAuthenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // const token = localStorage.getItem('authToken');
    
    // if (token) {
    //   setAuthenticated(true);
    // }

    const token = getToken();

    if (token) {
      setAuthenticated(true);
    }

  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};