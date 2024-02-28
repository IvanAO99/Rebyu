import React, { Fragment } from "react";
import Star from "../Star/Star";

const Stars = ({ score, size }) => {
  return (
    <Fragment>
      <div className="d-flex align-items-center">
        {[...Array(5)].map((star, i) => {
          return (
            <Fragment>
              <Star
                key={`star-${i + 1}`}
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
