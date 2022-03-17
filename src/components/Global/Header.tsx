import React, { ReactElement, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AuthContext } from "../Auth/AuthContext";

interface UserGreetingProps {
  userName: string | null;
}
const UserGreeting = ({ userName }: UserGreetingProps): ReactElement | null => {
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
          <h2>
            {authContext?.user?.name && (
              <UserGreeting userName={authContext.user.name} />
            )}
          </h2>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
