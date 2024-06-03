import React from "react";

import { Outlet } from "react-router-dom";

const GamesAdministration = () => {
  return (
    <>
      <div className="flex-grow flex flex-col">{<Outlet />}</div>
    </>
  );
};

export default GamesAdministration;
