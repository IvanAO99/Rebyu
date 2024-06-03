import React from "react";

import User from "./User.jsx";

const Users = ({ users }) => {
  return (
    <div className="w-full flex flex-col items-center max-w-4xl mx-auto">
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
};

export default Users;
