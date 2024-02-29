import React, { Fragment } from "react";

import Spinner from "react-bootstrap/Spinner";

/**
 * A React component for displaying a loading spinner.
 * @function Loading
 * @param {object} props - The properties of the Loading component.
 * @param {string} [props.variant="light"] - The color variant of the loading spinner.
 * @returns {JSX.Element} The rendered component.
 */
const Loading = ({ variant = "light" }) => {
  return (
    <Fragment>
      {/* Loading spinner with optional variant */}
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
