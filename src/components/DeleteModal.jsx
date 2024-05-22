import React from "react";
import { FaX } from "react-icons/fa6";

const DeleteModal = ({ children, title, hideFunction, deleteFunction }) => {
  return (
    <>
      <div className="rounded-3xl bg-gray-50 dark:bg-gray-700 p-2 text-gray-900 dark:text-gray-50 shadow">
        <div className="flex flex-row justify-between items-center gap-5 px-5 py-2">
          <h1 className="text-3xl font-bold text-center">{title}</h1>
          <button
            type="button"
            className="rounded-full hover:bg-gray-100 hover:dark:bg-gray-800 p-2 text-gray-900 dark:text-gray-50 hover:shadow"
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
              className="rounded-3xl bg-red-600 hover:bg-red-400 px-5 py-2 text-gray-50 shadow"
              onClick={() => {
                deleteFunction("delete");
              }}
            >
              Delete
            </button>
            <button
              type="button"
              className="rounded-3xl bg-gray-800 hover:bg-gray-600 px-5 py-2 text-gray-50 shadow"
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
