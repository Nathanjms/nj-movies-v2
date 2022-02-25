import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

function Home() {
  return (
    <div id="header" className="section">
      <Container>
        <Row>
          <Col xs={6} className="text-start">
            <Button onClick={() => console.log("Log Out")}>Log Out</Button>
          </Col>
          <Col xs={6} className="text-end">
            <Button onClick={() => console.log("Log In")}>Log In</Button>
          </Col>
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
