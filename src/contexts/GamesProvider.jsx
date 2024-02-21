import React, { createContext, useEffect, useState } from "react";
import { supabaseConnection } from "../.config/supabase.js";
import { validateObject } from "../libraries/validateData.js";

import regex from "../jsons/regex.json";

const GamesContext = createContext();

const GamesProvider = ({ children }) => {
  /* DEBUG */
  const debug = false;

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
      developer: [],
      platform: [],
      genre: [],
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

  /* FUNCTIONS */
  const getGames = async () => {
    try {
      setIsLoadingGames(true);
      const { data, error } = await supabaseConnection
        .from("games")
        .select("*");

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

  const getGame = async (gameID) => {
    try {
      setIsLoadingGame(true);
      const { data, error } = await supabaseConnection
        .from("games")
        .select("*")
        .eq("id", gameID);

      if (error)
        throw new Error(
          "Error loading the game. Please reload the page and try again."
        );
      setGame(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoadingGame(false);
    }
  };

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

  const handleCheckboxChange = (event) => {
    const { name, value } = event.target;
    setGameRegister((prevState) => {
      if (prevState[name].includes(value)) {
        return {
          ...prevState,
          [name]: prevState[name].filter((item) => item !== value),
        };
      } else {
        return { ...prevState, [name]: [...prevState[name], value] };
      }
    });
  };

  const updateGameRegister = (input) => {
    const { name, value } = input;

    setGameRegister({ ...gameRegister, [name]: value });
    setGameRegisterErrors({ ...gameRegisterErrors, [name]: null });
  };

  const validateGameRegister = () => {
    let validationErrors = {};

    if (!gameRegister.title) {
      validationErrors = {
        ...validationErrors,
        title: "The title field is required.",
      };
    } else if (!new RegExp(regex.gameForm.title).test(gameRegister.title)) {
      validationErrors = {
        ...validationErrors,
        title: "The title field is invalid.",
      };
    }

    return validationErrors;
  };

  const handleGameRegister = () => {
    const validationErrors = validateGameRegister();

    if (validateObject(validationErrors)) {
      setGameRegisterErrors(validationErrors);
    } else {
      setGameRegisterErrors(initialValues.gameRegisterErrors);
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
    updateGameRegister,
    handleCheckboxChange,
    handleGameRegister,
  };

  return (
    <GamesContext.Provider value={gamesData}>{children}</GamesContext.Provider>
  );
};

export default GamesProvider;
export { GamesContext };
