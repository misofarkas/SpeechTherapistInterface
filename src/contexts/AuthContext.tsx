import React, { useContext, createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext<any>({});

// Custom hook for consuming the context value
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Initialize the auth and user states using the useLocalStorage hook
  const [auth, setAuth] = useLocalStorage("Token", "");
  const [user, setUser] = useLocalStorage("User", "");

  function logOut() {
    setAuth(undefined);
    setUser(undefined)
  }

  const value = {
    auth,
    setAuth,
    user,
    setUser,
    logOut,
  };

  // Return a Provider component with the context value set to the value object
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
