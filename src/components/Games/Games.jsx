import React, { Fragment } from "react";

import Col from "react-bootstrap/Col";

import Game from "../Game/Game.jsx";

const Games = () => {
  const test = [1, 2, 3, 4, 5];
  return (
    <Fragment>
      {test.map((value, index) => {
        return (
          <Fragment key={index}>
            <Col xs={6} md={4} lg={3}>
              <Game />
            </Col>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default Games;
