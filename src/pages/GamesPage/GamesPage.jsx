import React, { Fragment, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Games from "../../components/Games/Games.jsx";

import GameForm from "../../components/GameForm/GameForm.jsx";

const GamesPage = () => {
  return (
    <Fragment>
      <Container className="py-5 h-100">
        <Row className="g-5">
          <GameForm creationMode={false} />
          <Games />
        </Row>
      </Container>
    </Fragment>
  );
};

export default GamesPage;
