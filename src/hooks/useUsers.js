import { useContext } from "react";

import { UsersContext } from "../contexts/UsersProvider.jsx";

/**
 * Hook useUsers
 *
 * This hook allows access to the context provided by UsersProvider.
 * It provides access to the states and functions related to users.
 *
 */
const useUsers = () => {
  const context = useContext(UsersContext);
  return context;
};

export default useUsers;
