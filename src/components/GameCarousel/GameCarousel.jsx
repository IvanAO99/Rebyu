import React from "react";
import { useState } from "react";
import { Fragment } from "react";

import Carousel from "react-bootstrap/Carousel";

import "./GameCarousel.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import { validateArray } from "../../libraries/validateData";

const GameCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const imgs = [
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/images/games/uncharted.jpg",
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/images/games/tlou.jpg",
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/images/games/cod.png",
  ];

  return (
    <Fragment>
      <div
        className="carousel-container"
        style={{
          backgroundImage: `url(${imgs[index]})`,
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
                  {validateArray(imgs) ? (
                    imgs.map((img, i) => {
                      return (
                        <Carousel.Item key={i}>
                          <img
                            style={{
                              height: "80vh",
                            }}
                            className="d-block w-100 game-carousel-img"
                            src={img}
                          />
                          <Carousel.Caption>
                            <div className="game-carousel-caption">
                              <h3>UNCHARTED 4</h3>
                              <p>
                                Nulla vitae elit libero, a pharetra augue mollis
                                interdum.
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
