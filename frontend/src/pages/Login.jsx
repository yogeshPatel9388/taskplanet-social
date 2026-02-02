import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";

import { Container, Form, Button, Card } from "react-bootstrap";

/* Login page handles user authentication */
export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* Login request is sent to backend and JWT token is stored */
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Please enter email and password.");
    }

    try {
      setLoading(true);

      const res = await axios.post("/auth/login", {
        email,
        password,
      });

      /* Save token in localStorage */
      localStorage.setItem("token", res.data.token);

      /* ✅ Update App state instantly */
      setToken(res.data.token);

      /* Redirect user to feed */
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error.response?.data);

      alert(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="authContainer">
      <Card className="authCard">
        <h3 className="text-center">Login</h3>

        <Form onSubmit={handleLogin}>
          {/* Email */}
          <Form.Control
            type="email"
            placeholder="Email"
            className="mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <Form.Control
            type="password"
            placeholder="Password"
            className="mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>

        {/* Signup Link */}
        <p className="text-center mt-3">
          New user? <Link to="/signup">Signup</Link>
        </p>
      </Card>
    </Container>
  );
}
