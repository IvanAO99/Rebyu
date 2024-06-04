import React, { Fragment } from "react";

/**
 * Component GameVideo
 *
 * This component wraps a game video and applies design styles.
 *
 * Props:
 * @param {ReactNode} children - The children elements of the component.
 *
 */
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
