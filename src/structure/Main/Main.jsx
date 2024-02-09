import React, { Fragment } from "react";

const Main = ({ children }) => {
  return (
    <Fragment>
      <main className="row">{children}</main>
    </Fragment>
  );
};

export default Main;
