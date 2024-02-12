import React, { Fragment } from "react";

import Col from "react-bootstrap/Col";

const Main = ({ children }) => {
  return (
    <Fragment>
      <main className="row flex-grow-1">
        <Col>{children}</Col>
      </main>
    </Fragment>
  );
};

export default Main;
