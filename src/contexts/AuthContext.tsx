"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

// Define user type
export type User = {
  id: string;
  name: string;
  avatar?: string;
  createdAt: string;
};

// Define auth context type
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (name: string) => Promise<User>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
};

// Create context with default values
const AuthContext = createContext<AuthContextType | null>(null);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem("studyverse_user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Failed to load user from localStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("studyverse_user", JSON.stringify(user));
    }
  }, [user]);

  // Login function - creates a new user or loads existing one
  const login = async (name: string): Promise<User> => {
    // In a real app, this would call an API
    const newUser: User = {
      id: uuidv4(),
      name,
      createdAt: new Date().toISOString(),
    };
    
    setUser(newUser);
    return newUser;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("studyverse_user");
    setUser(null);
  };

  // Update user function
  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
