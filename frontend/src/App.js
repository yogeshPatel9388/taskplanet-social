import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";

import "./App.css";

/* App handles routing + authentication refresh properly */
export default function App() {
  /* Token is stored in state so UI updates instantly */
  const [token, setToken] = useState(localStorage.getItem("token"));

  /* Logout clears token + refreshes routing */
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={!token ? <Login setToken={setToken} /> : <Navigate to="/" />}
        />

        {/* Signup Route */}
        <Route
          path="/signup"
          element={!token ? <Signup /> : <Navigate to="/" />}
        />

        {/* Protected Feed Route */}
        <Route
          path="/"
          element={
            token ? (
              <Feed handleLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
