import React from "react";

import { FaCheck } from "react-icons/fa6";
import { FaExclamation } from "react-icons/fa6";
import { FaInfo } from "react-icons/fa6";

/**
 * AlertIcon Component
 *
 * This component represents an icon for alert notifications.
 * It can display different icons depending on the type of notification
 * (success, error, or information). It uses icons from the react-icons/fa6 library
 * (FaCheck, FaExclamation, and FaInfo) and applies styles based on the notification type.
 *
 * Props:
 * @param {string} type - Type of icon to display (success, error, info).
 *
 */
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
