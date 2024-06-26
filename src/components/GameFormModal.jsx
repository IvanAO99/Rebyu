import React from "react";

import { FaX } from "react-icons/fa6";

import useGames from "../hooks/useGames.js";

import GameForm from "./GameForm.jsx";

/**
 * Component GameFormModal
 *
 * This component displays a modal for creating or updating a game.
 * It uses the useGames hook to handle the modal opening and closing, as well as to handle game creation or update actions.
 * The modal contains the GameForm component to input game data.
 *
 * Props:
 * @param {boolean} creationMode - Boolean indicating whether the modal is in creation mode (true) or update mode (false).
 *
 */
const GameFormModal = ({ creationMode }) => {
  const { hideGameFormModal, handleGameForm } = useGames();

  return (
    <>
      <div className="rounded-3xl bg-gray-50 dark:bg-gray-700 p-2 text-gray-900 dark:text-gray-50 shadow">
        <div className="flex flex-row justify-between items-center gap-5 px-5 py-2">
          <h1 className="text-3xl font-bold text-center">
            {creationMode ? "CREATE GAME" : "UPDATE GAME"}
          </h1>
          <button
            type="button"
            className="rounded-full hover:bg-gray-100 hover:dark:bg-gray-800 p-2 text-gray-900 dark:text-gray-50 hover:shadow transition-all duration-300"
            onClick={() => hideGameFormModal()}
          >
            <FaX size={24} />
          </button>
        </div>
        <div className="border-y-2 border-gray-100 dark:border-gray-800 px-5 py-2">
          <GameForm creationMode={creationMode} />
        </div>
        <div>
          <div className="flex flex-row justify-end items-center gap-5 px-5 py-2">
            <button
              type="button"
              className="rounded-3xl bg-purple-600 hover:bg-purple-400 px-5 py-2 text-gray-50 shadow transition-all duration-300"
              onClick={() => handleGameForm(creationMode)}
            >
              {creationMode ? "Create" : "Update"}
            </button>
            <button
              type="button"
              className="rounded-3xl bg-gray-800 hover:bg-gray-600 px-5 py-2 text-gray-50 shadow transition-all duration-300"
              onClick={() => hideGameFormModal()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameFormModal;
