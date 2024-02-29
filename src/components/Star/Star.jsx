import React, { Fragment } from "react";

import { FaStar } from "react-icons/fa";

/**
 * Functional component representing a star icon.
 *
 * @param {string} color - The color of the star.
 * @param {number} size - The size of the star.
 * @returns {JSX.Element} The JSX element for the star icon.
 */
const Star = ({ color, size }) => {
  return (
    <Fragment>
      {/* Utilizing the FaStar component from react-icons/fa */}
      <FaStar color={color} size={size} />
    </Fragment>
  );
};

export default Star;
