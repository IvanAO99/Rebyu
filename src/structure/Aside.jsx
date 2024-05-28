import React from "react";
import useUsers from "../hooks/useUsers";
import { NavLink } from "react-router-dom";
import ThemeToggler from "../components/ThemeToggler";

const Aside = () => {
  const { user, signOut } = useUsers();

  return (
    <>
      <aside className="bg-gray-100 dark:bg-gray-800">
        <div className="sticky top-0 flex flex-col gap-5">
          <div className="flex flex-col gap-5 px-5 pt-5">
            <div className="flex flex-row justify-center items-center gap-2">
              <img
                src="./src/assets/logo.svg"
                alt="Logo"
                className="h-32 w-32"
              />
              <span className="font-bold text-4xl tracking-widest">REBYU</span>
            </div>
            <div className="flex flex-row justify-between items-center gap-5">
              <div className="flex flex-row justify-center items-center gap-2">
                <img
                  src={
                    user.profile_photo ||
                    "./src/assets/profile-photo-default.jpg"
                  }
                  alt="User"
                  className="h-16 w-16 rounded-full object-cover"
                />
                <p>
                  <span>@</span>
                  {user.nickname}
                </p>
              </div>
              <ThemeToggler />
            </div>
            {/*           <h1 className="text-6xl font-bold">
            Welcome, <span className="text-purple-600">{user.name}</span>
          </h1>
          <p className="italic">What do you want to manage today?</p> */}
          </div>
          <div className="flex-grow flex flex-col gap-5 ml-5 pb-5">
            <nav>
              <ul className="flex flex-col text-center">
                <li className="w-full">
                  <NavLink
                    to="/games"
                    className={({ isActive }) =>
                      `block w-full rounded-l-3xl pr-5 py-5 ${
                        isActive
                          ? "bg-gray-50 dark:bg-gray-700"
                          : "hover:bg-gray-50 hover:dark:bg-gray-700"
                      }`
                    }
                  >
                    GAMES
                  </NavLink>
                </li>
                <li className="w-full">
                  <NavLink
                    to="/reviews"
                    className={({ isActive }) =>
                      `block w-full rounded-l-3xl pr-5 py-5 ${
                        isActive
                          ? "bg-gray-50 dark:bg-gray-700"
                          : "hover:bg-gray-50 hover:dark:bg-gray-700"
                      }`
                    }
                  >
                    REVIEWS
                  </NavLink>
                </li>
              </ul>
            </nav>
            <div className="self-center mr-5">
              <button
                type="button"
                className="rounded-3xl bg-red-600 hover:bg-red-400 px-5 py-2 text-gray-50"
                onClick={() => signOut()}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Aside;
