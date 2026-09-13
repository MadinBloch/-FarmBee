import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { User } from '@/types';
import {
  getCurrentUser,
  login as storageLogin,
  logout as storageLogout,
  initializeStorage,
} from '@/utils/storage';

interface AuthContextType {
  user: User | null;
  login: (mobile: string, password: string) => User | null;
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    initializeStorage();
    setUser(getCurrentUser());
  }, []);

  const login = useCallback((mobile: string, password: string) => {
    const loggedIn = storageLogin(mobile, password);
    if (loggedIn) {
      setUser(loggedIn);
      return loggedIn;
    }
    return null;
  }, []);

  const logout = useCallback(() => {
    storageLogout();
    setUser(null);
  }, []);

  const refreshUser = useCallback(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
