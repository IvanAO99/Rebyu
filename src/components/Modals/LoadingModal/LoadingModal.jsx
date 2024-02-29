import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import Loading from "../../Loading/Loading.jsx";

/**
 * A React component for rendering a loading modal.
 * @function LoadingModal
 * @returns {JSX.Element} The rendered component.
 */
const LoadingModal = () => {
  return ReactDOM.createPortal(
    <Fragment>
      {/* Transparent background overlay */}
      <div className="position-fixed bg-black opacity-25 vw-100 vh-100 z-3"></div>
      {/* Loading spinner centered on the screen */}
      <div className="position-fixed d-flex justify-content-center align-items-center vw-100 vh-100 z-3">
        <Loading />
      </div>
    </Fragment>,
    document.getElementById("modal-root")
  );
};

export default LoadingModal;
