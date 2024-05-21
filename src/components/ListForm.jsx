import React from "react";

import useLists from "../hooks/useLists.js";

const ListForm = ({ creationMode = false }) => {
  const { listToUpdate, updateData, updateList, newList, createList } =
    useLists();

  return (
    <form className="max-w-md mx-auto mt-8 p-4 bg-gray-100 shadow-md rounded-md">
      <div className="mb-4">
        <label
          htmlFor="listName"
          className="block text-gray-700 font-bold mb-2"
        >
          Name:
        </label>
        <input
          type="text"
          name="name"
          id="listName"
          value={creationMode ? newList.name : listToUpdate.name}
          onChange={(event) =>
            updateData(event, creationMode ? "creation" : "update")
          }
          className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="listType"
          className="block text-gray-700 font-bold mb-2"
        >
          Type:
        </label>
        <select
          id="listType"
          name="type"
          value={creationMode ? newList.type : listToUpdate.type}
          onChange={(event) =>
            updateData(event, creationMode ? "creation" : "update")
          }
          className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
    </form>
  );
};

export default ListForm;
