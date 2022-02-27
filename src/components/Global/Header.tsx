import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AuthContext } from "../Auth/AuthContext";

const UserGreeting = (userName: string | null): JSX.Element | null => {
  if (!userName) {
    return null;
  }
  return (
    <Col xs={12} className="text-start">
      <span>Hi, {userName}</span>
    </Col>
  );
};

function Home() {
  const authContext = useContext(AuthContext);

  return (
    <div id="header" className="section">
      <Container>
        <Row>
          <Col xs={12}>
            <span>
              <a href="https://www.nathanjms.co.uk">www.nathanjms.co.uk</a>
            </span>
            <h1>Movies</h1>
          </Col>
          {UserGreeting(authContext.user)}
          {/* <UserGreeting userName="test"/> */}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
