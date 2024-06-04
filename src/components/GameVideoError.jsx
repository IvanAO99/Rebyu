import React from "react";

import { FaExclamation } from "react-icons/fa6";

/**
 * Component GameVideoError
 *
 * This component displays an error message when the game video is not found or has not been loaded.
 *
 */
const GameVideoError = () => {
  return (
    <>
      <div className="h-full flex flex-row justify-center items-center gap-5 bg-gray-100 dark:bg-gray-800 p-5 text-center">
        <span className="block shadow rounded-full border-2 border-gray-900 dark:border-gray-50 p-2 text-gray-900 dark:text-gray-50">
          <FaExclamation size={48} />
        </span>
        <div>
          <h2 className="text-xl lg:text-3xl xl:text-6xl font-bold">
            VIDEO NOT FOUND<br></br>OR<br></br>VIDEO NOT UPLOADED YET
          </h2>
        </div>
      </div>
    </>
  );
};

export default GameVideoError;
