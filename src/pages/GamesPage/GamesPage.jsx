import React, { Fragment, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
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
      <GameCarousel />
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
        <Row>
          <Col>
            <div>
              <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
              </Pagination>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <h2>RECOMMENDED</h2>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <h2>LAST REVIEWS</h2>
            </div>
          </Col>
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
