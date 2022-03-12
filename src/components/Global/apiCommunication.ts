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

export interface APIMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids?: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
