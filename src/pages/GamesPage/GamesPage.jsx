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
import GamesSlider from "../../components/GamesSlider/GamesSlider.jsx";
import ShowObj from "../../components/development/ShowObj.jsx";
import ReviewsSlider from "../../components/ReviewsSlider/ReviewsSlider.jsx";
import { FaPlus } from "react-icons/fa";
import useUsers from "../../hooks/useUsers.js";
import { validateObject } from "../../libraries/validateData.js";
import GamesFilters from "../../components/GameFilters/GameFilters.jsx";

const GamesPage = () => {
  const { games, topGames, showGamesOffCanvas, creatingGame } = useGames();
  const { isSessionUp, user, isAdmin } = useUsers();
  return (
    <Fragment>
      <GameCarousel />
      <Container className="py-5 h-100">
        <Row className="mb-5">
          <Col>
            {isSessionUp && validateObject(user) && isAdmin && (
              <Fragment>
                <div>
                  <Button
                    variant="primary"
                    onClick={() => showGamesOffCanvas("creating")}
                  >
                    <span>
                      <FaPlus size={15} />
                    </span>
                  </Button>
                </div>
              </Fragment>
            )}
          </Col>
          <Col>
            <div>
              <GamesFilters />
            </div>
          </Col>
        </Row>
        <Row className="mb-5 g-5">
          <Col xs={12}>
            <div>
              <h2>ALL GAMES</h2>
            </div>
          </Col>
          <Games />
        </Row>
        <Row className="mb-5">
          <Col>
            <div className="d-flex justify-content-center align-items-center">
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
        <Row className="mb-5">
          <Col>
            <div>
              <h2>TOP GAMES</h2>
              <GamesSlider />
            </div>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col>
            <div>
              <h2>LAST REVIEWS</h2>
              <ReviewsSlider />
            </div>
          </Col>
        </Row>
      </Container>
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
