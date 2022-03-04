import React, { ReactElement, useEffect, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { AuthenticatedRequest } from "../Global/apiCommunication";

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
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const buildMovies = async () => {
      setError("");
      setLoading(true);
      try {
        let params = {
          page: 1,
          perPage: 10,
          groupId: 1,
        };
        const result = await AuthenticatedRequest(token ?? "").get(
          "/api/movies",
          { params: params }
        );
        setMovies(result.data.movies);
      } catch (error: any) {
        if (error?.response?.status === 401) {
          localStorage.clear();
          navigate("/login", {
            state: { message: "Session has expired, please login again." },
          });
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
      <Container className="section">
        <Row className="pt-1">
          {error && <Alert variant="danger">{error}</Alert>}
          <h2>Movies</h2>
          <h4>Hello, {user} </h4>
        </Row>
        <Row>
          <Col xs={12}>
            {movies.map((movie) => {
              return <p key={movie.id}>{movie.title}</p>;
            })}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Movies;
