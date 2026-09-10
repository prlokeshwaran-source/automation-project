import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (token && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (err) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsAuthenticated(false);
          setUser(null);
        }
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password, rememberMe = false) => {
    try {
      const response = await authService.login(email, password);
      const { token, user: userData } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }

      setUser(userData);
      setIsAuthenticated(true);
      setError(null);

      return { success: true, user: userData };
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      return { success: false, error: err.response?.data?.error || 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      // Continue with local logout even if API fails
    }

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await authService.updateProfile(profileData);
      const updatedUser = response.data.user;

      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      return { success: true, user: updatedUser };
    } catch (err) {
      setError(err.response?.data?.error || 'Update failed');
      return { success: false, error: err.response?.data?.error || 'Update failed' };
    }
  };

  const updatePassword = async (currentPassword, newPassword) => {
    try {
      const response = await authService.updatePassword(currentPassword, newPassword);
      const { token, user: userData } = response.data;

      if (token) {
        localStorage.setItem('token', token);
      }

      return { success: true, user: userData };
    } catch (err) {
      setError(err.response?.data?.error || 'Password update failed');
      return { success: false, error: err.response?.data?.error || 'Password update failed' };
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    updateProfile,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};