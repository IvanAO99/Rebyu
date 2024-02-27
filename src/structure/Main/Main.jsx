import React, { Fragment } from "react";

const Main = ({ children }) => {
  return (
    <Fragment>
      <main className="flex-grow-1 mb-3">{children}</main>
    </Fragment>
  );
};

export default Main;
