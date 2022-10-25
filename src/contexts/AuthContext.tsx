import React, { useContext, createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext<any>({});

export function useAuth() {
  return useContext(AuthContext);
}



export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useLocalStorage("Token", "");
  const [userId, setUserId] = useLocalStorage("Id", "");

  function logOut() {
    setAuth(undefined);
    setUserId(undefined)
  }

  const value = {
    auth,
    setAuth,
    userId,
    setUserId,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
