import React, { Fragment, useState } from "react";
import { FaAngleDown, FaAngleRight, FaPen, FaTrash } from "react-icons/fa6";
import Game from "./Game";
import { validateArray } from "../libraries/validateData";
import useLists from "../hooks/useLists";

const List = ({ list }) => {
  const [isOpen, setIsOpen] = useState(false);

  const games = [1, 2, 3, 4, 5];
  const { id, name, type, games_on_list } = list;
  const { removeGameFromList } = useLists();
  return (
    <Fragment>
      <div className="[&:not(:last-child)]:border-b-2">
        <div
          className="flex flex-row justify-between items-center px-5 py-2 hover:cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-row justify-start items-center gap-5">
            {isOpen ? <FaAngleDown size={24} /> : <FaAngleRight size={24} />}
            <h3>{name.toUpperCase()}</h3>
            <p>{type}</p>
          </div>
          <div>
            <button type="button" className="mr-5 text-purple-800">
              <FaPen size={24} />
            </button>
            <button type="button" className="text-red-600">
              <FaTrash size={24} />
            </button>
          </div>
        </div>
        <div className={`${isOpen ? "block" : "hidden"} border-t-2 px-5 py-2`}>
          <div
            className="grid grid-cols-4"
            onClick={(event) => {
              console.log(event.target.parentElement.parentElement.id)
              if (event.target.parentElement.parentElement.id.includes("likeHeart")) {
                removeGameFromList(event.target.parentElement.parentElement.id.replace("likeHeart~",""), id);
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
              <p>No lists yet</p>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default List;
