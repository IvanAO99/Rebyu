import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaX } from "react-icons/fa6";

import useUsers from "../hooks/useUsers.js";

import ThemeToggler from "../components/ThemeToggler.jsx";

import { validateObject } from "../libraries/validateData.js";

/**
 * Componente Header
 *
 * Este componente renderiza la cabecera de la aplicación, que incluye el logo, la navegación y el interruptor de tema.
 * El contenido de la cabecera puede variar dependiendo de si el usuario está autenticado y si es un administrador.
 *
 */

const Header = () => {
  const navigate = useNavigate();

  const { isSessionUp, user, signOut, isAdmin } = useUsers();

  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleHeader = () => {
    setIsHeaderOpen(!isHeaderOpen);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [user]);

  return (
    <>
      {isSessionUp && validateObject(user) && isAdmin ? (
        <></>
      ) : (
        <>
          <header
            className={`${
              isHeaderOpen
                ? "fixed md:sticky z-[99] md:z-50 h-screen md:h-auto"
                : "sticky"
            } top-0 z-50 shadow w-full bg-gray-200 dark:bg-gray-800`}
          >
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-stretch md:items-center px-5">
              {/* Logo y marca */}
              <div className="flex flex-row justify-between md:justify-center items-center gap-2">
                <img
                  src="./src/assets/logo.svg"
                  alt="Logo"
                  className="h-32 w-32"
                />
                <span className="hidden lg:block font-bold text-4xl tracking-widest">
                  REBYU
                </span>
                <div className="block md:hidden">
                  <button
                    type="button"
                    className="rounded-full act p-2 text-gray-900 dark:text-gray-50 hover:shadow transition-all duration-500"
                    onClick={() => toggleHeader()}
                  >
                    {isHeaderOpen ? (
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
                className={`${
                  isHeaderOpen ? "block md:flex" : "hidden md:flex"
                } flex-col md:flex-row justify-start items-center gap-5`}
              >
                {/* Navegación */}
                <nav className="flex flex-col md:flex-row mr-5">
                  <ul
                    className="flex flex-col md:flex-row gap-0 md:gap-5 divide-y-2 divide-gray-300/50 dark:divide-gray-900/50 md:divide-y-0 text-center"
                    onClick={(e) => {
                      if (e.target.tagName === "A") toggleHeader();
                    }}
                  >
                    <li className="py-5 md:p-0">
                      <Link
                        to="/"
                        className="font-bold hover:text-purple-600 text-lg transition-all duration-500"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="py-5 md:p-0">
                      <a
                        href="#recommended"
                        className="font-bold hover:text-purple-600 text-lg transition-all duration-500"
                      >
                        Recommended
                      </a>
                    </li>
                    <li className="py-5 md:p-0">
                      <a
                        href="#about-us"
                        className="font-bold hover:text-purple-600 text-lg transition-all duration-500"
                      >
                        About Us
                      </a>
                    </li>
                  </ul>
                </nav>
                <div className="flex flex-col gap-5 md:hidden">
                  <div className="flex flex-row justify-between items-center gap-2">
                    {isSessionUp && validateObject(user) ? (
                      <>
                        <div className="flex flex-row justify-start items-center gap-2">
                          <img
                            src={
                              user.profile_photo ||
                              "src/assets/profile-photo-default.jpg"
                            }
                            alt="User"
                            className="h-16 w-16 rounded-full object-cover"
                          />
                          <p>
                            <span>@</span>
                            {user.nickname}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <button
                            className="rounded-3xl px-5 py-2 bg-purple-800 hover:bg-purple-600 text-gray-50 transition-all"
                            onClick={() => {
                              toggleHeader();
                              navigate("/login");
                            }}
                          >
                            Sign In
                          </button>
                        </div>
                      </>
                    )}
                    <div>
                      <ThemeToggler />
                    </div>
                  </div>
                  {isSessionUp && validateObject(user) && (
                    <>
                      <div className="flex flex-col gap-2 bg-gray-100 dark:bg-gray-700">
                        <ul
                          className="divide-y-2 divide-gray-200/50 dark:divide-gray-800/50  text-center"
                          onClick={(e) => {
                            if (e.target.tagName === "A") toggleHeader();
                          }}
                        >
                          <li className="py-5">
                            <Link
                              to="/profile"
                              className="block font-bold hover:text-purple-600  px-5 py-2 transition-all duration-300"
                            >
                              Profile
                            </Link>
                          </li>
                          <li className="py-5">
                            <Link
                              to="/profile"
                              className="block font-bold hover:text-purple-600 px-5 py-2 transition-all duration-300"
                            >
                              Lists
                            </Link>
                          </li>
                          <li className="py-5">
                            <Link
                              to="/affiliate"
                              className="block font-bold hover:text-purple-600 px-5 py-2 transition-all duration-300"
                            >
                              Affiliate
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="self-center rounded-full bg-red-600 hover:bg-red-400 text-gray-50 px-5 py-2  transition-all duration-300"
                          onClick={() => signOut()}
                        >
                          Log out
                        </button>
                      </div>
                    </>
                  )}
                </div>
                {/* Light/Dark mode toggle */}
                <div className="hidden md:block">
                  <ThemeToggler />
                </div>
                {/* Foto de usuario y menú */}
                <div className="hidden md:flex items-center gap-2">
                  {isSessionUp && validateObject(user) ? (
                    <>
                      <div className="relative">
                        <img
                          src={
                            user.profile_photo ||
                            "src/assets/profile-photo-default.jpg"
                          }
                          alt="User"
                          className="cursor-pointer h-16 w-16 rounded-full object-cover"
                          onClick={toggleMenu}
                        />
                        {isMenuOpen && (
                          <>
                            <span
                              style={{
                                content: "''",
                                position: "absolute",
                                left: "50%",
                                right: "50%",
                                transform: "translateX(-50%)",
                                borderWidth: "10px",
                                borderStyle: "solid",
                              }}
                              className="shadow-2xl border-t-transparent border-r-transparent border-l-transparent border-b-gray-100 dark:border-b-gray-700"
                            ></span>
                            <div
                              className="absolute right-0 mt-[20px] w-60 flex flex-col gap-2 bg-gray-100 dark:bg-gray-700 rounded-3xl p-2 shadow-2xl overflow-hidden"
                              onClick={(e) => {
                                if (e.target.tagName === "A") toggleMenu();
                              }}
                            >
                              <ul className="divide-y-2 divide-gray-200/50 dark:divide-gray-800/50  text-center">
                                <li>
                                  <Link
                                    to="/profile"
                                    className="block font-bold hover:text-purple-600  px-5 py-2 transition-all duration-300"
                                  >
                                    Profile
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/profile"
                                    className="block font-bold hover:text-purple-600 px-5 py-2 transition-all duration-300"
                                  >
                                    Lists
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/affiliate"
                                    className="block font-bold hover:text-purple-600 px-5 py-2 transition-all duration-300"
                                  >
                                    Affiliate
                                  </Link>
                                </li>
                                <li className="px-5 py-2">
                                  <button
                                    type="button"
                                    className="self-center rounded-full bg-red-600 hover:bg-red-400 text-gray-50 px-5 py-2  transition-all duration-300"
                                    onClick={() => signOut()}
                                  >
                                    Log out
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </>
                        )}
                      </div>
                      <p>
                        <span>@</span>
                        {user.nickname}
                      </p>
                    </>
                  ) : (
                    <>
                      {/* Botón de iniciar sesión */}
                      <button
                        className="rounded-3xl bg-purple-600 hover:bg-purple-400 px-5 py-2 text-gray-50 transition-all duration-500"
                        onClick={() => {
                          navigate("/login");
                        }}
                      >
                        Sign In
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </header>
        </>
      )}
    </>
    /* <header className={`bg-gray-100 dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-900 sticky top-0 w-full z-50 ${isAdmin ? 'hidden' : ''}`}> */
  );
};

export default Header;
