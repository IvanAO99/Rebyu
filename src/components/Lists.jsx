import React, { Fragment } from "react";
import List from "./List.jsx";
import { FaPlus } from "react-icons/fa6";
import useLists from "../hooks/useLists.js";
import { validateArray } from "../libraries/validateData.js";
import ActiveListForm from "./ActiveListForm.jsx";
const Lists = () => {
  const { userLists, showListFormModal } = useLists();
  return (
    <Fragment>
      <div id="lists">
        <div className="flex flex-row justify-stretch items-center gap-5 py-2">
          <div className="border-y-2 border-purple-600"></div>
          <h2 className="text-5xl font-bold">LISTS</h2>
          <button
            type="button"
            className="rounded-full bg-purple-600 hover:bg-purple-400 text-gray-50 p-2 transition-all duration-300"
            onClick={() => {
              showListFormModal(false);
            }}
          >
            <FaPlus size={24} />
          </button>
          <div className="flex-grow border-y-2 border-purple-600"></div>
        </div>
          <ActiveListForm />
        <div className="rounded-3xl shadow">
          {validateArray(userLists) ? (
            userLists.map((list, index) => (
              <Fragment key={index}>
                <List list={list} />
              </Fragment>
            ))
          ) : (
            <p>Lists not found</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Lists;
