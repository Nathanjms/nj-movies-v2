import React, { ReactElement, useState } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL, routes } from "../../helpers/apiCommunication";
import { useAuth } from "./AuthContext";
import { LogInMessage } from "../App";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const location: any = useLocation();
  const from: string = location.state?.from?.pathname || "/";
  const [logInMessage, setLogInMessage] = useState<LogInMessage | null>(
    location?.state?.logInMessage || null
  );

  const AlertElement = (): ReactElement | null => {
    if (!logInMessage?.message) {
      return null;
    }
    console.log(logInMessage);
    return (
      <Row className="pt-3">
        <Col xs={12}>
          <Alert
            variant={!logInMessage?.type ? "info" : logInMessage.type}
            dismissible={true}
            onClose={() => setLogInMessage(null)}
          >
            {logInMessage.message}
          </Alert>
        </Col>
      </Row>
    );
  };

  async function login(email: string, password: string) {
    setLoading(true);
    setError("");
    try {
      let response = await axios.post(baseURL + routes.auth.SIGN_IN, {
        email: email,
        password: password,
      });
      if (response?.data?.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "expiry",
          JSON.stringify(response.data.expiryDate)
        );
        setToken(response.data.token);
        // Return the user to where they came from (or "/" by default)
        navigate(from, { replace: true });
        return;
      }
    } catch (error: any) {
      setLoading(false);
      if (error?.response?.data?.message) {
        setError(error.response.data.message);
        return;
      }
      if (error?.message) {
        setError(error.message);
        return;
      }
      setError("Oops! Invalid Response from API");
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!email || !password) {
      setError("Invalid Email or Password");
      return;
    }
    await login(email, password);
  }
  return (
    <Container
      className="justify-content-center"
      style={{ minHeight: "100vh" }}
      id="login"
    >
      <AlertElement />
      <Row className="pt-3">
        <Col xs={12}>
          <div className="w-100" style={{ maxWidth: "400px", margin: "auto" }}>
            <Card className="text-black radius-nj">
              <Card.Body>
                <h2 className="text-center mb-4">Log In</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      className="mb-3"
                      name="email"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      className="mb-3"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      required
                    />
                  </Form.Group>
                  <Button disabled={loading} className="w-100" type="submit">
                    Log In
                  </Button>
                </Form>
                {loading && (
                  <div className="col-lg-12 mt-4">
                    <p>Connecting to API...</p>
                  </div>
                )}
              </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
              <p>To access the Movies section, you must be signed in.</p>
              <p>
                Don't have an account? <Link to="/demo">Click here</Link> to
                demo the Movies section.
              </p>
              <p>
                <a href="https://nathanjms.co.uk">Go to main site.</a>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
