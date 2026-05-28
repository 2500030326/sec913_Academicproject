import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'newsphere_auth';

const demoUsers = {
  admin: {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    fullname: 'NewsSphere Admin',
    token: 'demo-admin-jwt-token',
  },
  user: {
    username: 'user',
    password: 'user123',
    role: 'user',
    fullname: 'Alex Reader',
    token: 'demo-user-jwt-token',
  },
};

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSession(JSON.parse(saved));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = ({ username, password, role, remember }) => {
    const account = demoUsers[role];

    if (!account || account.username !== username.trim() || account.password !== password) {
      return { ok: false, message: 'Invalid username, password, or role.' };
    }

    const nextSession = {
      username: account.username,
      fullname: account.fullname,
      role: account.role,
      token: account.token,
      remember: Boolean(remember),
      loginAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
    localStorage.setItem('newsphere_token', account.token);
    setSession(nextSession);
    return { ok: true, role: account.role };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('newsphere_token');
    setSession(null);
  };

  const value = useMemo(
    () => ({
      user: session,
      loading,
      login,
      logout,
      isAuthenticated: Boolean(session),
      isAdmin: session?.role === 'admin',
      isUser: session?.role === 'user',
    }),
    [session, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
