import React from "react";

import { FaX } from "react-icons/fa6";

import useLists from "../hooks/useLists.js";

import ListForm from "./ListForm.jsx";

const ListFormModal = () => {
  const { updatingList, hideListFormModal, handleListCreation } = useLists();

  return (
    <>
      <div className="rounded-3xl bg-gray-50 dark:bg-gray-700 p-2 text-gray-900 dark:text-gray-50 shadow">
        <div className="flex flex-row justify-between items-center gap-5 px-5 py-2">
          <h1 className="text-3xl font-bold text-center">
            {updatingList ? "UPDATE LIST" : "CREATE LIST"}
          </h1>
          <button
            type="button"
            className="rounded-full hover:bg-gray-100 hover:dark:bg-gray-800 p-2 text-gray-900 dark:text-gray-50 hover:shadow transition-all duration-300"
            onClick={() => hideListFormModal()}
          >
            <FaX size={24} />
          </button>
        </div>
        <div className="border-y-2 border-gray-100 dark:border-gray-800 px-5 py-2">
          <ListForm creationMode={!updatingList} />
        </div>
        <div>
          <div className="flex flex-row justify-end items-center gap-5 px-5 py-2">
            <button
              type="button"
              className="rounded-3xl bg-purple-600 hover:bg-purple-400 px-5 py-2 text-gray-50 shadow transition-all duration-300"
              onClick={() => {
                updatingList ? handleListCreation() : handleListCreation(true);
              }}
            >
              {updatingList ? "Update" : "Create"}
            </button>
            <button
              type="button"
              className="rounded-3xl bg-gray-800 hover:bg-gray-600 px-5 py-2 text-gray-50 shadow transition-all duration-300"
              onClick={() => hideListFormModal()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListFormModal;
