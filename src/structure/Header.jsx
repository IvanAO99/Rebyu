import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa6";

import useUsers from "../hooks/useUsers.js";

import { validateObject } from "../libraries/validateData.js";

const Header = () => {
  const { isSessionUp, user, signOut, isAdmin } = useUsers();

  const [theme, setTheme] = useState("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [user]);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      {isSessionUp && validateObject(user) && isAdmin ? (
        <></>
      ) : (
        <>
          <header className="bg-gray-100 dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-900 sticky top-0 w-full z-50">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-8">
              {/* Logo y marca */}
              <div className="flex items-center justify-center md:justify-start">
                <img
                  src="src/assets/logo.svg"
                  alt="Logo"
                  className="h-20 w-auto mr-2"
                />
                <span className="font-bold text-4xl mr-4 tracking-widest">
                  REBYU
                </span>
              </div>
              {/* Navegación */}
              <nav className="flex flex-col md:flex-row md:ml-auto md:space-x-4 mt-4 md:mt-0">
                <ul className="flex flex-col mb-5 md:mb-0 text-center md:flex-row">
                  <li>
                    <Link
                      to="/"
                      className="hover:font-bold hover:text-purple-800 mx-5 md:mr-10 text-lg"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#recommended"
                      className="hover:font-bold hover:text-purple-800 mx-5 md:mr-10 text-lg"
                    >
                      Recommended
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about-us"
                      className="hover:font-bold hover:text-purple-800 mx-5 md:mr-10 text-lg"
                    >
                      About Us
                    </a>
                  </li>
                </ul>
              </nav>
              {/* Light/Dark mode toggle */}
              <div>
                <button
                  type="button"
                  className="rounded-full bg-purple-800 hover:bg-purple-600 text-gray-50 p-2"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? (
                    <>
                      <FaSun size={24} />
                    </>
                  ) : (
                    <>
                      <FaMoon size={24} />
                    </>
                  )}
                </button>
              </div>
              {/* Foto de usuario y menú */}
              <div className="flex items-center">
                {isSessionUp && validateObject(user) ? (
                  <>
                    <div className="relative">
                      <img
                        src={
                          user.profile_photo ||
                          "src/assets/profile-photo-default.jpg"
                        }
                        alt="User"
                        className="object-cover h-10 w-10 rounded-full cursor-pointer hover:opacity-75"
                        onClick={toggleMenu}
                      />
                      {isMenuOpen && (
                        <div
                          className="absolute right-0 mt-2 w-48 bg-gray-100 dark:bg-gray-700 rounded-3xl shadow overflow-hidden"
                          onClick={(e) => {
                            if (e.target.tagName === "A") toggleMenu();
                          }}
                        >
                          <ul className="divide-y divide-gray-200 dark:divide-gray-800 text-center">
                            <li>
                              <Link
                                to="/profile"
                                className="block hover:bg-purple-600  px-5 py-2"
                              >
                                Profile
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/profile"
                                className="block hover:bg-purple-600 px-5 py-2"
                              >
                                Lists
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/affiliate"
                                className="block hover:bg-purple-600 px-5 py-2"
                              >
                                Affiliate
                              </Link>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="w-full px-5 py-2 bg-red-600 hover:bg-red-400 text-gray-50"
                                onClick={() => signOut()}
                              >
                                Log out
                              </button>
                            </li>
                          </ul>
                        </div>
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
                      className="rounded-3xl px-5 py-2 bg-purple-800 hover:bg-purple-600 text-gray-50 transition-all"
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
          </header>
        </>
      )}
    </>
    /* <header className={`bg-gray-100 dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-900 sticky top-0 w-full z-50 ${isAdmin ? 'hidden' : ''}`}> */
  );
};

export default Header;
