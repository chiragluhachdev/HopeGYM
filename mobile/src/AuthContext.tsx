import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { verifyOtp, fetchMe } from './api';

interface Member {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  photo?: string;
  [key: string]: any;
}

interface AuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  member: Member | null;
  token: string | null;
  login: (phone: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({
  isLoading: true,
  isLoggedIn: false,
  member: null,
  token: null,
  login: async () => {},
  logout: async () => {},
  refresh: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [member, setMember] = useState<Member | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const start = Date.now();
      try {
        const stored = await AsyncStorage.getItem('auth_token');
        if (stored) {
          setToken(stored);
          const me = await fetchMe();
          setMember(me);
        }
      } catch {
        await AsyncStorage.removeItem('auth_token');
      } finally {
        const elapsed = Date.now() - start;
        if (elapsed < 1500) {
          await new Promise(r => setTimeout(r, 1500 - elapsed));
        }
        setIsLoading(false);
      }
    })();
  }, []);

  async function login(phone: string, code: string) {
    const data = await verifyOtp(phone, code);
    await AsyncStorage.setItem('auth_token', data.token);
    setToken(data.token);
    setMember(data.member);
  }

  async function logout() {
    await AsyncStorage.removeItem('auth_token');
    setToken(null);
    setMember(null);
  }

  async function refresh() {
    try {
      const me = await fetchMe();
      setMember(me);
    } catch {}
  }

  return (
    <AuthContext.Provider value={{ isLoading, isLoggedIn: !!member, member, token, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
