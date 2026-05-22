"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load active session from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const activeUser = localStorage.getItem('auth_user');
      if (activeUser) {
        setUser(JSON.parse(activeUser));
      }
      setLoading(false);
    }
  }, []);

  // Password validation helper
  const validatePassword = (password) => {
    if (password.length < 6) return 'Password must be at least 6 characters long.';
    if (!/[A-Z]/.test(password)) return 'Password must include at least one uppercase letter.';
    if (!/[a-z]/.test(password)) return 'Password must include at least one lowercase letter.';
    return null;
  };

  // Register function
  const registerUser = async (name, email, photoUrl, password) => {
    const errorMsg = validatePassword(password);
    if (errorMsg) {
      toast.error(errorMsg);
      return false;
    }

    try {
      const users = JSON.parse(localStorage.getItem('auth_users_db') || '[]');
      const userExists = users.some(u => u.email === email);
      if (userExists) {
        toast.error("An account with this email already exists.");
        return false;
      }

      const newUser = { name, email, photoUrl, password };
      users.push(newUser);
      localStorage.setItem('auth_users_db', JSON.stringify(users));

      // Auto login after successful registration
      const sessionUser = { name, email, photoUrl };
      setUser(sessionUser);
      localStorage.setItem('auth_user', JSON.stringify(sessionUser));

      toast.success("Account created successfully! 🎉");
      return true;
    } catch (err) {
      toast.error("Registration failed. Please try again.");
      return false;
    }
  };

  // Login function
  const loginUser = async (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('auth_users_db') || '[]');
      const foundUser = users.find(u => u.email === email && u.password === password);

      if (!foundUser) {
        toast.error("Invalid email or password.");
        return false;
      }

      const sessionUser = { 
        name: foundUser.name, 
        email: foundUser.email, 
        photoUrl: foundUser.photoUrl 
      };
      setUser(sessionUser);
      localStorage.setItem('auth_user', JSON.stringify(sessionUser));

      toast.success("Logged in successfully! Welcome back.");
      return true;
    } catch (err) {
      toast.error("Login failed. Please try again.");
      return false;
    }
  };

  // Google Login Simulation
  const loginWithGoogle = async () => {
    try {
      const googleUser = {
        name: "Google Explorer",
        email: "google.explorer@gmail.com",
        photoUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
        isGoogle: true
      };

      setUser(googleUser);
      localStorage.setItem('auth_user', JSON.stringify(googleUser));
      toast.success("Signed in with Google! 🚀");
      return true;
    } catch (err) {
      toast.error("Google authentication failed.");
      return false;
    }
  };

  // Logout function
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    toast.info("Logged out successfully.");
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, registerUser, loginUser, loginWithGoogle, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
