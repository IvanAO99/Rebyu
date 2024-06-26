import React from "react";

import { Link } from "react-router-dom";

import useUsers from "../hooks/useUsers.js";

/**
 * AdminWelcome Component
 *
 * This component displays a welcome message to the administrator,
 * including the name of the currently authenticated user.
 * It provides links to the game management and review sections through React Router.
 *
 */
const AdminWelcome = () => {
  const { user } = useUsers();

  return (
    <>
      <div className="flex-grow flex flex-col justify-center items-center gap-5">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-6xl font-bold">
            Welcome, <span className="text-purple-600">{user.name}</span>
          </h1>
          <p className="italic">What do you want to manage today?</p>
        </div>
        <nav>
          <ul className="flex flex-row gap-5">
            <li>
              <Link
                to={"/games"}
                className="rounded-3xl bg-purple-600 hover:bg-purple-400 text-gray-50 px-5 py-2 shadow transition-all duration-300"
              >
                Games
              </Link>
            </li>
            <li>
              <Link
                to={"/reviews"}
                className="rounded-3xl bg-purple-600 hover:bg-purple-400 text-gray-50 px-5 py-2 shadow transition-all duration-300"
              >
                Reviews
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default AdminWelcome;
