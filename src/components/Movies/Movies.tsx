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

interface MoviesProps {}
interface Movie {
  id: number;
  title: string;
  tmdb_id: string;
  poster_path: string;
  rating: number;
  seen: boolean;
  group_id: number | null;
  created_by: number;
}

export const Movies: React.FC<MoviesProps> = (): ReactElement => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

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
              page: 1,
              perPage: 10,
              // groupId: 1, // TODO: Add back in once group functionality has been developed
            },
          }
        );
        setMovies(result.data.movies);
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
  }, [navigate, token]);

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
              <Col key={movie.id} className="movieCard" sm={6} md={4}>
                <h3>{movie.title}</h3>
                <img
                  src={tmdbImageUrl + posterSizes.xxs + movie.poster_path}
                  alt={movie.title + " poster"}
                  loading="lazy"
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Movies;
