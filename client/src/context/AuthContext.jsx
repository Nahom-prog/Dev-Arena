import { useState, useEffect, useCallback } from 'react';
import { authApi } from '../services/api';
import { AuthContext } from './auth-context-base';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('quiz_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('quiz_token'));
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('quiz_token');
    localStorage.removeItem('quiz_user');
  }, []);

  const login = async (email, password) => {
    const res = await authApi.login({ email, password });
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem('quiz_token', res.token);
    localStorage.setItem('quiz_user', JSON.stringify(res.user));
    return res.user;
  };

  const register = async (name, email, password, role) => {
    const res = await authApi.register({ name, email, password, role });
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem('quiz_token', res.token);
    localStorage.setItem('quiz_user', JSON.stringify(res.user));
    return res.user;
  };

  const refreshUser = useCallback(async () => {
    const storedToken = localStorage.getItem('quiz_token');
    if (storedToken) {
      try {
        const profile = await authApi.getMe();
        setUser(profile);
        localStorage.setItem('quiz_user', JSON.stringify(profile));
        return profile;
      } catch (err) {
        console.error('Failed to refresh user profile', err);
      }
    }
    return null;
  }, []);

  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem('quiz_token');
      if (storedToken) {
        try {
          const profile = await authApi.getMe();
          setUser(profile);
          localStorage.setItem('quiz_user', JSON.stringify(profile));
        } catch (err) {
          console.error('Session expired or invalid token', err);
          logout();
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, [logout]);

  const canCreateQuiz =
    !!user &&
    ((user.level || 1) >= 3 ||
      (user.quizzesTaken || 0) >= 3 ||
      user.role === 'admin' ||
      user.role === 'teacher' ||
      user.canCreateQuiz);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        refreshUser,
        isAuthenticated: !!token && !!user,
        canCreateQuiz,
        isTeacher: user?.role === 'teacher' || user?.role === 'admin',
        isStudent: user?.role === 'student' || user?.role === 'developer',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

