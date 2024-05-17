'use client'

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from '../axios';
import { useRouter } from 'next/navigation';
import { profile } from 'console';

interface User {
  id: string;
  username: string;
  email: string;
  profile: {
    bio: string;
    avatar: string;
  };
  friends: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  update: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
        try {
          const res = await axios.get('/auth');
          setUser(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    checkLoggedIn();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['x-auth-token'] = res.data.token;
      const userRes = await axios.get('/auth');
      setUser(userRes.data);
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const res = await axios.post('/auth/register', { username, email, password });
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['x-auth-token'] = res.data.token;
      const userRes = await axios.get('/auth');
      setUser(userRes.data);
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  const update = (updateUser: User) => {
    try {
      setUser(updateUser);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, update }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
