import axios from "axios";

export const baseURL = process.env.REACT_APP_API_URL || "http://localhost:3002";

export const routes = {
  auth: {
    SIGN_IN: "/api/auth/signin",
    SIGN_UP: "/api/auth/register",
  },
  movies: {
    GET: "/api/movies",
    CREATE: "/api/movies",
    SHOW: "/api/movies",
    MARK_SEEN: "/api/movies/mark-seen",
    REVIEW: "/api/movies/review",
    REMOVE: "/api/movies",
  },
  tmdb: {
    SEARCH: "/search/movie",
  },
};

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

export const tmdbApiUrl = "https://api.themoviedb.org/3";

export const tmdbImageUrl = "https://image.tmdb.org/t/p/";

export const posterSizes = {
  xxs: "w92",
  xs: "w154",
  sm: "w185",
  md: "w342",
  lg: "w500",
  xl: "w780",
  xxl: "original",
};
