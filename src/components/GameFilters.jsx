import React, { Fragment } from "react";

import useGames from "../hooks/useGames.js";

/**
 * A React component for displaying filters to refine game search.
 * @function GamesFilters
 * @returns {JSX.Element} The rendered component.
 */
const GamesFilters = () => {
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
      <div className="shadow bg-white rounded-md p-4">
        <form className="flex flex-wrap gap-x-4 flex-col lg:flex-row">
          {/* Genre filter */}
          <div className="flex items-center mb-3 justify-between">
            <label className="mr-2">Genre</label>
            <select
              aria-label="Genre select"
              name="genre"
              value={gameFilter.genre || "*"}
              onChange={(e) => {
                updateGameFilter(e.target);
              }}
              className="px-2 py-1 border border-gray-300 rounded-md"
            >
              <option value="*">All</option>
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
          </div>

          <div className="flex items-center justify-between mb-3">
            <label className="mr-2">Platform</label>
            <select
              aria-label="Platform select"
              name="platform"
              value={gameFilter.platform || "*"}
              onChange={(e) => {
                updateGameFilter(e.target);
              }}
              className="px-2 py-1 border border-gray-300 rounded-md"
            >
              <option value="*">All</option>
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
          </div>

          <div className="flex items-center mb-3 justify-between">
            <label className="mr-2">Developer</label>
            <select
              aria-label="Developer select"
              name="developer"
              value={gameFilter.developer || "*"}
              onChange={(e) => {
                updateGameFilter(e.target);
              }}
              className="px-2 py-1 border border-gray-300 rounded-md"
            >
              <option value="*">All</option>
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
          </div>

          <div className="flex items-center mb-3">
            <label className="mr-2">Search</label>
            <input
              type="search"
              name="title"
              placeholder="Search by name..."
              value={gameFilter.title}
              onChange={(e) => {
                updateGameFilter(e.target);
              }}
              className="px-2 py-1 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
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
