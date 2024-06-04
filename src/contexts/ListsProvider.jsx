import React, { createContext, useEffect, useState } from "react";

import { supabaseConnection } from "../.config/supabase.js";
import { toast, Slide } from "react-toastify";

import useUsers from "../hooks/useUsers.js";

import AlertIcon from "../components/AlertIcon.jsx";

import { validateArray, validateObject } from "../libraries/validateData.js";

const ListsContext = createContext();

const ListsProvider = ({ children }) => {
  const { user, userCreation, cancelUserCreation, idUserCreated } = useUsers();

  /* INITIAL STATES VALUES */

  const initialValues = {
    defaultList: {
      name: "FAVOURITES",
      type: "public",
      creator_id: "",
    },
    userLists: [],
    selectedList: {},
    listToUpdate: {
      name: "",
      type: "public",
    },
    newList: {
      name: "",
      type: "public",
    },
    updatingList: false,
    isListModalOpen: false,
    listFormErrors: {},
  };

  /* STATES */

  const [userLists, setUserLists] = useState(initialValues.userLists);
  const [selectedList, setSelectedList] = useState(initialValues.selectedList);
  const [listToUpdate, setListToUpdate] = useState(initialValues.listToUpdate);
  const [listToDelete, setListToDelete] = useState(initialValues.listToUpdate);
  const [newList, setNewList] = useState(initialValues.newList);

  const [updatingList, setUpdatingList] = useState(initialValues.updatingList);

  const [isListFormModalOpen, setIsListFormModalOpen] = useState(
    initialValues.isListModalOpen
  );
  const [isDeleteListModalOpen, setIsDeleteListModalOpen] = useState(
    initialValues.isListModalOpen
  );

  const [listFormErrors, setListFormErrors] = useState(
    initialValues.listFormErrors
  );

  const [gameAdded, setGameAdded] = useState(false);

  /* FUNCTIONS */

  /**
   * Sends a list alert with the specified type and message.
   *
   * @param {string} type - The type of alert to display (success or error).
   * @param {string} message - The message to display in the alert.
   *
   */
  const sendListAlert = (type, message) => {
    const notify = () => {
      switch (type) {
        case "success":
          toast.success(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            icon: AlertIcon,
            transition: Slide,
          });
          break;
        case "error":
          toast.error(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            icon: AlertIcon,
            transition: Slide,
          });
          break;
        default:
          break;
      }
    };

    notify();
  };

  /**
   * Creates a default list for the specified user ID.
   *
   * @param {string} userID - The ID of the user for whom to create the default list.
   *
   */
  const createDefaultList = async (userID) => {
    try {
      const { data, error } = await supabaseConnection
        .from("lists")
        .insert({
          ...initialValues.defaultList,
          ["creator_id"]: userID,
        })
        .select();

      if (error) throw error;
    } catch (error) {
      sendListAlert("error", "Something went wrong!");
    }
  };

  /**
   * Retrieves lists belonging to the current user from the database.
   *
   */
  const getListsFromUser = async () => {
    try {
      const { data, error } = await supabaseConnection
        .from("lists")
        .select("*, games_on_list(games(*))")
        .eq("creator_id", user.id);

      if (error) throw error;

      setUserLists(data);

      const favouritesList = data.find(
        (list) => list.name.toUpperCase() === "FAVOURITES"
      );

      if (!validateObject(selectedList) && favouritesList) {
        setSelectedList(favouritesList);
      } else if (selectedList.id) {
        const updatedList = data.find((list) => list.id === selectedList.id);
        setSelectedList(updatedList);
      }
    } catch (error) {
      sendListAlert("error", "Something went wrong!");
    }
  };

  /**
   * Adds a game to the selected list if the user is authenticated and the game is not already in the list.
   *
   * @param {string} gameID - The ID of the game to add to the list.
   *
   */
  const addGameToList = async (gameID) => {
    if (user.id && !checkGameInList(gameID)) {
      try {
        const { data, error } = await supabaseConnection
          .from("games_on_list")
          .insert({
            game_id: gameID,
            list_id: selectedList.id,
          })
          .select();

        if (error) throw error;

        await getListsFromUser();
        const updatedList = userLists.find(
          (list) => list.id === selectedList.id
        );
        setSelectedList(updatedList);

        setGameAdded(true);
        sendListAlert("success", "Game added to list successfully!");
      } catch (error) {
        sendListAlert(
          "error",
          "Something went wrong, the game could not be added to list!"
        );
      }
    } else {
      sendListAlert("error", "The game is already on the active list!");
    }
  };

  /**
   * Refreshes the user's lists by fetching them from the database.
   *
   */
  const refreshListsFromUser = () => {
    getListsFromUser();
  };

  /**
   * Removes a game from a specified list if the user is authenticated.
   *
   * @param {string} gameID - The ID of the game to remove from the list.
   * @param {string} listID - The ID of the list from which to remove the game.
   *
   */
  const removeGameFromList = async (gameID, listID) => {
    if (user.id) {
      try {
        const { error } = await supabaseConnection
          .from("games_on_list")
          .delete()
          .eq("game_id", gameID)
          .eq("list_id", listID);

        if (error) throw new Error(`The game could not be deleted!`);

        getListsFromUser();

        sendListAlert("success", "Game removed from list successfully!");
      } catch (error) {
        sendListAlert(
          "error",
          "Something went wrong, the game could not be removed from list!"
        );
      }
    }
  };

  /**
   * Changes the active list based on the provided list ID if the user's lists are valid.
   *
   * @param {string} listID - The ID of the list to set as active.
   *
   */
  const changeActiveList = (listID) => {
    if (validateArray(userLists)) {
      userLists.map((list) => {
        if (list.id === listID) setSelectedList(list);
      });
    }
  };

  /**
   * Checks if a game exists in the selected list.
   *
   * @param {string} gameID - The ID of the game to check.
   *
   * @returns {boolean} - Whether the game is in the active list.
   *
   */
  const checkGameInList = (gameID) => {
    let gameInList = false;
    if (selectedList && validateArray(selectedList.games_on_list)) {
      const gameIDsOnList = selectedList.games_on_list.map(
        (item) => item.games.id
      );
      if (gameIDsOnList.includes(gameID)) gameInList = true;
    }
    return gameInList;
  };

  /**
   * Sets the list to be updated.
   *
   * @param {object} list - The list to update.
   *
   */
  const selectListToUpdate = (list) => {
    setListToUpdate(list);
  };

  /**
   * Updates the details of a list.
   *
   */
  const updateList = async () => {
    try {
      const { data, error } = await supabaseConnection
        .from("lists")
        .update({
          name: listToUpdate.name,
          type: listToUpdate.type,
        })
        .eq("id", listToUpdate.id);

      if (error) throw error;

      getListsFromUser();

      setUpdatingList(initialValues.updatingList);
      setIsListFormModalOpen(initialValues.isListModalOpen);

      sendListAlert("success", "List updated successfully!");
    } catch (error) {
      sendListAlert(
        "error",
        "Something went wrong, the list could not be updated!"
      );
    } finally {
      setListToUpdate(initialValues.listToUpdate);
    }
  };

  /**
   * Deletes a list.
   *
   */
  const deleteList = async () => {
    try {
      const { data, error } = await supabaseConnection
        .from("lists")
        .delete()
        .eq("id", listToDelete.id);

      if (error) throw error;

      getListsFromUser();

      setListToDelete({});
      setIsDeleteListModalOpen(initialValues.isListModalOpen);

      sendListAlert("success", "List deleted successfully!");
    } catch (error) {
      sendListAlert(
        "error",
        "Something went wrong, the list could not be deleted!"
      );
    }
  };

  /**
   * Creates a new list.
   *
   */
  const createList = async () => {
    try {
      const { data, error } = await supabaseConnection
        .from("lists")
        .insert({
          ...newList,
          creator_id: user.id,
        })
        .select();

      if (error) throw error;

      getListsFromUser();
      hideListFormModal();

      sendListAlert("success", "List created successfully!");
    } catch (error) {
      sendListAlert(
        "error",
        "Something went wrong, the list could not be created."
      );
    } finally {
      setNewList(initialValues.newList);
    }
  };

  /**
   * Updates data based on the provided event and mode.
   *
   * @param {object} event - The event object containing the updated data.
   * @param {string} mode - The mode of the update (creation or update).
   *
   */
  const updateData = (event, mode) => {
    const { name, value } = event.target;
    if (mode === "creation") {
      setNewList({ ...newList, [name]: value });
    } else if (mode === "update") {
      setListToUpdate({ ...listToUpdate, [name]: value });
    }
  };

  /**
   * Shows the list form modal for creating or updating a list.
   *
   * @param {boolean} isUpdate - Indicates whether the operation is an update.
   * @param {Object} [list=null] - The list to be updated. This parameter is optional and defaults to null.
   *
   */
  const showListFormModal = (isUpdate, list = null) => {
    if (isUpdate && validateObject(list)) {
      selectListToUpdate(list);
      setUpdatingList(true);
    } else {
      setUpdatingList(initialValues.updatingList);
    }

    setIsListFormModalOpen(true);
  };

  /**
   * Hides the list form modal.
   *
   */
  const hideListFormModal = () => {
    setUpdatingList(initialValues.updatingList);
    setIsListFormModalOpen(initialValues.isListModalOpen);
  };

  /**
   * Shows the list delete confirmation modal.
   *
   * @param {Object} list - The list to be deleted.
   *
   */
  const showListDeleteModal = (list) => {
    setListToDelete(list);
    setIsDeleteListModalOpen(true);
  };

  /**
   * Hides the list delete confirmation modal.
   *
   */
  const hideListDeleteModal = () => {
    setListToDelete({});
    setIsDeleteListModalOpen(initialValues.isListModalOpen);
  };

  /**
   * Checks if a list with the provided name already exists.
   *
   * @param {string} ListName - The name of the list to check.
   *
   */
  const isListAlreadyCreated = (ListName) => {
    return userLists.some(
      (list) => list.name.toUpperCase() === ListName.toUpperCase()
    );
  };

  /**
   * Validates the form data for creating or updating a list.
   *
   * @param {boolean} creationMode - Indicates whether the form is for creating a new list.
   *  If true, it validates `newList`. Otherwise, it validates `listToUpdate`.
   *
   */
  const validateListForm = (creationMode) => {
    let validationErrors = {};

    const list = creationMode ? { ...newList } : { ...listToUpdate };

    if (!list.name) {
      validationErrors = {
        ...validationErrors,
        name: "The name field is required.",
      };
    } else if (isListAlreadyCreated(list.name)) {
      validationErrors = {
        ...validationErrors,
        name: "Already exist a list with that name.",
      };
    }

    if (list.type !== "public" && list.type !== "private") {
      validationErrors = {
        ...validationErrors,
        type: "Select a valid type for the list.",
      };
    }

    return validationErrors;
  };

  /**
   * Handles the creation or update of a list based on the specified mode.
   *
   * @param {boolean} [creationMode = false] - Indicates whether a new list is being created.
   *  If true, a new list is created. If false, an existing list is updated.
   *
   */
  const handleListCreation = (creationMode = false) => {
    const validationErrors = validateListForm(creationMode);
    if (validateObject(validationErrors)) {
      setListFormErrors(validationErrors);
    } else {
      setListFormErrors(initialValues.listFormErrors);
      creationMode ? createList() : updateList();
    }
  };

  /**
   * Executes side effects when the 'gameAdded' state changes.
   *
   * This effect updates the selected list if a game has been added to it.
   */
  useEffect(() => {
    if (gameAdded) {
      const updatedList = userLists.find((list) => list.id === selectedList.id);
      setSelectedList(updatedList);
      setGameAdded(false);
    }
  }, [gameAdded, userLists]);

  /**
   * Executes side effects when the 'userCreation' state changes.
   *
   * This effect creates a default list for the newly created user and cancels the user creation process.
   */
  useEffect(() => {
    if (userCreation) {
      createDefaultList(idUserCreated);
      cancelUserCreation();
    }
  }, [userCreation]);

  /**
   * Executes side effects when the 'user' state changes.
   *
   * This effect retrieves the lists associated with the user.
   */
  useEffect(() => {
    if (user.id) {
      getListsFromUser();
    }
  }, [user]);

  const listsData = {
    createDefaultList,
    userLists,
    addGameToList,
    removeGameFromList,
    selectedList,
    changeActiveList,
    checkGameInList,
    listToUpdate,
    listToDelete,
    selectListToUpdate,
    updateList,
    deleteList,
    updateData,
    newList,
    createList,
    updatingList,
    isListFormModalOpen,
    isDeleteListModalOpen,
    showListFormModal,
    hideListFormModal,
    showListDeleteModal,
    hideListDeleteModal,
    handleListCreation,
    listFormErrors,
    refreshListsFromUser,
  };

  return (
    <ListsContext.Provider value={listsData}>{children}</ListsContext.Provider>
  );
};

export default ListsProvider;
export { ListsContext };
