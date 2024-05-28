import React, { Fragment, useState } from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import LogInPage from "../pages/LogInPage.jsx";
import RegistrationPage from "../pages/RegistrationPage.jsx";
import AffiliatePage from "../pages/AffiliatePage.jsx";
import GamePage from "../pages/GamePage.jsx";
import useUsers from "../hooks/useUsers.js";
import AdminPage from "../pages/AdminPage.jsx";
import { validateObject } from "../libraries/validateData.js";
import Games from "../components/Games.jsx";
import Reviews from "../components/Reviews.jsx";
import AdminWelcome from "../components/AdminWelcome.jsx";

const RouterComponent = () => {
  const { isSessionUp, user, isAdmin } = useUsers();

  return (
    <Fragment>
      <Routes>
        {isSessionUp && validateObject(user) && isAdmin ? (
          <>
            <Route path="/" element={<AdminPage />}>
              <Route index element={<AdminWelcome />} />
              <Route path="/games" element={<Games />} />
              <Route path="/reviews" element={<Reviews />} />
            </Route>
          </>
        ) : (
          <>
            <Route path="/" element={<HomePage />} />
          </>
        )}
        {isSessionUp && validateObject(user) && !isAdmin && (
          <>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="profile/lists" element={<ProfilePage />} />
          </>
        )}
        {!isSessionUp && !validateObject(user) && (
          <>
            <Route path="login" element={<LogInPage />} />
            <Route path="register" element={<RegistrationPage />} />
          </>
        )}
        <Route path="game" element={<GamePage />} />
        <Route path="affiliate" element={<AffiliatePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Fragment>
  );
};

export default RouterComponent;
