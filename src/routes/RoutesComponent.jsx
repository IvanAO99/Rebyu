import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage/HomePage.jsx";
import GamesPage from "../pages/GamesPage/GamesPage.jsx";
import GamePage from "../pages/GamePage/GamePage.jsx";
import SignPage from "../pages/SignPage/SignPage.jsx";
import Error404Page from "../pages/Error404Page/Error404Page.jsx";
import useUsers from "../hooks/useUsers.js";

const RoutesComponent = () => {
  const { isSessionUp } = useUsers();
  return (
    <Fragment>
      <Routes>
        {!isSessionUp && <Route path="/" element={<HomePage />} />}
        <Route path="games" element={<GamesPage />} />
        <Route path="game" element={<GamePage />} />
        <Route path="sign-in" element={<SignPage />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </Fragment>
  );
};

export default RoutesComponent;
