import React, { createContext, useContext, useEffect, useState } from "react";

type AuthState = {
  isAuthenticated: boolean;
  role: string | null;
  login: (role: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [role, setRole] = useState<string | null>(() => {
    try {
      return localStorage.getItem("authRole");
    } catch {
      return null;
    }
  });

  const isAuthenticated = !!role && role.length > 0;

  const login = (r: string) => {
    setRole(r);
    try {
      localStorage.setItem("authToken", "token_stub");
      localStorage.setItem("authRole", r);
    } catch {
      // ignore
    }
  };

  const logout = () => {
    setRole(null);
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authRole");
    } catch {
      // ignore
    }
    // optional: reload to clear any transient state
    // window.location.reload();
  };

  useEffect(() => {
    // keep local state consistent if storage changed elsewhere
    const handler = () => {
      try {
        const r = localStorage.getItem("authRole");
        setRole(r);
      } catch {
        setRole(null);
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthContext;
