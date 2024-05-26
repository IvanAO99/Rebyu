import React, { Fragment } from "react";

const GameVideo = ({ children }) => {
  return (
    <Fragment>
      <div className="w-9/12 h-[560px] overflow-hidden rounded-3xl shadow">
        {children}
      </div>
    </Fragment>
  );
};

export default GameVideo;
