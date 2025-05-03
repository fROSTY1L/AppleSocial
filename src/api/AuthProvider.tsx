import { ReactNode, useState } from 'react';
import { AuthContext } from '../features/auth/types';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const setAuthToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const clearAuth = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, setAuthToken, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};