import React, { useEffect, useState } from "react";

import { FaMoon, FaSun } from "react-icons/fa6";

const ThemeToggler = () => {
  const [theme, setTheme] = useState("light");

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
    <>
      <div>
        <button
          type="button"
          className="rounded-full bg-purple-600 hover:bg-purple-400 text-gray-50 p-2"
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
    </>
  );
};

export default ThemeToggler;
