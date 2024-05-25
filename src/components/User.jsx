import React from "react";
import { FaPen, FaTrash } from "react-icons/fa6";

const User = ({ user }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 w-2/3 dark:border-white">
      <div className="flex items-center">
        <img
          src={user.profile_photo}
          alt={`${user.name}'s profile`}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="ml-4">
          <h2 className="text-xl font-bold dark:text-gray-50">{user.name}</h2>
          <p className="text-gray-600 dark:text-gray-400">{user.nickname}</p>
          <p className="text-gray-600 dark:text-gray-400">Birth Date: {user.birth_date}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2 gap-4">
        <button
          className="text-purple-600 hover:text-purple-400 dark:text-purple-400 dark:hover:text-purple-200"
        >
          <FaPen size={24} />
        </button>
        <button
          className="text-red-600 hover:text-red-400 dark:text-red-400 dark:hover:text-red-200"
        >
          <FaTrash size={24} />
        </button>
      </div>
    </div>
  );
};

export default User;
