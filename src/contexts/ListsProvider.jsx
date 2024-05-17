import React, { createContext, useEffect, useState } from "react";
import useUsers from "../hooks/useUsers";
import { supabaseConnection } from "../.config/supabase.js";

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
    selectedListID: "30285dfd-3a0d-4c1e-b333-2098b9138e5b",
  };

  /* STATES */
  const [userLists, setUserLists] = useState(initialValues.userLists);
  const [selectedList, setSelectedList] = useState(
    initialValues.selectedListID
  );

  /* FUNCTIONS */
  const createDefaultList = async (userID) => {
    try {
      // Insert the review form data into the "reviews" table and associate it with the current game and user
      const { data, error } = await supabaseConnection
        .from("lists")
        .insert({
          ...initialValues.defaultList,
          ["creator_id"]: userID,
        })
        .select();

      console.log(data);
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
    if (user.id) {
      try {
        const { data, error } = await supabaseConnection
          .from("games_on_list")
          .insert({
            game_id: gameID,
            list_id: selectedList,
          })
          .select();

        console.log(data);
        if (error) throw error;

        getListsFromUser();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeGameFromList = async (gameID, listID) => {
    console.log("entro a funcion")
    if (user.id) {
      console.log("entro a if")
      console.log(`-${gameID}-`)
      console.log(`-${listID}-`)
      try {
        console.log("entro a try")
        const { error } = await supabaseConnection
          .from("games_on_list")
          .delete()
          .eq("game_id", gameID)
          .eq("list_id", listID);

        console.log("hecho")
        if (error) throw new Error(`The game could not be deleted.`);

        getListsFromUser();
        console.log("actualizo")
      } catch (error) {
        console.log(error);
      }
    }
  };

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
  };

  return (
    <ListsContext.Provider value={listsData}>{children}</ListsContext.Provider>
  );
};

export default ListsProvider;
export { ListsContext };
