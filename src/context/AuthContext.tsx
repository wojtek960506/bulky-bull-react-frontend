import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuthData } from "../hooks/useAuthData";

type AuthContextType = {
  authToken: string | null;
  userId: string | null;
  login: (authToken: string, userId: string, rememberMe?: boolean) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { getAuthData, saveAuthData, clearAuthData } = useAuthData();
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedAuthData = getAuthData();
    if (storedAuthData) {
      setAuthToken(storedAuthData.authToken);
      setUserId(storedAuthData.userId);
    }
  }, [getAuthData]);

  const login = (newAuthToken: string, newUserId: string, rememberMe: boolean = false) => {
    saveAuthData(newAuthToken, newUserId, rememberMe);
    setAuthToken(newAuthToken);
    setUserId(newUserId);
  };

  const logout = () => {
    clearAuthData();
    setAuthToken(null);
    setUserId(null);
  }

  return (
    <AuthContext.Provider value={{
      authToken,
      userId,
      login,
      logout,
      isAuthenticated: !!authToken && !!userId
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("'useAuth' must be used within an 'AuthProvider'");
  return authContext;
};
