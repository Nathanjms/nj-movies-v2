import React, { useContext, useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../Global/apiCommunication";
import { AuthContext } from "./AuthContext";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  async function login(email: string, password: string) {
    setLoading(true);
    setError("");
    try {
      let response = await axios.post(`${baseURL}/api/auth/signin`, {
        email: email,
        password: password,
      });
      if (response?.data?.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("expiry", JSON.stringify(response.data.expiresIn));
        setToken(response.data.token);
        navigate("/");
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
      return; //TODO give error message
    }
    await login(email, password);
  }
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
      id="login"
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card className="text-black">
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
            Don't have an account? <Link to="/demo">Click here</Link> to demo
            the Movies section.
          </p>
          <p>
            <a href="https://nathanjms.co.uk">Go to main site.</a>
          </p>
        </div>
      </div>
    </Container>
  );
}
