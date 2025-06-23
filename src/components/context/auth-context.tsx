"use client";

import { getUserProfile } from "@/app/api/user/action";
import { UserProfile } from "@/features/user/models/response";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: UserProfile | null;
  isAuthenticated: boolean;
  logout: () => void;
  setAuthenticated: (value: boolean) => void; // Optional setter for testing purposes
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  logout: () => {},
  setAuthenticated: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await getUserProfile();

      if (response.isSuccess && response.value) {
        setUser(response.value);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      const response = await fetch("/api/auth", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsAuthenticated(false);
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const setAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, logout, setAuthenticated, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
