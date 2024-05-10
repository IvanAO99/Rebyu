import React, { Fragment } from "react";

const Main = ({ children }) => {
  return (
    <Fragment>
      <main className="flex-grow container mx-auto py-2">{children}</main>
    </Fragment>
  );
};

export default Main;
