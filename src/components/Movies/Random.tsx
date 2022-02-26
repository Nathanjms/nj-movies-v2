import React, { ReactElement } from "react";
import { Col, Container, Row } from "react-bootstrap";

interface NotFoundProps {}

export const NotFound: React.FC<NotFoundProps> = (): ReactElement => {
  return (
    <React.Fragment>
      <Container id="notFound" className="section">
        <Row className="pt-5">
          <h2>Random</h2>
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

export default NotFound;
