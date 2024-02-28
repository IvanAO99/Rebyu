import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

import { FaPen, FaStar, FaTrash } from "react-icons/fa";

import useGames from "../../hooks/useGames";
import Stars from "../Stars/Stars";
import { calculateAverageScore } from "../../libraries/manipulateData";
import useUsers from "../../hooks/useUsers";
import { validateObject } from "../../libraries/validateData";

const Game = ({ game }) => {
  const {
    getGame,
    showGamesOffCanvas,
    updateSelectedGame,
    showGameDeleteModal,
  } = useGames();
  const { isSessionUp, user, isAdmin } = useUsers();
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
        {isSessionUp && validateObject(user) && isAdmin && (
          <Fragment>
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
                <FaPen />
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
                <FaTrash />
              </Button>
            </div>
          </Fragment>
        )}

        <Card.Img
          variant="top"
          src={game.cover_pic}
          height={300}
          className="object-fit-cover"
        />

        <Card.Body>
          <Card.Title>{game.title}</Card.Title>
          <div className="d-flex justify-content-between align-items-center">
            <Stars score={calculateAverageScore(game)} size={25} />
            <Badge bg="primary">{calculateAverageScore(game)}</Badge>
          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default Game;
