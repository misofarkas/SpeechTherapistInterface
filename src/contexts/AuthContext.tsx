import { useContext, createContext, useState } from "react";

const AuthContext = createContext<any>({});

type Children = {
    children: React.ReactNode;
  };

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: Children) {
  const [currentUser, setCurrentUser] = useState();

  const value = {
    currentUser,
    setCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
