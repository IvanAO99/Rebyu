import React, { createContext, useEffect, useState } from "react";
import useUsers from "../hooks/useUsers";
import { supabaseConnection } from "../.config/supabase.js";
import { validateArray } from "../libraries/validateData.js";

const ListsContext = createContext();

const ListsProvider = ({ children }) => {
  const { user, userCreation, cancelUserCreation, idUserCreated } = useUsers();

  /* INITIAL STATES VALUES */
  const initialValues = {
    defaultList: {
      name: "Favourites",
      type: "public",
      creator_id: "",
    },
    userLists: [],
    selectedList: {},
    gameAdded: false,
    listToUpdate: {
      name: "",
      type: ""
    },
    possibleDelete: false,
    newList: {
      name: "",
      type: "public"
    }
  };

  /* STATES */
  const [userLists, setUserLists] = useState(initialValues.userLists);
  const [selectedList, setSelectedList] = useState(initialValues.selectedList);
  const [listToUpdate, setListToUpdate] = useState(initialValues.listToUpdate);
  const [newList, setNewList] = useState(initialValues.newList);
  const [possibleDelete, setPossibleDelete] = useState(
    initialValues.possibleDelete
  );

  const [gameAdded, setGameAdded] = useState(initialValues.gameAdded);

  /* FUNCTIONS */
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
      console.log(error);
    }
  };

  const getListsFromUser = async () => {
    try {
      const { data, error } = await supabaseConnection
        .from("lists")
        .select("*, games_on_list(games(*))")
        .eq("creator_id", user.id);

      if (error) throw error;

      setUserLists(data);
    } catch (error) {
      console.log(error);
    }
  };

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

        console.log(data);
        if (error) throw error;

        getListsFromUser();
        setGameAdded(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeGameFromList = async (gameID, listID) => {
    if (user.id) {
      try {
        const { error } = await supabaseConnection
          .from("games_on_list")
          .delete()
          .eq("game_id", gameID)
          .eq("list_id", listID);

        if (error) throw new Error(`The game could not be deleted.`);

        getListsFromUser();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const changeActiveList = (listID) => {
    if (validateArray(userLists)) {
      userLists.map((list) => {
        if (list.id === listID) setSelectedList(list);
      });
    }
  };

  const checkGameInList = (gameID) => {
    if (selectedList && validateArray(selectedList.games_on_list)) {
      return selectedList.games_on_list.some(
        (game) => game.games.id === gameID
      );
    }
    return false;
  };

  const cancelGameAdded = () => {
    setGameAdded(false);
  };

  const selectListToUpdate = (list) => {
    setListToUpdate(list);
  };

  const updateList = async () => {
    try {
      const { data, error } = await supabaseConnection
        .from("lists")
        .update({ 
          name: listToUpdate.name,
          type: listToUpdate.type
         })
        .eq("id", listToUpdate.id);

      if (error) throw error;

      getListsFromUser();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteList = async (listID) => {
    try {
      const { data, error } = await supabaseConnection
        .from("lists")
        .delete()
        .eq("id", listID);

      if (error) throw error;

      getListsFromUser();
    } catch (error) {
      console.log(error);
    }
  };

  const createList = async () => {
    try {
      const { data, error } = await supabaseConnection
        .from("lists")
        .insert({
          ...newList,
          creator_id: user.id
        })
        .select();

      if (error) throw error;

      getListsFromUser();
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = (event, mode) => {
    const { name, value } = event.target;
    if (mode === "creation") {
      setNewList({ ...newList, [name]: value });
    } else if (mode === "update") {
      setListToUpdate({ ...listToUpdate, [name]: value });
    }
  };

  useEffect(() => {
    userLists.length > 1 ? setPossibleDelete(true) : setPossibleDelete(false);
  }, [userLists]);


  useEffect(() => {
    if (userCreation) {
      createDefaultList(idUserCreated);
      cancelUserCreation();
    }
  }, [userCreation]);

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
    gameAdded,
    cancelGameAdded,
    listToUpdate,
    selectListToUpdate,
    /* changeNameOfList, */
    updateList,
    deleteList,
    possibleDelete,
    updateData,
    newList,
    createList
  };

  return (
    <ListsContext.Provider value={listsData}>{children}</ListsContext.Provider>
  );
};

export default ListsProvider;
export { ListsContext };
