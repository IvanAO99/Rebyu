import { useContext } from "react";

import { ListsContext } from "../contexts/ListsProvider.jsx";

/**
 * Hook useLists
 *
 * Este hook permite acceder al contexto proporcionado por ListsProvider.
 * Proporciona acceso a los estados y funciones relacionadas con las listas de usuarios.
 *
 */

const useLists = () => {
  const context = useContext(ListsContext);
  return context;
};

export default useLists;
