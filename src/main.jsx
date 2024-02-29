import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Entry point of the React application.
 * Renders the App component within a StrictMode for additional checks during development.
 *
 * @remarks
 * This file is typically the entry point for a React application.
 *
 * @returns {void}
 */
ReactDOM.createRoot(document.getElementById("app-root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
