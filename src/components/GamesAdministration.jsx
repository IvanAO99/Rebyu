import React from "react";

import { Outlet } from "react-router-dom";

/**
 * Component GamesAdministration
 *
 * This component serves as a container for game administration. It renders the Outlet component from react-router-dom
 * to render specific game administration content defined in nested routes.
 *
 */
const GamesAdministration = () => {
  return (
    <>
      <div className="flex-grow flex flex-col">{<Outlet />}</div>
    </>
  );
};

export default GamesAdministration;
