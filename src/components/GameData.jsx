import React, { Fragment } from "react";

import ReactPlayer from "react-player";

import useGames from "../hooks/useGames.js";

import GameVideo from "./GameVideo.jsx";
import useReviews from "../hooks/useReviews.js";

const GameData = () => {
  const { game } = useGames();
  const { reviewsWithLikes } = useReviews();

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="border-b-4 border-purple-600 text-right">
          <h2 className="text-9xl font-bold text-purple-600">{game.title}</h2>
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
            <div className="self-center rounded-full bg-purple-600 text-gray-50 p-5">
              <p className="text-5xl font-bold">99/100</p>
            </div>
            <div>
              <p className="text-6xl">
                <span className="text-6xl font-bold text-purple-600">
                  {reviewsWithLikes.length}
                </span>{" "}
                Reviews
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-stretch items-center gap-1 py-2">
          <div className="flex-grow border-y-2 border-purple-600"></div>
          <h2 className="text-6xl font-bold">SUMMARY</h2>
          <div className="flex-grow border-y-2 border-purple-600"></div>
        </div>
        <div className="text-center">
          {/*           <h3 className="px-5 py-2 text-6xl font-bold text-purple-600">
            SYNOPSIS
          </h3> */}
          <div className="rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 text-justify shadow">
            <p>{game.synopsis}</p>
          </div>
        </div>
        <div className="flex flex-row justify-between items-stretch gap-5">
          <div className="flex-grow rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 text-center shadow">
            <h3 className="px-5 py-2 text-6xl font-bold text-purple-600">
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
          <div className="flex-grow rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 text-center shadow">
            <h3 className="px-5 py-2 text-6xl font-bold text-purple-600">
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
