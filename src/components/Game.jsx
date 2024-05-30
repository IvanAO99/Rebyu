import React, { Fragment, useState } from "react";
import { FaHeart, FaHeartCrack, FaTrash, FaPen } from "react-icons/fa6";
import useLists from "../hooks/useLists";
import useUsers from "../hooks/useUsers";
import { validateObject } from "../libraries/validateData";
import useGames from "../hooks/useGames";
import { formatScore } from "../libraries/manipulateData";

const Game = ({ game, onList = false }) => {
  const { id, synopsis, title, cover_pic } = game;
  const [isHovered, setIsHovered] = useState(false);
  const { isSessionUp, user, isAdmin } = useUsers();
  const { showGameFormModal, updateSelectedGame, showGameDeleteModal } =
    useGames();
  /* const { checkGameInList } = useLists();

  const inList = checkGameInList(id); */

  const handleGameActions = (id, action) => {
    updateSelectedGame(id);

    /*MOSTRAR MODAL EN CASO DE UPDATE*/
    if (action === "update-game") showGameFormModal("update");

    /*MOSTRAR MODAL EN CASO DE BORRADO*/
    /*Si no va es porque llama a deleteGame antes de seleccionarlo*/
    if (action === "delete-game") showGameDeleteModal();
  };

  return (
    <Fragment>
      <div className="relative overflow-hidden rounded-3xl shadow w-60 h-60 lg:w-80 lg:h-80 group">
        <div className="relative overflow-hidden h-full">
          <div className="absolute bottom-0 bg-purple-600 px-5 py-2 w-full">
            <h2 className="w-full text-2xl text-gray-50 text-center truncate">
              {title}
            </h2>
          </div>
          {onList ? (
            <button
              type="button"
              id={`likeHeart~${id}`}
              className={`absolute top-0 right-0 m-5 rounded-full shadow-2xl z-10 ${
                isHovered ? "text-red-600" : "text-purple-600"
              } transition-all duration-300`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isHovered ? <FaHeartCrack size={24} /> : <FaHeart size={24} />}
            </button>
          ) : (
            isSessionUp &&
            validateObject(user) &&
            (isAdmin ? (
              <div
                className="z-10 absolute top-0 right-0 m-5 flex flex-row gap-2"
                onClick={(e) => {
                  handleGameActions(id, e.target.parentNode.id);
                }}
              >
                <button
                  type="button"
                  className="rounded-full bg-gray-800/50 p-2 text-purple-600 hover:text-purple-400 shadow-2xl cursor-pointer"
                >
                  <FaPen size={24} id="update-game" />
                </button>
                <button
                  type="button"
                  className="rounded-full bg-gray-800/50 p-2 text-red-600 hover:text-red-400 shadow-2xl cursor-pointer"
                >
                  <FaTrash size={24} id="delete-game" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                id={`likeHeart~${id}`}
                className="z-10 absolute top-0 right-0 m-5 rounded-full text-gray-600 hover:text-purple-600 shadow transition-all duration-300 cursor-pointer"
              >
                <FaHeart size={24} />
              </button>
            ))
          )}
          <img
            src={cover_pic}
            alt="Game Cover IMG"
            className="object-cover w-full h-full"
          />
          <div className="absolute top-0 m-5 rounded-full bg-purple-600 shadow-2xl">
            <p className="px-5 py-2 text-2xl text-gray-50">
              {formatScore(game.average_score)}
            </p>
          </div>
        </div>
        <div className="absolute -bottom-full flex flex-col justify-center items-center gap-5 bg-gray-800 w-full h-full group-hover:bottom-0 transition-all duration-500">
          <p className="w-full h-32 px-5 py-2 text-center text-gray-50 line-clamp-5">
            {synopsis}
          </p>
          <button
            type="button"
            id={`game-card-${id}`}
            className="rounded-3xl bg-purple-600 hover:bg-purple-400 px-5 py-2 text-gray-50 shadow transition-all duration-300"
          >
            See more
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Game;
