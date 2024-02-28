import React, { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";

import { ToastContainer, toast, Slide } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const MessageAlert = () => {
  return ReactDOM.createPortal(
    <Fragment>
      <div>
        <ToastContainer autoClose={5000} />
      </div>
    </Fragment>,
    document.getElementById("alert-root")
  );
};

export default MessageAlert;
