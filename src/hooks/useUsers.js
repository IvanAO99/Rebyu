import { useContext } from "react";

import { UsersContext } from "../contexts/UsersProvider.jsx";

/**
 * A custom React hook for accessing the UsersContext.
 * @returns {Object} The UsersContext object.
 */
const useUsers = () => {
  const context = useContext(UsersContext);
  return context;
};

export default useUsers;