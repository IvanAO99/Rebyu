import React, { Fragment } from "react";

import { Route, Routes } from "react-router-dom";

import useUsers from "../hooks/useUsers.js";

import AdminPage from "../pages/AdminPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import AffiliatePage from "../pages/AffiliatePage.jsx";
import LogInPage from "../pages/LogInPage.jsx";
import RegistrationPage from "../pages/RegistrationPage.jsx";
import GamePage from "../pages/GamePage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";

import AdminWelcome from "../components/AdminWelcome.jsx";
import GamesAdministration from "../components/GamesAdministration.jsx";
import Games from "../components/Games.jsx";
import ReviewAdministration from "../components/ReviewAdministration.jsx";

import { validateObject } from "../libraries/validateData.js";

/**
 * RouterComponent Component
 *
 * This component manages the routing of the application,
 * determining which page to show based on the user's session and role.
 * If the user is authenticated and is an administrator, administrative pages will be displayed.
 * If the user is authenticated but not an administrator, profile and affiliation pages will be displayed.
 * If the user is not authenticated, login and registration pages will be displayed.
 * It also handles the display of the error page for non-existent routes.
 *
 */
const RouterComponent = () => {
  const { isSessionUp, user, isAdmin } = useUsers();

  return (
    <Fragment>
      <Routes>
        {isSessionUp && validateObject(user) && isAdmin ? (
          <>
            <Route path="/" element={<AdminPage />}>
              <Route index element={<AdminWelcome />} />
              <Route path="/games" element={<GamesAdministration />}>
                <Route
                  index
                  path="/games"
                  element={<Games onAdminPage={true} />}
                />
                <Route index path="/games/game" element={<GamePage />} />
              </Route>
              <Route path="/reviews" element={<ReviewAdministration />} />
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
            <Route path="affiliate" element={<AffiliatePage />} />
          </>
        )}
        {!isSessionUp && !validateObject(user) && (
          <>
            <Route path="login" element={<LogInPage />} />
            <Route path="register" element={<RegistrationPage />} />
          </>
        )}
        <Route path="game" element={<GamePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Fragment>
  );
};

export default RouterComponent;
