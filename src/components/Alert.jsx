import React from "react";
import ReactDOM from "react-dom";

import { ToastContainer } from "react-toastify";

import AlertIcon from "./AlertIcon.jsx";

import "react-toastify/dist/ReactToastify.css";
import "../customAlert.css";
import AlertCloseIcon from "./AlertCloseIcon.jsx";

const Alert = () => {
  return ReactDOM.createPortal(
    <>
      <div>
        {/* ToastContainer for displaying toast messages */}
        <ToastContainer autoClose={5000} closeButton={AlertCloseIcon} />
      </div>
    </>,
    // Portal target element with the id "alert-root"
    document.getElementById("alert-root")
  );
};

export default Alert;
