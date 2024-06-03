import { useContext } from "react";

import { ListsContext } from "../contexts/ListsProvider.jsx";
/**
 * A custom React hook for accessing the GamesContext.
 * @returns {Object} The GamesContext object.
 */
const useLists = () => {
  const context = useContext(ListsContext);
  return context;
};

export default useLists;
