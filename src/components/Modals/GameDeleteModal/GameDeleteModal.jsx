import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import useGames from "../../../hooks/useGames.js";

/**
 * A React component for rendering a modal to confirm the deletion of a game.
 * @function GameDeleteModal
 * @returns {JSX.Element} The rendered component.
 */
const GameDeleteModal = () => {
  const {
    selectedGame,
    isGameDeleteModalOpen,
    hideGameDeleteModal,
    deleteGame,
  } = useGames();

  return ReactDOM.createPortal(
    <Fragment>
      {/* Modal for confirming game deletion */}
      <Modal
        show={isGameDeleteModalOpen}
        backdrop="static"
        keyboard={false}
        centered
        onHide={() => hideGameDeleteModal()}
      >
        <Modal.Header closeButton>
          <Modal.Title>DELETE GAME</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {/* Confirmation message with game ID */}
            <p>Are you sure you want to DELETE this game?</p>
            <p>{selectedGame.title}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* Cancel button */}
          <Button variant="secondary" onClick={() => hideGameDeleteModal()}>
            Cancel
          </Button>
          {/* Delete button */}
          <Button variant="danger" onClick={() => deleteGame()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>,
    document.getElementById("modal-root")
  );
};

export default GameDeleteModal;
