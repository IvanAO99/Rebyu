import React, { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
              <a
                href="#home"
                className="text-gray-800 hover:text-gray-600 mx-5 md:mr-10 text-lg"
              >
                Home
              </a>
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

        {/* Foto de usuario y menú */}
        <div className="flex items-center">
          <div className="relative">
            <img
              src="src/assets/profile-photo-default.jpg"
              alt="User"
              className="h-10 w-10 rounded-full cursor-pointer hover:opacity-75"
              onClick={toggleMenu}
            />
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                <ul className="py-2">
                  <li>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Lists
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Affiliate
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-white bg-red-400 hover:bg-red-300"
                    >
                      Log out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Botón de iniciar sesión */}
          <button className="ml-4 text-gray-800 hover:underline hidden">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
