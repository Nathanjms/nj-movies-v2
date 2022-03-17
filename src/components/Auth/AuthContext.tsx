import { createContext, useContext } from "react";

export interface UserMovieGroup {
  name: string;
  groupId: string;
}

export interface User {
  name: string;
  id: number;
}
interface AuthContextProps {
  token: string | null;
  setToken: (state: string | null) => void;
  user: User | null;
  setUser: (state: User | null) => void;
  userMovieGroup: UserMovieGroup | null;
  setUserMovieGroup: (state: UserMovieGroup | null) => void;
}

const AuthContextDefaults = {
  token: null,
  setToken: () => {},
  user: null,
  setUser: () => {},
  userMovieGroup: null,
  setUserMovieGroup: () => {},
};

export const AuthContext = createContext<AuthContextProps>(AuthContextDefaults);

export const useAuth = () => {
  return useContext(AuthContext);
}