import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import useUsers from "../hooks/useUsers";
import { validateObject } from "../libraries/validateData";

const Header = () => {
  const { isSessionUp, user, signOut } = useUsers();

  console.log(user);

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
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 w-full z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-8">
        {/* Logo y marca */}
        <div className="flex items-center justify-center md:justify-start">
          <img
            src="src/assets/logo.svg"
            alt="Logo"
            className="h-20 w-auto mr-2"
          />
          <span className="font-bold text-4xl mr-4 tracking-widest">REBYU</span>
        </div>

        {/* Navegación */}
        <nav className="flex flex-col md:flex-row md:ml-auto md:space-x-4 mt-4 md:mt-0">
          <ul className="flex flex-col mb-5 md:mb-0 text-center md:flex-row">
            <li>
              <Link
                to="/"
                className="text-gray-800 hover:text-gray-600 mx-5 md:mr-10 text-lg"
              >
                Home
              </Link>
            </li>
            <li>
              <a
                href="#recommended"
                className="text-gray-800 hover:text-gray-600 mx-5 md:mr-10 text-lg"
              >
                Recommended
              </a>
            </li>
            <li>
              <a
                href="#about-us"
                className="text-gray-800 hover:text-gray-600 mx-5 md:mr-10 text-lg"
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
            className="rounded-full bg-purple-800 text-gray-50 p-2"
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
                    user.profile_photo || "src/assets/profile-photo-default.jpg"
                  }
                  alt="User"
                  className="h-10 w-10 rounded-full cursor-pointer hover:opacity-75"
                  onClick={toggleMenu}
                />
                {isMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg"
                    onClick={(e) => {
                      if (e.target.tagName === "A") toggleMenu();
                    }}
                  >
                    <ul className="py-2">
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Lists
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/affiliate"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Affiliate
                        </Link>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="bg-red-600 text-white px-5 py-2"
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
                className="ml-4 text-gray-800 hover:underline"
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
  );
};

export default Header;
