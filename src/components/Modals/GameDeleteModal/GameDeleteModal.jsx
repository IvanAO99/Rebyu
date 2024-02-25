import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useGames from "../../../hooks/useGames";

const GameDeleteModal = () => {
  const {
    selectedGame,
    isGameDeleteModalOpen,
    hideGameDeleteModal,
    deleteGame,
  } = useGames();

  return ReactDOM.createPortal(
    <Fragment>
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
            <p>Are you sure you want to DELETE this game?</p>
            <p>{selectedGame.id}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => hideGameDeleteModal()}>
            Cancel
          </Button>
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
