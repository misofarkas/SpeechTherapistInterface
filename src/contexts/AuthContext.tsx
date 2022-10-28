import React, { useContext, createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext<any>({});

export function useAuth() {
  return useContext(AuthContext);
}



export function AuthProvider({ children }: { children: React.ReactNode }) {
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
