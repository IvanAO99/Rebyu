import React from "react";

import useUsers from "../hooks/useUsers.js";

import Aside from "./Aside.jsx";

import { validateObject } from "../libraries/validateData.js";

/**
 * Main Component
 *
 * This component renders the main content of the application,
 * which can include the aside for administrators,
 * depending on the authentication state of the user.
 *
 * Props:
 * @param {JSX.Element} children - The content that will be rendered inside the component.
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
