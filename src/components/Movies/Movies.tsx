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

interface MoviesProps {}
export interface Movie {
  id: number;
  title: string;
  tmdb_id: string;
  poster_path: string;
  backdrop_path: string;
  rating: number | null;
  seen: boolean;
  group_id: number | null;
  created_by: number;
  created_at: string;
}

export const Movies: React.FC<MoviesProps> = (): ReactElement => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);

  const buildMovies = useCallback(
    async (rebuild: boolean = false) => {
      if (!token) {
        return;
      }
      try {
        const result = await AuthenticatedRequest(token).get(
          routes.movies.GET,
          {
            params: {
              page: pageNumber,
              perPage: perPage(),
              // groupId: 1, // TODO: Add back in once group functionality has been developed
              watched: false, //TODO: Make this dynamic
            },
          }
        );
        if (rebuild) {
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
    [token, pageNumber, navigate]
  );

  // Build movies on load
  useEffect(() => {
    setError("");
    setLoading(true);
    buildMovies();
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
        setMovies={setMovies}
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
                            Added {" "}
                            {movie.created_at
                              ? new Date(movie.created_at).toLocaleDateString()
                              : "Just Now"}
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
                          Added on{" "}
                          {new Date(movie.created_at).toLocaleDateString()}
                        </p>
                        <Button style={{ opacity: 1 }}>Watched it!</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
        {nextPageUrl && (
          <Row className="pt-3">
            <Col xs={12}>
              <div className="text-center">
                <Button
                  className="mainBtn"
                  onClick={() => setPageNumber((prevNum) => prevNum + 1)}
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
