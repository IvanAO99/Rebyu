import React, { Fragment } from "react";

const Game = () => {
  const gameCover =
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/images/games/covers/tlou2.jpg";

  return (
    <Fragment>
      <div className="relative overflow-hidden border rounded-3xl shadow-2xl w-80 h-80 group">
        <div className="relative overflow-hidden h-full">
          <img
            src={gameCover}
            alt="Game Cover IMG"
            className="object-cover h-full"
          />
          <div className="absolute bottom-0 right-0 m-5 border-none rounded-full bg-purple-800 shadow-2xl">
            <p className="px-5 py-2 text-2xl text-white">10</p>
          </div>
        </div>
        <div className="absolute -bottom-full flex flex-col justify-center items-center bg-gray-800 w-full h-full group-hover:bottom-0 transition-all duration-500">
          <h2 className="text-2xl text-white">TITLE</h2>
          <p className="text-white px-5 py-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            dolor aut, rem enim amet asperiores exercitationem repellat
            laudantium! Iusto quos esse harum corrupti laborum laboriosam
            quisquam incidunt inventore ullam labore?
          </p>
          <button
            type="button"
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
