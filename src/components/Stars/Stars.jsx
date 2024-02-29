import React, { Fragment } from "react";

import Star from "../Star/Star";

/**
 * Functional component representing a set of stars.
 *
 * @param {number} score - The score to determine the filled stars.
 * @param {number} size - The size of each star.
 * @returns {JSX.Element} The JSX element for the set of stars.
 */
const Stars = ({ score, size }) => {
  return (
    <Fragment>
      <div className="d-flex align-items-center">
        {/* Create an array of 5 stars */}
        {[...Array(5)].map((star, i) => {
          return (
            <Fragment key={crypto.randomUUID()}>
              {/* Render the Star component with customized color and size */}
              <Star
                color={i + 1 <= score ? "#ffc107" : "#e4e5e9"}
                size={size}
              />
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Stars;
