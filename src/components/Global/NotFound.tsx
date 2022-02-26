import React, { ReactElement } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import NavBar from "./Navbar";
import { Link } from "react-router-dom";

interface NotFoundProps {}

export const NotFound: React.FC<NotFoundProps> = (): ReactElement => {
  return (
    <React.Fragment>
      <NavBar />
      <Container id="notFound" className="section">
        <Row className="pt-5">
          <h2>404 Not Found</h2>
        </Row>
        <Row>
          <Col xs={12}>
            <p>A page does not exist at this location.</p>
            <p>
              <Link to="/">
                <Button>Return to homepage?</Button>
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default NotFound;
