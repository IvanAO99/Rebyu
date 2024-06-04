import React, { createContext, useEffect, useState } from "react";

import { supabaseConnection } from "../.config/supabase.js";
import { useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";

import useUsers from "../hooks/useUsers.js";
import useLists from "../hooks/useLists.js";

import regex from "../jsons/regex.json";

import AlertIcon from "../components/AlertIcon.jsx";

import {
  isValidURL,
  validateArray,
  validateObject,
} from "../libraries/validateData.js";

const GamesContext = createContext();

const GamesProvider = ({ children }) => {
  const navigate = useNavigate();

  const { isSessionUp, user, isAdmin } = useUsers();
  const { gameAdded, cancelGameAdded } = useLists();

  /* INITIAL STATES VALUES */

  const initialValues = {
    newGames: [],
    genres: [],
    developers: [],
    platforms: [],
    games: [],
    latestGames: [],
    topGames: [],
    game: {},
    isLoadingGames: true,
    isLoadingLatestGames: true,
    isLoadingTopGames: true,
    isLoadingGame: true,
    gameRegister: {
      title: "",
      synopsis: "",
      release_date: "",
      cover_pic: "",
      trailer: "",
      game_genre: [],
      game_platform: [],
      game_developer: [],
    },
    gameRegisterErrors: [],
    isGameFormModalOpen: false,
    creationMode: true,
    isGameDeleteModalOpen: false,
    gameFilter: {
      genre: "*",
      platform: "*",
      developer: "*",
      title: "",
    },
    gameAlert: {},
  };

  /* STATES */

  const [newGames, setNewGames] = useState(initialValues.newGames);
  const [games, setGames] = useState(initialValues.games);
  const [latestGames, setLatestGames] = useState(initialValues.latestGames);
  const [topGames, setTopGames] = useState(initialValues.topGames);
  const [game, setGame] = useState(initialValues.game);
  const [isLoadingGames, setIsLoadingGames] = useState(
    initialValues.isLoadingGames
  );
  const [isLoadingLatestGames, setIsLoadingLatestGames] = useState(
    initialValues.isLoadingLatestGames
  );
  const [isLoadingTopGames, setIsLoadingTopGames] = useState(
    initialValues.isLoadingTopGames
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
  const [isGameFormModalOpen, setIsGameFormModalOpen] = useState(
    initialValues.isGameFormModalOpen
  );
  const [isGameDeleteModalOpen, setIsGameDeleteModalOpen] = useState(
    initialValues.isGameDeleteModalOpen
  );
  const [creationMode, setCreationMode] = useState(initialValues.creationMode);

  const [filteredGames, setFilteredGames] = useState(initialValues.games);
  const [gameFilter, setGameFilter] = useState(initialValues.gameFilter);
  const [gameAlert, setGameAlert] = useState(initialValues.gameAlert);

  /* FUNCTIONS */

  /**
   * Sends a game-related alert notification.
   *
   * @param {string} type - The type of alert ('success' or 'error').
   * @param {string} message - The message content of the alert.
   *
   */
  const sendGameAlert = (type, message) => {
    const notify = () => {
      switch (type) {
        case "success":
          toast.success(message, {
            position: "top-right",
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
            position: "top-right",
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
   * Shows the game form modal based on the specified mode.
   *
   * @param {string} formMode - The mode of the form ('create' or 'update').
   *
   */
  const showGameFormModal = (formMode) => {
    setCreationMode(formMode === "create");

    setGameRegisterErrors(initialValues.gameRegisterErrors);
    setIsGameFormModalOpen(true);
  };

  /**
   * Hides the game form modal.
   *
   */
  const hideGameFormModal = () => {
    setIsGameFormModalOpen(initialValues.isGameFormModalOpen);
  };

  /**
   * Shows the game delete modal.
   *
   */
  const showGameDeleteModal = () => {
    setIsGameDeleteModalOpen(true);
  };

  /**
   * Hides the game delete modal.
   *
   */
  const hideGameDeleteModal = () => {
    setIsGameDeleteModalOpen(initialValues.isGameDeleteModalOpen);
  };

  const mergeGamesWithScores = (games, scores) => {
    return games.map((game) => {
      const matchingScore = scores.find((score) => score.id === game.id);

      return matchingScore
        ? { ...game, average_score: matchingScore.average_score }
        : game;
    });
  };

  /**
   * Retrieves all games from the database, including associated genres, platforms, and developers.
   * Games are ordered by their ID.
   *
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

      const { data: scoreData, error: scoreError } = await supabaseConnection
        .from("top_games")
        .select("id, average_score")
        .order("id");

      if (error || scoreError) {
        throw new Error(
          "Error loading games. Please reload the page and try again."
        );
      }

      const gamesWithScore = mergeGamesWithScores(data, scoreData);

      setGames(gamesWithScore);
    } catch (error) {
      sendGameAlert("error", "Something went wrong!");
    } finally {
      setIsLoadingGames(false);
    }
  };

  /**
   * Fetches the newest games from the database.
   *
   */
  const getNewGames = async () => {
    try {
      const { data, error } = await supabaseConnection
        .from("games")
        .select(
          "*, game_genre(genres(*)), game_platform(platforms(*)), game_developer(developers(*))"
        )
        .order("release_date", { ascending: false })
        .range(0, 2);

      if (error) throw error;

      setNewGames(data);
    } catch (error) {
      sendGameAlert("error", "Something went wrong!");
    }
  };

  /**
   * Fetches the latest games from the database and updates the state.
   *
   */
  const getLatestGames = async () => {
    try {
      setIsLoadingLatestGames(initialValues.isLoadingLatestGames);

      const { data, error } = await supabaseConnection
        .from("games")
        .select(
          "*, game_genre(genres(*)), game_platform(platforms(*)), game_developer(developers(*))"
        )
        .order("release_date", { ascending: false })
        .range(0, 9);

      if (error) throw error;

      setLatestGames(data);
    } catch (error) {
      sendGameAlert("error", "Something went wrong!");
    } finally {
      setIsLoadingLatestGames(false);
    }
  };

  /**
   * Fetches the top games from the database and updates the state.
   *
   */
  const getTopGames = async () => {
    try {
      setIsLoadingTopGames(initialValues.isLoadingTopGames);

      const { data, error } = await supabaseConnection
        .from("top_games")
        .select("*")
        .range(0, 9);

      if (error) throw error;

      setTopGames(data);
    } catch (error) {
      sendGameAlert("error", "Something went wrong!");
    } finally {
      setIsLoadingTopGames(false);
    }
  };

  /**
   * Retrieves a specific game from the database by its ID, including associated genres, platforms, and developers.
   *
   * @param {string} gameID - The ID of the game to retrieve.
   *
   */
  const getGame = async (gameID) => {
    try {
      setIsLoadingGame(true);

      if (isSessionUp && validateObject(user) && isAdmin) {
        navigate("/games/game");
      } else {
        navigate("/game");
      }

      const { data, error } = await supabaseConnection
        .from("games")
        .select(
          "*, game_genre(genres(*)), game_platform(platforms(*)), game_developer(developers(*))"
        )
        .eq("id", gameID);

      const { data: scoreData, error: scoreError } = await supabaseConnection
        .from("top_games")
        .select("id, average_score")
        .eq("id", gameID);

      if (error || scoreError) {
        throw new Error(
          "Error loading games. Please reload the page and try again."
        );
      }

      setGame(
        validateArray(scoreData)
          ? { ...data[0], average_score: scoreData[0].average_score }
          : data[0]
      );
    } catch (error) {
      sendGameAlert("error", "Something went wrong!");
    } finally {
      setIsLoadingGame(false);
    }
  };

  /**
   * Retrieves genres from the database.
   *
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
      sendGameAlert("error", "Something went wrong!");
    }
  };

  /**
   * Retrieves developers from the database.
   *
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
      sendGameAlert("error", "Something went wrong!");
    }
  };

  /**
   * Retrieves platforms from the database.
   *
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
      sendGameAlert("error", "Something went wrong!");
    }
  };

  /**
   * Handles the change event for checkboxes.
   *
   * @param {Object} event - The event object containing information about the checkbox change.
   * @param {boolean} creationMode - Indicates whether the operation is in creation mode or update mode.
   *
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

    setGameRegisterErrors({ ...gameRegisterErrors, [name]: null });
  };

  /**
   * Updates the game form state based on the input.
   *
   * @param {Object} input - The input object containing the name and value to update.
   * @param {boolean} creation - Indicates whether the operation is in creation mode or update mode.
   *
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
   * Checks if all options selected are valid by comparing them with an array of valid options.
   *
   * @param {Array} optionsSelected - An array of selected options to be validated.
   * @param {Array} arrayParam - An array containing valid options for comparison.
   *
   * @returns {boolean} - True if all selected options are valid, otherwise false.
   *
   */
  const checkValues = (optionsSelected, arrayParam) => {
    const arrayParamNames = arrayParam.map((value) => value.id);
    return optionsSelected.every((option) => arrayParamNames.includes(option));
  };

  /**
   * Validates the game registration data based on the specified creation mode.
   *
   * @param {boolean} creationMode - Indicates whether the data is for creating a new game.
   *
   * @returns {Object} - An object containing validation errors, if any.
   *
   */
  const validateGameRegister = (creationMode) => {
    let validationErrors = {};

    let actualGame = creationMode ? gameRegister : selectedGame;

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

    if (!actualGame.synopsis) {
      validationErrors = {
        ...validationErrors,
        synopsis: "The synopsis field is required.",
      };
    } else if (
      /* !new RegExp(regex.gameForm.synopsis).test(actualGame.synopsis) */ false
    ) {
      validationErrors = {
        ...validationErrors,
        synopsis: "The synopsis field is invalid.",
      };
    }

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

    if (actualGame.cover_pic && !isValidURL(actualGame.cover_pic)) {
      validationErrors = {
        ...validationErrors,
        cover_pic: "The URL doesn't exist.",
      };
    }

    if (actualGame.trailer && !isValidURL(actualGame.trailer)) {
      validationErrors = {
        ...validationErrors,
        trailer: "The URL doesn't exist.",
      };
    }

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
   *
   * @param {string} tableName - The name of the intermediary table.
   * @param {string} idGame - The ID of the game associated with the data.
   * @param {Array} arrayData - An array of data to be inserted into the intermediary table.
   * @param {string} columnName1 - The name of the first column in the intermediary table.
   * @param {string} columnName2 - The name of the second column in the intermediary table.
   *
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
      sendGameAlert("error", "Something went wrong!");
    }
  };

  /**
   * Updates data in an intermediary table based on the provided parameters.
   *
   * @param {string} tableName - The name of the intermediary table.
   * @param {string} idGame - The ID of the game associated with the data.
   * @param {Array} arrayData - An array of data to be updated in the intermediary table.
   * @param {string} columnName1 - The name of the first column in the intermediary table.
   * @param {string} columnName2 - The name of the second column in the intermediary table.
   *
   */
  const updateIntermediaryTable = async (
    tableName,
    idGame,
    arrayData,
    columnName1,
    columnName2
  ) => {
    try {
      const { data: currentData, error: fetchError } = await supabaseConnection
        .from(tableName)
        .select(columnName2)
        .eq(columnName1, idGame);

      if (fetchError) throw fetchError;

      const currentDataSet = new Set(
        currentData.map((item) => item[columnName2])
      );

      const dataToAdd = arrayData.filter((item) => !currentDataSet.has(item));
      const dataToDelete = currentData.filter(
        (item) => !arrayData.includes(item[columnName2])
      );

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
      sendGameAlert("error", "Something went wrong!");
    }
  };

  /**
   * Registers a new game by inserting data into the 'games' table and associated intermediary tables.
   *
   */
  const registerGame = async () => {
    try {
      const { data, error } = await supabaseConnection
        .from("games")
        .insert({
          synopsis: gameRegister.synopsis,
          title: gameRegister.title,
          release_date: gameRegister.release_date,
          wallpaper: gameRegister.wallpaper,
          cover_pic: gameRegister.cover_pic
            ? gameRegister.cover_pic
            : `https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/images/games/default.jpg?t=2024-02-23T11%3A08%3A06.764Z`,
          trailer: gameRegister.trailer,
        })
        .select("*");

      if (error) throw error;

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

      hideGameFormModal();

      sendGameAlert("success", "Game registered successfully!");
      setGameRegister(initialValues.gameRegister);
      setGameRegisterErrors(initialValues.gameRegisterErrors);
      getGames();
    } catch (error) {
      sendGameAlert("error", "The game could not be registered!");
    }
  };

  /**
   * Updates an existing game in the database and associated intermediary tables.
   *
   */
  const updateGame = async () => {
    try {
      const { data, error } = await supabaseConnection
        .from("games")
        .update({
          synopsis: selectedGame.synopsis,
          title: selectedGame.title,
          release_date: selectedGame.release_date,
          cover_pic: selectedGame.cover_pic ? selectedGame.cover_pic : null,
          trailer: selectedGame.trailer,
        })
        .eq("id", selectedGame.id);

      if (error) throw error;

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

      hideGameFormModal();

      sendGameAlert("success", "Game updated successfully!");
      getGames();

      setSelectedGame(initialValues.gameRegister);
    } catch (error) {
      sendGameAlert("error", "The game could not be updated!");
    }
  };

  /**
   * Handles the submission of the game form, either for creation or update.
   *
   * @param {boolean} creationMode - Indicates whether the form is for creating a new game.
   *
   */
  const handleGameForm = (creationMode) => {
    const validationErrors = validateGameRegister(creationMode);

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
   *
   * @param {string} id - The ID of the game to be updated.
   *
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
      sendGameAlert("error", "Something went wrong!");
    }
  };

  /**
   * Deletes the selected game from the database.
   *
   */
  const deleteGame = async () => {
    try {
      const { error } = await supabaseConnection
        .from("games")
        .delete()
        .eq("id", selectedGame.id);

      if (error) throw new Error(`The game could not be deleted.`);

      sendGameAlert("success", "Game deleted successfully!");
      getGames();
      setSelectedGame(initialValues.gameRegister);
    } catch (error) {
      sendGameAlert("error", "The game could not be deleted!");
    } finally {
      setIsGameDeleteModalOpen(initialValues.isGameDeleteModalOpen);
    }
  };

  /**
   * Updates the game filter state based on user input.
   *
   * @param {Object} input - The input object containing name and value.
   *
   */
  const updateGameFilter = (input) => {
    const { name, value } = input;

    setGameFilter({ ...gameFilter, [name]: value });
  };

  /**
   * Filters a game based on the provided filters.
   *
   * @param {Object} game - The game object to filter.
   * @param {Object} filters - The filters to apply.
   *
   * @returns {boolean} - True if the game passes all filters, false otherwise.
   */
  const filterGame = (game, filters) => {
    const { genre, platform, developer, title } = filters;

    const passesNameFilter =
      title === "" || game.title.toLowerCase().includes(title.toLowerCase());
    const passesGenreFilter =
      genre === "*" || game.game_genre.some((item) => item.genres.id === genre);
    const passesPlatformFilter =
      platform === "*" ||
      game.game_platform.some((item) => item.platforms.id === platform);
    const passesDeveloperFilter =
      developer === "*" ||
      game.game_developer.some((item) => item.developers.id === developer);
    return (
      passesGenreFilter &&
      passesPlatformFilter &&
      passesDeveloperFilter &&
      passesNameFilter
    );
  };

  /**
   * Filters a list of games based on the provided filters.
   *
   * @param {Object[]} games - The array of game objects to filter.
   * @param {Object} filters - The filters to apply.
   *
   * @returns {Object[]} - The filtered array of game objects.
   */
  const filterGameList = (games, filters) => {
    return games.filter((game) => filterGame(game, filters));
  };

  /**
   * Resets the game filter state to its initial values.
   *
   */
  const resetGameFilter = () => {
    setGameFilter(initialValues.gameFilter);
  };

  /**
   * Refreshes the games by fetching the latest game data.
   *
   */
  const refreshGames = () => {
    getGames();
    getGame(game.id);
  };

  /**
   * Filters and updates the games list based on the selected game filter.
   *
   */
  useEffect(() => {
    const filteredGames = filterGameList(games, gameFilter);
    setFilteredGames(filteredGames);
  }, [gameFilter]);

  /**
   * Updates the filtered games list whenever the games list changes.
   *
   */
  useEffect(() => {
    setFilteredGames(games);
  }, [games]);

  /**
   * Initializes the game data by fetching various game-related information.
   *
   */
  useEffect(() => {
    getNewGames();
    getGames();
    getLatestGames();
    getTopGames();
    getGenres();
    getDevelopers();
    getPlatforms();
  }, []);

  const gamesData = {
    newGames,
    games,
    isLoadingGames,
    isLoadingGame,
    latestGames,
    isLoadingLatestGames,
    topGames,
    isLoadingTopGames,
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
    isGameDeleteModalOpen,
    updateGameFilter,
    filteredGames,
    resetGameFilter,
    gameFilter,
    gameAlert,
    isGameFormModalOpen,
    creationMode,
    showGameFormModal,
    hideGameFormModal,
    showGameDeleteModal,
    hideGameDeleteModal,
    refreshGames,
    getTopGames,
  };

  return (
    <GamesContext.Provider value={gamesData}>{children}</GamesContext.Provider>
  );
};

export default GamesProvider;
export { GamesContext };
