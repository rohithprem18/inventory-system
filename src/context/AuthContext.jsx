import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser, saveCurrentUser, clearCurrentUser } from "../utils/auth.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const existing = getCurrentUser();
    setUser(existing);
    setLoading(false);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login: (nextUser) => {
        saveCurrentUser(nextUser);
        setUser(nextUser);
      },
      logout: () => {
        clearCurrentUser();
        setUser(null);
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
