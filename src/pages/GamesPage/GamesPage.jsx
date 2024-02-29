import React, { Fragment } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import Button from "react-bootstrap/Button";

import { FaPlus } from "react-icons/fa";

import useGames from "../../hooks/useGames.js";
import useUsers from "../../hooks/useUsers.js";

import Games from "../../components/Games/Games.jsx";

import GameForm from "../../components/GameForm/GameForm.jsx";
import GameCarousel from "../../components/GameCarousel/GameCarousel.jsx";
import OffcanvasComponent from "../../components/OffcanvasComponent/OffcanvasComponent.jsx";
import GameDeleteModal from "../../components/Modals/GameDeleteModal/GameDeleteModal.jsx";
import GamesSlider from "../../components/GamesSlider/GamesSlider.jsx";
import ReviewsSlider from "../../components/ReviewsSlider/ReviewsSlider.jsx";
import GamesFilters from "../../components/GameFilters/GameFilters.jsx";

import { validateObject } from "../../libraries/validateData.js";

import "./GamesPage.css";

/**
 * Functional component representing a page for displaying games, including top games and reviews.
 *
 * @returns {JSX.Element} The JSX element for the games page.
 */
const GamesPage = () => {
  const { games, topGames, showGamesOffCanvas, creatingGame } = useGames();
  const { isSessionUp, user, isAdmin } = useUsers();

  return (
    <Fragment>
      <GameCarousel />
      <Container className="h-100">
        <Row className="my-3">
          <Col>
            <div className="d-flex flex-row justify-content-start align-items-center text-center py-3">
              <h2 className="m-3">ALL GAMES</h2>
              {isSessionUp && validateObject(user) && isAdmin && (
                <Fragment>
                  <Button
                    variant="primary"
                    className="m-3"
                    onClick={() => showGamesOffCanvas("creating")}
                  >
                    <span className="d-flex flex-center justify-content-start align-items-center">
                      <FaPlus size={15} />
                    </span>
                  </Button>
                </Fragment>
              )}
            </div>
            <div className="separator"></div>
          </Col>
        </Row>
        <Row className="mb-1 g-5">
          <Col lg={3} className="d-none d-lg-block">
            <div>
              <GamesFilters />
            </div>
          </Col>
          <Col xs={12} lg={9}>
            <Row className="mb-5 g-5 justify-content-center align-items-center">
              <Games />
            </Row>
          </Col>
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
      <OffcanvasComponent>
        <GameForm creationMode={creatingGame} />
      </OffcanvasComponent>
      <GameDeleteModal />
    </Fragment>
  );
};

export default GamesPage;
