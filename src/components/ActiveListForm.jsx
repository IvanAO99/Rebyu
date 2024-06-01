import React, { useEffect } from "react";
import useLists from "../hooks/useLists";
import { validateArray } from "../libraries/validateData";

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
          onProfile ? "w-max mx-auto" : "fixed bottom-0 left-0 z-50 m-5"
        } flex flex-row justify-between items-center gap-2 shadow rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2`}
      >
        <label htmlFor="active-list">
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
