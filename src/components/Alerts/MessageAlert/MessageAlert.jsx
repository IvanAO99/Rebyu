import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

/**
 * A React component for displaying toast messages using the `react-toastify` library.
 * @function MessageAlert
 * @returns {JSX.Element} The rendered component.
 */
const MessageAlert = () => {
  /**
   * Renders the ToastContainer using `ReactDOM.createPortal`.
   * @returns {JSX.Element} The rendered portal.
   */
  return ReactDOM.createPortal(
    <Fragment>
      <div>
        {/* ToastContainer for displaying toast messages */}
        <ToastContainer autoClose={5000} />
      </div>
    </Fragment>,
    // Portal target element with the id "alert-root"
    document.getElementById("alert-root")
  );
};

/**
 * Exporting the MessageAlert component.
 * @module MessageAlert
 */
export default MessageAlert;
