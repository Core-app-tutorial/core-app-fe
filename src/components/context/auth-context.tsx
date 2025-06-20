"use client";

import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  logout: () => void;
  setAuthenticated: (value: boolean) => void; // Optional setter for testing purposes
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  logout: () => {},
  setAuthenticated: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();

          console.log("Authentication check response:", data);

          setIsAuthenticated(data.success);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
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
    <AuthContext.Provider value={{ isAuthenticated, logout, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
