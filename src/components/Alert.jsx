import React from "react";
import ReactDOM from "react-dom";

import { ToastContainer } from "react-toastify";

import AlertCloseIcon from "./AlertCloseIcon.jsx";

import "react-toastify/dist/ReactToastify.css";
import "../assets/css/customAlert.css";

/**
 * Alert Component
 *
 * This component displays alert notifications using the react-toastify library.
 * It uses a ReactDOM portal to render the notifications outside the main DOM tree.
 * The notifications are configured to close automatically after 5000 milliseconds
 * and use a custom icon for the close button.
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
