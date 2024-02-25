import React from "react";
import { useState } from "react";
import { Fragment } from "react";

import Carousel from "react-bootstrap/Carousel";

import "./GameCarousel.css";

const GameCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Fragment>
      <Carousel
        data-bs-theme="dark"
        activeIndex={index}
        onSelect={handleSelect}
      >
        <Carousel.Item>
          <img
            style={{
              height: "80vh",
            }}
            className="d-block w-100"
            src="https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/images/games/uncharted.jpg"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{
              height: "80vh",
            }}
            className="d-block w-100"
            src="https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/images/games/tlou.jpg"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{
              height: "80vh",
            }}
            className="d-block w-100"
            src="https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/images/games/cod.png"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Fragment>
  );
};

export default GameCarousel;
