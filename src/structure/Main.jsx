import React from "react";

import useUsers from "../hooks/useUsers.js";

import Aside from "./Aside.jsx";

import { validateObject } from "../libraries/validateData.js";

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
