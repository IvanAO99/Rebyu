import React, { Fragment } from "react";
import List from "./List.jsx";
import { FaPlus } from "react-icons/fa6";
import useLists from "../hooks/useLists.js";
import { validateArray } from "../libraries/validateData.js";
const Lists = () => {
  const { userLists } = useLists();
  return (
    <Fragment>
      <div id="lists">
        <div className="flex flex-row justify-stretch items-center gap-5 py-2">
          <div className="border-y-2 border-purple-800"></div>
          <h2 className="text-5xl font-bold">LISTS</h2>
          <button
            type="button"
            className="border-none rounded-full bg-purple-800 text-white p-2"
          >
            <FaPlus size={24} />
          </button>
          <div className="flex-grow border-y-2 border-purple-800"></div>
        </div>
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
