import React, { Fragment } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

import { StarFill, StarHalf, Star } from "react-bootstrap-icons";

const Game = () => {
  return (
    <Fragment>
      <Card
        border="light"
        bg="tertiary"
        /* style={{ width: "250px" }} */
        className="shadow"
      >
        <Card.Img
          variant="top"
          src="https://upload.wikimedia.org/wikipedia/en/0/02/Uncharted_3_Boxart.jpg"
          height={300}
          className="object-fit-cover"
        />
        <Card.Body>
          <Card.Title>GAME TITLE</Card.Title>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <StarFill></StarFill>
              <StarFill></StarFill>
              <StarFill></StarFill>
              <StarHalf></StarHalf>
              <Star></Star>
            </div>
            <Badge bg="primary">9.9</Badge>
          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default Game;
