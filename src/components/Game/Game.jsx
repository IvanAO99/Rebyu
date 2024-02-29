import React, { Fragment } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

import { FaPen, FaTrash } from "react-icons/fa";

import useGames from "../../hooks/useGames.js";
import useUsers from "../../hooks/useUsers.js";

import Stars from "../Stars/Stars.jsx";

import { calculateAverageScore } from "../../libraries/manipulateData.js";
import { validateObject } from "../../libraries/validateData.js";

/**
 * A React component representing a game card.
 * @function Game
 * @param {object} props - The component props.
 * @param {object} props.game - The game data.
 * @returns {JSX.Element} The rendered component.
 */
const Game = ({ game }) => {
  const {
    getGame,
    showGamesOffCanvas,
    updateSelectedGame,
    showGameDeleteModal,
  } = useGames();
  const { isSessionUp, user, isAdmin } = useUsers();

  /**
   * Handles the click event on the game card.
   * @param {React.MouseEvent} event - The click event.
   */
  const handleCardClick = (event) => {
    event.preventDefault();
    getGame(game.id);
  };

  /**
   * Handles the edit button click event.
   * @param {React.MouseEvent} event - The click event.
   */
  const handleEditButtonClick = (event) => {
    event.stopPropagation();
    showGamesOffCanvas();
    updateSelectedGame(game.id);
  };

  /**
   * Handles the delete button click event.
   * @param {React.MouseEvent} event - The click event.
   */
  const handleDeleteButtonClick = (event) => {
    event.stopPropagation();
    updateSelectedGame(game.id);
    showGameDeleteModal();
  };

  return (
    <Fragment>
      <Card
        border="light"
        bg="tertiary"
        style={{ width: "300px" }}
        className="shadow"
        id={game.id}
        onClick={handleCardClick}
      >
        {isSessionUp && validateObject(user) && isAdmin && (
          <Fragment>
            {/* Edit and Delete buttons for admin users */}
            <div className="position-absolute top-0 end-0 m-2 d-flex flex-row justify-content-center align-items-center">
              <Button
                className="m-2 d-flex justify-content-center align-items-center"
                style={{
                  border: "none",
                  borderRadius: "16px",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  padding: "16px",
                }}
                onClick={handleEditButtonClick}
              >
                <FaPen />
              </Button>
              <Button
                className="m-2 d-flex justify-content-center align-items-center"
                style={{
                  border: "none",
                  borderRadius: "16px",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  padding: "16px",
                }}
                onClick={handleDeleteButtonClick}
              >
                <FaTrash />
              </Button>
            </div>
          </Fragment>
        )}

        {/* Game cover image */}
        <Card.Img
          variant="top"
          src={game.cover_pic}
          height={300}
          className="object-fit-cover"
          loading="lazy"
        />

        <Card.Body>
          {/* Game title */}
          <Card.Title>{game.title}</Card.Title>

          {/* Average score and star rating */}
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
