import React, { ReactElement, useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { FaPlusSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import {
  AuthenticatedRequest,
  posterSizes,
  routes,
  tmdbImageUrl,
} from "../../helpers/apiCommunication";
import MovieFormModal from "./MovieFormModal";
import "../../css/Movies.css";

interface MoviesProps {}
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

export const Movies: React.FC<MoviesProps> = (): ReactElement => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      return;
    }
    const buildMovies = async () => {
      setError("");
      setLoading(true);
      try {
        const result = await AuthenticatedRequest(token).get(
          routes.movies.GET,
          {
            params: {
              page: pageNumber,
              perPage: 8, // TODO: Dynamic based on screen width
              // groupId: 1, // TODO: Add back in once group functionality has been developed
              watched: false, //TODO: Make this dynamic
            },
          }
        );
        setMovies(result.data.movies);
        setNextPageUrl(result.data.nextPageUrl);
        setPrevPageUrl(result.data.prevPageUrl);
        console.log(result.data.nextPageUrl)
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
    };
    buildMovies();
    setLoading(false);
    setLoading(false);
  }, [navigate, token, pageNumber]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <React.Fragment>
      <MovieFormModal
        setShowCreateModal={setShowCreateModal}
        show={showCreateModal}
      />
      <Container className="section">
        <Row className="pt-1">
          <Col xs={12}>{error && <Alert variant="danger">{error}</Alert>}</Col>
          <Col xs={12} className="text-start">
            <Button
              className="mainBtn"
              onClick={() => setShowCreateModal(true)}
            >
              <FaPlusSquare /> Add New Movie
            </Button>
          </Col>
        </Row>
        <Row className="pt-3">
          {movies.map((movie) => {
            return (
              <Col lg={4} sm={6} key={movie.id} className="pt-1 pb-1 d-flex">
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
      </Container>
    </React.Fragment>
  );
};

export default Movies;
