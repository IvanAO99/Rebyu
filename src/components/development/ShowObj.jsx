import React, { Fragment } from "react";

const ShowObj = ({ obj }) => {
  return (
    <Fragment>
      <pre>{JSON.stringify(obj, null, 2)}</pre>
    </Fragment>
  );
};

export default ShowObj;
