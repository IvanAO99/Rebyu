import React, { Fragment } from "react";

import { FaStar } from "react-icons/fa";

const Star = ({ color, size }) => {
  return (
    <Fragment>
      <FaStar color={color} size={size} />
    </Fragment>
  );
};

export default Star;
