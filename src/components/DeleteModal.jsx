import React from "react";

import { FaX } from "react-icons/fa6";

/**
 * DeleteModal Component
 *
 * This component represents a deletion modal that shows a title, content, and buttons to confirm or cancel the deletion.
 * It uses the FaX icon from the react-icons/fa6 library for the close button. It provides functions to hide the modal (hideFunction) and perform the deletion (deleteFunction).
 *
 * Props:
 * @param {ReactNode} children - Modal content.
 * @param {string} title - Modal title.
 * @param {Function} hideFunction - Function to hide the modal.
 * @param {Function} deleteFunction - Function to perform the deletion.
 *
 */
const DeleteModal = ({ children, title, hideFunction, deleteFunction }) => {
  return (
    <>
      <div className="rounded-3xl bg-gray-50 dark:bg-gray-700 p-2 text-gray-900 dark:text-gray-50 shadow">
        <div className="flex flex-row justify-between items-center gap-5 px-5 py-2">
          <h1 className="text-3xl font-bold text-center">{title}</h1>
          <button
            type="button"
            className="rounded-full hover:bg-gray-100 hover:dark:bg-gray-800 p-2 text-gray-900 dark:text-gray-50 hover:shadow transition-all duration-300"
            onClick={() => hideFunction()}
          >
            <FaX size={24} />
          </button>
        </div>
        <div className="border-y-2 border-gray-100 dark:border-gray-800 px-5 py-2 text-center">
          {children}
        </div>
        <div>
          <div className="flex flex-row justify-end items-center gap-5 px-5 py-2">
            <button
              type="button"
              className="rounded-3xl bg-red-600 hover:bg-red-400 px-5 py-2 text-gray-50 shadow transition-all duration-300"
              onClick={() => {
                deleteFunction("delete");
              }}
            >
              Delete
            </button>
            <button
              type="button"
              className="rounded-3xl bg-gray-800 hover:bg-gray-600 px-5 py-2 text-gray-50 shadow transition-all duration-300"
              onClick={() => hideFunction()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
