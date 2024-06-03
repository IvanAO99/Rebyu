import { useContext } from "react";

import { GamesContext } from "../contexts/GamesProvider.jsx";

/**
 * A custom React hook for accessing the GamesContext.
 * @returns {Object} The GamesContext object.
 */
const useGames = () => {
  const context = useContext(GamesContext);
  return context;
};

export default useGames;
