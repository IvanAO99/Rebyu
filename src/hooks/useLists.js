import { useContext } from "react";

import { ListsContext } from "../contexts/ListsProvider.jsx";

/**
 * Hook useLists
 *
 * This hook allows access to the context provided by ListsProvider.
 * It provides access to the states and functions related to user lists.
 *
 */
const useLists = () => {
  const context = useContext(ListsContext);
  return context;
};

export default useLists;
