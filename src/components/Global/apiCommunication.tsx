import axios from "axios";

export const baseURL = "http://localhost:3002";

export const AuthenticatedRequest = (userToken: string) => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `Bearer ${userToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

export const login = async (email: string, password: string) => {
  return await axios.post(`${baseURL}/api/login`, {
    email: email,
    password: password,
  });
};
