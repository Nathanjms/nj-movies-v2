import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";

// TODO: Use this page to get the user info and be a router for all movies?
interface MoviesProps {}

export interface User {
  name: string;
  groups: { groupId?: number }[];
}

export const Movies: React.FC<MoviesProps> = (): ReactElement => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    if (!authContext || !authContext.token) {
      navigate("/signin");
      return;
    }

    // Fake an async axios request
    const getUserInfo = async () => {
      try {
        let result = null;
        await delay(1000);
        result = {
          data: {
            name: "Nathanjms",
            groups: [{ groupId: 1 }],
          },
        };
        setUser(result.data);
      } catch (err) {
        console.dir(err);
      } finally {
      }
    };

    getUserInfo();

    return;
  }, [navigate, authContext]);

  if (!user) {
    return <h3>Loading...</h3>;
  }

  return (
    <React.Fragment>
      <Container className="section">
        <Row className="pt-5">
          <h2>Movies</h2>
          <h4>Hello, {user.name} </h4>
        </Row>
        <Row>
          <Col xs={12}>
            <p>Moviessss</p>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Movies;
