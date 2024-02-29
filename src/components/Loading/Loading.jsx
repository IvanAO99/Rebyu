import React, { Fragment } from "react";

import Spinner from "react-bootstrap/Spinner";

const Loading = ({ variant = "light" }) => {
  return (
    <Fragment>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Spinner animation="border" variant={variant} className="mb-1" />
        <div>
          <p className="text-light">Please wait</p>
        </div>
      </div>
    </Fragment>
  );
};

export default Loading;
