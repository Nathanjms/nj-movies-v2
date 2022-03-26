import React, {
  ReactElement,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { FaPeopleArrows, FaPlusSquare, FaSort } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import {
  AuthenticatedRequest,
  posterSizes,
  routes,
  tmdbImageUrl,
} from "../../helpers/apiCommunication";
import {
  perPage,
  validMovieOrderBy,
  validMovieOrderColumn,
} from "../../helpers/movies";
import MovieFormModal from "./MovieFormModal";
import MovieSortModal from "./MovieSortModal";
import "../../css/Movies.css";
import { AxiosResponse } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { StarRatings } from "./StarRatings";

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
  seen_at: string | null;
}

export const Movies: React.FC<MoviesProps> = ({ watched }): ReactElement => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [showSortModal, setShowSortModal] = useState(false);
  const [orderBy, setOrderBy] = useState<validMovieOrderBy>("desc");
  const [orderColumn, setOrderColumn] =
    useState<validMovieOrderColumn>("created_at");
  const oldWatchedState = useRef(watched);

  const buildMovies = useCallback(
    async (queryUrl: string | null = null, loadMoreState: boolean = false) => {
      if (!token) {
        return;
      }
      // Check if switched between watched/unwatched
      if (watched !== oldWatchedState.current) {
        // Reset order by settings
        setOrderBy("desc");
        setOrderColumn("created_at");
        oldWatchedState.current = watched; // Now handled, set this to the current state
      }
      if (loadMoreState) {
        setCanLoadMore(true);
      } else {
        setLoading(true);
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
              watched: watched,
              orderCol: orderColumn,
              order: orderBy,
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
        setLoading(false);
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
        } else if (error?.message) {
          setError(error.message);
        } else {
          setError("Unexpected error :c");
        }
        if (loadMoreState) {
          setCanLoadMore(false);
        } else {
          setLoading(false);
        }
      }
    },
    [token, navigate, watched, orderBy, orderColumn]
  );

  const markAsSeen = async (movieId: number, movieName: string) => {
    if (!token) {
      // Set error here
      return;
    }
    try {
      const result = await AuthenticatedRequest(token).patch(
        routes.movies.MARK_SEEN,
        {
          movieId: movieId,
          seen: true,
        }
      );
      if (result?.data?.success) {
        buildMovies(); // Do not pass query URL to load movie list page 1.
        toast.success(`${movieName} marked as seen!`);
        return;
      }
      setError("Unsuccessful response from server!");
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error?.message) {
        setError(error.message);
      } else {
        setError("Unexpected error :c");
      }
    }
  };

  const MovieList: React.FC<MovieListProps> = ({ movies }): ReactElement => {
    if (movies.length === 0 && !loading) {
      return <h3>No Movies!</h3>;
    }
    return (
      <>
        {movies.map((movie) => {
          return (
            <Col
              lg={3}
              sm={6}
              key={movie.id}
              className={"pt-1 pb-1 d-flex " + (loading ? "loadingBlur" : "")}
            >
              <div className="movieContainer">
                <div className="movieCard">
                  <div className="overlay hover-required">
                    <div className="p-3">
                      <h5>{movie.title}</h5>
                      <div className="overlayBody">
                        <div>
                          Added on{" "}
                          {new Date(movie.created_at).toLocaleDateString()}
                        </div>
                        {!watched && (
                          <>
                            <Button
                              onClick={() => markAsSeen(movie.id, movie.title)}
                              style={{ opacity: 1 }}
                              className="mt-1"
                            >
                              Watched it!
                            </Button>
                          </>
                        )}
                        {watched && (
                          <>
                            <div>
                              Seen on{" "}
                              {movie?.seen_at
                                ? new Date(movie.seen_at).toLocaleDateString()
                                : "N/A"}
                            </div>
                            <StarRatings
                              movieId={movie.id}
                              movieRating={movie.rating ?? 0}
                              authenticatedRequest={AuthenticatedRequest(
                                token ?? ""
                              )}
                              overlay={true}
                            />
                          </>
                        )}
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
                    <h5>{movie.title}</h5>
                    {/* TODO: merge the below with the almost identical code above */}
                    <div className="overlayBody no-hover">
                      <div>
                        Added on{" "}
                        {new Date(movie.created_at).toLocaleDateString()}
                      </div>
                      {!watched && (
                        <>
                          <Button
                            disabled={loading}
                            style={{ opacity: 1 }}
                            className="mt-1"
                            onClick={() => markAsSeen(movie.id, movie.title)}
                          >
                            Watched it!
                          </Button>
                        </>
                      )}
                      {watched && (
                        <>
                          <div>
                            Seen on{" "}
                            {movie?.seen_at
                              ? new Date(movie.seen_at).toLocaleDateString()
                              : "N/A"}
                          </div>
                          <StarRatings
                            movieId={movie.id}
                            movieRating={movie.rating ?? 0}
                            authenticatedRequest={AuthenticatedRequest(
                              token ?? ""
                            )}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
        {nextPageUrl && (
          <Row className="pt-3">
            <Col xs={12}>
              <div className="text-center">
                <Button
                  disabled={!canLoadMore}
                  className="mainBtn"
                  onClick={() => buildMovies(nextPageUrl, true)}
                >
                  Show More
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </>
    );
  };

  // Build movies on load
  useEffect(() => {
    setError("");
    buildMovies(null);
  }, [buildMovies]);

  return (
    <React.Fragment>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              background: "#363636",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#363636",
              color: "#fff",
            },
          },
        }}
      />
      <MovieFormModal
        setShowCreateModal={setShowCreateModal}
        show={showCreateModal}
        buildMovies={buildMovies}
      />
      <MovieSortModal
        setShowSortModal={setShowSortModal}
        show={showSortModal}
        setOrderBy={setOrderBy}
        orderBy={orderBy}
        setOrderColumn={setOrderColumn}
        orderColumn={orderColumn}
        watched={watched}
      />
      <Container className="section">
        <Row className="pt-1">
          <Col xs={12}>{error && <Alert variant="danger">{error}</Alert>}</Col>
          <Col xs={12} className="pb-1 text-center">
            <h4>Your {watched ? "Watched" : "Unseen"} Movies</h4>
          </Col>
          <Col xs={12}>
            <div className="row justify-content-between">
              <Col sm={6} className="pb-1">
                {!watched && (
                  <Button
                    className="mainBtn"
                    disabled={loading}
                    onClick={() => setShowCreateModal(true)}
                  >
                    <FaPlusSquare /> Add New Movie
                  </Button>
                )}
              </Col>
              <Col sm={6} className="text-sm-end pb-1">
                <OverlayTrigger
                  overlay={
                    <Tooltip id="tooltip-disabled">Coming Soon!</Tooltip>
                  }
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
                <Button
                  className="mainBtn ms-1"
                  disabled={loading}
                  onClick={() => setShowSortModal(true)}
                >
                  <FaSort /> Sort
                </Button>
              </Col>
            </div>
          </Col>
        </Row>
        <Row className="pt-3">
          <MovieList movies={movies} />
          {loading && <h3>Loading...</h3>}
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Movies;
