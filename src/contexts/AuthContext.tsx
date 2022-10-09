import React, { useContext, createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage"

const AuthContext = createContext<any>({});

export function useAuth() {
  return useContext(AuthContext);
}

type authType = {
  email: string,
  password: string,
  accessToken: string
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] =  useLocalStorage("Token", "");

  function logOut() {
    setAuth(undefined)
  }

  const value = {
    auth,
    setAuth,
    logOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
