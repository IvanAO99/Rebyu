import React, { createContext, useEffect, useState } from "react";
import { supabaseConnection } from "../.config/supabase.js";
import { validateArray, validateObject } from "../libraries/validateData.js";

import regex from "../jsons/regex.json";
import { useNavigate } from "react-router-dom";
import { calculateTopGames } from "../libraries/manipulateData.js";

import { toast, Slide } from "react-toastify";
import useLists from "../hooks/useLists.js";
import AlertIcon from "../components/AlertIcon.jsx";

const GamesContext = createContext();

const GamesProvider = ({ children }) => {
  const navigate = useNavigate();

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

  const showGameFormModal = (formMode) => {
    setCreationMode(formMode === "create");

    setIsGameFormModalOpen(true);
  };

  const hideGameFormModal = () => {
    setIsGameFormModalOpen(initialValues.isGameFormModalOpen);
  };

  const showGameDeleteModal = () => {
    setIsGameDeleteModalOpen(true);
  };

  const hideGameDeleteModal = () => {
    setIsGameDeleteModalOpen(initialValues.isGameDeleteModalOpen);
  };

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

      const { data: scoreData, error: scoreError } = await supabaseConnection
        .from("top_games")
        .select("id, average_score")
        .order("id");

      if (error || scoreError) {
        console.log(error);
        console.log(scoreError);
        throw new Error(
          "Error loading games. Please reload the page and try again."
        );
      }

      const gamesWithScore = data.map((dataGame) => {
        const matchingGame = scoreData.find(
          (gameScore) => gameScore.id === dataGame.id
        );

        if (matchingGame) {
          return {
            ...dataGame,
            average_score: matchingGame.average_score,
          };
        }

        return dataGame;
      });

      setGames(gamesWithScore);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoadingGames(false);
    }
  };

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
    } catch (error) {}
  };

  const getLatestGames = async () => {
    try {
      setIsLoadingLatestGames(initialValues.isLoadingLatestGames);

      const { data, error } = await supabaseConnection
        .from("games")
        .select(
          "*, game_genre(genres(*)), game_platform(platforms(*)), game_developer(developers(*))"
        )
        .order("release_date", { ascending: false })
        .range(0, 10);

      if (error) throw error;

      setLatestGames(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingLatestGames(false);
    }
  };

  const getTopGames = async () => {
    try {
      setIsLoadingTopGames(initialValues.isLoadingTopGames);

      const { data, error } = await supabaseConnection
        .from("top_games")
        .select("*")
        .range(0, 10);

      console.log(data);

      if (error) throw error;

      setTopGames(data);

      //const calculatedTopGames = calculateTopGames(data);

      //setTopGames(calculatedTopGames);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingTopGames(false);
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

      navigate("/game");

      const { data, error } = await supabaseConnection
        .from("games")
        .select(
          "*, game_genre(genres(*)), game_platform(platforms(*)), game_developer(developers(*))"
        )
        .eq("id", gameID);

      //console.log(data);

      const { data: scoreData, error: scoreError } = await supabaseConnection
        .from("top_games")
        .select("id, average_score")
        .eq("id", gameID);

      console.log(scoreData)

      if (error || scoreError) {
        console.log(error);
        console.log(scoreError);
        throw new Error(
          "Error loading games. Please reload the page and try again."
        );
      }

      setGame(validateArray(scoreData) ? {...data[0], average_score: scoreData[0].average_score} : data[0])
    } catch (error) {
      console.log(error);
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
    } else if (
      /* !new RegExp(regex.gameForm.synopsis).test(actualGame.synopsis) */ false
    ) {
      validationErrors = {
        ...validationErrors,
        synopsis: "The synopsis field is invalid.",
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
      //console.log(error.message);
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
      //console.log(error.message);
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

      hideGameFormModal();

      // Reset game register state and errors, and reload games data
      sendGameAlert("success", "Game registered successfully!");
      //setGameAlert({ message: `Game ${data[0].id} registered successfully!` });
      setGameRegister(initialValues.gameRegister);
      setGameRegisterErrors(initialValues.gameRegisterErrors);
      getGames();
    } catch (error) {
      sendGameAlert("error", "The game could not be registered!");
    }
  };

  /**
   * Updates an existing game in the database and associated intermediary tables.
   */
  const updateGame = async () => {
    console.log(selectedGame);
    try {
      const { data, error } = await supabaseConnection
        .from("games")
        .update({
          synopsis: selectedGame.synopsis,
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

      hideGameFormModal();

      sendGameAlert("success", "Game updated successfully!");
      // Reload games data
      getGames();

      setSelectedGame(initialValues.gameRegister);
    } catch (error) {
      sendGameAlert("error", "The game could not be updated!");
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
    console.log("entroo");
    try {
      const { error } = await supabaseConnection
        .from("games")
        .delete()
        .eq("id", selectedGame.id);

      if (error) throw new Error(`The game could not be deleted.`);

      sendGameAlert("success", "Game deleted successfully!");
      // After successful deletion, refresh the list of games
      getGames();
      // Reset the selected game state to its initial values
      setSelectedGame(initialValues.gameRegister);
    } catch (error) {
      sendGameAlert("error", "The game could not be deleted!");
    } finally {
      setIsGameDeleteModalOpen(initialValues.isGameDeleteModalOpen);
    }
  };

  /**
   * Updates the game filter state based on user input.
   * @param {Object} input - The input object containing name and value.
   * @returns {void}
   */
  const updateGameFilter = (input) => {
    const { name, value } = input;

    setGameFilter({ ...gameFilter, [name]: value });
  };

  /**
   * Filters a game based on the provided filters.
   * @param {Object} game - The game object to filter.
   * @param {Object} filters - The filters to apply.
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
   * @param {Object[]} games - The array of game objects to filter.
   * @param {Object} filters - The filters to apply.
   * @returns {Object[]} - The filtered array of game objects.
   */
  const filterGameList = (games, filters) => {
    return games.filter((game) => filterGame(game, filters));
  };

  /**
   * Resets the game filter state to its initial values.
   * @returns {void}
   */
  const resetGameFilter = () => {
    setGameFilter(initialValues.gameFilter);
  };

  const refreshGames = () => {
    getGames();
  }

  /*   useEffect(()=>{
    if(gameAdded){
      getGames();
      cancelGameAdded();
    }
  }, [gameAdded]) */

  useEffect(() => {
    const filteredGames = filterGameList(games, gameFilter);
    setFilteredGames(filteredGames);
  }, [gameFilter]);

  useEffect(() => {
    setFilteredGames(games);
  }, [games]);

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
    refreshGames
  };

  return (
    <GamesContext.Provider value={gamesData}>{children}</GamesContext.Provider>
  );
};

export default GamesProvider;
export { GamesContext };
