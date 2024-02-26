import React, { Fragment } from "react";

import Col from "react-bootstrap/Col";

import Game from "../Game/Game.jsx";
import useGames from "../../hooks/useGames.js";
import ShowObject from "../ShowObject/ShowObject.jsx";
import { validateArray } from "../../libraries/validateData.js";
const Games = () => {
  const { filteredGames } = useGames();

  return (
    <Fragment>
      {validateArray(filteredGames)
        ? filteredGames.map((value, index) => {
            return (
              <Fragment key={index}>
                <Col xs={6} md={4} lg={3}>
                  <Game game={value} />
                </Col>
              </Fragment>
            );
          })
        : "Not games found"}
    </Fragment>
  );
};

export default Games;
