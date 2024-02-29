import React from "react";
import { useState } from "react";
import { Fragment } from "react";

import Carousel from "react-bootstrap/Carousel";

import "./GameCarousel.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import { validateArray } from "../../libraries/validateData";
import useGames from "../../hooks/useGames";
import Loading from "../Loading/Loading";

const GameCarousel = () => {
  const { isLoadingLatestGames, latestGames } = useGames();

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Fragment>
      <div
        className="carousel-container"
        style={{
          backgroundImage: `url(${
            validateArray(latestGames) ? latestGames[index].wallpaper : ""
          })`,
        }}
      >
        <div>
          <Container>
            <Row>
              <Col>
                <Carousel
                  data-bs-theme="dark"
                  activeIndex={index}
                  onSelect={handleSelect}
                  fade
                >
                  {isLoadingLatestGames ? (
                    <Fragment>
                      <Loading variant="primary" />
                    </Fragment>
                  ) : validateArray(latestGames) ? (
                    latestGames.map((latestGame, i) => {
                      return (
                        <Carousel.Item key={i}>
                          <img
                            style={{
                              height: "80vh",
                            }}
                            className="d-block w-100 game-carousel-img"
                            src={latestGame.wallpaper}
                            loading="lazy"
                          />
                          <Carousel.Caption>
                            <div className="game-carousel-caption">
                              <h3>{latestGame.title}</h3>
                              <p className="d-none d-lg-block">
                                {latestGame.synopsis}
                              </p>
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
