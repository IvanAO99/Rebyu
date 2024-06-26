import React, { Fragment, useState } from "react";

import { FaAngleDown, FaAngleRight, FaPen, FaTrash } from "react-icons/fa6";

import useGames from "../hooks/useGames.js";
import useLists from "../hooks/useLists.js";

import Game from "./Game.jsx";

import { validateArray } from "../libraries/validateData.js";

/**
 * Component List
 *
 * This component represents a list of games saved by the user.
 * It displays the list name, the number of saved games, and the list type.
 * It allows expanding and collapsing the list to show or hide the games.
 * It uses the useGames and useLists hooks to fetch games and manage game lists.
 * It utilizes the Game component to display each game in the list.
 *
 * Props:
 * @param {object} list - Object containing the list information.
 *
 */
const List = ({ list }) => {
  const { id, name, type, games_on_list } = list;

  const { getGame, filteredGames } = useGames();
  const { showListFormModal, removeGameFromList, showListDeleteModal } =
    useLists();

  const [isOpen, setIsOpen] = useState(false);

  const gameIDsOnList = games_on_list.map((item) => item.games.id);
  const filteredGamesOnList = filteredGames.filter((game) =>
    gameIDsOnList.includes(game.id)
  );

  const handleGameClick = (event) => {
    event.preventDefault();

    if (event.target.tagName === "BUTTON") {
      const targetID = event.target.id;
      const uuidPattern =
        /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;
      const gameID = targetID.match(uuidPattern)[0];

      getGame(gameID);
    }
  };

  return (
    <Fragment>
      <div className="[&:not(:last-child)]:border-b-2 border-gray-100 dark:border-gray-800">
        <div
          className={`flex flex-row justify-between items-center ${
            isOpen && "bg-gray-100 dark:bg-gray-800"
          } hover:bg-gray-100 hover:dark:bg-gray-800 px-5 py-2 hover:cursor-pointer transition-all duration-300`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-col sm:flex-row justify-start items-center gap-5">
            {isOpen ? <FaAngleDown size={24} /> : <FaAngleRight size={24} />}
            <h3>{name.toUpperCase()}</h3>
            <p>({games_on_list.length} GAMES SAVED)</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-end gap-2">
            <p
              className={`px-5 py-2 rounded-3xl font-bold ${
                type === "public" ? "bg-purple-600" : "bg-red-600"
              } text-gray-50`}
            >
              {type.toUpperCase()}
            </p>
            {name !== "FAVOURITES" && (
              <>
                <button
                  type="button"
                  className="rounded-3xl hover:bg-gray-800 p-2 text-purple-600 hover:text-purple-400 transition-all duration-300"
                  onClick={(event) => {
                    event.stopPropagation();
                    showListFormModal(true, list);
                  }}
                >
                  <FaPen size={24} />
                </button>
                <button
                  type="button"
                  className="rounded-3xl hover:bg-gray-800 p-2 text-red-600 hover:text-red-400 transition-all duration-300"
                  onClick={(event) => {
                    event.stopPropagation();
                    showListDeleteModal(list);
                  }}
                >
                  <FaTrash size={24} />
                </button>
              </>
            )}
          </div>
        </div>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } bg-gray-100 dark:bg-gray-800/50 px-5 py-2`}
        >
          <div
            className="flex flex-row flex-wrap justify-center xl:justify-start items-center gap-5 p-5"
            onClick={(event) => {
              handleGameClick(event);

              if (
                event.target.parentElement.parentElement.id.includes(
                  "likeHeart"
                )
              ) {
                removeGameFromList(
                  event.target.parentElement.parentElement.id.replace(
                    "likeHeart~",
                    ""
                  ),
                  id
                );
              }
            }}
          >
            {validateArray(filteredGamesOnList) ? (
              filteredGamesOnList.map((game, index) => (
                <Fragment key={index}>
                  <Game game={game} onList={true} />
                </Fragment>
              ))
            ) : (
              <p>No games yet</p>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default List;
