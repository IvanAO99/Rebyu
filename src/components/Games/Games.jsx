import React, { Fragment } from "react";

import Col from "react-bootstrap/Col";

import Game from "../Game/Game.jsx";
import useGames from "../../hooks/useGames.js";
import ShowObject from "../ShowObject/ShowObject.jsx";
import { validateArray } from "../../libraries/validateData.js";
const Games = () => {
  const { games, filteredGames } = useGames();

  return (
    <Fragment>
      {/* <ShowObject games={filteredGames}/> */}
      {validateArray(filteredGames)
        ? filteredGames.map((value, index) => {
            return (
              <Fragment key={index}>
                <Col
                  xs={12}
                  md={6}
                  lg={4}
                  className="d-flex justify-content-center align-items-center"
                >
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
