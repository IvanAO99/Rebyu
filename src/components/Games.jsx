import React, { Fragment } from "react";
import GamesFilters from "./GameFilters";
import useGames from "../hooks/useGames";
import { validateArray } from "../libraries/validateData";
import Game from "./Game.jsx";

function Games() {
  const { isLoadingGames, filteredGames, getGame } = useGames();

  //console.log(filteredGames)

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

      //console.log(gameID);

      getGame(gameID);
    }
  };

  return (
    <Fragment>
      <div>
        <h2>CHECK ALL OUR GAMES!</h2>
        <GamesFilters />
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 place-items-center gap-5 p-5"
          onClick={(event) => handleGameClick(event)}
        >
          {isLoadingGames ? (
            <Fragment>
              <div className="d-flex justify-content-center align-items-center">
                <p>Cargando...</p>
              </div>
            </Fragment>
          ) : validateArray(filteredGames) ? (
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
            "No games found"
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default Games;
