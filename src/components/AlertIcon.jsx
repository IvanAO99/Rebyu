import React from "react";
import { FaCheck } from "react-icons/fa6";
import { FaExclamation } from "react-icons/fa6";
import { FaInfo } from "react-icons/fa6";

const AlertIcon = ({ theme, type }) => {
  return (
    <>
      {type === "success" ? (
        <>
          <button
            type="button"
            className="shadow rounded-full bg-purple-600 p-2 text-gray-50 transition-all duration-300"
          >
            <FaCheck size={24} />
          </button>
        </>
      ) : type === "error" ? (
        <>
          <button
            type="button"
            className="shadow rounded-full bg-red-600 p-2 text-gray-50 transition-all duration-300"
          >
            <FaExclamation size={24} />
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            className="shadow rounded-full bg-purple-600 p-2 text-gray-50 transition-all duration-300"
          >
            <FaInfo size={24} />
          </button>
        </>
      )}
    </>
  );
};

export default AlertIcon;
