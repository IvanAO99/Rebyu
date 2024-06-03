import React from "react";
import ReactDOM from "react-dom";

import { ToastContainer } from "react-toastify";

import AlertCloseIcon from "./AlertCloseIcon.jsx";

import "react-toastify/dist/ReactToastify.css";
import "../assets/css/customAlert.css";

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
