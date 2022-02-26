import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Home() {
  return (
    <div id="header" className="section">
      <Container>
        <Row>
          <Col>
            <span>
              <a href="https://www.nathanjms.co.uk">www.nathanjms.co.uk</a>
            </span>
            <h1>Movies</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
