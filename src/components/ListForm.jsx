import React from "react";

import useLists from "../hooks/useLists.js";

/**
 * Component ListForm
 *
 * This component represents a form for creating or updating a game list.
 * It allows the user to input the name and select the type of the list.
 * It uses the useLists hook to handle logic related to game lists.
 *
 * Props:
 * @param {boolean} creationMode - Boolean indicating whether the form is in creation mode (true) or update mode (false).
 */
const ListForm = ({ creationMode = false }) => {
  const { listToUpdate, updateData, newList, listFormErrors } = useLists();

  return (
    <>
      <div>
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-1">
            <label
              htmlFor="listName"
              className="block text-xl font-bold text-purple-600"
            >
              Name:
            </label>
            {listFormErrors.name && (
              <>
                <p className="text-red-600">{listFormErrors.name}</p>
              </>
            )}
            <input
              autoFocus
              type="text"
              name="name"
              id="listName"
              placeholder="Enter name..."
              value={creationMode ? newList.name : listToUpdate.name}
              onChange={(event) =>
                updateData(event, creationMode ? "creation" : "update")
              }
              className={`border-none focus:outline-none ${
                listFormErrors.name
                  ? "ring-2 ring-red-600 focus:ring-red-600 placeholder-red-600"
                  : "focus:ring-2 focus:ring-purple-600"
              } rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600 shadow`}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="listType"
              className="block text-xl font-bold text-purple-600"
            >
              Type:
            </label>
            {listFormErrors.type && (
              <>
                <p className="text-red-600">{listFormErrors.type}</p>
              </>
            )}
            <select
              id="listType"
              name="type"
              value={creationMode ? newList.type : listToUpdate.type}
              onChange={(event) =>
                updateData(event, creationMode ? "creation" : "update")
              }
              className={`border-none focus:outline-none ${
                listFormErrors.type
                  ? "ring-2 ring-red-600 focus:ring-red-600 placeholder-red-600"
                  : "focus:ring-2 focus:ring-purple-600"
              } rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600 shadow`}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
        </form>
      </div>
    </>
  );
};

export default ListForm;
