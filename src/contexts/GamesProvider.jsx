import React, { createContext, useEffect, useState } from "react";
import { supabaseConnection } from "../.config/supabase.js";
import { validateArray, validateObject } from "../libraries/validateData.js";

import regex from "../jsons/regex.json";
import { useNavigate } from "react-router-dom";

const GamesContext = createContext();

const GamesProvider = ({ children }) => {
  const navigate = useNavigate();

  /* INITIAL STATES VALUES */
  const initialValues = {
    genres: [],
    developers: [],
    platforms: [],
    games: [],
    game: {},
    isLoadingGames: true,
    isLoadingGame: true,
    gameRegister: {
      title: "",
      synopsis: "",
      price: "",
      release_date: "",
      cover_pic: "",
      trailer: "",
      game_genre: [],
      game_platform: [],
      game_developer: [],
    },
    gameRegisterErrors: [],
  };

  /* STATES */
  const [games, setGames] = useState(initialValues.games);
  const [game, setGame] = useState(initialValues.game);
  const [isLoadingGames, setIsLoadingGames] = useState(
    initialValues.isLoadingGames
  );
  const [isLoadingGame, setIsLoadingGame] = useState(
    initialValues.isLoadingGame
  );

  const [genres, setGenres] = useState(initialValues.genres);
  const [developers, setDevelopers] = useState(initialValues.developers);
  const [platforms, setPlatforms] = useState(initialValues.platforms);

  const [gameRegister, setGameRegister] = useState(initialValues.gameRegister);
  const [gameRegisterErrors, setGameRegisterErrors] = useState(
    initialValues.gameRegisterErrors
  );

  const [selectedGame, setSelectedGame] = useState(initialValues.gameRegister);

  /* FUNCTIONS */
  /**
   * Retrieves all games from the database, including associated genres, platforms, and developers.
   * Games are ordered by their ID.
   * @async
   * @function getGames
   * @returns {Promise<void>} A Promise that resolves once the games are fetched and loaded into the state.
   */
  const getGames = async () => {
    try {
      setIsLoadingGames(true);

      const { data, error } = await supabaseConnection
        .from("games")
        .select(
          "*, game_genre(genres(*)), game_platform(platforms(*)), game_developer(developers(*))"
        )
        .order("id");

      if (error)
        throw new Error(
          "Error loading games. Please reload the page and try again."
        );
      setGames(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoadingGames(false);
    }
  };

  /**
   * Retrieves a specific game from the database by its ID, including associated genres, platforms, and developers.
   * @async
   * @function getGame
   * @param {string} gameID - The ID of the game to retrieve.
   * @returns {Promise<void>} A Promise that resolves once the game is fetched and loaded into the state.
   */
  const getGame = async (gameID) => {
    try {
      setIsLoadingGame(true);
      const { data, error } = await supabaseConnection
        .from("games")
        .select(
          "*, game_genre(genres(*)), game_platform(platforms(*)), game_developer(developers(*))"
        )
        .eq("id", gameID);

      if (error)
        throw new Error(
          "Error loading the game. Please reload the page and try again."
        );
      setGame(data[0]);

      console.log(data);

      navigate("/game");
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoadingGame(false);
    }
  };

  /**
   * Retrieves genres from the database.
   * @async
   * @function getGenres
   * @returns {Promise<void>} A Promise that resolves once genres are fetched and loaded into the state.
   */
  const getGenres = async () => {
    try {
      const { data, error } = await supabaseConnection
        .from("genres")
        .select("*");

      if (error)
        throw new Error(
          "Error loading genres. Please reload the page and try again."
        );
      setGenres(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Retrieves developers from the database.
   * @async
   * @function getDevelopers
   * @returns {Promise<void>} A Promise that resolves once developers are fetched and loaded into the state.
   */
  const getDevelopers = async () => {
    try {
      const { data, error } = await supabaseConnection
        .from("developers")
        .select("*");

      if (error)
        throw new Error(
          "Error loading developers. Please reload the page and try again."
        );
      setDevelopers(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Retrieves platforms from the database.
   * @async
   * @function getPlatforms
   * @returns {Promise<void>} A Promise that resolves once platforms are fetched and loaded into the state.
   */
  const getPlatforms = async () => {
    try {
      const { data, error } = await supabaseConnection
        .from("platforms")
        .select("*");

      if (error)
        throw new Error(
          "Error loading platforms. Please reload the page and try again."
        );
      setPlatforms(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Handles the change event for checkboxes.
   * @param {Object} event - The event object containing information about the checkbox change.
   * @param {boolean} creationMode - Indicates whether the operation is in creation mode or update mode.
   * @returns {void}
   */
  const handleCheckboxChange = (event, creationMode) => {
    const { name, value } = event.target;

    if (creationMode) {
      setGameRegister({
        ...gameRegister,
        [name]: gameRegister[name].includes(value)
          ? gameRegister[name].filter((item) => item !== value)
          : [...gameRegister[name], value],
      });
    } else {
      setSelectedGame({
        ...selectedGame,
        [name]: selectedGame[name].includes(value)
          ? selectedGame[name].filter((item) => item !== value)
          : [...selectedGame[name], value],
      });
    }
  };

  /**
   * Updates the game form state based on the input.
   * @param {Object} input - The input object containing the name and value to update.
   * @param {boolean} creation - Indicates whether the operation is in creation mode or update mode.
   * @returns {void}
   */
  const updateGameForm = (input, creation) => {
    const { name, value } = input;

    if (creation) {
      setGameRegister({ ...gameRegister, [name]: value });
    } else {
      setSelectedGame({ ...selectedGame, [name]: value });
    }
    setGameRegisterErrors({ ...gameRegisterErrors, [name]: null });
  };

  /**
   * Checks if the given URL is valid.
   * @param {string} url - The URL to validate.
   * @returns {boolean} - True if the URL is valid, otherwise false.
   */
  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  /**
   * Checks if all options selected are valid by comparing them with an array of valid options.
   * @param {Array} optionsSelected - An array of selected options to be validated.
   * @param {Array} arrayParam - An array containing valid options for comparison.
   * @returns {boolean} - True if all selected options are valid, otherwise false.
   */
  const checkValues = (optionsSelected, arrayParam) => {
    const arrayParamNames = arrayParam.map((value) => value.id);
    return optionsSelected.every((option) => arrayParamNames.includes(option));
  };

  /**
   * Validates the game registration data based on the specified creation mode.
   * @param {boolean} creationMode - Indicates whether the data is for creating a new game.
   * @returns {Object} - An object containing validation errors, if any.
   */
  const validateGameRegister = (creationMode) => {
    let validationErrors = {};

    // Determine which game data object to validate based on creation mode
    let actualGame = creationMode ? gameRegister : selectedGame;

    // Validate title field
    if (!actualGame.title) {
      validationErrors = {
        ...validationErrors,
        title: "The title field is required.",
      };
    } else if (!new RegExp(regex.gameForm.title).test(actualGame.title)) {
      validationErrors = {
        ...validationErrors,
        title: "The title field is invalid.",
      };
    }

    // Validate synopsis field
    if (!actualGame.synopsis) {
      validationErrors = {
        ...validationErrors,
        synopsis: "The synopsis field is required.",
      };
    } else if (!new RegExp(regex.gameForm.synopsis).test(actualGame.synopsis)) {
      validationErrors = {
        ...validationErrors,
        synopsis: "The synopsis field is invalid.",
      };
    }

    // Validate price field
    if (!actualGame.price) {
      validationErrors = {
        ...validationErrors,
        price: "The price field is required.",
      };
    } else if (!new RegExp(regex.gameForm.price).test(actualGame.price)) {
      validationErrors = {
        ...validationErrors,
        price: "The price field is invalid.",
      };
    }

    // Validate release date field
    if (!actualGame.release_date) {
      validationErrors = {
        ...validationErrors,
        release_date: "The date field is required.",
      };
    } else if (
      !new RegExp(regex.gameForm.release_date).test(actualGame.release_date)
    ) {
      validationErrors = {
        ...validationErrors,
        release_date: "The date field is invalid.",
      };
    }

    // Validate cover pic URL
    if (actualGame.cover_pic && !isValidURL(actualGame.cover_pic)) {
      validationErrors = {
        ...validationErrors,
        cover_pic: "The URL doesn't exist.",
      };
    }

    // Validate trailer URL
    if (actualGame.trailer && !isValidURL(actualGame.trailer)) {
      validationErrors = {
        ...validationErrors,
        trailer: "The URL doesn't exist.",
      };
    }

    // Validate game developer field
    if (!validateArray(actualGame.game_developer)) {
      validationErrors = {
        ...validationErrors,
        game_developer: "The developer field need one value at least.",
      };
    } else if (!checkValues(actualGame.game_developer, developers)) {
      validationErrors = {
        ...validationErrors,
        game_developer: "Make sure to select a valid options.",
      };
    }

    // Validate game platform field
    if (!validateArray(actualGame.game_platform)) {
      validationErrors = {
        ...validationErrors,
        game_platform: "The developer field need one value at least.",
      };
    } else if (!checkValues(actualGame.game_platform, platforms)) {
      validationErrors = {
        ...validationErrors,
        game_platform: "Make sure to select a valid options.",
      };
    }

    // Validate game genre field
    if (!validateArray(actualGame.game_genre)) {
      validationErrors = {
        ...validationErrors,
        game_genre: "The developer field need one value at least.",
      };
    } else if (!checkValues(actualGame.game_genre, genres)) {
      validationErrors = {
        ...validationErrors,
        game_genre: "Make sure to select a valid options.",
      };
    }

    return validationErrors;
  };

  /**
   * Inserts data into an intermediary table in the database.
   * @param {string} tableName - The name of the intermediary table.
   * @param {string} idGame - The ID of the game associated with the data.
   * @param {Array} arrayData - An array of data to be inserted into the intermediary table.
   * @param {string} columnName1 - The name of the first column in the intermediary table.
   * @param {string} columnName2 - The name of the second column in the intermediary table.
   */
  const insertIntoIntermediaryTable = async (
    tableName,
    idGame,
    arrayData,
    columnName1,
    columnName2
  ) => {
    try {
      const rowsToInsert = arrayData.map((singleData) => ({
        [columnName1]: idGame,
        [columnName2]: singleData,
      }));

      const { data, error } = await supabaseConnection
        .from(tableName)
        .insert(rowsToInsert)
        .select("*");

      if (error) throw error;
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Updates data in an intermediary table based on the provided parameters.
   * @param {string} tableName - The name of the intermediary table.
   * @param {string} idGame - The ID of the game associated with the data.
   * @param {Array} arrayData - An array of data to be updated in the intermediary table.
   * @param {string} columnName1 - The name of the first column in the intermediary table.
   * @param {string} columnName2 - The name of the second column in the intermediary table.
   */
  const updateIntermediaryTable = async (
    tableName,
    idGame,
    arrayData,
    columnName1,
    columnName2
  ) => {
    try {
      // Fetch current data from the intermediary table
      const { data: currentData, error: fetchError } = await supabaseConnection
        .from(tableName)
        .select(columnName2)
        .eq(columnName1, idGame);

      // Throw an error if there's an issue fetching the data
      if (fetchError) throw fetchError;

      // Create a Set of current data for efficient comparison
      const currentDataSet = new Set(
        currentData.map((item) => item[columnName2])
      );

      // Determine data to add and data to delete
      const dataToAdd = arrayData.filter((item) => !currentDataSet.has(item));
      const dataToDelete = currentData.filter(
        (item) => !arrayData.includes(item[columnName2])
      );

      // Insert new data into the intermediary table
      if (dataToAdd.length > 0) {
        const rowsToInsert = dataToAdd.map((singleData) => ({
          [columnName1]: idGame,
          [columnName2]: singleData,
        }));

        const { error: insertError } = await supabaseConnection
          .from(tableName)
          .insert(rowsToInsert);

        if (insertError) throw insertError;
      }

      // Delete obsolete data from the intermediary table
      if (dataToDelete.length > 0) {
        for (const item of dataToDelete) {
          const { error: deleteError } = await supabaseConnection
            .from(tableName)
            .delete()
            .match({ [columnName1]: idGame, [columnName2]: item[columnName2] });

          if (deleteError) throw deleteError;
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Registers a new game by inserting data into the 'games' table and associated intermediary tables.
   */
  const registerGame = async () => {
    try {
      const { data, error } = await supabaseConnection
        .from("games")
        .insert({
          synopsis: gameRegister.synopsis,
          price: gameRegister.price,
          title: gameRegister.title,
          release_date: gameRegister.release_date,
          cover_pic: gameRegister.cover_pic ? gameRegister.cover_pic : null,
          trailer: gameRegister.trailer,
          score: (Math.random() * 10).toFixed(2),
        })
        .select("*");

      if (error) throw error;

      // Insert data into intermediary tables (game_genre, game_platform, game_developer)
      insertIntoIntermediaryTable(
        "game_genre",
        data[0].id,
        gameRegister.game_genre,
        "game_id",
        "genre_id"
      );

      insertIntoIntermediaryTable(
        "game_platform",
        data[0].id,
        gameRegister.game_platform,
        "game_id",
        "platform_id"
      );

      insertIntoIntermediaryTable(
        "game_developer",
        data[0].id,
        gameRegister.game_developer,
        "game_id",
        "developer_id"
      );

      // Reset game register state and errors, and reload games data
      setGameRegister(initialValues.gameRegister);
      setGameRegisterErrors(initialValues.gameRegisterErrors);
      getGames();
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Updates an existing game in the database and associated intermediary tables.
   */
  const updateGame = async () => {
    try {
      const { data, error } = await supabaseConnection
        .from("games")
        .update({
          synopsis: selectedGame.synopsis,
          price: selectedGame.price,
          title: selectedGame.title,
          release_date: selectedGame.release_date,
          cover_pic: selectedGame.cover_pic ? selectedGame.cover_pic : null,
          trailer: selectedGame.trailer,
          //score: (Math.random() * 10).toFixed(2),
        })
        .eq("id", selectedGame.id);

      if (error) throw error;

      // Update data in intermediary tables (game_genre, game_platform, game_developer)
      await updateIntermediaryTable(
        "game_genre",
        selectedGame.id,
        selectedGame.game_genre,
        "game_id",
        "genre_id"
      );

      await updateIntermediaryTable(
        "game_platform",
        selectedGame.id,
        selectedGame.game_platform,
        "game_id",
        "platform_id"
      );

      await updateIntermediaryTable(
        "game_developer",
        selectedGame.id,
        selectedGame.game_developer,
        "game_id",
        "developer_id"
      );

      // Reload games data
      getGames();
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Handles the submission of the game form, either for creation or update.
   * @param {boolean} creationMode - Indicates whether the form is for creating a new game.
   */
  const handleGameForm = (creationMode) => {
    const validationErrors = validateGameRegister(creationMode);

    // If there are validation errors, set them in the state
    if (validateObject(validationErrors)) {
      setGameRegisterErrors(validationErrors);
    } else {
      setGameRegisterErrors(initialValues.gameRegisterErrors);
      if (creationMode) {
        registerGame();
      } else {
        updateGame();
      }
    }
  };

  /**
   * Updates the selected game data based on the provided game ID.
   * @param {string} id - The ID of the game to be updated.
   */
  const updateSelectedGame = async (id) => {
    try {
      const { data, error } = await supabaseConnection
        .from("games")
        .select(
          "*, game_genre(genres(*)), game_platform(platforms(*)), game_developer(developers(*))"
        )
        .eq("id", id);

      if (data) {
        // Transform the data structure to match the format of gameRegister
        const transformedData = {
          ...data[0],
          game_genre: data[0].game_genre.map((item) => item.genres.id),
          game_platform: data[0].game_platform.map((item) => item.platforms.id),
          game_developer: data[0].game_developer.map(
            (item) => item.developers.id
          ),
        };

        setSelectedGame(transformedData);
      }

      if (error) throw error;
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Deletes the selected game from the database.
   */
  const deleteGame = async () => {
    try {
      const { error } = await supabaseConnection
        .from("games")
        .delete()
        .eq("id", selectedGame.id);

      if (error) throw new Error(`The game could not be deleted.`);

      // After successful deletion, refresh the list of games
      getGames();
      // Reset the selected game state to its initial values
      setSelectedGame(initialValues.gameRegister);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getGames();
    getGenres();
    getDevelopers();
    getPlatforms();
  }, []);

  const gamesData = {
    games,
    game,
    getGame,
    genres,
    platforms,
    developers,
    gameRegister,
    gameRegisterErrors,
    updateGameForm,
    handleCheckboxChange,
    handleGameForm,
    updateSelectedGame,
    deleteGame,
    selectedGame,
  };

  return (
    <GamesContext.Provider value={gamesData}>{children}</GamesContext.Provider>
  );
};

export default GamesProvider;
export { GamesContext };
