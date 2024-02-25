import React, { Fragment, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import useGames from "../../hooks/useGames.js";

import Games from "../../components/Games/Games.jsx";

import GameForm from "../../components/GameForm/GameForm.jsx";
import GameCarousel from "../../components/GameCarousel/GameCarousel.jsx";
import OffcanvasComponent from "../../components/OffcanvasComponent/OffcanvasComponent.jsx";
import GameDeleteModal from "../../components/Modals/GameDeleteModal/GameDeleteModal.jsx";

const GamesPage = () => {
  const { showGamesOffCanvas, creatingGame } = useGames();
  return (
    <Fragment>
      <div>
        <GameCarousel />
      </div>
      <div>
        <Button
          variant="primary"
          onClick={() => showGamesOffCanvas("creating")}
        >
          Add game
        </Button>
      </div>
      <Container className="py-5 h-100">
        <Row className="g-5">
          <Games />
        </Row>
      </Container>
      <OffcanvasComponent>
        <GameForm creationMode={creatingGame} />
      </OffcanvasComponent>
      <GameDeleteModal />
    </Fragment>
  );
};

export default GamesPage;
