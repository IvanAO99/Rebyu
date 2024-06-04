import React, { useEffect } from "react";

import useLists from "../hooks/useLists.js";

import { validateArray } from "../libraries/validateData.js";

/**
 * ActiveListForm Component
 *
 * This component displays a form to select an active list.
 * It uses the useLists hook to get the user lists and control
 * the active list. It allows the user to change the active list
 * through a dropdown menu. If there is no selected list and
 * there are user lists available, it automatically selects
 * the first list as the active list.
 *
 * Props:
 * @param {boolean} onProfile - Indicates whether the form is displayed on the user's profile. Default is true.
 *
 */
const ActiveListForm = ({ onProfile = true }) => {
  const { userLists, changeActiveList, selectedList } = useLists();

  const handleSelectChange = (event) => {
    const selectedListId = event.target.value;
    changeActiveList(selectedListId);
  };

  useEffect(() => {
    if (!selectedList && validateArray(userLists)) {
      changeActiveList(userLists[0].id);
    }
  }, [selectedList, userLists, changeActiveList]);

  return (
    <>
      <div
        className={` ${
          onProfile
            ? "w-max flex flex-col sm:flex-row justify-between items-start sm:items-center mx-auto"
            : "fixed bottom-0 left-0 z-50 shadow-2xl flex flex-row justify-between items-center m-5"
        }  gap-2 shadow rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2`}
      >
        <label
          htmlFor="active-list"
          className={`${onProfile ? "block" : "hidden md:block"}`}
        >
          Select your list to add to favorites!
        </label>
        <select
          name="active-list"
          onChange={(e) => {
            handleSelectChange(e);
          }}
          value={selectedList ? selectedList.id : "None"}
          className="cursor-pointer border-none focus:outline-none focus:ring-2 focus:ring-purple-600 rounded-3xl bg-gray-200 dark:bg-gray-900 px-5 py-2 caret-purple-600 shadow"
        >
          {validateArray(userLists) ? (
            userLists.map((list, index) => (
              <option key={index} value={list.id}>
                {list.name.toUpperCase()}
              </option>
            ))
          ) : (
            <option value="none">No lists found</option>
          )}
        </select>
      </div>
    </>
  );
};

export default ActiveListForm;
