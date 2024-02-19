import React, { Fragment } from "react";

const Main = ({ children }) => {
  return (
    <Fragment>
      <main className="h-100">{children}</main>
    </Fragment>
  );
};

export default Main;
