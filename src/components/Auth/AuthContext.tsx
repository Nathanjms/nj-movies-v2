import { createContext } from "react";

export interface UserMovieGroup {
  name: string;
  groupId: string;
}
interface AuthContextProps {
  token: string | null;
  setToken: (state: string) => void;
  user: string | null;
  userMovieGroup: UserMovieGroup | null;
  setUserMovieGroup: (state: UserMovieGroup | null) => void;
}

const AuthContextDefaults = {
  token: null,
  setToken: () => {},
  user: null,
  userMovieGroup: null,
  setUserMovieGroup: () => {},
};

export const AuthContext = createContext<AuthContextProps>(AuthContextDefaults);
