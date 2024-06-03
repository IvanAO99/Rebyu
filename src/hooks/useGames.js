import { useContext } from "react";

import { GamesContext } from "../contexts/GamesProvider.jsx";

/**
 * Hook useGames
 *
 * Este hook permite acceder al contexto proporcionado por GamesProvider.
 * Proporciona acceso a los estados y funciones relacionadas con los juegos.
 *
 */
const useGames = () => {
  const context = useContext(GamesContext);
  return context;
};

export default useGames;
