import React, { Fragment, useState } from "react";
import { FaAngleDown, FaAngleRight, FaPen, FaTrash } from "react-icons/fa6";
import Game from "./Game";
import { validateArray } from "../libraries/validateData";
import useLists from "../hooks/useLists";
import useGames from "../hooks/useGames";

const List = ({ list }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { id, name, type, games_on_list } = list;
  const { removeGameFromList, selectListToUpdate, deleteList, possibleDelete } =
    useLists();
  const { getGame } = useGames();

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
      <div className="[&:not(:last-child)]:border-b-2 py-4">
        <div
          className="flex flex-row justify-between items-center px-5 py-2 hover:cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-row justify-start items-center gap-5">
            {isOpen ? <FaAngleDown size={24} /> : <FaAngleRight size={24} />}
            <h3>{name.toUpperCase()}</h3>
            <p>({games_on_list.length} GAMES SAVED)</p>
          </div>
          <div className="flex gap-2">
            <p
              className={`mr-10 px-10 rounded-xl font-bold ${
                type === "public" ? "bg-green-300" : "bg-red-300"
              }`}
            >
              {type.toUpperCase()}
            </p>
            <button
              type="button"
              className="mr-5 text-purple-800"
              onClick={() => {
                selectListToUpdate(list);
              }}
            >
              <FaPen size={24} />
            </button>
            {possibleDelete && (
              <button
                type="button"
                className="text-red-600"
                onClick={() => {
                  deleteList(id);
                }}
              >
                <FaTrash size={24} />
              </button>
            )}
          </div>
        </div>
        <div className={`${isOpen ? "block" : "hidden"} border-t-2 px-5 py-2`}>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 place-items-center gap-5 p-5"
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
            {validateArray(games_on_list) ? (
              games_on_list.map((game, index) => (
                <Fragment key={index}>
                  <Game game={game.games} onList={true} />
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
