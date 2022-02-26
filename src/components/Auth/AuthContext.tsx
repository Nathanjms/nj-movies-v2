import { createContext } from "react";

interface AuthContextProps {
  token: string | null;
  setToken: (state: string) => void;
}

const AuthContextDefaults = {
  token: null,
  setToken: () => {},
};

export const AuthContext = createContext<AuthContextProps>(AuthContextDefaults);
