import { createContext } from "react";

export interface UserMovieGroup {
  name: string;
  groupId: string;
}
interface AuthContextProps {
  token: string | null;
  setToken: (state: string | null) => void;
  user: string | null;
  setUser: (state: string | null) => void;
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
