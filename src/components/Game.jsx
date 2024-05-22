import React, { Fragment, useState } from "react";
import { FaHeart, FaHeartCrack } from "react-icons/fa6";
import useLists from "../hooks/useLists";

const Game = ({ game, onList = false }) => {
  const { id, synopsis, title, cover_pic } = game;
  const [isHovered, setIsHovered] = useState(false);
  /* const { checkGameInList } = useLists();

  const inList = checkGameInList(id); */

  return (
    <Fragment>
      <div className="relative overflow-hidden rounded-3xl shadow w-60 h-60 lg:w-80 lg:h-80 group">
        <div className="relative overflow-hidden h-full">
          <div className="absolute bottom-0 bg-purple-600 px-5 py-2 w-full">
            <h2 className="text-2xl text-gray-50 text-center">{title}</h2>
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
            <button
              type="button"
              id={`likeHeart~${id}`}
              className="z-10 absolute top-0 right-0 m-5 rounded-full text-gray-600 hover:text-purple-600 shadow transition-all duration-300"
            >
              <FaHeart size={24} />
            </button>
            /* <button
              type="button"
              id={`likeHeart~${id}`}
              className={`absolute top-0 right-0 m-5 rounded-full shadow-2xl z-10 ${
                inList ? "text-red-500" : "text-purple-800"
              }`}
            >
              {inList ? <FaHeartCrack size={24} /> : <FaHeart size={24} />}
            </button> */
          )}
          <img
            src={cover_pic}
            alt="Game Cover IMG"
            className="object-fill w-full h-full"
          />
          <div className="absolute top-0 m-5 rounded-full bg-purple-600 shadow-2xl">
            <p className="px-5 py-2 text-2xl text-gray-50">10</p>
          </div>
        </div>
        <div className="absolute -bottom-full flex flex-col justify-center items-center bg-gray-800 w-full h-full group-hover:bottom-0 transition-all duration-500">
          <p className="px-5 py-2 text-gray-50 truncate">{synopsis}</p>
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
