import React, { Fragment } from "react";
import GamesFilters from "./GameFilters";
import useGames from "../hooks/useGames";
import { validateArray } from "../libraries/validateData";
import Game from "./Game.jsx";

function Games() {
  const { isLoadingGames, filteredGames } = useGames();

  //console.log(filteredGames)

  return (
    <Fragment>
      <div>
        <h2>CHECK ALL OUR GAMES!</h2>
        <GamesFilters />
        <div>
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
