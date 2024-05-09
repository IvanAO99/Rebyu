import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import LogInPage from "../pages/LogInPage.jsx";
import RegistrationPage from "../pages/RegistrationPage.jsx";
import AffiliatePage from "../pages/AffiliatePage.jsx";
import GamePage from "../pages/GamePage.jsx";

const RouterComponent = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/lists" element={<ProfilePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/affiliate" element={<AffiliatePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Fragment>
  );
};

export default RouterComponent;
