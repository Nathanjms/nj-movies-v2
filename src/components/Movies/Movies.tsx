import React, { ReactElement, useEffect, useState, useCallback } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { FaPeopleArrows, FaPlusSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import {
  AuthenticatedRequest,
  posterSizes,
  routes,
  tmdbImageUrl,
} from "../../helpers/apiCommunication";
import { perPage } from "../../helpers/movies";
import MovieFormModal from "./MovieFormModal";
import "../../css/Movies.css";
import { AxiosResponse } from "axios";

interface MoviesProps {
  watched: boolean;
}

interface MovieListProps {
  movies: Movie[];
}
interface Movie {
  id: number;
  title: string;
  tmdb_id: string;
  poster_path: string;
  backdrop_path: string;
  rating: number;
  seen: boolean;
  group_id: number | null;
  created_by: number;
  created_at: string;
}

const MovieList: React.FC<MovieListProps> = ({ movies }): ReactElement => {
  if (movies.length === 0) {
    return <p>No Movies!</p>;
  }
  return (
    <>
      {movies.map((movie) => {
        return (
          <Col lg={3} sm={6} key={movie.id} className="pt-1 pb-1 d-flex">
            <div className="movieContainer">
              <div className="movieCard">
                <div className="overlay hover-required">
                  <div className="p-3">
                    <h4>{movie.title}</h4>
                    <div className="overlayBody">
                      <p>
                        Added on{" "}
                        {new Date(movie.created_at).toLocaleDateString()}
                      </p>
                      <Button style={{ opacity: 1 }}>Watched it!</Button>
                    </div>
                  </div>
                </div>
                <img
                  className="backdropImg"
                  src={
                    movie.backdrop_path
                      ? tmdbImageUrl + posterSizes.lg + movie.backdrop_path
                      : "/backdrop404.svg"
                  }
                  alt={movie.title + " poster"}
                  loading="lazy"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "/tmdbLogo.svg";
                  }}
                />
                <div className="movieTitle p-2">
                  <h4>{movie.title}</h4>
                  <div className="overlayBody no-hover">
                    <p>
                      Added on {new Date(movie.created_at).toLocaleDateString()}
                    </p>
                    <Button style={{ opacity: 1 }}>Watched it!</Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        );
      })}
    </>
  );
};

export const Movies: React.FC<MoviesProps> = ({ watched }): ReactElement => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);

  const buildMovies = useCallback(
    async (queryUrl: string | null = null) => {
      if (!token) {
        return;
      }
      try {
        let result: AxiosResponse<any, any>;
        if (queryUrl) {
          // Add to existing list if not page 1
          result = await AuthenticatedRequest(token).get(queryUrl);
        } else {
          // Get page 1 movies
          result = await AuthenticatedRequest(token).get(routes.movies.GET, {
            params: {
              page: 1,
              perPage: perPage(),
              // groupId: 1, // TODO: Add back in once group functionality has been developed
              watched: watched, //TODO: Make this dynamic
            },
          });
        }
        if (!queryUrl) {
          setMovies(result.data.movies);
        } else {
          setMovies((oldMovies) => {
            return oldMovies.concat(result.data.movies);
          });
        }
        setNextPageUrl(result.data.nextPageUrl);
      } catch (error: any) {
        if (error?.response?.status === 401) {
          localStorage.clear();
          navigate("/login", {
            state: {
              LogInMessage: {
                message: "Session has expired, please login again.",
                type: "error",
              },
            },
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
      }
    },
    [token, navigate]
  );

  // Build movies on load
  useEffect(() => {
    setError("");
    setLoading(true);
    buildMovies(null);
    setLoading(false);
  }, [buildMovies]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <React.Fragment>
      <MovieFormModal
        setShowCreateModal={setShowCreateModal}
        show={showCreateModal}
        buildMovies={buildMovies}
      />
      <Container className="section">
        <Row className="pt-1">
          <Col xs={12}>{error && <Alert variant="danger">{error}</Alert>}</Col>
          <Col xs={12}>
            <div className="d-flex justify-content-between">
              <Button
                className="mainBtn"
                onClick={() => setShowCreateModal(true)}
              >
                <FaPlusSquare /> Add New Movie
              </Button>
              <OverlayTrigger
                overlay={<Tooltip id="tooltip-disabled">Coming Soon!</Tooltip>}
              >
                <span className="d-inline-block">
                  <Button
                    className="mainBtn"
                    onClick={() => {
                      console.log("Group Dialogue");
                    }}
                    disabled={true}
                  >
                    <FaPeopleArrows /> Change Group
                  </Button>
                </span>
              </OverlayTrigger>
            </div>
          </Col>
        </Row>
        <Row className="pt-3">
          <MovieList movies={movies} />
        </Row>
        {nextPageUrl && (
          <Row className="pt-3">
            <Col xs={12}>
              <div className="text-center">
                <Button
                  className="mainBtn"
                  onClick={() => buildMovies(nextPageUrl)}
                >
                  Show More
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </React.Fragment>
  );
};

export default Movies;
