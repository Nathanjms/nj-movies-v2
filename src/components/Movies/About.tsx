import React, { ReactElement } from "react";
import { Col, Container, Row } from "react-bootstrap";

interface NotFoundProps {}

export const NotFound: React.FC<NotFoundProps> = (): ReactElement => {
  return (
    <React.Fragment>
      <Container id="notFound" className="section">
        <Row className="pt-5">
          <h2>About</h2>
        </Row>
        <Row>
          <Col xs={12}>
            <p>Coming Soon...</p>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default NotFound;
