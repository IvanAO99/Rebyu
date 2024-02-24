import React, { Fragment } from "react";

import Col from "react-bootstrap/Col";

import Game from "../Game/Game.jsx";
import useGames from "../../hooks/useGames.js";

const Games = () => {
  const {games} = useGames();

  return (
    <Fragment>
      {games.map((value, index) => {
        return (
          <Fragment key={index}>
            <Col xs={6} md={4} lg={3}>
              <Game game={value}/>
            </Col>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default Games;
