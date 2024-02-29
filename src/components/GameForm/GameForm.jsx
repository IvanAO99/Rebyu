import React, { Fragment } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import useGames from "../../hooks/useGames.js";

/**
 * A React component for displaying a form for game registration or update.
 * @function GameForm
 * @param {object} props - The component props.
 * @param {boolean} props.creationMode - Flag indicating whether it's in creation mode.
 * @returns {JSX.Element} The rendered component.
 */
const GameForm = ({ creationMode }) => {
  const {
    developers,
    platforms,
    genres,
    gameRegister,
    updateGameForm,
    handleCheckboxChange,
    handleGameForm,
    gameRegisterErrors,
    selectedGame,
  } = useGames();

  // Determine which game object to use based on creationMode
  let actualGame = creationMode ? gameRegister : selectedGame;

  return (
    <Fragment>
      {/* Card container for the game form */}
      <Card className="p-0">
        <Card.Header className="text-center">
          GAME {creationMode ? "REGISTER" : "UPDATE"}
        </Card.Header>
        <Card.Body className="p-4">
          {/* Form for game registration or update */}
          <Form className="d-flex flex-column">
            {/* Title input */}
            <Form.Group className="mb-3" controlId="game-register-name">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                name="title"
                placeholder="Enter title"
                value={actualGame.title || ""}
                onChange={(e) => {
                  updateGameForm(e.target, creationMode);
                }}
                isInvalid={gameRegisterErrors.title}
              />
              <Form.Text className="text-muted">
                Enter a valid title for the game.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {gameRegisterErrors.title}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Synopsis input */}
            <Form.Group className="mb-3" controlId="game-register-synopsis">
              <Form.Label>Synopsis</Form.Label>
              <Form.Control
                type="synopsis"
                name="synopsis"
                placeholder="Enter a synopsis"
                value={actualGame.synopsis || ""}
                onChange={(e) => {
                  updateGameForm(e.target, creationMode);
                }}
                isInvalid={gameRegisterErrors.synopsis}
              />
              <Form.Text className="text-muted">
                The synopsis must contain between 50 and 600 characters and
                cannot contain special characters.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {gameRegisterErrors.synopsis}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Price input */}
            <Form.Group className="mb-3" controlId="game-register-price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Enter price"
                value={actualGame.price || ""}
                onChange={(e) => {
                  updateGameForm(e.target, creationMode);
                }}
                isInvalid={gameRegisterErrors.price}
              />
              <Form.Text className="text-muted">
                Enter the price of the game.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {gameRegisterErrors.price}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Release Date input */}
            <Form.Group className="mb-3" controlId="game-register-release-date">
              <Form.Label>Release Date</Form.Label>
              <Form.Control
                type="date"
                name="release_date"
                value={actualGame.release_date || ""}
                onChange={(e) => {
                  updateGameForm(e.target, creationMode);
                }}
                isInvalid={gameRegisterErrors.release_date}
              />
              <Form.Text className="text-muted">
                Select the release date of the game.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {gameRegisterErrors.release_date}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Cover Image input */}
            <Form.Group className="mb-3" controlId="game-register-cover">
              <Form.Label>Cover Image</Form.Label>
              <Form.Control
                type="cover_pic"
                name="cover_pic"
                placeholder="Enter a cover link"
                value={actualGame.cover_pic || ""}
                onChange={(e) => {
                  updateGameForm(e.target, creationMode);
                }}
                isInvalid={gameRegisterErrors.cover_pic}
              />
              <Form.Text className="text-muted">
                Upload a cover image for the game.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {gameRegisterErrors.cover_pic}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Wallpaper input */}
            <Form.Group className="mb-3" controlId="game-register-wallpaper">
              <Form.Label>Wallpaper</Form.Label>
              <Form.Control
                type="wallpaper"
                name="wallpaper"
                placeholder="Enter a wallpaper link"
                value={actualGame.wallpaper || ""}
                onChange={(e) => {
                  updateGameForm(e.target, creationMode);
                }}
                isInvalid={gameRegisterErrors.wallpaper}
              />
              <Form.Text className="text-muted">
                Upload a wallpaper image for the game.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {gameRegisterErrors.wallpaper}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Trailer Link input */}
            <Form.Group className="mb-3" controlId="game-register-trailer">
              <Form.Label>Trailer Link</Form.Label>
              <Form.Control
                type="url"
                name="trailer"
                placeholder="Enter trailer link"
                value={actualGame.trailer || ""}
                onChange={(e) => {
                  updateGameForm(e.target, creationMode);
                }}
                isInvalid={gameRegisterErrors.trailer}
              />
              <Form.Text className="text-muted">
                Enter a link to the game's trailer.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {gameRegisterErrors.trailer}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Developer, Platform, Genre checkboxes */}
            <Row>
              <Col>
                {/* Developer checkboxes */}
                <Form.Group
                  className="mb-3"
                  controlId="game-register-developer"
                >
                  <Form.Label>Developer</Form.Label>
                  <br />
                  <Form.Text className="text-muted">
                    Select at least one developer.
                  </Form.Text>
                  {/* Mapping through developers to create checkboxes */}
                  {developers ? (
                    developers.map((developer) => {
                      return (
                        <Form.Check
                          key={developer.id}
                          id={`game-register-developer-${developer.id}`}
                          type="checkbox"
                          label={developer.name}
                          name="game_developer"
                          value={developer.id}
                          checked={actualGame.game_developer.includes(
                            developer.id
                          )}
                          onChange={(e) => {
                            handleCheckboxChange(e, creationMode);
                          }}
                          isInvalid={gameRegisterErrors.game_developer}
                        />
                      );
                    })
                  ) : (
                    <div>Error. Reload the page</div>
                  )}
                </Form.Group>
              </Col>
              <Col>
                {/* Platform checkboxes */}
                <Form.Group className="mb-3" controlId="game-register-platform">
                  <Form.Label>Platform</Form.Label>
                  <br />
                  <Form.Text className="text-muted">
                    Select at least one platform.
                  </Form.Text>
                  {/* Mapping through platforms to create checkboxes */}
                  {platforms ? (
                    platforms.map((platform) => {
                      return (
                        <Form.Check
                          key={platform.id}
                          id={`game-register-platform-${platform.id}`}
                          type="checkbox"
                          label={platform.name}
                          name="game_platform"
                          value={platform.id}
                          checked={actualGame.game_platform.includes(
                            platform.id
                          )}
                          onChange={(e) => {
                            handleCheckboxChange(e, creationMode);
                          }}
                          isInvalid={gameRegisterErrors.game_platform}
                        />
                      );
                    })
                  ) : (
                    <div>Error. Reload the page</div>
                  )}
                </Form.Group>
              </Col>
              <Col>
                {/* Genre checkboxes */}
                <Form.Group className="mb-3" controlId="game-register-genre">
                  <Form.Label>Genre</Form.Label>
                  <br />
                  <Form.Text className="text-muted">
                    Select at least one genre.
                  </Form.Text>
                  {/* Mapping through genres to create checkboxes */}
                  {genres ? (
                    genres.map((genre) => {
                      return (
                        <Form.Check
                          key={genre.id}
                          id={`game-register-genre-${genre.id}`}
                          type="checkbox"
                          label={genre.name}
                          name="game_genre"
                          value={genre.id}
                          checked={actualGame.game_genre.includes(genre.id)}
                          onChange={(e) => {
                            handleCheckboxChange(e, creationMode);
                          }}
                          isInvalid={gameRegisterErrors.game_genre}
                        />
                      );
                    })
                  ) : (
                    <div>Error. Reload the page</div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            {/* Submit button */}
            <Button
              variant="primary"
              className="align-self-center"
              type="button"
              onClick={() => {
                handleGameForm(creationMode);
              }}
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default GameForm;
