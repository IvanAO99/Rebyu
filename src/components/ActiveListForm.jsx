import React, { useEffect } from "react";
import useLists from "../hooks/useLists";
import { validateArray } from "../libraries/validateData";

const ActiveListForm = () => {
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
    <form>
      <select
        name="active-list"
        onChange={(e) => {
          handleSelectChange(e);
        }}
        value={selectedList ? selectedList.id : "None"}
      >
        <option value="">
          None
        </option>
        {validateArray(userLists) ? (
          userLists.map((list, index) => (
            <option key={index} value={list.id}>
              {list.name}
            </option>
          ))
        ) : (
          <option value="none">No lists found</option>
        )}
      </select>
    </form>
  );
};

export default ActiveListForm;
