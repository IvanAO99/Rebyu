import React, { Fragment } from "react";
import { FaHeart } from "react-icons/fa6";

const Game = ({ game }) => {
  //console.log(game)
  const { id, synopsis, title, cover_pic } = game;

  return (
    <Fragment>
      <div className="relative overflow-hidden border rounded-3xl shadow-2xl w-80 h-80 group">
        <div className="relative overflow-hidden h-full">
          <div className="absolute bottom-0 bg-purple-800 px-5 py-2 w-full">
            <h2 className="text-2xl text-white text-center">{title}</h2>
          </div>
          <button
            type="button"
            className="absolute top-0 right-0 m-5 border-none rounded-full text-purple-800 shadow-2xl z-10"
          >
            <FaHeart size={24} />
          </button>
          <img
            src={cover_pic}
            alt="Game Cover IMG"
            className="object-cover w-full h-full"
          />
          <div className="absolute top-0 m-5 border-none rounded-full bg-purple-800 shadow-2xl">
            <p className="px-5 py-2 text-2xl text-white">10</p>
          </div>
        </div>
        <div className="absolute -bottom-full flex flex-col justify-center items-center bg-gray-800 w-full h-full group-hover:bottom-0 transition-all duration-500">
          <p className="px-5 py-2">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam
            ipsa ipsam itaque repellat voluptate. Eos, inventore dignissimos
            doloremque recusandae ducimus, quas ipsa unde, quia iusto repellat
            illum non. Autem, quibusdam!
          </p>
          <button
            type="button"
            id={`game-card-${id}`}
            className="border-none rounded-3xl bg-purple-800 text-white px-5 py-2 transition-all duration-300"
          >
            See more
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Game;
