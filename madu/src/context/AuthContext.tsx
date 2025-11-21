import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'local' | 'google';
  role?: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
  isLoading: boolean;
  getGoogleAccountHistory: () => Array<{
    email: string;
    name: string;
    avatar: string;
    lastUsed: string;
  }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token and user data on app load
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(userData);
        
        // Set default authorization header for axios
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        
        // Verify token with server
        verifyToken(storedToken);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        logout();
      }
    }
    
    setIsLoading(false);
  }, []);

  // Helper function to get Google account history
  const getGoogleAccountHistory = (): Array<{
    email: string;
    name: string;
    avatar: string;
    lastUsed: string;
  }> => {
    try {
      const stored = localStorage.getItem('google_accounts');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading Google account history:', error);
      return [];
    }
  };

  const verifyToken = async (token: string) => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        const userData = response.data.user;
        setUser(userData);
        // Update localStorage with latest user data (including role)
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        logout();
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      logout();
    }
  };

  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    
    // Store in localStorage
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Store Google account history if user logged in with Google
    if (userData.provider === 'google') {
      const googleAccounts = getGoogleAccountHistory();
      const accountExists = googleAccounts.find(
        (acc) => acc.email === userData.email
      );
      
      if (!accountExists) {
        const newAccount = {
          email: userData.email,
          name: userData.name,
          avatar: userData.avatar || '',
          lastUsed: new Date().toISOString()
        };
        googleAccounts.unshift(newAccount); // Add to beginning
        // Keep only last 5 accounts
        const limitedAccounts = googleAccounts.slice(0, 5);
        localStorage.setItem('google_accounts', JSON.stringify(limitedAccounts));
      } else {
        // Update last used time
        accountExists.lastUsed = new Date().toISOString();
        accountExists.name = userData.name;
        accountExists.avatar = userData.avatar || accountExists.avatar;
        // Move to beginning
        const filtered = googleAccounts.filter(
          (acc) => acc.email !== userData.email
        );
        filtered.unshift(accountExists);
        localStorage.setItem('google_accounts', JSON.stringify(filtered));
      }
    }
    
    // Set default authorization header for axios
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    
    // Remove from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Remove authorization header
    delete axios.defaults.headers.common['Authorization'];
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    // Update localStorage
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const value = {
    user,
    token,
    login,
    logout,
    updateUser,
    isLoading,
    getGoogleAccountHistory
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};