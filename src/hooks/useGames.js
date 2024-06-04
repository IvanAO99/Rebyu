import { useContext } from "react";

import { GamesContext } from "../contexts/GamesProvider.jsx";

/**
 * Hook useGames
 *
 * This hook allows access to the context provided by GamesProvider.
 * It provides access to the states and functions related to games.
 *
 */
const useGames = () => {
  const context = useContext(GamesContext);
  return context;
};

export default useGames;
