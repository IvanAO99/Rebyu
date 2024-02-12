import { useContext } from "react";

import { UsersContext } from "../contexts/UsersProvider.jsx";

const useUsers = () => {
  const context = useContext(UsersContext);
  return context;
};

export default useUsers;
