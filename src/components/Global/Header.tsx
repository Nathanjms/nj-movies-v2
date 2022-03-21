import React, { ReactElement, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AuthContext } from "../Auth/AuthContext";

interface UserGreetingProps {
  userName: string | undefined;
}
const UserGreeting = ({ userName }: UserGreetingProps): ReactElement | null => {
  if (!userName) {
    return null;
  }
  return (
    <Col xs={12} className="text-start">
      <h3>Hi, {userName}</h3>
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
          <UserGreeting userName={authContext?.user?.name} />
        </Row>
      </Container>
    </div>
  );
}

export default Home;
