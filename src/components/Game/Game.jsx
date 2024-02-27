import React, { Fragment } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

import {
  StarFill,
  StarHalf,
  Star,
  PencilSquare,
  Trash,
} from "react-bootstrap-icons";
import useGames from "../../hooks/useGames";
import { Link, useNavigate } from "react-router-dom";

const Game = ({ game }) => {
  const {
    getGame,
    showGamesOffCanvas,
    updateSelectedGame,
    showGameDeleteModal,
  } = useGames();
  const navigate = useNavigate();

  return (
    <Fragment>
      <Card
        border="light"
        bg="tertiary"
        style={{ width: "300px" }}
        className="shadow"
        id={game.id}
        onClick={(event) => {
          event.preventDefault();
          getGame(game.id);
        }}
      >
        <div className="position-absolute top-0 end-0 m-2 d-flex flex-column justify-content-center align-items-center">
          <Button
            className="m-2 d-flex justify-content-center align-items-center"
            style={{
              borderRadius: "15px",
              backgroundColor: "#8a2be2",
              borderColor: "#8a2be2",
              color: "white",
              padding: "15px",
            }}
            onClick={(event) => {
              event.stopPropagation();

              showGamesOffCanvas();
              updateSelectedGame(game.id);
            }}
          >
            <PencilSquare />
          </Button>
          <Button
            className="m-2 d-flex justify-content-center align-items-center"
            style={{
              borderRadius: "15px",
              backgroundColor: "#b26b6b",
              borderColor: "#8a2be2",
              color: "white",
              padding: "15px",
            }}
            onClick={(event) => {
              event.stopPropagation();

              updateSelectedGame(game.id);
              showGameDeleteModal();
            }}
          >
            <Trash />
          </Button>
        </div>

        <Card.Img
          variant="top"
          src={game.cover_pic}
          height={300}
          className="object-fit-cover"
        />

        <Card.Body>
          <Card.Title>{game.title}</Card.Title>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <StarFill></StarFill>
              <StarFill></StarFill>
              <StarFill></StarFill>
              <StarHalf></StarHalf>
              <Star></Star>
            </div>
            <Badge bg="primary">{game.score}</Badge>
          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default Game;
