import React, { Fragment, useState } from "react";
import { FaHeart, FaHeartCrack, FaTrash, FaPen } from "react-icons/fa6";
import useLists from "../hooks/useLists";
import useUsers from "../hooks/useUsers";
import { validateObject } from "../libraries/validateData";
import useGames from "../hooks/useGames";

const Game = ({ game, onList = false }) => {
  const { id, synopsis, title, cover_pic } = game;
  const [isHovered, setIsHovered] = useState(false);
  const { user, isAdmin } = useUsers();
  const { updateSelectedGame, deleteGame } = useGames();
  /* const { checkGameInList } = useLists();

  const inList = checkGameInList(id); */

  const handleGameActions = (id, action) => {
    updateSelectedGame(id);

    /*MOSTRAR MODAL EN CASO DE UPDATE*/
    /* if (action === "update-game") MODAL ; */

    /*MOSTRAR MODAL EN CASO DE BORRADO*/
    /*Si no va es porque llama a deleteGame antes de seleccionarlo*/
    if (action === "delete-game") deleteGame();
  };

  return (
    <Fragment>
      <div className="relative overflow-hidden rounded-3xl shadow w-60 h-60 lg:w-80 lg:h-80 group">
        <div className="relative overflow-hidden h-full">
          <div className="absolute bottom-0 bg-purple-800 px-5 py-2 w-full">
            <h2 className="text-2xl text-gray-50 text-center">{title}</h2>
          </div>
          {onList ? (
            <button
              type="button"
              id={`likeHeart~${id}`}
              className={`absolute top-0 right-0 m-5 rounded-full shadow-2xl z-10 ${
                isHovered ? "text-red-500" : "text-purple-800"
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isHovered ? <FaHeartCrack size={24} /> : <FaHeart size={24} />}
            </button>
          ) : (
            validateObject(user) &&
            (isAdmin ? (
              <div
                onClick={(e) => {
                  handleGameActions(id, e.target.parentNode.id);
                }}
              >
                <button
                  
                  type="button"
                  className="absolute top-0 right-10 m-5 rounded-full text-purple-600 hover:text-purple-400 shadow-2xl z-10"
                >
                  <FaPen size={24} id="update-game"/>
                </button>
                <button
                  
                  type="button"
                  className="absolute top-0 right-0 m-5 rounded-full text-red-600 hover:text-red-400 shadow-2xl z-10"
                >
                  <FaTrash size={24} id="delete-game"/>
                </button>
              </div>
            ) : (
              <button
                type="button"
                id={`likeHeart~${id}`}
                className="absolute top-0 right-0 m-5 rounded-full text-purple-800 shadow-2xl z-10"
              >
                <FaHeart size={24} />
              </button>
            ))
          )}

          <img
            src={cover_pic}
            alt="Game Cover IMG"
            className="object-fill w-full h-full"
          />
          <div className="absolute top-0 m-5 rounded-full bg-purple-800 shadow-2xl">
            <p className="px-5 py-2 text-2xl text-gray-50">10</p>
          </div>
        </div>
        <div className="absolute -bottom-full flex flex-col justify-center items-center bg-gray-800 w-full h-full group-hover:bottom-0 transition-all duration-500">
          <p className="px-5 py-2 text-gray-50 truncate">{synopsis}</p>
          <button
            type="button"
            id={`game-card-${id}`}
            className="rounded-3xl bg-purple-800 text-gray-50 px-5 py-2 transition-all duration-300"
          >
            See more
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Game;
