import React, { Fragment } from "react";

import ReactPlayer from "react-player";

import useGames from "../hooks/useGames.js";

import GameVideo from "./GameVideo.jsx";

const GameData = () => {
  const { game } = useGames();

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="text-right">
          <h2 className="text-9xl font-bold text-purple-800">{game.title}</h2>
        </div>
        <div className="flex flex-row gap-5">
          <ReactPlayer
            url={game.trailer}
            controls={true}
            wrapper={GameVideo}
            width={"100%"}
            height={"100%"}
          />
          <div className="flex-grow flex flex-col gap-5">
            <div className="self-center rounded-full bg-purple-800 text-gray-50 p-5">
              <p className="text-5xl font-bold">99/100</p>
            </div>
            <div>
              <p className="text-3xl">
                <span className="text-5xl font-bold text-purple-800">1k</span>{" "}
                Reviews
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl px-5 py-2 text-center shadow">
          <h3 className="px-5 py-2 text-3xl font-bold text-purple-800">
            SYNOPSIS
          </h3>
          <p className="px-5 py-2 text-justify">{game.synopsis}</p>
        </div>
        <div className="flex flex-row justify-between items-stretch gap-5">
          <div className="flex-grow rounded-3xl px-5 py-2 text-center shadow">
            <h3 className="px-5 py-2 text-3xl font-bold text-purple-800">
              GENRES
            </h3>
            <div className="flex flex-row justify-center gap-5 px-5 py-2">
              {game.game_genre.map((genre, index) => (
                <Fragment key={genre.genres.id}>
                  {index > 0 && (
                    <>
                      <div className="border-x-[0.5px]"></div>
                    </>
                  )}
                  <p>{genre.genres.name}</p>
                </Fragment>
              ))}
            </div>
          </div>
          <div className="flex-grow rounded-3xl px-5 py-2 text-center shadow">
            <h3 className="px-5 py-2 text-3xl font-bold text-purple-800">
              PLATFORMS
            </h3>
            <div className="flex flex-row justify-center gap-5 px-5 py-2">
              {game.game_platform.map((platform, index) => (
                <Fragment key={platform.platforms.id}>
                  {index > 0 && (
                    <>
                      <div className="border-x-[0.5px]"></div>
                    </>
                  )}
                  <p>{platform.platforms.name}</p>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameData;