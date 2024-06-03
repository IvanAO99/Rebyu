import React from "react";
import ReactDOM from "react-dom";

import { ToastContainer } from "react-toastify";

import AlertCloseIcon from "./AlertCloseIcon.jsx";

import "react-toastify/dist/ReactToastify.css";
import "../assets/css/customAlert.css";

/**
 * Componente Alert
 *
 * Este componente muestra notificaciones emergentes utilizando la biblioteca react-toastify. Utiliza un portal de
 * ReactDOM para renderizar las notificaciones fuera del árbol de DOM principal. Las notificaciones se configuran
 * para cerrarse automáticamente después de 5000 milisegundos y utilizan un icono personalizado para el botón de
 * cierre.
 *
 */
const Alert = () => {
  return ReactDOM.createPortal(
    <>
      <div>
        <ToastContainer autoClose={5000} closeButton={AlertCloseIcon} />
      </div>
    </>,
    document.getElementById("alert-root")
  );
};

export default Alert;
