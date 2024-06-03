import React from "react";

import useUsers from "../hooks/useUsers.js";

import Aside from "./Aside.jsx";

import { validateObject } from "../libraries/validateData.js";

/**
 * Componente Main
 *
 * Este componente renderiza el contenido principal de la aplicación, que puede incluir el aside para administradores, dependiendo del estado de autenticación del usuario.
 *
 * Props:
 * @param {JSX.Element} children - Contenido que se renderizará dentro del componente.
 *
 */
const Main = ({ children }) => {
  const { isSessionUp, user, isAdmin } = useUsers();

  return (
    <>
      {isSessionUp && validateObject(user) && isAdmin ? (
        <>
          <Aside />
          <main className="min-h-screen flex-grow">{children}</main>
        </>
      ) : (
        <>
          <main className="flex-grow container mx-auto p-5">{children}</main>
        </>
      )}
    </>
  );
};

export default Main;
