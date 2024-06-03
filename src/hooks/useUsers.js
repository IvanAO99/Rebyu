import { useContext } from "react";

import { UsersContext } from "../contexts/UsersProvider.jsx";

/**
 * Hook useUsers
 *
 * Este hook permite acceder al contexto proporcionado por UsersProvider.
 * Proporciona acceso a los estados y funciones relacionadas con los usuarios.
 *
 */
const useUsers = () => {
  const context = useContext(UsersContext);
  return context;
};

export default useUsers;
