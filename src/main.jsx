import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

/**
 * Application Entry Point
 *
 * This file is the main entry point of the application.
 * It renders the root component of the application (`App`) in the DOM element with the id "app-root".
 *
 * @param {React.StrictMode} - <React.StrictMode> React component used to enable strict mode.
 * @param {App} - <App /> Root component of the application.
 *
 */
ReactDOM.createRoot(document.getElementById("app-root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
