import axios from "axios";

export const baseURL = process.env.REACT_APP_API_URL || "http://localhost:3002";

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
