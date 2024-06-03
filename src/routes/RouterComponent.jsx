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
 * Componente RouterComponent
 *
 * Este componente maneja el enrutamiento de la aplicación, determinando qué página mostrar según la sesión del usuario y su rol.
 * Si el usuario está autenticado y es administrador, se mostrarán las páginas de administración.
 * Si el usuario está autenticado pero no es administrador, se mostrarán las páginas de perfil y afiliación.
 * Si el usuario no está autenticado, se mostrarán las páginas de inicio de sesión y registro.
 * También maneja la visualización de la página de error para rutas no encontradas.
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
