import React, { useState, Fragment } from "react";

import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import useGames from "../../hooks/useGames.js";

import Loading from "../Loading/Loading.jsx";

import { validateArray } from "../../libraries/validateData.js";

import "./GameCarousel.css";

/**
 * A React component for displaying a carousel of latest games.
 * @function GameCarousel
 * @returns {JSX.Element} The rendered component.
 */
const GameCarousel = () => {
  const { isLoadingLatestGames, latestGames } = useGames();

  // State to manage the active index of the carousel
  const [index, setIndex] = useState(0);

  /**
   * Handles the selection of a carousel item.
   * @param {number} selectedIndex - The selected index.
   */
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Fragment>
      {/* Container for the game carousel */}
      <div
        className="carousel-container"
        style={{
          backgroundImage: `url(${
            validateArray(latestGames) ? latestGames[index].wallpaper : ""
          })`,
        }}
      >
        <div>
          {/* Container for the carousel content */}
          <Container>
            <Row>
              <Col>
                {/* Bootstrap Carousel component */}
                <Carousel
                  data-bs-theme="dark"
                  activeIndex={index}
                  onSelect={handleSelect}
                  fade
                >
                  {/* Loading spinner while data is being fetched */}
                  {isLoadingLatestGames ? (
                    <Fragment>
                      <Loading variant="primary" />
                    </Fragment>
                  ) : validateArray(latestGames) ? (
                    // Mapping through the latest games to create carousel items
                    latestGames.map((latestGame, i) => {
                      return (
                        <Carousel.Item key={i}>
                          {/* Image of the game */}
                          <img
                            style={{
                              height: "80vh",
                            }}
                            className="d-block w-100 game-carousel-img"
                            src={latestGame.wallpaper}
                            loading="lazy"
                          />
                          {/* Caption of the carousel item */}
                          <Carousel.Caption>
                            <div className="game-carousel-caption">
                              {/* Title of the game */}
                              <h3>{latestGame.title}</h3>
                              {/* Synopsis of the game (visible on large screens) */}
                              <p className="d-none d-lg-block">
                                {latestGame.synopsis}
                              </p>
                              {/* Button to see more details about the game */}
                              <Button>See more</Button>
                            </div>
                          </Carousel.Caption>
                        </Carousel.Item>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </Carousel>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </Fragment>
  );
};

export default GameCarousel;
