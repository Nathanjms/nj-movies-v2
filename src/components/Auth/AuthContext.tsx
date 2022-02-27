import { createContext } from "react";

interface AuthContextProps {
  token: string | null;
  setToken: (state: string) => void;
  user: string | null;
}

const AuthContextDefaults = {
  token: null,
  setToken: () => {},
  user: null,
};

export const AuthContext = createContext<AuthContextProps>(AuthContextDefaults);
