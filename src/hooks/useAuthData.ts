import { useCallback } from "react";


const AUTH_DATA_KEY = "authData";

export type AuthData = {
  authToken: string;
  userId: string;
}

export const useAuthData = () => {
  const getAuthData: () => AuthData | null = useCallback(() => {
    const rawData = localStorage.getItem(AUTH_DATA_KEY) || sessionStorage.getItem(AUTH_DATA_KEY);
    return rawData ? JSON.parse(rawData) : null
  }, []);

  const saveAuthData = useCallback(
    (authToken: string, userId: string, rememberMe: boolean = false) => {

    const authData: AuthData = { authToken, userId }; 
    const stringifiedAuthData = JSON.stringify(authData);

    if (rememberMe) {
      localStorage.setItem(AUTH_DATA_KEY, stringifiedAuthData);
    } else {
      sessionStorage.setItem(AUTH_DATA_KEY, stringifiedAuthData);
    }
  }, []);

  const clearAuthData = useCallback(() => {
    localStorage.removeItem(AUTH_DATA_KEY);
    sessionStorage.removeItem(AUTH_DATA_KEY);
  }, []);

  return { getAuthData, saveAuthData, clearAuthData };
}
