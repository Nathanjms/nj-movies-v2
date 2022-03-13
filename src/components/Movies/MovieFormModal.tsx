import React, { ReactElement, useState } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { useAuth } from "../Auth/AuthContext";
import AsyncSelect from "react-select/async";
import axios from "axios";
import {
  APIMovie,
  AuthenticatedRequest,
  routes,
  tmdbApiUrl,
} from "../../helpers/apiCommunication";
import { useNavigate } from "react-router-dom";

interface Movie {
  title: string;
  tmdbId: string;
  posterPath: string;
  backdropPath: string;
}

interface MovieFormModalProps {
  setShowCreateModal: (show: boolean) => void;
  show: boolean;
}

export default function MovieFormModal({
  setShowCreateModal,
  show,
}: MovieFormModalProps): ReactElement {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token, setUser, setToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    if (!movie) {
      return;
    }
    try {
      const result = await AuthenticatedRequest(token ?? "").post(
        routes.movies.CREATE,
        {
          title: movie.title,
          tmdbId: movie.tmdbId,
          posterPath: movie.posterPath,
          backdropPath: movie.backdropPath,
        }
      );
      if (result?.data?.success) {
        setShowCreateModal(false);
        return;
      }
      setError("Unsuccessful response from server!");
    } catch (error: any) {
      if (error?.response?.status === 401) {
        localStorage.clear();
        setToken(null);
        setUser(null);
        navigate("/login", {
          state: { message: "Session has expired, please login again." },
        });
        return;
      }
      if (error?.response?.data?.message) {
        setError(error.response.data.message);
        return;
      }
      if (error?.message) {
        navigate("/login");
        return;
      }
    } finally {
      setLoading(false);
      setMovie(null);
    }
  };

  const searchApi = async (inputValue: string) => {
    try {
      let request = await axios.get(tmdbApiUrl + routes.tmdb.SEARCH, {
        params: {
          api_key: process.env.REACT_APP_TMDB_API_KEY,
          query: inputValue,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let movies: Movie[];

      movies = request.data.results.map((movie: APIMovie) => {
        return {
          title: movie.title,
          tmdbId: movie.id,
          posterPath: movie.poster_path,
          backdropPath: movie.backdrop_path,
        };
      });
      return movies;
    } catch (error: any) {
      if (error?.response?.status === 401) {
        setError("Cannot access TMDB");
      } else {
        setError("Error connecting to TMDB");
      }
      return [];
    }
  };

  // Load options using API call
  let searchTimeout: NodeJS.Timeout;
  const loadOptions = (
    inputValue: string,
    callback: (movies: Movie[]) => void
  ) => {
    clearTimeout(searchTimeout);

    // Minor validation check
    if (!inputValue.trim().length) {
      callback([]); // Set empty array for movies to return.
      return;
    }

    searchTimeout = setTimeout(async () => {
      callback(await searchApi(inputValue));
    }, 500);
  };

  return (
    <>
      <Modal
        className="movieModal text-start"
        centered={true}
        size="lg"
        show={show}
        onHide={() => setShowCreateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new movie to watch list</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group id="title">
            <Form.Label>What's the Movie Title?</Form.Label>
            <AsyncSelect
              cacheOptions
              loadOptions={loadOptions}
              getOptionLabel={(e) => {
                return e.title;
              }}
              getOptionValue={(e) => {
                return e.tmdbId;
              }}
              placeholder="Enter movie title..."
              isClearable
              backspaceRemovesValue
              onChange={(selectedMovie, a) => {
                setMovie(selectedMovie);
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Close
          </Button>
          <Button
            disabled={loading || !movie}
            variant="primary"
            onClick={handleSubmit}
            type="button"
          >
            {loading ? "Loading..." : "Submit!"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
