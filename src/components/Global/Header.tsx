import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Home() {
  return (
    <div id="header" className="section">
      <Container>
        <Row>
          <Col>
            <h1>Nathan James</h1>
            <p>nathan@nathanjms.co.uk</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
