import React, { Fragment } from "react";

import Col from "react-bootstrap/Col";

import useGames from "../../hooks/useGames.js";

import Loading from "../Loading/Loading.jsx";
import Game from "../Game/Game.jsx";

import { validateArray } from "../../libraries/validateData.js";

/**
 * A React component for displaying a list of games.
 * @function Games
 * @returns {JSX.Element} The rendered component.
 */
const Games = () => {
  const { isLoadingGames, filteredGames } = useGames();

  return (
    <Fragment>
      {/* Loading spinner while games are being loaded */}
      {isLoadingGames ? (
        <Fragment>
          <Col className="d-flex justify-content-center align-items-center">
            <Loading variant="primary" />
          </Col>
        </Fragment>
      ) : validateArray(filteredGames) ? (
        // Displaying the list of games
        filteredGames.map((value, index) => {
          return (
            <Fragment key={index}>
              <Col
                xs={12}
                md={6}
                lg={4}
                className="d-flex justify-content-center align-items-center"
              >
                {/* Game component for each game in the list */}
                <Game game={value} />
              </Col>
            </Fragment>
          );
        })
      ) : (
        // Message when no games are found
        "No games found"
      )}
    </Fragment>
  );
};

export default Games;
