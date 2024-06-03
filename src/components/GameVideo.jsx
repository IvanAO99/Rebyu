import React, { Fragment } from "react";

const GameVideo = ({ children }) => {
  return (
    <Fragment>
      <div className="w-full xl:w-3/4 h-[560px] overflow-hidden rounded-3xl shadow">
        {children}
      </div>
    </Fragment>
  );
};

export default GameVideo;
