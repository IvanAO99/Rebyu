import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import Loading from "../../Loading/Loading.jsx";

const LoadingModal = () => {
  return ReactDOM.createPortal(
    <Fragment>
      <div className="position-fixed bg-black opacity-25 vw-100 vh-100 z-3"></div>
      <div className="position-fixed d-flex justify-content-center align-items-center vw-100 vh-100 z-3">
        <Loading />
      </div>
    </Fragment>,
    document.getElementById("modal-root")
  );
};

export default LoadingModal;
