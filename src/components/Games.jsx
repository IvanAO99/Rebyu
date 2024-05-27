import React, { Fragment } from "react";
import GamesFilters from "./GameFilters";
import useGames from "../hooks/useGames";
import useLists from "../hooks/useLists.js";
import { validateArray, validateObject } from "../libraries/validateData";
import Game from "./Game.jsx";
import useUsers from "../hooks/useUsers.js";
import Loading from "./Loading.jsx";

function Games() {
  const { isSessionUp, user, isAdmin } = useUsers();
  const { isLoadingGames, filteredGames, getGame } = useGames();
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
        <div className="flex flex-row justify-stretch items-center gap-1 py-2">
          <div className="flex-grow border-y-2 border-purple-600"></div>
          <h2 className="text-6xl font-bold">
            {isSessionUp && validateObject(user) && isAdmin
              ? "GAMES"
              : "CHECK ALL OUR GAMES!"}
          </h2>
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
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 place-items-center gap-5 p-5"
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
                // Displaying the list of games
                filteredGames.map((value, index) => {
                  return (
                    <Fragment key={index}>
                      <Game game={value} />
                    </Fragment>
                  );
                })
              ) : (
                // Message when no games are found
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
