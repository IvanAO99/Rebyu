import React from "react";

import useUsers from "../hooks/useUsers.js";

import Loading from "../components/Loading.jsx";

import { validateObject } from "../libraries/validateData.js";

const Container = ({ children }) => {
  const { isLoadingUser, isSessionUp, user, isAdmin } = useUsers();

  return (
    <>
      <div
        className={`min-h-screen flex ${
          isSessionUp && validateObject(user) && isAdmin
            ? "flex-row"
            : "flex-col"
        } justify-stretch items-stretch`}
      >
        {isLoadingUser ? (
          <>
            <div className="min-h-screen flex-grow flex flex-col justify-center items-center">
              <Loading />
              <p className="px-5 py-2 text-purple-600 font-bold">
                Logging in...
              </p>
            </div>
          </>
        ) : (
          <>{children}</>
        )}
      </div>
    </>
  );
};

export default Container;
