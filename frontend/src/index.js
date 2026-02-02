import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

/* The React application is mounted inside the root element */
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
