import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import useUsers from "../hooks/useUsers.js";

import HomePage from "../pages/HomePage/HomePage.jsx";
import GamesPage from "../pages/GamesPage/GamesPage.jsx";
import GamePage from "../pages/GamePage/GamePage.jsx";
import SignPage from "../pages/SignPage/SignPage.jsx";
import Error404Page from "../pages/Error404Page/Error404Page.jsx";

/**
 * Functional component defining the application routes.
 *
 * @returns {JSX.Element} The JSX element containing the defined routes.
 */
const RoutesComponent = () => {
  // Custom hook to access user-related state and functions
  const { isSessionUp } = useUsers();

  return (
    <Fragment>
      {/* React Router's Routes component to define navigation routes */}
      <Routes>
        {/* Display home page only when there is no active user session */}
        {!isSessionUp && <Route path="/" element={<HomePage />} />}
        {/* Route for displaying the games page */}
        <Route path="games" element={<GamesPage />} />
        {/* Route for displaying an individual game page */}
        <Route path="game" element={<GamePage />} />
        {/* Route for displaying the sign-in page */}
        <Route path="sign-in" element={<SignPage />} />
        {/* Route for displaying a generic 404 error page */}
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </Fragment>
  );
};

export default RoutesComponent;
