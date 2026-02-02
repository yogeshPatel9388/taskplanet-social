import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";

import { Container, Form, Button, Card } from "react-bootstrap";

/* Signup page registers new users */
export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* Signup request is sent to backend */
  const handleSignup = async (e) => {
    e.preventDefault();

    /* Basic validation */
    if (!username || !email || !password) {
      return alert("All fields are required!");
    }

    if (password.length < 6) {
      return alert("Password must be at least 6 characters.");
    }

    try {
      setLoading(true);

      await axios.post("/auth/signup", {
        username,
        email,
        password,
      });

      alert("Account created successfully! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error.response?.data);

      alert(
        error.response?.data?.message || "Signup failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="authContainer">
      <Card className="authCard">
        <h3 className="text-center">Signup</h3>

        <Form onSubmit={handleSignup}>
          {/* Username */}
          <Form.Control
            type="text"
            placeholder="Username"
            className="mb-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

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
            {loading ? "Creating Account..." : "Signup"}
          </Button>
        </Form>

        <p className="text-center mt-3">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </Card>
    </Container>
  );
}
