import React, { Fragment, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Games from "../../components/Games/Games.jsx";

import ShowObject from "../../components/ShowObject/ShowObject.jsx";

import useGames from "../../hooks/useGames.js";

const GamesPage = () => {
  
  const {games, game, getGame} = useGames();
  

  return (
    <Fragment>
      <Container className="py-5 h-100">
        <Row className="g-5">
          <ShowObject games={game}/>
          {/* <Games /> */}
        </Row>
      </Container>
    </Fragment>
  );
};

export default GamesPage;
