import React, { Fragment } from "react";

import { FaPlus } from "react-icons/fa6";

import useUsers from "../hooks/useUsers.js";
import useGames from "../hooks/useGames.js";
import useLists from "../hooks/useLists.js";

import Loading from "./Loading.jsx";
import GamesFilters from "./GameFilters.jsx";
import Game from "./Game.jsx";

import { validateArray, validateObject } from "../libraries/validateData.js";

function Games({ onAdminPage = false }) {
  const { isSessionUp, user, isAdmin } = useUsers();
  const { isLoadingGames, filteredGames, getGame, showGameFormModal } =
    useGames();
  const { addGameToList } = useLists();

  /**
   * Handles the click event on the game card.
   * @param {React.MouseEvent} event - The click event.
   */
  const handleGameClick = (event) => {
    event.preventDefault();

    if (event.target.tagName === "BUTTON") {
      const targetID = event.target.id;
      const uuidPattern =
        /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;
      const gameID = targetID.match(uuidPattern)[0];

      getGame(gameID);
    }
  };

  return (
    <Fragment>
      <div>
        <div className="flex flex-row justify-stretch items-center gap-2 py-2">
          <div className="flex-grow border-y-2 border-purple-600"></div>
          <h2 className="text-3xl md:text-6xl font-bold">
            {isSessionUp && validateObject(user) && isAdmin
              ? "GAMES"
              : "CHECK ALL OUR GAMES!"}
          </h2>
          {isSessionUp && validateObject(user) && isAdmin && (
            <>
              <button
                type="button"
                className="rounded-full bg-purple-600 hover:bg-purple-400 text-gray-50 p-2 transition-all duration-300"
                onClick={() => showGameFormModal("create")}
              >
                <FaPlus size={24} />
              </button>
            </>
          )}
          <div className="flex-grow border-y-2 border-purple-600"></div>
        </div>
        <GamesFilters />
        {isLoadingGames ? (
          <>
            <div className="flex flex-col justify-center items-center px-5 py-2">
              <Loading />
              <p className="px-5 py-2 text-purple-600 font-bold">
                Loading games...
              </p>
            </div>
          </>
        ) : (
          <>
            <div
              className={` ${
                onAdminPage
                  ? "flex flex-row flex-wrap justify-center items-center gap-5 p-5"
                  : "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 place-items-center gap-5 p-5"
              } `}
              onClick={(event) => {
                handleGameClick(event);

                if (
                  event.target.parentElement.parentElement.id.includes(
                    "likeHeart"
                  )
                ) {
                  addGameToList(
                    event.target.parentElement.parentElement.id.replace(
                      "likeHeart~",
                      ""
                    )
                  );
                }
              }}
            >
              {validateArray(filteredGames) ? (
                filteredGames.map((value, index) => {
                  return (
                    <Fragment key={index}>
                      <Game game={value} />
                    </Fragment>
                  );
                })
              ) : (
                <>
                  <p>No games found.</p>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </Fragment>
  );
}

export default Games;
