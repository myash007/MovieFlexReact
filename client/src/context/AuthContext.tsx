import { createContext } from 'react';

export type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};
export type UserContextType = {
  userRole: string;
  username: string;
  userId: string;
  setData: (data: any) => void;
};
export const AuthContext = createContext<AuthContextType | null>(null);
export const UserContext = createContext<UserContextType | null>(null);
