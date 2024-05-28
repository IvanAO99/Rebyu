import React from "react";
import useGames from "../hooks/useGames";

const NewGame = ({ game }) => {
  const { wallpaper, title, synopsis, id } = game;

  const { getGame } = useGames();

  return (
    <>
      <div className="relative h-full w-full">
        <img
          src={wallpaper || ""}
          alt=""
          srcset=""
          className="object-cover h-full w-full"
        />
        <div className="absolute top-0 h-full w-full gap-5 p-20">
          <div className="h-full w-full flex flex-row justify-between gap-5">
            <div className="flex flex-col gap-5 text-center">
              <div className="shadow w-full rounded-3xl bg-gray-800/50 px-5 py-2">
                <h2 className="py-5 text-6xl font-bold text-gray-50">
                  {title}
                </h2>
              </div>
              <div className="shadow relative h-96 w-2/4 flex-grow rounded-3xl bg-gray-800/50 px-5 py-2">
                <p className="p-5 text-justify text-gray-50">{synopsis}</p>
                <div className="z-10 absolute bottom-0 right-0 mr-5 mb-5">
                  <button
                    type="button"
                    className="shadow rounded-3xl bg-purple-600/50 hover:bg-purple-600 px-5 py-2 text-3xl text-gray-50 transition-all duration-300"
                    onClick={() => getGame(id)}
                  >
                    See more
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewGame;
