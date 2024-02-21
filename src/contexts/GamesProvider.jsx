import React, { createContext, useEffect, useState } from "react";
import { supabaseConnection } from "../.config/supabase.js";
import { validateArray, validateObject } from "../libraries/validateData.js";

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

    setGameRegister({
      ...gameRegister,
      [name]: gameRegister[name].includes(value) ? gameRegister[name].filter((item) => item !== value) : [...gameRegister[name], value]
    })
  };

  const updateGameRegister = (input) => {
    const { name, value } = input;

    setGameRegister({ ...gameRegister, [name]: value });
    setGameRegisterErrors({ ...gameRegisterErrors, [name]: null });
  };

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const checkValues = (optionsSelected, arrayParam) => {
    const arrayParamNames = arrayParam.map((value) => value.name);
    return optionsSelected.every((option) => arrayParamNames.includes(option));
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

    if (!gameRegister.synopsis) {
      validationErrors = {
        ...validationErrors,
        synopsis: "The synopsis field is required.",
      };
    } else if (
      !new RegExp(regex.gameForm.synopsis).test(gameRegister.synopsis)
    ) {
      validationErrors = {
        ...validationErrors,
        synopsis: "The synopsis field is invalid.",
      };
    }

    if (!gameRegister.price) {
      validationErrors = {
        ...validationErrors,
        price: "The price field is required.",
      };
    } else if (!new RegExp(regex.gameForm.price).test(gameRegister.price)) {
      validationErrors = {
        ...validationErrors,
        price: "The price field is invalid.",
      };
    }

    if (!gameRegister.release_date) {
      validationErrors = {
        ...validationErrors,
        release_date: "The date field is required.",
      };
    } else if (
      !new RegExp(regex.gameForm.release_date).test(gameRegister.release_date)
    ) {
      validationErrors = {
        ...validationErrors,
        release_date: "The date field is invalid.",
      };
    }

    if (!gameRegister.cover_pic) {
      validationErrors = {
        ...validationErrors,
        cover_pic: "The cover image field is required.",
      };
    } else if (!isValidURL(gameRegister.cover_pic)) {
      validationErrors = {
        ...validationErrors,
        cover_pic: "The URL doesn't exist.",
      };
    }

    if (!gameRegister.trailer) {
      validationErrors = {
        ...validationErrors,
        trailer: "The trailer field is required.",
      };
    } else if (!isValidURL(gameRegister.trailer)) {
      validationErrors = {
        ...validationErrors,
        trailer: "The URL doesn't exist.",
      };
    }

    if (!validateArray(gameRegister.developer)) {
      validationErrors = {
        ...validationErrors,
        developer: "The developer field need one value at least.",
      };
    } else if (!checkValues(gameRegister.developer, developers)) {
      validationErrors = {
        ...validationErrors,
        developer: "Make sure to select a valid options.",
      };
    }

    if (!validateArray(gameRegister.platform)) {
      validationErrors = {
        ...validationErrors,
        platform: "The developer field need one value at least.",
      };
    } else if (!checkValues(gameRegister.platform, platforms)) {
      validationErrors = {
        ...validationErrors,
        platform: "Make sure to select a valid options.",
      };
    }

    if (!validateArray(gameRegister.genre)) {
      validationErrors = {
        ...validationErrors,
        genre: "The developer field need one value at least.",
      };
    } else if (!checkValues(gameRegister.genre, genres)) {
      validationErrors = {
        ...validationErrors,
        genre: "Make sure to select a valid options.",
      };
    }

    return validationErrors;
  };

  const registerGame = async () => {
    try {
      const { data, error } = await supabaseConnection
        .from("games")
        .insert({ 
          synopsis: gameRegister.synopsis, 
          price: gameRegister.price,
          title: gameRegister.title,
          release_date: gameRegister.release_date,
          cover_pic: gameRegister.cover_pic,
          trailer: gameRegister.trailer
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGameRegister = () => {
    const validationErrors = validateGameRegister();

    if (validateObject(validationErrors)) {
      setGameRegisterErrors(validationErrors);
      console.log("todomal");
    } else {
      setGameRegisterErrors(initialValues.gameRegisterErrors);
      registerGame();
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
