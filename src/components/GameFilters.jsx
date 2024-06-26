import React, { Fragment } from "react";

import useUsers from "../hooks/useUsers.js";
import useGames from "../hooks/useGames.js";

/**
 * GamesFilters Component
 *
 * This component displays filters for searching games by genre, platform, developer, and name.
 * It uses the useUsers and useGames hooks to retrieve necessary information and perform filtering operations.
 * The filters include dropdown options for genre, platform, and developer, as well as a search field
 * for the game name. It also includes a button to reset the filters.
 *
 */
const GamesFilters = () => {
  const { isAdmin } = useUsers();
  const {
    genres,
    developers,
    platforms,
    updateGameFilter,
    resetGameFilter,
    gameFilter,
  } = useGames();

  return (
    <Fragment>
      <div className="flex justify-center items-center p-5">
        <form
          className={` flex flex-col ${
            isAdmin ? "xl:flex-row" : "lg:flex-row"
          }  justify-between items-center gap-5 `}
        >
          <select
            aria-label="Genre select"
            name="genre"
            value={gameFilter.genre || "*"}
            onChange={(e) => {
              updateGameFilter(e.target);
            }}
            className="cursor-pointer border-none focus:outline-none focus:ring-2 focus:ring-purple-600 rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600 shadow"
          >
            <option value="*">Select genre</option>
            {genres ? (
              genres.map((genre) => {
                return (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                );
              })
            ) : (
              <option>Error. Reload the page</option>
            )}
          </select>
          <select
            aria-label="Platform select"
            name="platform"
            value={gameFilter.platform || "*"}
            onChange={(e) => {
              updateGameFilter(e.target);
            }}
            className="cursor-pointer border-none focus:outline-none focus:ring-2 focus:ring-purple-600 rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600 shadow"
          >
            <option value="*">Select platform</option>
            {platforms ? (
              platforms.map((platform) => {
                return (
                  <option key={platform.id} value={platform.id}>
                    {platform.name}
                  </option>
                );
              })
            ) : (
              <option>Error. Reload the page</option>
            )}
          </select>
          <select
            aria-label="Developer select"
            name="developer"
            value={gameFilter.developer || "*"}
            onChange={(e) => {
              updateGameFilter(e.target);
            }}
            className="cursor-pointer border-none focus:outline-none focus:ring-2 focus:ring-purple-600 rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600 shadow"
          >
            <option value="*">Select developer</option>
            {developers ? (
              developers.map((developer) => {
                return (
                  <option key={developer.id} value={developer.id}>
                    {developer.name}
                  </option>
                );
              })
            ) : (
              <option>Error. Reload the page</option>
            )}
          </select>
          <input
            type="search"
            name="title"
            placeholder="Search by name..."
            value={gameFilter.title}
            onChange={(e) => {
              updateGameFilter(e.target);
            }}
            className="border-none focus:outline-none focus:ring-2 focus:ring-purple-600 rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600 shadow"
          />
          <button
            type="button"
            className="rounded-3xl bg-purple-600 hover:bg-purple-400 px-5 py-2 text-gray-50 shadow transition-all duration-300"
            onClick={(e) => {
              resetGameFilter();
            }}
          >
            Reset
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default GamesFilters;
