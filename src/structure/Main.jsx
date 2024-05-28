import React from "react";
import useUsers from "../hooks/useUsers";
import { validateObject } from "../libraries/validateData";
import Aside from "./Aside.jsx";

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
          <main className="flex-grow container mx-auto py-2">{children}</main>
        </>
      )}
    </>
  );
};

export default Main;
