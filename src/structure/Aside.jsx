import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import { FaBars, FaX } from "react-icons/fa6";

import useUsers from "../hooks/useUsers.js";

import ThemeToggler from "../components/ThemeToggler.jsx";

/**
 * Componente Aside
 *
 * Este componente representa el menú lateral de la aplicación, que contiene información del usuario autenticado,
 * opciones de navegación y un botón para cambiar el tema de la aplicación. También incluye un botón para cerrar sesión.
 *
 */
const Aside = () => {
  const { user, signOut } = useUsers();

  const [isAsideOpen, setIsAsideOpen] = useState();

  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  return (
    <>
      <aside className="bg-gray-100 dark:bg-gray-800">
        <div className="sticky top-0 flex flex-col gap-5">
          <div className="flex flex-col gap-5 px-5 pt-5">
            <div className="flex flex-row justify-center items-center gap-2">
              <img
                src="./src/assets/img/logo.svg"
                alt="Logo"
                className={` ${
                  isAsideOpen ? "block" : "hidden xl:block "
                } h-32 w-32`}
              />
              <span className="hidden xl:block font-bold text-4xl tracking-widest">
                REBYU
              </span>
              <div className="block xl:hidden">
                <button
                  type="button"
                  className="rounded-full act p-2 text-gray-900 dark:text-gray-50 hover:shadow transition-all duration-500"
                  onClick={() => toggleAside()}
                >
                  {isAsideOpen ? (
                    <>
                      <FaX size={48} />
                    </>
                  ) : (
                    <>
                      <FaBars size={48} />
                    </>
                  )}
                </button>
              </div>
            </div>
            <div
              className={` ${
                isAsideOpen ? "flex" : "hidden xl:flex"
              } flex-row justify-between items-center gap-5 `}
            >
              <div className="flex flex-row justify-center items-center gap-2">
                <img
                  src={
                    user.profile_photo ||
                    "./src/assets/img/default-profile-photo.jpg"
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
          </div>
          <div
            className={` ${
              isAsideOpen ? "flex" : "hidden xl:flex"
            } flex-grow flex-col gap-5 ml-5 pb-5 `}
          >
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
