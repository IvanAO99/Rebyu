import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

/**
 * Punto de entrada de la aplicación
 *
 * Este archivo es el punto de entrada principal de la aplicación. Renderiza el componente raíz de la aplicación (`App`) en el elemento con el id "app-root" del DOM.
 *
 * @param {React.StrictMode} - <React.StrictMode> Componente de React utilizado para activar el modo estricto.
 * @param {App} - <App /> Componente raíz de la aplicación.
 */
ReactDOM.createRoot(document.getElementById("app-root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
