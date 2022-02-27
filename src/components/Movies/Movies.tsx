import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import { AuthenticatedRequest } from "../Global/apiCommunication";

interface MoviesProps {}

export interface User {
  name: string;
  groups: { groupId?: number }[];
}

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
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);

  // TODO: Potentially move this to be more generic and apply to more movie containers
  useEffect(() => {
    if (!authContext.token) {
      navigate("/signin");
      return;
    }

    const buildMovies = async () => {
      try {
        let params = {
          page: 1,
          perPage: 10,
          groupId: null,
        };
        const result = await AuthenticatedRequest(authContext.token ?? "").get(
          "/api/movies",
          { params: params }
        );
        setMovies(result.data.movies);
      } catch (error) {
        console.dir(error);
      }
    };
    buildMovies();
    setLoading(false);
  }, [navigate, authContext]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <React.Fragment>
      <Container className="section">
        <Row className="pt-5">
          <h2>Movies</h2>
          <h4>Hello, {authContext.user} </h4>
        </Row>
        <Row>
          <Col xs={12}>
            {movies.map((movie) => {
              return <p>{movie.title}</p>;
            })}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Movies;
